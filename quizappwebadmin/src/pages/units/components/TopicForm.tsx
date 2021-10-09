import { useState } from "react";
import {
  Language,
  Unit,
  Topic
} from "../../../utils/models";

import { Button, Col, Row } from "react-bootstrap";
import { useAppDispatch } from "../../../ducks/hooks";
import { createMultipleChoiceQuestion, editTopic } from "../languagesSlice";

type Props = {
  languageId: Language["id"];
  unitId: Unit["id"];
  topicId: Topic["id"];
};

const TopicForm = (props: Props) => {

  const { languageId, unitId, topicId } = props;
  const dispatch = useAppDispatch();

  const [topicTitle, setTopicTitle] = useState<string>("");
 
  const onSubmit = () => {
    // Ensure all fields are filled before submitting
    if (
      topicTitle === "" 
    ) {
      alert("fill out the form!");
    } 
    else{
      dispatch(
        editTopic({
          languageId: props.languageId,
          unitId: props.unitId,
          topicId: props.topicId,
          title: topicTitle
        })
      );
    };
  };


  return (
    <Col>
      <Row>
        <label>Topic Title</label>
        <input
          onChange={(event) => setTopicTitle(event.target.value)}
        />
      </Row>
      <Button onClick={onSubmit}> Save </Button>
    </Col>
  );
};

export default TopicForm;

