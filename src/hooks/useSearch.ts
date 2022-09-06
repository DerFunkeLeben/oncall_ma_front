import React, { useState, useEffect } from 'react'
import useDebounce from './useDebounce'

export default function useSearch<T = object>(key: keyof T, items: T[]) {
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState<T[]>(items)
  const debouncedSearch = useDebounce(search, 300)

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearch(value)

    // if there's no hits found, set filtered back to all items
    if (value.length <= 0) {
      setFiltered(items)
    }
  }
  useEffect(() => setFiltered(items), [items])

  useEffect(
    () => {
      if (debouncedSearch) {
        setFiltered(
          items.filter((v) =>
            (v[key] as unknown as string).toString().toLowerCase().includes(search.toLowerCase())
          )
        )
      }
    },
    [debouncedSearch, items] // Only call effect if debounced search term changes
  )

  return {
    search,
    onChange,
    filtered,
  }
}
