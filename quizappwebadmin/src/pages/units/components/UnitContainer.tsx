import { Accordion, Card, Button } from "react-bootstrap";

import { TopicContainer } from ".";
import { Language, Unit } from "../../../utils/models";

interface Props {
  languageId: Language["id"];
  unit: Unit;
}

const UnitContainer = (props: Props) => {
  const { unit } = props;

  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle eventKey={String(unit.id)}>
          {unit.name}
        </Accordion.Toggle>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Card.Header>
      <Accordion.Collapse eventKey={String(unit.id)}>
        <Card.Body>
          <Accordion>
            {unit.topics?.map((topic) => {
              return (
                <TopicContainer
                  languageId={props.languageId}
                  unitId={unit.id}
                  topic={topic}
                  key={topic.id}
                />
              );
            })}
          </Accordion>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default UnitContainer;
