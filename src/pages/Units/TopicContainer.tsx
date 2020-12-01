import {
  CheckSquare,
  CheckSquareFill,
  Trash,
  Pencil,
  ExclamationTriangle,
} from "react-bootstrap-icons";
import { Button, Card, Modal } from "react-bootstrap";
import { Role, Topic } from "models";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteTopic, useTopicCompletion } from "services/api";

export const TopicContainer = (props: {
  role: Role;
  unit_id: string;
  topic: Topic;
}) => {
  const { role, unit_id, topic } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [
    completionData,
    completionLoading,
    completionError,
  ] = useTopicCompletion(unit_id, topic.id);

  const handleDeleteTopic = (unit_id: string, topic_id: string) => {
    deleteTopic(unit_id, topic_id);
  };

  return (
    <>
      {(role === "teacher" || role === "admin") && (
        <Modal show={showDeleteModal}>
          <Modal.Header>
            <Modal.Title>Confirm your choice</Modal.Title>
          </Modal.Header>
          <Modal.Body>This will permanently delete the topic!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteTopic(unit_id, topic.id);
                setShowDeleteModal(false);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Card>
        <Card.Header>
          {topic.name}
          {completionError && <ExclamationTriangle color="#EED202" />}
          {completionLoading ? (
            <CheckSquare color="#EED202" />
          ) : completionData && completionData.completed ? (
            <CheckSquareFill />
          ) : (
            <CheckSquare />
          )}
          {role === "teacher" || role === "admin" ? (
            <>
              <Link to={`/units/edit/${unit_id}/${topic.id}`}>
                <Pencil />
              </Link>
              <Button
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                <Trash />
              </Button>
            </>
          ) : null}
        </Card.Header>
        Take <Link to={`/units/quiz/${unit_id}/${topic.id}`}>quiz</Link>
      </Card>
    </>
  );
};
