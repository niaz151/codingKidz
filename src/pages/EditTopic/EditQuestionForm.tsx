import {
  isMultipleChoice,
  isTrueFalse,
  MultipleChoice,
  TrueFalse,
} from "models";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

import { MultipleChoiceForm } from "./MultipleChoiceForm";
import { TrueFalseForm } from "./TrueFalseForm";

export const EditQuestionForm = (props: {
  initialQuestion?: MultipleChoice | TrueFalse;
  unit_id: string;
  topic_id: string;
}) => {
  const { initialQuestion, unit_id, topic_id } = props;

  const [questionType, setQuestionType] = useState<string>("MultipleChoice");

  // Choose question type to create if not provided with an initial question to edit, else display form for correct question type
  if (!initialQuestion) {
    return (
      <>
        <Form>
          <Form.Label>New Question Type</Form.Label>
          <Form.Control
            required
            as="select"
            onChange={(event) => {
              switch (event.target.value) {
                case "MultipleChoice":
                  setQuestionType("MultipleChoice");
                  break;
                case "TrueFalse":
                  setQuestionType("TrueFalse");
                  break;
                default:
                  throw new Error("Invalid question type");
              }
            }}
            value={questionType}
          >
            <option value="MultipleChoice">Multiple Choice</option>
            <option value="TrueFalse">True False</option>
          </Form.Control>
        </Form>
        {questionType === "MultipleChoice" && (
          <MultipleChoiceForm unit_id={unit_id} topic_id={topic_id} />
        )}
        {questionType === "TrueFalse" && (
          <TrueFalseForm unit_id={unit_id} topic_id={topic_id} />
        )}
      </>
    );
  } else if (isMultipleChoice(initialQuestion)) {
    return (
      <MultipleChoiceForm
        initialQuestion={initialQuestion}
        unit_id={unit_id}
        topic_id={topic_id}
      />
    );
  } else if (isTrueFalse(initialQuestion)) {
    return (
      <TrueFalseForm
        initialQuestion={initialQuestion}
        unit_id={unit_id}
        topic_id={topic_id}
      />
    );
  } else {
    return <p>If you see me something is wrong</p>;
  }
};
