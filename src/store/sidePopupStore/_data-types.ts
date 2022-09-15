export enum StoreKeys {
  tempSettings = 'tempSettings',
  stepNumber = 'stepNumber',
}
export interface IStoreSidePopup {
  tempSettings: { [key: string]: any }
  stepNumber: number
}
