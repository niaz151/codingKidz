import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Space } from "antd";

import { db } from "../services/firebase";
import { Question } from "../models/Question";

import { FaPencilAlt } from 'react-icons/fa';




export const UploadPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>();
    const { unit } = useParams();


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
    const editQuestion = () => {
        return (
            <Form
                name="editquestion"
                className="edit-question-form">

                <Form.Item
                    name="question"
                    label="Question"
                    rules={[
                        {
                            required: true,
                            message: "Please input a question",
                        },
                    ]}
                >

                    <Input
                        type="text"
                        placeholder="Text"
                    />
                </Form.Item>

            </Form>
        )
    }


    // let data = "unit_3"

    // const pushUnit = async () => {
    //     await db
    //         .collection("units")
    //         .add({ data })
    // }

    return questions ? (
        <ul>
            {questions.map((questions) => {
                return <p>{questions.question}
                    <button onClick={editQuestion}>
                        <FaPencilAlt />
                    </button>
                </p>
            })}

        </ul>
    ) : (
            <p>Loading...</p>
        )
}