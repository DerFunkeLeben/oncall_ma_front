import { useState } from 'react'

const useTable = (allIds?: string[]) => {
  const [checkedList, setCheckedList] = useState<string[]>([])

  const isItChecked = (id: string | undefined) => {
    return checkedList.includes(id || '')
  }

  const checkMenuIsOpen = () => checkedList.length > 0

  const checkedCount = checkedList.length
  const checkedAll = allIds?.length === checkedCount && checkedCount !== 0

  const toggleCheck = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const { id } = e.currentTarget.dataset
    if (!id) return

    if (isItChecked(id)) {
      const newChecked = checkedList.filter((el) => el !== id)
      setCheckedList(newChecked)
    } else setCheckedList([...checkedList, id])
  }

  const toggleAllChecks = () => {
    if (checkedAll || !allIds) {
      setCheckedList([])
    } else setCheckedList(allIds as string[])
  }

  const clearChecks = () => setCheckedList([])

  return {
    checkedList,
    toggleCheck,
    toggleAllChecks,
    isItChecked,
    checkMenuIsOpen,
    checkedCount,
    checkedAll,
    clearChecks,
  }
}

export default useTable
