import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Console } from "console";

const prisma = new PrismaClient();

var questions = [
  {
    type: "MC",
    correct: "option_1",
    text: "After the green flag was clicked, the Sprite moved. Which Event block was used?",
    questions: {
      option_1: "When Backdrop Switches",
      option_2: "When Green Flag Clicked",
      option_3: "Move 10 Steps",
      option_4: "When this Sprite Clicked",
    },
  },
  {
    type: "MC",
    correct: "option_2",
    text: "When the backdrop switched, the Sprite began to spin. When Event block was used?",
    questions: {
      option_1: "When this Sprite clicked",
      option_2: "When Backdrop switches",
      option_3: "When Green Flag Clicked",
      option_4: "When Space Key Pressed",
    },
  },
  {
    type: "MC",
    correct: "option_3",
    text: "When I pessed the Up Arrow Key, the Sprite moved up. Which Event block was used?",
    questions: {
      option_1: "When Green Flag Clicked",
      option_2: "When Space Key Pressed",
      option_3: "When Green Flash Clicked",
      option_4: "When Space Key Pressed",
    },
  },
  {
    type: "MC",
    correct: "option_4",
    text: "When I pressed the Green Flag, the Sprite began to move. When I clicked on the Sprite, the Sprite began to spin. When Event block was uesd to make the Sprite spin?",
    questions: {
      option_1: "When Green FLag Clicked",
      option_2: "When Space Key Pressed",
      option_3: "When Up Arrow Key Pressed",
      option_4: "When this Sprite Clicked",
    },
  },
  {
    type: "MC",
    correct: "option_1",
    text: "When I pressed the Green Flag, the Sprite disappeared. When I pressed the Space Key, the Sprite reappeared. Which two Event blocks were used to make the sprite disappear and reappear?",
    questions: {
      option_1: "When Green Flag Clicked and when Backdrop Switches",
      option_2: "When Space Key Pressed and when this Sprite Clicked",
      option_3: "When Green Flag Clicked and when Space Key Pressed",
      option_4: "When Backdrop Switches and when this Sprite Clicked",
    },
  },
  {
    type: "TF",
    correct: "option_2",
    text: "When I clicked the Green Flag, the Sprite moved. That means I used the 'When Space Key Pressed' block.",
    questions: {
      option_1: "False",
      option_2: "True",
    },
  },
  {
    type: "TF",
    correct: "option_2",
    text: "When the Backdrop Switched, the Sprite changed colors. That means I used the 'When Backdrop Switches' block.",
    questions: {
      option_1: "False",
      option_2: "True",
    },
  },
  {
    type: "TF",
    correct: "option_1",
    text: "When the Green Flag was clicked, the Sprite started to change colors. When I clicked on the Sprite, the Sprite began to spin. That means I used the 'When This Sprite Clicked' block to make the Sprite spin.",
    questions: {
      option_1: "False",
      option_2: "True",
    },
  },
  {
    type: "TF",
    correct: "option_1",
    text: "When I pressed the space key, the Sprite moved. That means I used the 'When Green Flag Clicked' block.",
    questions: {
      option_1: "False",
      option_2: "True",
    },
  },
  {
    type: "TF",
    correct: "option_2",
    text: "When I clicked the Green Flag, the Sprite began to spin around.",
    questions: {
      option_1: "False",
      option_2: "True",
    },
  },
];

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
        create: [...Array(10).keys()].map((unitval) => {
          return {
            name: `Unit ${unitval}`,
            number: unitval,
            topics: {
              create: [...Array(10).keys()].map((topicval) => {
                return {
                  name: `Lesson ${topicval}`,
                  number: topicval,
                  multipleChoiceQuestions: {
                    create: [...Array(40).keys()].map((questionval) => {
                      return {
                        // changing it to questions[questionval] throws error because this maps over 40 
                        // whereas I have 10 samples questions
                        question: `Question ${questions[0].text}`,
                        correctAnswer: `Correct ${questions[0].questions.option_1}`,
                        wrongAnswer0: `Wrong 0 ${questions[0].questions.option_2}`,
                        wrongAnswer1: `Wrong 1 ${questions[0].questions.option_3}`,
                        wrongAnswer2: `Wrong 2 ${questions[0].questions.option_4}`,
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
  });

  console.log("Generating Scratch JR outline...");
  await prisma.language.create({
    data: {
      name: "Scratch JR",
      units: {
        create: [...Array(10).keys()].map((unitval) => {
          return {
            name: `Unit ${unitval}`,
            number: unitval,
            topics: {
              create: [...Array(10).keys()].map((topicval) => {
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
  });
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
