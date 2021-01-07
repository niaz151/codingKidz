import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

import {
  addQuestion,
  editQuestion,
  setQuestionImage,
  useQuestionImageURL,
  setMultipleChoiceAnswerImage,
  useMultipleChoiceAnswerImageURL
} from "services/api";

import { MultipleChoice } from "models";
import { ExclamationTriangle } from "react-bootstrap-icons";

export const MultipleChoiceForm = (props: {
  initialQuestion?: MultipleChoice;
  unit_id: string;
  topic_id: string;
}) => {
  const { initialQuestion, unit_id, topic_id } = props;
  const [question, setQuestion] = useState<string | undefined>(
    initialQuestion?.question
  );

  const [correct_answer, setCorrectAnswer] = useState<string | undefined>(
    initialQuestion?.correct_answer
  );
  const [wrong_answer0, setWrong0] = useState<string | undefined>(
    initialQuestion?.wrong_answers.wrong_answer_0
  );
  const [wrong_answer1, setWrong1] = useState<string | undefined>(
    initialQuestion?.wrong_answers.wrong_answer_1
  );
  const [wrong_answer2, setWrong2] = useState<string | undefined>(
    initialQuestion?.wrong_answers.wrong_answer_2
  );
  const [wrong_answer3, setWrong3] = useState<string | undefined>(
    initialQuestion?.wrong_answers.wrong_answer_3
  );

  const [questionImage, setQuestionImageLocal] = useState<File>();
  const [correctImage, setCorrectImage] = useState<File>();
  const [wrong0Image, setWrong0Image] = useState<File>();
  const [wrong1Image, setWrong1Image] = useState<File>();
  const [wrong2Image, setWrong2Image] = useState<File>();
  const [wrong3Image, setWrong3Image] = useState<File>();

  const [questionImageURL, questionImageURLLoading, questionImageURLError] = useQuestionImageURL(
    unit_id,
    topic_id,
    initialQuestion?.id
  );

  const [correctImageURL, correctImageURLLoading, correctImageURLError] = useMultipleChoiceAnswerImageURL(
    unit_id,
    topic_id,
    initialQuestion?.id,
    "correct"
  );

  const [wrong0ImageURL, wrong0ImageURLLoading, wrong0ImageURLError] = useMultipleChoiceAnswerImageURL(
    unit_id,
    topic_id,
    initialQuestion?.id,
    "wrong0"
  );

  const [wrong1ImageURL, wrong1ImageURLLoading, wrong1ImageURLError] = useMultipleChoiceAnswerImageURL(
    unit_id,
    topic_id,
    initialQuestion?.id,
    "wrong1"
  );

  const [wrong2ImageURL, wrong2ImageURLLoading, wrong2ImageURLError] = useMultipleChoiceAnswerImageURL(
    unit_id,
    topic_id,
    initialQuestion?.id,
    "wrong2"
  );

  const [wrong3ImageURL, wrong3ImageURLLoading, wrong3ImageURLError] = useMultipleChoiceAnswerImageURL(
    unit_id,
    topic_id,
    initialQuestion?.id,
    "wrong3"
  );

  

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (
      !question ||
      !correct_answer ||
      !wrong_answer0 ||
      !wrong_answer1 ||
      !wrong_answer2 ||
      !wrong_answer3
    ) {
      console.log("got empty values from required controls");
    } else {
      if (initialQuestion) {
        console.log(
          "editing",
          initialQuestion.id,
          "to unit:topic",
          unit_id,
          ":",
          topic_id
        );
        editQuestion(unit_id, topic_id, {
          id: initialQuestion.id,
          question: question,
          correct_answer: correct_answer,
          wrong_answers: {
            wrong_answer_0: wrong_answer0,
            wrong_answer_1: wrong_answer1,
            wrong_answer_2: wrong_answer2,
            wrong_answer_3: wrong_answer3,
          },
        }).then(() => {
          if (questionImage) {
            setQuestionImage(
              unit_id,
              topic_id,
              initialQuestion.id,
              questionImage
            );
          }
          if (correctImage) {
            setMultipleChoiceAnswerImage(
              unit_id,
              topic_id,
              initialQuestion.id,
              correctImage,
              "correct"
            );
          }
          if (wrong0Image) {
            setMultipleChoiceAnswerImage(
              unit_id,
              topic_id,
              initialQuestion.id,
              wrong0Image,
              "wrong0"
            );
          }
          if (wrong1Image) {
            setMultipleChoiceAnswerImage(
              unit_id,
              topic_id,
              initialQuestion.id,
              wrong1Image,
              "wrong1"
            );
          }
          if (wrong2Image) {
            setMultipleChoiceAnswerImage(
              unit_id,
              topic_id,
              initialQuestion.id,
              wrong2Image,
              "wrong2"
            );
          }
          if (wrong3Image) {
            setMultipleChoiceAnswerImage(
              unit_id,
              topic_id,
              initialQuestion.id,
              wrong3Image,
              "wrong3"
            );
          }
        });
      } else {
        console.log(
          "adding",
          question,
          "to unit:topic",
          unit_id,
          ":",
          topic_id
        );
        addQuestion(unit_id, topic_id, {
          question: question,
          correct_answer: correct_answer,
          wrong_answers: {
            wrong_answer_0: wrong_answer0,
            wrong_answer_1: wrong_answer1,
            wrong_answer_2: wrong_answer2,
            wrong_answer_3: wrong_answer3,
          },
        }).then((doc) => {
          if (questionImage) {
            setQuestionImage(unit_id, topic_id, doc.id, questionImage);
          }
          if (correctImage) {
            setMultipleChoiceAnswerImage(
              unit_id,
              topic_id,
              doc.id,
              correctImage,
              "correct"
            );
          }
          if (wrong0Image) {
            setMultipleChoiceAnswerImage(
              unit_id,
              topic_id,
              doc.id,
              wrong0Image,
              "wrong0"
            );
          }
          if (wrong1Image) {
            setMultipleChoiceAnswerImage(
              unit_id,
              topic_id,
              doc.id,
              wrong1Image,
              "wrong1"
            );
          }
          if (wrong2Image) {
            setMultipleChoiceAnswerImage(
              unit_id,
              topic_id,
              doc.id,
              wrong2Image,
              "wrong2"
            );
          }
          if (wrong3Image) {
            setMultipleChoiceAnswerImage(
              unit_id,
              topic_id,
              doc.id,
              wrong3Image,
              "wrong3"
            );
          }
        });
      }
    }
    event.preventDefault();
  };

  const handleQuestionImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setQuestionImageLocal(event.target.files[0]);
    }
  };

  const handleCorrectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setCorrectImage(event.target.files[0]);
    }
  };

  const handleWrong0Image = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setWrong0Image(event.target.files[0]);
    }
  };

  const handleWrong1Image = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setWrong1Image(event.target.files[0]);
    }
  };

  const handleWrong2Image = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setWrong2Image(event.target.files[0]);
    }
  };

  const handleWrong3Image = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setWrong3Image(event.target.files[0]);
    }
  };

  return (
    <Form name="addquestion" onSubmit={onSubmit}>
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
      {questionImageURLError && questionImageURLError.code !== "storage/object-not-found" && (
        <p>
          <ExclamationTriangle color="#EED202" /> {questionImageURLError.code}
        </p>
      )}
      {questionImageURLLoading && <p>Loading image...</p>}
      {initialQuestion &&
        !questionImageURLLoading &&
        (questionImageURL === undefined ||
          questionImageURLError?.code === "storage/object-not-found") && (
          <p>No image set for question yet</p>
        )}
      {!questionImageURLLoading && questionImageURL && (
        <img src={questionImageURL} alt="Supporting Question" width="10%" height="20%" />
      )}
      <Form.Group>
        {!questionImageURLLoading && (
          <Form.Label>
            {" "}
            Upload {questionImageURL ? "a new" : "an"} image to go with the question{" "}
          </Form.Label>
        )}
        <Form.File onChange={handleQuestionImage} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Correct Answer</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Correct Answer Here"
          defaultValue={initialQuestion?.correct_answer}
          onChange={(event) => {
            setCorrectAnswer(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      {correctImageURLError && correctImageURLError.code !== "storage/object-not-found" && (
        <p>
          <ExclamationTriangle color="#EED202" /> {correctImageURLError.code}
        </p>
      )}
      {correctImageURLLoading && <p>Loading image...</p>}
      {initialQuestion &&
        !correctImageURLLoading &&
        (correctImageURL === undefined ||
          correctImageURLError?.code === "storage/object-not-found") && (
          <p>No image set for correct answer yet</p>
        )}
      {!correctImageURLLoading && correctImageURL && (
        <img src={correctImageURL} alt="Supporting Correct Answer" width="10%" height="20%" />
      )}
      <Form.Group>
        {!correctImageURLLoading && (
          <Form.Label>
            {" "}
            Upload {correctImageURL ? "a new" : "an"} image for the correct answer{" "}
          </Form.Label>
        )}
        <Form.File onChange={handleCorrectImage} />
      </Form.Group>
      <Form.Group>
        <Form.Label>First Wrong Answer</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Wrong Answer Here"
          defaultValue={initialQuestion?.wrong_answers.wrong_answer_0}
          onChange={(event) => {
            setWrong0(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      {wrong0ImageURLError && wrong0ImageURLError.code !== "storage/object-not-found" && (
        <p>
          <ExclamationTriangle color="#EED202" /> {wrong0ImageURLError.code}
        </p>
      )}
      {wrong0ImageURLLoading && <p>Loading image...</p>}
      {initialQuestion &&
        !wrong0ImageURLLoading &&
        (wrong0ImageURL === undefined ||
          wrong0ImageURLError?.code === "storage/object-not-found") && (
          <p>No image set for first wrong answer yet</p>
        )}
      {!wrong0ImageURLLoading && wrong0ImageURL && (
        <img src={wrong0ImageURL} alt="Supporting first wrong answer" width="10%" height="20%" />
      )}
      <Form.Group>
        {!wrong0ImageURLLoading && (
          <Form.Label>
            {" "}
            Upload {wrong0ImageURL ? "a new" : "an"} image for the first wrong answer{" "}
          </Form.Label>
        )}
        <Form.File onChange={handleWrong0Image} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Second Wrong Answer</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Wrong Answer Here"
          defaultValue={initialQuestion?.wrong_answers.wrong_answer_1}
          onChange={(event) => {
            setWrong1(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      {wrong1ImageURLError && wrong1ImageURLError.code !== "storage/object-not-found" && (
        <p>
          <ExclamationTriangle color="#EED202" /> {wrong1ImageURLError.code}
        </p>
      )}
      {wrong1ImageURLLoading && <p>Loading image...</p>}
      {initialQuestion &&
        !wrong1ImageURLLoading &&
        (wrong1ImageURL === undefined ||
          wrong1ImageURLError?.code === "storage/object-not-found") && (
          <p>No image set for the first wrong answer yet</p>
        )}
      {!wrong1ImageURLLoading && wrong1ImageURL && (
        <img src={wrong1ImageURL} alt="Supporting Second Wrong Answer" width="10%" height="20%" />
      )}
      <Form.Group>
        {!wrong1ImageURLLoading && (
          <Form.Label>
            {" "}
            Upload {wrong1ImageURL ? "a new" : "an"} image for the second wrong answer{" "}
          </Form.Label>
        )}
        <Form.File onChange={handleWrong1Image} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Third Wrong Answer</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Wrong Answer Here"
          defaultValue={initialQuestion?.wrong_answers.wrong_answer_2}
          onChange={(event) => {
            setWrong2(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      {wrong2ImageURLError && wrong2ImageURLError.code !== "storage/object-not-found" && (
        <p>
          <ExclamationTriangle color="#EED202" /> {wrong2ImageURLError.code}
        </p>
      )}
      {wrong2ImageURLLoading && <p>Loading image...</p>}
      {initialQuestion &&
        !wrong2ImageURLLoading &&
        (wrong2ImageURL === undefined ||
          wrong2ImageURLError?.code === "storage/object-not-found") && (
          <p>No image set for the third wrong answer yet</p>
        )}
      {!wrong2ImageURLLoading && wrong2ImageURL && (
        <img src={wrong2ImageURL} alt="Supporting Third Wrong Answer" width="10%" height="20%" />
      )}
      <Form.Group>
        {!wrong2ImageURLLoading && (
          <Form.Label>
            {" "}
            Upload {wrong2ImageURL ? "a new" : "an"} image for the third wrong answer{" "}
          </Form.Label>
        )}
        <Form.File onChange={handleWrong2Image} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Fourth Wrong Answer</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter Wrong Answer Here"
          defaultValue={initialQuestion?.wrong_answers.wrong_answer_3}
          onChange={(event) => {
            setWrong3(event.target.value);
          }}
        />
        <FormControl.Feedback type="invalid">
          Please enter answer
        </FormControl.Feedback>
      </Form.Group>
      {wrong3ImageURLError && wrong3ImageURLError.code !== "storage/object-not-found" && (
        <p>
          <ExclamationTriangle color="#EED202" /> {wrong3ImageURLError.code}
        </p>
      )}
      {wrong3ImageURLLoading && <p>Loading image...</p>}
      {initialQuestion &&
        !wrong3ImageURLLoading &&
        (wrong3ImageURL === undefined ||
          wrong3ImageURLError?.code === "storage/object-not-found") && (
          <p>No image set for the first wrong answer yet</p>
        )}
      {!wrong3ImageURLLoading && wrong3ImageURL && (
        <img src={wrong3ImageURL} alt="Supporting Fourth Wrong Answer" width="10%" height="20%" />
      )}
      <Form.Group>
        {!wrong3ImageURLLoading && (
          <Form.Label>
            {" "}
            Upload {wrong3ImageURL ? "a new" : "an"} image for the fourth wrong answer{" "}
          </Form.Label>
        )}
        <Form.File onChange={handleWrong3Image} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {!initialQuestion ? "Add Question" : "Edit Question"}
      </Button>
    </Form>
  );
};
