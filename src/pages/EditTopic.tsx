import React, { useEffect, useReducer, useState } from "react";

import { useParams } from "react-router-dom";

import { Form, Input, Button } from "antd";

import { NewQuestion, Question, Topic } from "models";

import {
  getQuestions,
  editQuestion,
  addQuestion,
  deleteQuestion,
  getTopics,
} from "services/api";
import { Store } from "antd/lib/form/interface";

interface RouteParams {
  unit_id: string;
}

type Data = {
  topics?: Topic[];
  questions?: { [topic_id: string]: Question[] };
};

type State =
  | { status: "EMPTY" }
  | { status: "LOADING" }
  | { status: "ERROR"; error: string }
  | { status: "SUCCESS"; data: Data };

type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: Data }
  | { type: "FETCH_FAILURE"; error: string };

const EditTopic: React.FC = () => {
  // const [topics, setTopics] = useState<Topic[]>();
  // const [questions, setQuestions] = useState<{
  //   [topic_id: string]: Question[];
  // }>();
  const { unit_id } = useParams<RouteParams>();

  const dataFetchReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "FETCH_INIT":
        return {
          ...state,
          status: "LOADING",
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          status: "SUCCESS",
          data: action.payload,
        };
      case "FETCH_FAILURE":
        return {
          ...state,
          status: "ERROR",
          error: action.error,
        };
      default:
        throw new Error("Invalid action type");
    }
  };

  const [state, dispatch] = useReducer(dataFetchReducer, { status: "EMPTY" });

  // load topics for unit
  useEffect(() => {
    let didCancel = false;

    
    const fetchData = async () => {
      let tempTopics: Topic[];
      let tempQuestions: {[topic_id: string]: Question[]};

      dispatch({type: "FETCH_INIT"})
      await getTopics(unit_id).then((topics) => {
        if(topics === undefined){
          console.log("no topics created yet for unit ", unit_id)
          return;
        }
  
        let tempQuestions: { [topic: string]: Question[] } = {};
        topics.forEach((topic) => {
          getQuestions(unit_id, topic.id).then((questions) => {
            tempQuestions[topic.id] = questions;
          });
        });
  
        if(!didCancel) {
          dispatch({type: "FETCH_SUCCESS", payload: {
            topics: tempTopics,
            questions: tempQuestions
          }})
        }
      }).catch((error) => {
        if(!didCancel) {
          dispatch({type: "FETCH_FAILURE", error: error})
        }
      });
    }

    fetchData();

    return () => {
      didCancel = true;
    }
  }, [unit_id]);

  const handleEditQuestion = async (
    question_id: string,
    topic_id: string,
    values: Store
  ) => {
    console.log("editQuestion hit");

    const editedQuestion: Question = {
      id: question_id,
      question: values.question,
      correct_answer: values.correct_answer,
      wrong_answers: [
        values.wrong_answer0,
        values.wrong_answer1,
        values.wrong_answer2,
      ],
    };

    await editQuestion(unit_id, topic_id, editedQuestion).then(() => {
      window.location.reload();
    });
  };

  const handleAddQuestion = async (topic_id: string, values: Store) => {
    console.log("addQuestion hit");

    const newQuestion: NewQuestion = {
      question: values.question,
      correct_answer: values.correct_answer,
      wrong_answers: [
        values.wrong_answer0,
        values.wrong_answer1,
        values.wrong_answer2,
      ],
    };

    await addQuestion(unit_id, topic_id, newQuestion).then(() => {
      window.location.reload();
    });
  };

  const handleDeleteQuestion = async (
    topic_id: string,
    question_id: string
  ) => {
    await deleteQuestion(unit_id, topic_id, question_id).then(() => {
      // refreshes page after question deleted
      window.location.reload();
    });
  };

  switch(state.status) {
    case "LOADING":
      return <p>Loading...</p>
    case "ERROR":
      return <p>Something went wrong :(</p>
    case "SUCCESS":
      const {topics, questions} = {...state.data};
      return (
        <>
          <p>Edit Unit Page!</p>
        </>
      )
    default:
      return <p>Weird Loading...</p>
  }
};

export default EditTopic;

// return (
//   <>
//     <br></br>
//     <p>Topic: {topic.topic}</p>
//     <p>Topic Number: {topic.quiz_number}</p>
//     <p>Number of questions: {questions.length}</p>
//     <Form
//       name="addquestion"
//       onFinish={(values) => {
//         handleAddQuestion(topic.id, values);
//       }}
//     >
//       <Form.Item label="Question" name="question" style={{ width: 600 }}>
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Correct answer"
//         name="correct_answer"
//         style={{ width: 300 }}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Wrong answer 1"
//         name="wrong_answer0"
//         style={{ width: 300 }}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Wrong answer 2"
//         name="wrong_answer1"
//         style={{ width: 300 }}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Wrong answer 3"
//         name="wrong_answer2"
//         style={{ width: 300 }}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Add question
//         </Button>
//       </Form.Item>
//     </Form>
//     <p>----------------------------------</p>
//     {questions[topic.id].map((question) => {
//       return (
//         <Form
//           name="question"
//           onFinish={(values) => {
//             handleEditQuestion(question.id, topic.id, values);
//           }}
//           initialValues={{
//             id: question.id,
//             question: question.question,
//             correct_answer: question.correct_answer,
//             wrong_answer0: question.wrong_answers[0],
//             wrong_answer1: question.wrong_answers[1],
//             wrong_answer2: question.wrong_answers[2],
//           }}
//         >
//           <Form.Item label="Question ID" name="id">
//             <Input disabled />
//           </Form.Item>
//           <Form.Item
//             label="Question"
//             name="question"
//             style={{ width: 600 }}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Correct answer"
//             name="correct_answer"
//             style={{ width: 300 }}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Wrong answer 1"
//             name="wrong_answer0"
//             style={{ width: 300 }}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Wrong answer 2"
//             name="wrong_answer1"
//             style={{ width: 300 }}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Wrong answer 3"
//             name="wrong_answer2"
//             style={{ width: 300 }}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Change
//             </Button>
//             <Button
//               type="dashed"
//               danger
//               onClick={() => handleDeleteQuestion(topic.id, question.id)}
//             >
//               Delete question
//             </Button>
//           </Form.Item>
//         </Form>
//       );
//     })}
//   </>
// );
