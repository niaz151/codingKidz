import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Console } from "console";

const prisma = new PrismaClient();
var mc_questions = [
  {
    id: 0,
    type: "MC",
    correctAnswer: "When this Sprite Clicked",
    question: "After the green flag was clicked, the Sprite moved. Which Event block was used?",
    wrongAnswer0: "When Backdrop Switches",
    wrongAnswer1: "When Green Flag Clicked",
    wrongAnswer2: "Move 10 Steps",
  },
  {
    id: 1,
    type: "MC",
    correctAnswer: "When this Sprite Clicked",
    question: "When the backdrop switched, the Sprite began to spin. Which Event block was used?",
    wrongAnswer0: "When Green Flag Clicked",
    wrongAnswer1: "When Backdrop Switches",
    wrongAnswer2: "When Space Key Pressed",
  },
  {
    id: 2, 
    type: "MC",
    correctAnswer: "When this Sprite Clicked",
    question: "When I pressed the Up Arrow Key, the Sprite moved up. Which Event block was used",
    wrongAnswer0: "When Space Key Pressed",
    wrongAnswer1: "When Up Arrow Key Pressed",
    wrongAnswer2: "When Green Flag Clicked",
  },
  {
    id: 3, 
    type: "MC",
    correctAnswer: "When this Sprite Clicked",
    question: "When I pressed the Green Flag, the Sprite began to move. When I clicked on the Sprite, the Sprite began to spin. Which Event block was used to make the Sprite spin?",
    wrongAnswer0: "When Backdrop Switches",
    wrongAnswer1: "When Green Flag Clicked",
    wrongAnswer2: "When Space Key Pressed",
  },
  {
    id: 4, 
    type: "MC",
    correctAnswer: "When this Sprite Clicked",
    question: "When I pressed the Green Flag, the Sprite disappeared. When I pressed the Space Key, the Sprite reappeared. Which two Event blocks were used to make the sprite disappear and reappear? ",
    wrongAnswer0: "When Green Flag Clicked and When Backdrop Switches",
    wrongAnswer1: "When Green Flag Clicked and When Space Key Pressed",
    wrongAnswer2: "When Backdrop Switches and When this Sprite Clicked",
  },
  {
    id: 5, 
    type: "MC",
    correctAnswer: "Runs when space key is pressed",
    question: "Which of these describes the (Show Green Flag Image’) block? ",
    wrongAnswer0: "Runs when the green flag is pressed",
    wrongAnswer1: "When this Sprite Clicked",
    wrongAnswer2: "Runs when the stop sign is pressed",
  },
  {
    id: 6, 
    type: "MC",
    correctAnswer: "When this Sprite Clicked",
    question: "Which of these describes the (Show the image When This Sprite Clicked) block?",
    wrongAnswer0: "Runs when the green flag is pressed",
    wrongAnswer1: "Runs when the sprite is touched by another sprite",
    wrongAnswer2: "Runs when the backdrop switches",
  },
  {
    id: 7, 
    type: "MC",
    correctAnswer: "When this Sprite Clicked",
    question: "Which of these describes the (Show the image Space Key Pressed)?",
    wrongAnswer0: "Runs when any key is pressed",
    wrongAnswer1: "Runs when the backdrop switches",
    wrongAnswer2: "Runs when the space key is pressed",
  },
  {
    id: 8, 
    type: "MC",
    correctAnswer: "When this Sprite Clicked",
    question: "Which of these describes the (Show the image When Backdrop Switches)?",
    wrongAnswer0: "Runs when the green flag is pressed",
    wrongAnswer1: "Runs when the backdrop switches",
    wrongAnswer2: "Runs when the space key is pressed",
  },
  {
    id: 9, 
    type: "MC",
    correctAnswer: "When this Sprite Clicked",
    question: "Which of these describes the (Show the image When Backdrop Switches)?",
    wrongAnswer0: "Runs when the green flag is pressed",
    wrongAnswer1: "Runs when the backdrop switches",
    wrongAnswer2: "Runs when the space key is pressed",
  },
];
var tf_questions = [
  {
    id:10,
    question: "When I clicked the Green Flag, the Sprite moved. That means I used the ‘When Space Key Pressed’ block.",
    correctAnswer: true,
  },
  {
    id:11,
    question: "When the Backdrop Switched, the Sprite changed colors. That means I used the ‘When Backdrop Switches’ block.",
    correctAnswer: true,
  },
  {
    id:12,
    question: "When the Green Flag was clicked, the Sprite started to change colors. When I clicked on the Sprite, the Sprite began to spin. That means I used the ‘When this Sprite Clicked’ block to make the Sprite spin.",
    correctAnswer: true,
  },
  {
    id:13,
    question: "When I pressed the space key, the Sprite moved. That means I used the ‘When Green Flag Clicked’ block.",
    correctAnswer: true,
  },
  {
    id:14,
    question: "When I pressed the green flag, the Sprite began to spin around. That means I used the ‘When Green Flag Clicked’ block.",
    correctAnswer: true,
  },
  {
    id:15,
    question: "(Show the image: ‘Starts_With_Green_Flag’) This code will run when the space key is pressed.",
    correctAnswer: true,
  },
  {
    id:16,
    question: "(Show the image: ‘Starts_With_Sprite_Clicked’) This code will run when the Sprite is clicked by the mouse",
    correctAnswer: true,
  },
  {
    id:17,
    question: "(Show the image: ‘Starts_With_Space_Key_Pressed’) This code will run when the backdrop switches",
    correctAnswer: true,
  },
  {
    id:18,
    question: "(Show the image: ‘Starts_With_Green_Flag’) This code will run when the Green Flag is pressed.",
    correctAnswer: true,
  },
  {
    id:19,
    question: "(Show the image: ‘Starts_With_Backdrop_Switches’) This code will run when the Sprite changes colors.",
    correctAnswer: true,
  },
]

export const seed = async () => {
  try {
    await createUsers();
    await generateData();
    await createQuizzes();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const createUsers = async () => {
  // Create a user of each type
  const student = await prisma.user.upsert({
    where: { email: "student@test.com" },
    update: {},
    create: {
      email: "student@test.com",
      password: await bcrypt.hash("student", 10),
      roles: ["STUDENT"],
    },
  });

  const teacher = await prisma.user.upsert({
    where: { email: "teacher@test.com" },
    update: {},
    create: {
      email: "teacher@test.com",
      password: await bcrypt.hash("teacher", 10),
      roles: ["TEACHER"],
    },
  });
  const admin = await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      email: "admin@test.com",
      password: await bcrypt.hash("admin", 10),
      roles: ["ADMIN"],
    },
  });

  console.log("Created users", { student, teacher, admin });
};

const generateData = async () => {
  console.log("Generating Scratch outline...");
  await prisma.language.create({
    data: {
      name: "Scratch",
      units: {
        create: [...Array(4).keys()].map((unitval) => {
          return {
            name: `Unit ${unitval}`,
            status: "PENDING",
            number: unitval,
            topics: {
              create: [...Array(3).keys()].map((topicval) => {
                return {
                  name: `Lesson ${topicval}`,
                  number: topicval,
                  multipleChoiceQuestions: {
                    create: mc_questions.map((question) => {
                      return {
                        // try to have the same number of tf and mc questions
                        question: `${question.question}`,
                        correctAnswer: `${question.correctAnswer}`,
                        wrongAnswer0: `${question.wrongAnswer0}`,
                        wrongAnswer1: `${question.wrongAnswer1}`,
                        wrongAnswer2: `${question.wrongAnswer2}`,
                      };
                    }),
                  },
                  trueFalseQuestions: {
                    create: tf_questions.map((question) => {
                      return {
                        question: `${question.question}`,
                        correctAnswer: question.correctAnswer,
                      };
                    }),
                  },
                };
              }), 
            },
          };
        }),
      },
    },
  });

  
  console.log("Generating Scratch JR outline...");
  await prisma.language.create({
    data: {
      name: "Scratch JR",
      units: {
        create: [...Array(4).keys()].map((unitval) => {
          return {
            name: `Unit ${unitval}`,
            status: "PENDING",
            number: unitval,
            topics: {
              create: [...Array(3).keys()].map((topicval) => {
                return {
                  name: `Lesson ${topicval}`,
                  number: topicval,
                  multipleChoiceQuestions: {
                    create: [...Array(40).keys()].map((questionval) => {
                      return {
                        question: `Question ${questionval}`,
                        correctAnswer: `Correct ${questionval}`,
                        wrongAnswer0: `Wrong 0 ${questionval}`,
                        wrongAnswer1: `Wrong 1 ${questionval}`,
                        wrongAnswer2: `Wrong 2 ${questionval}`,
                      };
                    }),
                  },
                  trueFalseQuestions: {
                    create: [...Array(40).keys()].map((questionval) => {
                      return {
                        question: `Question ${questionval}`,
                        correctAnswer: questionval % 2 === 0,
                      };
                    }),
                  },
                };
              }),
            },
          };
        }),
      },
    },
  })
};

const createQuizzes = async () => {
  const topics = await prisma.topic.findMany();
  const num_topics = topics.length;

  for (var i = 1; i < num_topics; i++) {
    // THE FIRST TOPIC IS UNLOCKED
    if (i == 1) {
      await prisma.quizResult.create({
        data: {
          userId: 1,
          topicId: i,
          status: "PENDING",
          grade: 0,
        },
      });
    } else {
      await prisma.quizResult.create({
        data: {
          userId: 1,
          topicId: i,
          status: "LOCKED",
          grade: 0,
        },
      });
    }
  }

  console.log("Created quizzes");
};

seed(); 