import { ReactElement, Suspense, useMemo } from 'react'
import { Provider } from 'react-redux'

import Loading from './components/parts/Loading/Loading'
import WindowSizeWrap from 'containers/WindowSizeWrap/WindowSizeWrap'

import createReduxStore from 'store'
import { initialContentState } from 'store/content/reducers'
import { initialFolderState } from 'store/folders/reducers'

function AppWrapper({ children }: { children: ReactElement }) {
  const store = createReduxStore({
    content: {
      ...initialContentState,
    },
  })

  return (
    <Provider store={store}>
      <WindowSizeWrap>
        <Suspense fallback={<Loading classes="page" />}>{children}</Suspense>
      </WindowSizeWrap>
    </Provider>
  )
}

export default AppWrapper
