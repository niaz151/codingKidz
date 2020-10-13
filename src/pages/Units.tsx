import React, { useEffect, useReducer } from "react";
import { NewTopic, NewUnit, Role, Topic, Unit } from "models";
import { Link } from "react-router-dom";

import {
  getUnits,
  getRole,
  checkUnitCompleted,
  checkTopicCompleted,
  getTopics,
  addTopic,
  deleteTopic,
} from "services/api";

import { Form, Button, Collapse, Input, Card } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckSquareFilled,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { Store } from "antd/lib/form/interface";
import { addUnit, deleteUnit } from "services/api";
import { LivesContainer } from "components";

const Units: React.FC = () => {
  type Data = {
    role: string;
    units?: Unit[];
    unitCompletions?: { [unit_id: string]: boolean };
    topics?: { [unit_id: string]: Topic[] };
    topicCompletions?: { [topic_id: string]: boolean };
  };

  type State =
    | { status: "EMPTY" }
    | { status: "LOADING" }
    | { status: "ERROR"; error: string }
    | { status: "SUCCESS"; data: Data };

  type Action =
    | { type: "FETCH_INIT" }
    | { type: "FETCH_SUCCESS"; payload: Data }
    | { type: "FETCH_FAILURE"; error: string };

  const dataFetchReducer = (state: State, action: Action): State => {
    console.log("STATUS: ", state.status);
    switch (action.type) {
      case "FETCH_INIT":
        return {
          ...state,
          status: "LOADING",
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          status: "SUCCESS",
          data: action.payload,
        };
      case "FETCH_FAILURE":
        return {
          ...state,
          status: "ERROR",
          error: action.error,
        };
      default:
        throw new Error("Invalid action type");
    }
  };

  const [state, dispatch] = useReducer(dataFetchReducer, { status: "EMPTY" });

  const { Panel } = Collapse;

  useEffect(() => {
    // shoutout to https://www.robinwieruch.de/react-hooks-fetch-data
    let didCancel = false;

    const fetchData = async () => {
      let tempRole: Role;
      let tempUnits: Unit[] | undefined;
      let tempUnitCompletions: { [id: string]: boolean } | undefined;
      let tempTopics: { [unit_id: string]: Topic[] } | undefined;
      let tempTopicCompletions: { [id: string]: boolean } | undefined;

      dispatch({ type: "FETCH_INIT" });
      await getRole().then((role) => {
        if (role) {
          tempRole = role;
        } else {
          throw new Error("Could not fetch role");
        }
      });

      await getUnits()
        .then((fetchedUnits) => {
          if (fetchedUnits === undefined) {
            console.log("no units found");
          } else {
            tempUnits = fetchedUnits;
            fetchedUnits.forEach(async (unit) => {
              await checkUnitCompleted(unit.id).then((val) => {
                if (tempUnitCompletions === undefined) {
                  tempUnitCompletions = { [unit.id]: val };
                } else {
                  tempUnitCompletions[unit.id] = val;
                }
              });

              await getTopics(unit.id).then((fetchedTopics) => {
                if (fetchedTopics === undefined) {
                  console.log("no topics for unit ", unit.id);
                } else {
                  if (tempTopics === undefined) {
                    tempTopics = { [unit.id]: fetchedTopics };
                  } else {
                    tempTopics[unit.id] = fetchedTopics;
                  }

                  console.log(
                    "found ",
                    fetchedTopics,
                    " topics for unit ",
                    unit.id
                  );

                  fetchedTopics.forEach(async (topic) => {
                    await checkTopicCompleted(unit.id, topic.id).then((val) => {
                      if (tempTopicCompletions === undefined) {
                        tempTopicCompletions = { [topic.id]: val };
                      } else {
                        tempTopicCompletions[topic.id] = val;
                      }
                    });
                  });
                }
              });
            });
          }
        })
        .then(() => {
          if (!didCancel) {
            console.log("topics before setting", tempTopics);
            dispatch({
              type: "FETCH_SUCCESS",
              payload: {
                role: tempRole,
                units: tempUnits,
                unitCompletions: tempUnitCompletions,
                topics: tempTopics,
                topicCompletions: tempTopicCompletions,
              },
            });
          }
        })
        .catch((error) => {
          if (!didCancel) {
            dispatch({ type: "FETCH_FAILURE", error: error });
          }
        });
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  const handleAddUnit = (values: Store) => {
    const newUnit: NewUnit = {
      unit_number: values.unitnumber,
      name: values.name,
    };

    addUnit(newUnit).then(() => window.location.reload());
  };

  const handleDeleteUnit = (unit_id: string) => {
    deleteUnit(unit_id).then(() => window.location.reload());
  };

  const handleAddTopic = (unit_id: string, values: Store) => {
    const newTopic: NewTopic = {
      quiz_number: values.quiz_number,
      topic: values.topic,
    };

    addTopic(unit_id, newTopic).then(() => window.location.reload());
  };

  const handleDeleteTopic = (unit_id: string, topic_id: string) => {
    deleteTopic(unit_id, topic_id).then(() => window.location.reload());
  };

  switch (state.status) {
    case "LOADING":
      return <p>Loading...</p>;
    case "ERROR":
      return <p>Something went wrong :(</p>;
    case "SUCCESS":
      const { role, units, unitCompletions, topics, topicCompletions } = {
        ...state.data,
      };

      console.log("state at start of render: ", state);
      return (
        <>
          <h1>Units Page</h1>
          {units === undefined ? (
            <>
              {role === "teacher" || role === "admin" ? (
                <p>Create your first Unit</p>
              ) : null}
              <p>No Units</p>
            </>
          ) : (
            units.map((unit) => {
              console.log("topics inside render: ", topics);
              return (
                <Card
                  key={unit.id}
                  title={
                    <>
                      {unit.name}
                      {unitCompletions && unitCompletions[unit.id] === true ? (
                        <CheckSquareFilled />
                      ) : (
                        <CheckSquareOutlined />
                      )}
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
                  {topics === undefined ? (
                    <>
                      {role === "teacher" || role === "admin" ? (
                        <p>Create your first topic</p>
                      ) : null}
                      <p>No Topics</p>
                    </>
                  ) : (
                    <>
                      {topics[unit.id].map((topic) => {
                        return (
                          <Card
                            key={topic.id}
                            type="inner"
                            title={
                              <>
                                {topic.topic}
                                {topicCompletions &&
                                topicCompletions[topic.id] === true ? (
                                  <CheckSquareFilled />
                                ) : (
                                  <CheckSquareOutlined />
                                )}
                              </>
                            }
                            extra={
                              <>
                                <Link
                                  to={`/units/quiz/${unit.id}/${topic.id}`}
                                ></Link>

                                {role === "teacher" || role === "admin" ? (
                                  <>
                                    <Button
                                      onClick={() => {
                                        handleDeleteTopic(unit.id, topic.id);
                                      }}
                                    >
                                      <DeleteOutlined />
                                    </Button>
                                  </>
                                ) : null}
                              </>
                            }
                          />
                        );
                      })}
                    </>
                  )}
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
                            <Form.Item name="quiz_number" label="Quiz Number">
                              <Input />
                            </Form.Item>
                            <Form.Item name="topic" label="Topic Name">
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
            })
          )}
          {role === "teacher" || role === "admin" ? (
            <>
              <Collapse accordion>
                <Panel header="Add New Unit" key="1">
                  <Form name="addunit" onFinish={handleAddUnit}>
                    {/* TODO: Automate unit number updating */}
                    <Form.Item name="unitnumber" label="Unit Number">
                      <Input />
                    </Form.Item>
                    <Form.Item name="name" label="Unit Name">
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Add Unit
                      </Button>
                    </Form.Item>
                  </Form>
                </Panel>
              </Collapse>
              <br></br>
            </>
          ) : null}
        </>
      );
    default:
      return <p>Weird Loading...</p>;
  }
};

export default Units;
