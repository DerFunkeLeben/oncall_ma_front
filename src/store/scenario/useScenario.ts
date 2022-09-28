import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import ActionCreator from './actions'
import { getScenario, getTaskIsMoving, getTasksHeap, getAllScenaries } from './selectors'

import { getAxiosArr } from 'utils/axios'

import { EVENT_URL_ALL } from 'constants/url'

import { IStoreScenario, StoreKeys } from './_data-types'
import { ITask, TasksTypes } from 'types'

import { IAllScenaries } from 'types'
import { initHeap, initScenario } from './init'

const useScenario = () => {
  const dispatch = useDispatch()

  const taskIsMoving = useSelector(getTaskIsMoving)
  const tasksHeap = useSelector(getTasksHeap)
  const scenario = useSelector(getScenario)
  const allScenaries = useSelector(getAllScenaries)

  // console.log({ tasksHeap })

  const createExit = (leftId: string) => {
    return {
      type: TasksTypes.finish,
      color: 'green',
      status: 'default',
      name: 'Выход',
      input: [leftId],
      output: [],
      available: true,
      placed: true,
      properties: {},
    }
  }

  const addTask = (currentTaskProperties: ITask, newTaskId: string, rightTaskId: string) => {
    //TODO некрасиво написано
    if (!tasksHeap) return
    const isNeededToCreateNewLine = currentTaskProperties.type === TasksTypes.condition
    const extiId = uuid()

    //Обновление input для соседа справа
    //Join еще не изобрели поэтому у таски справа родитель может быть только один
    const rightTask = tasksHeap[rightTaskId]
    const rightInUpd = [newTaskId]
    const rightTaskUpd = { ...rightTask, input: rightInUpd }
    if (!rightTask.input) {
      console.log('у правой таски нет родителя')
      return
    }

    //Обновление output для соседа слева
    const leftTaskId = rightTask.input[0]
    const leftTask = tasksHeap[leftTaskId]
    if (!leftTask.output) {
      console.log('у левой таски нет потомка')
      return
    }

    //Изза ветвления потомков может быть много
    const leftOutUpd = leftTask.output.map((outId) => {
      const result = outId === rightTaskId ? newTaskId : outId
      return result
    })
    const leftTaskUpd = { ...leftTask, output: leftOutUpd }
    const outputIds = [rightTaskId]

    if (isNeededToCreateNewLine) {
      outputIds.push(extiId)
    }

    //Создание нового элемента
    const newTask = {
      ...currentTaskProperties,
      placed: true,
      status: 'default',
      input: [leftTaskId],
      output: outputIds,
    }

    const newHeap = isNeededToCreateNewLine
      ? {
          ...tasksHeap,
          [leftTaskId]: leftTaskUpd,
          [rightTaskId]: rightTaskUpd,
          [newTaskId]: newTask,
          [extiId]: createExit(newTaskId),
        }
      : {
          ...tasksHeap,
          [leftTaskId]: leftTaskUpd,
          [rightTaskId]: rightTaskUpd,
          [newTaskId]: newTask,
        }

    console.log({ [extiId]: createExit(newTaskId) }, isNeededToCreateNewLine)

    dispatch(ActionCreator.setTasksHeap(newHeap))
  }

  const updateSettings = (taskId: string, properties: { [key: string]: string }) => {
    if (!tasksHeap) return
    const tasksHeapUpd = { ...tasksHeap }
    const currentTask = tasksHeapUpd[taskId]
    const status = Object.keys(properties).length === 0 ? 'default' : 'validated'

    console.log('updateSettings', taskId, properties)

    dispatch(
      ActionCreator.setTasksHeap({
        ...tasksHeap,
        [taskId]: { ...currentTask, properties, status },
      })
    )
  }

  const deleteTask = (taskId: string) => {
    if (!tasksHeap) return

    const tasksHeapUpd = { ...tasksHeap }
    const currentTask = tasksHeapUpd[taskId]
    const { input, output } = currentTask
    //допускаем что у нас нет веток
    if (!input) return
    if (!output) return

    const leftId = input[0]
    const rightId = output[0]
    const leftNode = tasksHeapUpd[leftId]
    const rightNode = tasksHeapUpd[rightId]

    const leftOutUpd = leftNode?.output?.map((outId) => {
      const result = outId === taskId ? rightId : outId
      return result
    })

    const leftNodeUpd = { ...leftNode, output: leftOutUpd }
    const rightNodeUpd = { ...rightNode, input: [leftId] }

    delete tasksHeapUpd[taskId]

    dispatch(
      ActionCreator.setTasksHeap({
        ...tasksHeapUpd,
        [leftId]: leftNodeUpd,
        [rightId]: rightNodeUpd,
      })
    )
  }

  const setTaskIsMoving = useCallback(
    (useData: IStoreScenario[StoreKeys.taskIsMoving]) => {
      dispatch(ActionCreator.setTaskIsMoving(useData))
    },
    [dispatch]
  )

  const setScenario = (newSettings: any) => {
    dispatch(
      ActionCreator.setScenario({
        ...scenario,
        ...newSettings,
      })
    )
  }

  const setTasksHeap = (newTaskHeap: any) => {
    dispatch(ActionCreator.setTasksHeap(newTaskHeap))
  }

  const eraseTasksHeap = () => {
    dispatch(ActionCreator.setTasksHeap(initHeap))
  }

  const eraseScenario = () => {
    dispatch(ActionCreator.setScenario(initScenario))
  }

  const initAllScenaries = async () => {
    const result = (await getAxiosArr(EVENT_URL_ALL)) as IAllScenaries
    dispatch(ActionCreator.setAllScenaries(result))
    return result
  }

  const { eventId } = useParams<{ eventId?: string }>()

  useEffect(() => {
    if (!eventId) {
      eraseTasksHeap()
      eraseScenario()
    }
  }, [eventId])

  return {
    scenario,
    setScenario,
    taskIsMoving,
    setTaskIsMoving,
    eraseTasksHeap,
    eraseScenario,
    tasksHeap,
    setTasksHeap,
    addTask,
    deleteTask,
    updateSettings,
    allScenaries,
    initAllScenaries,
  }
}

export { useScenario }
