import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchMeals } from "../https";
import MealItem from "./MealItem";
import Error from "./Error";

const Meals = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["meals"],
    queryFn: ({ signal }) => fetchMeals()
  });

  if (isError) {
    return <Error title="Failed to fetch meals" message={error.message} />;
  }

  return (
    <ul id="meals">
      {!isPending && data.map(meal => <MealItem key={meal.id} meal={meal} />)}
      {isPending &&
        <p className="pending-center">Finding your yummy meals....</p>}
    </ul>
  );
};

export default Meals;
