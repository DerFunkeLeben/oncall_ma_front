// const createMatrix = (
//   id: string,
//   rowNumber = 0,
//   columnNumber = 0,
//   matrix: string[][] = [[]]
// ): any => {
//   const action = actionHeap[id]
//   const row = matrix[rowNumber]
//   const itsNewRow = !matrix[rowNumber]

//   const newColumnNumber = columnNumber + 1

//   matrix[rowNumber] = itsNewRow
//     ? [`id:${id} col:${newColumnNumber}`]
//     : [...row, `id:${id} col:${newColumnNumber}`]

//   const outIds = action.out
//   const itsEndOfBranch = outIds.length === 0

//   if (itsEndOfBranch) return matrix

//   const [result] = outIds.map((outId, index) => {
//     const newRowNumber = rowNumber + index
//     return createMatrix(outId, newRowNumber, newColumnNumber, matrix)
//   })
//   return result
// }
export const a = 'a'

// const createMatrix = (id: string, row: string[] = [], itsNewRow = true): any => {
//     const action = actionHeap[id]
//     const rowUpd = itsNewRow ? [id] : [...row, id]
//     const outIds = action.out
//     const itsEndOfBranch = outIds.length === 0

//     if (itsEndOfBranch) return rowUpd

//     let result

//     outIds.forEach((outId, index) => {
//       const createNewRow = index != 0
//       result = createMatrix(outId, rowUpd, createNewRow)
//     })

//     return result
//   }
