import { IContent } from 'types/content'

export const getContentById = (data: IContent[], id: string | undefined) => {
  return data?.find((content) => content.id == id)
}
