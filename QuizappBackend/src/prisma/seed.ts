import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const seed = async () => {
  try {
    await createUsers();
    await generateData();
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

  console.log("Generating Initial Quiz Results Data"),
  await prisma.quizResult.create({
    data:{
      status: "PENDING",
      userId: 2,
      topicId: 1,
    }
  })
};