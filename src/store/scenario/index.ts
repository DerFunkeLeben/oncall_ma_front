import * as selectors from './selectors'
import * as actions from './actions'
import * as reduce from './reducers'

const Scenario = {
  ...selectors,
  ...actions,
  ...reduce,
}

export default Scenario
