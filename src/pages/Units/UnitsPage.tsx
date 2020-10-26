import { Button, Collapse, Form, Input, InputNumber } from "antd";
import { Store } from "antd/lib/form/interface";
import { assert } from "console";
import { NewTopic, NewUnit, Role, Topic, Unit } from "models";
import React, { useEffect, useState } from "react";
import {
  addTopic,
  addUnit,
  deleteTopic,
  deleteUnit,
  getRole,
  getTopics,
  getUnits,
} from "services/api";
import { UnitContainer } from "./UnitContainer";

type State = {
  role?: Role;
  units?: Unit[];
  unitCompletions?: { [unit_id: string]: boolean };
  topics?: { [unit_id: string]: Topic[] };
  topicCompletions?: { [topic_id: string]: boolean };
  loading?: boolean;
};

const Units: React.FC = () => {
  const [role, setRole] = useState<Role>();
  const [units, setUnits] = useState<Unit[]>();

  const { Panel } = Collapse;

  const handleAddUnit = (values: Store) => {
    const newUnit: NewUnit = {
      unit_number: values.unitnumber,
      name: values.name,
    };

    addUnit(newUnit).then(() => window.location.reload());
  };

  useEffect(() => {
    // shoutout to https://www.robinwieruch.de/react-hooks-fetch-data
    let didCancel = false;

    const fetchData = () => {
      getRole()
        .then((value) => {
          if (!value) {
            throw new Error("error fetching role");
          } else {
            if (!didCancel) {
              setRole(value);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });

      getUnits()
        .then((units) => {
          if (!didCancel) {
            setUnits(units);
            return units;
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
  }, []);

  return (
    <>
      {!role ? (
        <p>Loading role...</p>
      ) : !units ? (
        <p>Loading units...</p>
      ) : (
        units.map((unit) => {
          return <UnitContainer key={unit.id} role={role} unit={unit} />;
        })
      )}
      {role === "teacher" || role === "admin" ? (
        <>
          <Collapse accordion>
            <Panel header="Add New Unit" key="1">
              <Form name="addunit" onFinish={handleAddUnit}>
                {/* TODO: Automate unit number updating */}
                <Form.Item name="unitnumber" label="Unit Number">
                  <InputNumber />
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
};

export default Units;
