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
