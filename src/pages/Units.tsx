import React, { useEffect, useState } from "react";
import { db } from "services/firebase";
import { Unit } from "models/Unit";
import { Link } from "react-router-dom";

import {fetchUnits} from 'services/api'

export const Units: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>();

  useEffect(() => {
    fetchUnits().then((units) => {
      setUnits(units)
    });
  }, []);

  return units ? (
    <ul>
      {units.map((unit) => {
        return <Link to={{ pathname: `/quiz/${unit.id}` }}>{unit.topic}</Link>;
      })}
    </ul>
  ) : (
    <p>Loading Units...</p>
  );
};
