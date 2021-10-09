import React, {useState} from 'react';
import { Accordion, Card, Button, Modal } from "react-bootstrap";
import { TopicContainer } from ".";
import { Language, Unit } from "../../../utils/models";
import UnitForm from "./UnitForm";

interface Props {
  languageId: Language["id"];
  unit: Unit;
}

const UnitContainer = (props: Props) => {
  const { unit, languageId } = props;
  
  const [modalSettings, setModalSettings] = useState<{open: boolean;}>({open: false});

  const renderFormInModal = () => {
      return (
        <UnitForm
          languageId={props.languageId}
          unitId={props.unit.id}
        />
      );
  };

  const closeModal = () => {
    setModalSettings({ ...modalSettings, open: false });
  };


  return (
  <>
    <Modal show={modalSettings.open} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Unit Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderFormInModal()}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
    <Card>
      <Card.Header>
        <Accordion.Toggle eventKey={String(unit.id)}>
          {unit.name}
        </Accordion.Toggle>
        <Button onClick={() => setModalSettings({open: true })}>
          Edit
        </Button>
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
  </>
  );
};

export default UnitContainer;
