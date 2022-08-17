import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'

import TaskCreator from './actions'
import { getTaskIsMoving, getTasksHeap } from './selectors'

import { IStoreScenario, StoreKeys, ITasksHeap } from './_data-types'

const useScenario = () => {
  const dispatch = useDispatch()

  const taskIsMoving = useSelector(getTaskIsMoving)
  const tasksHeap = useSelector(getTasksHeap)
  console.log(tasksHeap)

  const addTask = (rightTaskId: string) => {
    //TODO некрасиво написано
    const newTaskId = uuid()
    if (!tasksHeap) return

    //Обновление In для соседа справа
    const rightTask = tasksHeap[rightTaskId]
    const rightInUpd = [newTaskId]
    const rightTaskUpd = { ...rightTask, in: rightInUpd }

    //Обновление Out для соседа слева
    const leftTaskId = rightTask.in[0]
    const leftTask = tasksHeap[leftTaskId]
    const leftOutUpd = leftTask.out.map((outId) => {
      const result = outId === rightTaskId ? newTaskId : outId
      return result
    })
    const leftTaskUpd = { ...leftTask, out: leftOutUpd }

    //Создание нового элемента
    const newTask = {
      type: 'event',
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
