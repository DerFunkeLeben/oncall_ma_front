import { ReactElement, Suspense, useMemo } from 'react'
import { Provider } from 'react-redux'

import Loading from './components/parts/Loading/Loading'
import WindowSizeWrap from 'containers/WindowSizeWrap/WindowSizeWrap'

import createReduxStore from 'store'
import {
  initialContentState,
  initialFolderState as contentFolderState,
} from 'store/content/reducers'

function AppWrapper({ children }: { children: ReactElement }) {
  const store = createReduxStore({
    content: {
      data: { ...initialContentState },
      folders: { ...contentFolderState },
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
