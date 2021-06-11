import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { MCQuestionContainer, TFQuestionContainer } from ".";
import { Topic } from "../../../utils/models";
import MCForm from "./MCForm";

interface Props {
  topic: Topic;
}

const TopicContainer = (props: Props) => {
  const { topic } = props;
  const [showTFForm, setShowTFForm] = useState(false);
  const [showMCForm, setShowMCForm] = useState(false);

  return (
    <div>
      <Col>
        <Row>
          <p>{topic.name}</p>
          <button>Edit</button>
          <button>Delete</button>
        </Row>
        <h4>Multiple Choice Questions</h4>
        {topic.multipleChoiceQuestions?.map((question) => {
          return <MCQuestionContainer question={question} key={question.id} />;
        })}
        {showMCForm ? (
          <MCForm />
        ) : (
          <button onClick={() => setShowMCForm(true)}>
            Add Multiple Choice Question
          </button>
        )}

        <h4>True False Questions</h4>
        {topic.trueFalseQuestions?.map((question) => {
          return <TFQuestionContainer question={question} key={question.id} />;
        })}
        <button>Add True False Question</button>
      </Col>
    </div>
  );
};

export default TopicContainer;
