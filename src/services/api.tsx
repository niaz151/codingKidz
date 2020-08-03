import { auth, db } from "services/firebase";
import { Question } from "models/Question";
import { Unit } from "models/Unit";

export const login = async (email: string, password: string) => {
  return await auth.signInWithEmailAndPassword(email, password);
};

export const register = async (
  email: string,
  password: string,
  role: string
) => {
  return await auth
    .createUserWithEmailAndPassword(email, password)
    .then(async (newUser) => {
      if (newUser.user) {
        await setRole(newUser.user.uid, role);
      } else {
        throw new Error("Can't find new user");
      }
    });
};

export const signOut = async () => {
  return await auth.signOut();
};

export const resetPassword = async (email: string) => {
  return await auth.sendPasswordResetEmail(email);
};

export const isLoggedIn = () => {
  return auth.currentUser ? true : false;
};

export const getUser = () => {
  return auth.currentUser;
};

export const getRole = async () => {
  const user = getUser();

  return user ? await db
    .collection("users")
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      const r = documentSnapshot.data()?.role as string;
      console.log("role in api:", r);
      return r;
    }) : "no user to get the role of dummy"
};

export const setRole = async (uid: string, role: string) => {
  await db.collection("users").doc(uid).set({ role: role });
};

export const fetchQuestionsByUnit = async (unit: string) => {
  let question: Question;
  let tempQuestions: Question[] = [];
  return await db
    .collection("units")
    .doc(unit)
    .collection("questions")
    .get()
    .then((collectionSnapshot) => {
      collectionSnapshot.forEach((ss) => {
        question = ss.data() as Question;
        question.id = ss.id;
        tempQuestions.push(question);
      });

      if (!tempQuestions) {
        throw new Error("Empty Questions");
      }

      return tempQuestions;
    });
};

export const fetchUnits = async () => {
  let tempUnit: Unit;
  let tempUnits: Unit[] = [];
  return await db
    .collection("units")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((res) => {
        tempUnit = res.data() as Unit;
        tempUnit.id = res.id;
        tempUnits.push(tempUnit);
      });

      if (!tempUnits) {
        throw new Error("Empty Units");
      }

      return tempUnits;
    });
};