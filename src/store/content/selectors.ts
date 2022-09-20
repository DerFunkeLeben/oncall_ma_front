import { createSelector } from 'reselect'
import { IState } from '../data-types'
import { StoreKeys, IStoreContent } from './_data-types'

const getContent = (state: IState): IStoreContent[StoreKeys.allContent] =>
  state.content.data[StoreKeys.allContent]

const getCurrentContent = (state: IState): IStoreContent[StoreKeys.currentContent] =>
  state.content.data[StoreKeys.currentContent]

const getAllContent = createSelector(getContent, (contents) => Object.values(contents).flat())

const getTitle = (_: any, title: string) => title
const getTitleMatch = createSelector(getAllContent, getTitle, (content, nameToCheck) =>
  content.find(({ title }) => title === nameToCheck)
)

const getId = (_: any, id: string) => id
const getContentById = createSelector(getContent, getId, (content, id) => content[id])

export { getContent, getCurrentContent, getAllContent, getTitleMatch, getContentById }
