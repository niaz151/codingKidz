import React, { useEffect, useState } from "react";
import { Unit } from "models";
import { Link } from "react-router-dom";

import {
  fetchUnits,
  getUser,
  getRole,
  getCompletedQuizzes,
} from "services/api";

import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Form, Button, Collapse, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import { pushUnit, deleteUnit } from "../services/api";

const Units: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>();
  const [completions, setCompletions] = useState<Record<string, boolean>>();
  const [loadingCompletions, setLoading] = useState(true);
  const [role, setRole] = useState<string>();
  const user = getUser();
  const { Panel } = Collapse;

  if (user) {
    getRole().then((r) => {
      setRole(r);
    });
  }

  useEffect(() => {
    fetchUnits().then((units) => {
      setUnits(units);
    });
  }, []);

  useEffect(() => {
    getCompletedQuizzes().then((records) => {
      setCompletions(records);
      setLoading(false);
    });
  }, [units]);

  const handlePushCollection = (values: Store) => {
    const newUnit: Unit = {
      id: values.unitid,
      unit_number: values.unitnumber,
      // topic is what is displayed on the list of units not id
      topic: values.topic,
    };

    pushUnit(newUnit);
    window.location.reload();
  };

  const handleDeleteUnit = (unitID: string) => {
    deleteUnit(unitID);
    window.location.reload();
  };

  return units ? (
    <>
      {role === "teacher" || role === "admin" ? (
        <>
          <Collapse
            accordion
            style={{ width: 260, marginTop: 16, marginBottom: 16 }}
          >
            <Panel header="Add new Unit" key="1">
              <Form name="addunit" onFinish={handlePushCollection}>
                <Form.Item name="unitid" label="Unit Name">
                  <Input />
                </Form.Item>
                <Form.Item name="unitnumber" label="Unit Number">
                  <Input />
                </Form.Item>
                <Form.Item name="topic" label="Topic">
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

      <ul>
        {units.map((unit) => {
          return (
            <li key={unit.id} style={{ marginLeft: 600 }}>
              {!loadingCompletions ? (
                completions && completions[unit.id] === true ? (
                  // completions ? (
                  <p>Completed</p>
                ) : (
                  <p>Not Completed</p>
                )
              ) : (
                <p>Loading Completions...</p>
              )}
              <Link to={{ pathname: `/quiz/${unit.id}` }}>{unit.topic}</Link>

              {role === "teacher" || role === "admin" ? (
                <>
                  <Link to={{ pathname: `/upload/${unit.id}` }}>
                    <FaPencilAlt />
                  </Link>
                  <Button onClick={() => handleDeleteUnit(unit.id)}>
                    <MdDelete />
                  </Button>
                </>
              ) : null}
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <p>Loading Units...</p>
  );
};

export default Units;
