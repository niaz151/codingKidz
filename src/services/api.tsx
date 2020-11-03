import {
  NewQuestion,
  NewTopic,
  NewUnit,
  Question,
  Topic,
  Unit,
  Role,
} from "models";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
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

const getUser = () => {
  return auth.currentUser;
};

export const useUser = () => {
  return useAuthState(auth);
};

export const useRole = () => {
  const [user, , userError] = useUser();
  if (user) {
    return useDocumentData<{ role: Role }>(
      db.collection("users").doc(user.uid)
    );
  } else {
    throw userError;
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

export const useUnits = () => {
  return useCollectionData<Unit>(
    db.collection("units").orderBy("unit_number"),
    { idField: "id" }
  );
};

export const useUnitCompletion = (unit_id: string) => {
  const id = getUser()?.uid;
  if (id) {
    return useDocumentData<{ completed: boolean }>(
      db
        .collection("users")
        .doc(id)
        .collection("data")
        .doc("completion")
        .collection("units")
        .doc(unit_id)
    );
  } else {
    throw new Error("Error fetching user while getting unit completion data");
  }
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

export const useTopics = (unit_id: string) => {
  return useCollectionData<Topic>(
    db.collection("units").doc(unit_id).collection("topics"),
    { idField: "id" }
  );
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

export const useTopicCompletion = (unit_id: string, topic_id: string) => {
  const id = getUser()?.uid;
  if (id) {
    return useDocumentData<{ completed: boolean }>(
      db
        .collection("users")
        .doc(id)
        .collection("data")
        .doc("completion")
        .collection("units")
        .doc(unit_id)
        .collection("topics")
        .doc(topic_id)
    );
  } else {
    throw new Error("Error fetching user while getting unit completion data");
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

export const useQuestions = (unit_id: string, topic_id: string) => {
  return useCollectionData<Question>(
    db
      .collection("units")
      .doc(unit_id)
      .collection("topics")
      .doc(topic_id)
      .collection("questions"),
    { idField: "id" }
  );
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
