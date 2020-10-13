import {useReducer} from 'react'

export const useForcedUpdate = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  return () => forceUpdate();
}