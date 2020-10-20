import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Form, Input, Button } from "antd";

import { NewQuestion, Question } from "models";

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
  topic_id: string;
}

const EditTopic: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>();
  const { unit_id, topic_id } = useParams<RouteParams>();

  // load topics for unit
  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      await getTopics(unit_id)
        .then((topics) => {
          if (topics === undefined) {
            console.log("no topics created yet for unit ", unit_id);
            return;
          }

          getQuestions(unit_id, topic_id).then((questions) => {
            if (!didCancel) {
              setQuestions(questions);
            }
          });
        })
        .catch((error) => {
          if (!didCancel) {
            console.log("Error", error);
          }
        });
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [unit_id, topic_id]);

  const handleEditQuestion = async (values: Store) => {
    console.log("editQuestion hit");

    const editedQuestion: Question = {
      id: values.question_id,
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

  const handleAddQuestion = async (values: Store) => {
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

  const handleDeleteQuestion = async (question_id: string) => {
    await deleteQuestion(unit_id, topic_id, question_id).then(() => {
      // refreshes page after question deleted
      window.location.reload();
    });
  };

  return (
    <>
      <p>Edit Topic Page</p>
      <Form name="addquestion" onFinish={handleAddQuestion}>
        <Form.Item label="Question" name="question" style={{ width: 600 }}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Correct answer"
          name="correct_answer"
          style={{ width: 300 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Wrong answer 1"
          name="wrong_answer0"
          style={{ width: 300 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Wrong answer 2"
          name="wrong_answer1"
          style={{ width: 300 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Wrong answer 3"
          name="wrong_answer2"
          style={{ width: 300 }}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add question
          </Button>
        </Form.Item>
      </Form>
      {!questions ? (
        <p>Add your first question!</p>
      ) : (
        questions.map((question) => {
          return (
            <Form
              name="question"
              onFinish={handleEditQuestion}
              initialValues={{
                id: question.id,
                question: question.question,
                correct_answer: question.correct_answer,
                wrong_answer0: question.wrong_answers[0],
                wrong_answer1: question.wrong_answers[1],
                wrong_answer2: question.wrong_answers[2],
              }}
            >
              <Form.Item label="Question ID" name="question_id">
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Question"
                name="question"
                style={{ width: 600 }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Correct answer"
                name="correct_answer"
                style={{ width: 300 }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Wrong answer 1"
                name="wrong_answer0"
                style={{ width: 300 }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Wrong answer 2"
                name="wrong_answer1"
                style={{ width: 300 }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Wrong answer 3"
                name="wrong_answer2"
                style={{ width: 300 }}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Change
                </Button>
                <Button
                  type="dashed"
                  danger
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  Delete question
                </Button>
              </Form.Item>
            </Form>
          );
        })
      )}
    </>
  );
};

export default EditTopic;

// return (
//   <>
//     <br></br>
//     <p>Topic: {topic.topic}</p>
//     <p>Topic Number: {topic.quiz_number}</p>
//     <p>Number of questions: {questions.length}</p>
// <Form
//   name="addquestion"
//   onFinish={(values) => {
//     handleAddQuestion(topic.id, values);
//   }}
// >
//   <Form.Item label="Question" name="question" style={{ width: 600 }}>
//     <Input />
//   </Form.Item>
//   <Form.Item
//     label="Correct answer"
//     name="correct_answer"
//     style={{ width: 300 }}
//   >
//     <Input />
//   </Form.Item>
//   <Form.Item
//     label="Wrong answer 1"
//     name="wrong_answer0"
//     style={{ width: 300 }}
//   >
//     <Input />
//   </Form.Item>
//   <Form.Item
//     label="Wrong answer 2"
//     name="wrong_answer1"
//     style={{ width: 300 }}
//   >
//     <Input />
//   </Form.Item>
//   <Form.Item
//     label="Wrong answer 3"
//     name="wrong_answer2"
//     style={{ width: 300 }}
//   >
//     <Input />
//   </Form.Item>
//   <Form.Item>
//     <Button type="primary" htmlType="submit">
//       Add question
//     </Button>
//   </Form.Item>
// </Form>
//     <p>----------------------------------</p>
//     {questions[topic.id].map((question) => {
//       return (
// <Form
//   name="question"
//   onFinish={(values) => {
//     handleEditQuestion(question.id, topic.id, values);
//   }}
//   initialValues={{
//     id: question.id,
//     question: question.question,
//     correct_answer: question.correct_answer,
//     wrong_answer0: question.wrong_answers[0],
//     wrong_answer1: question.wrong_answers[1],
//     wrong_answer2: question.wrong_answers[2],
//   }}
// >
//   <Form.Item label="Question ID" name="id">
//     <Input disabled />
//   </Form.Item>
//   <Form.Item
//     label="Question"
//     name="question"
//     style={{ width: 600 }}
//   >
//     <Input />
//   </Form.Item>
//   <Form.Item
//     label="Correct answer"
//     name="correct_answer"
//     style={{ width: 300 }}
//   >
//     <Input />
//   </Form.Item>
//   <Form.Item
//     label="Wrong answer 1"
//     name="wrong_answer0"
//     style={{ width: 300 }}
//   >
//     <Input />
//   </Form.Item>
//   <Form.Item
//     label="Wrong answer 2"
//     name="wrong_answer1"
//     style={{ width: 300 }}
//   >
//     <Input />
//   </Form.Item>
//   <Form.Item
//     label="Wrong answer 3"
//     name="wrong_answer2"
//     style={{ width: 300 }}
//   >
//     <Input />
//   </Form.Item>

//   <Form.Item>
//     <Button type="primary" htmlType="submit">
//       Change
//     </Button>
//     <Button
//       type="dashed"
//       danger
//       onClick={() => handleDeleteQuestion(topic.id, question.id)}
//     >
//       Delete question
//     </Button>
//   </Form.Item>
// </Form>
//       );
//     })}
//   </>
// );
