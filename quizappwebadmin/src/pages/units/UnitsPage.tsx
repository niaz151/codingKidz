import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../ducks/hooks";
import { getUnits } from "./unitsSlice";
import { UnitContainer } from "./components";

const UnitsPage = () => {
  const dispatch = useAppDispatch();
  const units = useAppSelector((state) => state.unit.units);
  const unitStatus = useAppSelector((state) => state.unit.status);

  useEffect(() => {
    if (unitStatus === "idle") {
      dispatch(getUnits({}));
    }
  }, [dispatch, unitStatus]);
  return (
    <div>
      <h1>Units</h1>
      <p>Status: {unitStatus}</p>
      {unitStatus === "idle" && <p>About to load units</p>}
      {unitStatus === "loading" && <p>Units are loading...</p>}
      {unitStatus === "failed" && <p>Error fetching units</p>}
      {unitStatus === "succeeded" && (
        <div>
          {units?.map((unit) => {
            return <UnitContainer unit={unit} key={unit.id} />;
          })}
        </div>
      )}
    </div>
  );
};
export default UnitsPage;
