import {
  CheckSquareFilled,
  CheckSquareOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import { Role, Topic } from "models";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkTopicCompleted, deleteTopic } from "services/api";

type Props = {
  role: Role;
  unit_id: string;
  topic: Topic;
};

export const TopicContainer = (props: Props) => {
  const { role, unit_id, topic } = props;
  const [completed, setCompleted] = useState<boolean>();

  const handleDeleteTopic = (unit_id: string, topic_id: string) => {
    deleteTopic(unit_id, topic_id).then(() => window.location.reload());
  };

  useEffect(() => {
    let didCancel = false;

    const fetchData = () => {
      checkTopicCompleted(unit_id, topic.id)
        .then((value) => {
          if (!didCancel) {
            setCompleted(value);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [topic.id, unit_id]);

  return (
    <Card
      type="inner"
      key={topic.id}
      title={
        <>
          {topic.name}
          {completed ? <CheckSquareFilled /> : <CheckSquareOutlined />}
        </>
      }
      extra={
        <>
          {role === "teacher" || role === "admin" ? (
            <>
              <Link to={`/units/edit/${unit_id}/${topic.id}`}>
                <EditOutlined />
              </Link>
              <Button
                onClick={() => {
                  handleDeleteTopic(unit_id, topic.id);
                }}
              >
                <DeleteOutlined />
              </Button>
            </>
          ) : null}
        </>
      }
    >
      Take <Link to={`/units/quiz/${unit_id}/${topic.id}`}>quiz</Link>
    </Card>
  );
};
