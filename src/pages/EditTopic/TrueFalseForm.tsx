import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import {
  addQuestion,
  editQuestion,
  setQuestionImage,
  useQuestionImageURL,
} from "services/api";

import { TrueFalse } from "models";
import { ExclamationTriangle } from "react-bootstrap-icons";

// TODO Fix bug with being unable to set answer to false

export const TrueFalseForm = (props: {
  initialQuestion?: TrueFalse;
  unit_id: string;
  topic_id: string;
}) => {
  const { initialQuestion, unit_id, topic_id } = props;
  const [question, setQuestion] = useState<string | undefined>(
    initialQuestion?.question
  );
  const [image, setImage] = useState<File>();

  const [answer, setAnswer] = useState<boolean | undefined>(
    initialQuestion?.answer
  );

  const [url, urlLoading, urlError] = useQuestionImageURL(
    unit_id,
    topic_id,
    initialQuestion?.id
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (question === undefined || answer === undefined) {
      console.log("got empty values from required controls");
    } else {
      if (initialQuestion) {
        editQuestion(unit_id, topic_id, {
          id: initialQuestion.id,
          question: question,
          answer: answer,
        }).then(() => {
          if (image) {
            setQuestionImage(unit_id, topic_id, initialQuestion.id, image);
          }
        });
      } else {
        addQuestion(unit_id, topic_id, {
          question: question,
          answer: answer,
        }).then((doc) => {
          if (image) {
            setQuestionImage(unit_id, topic_id, doc.id, image);
          }
        });
      }
    }
    event.preventDefault();
  };

  const handleQuestionImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <Form name="truefalseform" onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Question</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Question Here"
          defaultValue={initialQuestion?.question}
          onChange={(event) => {
            setQuestion(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter question
        </FormControl.Feedback>
      </Form.Group>
      {urlError && urlError.code !== "storage/object-not-found" && (
        <p>
          <ExclamationTriangle color="#EED202" /> {urlError.code}
        </p>
      )}
      {urlLoading && <p>Loading image...</p>}
      {initialQuestion &&
        !urlLoading &&
        (url === undefined ||
          urlError?.code === "storage/object-not-found") && (
          <p>No image set for question yet</p>
        )}
      {!urlLoading && url && (
        <img src={url} alt="Supporting Question" width="10%" height="20%" />
      )}
      <Form.Group>
        {!urlLoading && (
          <Form.Label>
            {" "}
            Upload {url ? "a new" : "an"} image to go with the question{" "}
          </Form.Label>
        )}
        <Form.File onChange={handleQuestionImage} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Correct Answer</Form.Label>
        <Form.Control
          required
          as="select"
          onChange={(event) => {
            switch (event.target.value) {
              case "true":
                setAnswer(true);
                break;
              case "false":
                setAnswer(false);
                break;
              default:
                throw new Error("invalid answer type");
            }
          }}
        >
          {/* TODO remove disabled option as react wants us to use defaultValue/value instead */}
          {!initialQuestion && <option selected={!initialQuestion} disabled>Choose an answer...</option>}
          <option value="true" selected={initialQuestion?.answer === true}>True</option>
          <option value="false" selected={initialQuestion?.answer === false}>False</option>
        </Form.Control>
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        {!initialQuestion ? "Add Question" : "Edit Question"}
      </Button>
    </Form>
  );
};
