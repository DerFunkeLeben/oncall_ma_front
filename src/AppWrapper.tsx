import { ReactElement, Suspense } from 'react'
import { Provider } from 'react-redux'

import Loading from './components/parts/Loading/Loading'
import useStore from './store'
import WindowSizeWrap from 'containers/WindowSizeWrap/WindowSizeWrap'

function AppWrapper({ children }: { children: ReactElement }) {
  const store = useStore({})
  return (
    <Provider store={store}>
      <WindowSizeWrap>
        <Suspense fallback={<Loading classes="page" />}>{children}</Suspense>
      </WindowSizeWrap>
    </Provider>
  )
}

export default AppWrapper
