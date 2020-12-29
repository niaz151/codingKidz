import * as React from "react";
import {
  isMultipleChoice,
  isTrueFalse,
  MultipleChoice,
  TrueFalse,
} from "models";
import { Button } from "react-bootstrap";
import { useQuestionImageURL } from "services/api";

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
  question: MultipleChoice;
  handleResult: (result: boolean) => void;
}) => {
  const { question, handleResult } = props;
  const [answers] = React.useState<string[]>(
    [
      question.wrong_answers.wrong_answer_0,
      question.wrong_answers.wrong_answer_1,
      question.wrong_answers.wrong_answer_2,
      question.wrong_answers.wrong_answer_3,
    ]
      .concat(question.correct_answer)
      .sort(() => Math.random() - 0.5)
  );

  const checkAnswer = (answer: string) => {
    if (answer === question.correct_answer) {
      handleResult(true);
    } else {
      handleResult(false);
    }
  };

  return (
    <>
      {/* display question */}
      <h3 style={{ marginLeft: 600, marginBottom: 16 }}>{question.question}</h3>

      {/* diplay answer buttons */}
      {answers.map((answer, idx) => {
        return (
          <p style={{ marginLeft: 600 }} key={idx}>
            <Button onClick={() => checkAnswer(answer)}>{answer}</Button>
          </p>
        );
      })}
    </>
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
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
      {/* display question */}
      <div className="mt-4">
        <h3>{question.question}</h3>
      </div>

      <div className="mt-5" style={{display:'flex', alignItems:"center", justifyContent:'center'}}>
        {urlError && <p>{urlError.message}</p>}
        {urlLoading && <p>Loading image...</p>}
        {!urlLoading && url && (
          <img src={url} alt="Supporting Question" width="10%" height="20%" />
        )}
      </div>

      <div className="mt-5 w-25" style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
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
