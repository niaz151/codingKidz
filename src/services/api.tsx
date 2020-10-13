import {
  NewQuestion,
  NewTopic,
  NewUnit,
  Question,
  Topic,
  Unit,
  Role,
} from "models";
import { auth, db } from "services/firebase";

/**********************
 ****AUTHENTICATION****
 *********************/

export const login = async (email: string, password: string) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const register = async (email: string, password: string, role: Role) => {
  return await auth
    .createUserWithEmailAndPassword(email, password)
    .then(async (newUser) => {
      if (newUser.user) {
        await setOwnRole(role);
      } else {
        throw new Error("Can't find new user after registration");
      }
    })
    .catch(() => {
      throw new Error("Error registering new user");
    });
};

export const signOut = async () => {
  return await auth.signOut().catch(() => {
    throw new Error("Error while signing out");
  });
};

export const resetPassword = async (email: string) => {
  return await auth.sendPasswordResetEmail(email).catch(() => {
    throw new Error("Error while sending password reset email");
  });
};

export const getUser = () => {
  return auth.currentUser;
};

export const getRole = async () => {
  const user = getUser();

  if (user) {
    return await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        const r: Role = documentSnapshot.data()?.role;
        if (r) {
          return r;
        } else {
          console.error("error reading role in api");
        }
      });
  } else {
    throw new Error("No User");
  }
};

export const setOthersRole = async (uid: string, role: Role) => {
  await db
    .collection("users")
    .doc(uid)
    .set({ role: role })
    .catch(() => {
      throw new Error("Error setting others role");
    });
};

export const setOwnRole = async (role: Role) => {
  const user = getUser();

  if (!user) {
    throw new Error("Error fetching user while setting own role");
  }

  return await db
    .collection("users")
    .doc(user.uid)
    .set({ role: role })
    .catch(() => {
      throw new Error("Error setting own role");
    });
};

/****************
 ****DATABASE****
 ***************/

export const addUnit = async (unit: NewUnit) => {
  return await db
    .collection("units")
    .add({
      name: unit.name,
      unit_number: unit.unit_number,
    })
    .catch(() => {
      throw new Error("Error adding unit");
    });
};

export const getUnits = async () => {
  let tempUnit: Unit;
  let tempUnits: Unit[] = [];
  return await db
    .collection("units")
    .orderBy("unit_number")
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        return;
      }
      querySnapshot.forEach((res) => {
        tempUnit = res.data() as Unit;
        tempUnit.id = res.id;
        tempUnits.push(tempUnit);
      });

      if (!tempUnits) {
        throw new Error("Empty Units");
      }

      return tempUnits;
    })
    .catch(() => {
      throw new Error("Error getting units");
    });
};

export const markUnitCompleted = async (unit_id: string) => {
  const id = getUser()?.uid;

  if (id) {
    return await db
      .collection("users")
      .doc(id)
      .collection("data")
      .doc("completion")
      .collection("units")
      .doc(unit_id)
      .update({
        completed: true,
      })
      .catch(() => {
        throw new Error("Error marking unit completed");
      });
  } else {
    throw new Error("Error fetching user while marking unit completed");
  }
};

export const checkUnitCompleted = async (unit_id: string) => {
  const id = getUser()?.uid;

  if (id) {
    return await db
      .collection("users")
      .doc(id)
      .collection("data")
      .doc("completion")
      .collection("units")
      .doc(unit_id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let c = doc.data() as { completed: boolean };
          return c.completed;
        } else {
          return false;
        }
      })
      .catch(() => {
        throw new Error("Error checking unit completed");
      });
  } else {
    throw new Error("Error fetching user while checking unit completed");
  }
};

export const deleteUnit = async (unit_id: string) => {
  return await db
    .collection("units")
    .doc(unit_id)
    .delete()
    .catch(() => {
      throw new Error("Error deleting unit");
    });
};

export const addTopic = async (unit_id: string, topic: NewTopic) => {
  return await db
    .collection("units")
    .doc(unit_id)
    .collection("topics")
    .add(topic)
    .catch(() => {
      throw new Error("Error adding topic");
    });
};

export const getTopics = async (unit_id: string) => {
  let topic: Topic;
  let topics: Topic[] = [];

  return await db
    .collection("units")
    .doc(unit_id)
    .collection("topics")
    .orderBy("quiz_number")
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        return;
      }
      querySnapshot.forEach((res) => {
        topic = res.data() as Topic;
        topic.id = res.id;
        topics.push(topic);
      });

      if (!topics) {
        throw new Error("Empty Topics!");
      }

      return topics;
    })
    .catch(() => {
      throw new Error("Error getting topics");
    });
};

export const markTopicCompleted = async (unit_id: string, topic_id: string) => {
  const id = getUser()?.uid;

  if (id) {
    return await db
      .collection("users")
      .doc(id)
      .collection("data")
      .doc("completion")
      .collection("units")
      .doc(unit_id)
      .collection("topics")
      .doc(topic_id)
      .update({
        completed: true,
      });
  } else {
    console.error("Error fetching user while marking unit finished");
  }
};

export const checkTopicCompleted = async (
  unit_id: string,
  topic_id: string
) => {
  const id = getUser()?.uid;

  if (id) {
    return await db
      .collection("users")
      .doc(id)
      .collection("data")
      .doc("completion")
      .collection("units")
      .doc(unit_id)
      .collection("topics")
      .doc(topic_id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let c = doc.data() as { completed: boolean };
          return c.completed;
        } else {
          return false;
        }
      });
  } else {
    throw new Error("Error fetching user while checking unit completed");
  }
};

export const deleteTopic = async (unit_id: string, topic_id: string) => {
  return await db
    .collection("units")
    .doc(unit_id)
    .collection("topics")
    .doc(topic_id)
    .delete()
    .catch(() => {
      throw new Error("Error deleting topic");
    });
};

export const markQuizCompleted = async (unit_id: string, topic_id: string) => {
  const id = getUser()?.uid;
  if (id) {
    return await db
      .collection("users")
      .doc(id)
      .collection("data")
      .doc("completionData")
      .collection(unit_id)
      .doc(topic_id)
      .set({ completed: true });
  } else {
    throw new Error("Error fetching user while marking quiz completed");
  }
};

export const addQuestion = async (
  unit_id: string,
  topic_id: string,
  newQuestion: NewQuestion
) => {
  return await db
    .collection("units")
    .doc(unit_id)
    .collection("topics")
    .doc(topic_id)
    .collection("questions")
    .add({
      question: newQuestion.question,
      correct_answer: newQuestion.correct_answer,
      wrong_answers: newQuestion.wrong_answers,
    })
    .catch(() => {
      throw new Error("Error adding question");
    });
};

export const editQuestion = async (
  unit_id: string,
  topic_id: string,
  editedQuestion: Question
) => {
  return await db
    .collection("units")
    .doc(unit_id)
    .collection("topics")
    .doc(topic_id)
    .collection("questions")
    .doc(editedQuestion.id)
    .set({
      question: editedQuestion.question,
      correct_answer: editedQuestion.correct_answer,
      wrong_answers: editedQuestion.wrong_answers,
    })
    .catch(() => {
      throw new Error("Error editing question");
    });
};

export const getQuestions = async (unit_id: string, topic_id: string) => {
  let question: Question;
  let tempQuestions: Question[] = [];
  return await db
    .collection("units")
    .doc(unit_id)
    .collection("topics")
    .doc(topic_id)
    .collection("questions")
    .get()
    .then((collectionSnapshot) => {
      collectionSnapshot.forEach((res) => {
        if (!res.data()) {
          return null;
        }
        question = res.data() as Question;
        question.id = res.id;
        tempQuestions.push(question);
      });

      if (!tempQuestions) {
        throw new Error("Empty Questions");
      }

      return tempQuestions;
    })
    .catch(() => {
      throw new Error("Error getting questions");
    });
};

export const deleteQuestion = async (
  unit_id: string,
  topic_id: string,
  question_id: string
) => {
  return await db
    .collection("units")
    .doc(unit_id)
    .collection("topics")
    .doc(topic_id)
    .collection("questions")
    .doc(question_id)
    .delete()
    .catch(() => {
      throw new Error("Error deleting question");
    });
};
