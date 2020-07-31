import React, { useState } from "react";
import { useQuery, usePaginatedQuery } from "react-query";
import axios from "axios";
import Planet from "./Planet";

const fetchPlanets = async (key, page) => {
  const response = await axios(`http://swapi.dev/api/planets/?page=${page}`);
  return response.data;
};

const Planets = () => {
  const [ page, setPage ] = useState(1);
  const { status, resolvedData, latestData } = usePaginatedQuery(["planets", page], fetchPlanets, {
    staleTime: 2000,
  });

  return (
    <div>
      {status === "error" && (
        <div>An error has occurred while fetching data</div>
      )}
      {status === "loading" && <div>Fetching data...</div>}
      {status === "success" && (
        <>
          <button disabled={page === 1} onClick={() => setPage(page => Math.max(page - 1, 1))}>Prev</button>
          <button>{page}</button>
          <button disabled={!latestData || !latestData.next} onClick={() => setPage(page => (!latestData || !latestData.next ? page : page + 1))}>Next</button>
          <div>
            {resolvedData.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
