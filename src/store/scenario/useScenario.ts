import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'

import TaskCreator from './actions'
import { getTaskIsMoving, getTasksHeap } from './selectors'

import { IStoreScenario, StoreKeys } from './_data-types'

import { ITask } from 'types'

const useScenario = () => {
  const dispatch = useDispatch()

  const taskIsMoving = useSelector(getTaskIsMoving)
  const tasksHeap = useSelector(getTasksHeap)

  console.log({ tasksHeap })

  const addTask = (currentTaskProperties: ITask, newTaskId: string, rightTaskId: string) => {
    //TODO некрасиво написано
    if (!tasksHeap) return

    //Обновление input для соседа справа
    //Join еще не изобрели поэтому родитель может быть только один
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

    //Создание нового элемента
    const newTask = {
      ...currentTaskProperties,
      status: 'default',
      input: [leftTaskId],
      output: [rightTaskId],
    }

    dispatch(
      TaskCreator.setTasksHeap({
        ...tasksHeap,
        [leftTaskId]: leftTaskUpd,
        [rightTaskId]: rightTaskUpd,
        [newTaskId]: newTask,
      })
    )
  }

  const objIsNotEmpty = (obj: any) =>
    obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype

  const updateSettings = (taskId: string, settings: { [key: string]: string }) => {
    if (!tasksHeap) return
    const tasksHeapUpd = { ...tasksHeap }
    const currentTask = tasksHeapUpd[taskId]
    const status = settings ? 'validated' : 'default'
    console.log(taskId, currentTask.type, settings === {}, status)

    dispatch(
      TaskCreator.setTasksHeap({
        ...tasksHeap,
        [taskId]: { ...currentTask, settings, status },
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
      TaskCreator.setTasksHeap({
        ...tasksHeapUpd,
        [leftId]: leftNodeUpd,
        [rightId]: rightNodeUpd,
      })
    )
  }

  const setTaskIsMoving = useCallback(
    (useData: IStoreScenario[StoreKeys.taskIsMoving]) => {
      dispatch(TaskCreator.setTaskIsMoving(useData))
    },
    [dispatch]
  )

  return {
    taskIsMoving,
    setTaskIsMoving,
    tasksHeap,
    addTask,
    deleteTask,
    updateSettings,
  }
}

export { useScenario }
