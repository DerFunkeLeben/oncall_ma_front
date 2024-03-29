import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { batchDispatchMiddleware } from 'redux-batched-actions'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer } from './reducers'
import { IState } from './data-types'

const useStore = (preloadedState: IState) => {
  const currentStore = useMemo(
    () =>
      createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(batchDispatchMiddleware))
      ), //TODO может быть перейти на новую версию 🤔
    [preloadedState]
  )
  return currentStore
}

export default useStore
