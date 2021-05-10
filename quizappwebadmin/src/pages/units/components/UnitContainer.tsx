import { TopicContainer } from ".";
import { useAppSelector } from "../../../ducks/hooks";
import { Unit } from "../../../utils/models";

interface Props {
  unit: Unit;
}

const UnitContainer = (props: Props) => {
  const { unit } = props;

  return (
    <div>
      <p>{unit.name}</p>
      <div>
        {unit.topics === undefined ? (
          <p>Create some topics!</p>
        ) : (
          <div>
            {unit.topics.map((topic) => {
              return <TopicContainer topic={topic} key={topic.id} />;
            })}
            <button>Add topic</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitContainer;
