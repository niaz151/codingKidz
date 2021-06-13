import { Container, Col, Row, Accordion, Card, Button } from "react-bootstrap";

import { Language } from "../../../utils/models";

import { UnitContainer } from "./index";

interface Props {
  language: Language;
}

const LanguageContainer = (props: Props) => {
  const { language } = props;

  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle eventKey={String(language.id)}>
          {language.name}
        </Accordion.Toggle>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Card.Header>
      <Accordion.Collapse eventKey={String(language.id)}>
          <Card.Body>
            <Accordion>
              {language.units?.map((unit) => {
                return <UnitContainer languageId={language.id} unit={unit} key={unit.id} />;
              })}
            </Accordion>
          </Card.Body>
        </Accordion.Collapse>
    </Card>
  );
};

export default LanguageContainer;
