import { Button, Form, Accordion, Card, FormControl } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";
import React, { useState } from "react";
import { addUnit, useRole, useUnits } from "services/api";
import { UnitContainer } from "./UnitContainer";

const Units: React.FC = () => {
  const [roleData, roleLoading, roleError] = useRole();
  const [units, unitsLoading, unitError] = useUnits();

  const AddUnitForm = () => {
    const [number, setNumber] = useState<number>();
    const [name, setName] = useState<string>();

    const handleAddUnit = () => {
      if (!number || !name) {
        console.log("got nothing from form even though it's required")
      } else {
        addUnit({
          unit_number: number,
          name: name
        });
      }
    };

    return (
      <Form name="addunit" onSubmit={handleAddUnit}>
        {/* TODO: Automate unit number updating */}
        <Form.Group>
          <Form.Label>Unit Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter unit number"
            onChange={(event) => {
              setNumber(Number(event.target.value));
            }}
          />
          <FormControl.Feedback type="invalid">
            Please enter unit number
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Unit Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter unit name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <FormControl.Feedback type="invalid">
            Please enter unit name
          </FormControl.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Unit
        </Button>
      </Form>
    );
  };

  return (
    <>
      {unitError && (
        <p>
          <ExclamationTriangle color="#EED202" /> Units error
        </p>
      )}
      {roleError && (
        <p>
          <ExclamationTriangle color="#EED202" /> Role error
        </p>
      )}
      {unitsLoading || roleLoading || !units || !roleData ? (
        <p>Loading units...</p>
      ) : (
        <>
          <div>
            {units.map((unit) => {
              return (
                <UnitContainer key={unit.id} role={roleData.role} unit={unit} />
              );
            })}
          </div>
          <div>
            {(roleData.role === "teacher" || roleData.role === "admin") && (
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} eventKey="0">
                      Add New Unit
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <AddUnitForm />
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Units;
