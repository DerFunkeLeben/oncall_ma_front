import { useState } from 'react'

const useTable = (totalCountOfData?: number) => {
  const [checkedList, setCheckedList] = useState<number[]>([])

  const isItChecked = (id: number) => {
    return checkedList.includes(id)
  }

  const checkMenuIsOpen = () => checkedList.length > 0

  const checkedCount = checkedList.length
  const checkedAll = totalCountOfData === checkedCount

  const toggleCheck = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const { id } = e.currentTarget.dataset
    const idNum = Number(id)
    if (isItChecked(idNum)) {
      const newChecked = checkedList.filter((el) => el !== idNum)
      setCheckedList(newChecked)
    } else setCheckedList([...checkedList, idNum])
  }

  const toggleAllChecks = () => {
    if (checkedAll) {
      setCheckedList([])
    } else {
      const allIds = [...Array(totalCountOfData).keys()]
      setCheckedList(allIds)
    }
  }

  return {
    toggleCheck,
    toggleAllChecks,
    isItChecked,
    checkMenuIsOpen,
    checkedCount,
    checkedAll,
  }
}

export default useTable
