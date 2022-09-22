import { TasksTypes } from 'types'
export default {
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
