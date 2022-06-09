import { ReactElement, Suspense } from 'react'
import { Provider } from 'react-redux'

import Loading from './components/parts/Loading/Loading'
import useStore from './store'

function AppWrapper({ children }: { children: ReactElement }) {
  const store = useStore({})
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading classes="page" />}>{children}</Suspense>
    </Provider>
  )
}

export default AppWrapper
