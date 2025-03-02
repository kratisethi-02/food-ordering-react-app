import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchMeals } from "../https";
import MealItem from "./MealItem";

const Meals = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["meals"],
    queryFn: ({ signal }) => fetchMeals()
  });
  if (data) {
    console.log(data);
  }

  return (
    <ul id="meals">
      {!isPending && data.map(meal => <MealItem key={meal.id} meal={meal} />)}
      {isPending && <p>Fetching Menu</p>}
    </ul>
  );
};

export default Meals;
