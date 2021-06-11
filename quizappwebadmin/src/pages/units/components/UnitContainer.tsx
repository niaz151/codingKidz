import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
      <Col>
        <Row>
          <p>{unit.name}</p>
          <button>Edit</button>
          <button>Delete</button>
        </Row>
        <div>
          {unit.topics === undefined ? (
            <p>Create some topics!</p>
          ) : (
            <div>
              <h3>Topics for {unit.name}</h3>
              {unit.topics.map((topic) => {
                return <TopicContainer topic={topic} key={topic.id} />;
              })}
              <button>Add topic</button>
            </div>
          )}
        </div>
      </Col>
    </div>
  );
};

export default UnitContainer;
