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

  const addTask = (currentTaskProperties: ITask, rightTaskId: string) => {
    //TODO некрасиво написано
    const newTaskId = uuid()
    if (!tasksHeap) return

    //Обновление In для соседа справа
    const rightTask = tasksHeap[rightTaskId]
    const rightInUpd = [newTaskId]
    const rightTaskUpd = { ...rightTask, in: rightInUpd }

    //Обновление Out для соседа слева
    if (!rightTask.in) {
      console.log('у правой таски нет родителя')
      return
    }
    const leftTaskId = rightTask.in[0]
    const leftTask = tasksHeap[leftTaskId]
    if (!leftTask.out) {
      console.log('у левой таски нет потомка')
      return
    }
    const leftOutUpd = leftTask.out.map((outId) => {
      const result = outId === rightTaskId ? newTaskId : outId
      return result
    })
    const leftTaskUpd = { ...leftTask, out: leftOutUpd }

    //Создание нового элемента
    const newTask = {
      ...currentTaskProperties,
      in: [leftTaskId],
      out: [rightTaskId],
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
  }
}

export { useScenario }
