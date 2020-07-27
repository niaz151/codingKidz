import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Space } from "antd";

import { db } from "../services/firebase";
import { Question } from "../models/Question";

import { FaPencilAlt } from 'react-icons/fa';




export const UploadPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>();



    useEffect(() => {
        fetchUnits()

    }, []);


    const fetchUnits = async () => {
        let tempQuestion: Question;
        let tempQuestions: Question[] = [];
        await db
            .collection("units")
            .doc("unit_test")
            .collection("questions")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((res) => {
                    tempQuestion = res.data() as Question
                    tempQuestion.id = res.id
                    tempQuestions.push(tempQuestion);
                });
            })
            .then(() => {
                setQuestions(tempQuestions);
            });
    };


    return questions ? (
        <ul>
            {questions.map((question) => {
                return (
                    <Form
                    name="question"
                    initialValues={{
                        question: question.correct_answer

                    }}
                >
                    <Form.Item label="question" name="question">
                        <Input />
                    </Form.Item>
                </Form>
                );
            })}
        </ul>
    ) : (
            <p>Loading...</p>
        )


};