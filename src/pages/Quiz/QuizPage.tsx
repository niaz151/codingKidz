import React, { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { markQuizCompleted, useQuestions } from "services/api";
import { LivesContainer } from "./LivesContainer";
import { QuestionContainer } from "./QuestionContainer";
import { Button } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";

interface RouteParams {
  unit_id: string;
  topic_id: string;
}

const Quiz: React.FC = () => {
  const QUESTIONS_PER_QUIZ = 20;
  const { unit_id, topic_id } = useParams<RouteParams>();
  const [questions, questionsLoading, questionsError] = useQuestions(
    unit_id,
    topic_id
  );
  const [questionIndex, setQuestionIndex] = React.useState<number>(0);
  const [lives, setLives] = React.useState(3);

  const [selectedQuestions, setSelectedQuestions] = useState<
    typeof questions
  >();

  useEffect(() => {
    setSelectedQuestions(
      questions?.sort(() => 0.5 - Math.random()).slice(0, QUESTIONS_PER_QUIZ)
    );
  }, [questions]);

  const handleAnswerSelection = (result: boolean) => {
    // if the user gets it wrong, take a life
    if (!result) {
      setLives(lives - 1);
    }

    // continue in any case
    setQuestionIndex(questionIndex + 1);
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setLives(3);
  };

  const QuizEnded = (props: { passed: boolean }) => {
    const { passed } = props;

    if (passed) {
      markQuizCompleted(unit_id, topic_id);
    }

    return (
      <>
        {passed ? (
          <h2>Good job you passed the quiz!</h2>
        ) : (
          <h2>You're out of lives</h2>
        )}

        <Button onClick={resetQuiz}>Restart Quiz</Button>
        <Link to="/units">Return to Unit List</Link>
      </>
    );
  };

  return lives >= 1 ? (
    <>
      <LivesContainer lives={lives} />
      {questionsError && <ExclamationTriangle color="red" />}
      {(questionsLoading || !selectedQuestions) && <p>Loading questions...</p>}
      {!questionsLoading &&
        selectedQuestions &&
        (questionIndex < selectedQuestions.length ? (
          <QuestionContainer
            key={selectedQuestions[questionIndex].id}
            question={selectedQuestions[questionIndex]}
            handleResult={handleAnswerSelection}
          />
        ) : (
          <QuizEnded passed={true} />
        ))}
    </>
  ) : (
    <QuizEnded passed={false} />
  );
};

export default Quiz;
