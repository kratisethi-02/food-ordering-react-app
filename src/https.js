import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export async function fetchMeals() {
  const response = await fetch("http://localhost:3000/meals");

  if (!response.ok) {
    //....
  }

  const meals = await response.json();
  return meals;
}

export async function checkoutCart({ items, customer }) {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      order: {
        items: items,
        customer: customer
      }
    })
  });

  if (!response.ok) {
    const error = new Error("An error occured while placing order");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { message } = await response.json();
  console.log(message);
  return message;
}
