import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";

import { db } from "../services/firebase";
import { Question } from "../models/Question";

import { fetchQuestionsByUnit } from '../services/api';
import { Store } from "antd/lib/form/interface";



export const UploadPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>();
    const { unit } = useParams();


    useEffect(() => {
        fetchQuestionsByUnit(unit).then((questions) => {
            setQuestions(questions)
        })

    }, []);

    const editQuestion = async (values: Store) => {
        console.log('editQuestion hit');

        await db
            .collection("units")
            .doc(unit)
            .collection("questions")
            .doc(values.questionID)
            .set({
                question: values.question,
                correct_answer: values.correct_answer,
                wrong_answers: [values.wrong_answer0, values.wrong_answer1, values.wrong_answer2]
            })
            .then((ref) => {
                alert("Updated");
                // refreshes page after question updated
                window.location.reload();
                console.log(ref)
            });

    }

    const addQuestion = async (values: Store) => {
        console.log('addQuestion hit');

        await db
            .collection("units")
            .doc(unit)
            .collection("questions")
            .add({
                question: values.question,
                correct_answer: values.correct_answer,
                wrong_answers: [values.wrong_answer0, values.wrong_answer1, values.wrong_answer2]
            })
            .then((ref) => {
                alert("Question added.");
                // refreshes page after question added
                window.location.reload();
                console.log(ref)
            });
    }
    const deleteQues = async (questionID: string) => {
        await db
            .collection("units")
            .doc(unit)
            .collection("questions")
            .doc(questionID)
            .delete()
            .then((ref) => {
                alert("Question deleted.");
                // refreshes page after question deleted
                window.location.reload();
                console.log(ref)
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }

    return questions ? (
        <ul>
            <Form
                name="addquestion"
                onFinish={addQuestion}
            >
                <Form.Item label="question" name="question">
                    <Input />
                </Form.Item>
                <Form.Item label="correct_answer" name="correct_answer">
                    <Input />
                </Form.Item>
                <Form.Item label="wrong_answer0" name="wrong_answer0">
                    <Input />
                </Form.Item>
                <Form.Item label="wrong_answer1" name="wrong_answer1">
                    <Input />
                </Form.Item>
                <Form.Item label="wrong_answer2" name="wrong_answer2">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add question
                            </Button>
                </Form.Item>

            </Form>
            <p>----------------------------------</p>
            {questions.map((question) => {
                return (

                    <Form
                        name="question"
                        onFinish={editQuestion}
                        initialValues={{
                            questionID: question.id,
                            question: question.question,
                            correct_answer: question.correct_answer,
                            wrong_answer0: question.wrong_answers[0],
                            wrong_answer1: question.wrong_answers[1],
                            wrong_answer2: question.wrong_answers[2],
                        }}

                    >

                        <Form.Item label="questionID" name="questionID">
                            {/* space is needed for the horizontal length of input box to match parent */}
                            <Input />
                        </Form.Item>
                        <Form.Item label="question" name="question">
                            <Input />
                        </Form.Item>
                        <Form.Item label="correct_answer" name="correct_answer">
                            <Input />
                        </Form.Item>
                        <Form.Item label="wrong_answer0" name="wrong_answer0">
                            <Input />
                        </Form.Item>
                        <Form.Item label="wrong_answer1" name="wrong_answer1">
                            <Input />
                        </Form.Item>
                        <Form.Item label="wrong_answer2" name="wrong_answer2">
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Change
                            </Button>
                            <Button type="dashed" danger onClick={() => deleteQues(question.id)}>
                                Delete question
                            </Button>
                        </Form.Item>
                    </Form>
                );
            })}
        </ul>
    ) : (
            <p>Loading...</p>
        )


};