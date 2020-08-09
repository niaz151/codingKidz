import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { fetchQuestionsByUnit, markQuizCompleted } from "services/api";

import { Question } from "models/Question";
import { LivesContainer } from "components/LivesContainer";
import { MultipleChoice } from "components/MultipleChoice";
import { Button } from "antd";

interface RouteParams {
  unit: string;
}

export const Quiz: React.FC = () => {
  const { unit } = useParams<RouteParams>();
  const [questions, setQuestions] = React.useState<Question[]>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState<number>(0);
  const [lives, setLives] = React.useState(3);

  useEffect(() => {
    if (!unit) {
      throw new Error("Quiz Requires a unit!");
    }

    fetchQuestionsByUnit(unit).then((questions) => {
      var temp = questions.sort(() => Math.random() - 0.5)
      if(questions.length > 20) {
        temp = temp.slice(0, 19+1)
      }
      setQuestions(temp);
    });
  }, [unit]);

  const handleAnswerSelection = (result: boolean) => {
    // if the user gets it wrong, take a life
    if (!result) {
      setLives(lives - 1);
    }

    // continue in any case
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuestion = () => {
    return questions && currentQuestionIndex < questions.length ? (
      <MultipleChoice
        key={questions[currentQuestionIndex].id}
        question={questions[currentQuestionIndex]}
        handleResult={handleAnswerSelection}
      />
    ) : (
      quizEnded(true)
    );
  };

  const quizEnded = (passed: boolean) => {
    markQuizCompleted(unit)

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
    setCurrentQuestionIndex(0);
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
