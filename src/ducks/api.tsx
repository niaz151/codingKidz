import {auth} from 'services/firebase'

export const signIn = async (email: string, password: string) => {
  return await auth.signInWithEmailAndPassword(email, password)
}

export const register = async (email: string, password: string) => {
  return await auth.createUserWithEmailAndPassword(email, password)
}

export const signOut = async () => {
  return await auth.signOut();
}

export const resetPassword = async (email: string) => {
  return await auth.sendPasswordResetEmail(email)
}