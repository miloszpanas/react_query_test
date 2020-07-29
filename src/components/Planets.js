import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Planet from "./Planet";

const fetchPlanets = async (key, page) => {
  const response = await axios(`http://swapi.dev/api/planets/?page=${page}`);
  return response.data;
};

const Planets = () => {
  const [ page, setPage ] = useState(1);
  const { data, isError, isLoading, isSuccess } = useQuery(["planets", page], fetchPlanets, {
    staleTime: 2000,
  });

  return (
    <div>
      <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(page => page - 1)}>Prev</button>
      <button onClick={() => setPage(page => page + 1)}>Next</button>
      {isError && (
        <div>An error has occurred while fetching data</div>
      )}
      {isLoading && <div>Fetching data...</div>}
      {isSuccess && (
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
