import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async () => {
  const response = await fetch("http://swapi.dev/api/people/");
  return response.json();
};

const People = () => {
  const { data, status } = useQuery("people", fetchPeople);

  console.log("data", data);

  return (
    <div>
      people
      {status === "error" && (
        <div>An error has occurred while fetching data</div>
      )}
      {status === "loading" && <div>Fetching data...</div>}
      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
