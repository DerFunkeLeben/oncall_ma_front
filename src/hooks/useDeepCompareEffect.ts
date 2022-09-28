import { DependencyList, EffectCallback, useEffect, useRef } from 'react'
import isEqual from 'lodash.isequal'

function useDeepCompareMemoize(value: any) {
  const ref = useRef()
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!isEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

export function useDeepCompareEffect(callback: EffectCallback, dependencies: DependencyList) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize))
}
