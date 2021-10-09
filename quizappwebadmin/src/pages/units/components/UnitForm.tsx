import { useState } from "react";
import {
  Language,
  Unit,
} from "../../../utils/models";

import { Button, Col, Row } from "react-bootstrap";
import { useAppDispatch } from "../../../ducks/hooks";
import { createMultipleChoiceQuestion, editUnit } from "../languagesSlice";

type Props = {
  languageId: Language["id"];
  unitId: Unit["id"];
};

const UnitForm = (props: Props) => {

  const { languageId, unitId } = props;
  const dispatch = useAppDispatch();

  const [unitTitle, setUnitTitle] = useState<string>("");
 
  const onSubmit = () => {
    // Ensure all fields are filled before submitting
    if (
      unitTitle === "" 
    ) {
      alert("fill out the form!");
    } 
    else{
      dispatch(
        editUnit({
          languageId: props.languageId,
          unitId: props.unitId,
          title: unitTitle
        })
      );
    };
  };

  return (
    <Col>
      <Row>
        <label>Unit Title</label>
        <input
          onChange={(event) => setUnitTitle(event.target.value)}
        />
      </Row>
      <Button onClick={onSubmit}> Save </Button>
    </Col>
  );
};

export default UnitForm;

