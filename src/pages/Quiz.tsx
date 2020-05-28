import React, { useEffect } from "react";

import { RouteComponentProps, useNavigate } from "@reach/router";

import { db } from "services/firebase";

import { Question } from "models/Question";
import { LivesContainer } from "components/LivesContainer";
import { MultipleChoice } from "components/MultipleChoice";

interface Props extends RouteComponentProps {}

export const Quiz: React.FC<Props> = () => {
  const [questions, setQuestions] = React.useState<Question[] | null>(null);
  const [currentQuestionIndex, setQuestionIndex] = React.useState<number>(0);
  const [lives, setLives] = React.useState<number>(3);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    let question: Question;
    let tempQuestions: Question[] = [];
    await db
      .collection("units")
      .doc("unit_1")
      .collection("questions")
      .get()
      .then((collectionSnapshot) => {
        collectionSnapshot.forEach((ss) => {
          question = ss.data() as Question;
          question.id = ss.id;
          tempQuestions.push(question);
        });
      })
      .then(() => {
        setQuestions(tempQuestions);
      });
  };

  const handleResult = (result: boolean) => {
    // if the user gets it wrong, take a life
    if (!result) {
      setLives(lives - 1);
    }

    // continue in any case
    setQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuestion = () => {
    return questions && currentQuestionIndex < questions.length ? (
      <MultipleChoice
        key={questions[currentQuestionIndex].id}
        question={questions[currentQuestionIndex]}
        handleResult={handleResult}
      />
    ) : (
      quizEnded(true)
    );
  };

  const quizEnded = (passed: boolean) => {
    return (
      <>
        {passed ? (
          <h2>Good job you passed the quiz!</h2>
        ) : (
          <h2>You're out of lives</h2>
        )}

        <button onClick={resetQuiz}>Restart Quiz</button>
        <button
          onClick={() => {
            navigate("/welcome");
          }}
        >
          Return to Unit List
        </button>
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
