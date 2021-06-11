import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { TopicContainer } from ".";
import { useAppSelector } from "../../../ducks/hooks";
import { Language } from "../../../utils/models";
import UnitContainer from "./UnitContainer";

interface Props {
  language: Language;
}

const LanguageContainer = (props: Props) => {
  const { language } = props;

  return (
    <Container>
      <Col>
        <Row>
          <p>{language.name}</p>
          <button>Edit</button>
          <button>Delete</button>
        </Row>
        <div>
          {language.units === undefined ? (
            <p>Create some topics!</p>
          ) : (
            <div>
              <h2>Units for {language.name}</h2>
              {language.units.map((unit) => {
                return <UnitContainer unit={unit} key={unit.id} />;
              })}
              <button>Add Unit</button>
            </div>
          )}
        </div>
      </Col>
    </Container>
  );
};

export default LanguageContainer;
