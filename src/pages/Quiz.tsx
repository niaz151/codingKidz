import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { getQuestions, markQuizCompleted } from "services/api";

import { Question } from "models";
import { LivesContainer, MultipleChoice } from "components";
import { Button } from "antd";

interface RouteParams {
  unit_id: string;
  topic_id: string;
}

const Quiz: React.FC = () => {
  const { unit_id, topic_id } = useParams<RouteParams>();
  const [questions, setQuestions] = React.useState<Question[]>();
  const [questionIndex, setQuestionIndex] = React.useState<number>(0);
  const [lives, setLives] = React.useState(3);

  useEffect(() => {
    getQuestions(unit_id, topic_id).then((questions) => {
      if(!questions) {
        throw new Error("No Questions")
      }
      var temp = questions.sort(() => Math.random() - 0.5);
      if (questions.length > 20) {
        temp = temp.slice(0, 19 + 1);
      }
      setQuestions(temp);
    });
  }, [unit_id, topic_id]);

  const handleAnswerSelection = (result: boolean) => {
    // if the user gets it wrong, take a life
    if (!result) {
      setLives(lives - 1);
    }

    // continue in any case
    setQuestionIndex(questionIndex + 1);
  };

  const renderQuestion = () => {
    return questions ? (
      questionIndex < questions.length ? (
        <MultipleChoice
          key={questions[questionIndex].id}
          question={questions[questionIndex]}
          handleResult={handleAnswerSelection}
        />
      ) : (
        quizEnded(true)
      )
    ) : (
      <p>Loading Questions...</p>
    );
  };

  const quizEnded = (passed: boolean) => {
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

  const resetQuiz = () => {
    setQuestionIndex(0);
    setLives(3);
  };

  return lives >= 1 ? (
    <>
      <LivesContainer lives={lives} />
      {questions ? renderQuestion() : <p>Loading Questions...</p>}
    </>
  ) : (
    quizEnded(false)
  );
};

export default Quiz;
