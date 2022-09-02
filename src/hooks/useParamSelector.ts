import { useSelector } from 'react-redux'

const useParamSelector = (selector: any, ...params: any[]) => {
  return useSelector((state) => selector(state, ...params))
}

export default useParamSelector
