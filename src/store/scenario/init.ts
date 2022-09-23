import { TasksTypes, TScenarioType } from 'types'
const initHeap = {
  '1': {
    type: TasksTypes.start,
    color: 'orange',
    status: 'default',
    name: 'Старт',
    input: [],
    output: ['2'],
    available: true,
    placed: true,
    properties: {},
  },
  '2': {
    type: TasksTypes.finish,
    color: 'green',
    status: 'default',
    name: 'Выход',
    input: ['1'],
    output: [],
    available: true,
    placed: true,
    properties: {},
  },
}

const initScenario = {
  name: `Сценарий ${Date()}`,
  startDate: Date.now(),
  scenarioType: 'single' as TScenarioType,
}
export { initHeap, initScenario }
