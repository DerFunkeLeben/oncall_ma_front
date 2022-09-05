/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { Config } from 'constants/url'

const { REACT_APP_DEBUG, NODE_ENV } = process.env

let SERVER = 'http://localhost:3000'
// if (NODE_ENV === 'production') SERVER = 'https://oncall.onpoint.ru'
if (REACT_APP_DEBUG === 'true') SERVER = 'https://debug.oncall.onpoint.ru'

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${SERVER}/api`,
})

axiosRetry(axiosInstance, { retries: 3, retryDelay: axiosRetry.exponentialDelay })

const getRequest = async (URL: string, signal?: AbortSignal): Promise<any> =>
  await axiosInstance({
    method: 'get',
    url: URL,
    headers: Config.HEADERS,
    signal,
  })

const postRequest = async (
  URL: string,
  headers: any,
  data?: any,
  signal?: AbortSignal
): Promise<any> =>
  await axiosInstance({
    method: 'post',
    url: URL,
    headers,
    data,
    signal,
  }).catch((err) => {
    console.log(err)
  })

const putRequest = async (
  URL: string,
  headers: any,
  data?: any,
  signal?: AbortSignal
): Promise<any> =>
  await axiosInstance({
    method: 'put',
    url: URL,
    headers,
    data,
    signal,
  })

const patchRequest = async (
  URL: string,
  headers: any,
  data?: any,
  signal?: AbortSignal
): Promise<any> =>
  await axiosInstance({
    method: 'patch',
    url: URL,
    headers,
    data,
    signal,
  })

const deleteRequest = async (URL: string, headers: any, signal?: AbortSignal): Promise<any> =>
  await axiosInstance({
    method: 'delete',
    url: URL,
    headers,
    signal,
  })

const getAxiosSingle = async (URL: string, signal?: AbortSignal): Promise<any> => {
  try {
    const result = await getRequest(URL, signal)
    return result.data
  } catch (err) {
    console.warn(err)
    return {}
  }
}

const getAxiosBoolean = async (URL: string, signal?: AbortSignal): Promise<boolean> => {
  try {
    const result = await getRequest(URL, signal)
    return result.data
  } catch (err) {
    console.warn(err)
    return false
  }
}

const getAxiosArr = async (URL: string, signal?: AbortSignal): Promise<any[]> => {
  try {
    const result = await getRequest(URL, signal)
    return result.data
  } catch (err) {
    console.warn(err)
    return []
  }
}

const getAxiosCounted = async (URL: string, signal?: AbortSignal): Promise<any> => {
  try {
    const result = await getRequest(URL, signal)
    return result.data
  } catch (err) {
    console.warn(err)
    return {
      count: 0,
      rows: [],
    }
  }
}

const postAxiosSingle = async (
  URL: string,
  headers?: any,
  data?: any,
  signal?: AbortSignal
): Promise<any> => {
  try {
    const result = await postRequest(URL, { ...Config.HEADERS, ...headers }, data, signal)
    return result
  } catch (err) {
    console.warn(err)
    return err
  }
}

const putAxiosSingle = async (
  URL: string,
  headers?: any,
  data?: any,
  signal?: AbortSignal
): Promise<any> => {
  try {
    const result = await putRequest(URL, { ...Config.HEADERS, ...headers }, data, signal)
    return result
  } catch (err) {
    console.warn(err)
    return err
  }
}

const patchAxiosSingle = async (
  URL: string,
  headers?: any,
  data?: any,
  signal?: AbortSignal
): Promise<any> => {
  try {
    const result = await patchRequest(URL, { ...Config.HEADERS, ...headers }, data, signal)
    return result
  } catch (err) {
    console.warn(err)
    return err
  }
}

const deleteAxiosSingle = async (URL: string, signal?: AbortSignal): Promise<any> => {
  try {
    const result = await deleteRequest(URL, Config.HEADERS, signal)
    return result
  } catch (err) {
    console.warn(err)
    return err
  }
}

const setHeader = (token?: string) => {
  if (token) axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
  else axios.defaults.headers.common = { Authorization: '' }
}

const setCookie = async (token?: string) => {
  await getAxiosSingle(`/setCookie?access=${token || ''}`)
}

export {
  getRequest,
  getAxiosArr,
  getAxiosSingle,
  getAxiosBoolean,
  getAxiosCounted,
  postAxiosSingle,
  deleteAxiosSingle,
  postRequest,
  putRequest,
  putAxiosSingle,
  patchAxiosSingle,
  setHeader,
  setCookie,
}
