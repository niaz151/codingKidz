import React, { useEffect, useState } from "react";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { db } from "services/firebase";
import { Unit } from "models/Unit";

interface Props extends RouteComponentProps {}

export const Units: React.FC<Props> = () => {
  const [units, setUnits] = useState<Unit[]>();

  const navigate = useNavigate();

  useEffect(() => {
    fetchUnits();
  }, []);

  const goToUnitQuiz = (unit: string) => {
    navigate(`/quiz/${unit}`)
  }

  const fetchUnits = async () => {
    let tempUnit: Unit;
    let tempUnits: Unit[] = [];
    await db
      .collection("units")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((res) => {
          tempUnit = res.data() as Unit
          tempUnit.id = res.id
          tempUnits.push(tempUnit);
        });
      })
      .then(() => {
        setUnits(tempUnits);
      });
  };

  return units ?  (
    <ul>
      {units.map((unit) => {
        return <button onClick={() => goToUnitQuiz(unit.id)}>{unit.topic}</button>;
      })}
    </ul>
  ) : (
    <p>Loading Units...</p>
  )
};
