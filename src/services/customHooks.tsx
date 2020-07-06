import {useState} from 'react'

export const useForcedUpdate = () => {
  const [, updateState] = useState();
  return () => updateState({})
}