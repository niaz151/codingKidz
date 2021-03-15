import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await createUsers();
  await generateData();
}

async function createUsers() {
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
}

async function generateData() {
  const loopsUnit = await prisma.unit.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      id: 1,
      name: "Loops",
      number: 1,
      // topics: {
      //   createMany: {
      //     data: [
      //       {
      //         id: 1,
      //         name: "Loops I",
      //         number: 1,
      //       },
      //       {
      //         id: 2,
      //         name: "Loops II",
      //         number: 2,
      //       },
      //     ],
      //   },
      // },
    },
  });
  
  console.log("Created Loops Unit", loopsUnit);


  const recursionUnit = await prisma.unit.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      id: 2,
      name: "Recursion",
      number: 1,
    },
  });

  console.log("Created Recursion Unit", recursionUnit);

  const testingUnit = await prisma.unit.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      id: 3,
      name: "Testing",
      number: 1,
    },
  });

  console.log("Created Testing Unit", testingUnit);

  const loops1Topic = await prisma.topic.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      id: 1,
      name: "Loops I",
      number: 1,
      unitId: 1,
    },
  });

  console.log("Created topic", loops1Topic);

  const loops2Topic = await prisma.topic.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      id: 2,
      name: "Loops II",
      number: 2,
      unitId: 1,
    },
  });

  console.log("Created topic", loops2Topic);

  const loops1MCQuestion1 = await prisma.multipleChoiceQuestion.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      question: "Where is the forever block?",
      correctAnswer: "Control",
      wrongAnswer0: "Sound",
      wrongAnswer1: "Operators",
      wrongAnswer2: "Motion",
      topicId: 1,
    },
  });

  const loops1MCQuestion2 = await prisma.multipleChoiceQuestion.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      question: "What is the maximum value you can put into repeat?",
      correctAnswer: "10",
      wrongAnswer0: "100",
      wrongAnswer1: "1000000",
      wrongAnswer2: "Whatever you want!",
      topicId: 1,
    },
  });

  const loops1TFQuestion1 = await prisma.trueFalseQuestion.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      question: "Forever is a control block",
      correctAnswer: true,
      topicId: 1,
    },
  });

  const loops1TFQuestion2 = await prisma.trueFalseQuestion.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      question: "You cannot use a variable in repeat",
      correctAnswer: false,
      topicId: 1,
    },
  });

  console.log("Created questions", loops1MCQuestion1, loops1MCQuestion2, loops1TFQuestion1, loops1TFQuestion2);

  const loops2MCQuestion1 = await prisma.multipleChoiceQuestion.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 3,
      question: "Which block do you use to run code indefinitely?",
      correctAnswer: "Forever",
      wrongAnswer0: "Repeat",
      wrongAnswer1: "Wait",
      wrongAnswer2: "Move",
      topicId: 2,
    },
  });

  const loops2MCQuestion2 = await prisma.multipleChoiceQuestion.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      question: "What set of blocks could make one square?",
      correctAnswer: "Repeat, Move, Turn, Pen Down",
      wrongAnswer0: "Forever, Move, Turn, Pen Up",
      wrongAnswer1: "Glide, Point in Direction, Set Y, If",
      wrongAnswer2: "Blah, blah blah",
      topicId: 2,
    },
  });

  const loops2TFQuestion1 = await prisma.trueFalseQuestion.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      question: "Forever is a motion block",
      correctAnswer: false,
      topicId: 2,
    },
  });

  const loops2TFQuestion2 = await prisma.trueFalseQuestion.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 4,
      question: "You can use a variable in repeat",
      correctAnswer: true,
      topicId: 2,
    },
  });


  console.log("Created questions", loops2MCQuestion1, loops2MCQuestion2, loops2TFQuestion1, loops2TFQuestion2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
