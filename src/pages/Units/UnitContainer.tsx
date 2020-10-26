import {
  CheckSquareFilled,
  CheckSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Card, Collapse, Form, Input, InputNumber } from "antd";
import { Store } from "antd/lib/form/interface";
import { NewTopic, Role, Topic, Unit } from "models";
import React, { useEffect, useState } from "react";
import {
  addTopic,
  checkUnitCompleted,
  deleteUnit,
  getTopics,
} from "services/api";
import { TopicContainer } from "./TopicContainer";

type Props = {
  role: Role;
  unit: Unit;
};

export const UnitContainer = (props: Props) => {
  const { role, unit } = props;
  const [completed, setCompleted] = useState<boolean>();
  const [topics, setTopics] = useState<Topic[]>();

  const { Panel } = Collapse;

  const handleDeleteUnit = (unit_id: string) => {
    deleteUnit(unit_id).then(() => window.location.reload());
  };

  const handleAddTopic = (unit_id: string, values: Store) => {
    const newTopic: NewTopic = {
      topic_number: values.topic_number,
      name: values.name,
    };

    addTopic(unit_id, newTopic).then(() => window.location.reload());
  };

  useEffect(() => {
    let didCancel = false;

    const fetchData = () => {
      checkUnitCompleted(unit.id)
        .then((value) => {
          if (!didCancel) {
            setCompleted(value);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      getTopics(unit.id)
        .then((topics) => {
          if (!didCancel) {
            setTopics(topics);
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
  }, [unit.id]);

  return (
    <Card
      key={unit.id}
      title={
        <>
          {unit.name}
          {completed ? <CheckSquareFilled /> : <CheckSquareOutlined />}
        </>
      }
      extra={
        <>
          {role === "teacher" || role === "admin" ? (
            <>
              <Button
                onClick={() => {
                  handleDeleteUnit(unit.id);
                }}
              >
                <DeleteOutlined />
              </Button>
            </>
          ) : null}
        </>
      }
    >
      {topics &&
        (!topics ? (
          <p>No topics for {unit.name}</p>
        ) : (
          topics.map((topic) => {
            console.log("rendering topic", topic.id)
            return (
              <TopicContainer
                key={topic.id}
                role={role}
                topic={topic}
                unit_id={unit.id}
              />
            );
          })
        ))}
      {role === "teacher" || role === "admin" ? (
        <>
          <Collapse accordion>
            <Panel header="Add New Topic" key="1">
              <Form
                name="addtopic"
                onFinish={(values) => {
                  handleAddTopic(unit.id, values);
                }}
              >
                {/* TODO: Automate topic number updating */}
                <Form.Item name="topic_number" label="Topic Number">
                  <InputNumber />
                </Form.Item>
                <Form.Item name="name" label="Topic Name">
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Topic
                  </Button>
                </Form.Item>
              </Form>
            </Panel>
          </Collapse>
          <br></br>
        </>
      ) : null}
    </Card>
  );
};
