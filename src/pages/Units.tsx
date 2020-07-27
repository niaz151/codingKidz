import React, { useEffect, useState } from "react";
import { Unit } from "models/Unit";
import {Link, Redirect } from "react-router-dom";

import { fetchUnits } from 'services/api'

import { FaPencilAlt } from 'react-icons/fa';

export const Units: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>();
  

  const isAdmin = true;

  const logClick = () => {
    console.log('edit icon clicked');
  }

  useEffect(() => {
    fetchUnits().then((units) => {
      setUnits(units)
    });
  }, []);

  return units && isAdmin ? (
    <ul>
      <p>Add unit</p>

      {units.map((unit) => {
        return <p>
          <Link to={{ pathname: `/quiz/${unit.id}` }}>
            {unit.topic}
          </Link>

          <Link to={{ pathname: `/upload/${unit.id}`}}>
          <button onClick={logClick}>
            <FaPencilAlt />
          </button>
          </Link>
        </p>;
      })}

    </ul>
  ) : units ? (
    <ul>
      {units.map((unit) => {
        return <p>

          <Link to={{ pathname: `/quiz/${unit.id}` }}>
            {unit.topic}
          </Link>

        </p>;
      })}

    </ul>
  ) : (
        <p>Loading Units...</p >
      );
};
