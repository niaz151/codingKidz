import React, { useEffect, useState } from "react";
import { Unit } from "models/Unit";
import { Link } from "react-router-dom";

import { fetchUnits, getUser, getRole } from "services/api";

import { FaPencilAlt } from "react-icons/fa";
import { Button } from "antd";

const Units: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>();

  const [role, setRole] = useState<string>();
  const user = getUser();

  if (user) {
    getRole().then((r) => {
      setRole(r);
    });
  }

  useEffect(() => {
    fetchUnits().then((units) => {
      setUnits(units);
    });
  }, []);

  return units ? (
    <ul>
      <Button>Add unit</Button>

      {units.map((unit) => {
        return (
          <li>
            <Link to={{ pathname: `/quiz/${unit.id}` }}>{unit.topic}</Link>

            {role === "teacher" ? (
              <Link to={{ pathname: `/upload/${unit.id}` }}>
                <FaPencilAlt />
              </Link>
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : (
    <p>Loading Units...</p>
  );
};

export default Units;
