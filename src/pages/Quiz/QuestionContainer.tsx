import * as React from "react";
import {
  isMultipleChoice,
  isTrueFalse,
  MultipleChoice,
  TrueFalse,
} from "models";
import { Button } from "react-bootstrap";
import {
  useMultipleChoiceAnswerImageURL,
  useQuestionImageURL,
} from "services/api";

export const QuestionContainer = (props: {
  unit_id: string;
  topic_id: string;
  question: MultipleChoice | TrueFalse;
  handleResult: (result: boolean) => void;
}) => {
  const { question, handleResult, unit_id, topic_id } = props;

  if (isMultipleChoice(question)) {
    return (
      <MultipleChoiceContainer
        question={question}
        handleResult={handleResult}
        unit_id={unit_id}
        topic_id={topic_id}
      />
    );
  } else if (isTrueFalse(question)) {
    return (
      <TrueFalseContainer
        question={question}
        handleResult={handleResult}
        unit_id={unit_id}
        topic_id={topic_id}
      />
    );
  } else {
    return <p>Invalid question</p>;
  }
};

const MultipleChoiceContainer = (props: {
  unit_id: string;
  topic_id: string;
  question: MultipleChoice;
  handleResult: (result: boolean) => void;
}) => {
  const { unit_id, topic_id, question, handleResult } = props;
  // const [answers] = React.useState<string[]>(
  //   [
  //     question.wrong_answers.wrong_answer_0,
  //     question.wrong_answers.wrong_answer_1,
  //     question.wrong_answers.wrong_answer_2,
  //     question.wrong_answers.wrong_answer_3,
  //   ]
  //     .concat(question.correct_answer)
  //     .sort(() => Math.random() - 0.5)
  // );

  const [
    questionImageURL,
    questionImageURLLoading,
    questionImageURLError,
  ] = useQuestionImageURL(unit_id, topic_id, question.id);

  const [
    correctImageURL,
    correctImageURLLoading,
    correctImageURLError,
  ] = useMultipleChoiceAnswerImageURL(
    unit_id,
    topic_id,
    question.id,
    "correct"
  );

  const [
    wrong0ImageURL,
    wrong0ImageURLLoading,
    wrong0ImageURLError,
  ] = useMultipleChoiceAnswerImageURL(unit_id, topic_id, question.id, "wrong0");

  const [
    wrong1ImageURL,
    wrong1ImageURLLoading,
    wrong1ImageURLError,
  ] = useMultipleChoiceAnswerImageURL(unit_id, topic_id, question.id, "wrong1");

  const [
    wrong2ImageURL,
    wrong2ImageURLLoading,
    wrong2ImageURLError,
  ] = useMultipleChoiceAnswerImageURL(unit_id, topic_id, question.id, "wrong2");

  const [
    wrong3ImageURL,
    wrong3ImageURLLoading,
    wrong3ImageURLError,
  ] = useMultipleChoiceAnswerImageURL(unit_id, topic_id, question.id, "wrong3");

  const checkAnswer = (answer: string) => {
    if (answer === question.correct_answer) {
      handleResult(true);
    } else {
      handleResult(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* display question */}
      <div className="mt-4">
        <h3>{question.question}</h3>
      </div>

      <div
        className="mt-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {questionImageURLError &&
          questionImageURLError.code !== "storage/object-not-found" && (
            <p>{questionImageURLError.message}</p>
          )}
        {questionImageURLLoading && <p>Loading image...</p>}
        {!questionImageURLLoading && questionImageURL && (
          <img
            src={questionImageURL}
            alt="Supporting Answer"
            width="10%"
            height="20%"
          />
        )}
      </div>

      <div
        className="mt-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {correctImageURLError &&
          correctImageURLError.code !== "storage/object-not-found" && (
            <p>{correctImageURLError.message}</p>
          )}
        {correctImageURLLoading && <p>Loading image...</p>}
        {!correctImageURLLoading && correctImageURL && (
          <img
            src={correctImageURL}
            alt="Supporting Answer"
            width="10%"
            height="20%"
          />
        )}
        <Button onClick={() => checkAnswer(question.correct_answer)}>
          {question.correct_answer}
        </Button>
      </div>

      <div
        className="mt-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {wrong0ImageURLError &&
          wrong0ImageURLError.code !== "storage/object-not-found" && (
            <p>{wrong0ImageURLError.message}</p>
          )}
        {wrong0ImageURLLoading && <p>Loading image...</p>}
        {!wrong0ImageURLLoading && wrong0ImageURL && (
          <img
            src={wrong0ImageURL}
            alt="Supporting Answer"
            width="10%"
            height="20%"
          />
        )}
        <Button
          onClick={() => checkAnswer(question.wrong_answers.wrong_answer_0)}
        >
          {question.wrong_answers.wrong_answer_0}
        </Button>
      </div>

      <div
        className="mt-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {wrong1ImageURLError &&
          wrong1ImageURLError.code !== "storage/object-not-found" && (
            <p>{wrong1ImageURLError.message}</p>
          )}
        {wrong1ImageURLLoading && <p>Loading image...</p>}
        {!wrong1ImageURLLoading && wrong1ImageURL && (
          <img
            src={wrong1ImageURL}
            alt="Supporting Answer"
            width="10%"
            height="20%"
          />
        )}
        <Button
          onClick={() => checkAnswer(question.wrong_answers.wrong_answer_1)}
        >
          {question.wrong_answers.wrong_answer_1}
        </Button>
      </div>

      <div
        className="mt-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {wrong2ImageURLError &&
          wrong2ImageURLError.code !== "storage/object-not-found" && (
            <p>{wrong0ImageURLError.message}</p>
          )}
        {wrong2ImageURLLoading && <p>Loading image...</p>}
        {!wrong2ImageURLLoading && wrong0ImageURL && (
          <img
            src={wrong2ImageURL}
            alt="Supporting Answer"
            width="10%"
            height="20%"
          />
        )}
        <Button
          onClick={() => checkAnswer(question.wrong_answers.wrong_answer_2)}
        >
          {question.wrong_answers.wrong_answer_2}
        </Button>
      </div>

      <div
        className="mt-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {wrong3ImageURLError &&
          wrong3ImageURLError.code !== "storage/object-not-found" && (
            <p>{wrong0ImageURLError.message}</p>
          )}
        {wrong3ImageURLLoading && <p>Loading image...</p>}
        {!wrong3ImageURLLoading && wrong0ImageURL && (
          <img
            src={wrong3ImageURL}
            alt="Supporting Answer"
            width="10%"
            height="20%"
          />
        )}
        <Button
          onClick={() => checkAnswer(question.wrong_answers.wrong_answer_3)}
        >
          {question.wrong_answers.wrong_answer_3}
        </Button>
      </div>
    </div>
  );
};

const TrueFalseContainer = (props: {
  unit_id: string;
  topic_id: string;
  question: TrueFalse;
  handleResult: (result: boolean) => void;
}) => {
  const { question, handleResult, unit_id, topic_id } = props;

  const [url, urlLoading, urlError] = useQuestionImageURL(
    unit_id,
    topic_id,
    question.id
  );

  const checkAnswer = (answer: boolean) => {
    if (answer === question.answer) {
      handleResult(true);
    } else {
      handleResult(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* display question */}
      <div className="mt-4">
        <h3>{question.question}</h3>
      </div>

      <div
        className="mt-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {urlError && <p>{urlError.message}</p>}
        {urlLoading && <p>Loading image...</p>}
        {!urlLoading && url && (
          <img src={url} alt="Supporting Question" width="10%" height="20%" />
        )}
      </div>

      <div
        className="mt-5 w-25"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button
          onClick={() => {
            checkAnswer(true);
          }}
        >
          True
        </Button>
        <Button
          onClick={() => {
            checkAnswer(false);
          }}
        >
          False
        </Button>
      </div>
    </div>
  );
};
