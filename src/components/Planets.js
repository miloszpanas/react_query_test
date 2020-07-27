import React from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async () => {
  const response = await fetch("http://swapi.dev/api/planets/");
  return response.json();
};

const Planets = () => {
  const { data, status } = useQuery("planets", fetchPlanets, {
    staleTime: 2000,
  });

  console.log("data", data);

  return (
    <div>
      Planets
      {status === "error" && (
        <div>An error has occurred while fetching data</div>
      )}
      {status === "loading" && <div>Fetching data...</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
