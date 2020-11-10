import {
  CheckSquare,
  CheckSquareFill,
  Trash,
  ExclamationTriangle,
} from "react-bootstrap-icons";
import { Button, Accordion, Card, Form, FormControl } from "react-bootstrap";
import { Role, Unit } from "models";
import React, { useState } from "react";
import {
  addTopic,
  deleteUnit,
  useTopics,
  useUnitCompletion,
} from "services/api";
import { TopicContainer } from "./TopicContainer";

type Props = {
  role: Role;
  unit: Unit;
};

export const UnitContainer = (props: Props) => {
  const { role, unit } = props;
  const [
    completionData,
    completionLoading,
    completionError,
  ] = useUnitCompletion(unit.id);
  const [topics, topicsLoading, topicsError] = useTopics(unit.id);

  const handleDeleteUnit = (unit_id: string) => {
    deleteUnit(unit_id);
  };

  const AddTopicForm = () => {
    const [number, setNumber] = useState<number>();
    const [name, setName] = useState<string>();

    const handleAddTopic = (event: React.FormEvent<HTMLFormElement>) => {
      if (number === undefined || name === undefined) {
        console.log("somehow got null values");
      } else {
        addTopic(unit.id, { topic_number: number, name: name });
      }
      event.preventDefault();
    };

    return (
      <Form onSubmit={handleAddTopic}>
        {/* TODO: Automate topic number updating */}
        <Form.Group>
          <Form.Label>Topic Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter topic number"
            onChange={(event) => {
              setNumber(Number(event.target.value));
            }}
          />
          <FormControl.Feedback type="invalid">
            Please enter topic number
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Topic Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter topic name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <FormControl.Feedback type="invalid">
            Please enter topic name
          </FormControl.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Topic
        </Button>
      </Form>
    );
  };

  return (
    <Card>
      <Card.Header>
        {unit.name} {completionError && <ExclamationTriangle color="#EED202" />}
        {completionLoading ? (
          <CheckSquare color="#EED202" />
        ) : completionData && completionData.completed ? (
          <CheckSquareFill />
        ) : (
          <CheckSquare />
        )}
        {role === "teacher" || role === "admin" ? (
          <>
            <Button
              onClick={() => {
                handleDeleteUnit(unit.id);
              }}
            >
              <Trash />
            </Button>
          </>
        ) : null}
      </Card.Header>
      <Card.Body>
        {topicsLoading ? (
          <p>Loading topics for unit</p>
        ) : topicsError ? (
          <p>Error loading topics</p>
        ) : (
          topics &&
          topics.map((topic) => {
            return (
              <TopicContainer
                key={topic.id}
                role={role}
                topic={topic}
                unit_id={unit.id}
              />
            );
          })
        )}
      </Card.Body>

      {role === "teacher" || role === "admin" ? (
        <>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} eventKey="0">
                  Add New Topic
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <AddTopicForm />
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </>
      ) : null}
    </Card>
  );
};
