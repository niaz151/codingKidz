import {
  CheckSquare,
  CheckSquareFill,
  Trash,
  Pencil,
  ExclamationTriangle,
} from "react-bootstrap-icons";
import { Button, Card } from "react-bootstrap";
import { Role, Topic } from "models";
import React from "react";
import { Link } from "react-router-dom";
import { deleteTopic, useTopicCompletion } from "services/api";

type Props = {
  role: Role;
  unit_id: string;
  topic: Topic;
};

export const TopicContainer = (props: Props) => {
  const { role, unit_id, topic } = props;
  const [
    completionData,
    completionLoading,
    completionError,
  ] = useTopicCompletion(unit_id, topic.id);

  const handleDeleteTopic = (unit_id: string, topic_id: string) => {
    deleteTopic(unit_id, topic_id);
  };

  return (
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
                handleDeleteTopic(unit_id, topic.id);
              }}
            >
              <Trash />
            </Button>
          </>
        ) : null}
      </Card.Header>
      Take <Link to={`/units/quiz/${unit_id}/${topic.id}`}>quiz</Link>
    </Card>
  );
};
