import { useState } from 'react'

const useTable = () => {
  const [checkedList, setCheckedList] = useState<number[]>([])

  const isItChecked = (id: number) => {
    return checkedList.includes(id)
  }

  const checkMenuIsOpen = () => checkedList.length > 0

  const checkedCount = checkedList.length

  const toggleCheck = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const { id } = e.currentTarget.dataset
    const idNum = Number(id)
    if (isItChecked(idNum)) {
      const newChecked = checkedList.filter((el) => el !== idNum)
      setCheckedList(newChecked)
    } else setCheckedList([...checkedList, idNum])
  }

  return {
    toggleCheck,
    isItChecked,
    checkMenuIsOpen,
    checkedCount,
  }
}

export default useTable
