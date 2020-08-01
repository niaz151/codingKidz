import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Space } from "antd";

import { db } from "../services/firebase";
import { Question } from "../models/Question";

import { fetchUnits, fetchQuestionsByUnit } from '../services/api';
import { Store } from "antd/lib/form/interface";



export const UploadPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>();
    const { unit } = useParams();


    useEffect(() => {
        if (!unit) {
            throw new Error("Enter a valid unit.")
        }

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
                wrong_answers: values.wrong_answers
            })
            .then((ref) => {
                alert("Updated");
                console.log(ref)
            });

    }

    return questions ? (
        <ul>
            {questions.map((question) => {
                return (
                    <Form
                        name="question"
                        initialValues={{
                            questionID: question.id,
                            question: question.question,
                            correct_answer: question.correct_answer,
                            wrong_answers: question.wrong_answers,
                        }}
                        onFinish={editQuestion}
                    >
                        <Form.Item label="questionID" name="questionID">
                            <Input />
                        </Form.Item>
                        <Form.Item label="question" name="question">
                            <Input />
                        </Form.Item>
                        <Form.Item label="correct_answer" name="correct_answer">
                            <Input />
                        </Form.Item>
                        <Form.Item label="wrong_answers" name="wrong_answers">
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Change
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