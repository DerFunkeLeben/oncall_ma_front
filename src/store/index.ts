import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer } from './reducers'

const useStore = (preloadedState: any) => {
  const currentStore = useMemo(
    () => createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware())),
    []
  )
  return currentStore
}

export default useStore
