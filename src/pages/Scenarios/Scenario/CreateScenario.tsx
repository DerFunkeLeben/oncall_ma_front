import { FC, useEffect, useState } from 'react'
import cx from 'classnames'

import Sidebar from 'components/Sidebar/Sidebar'
import PageHead from 'components/PageHead/PageHead'
import ScenarioBuilder from 'pages/Scenarios/components/ScenarioBuilder/ScenarioBuilder'
import { IStep, ISidePopupStep } from 'types/sidePopup'
import Button from 'components/parts/Button/Button'
import Field from '../components/Field/Field'
import TasksStorage from '../components/TasksStorage/TasksStorage'
import { useScenario } from 'store/scenario/useScenario'

import styles from './CreateScenario.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import pageHeadStyle from 'components/PageHead/PageHead.module.scss'

import { EVENT_URL_ADD, EVENT_URL_ALL, EVENT_URL_VALIDATE, EVENT_URL_START } from 'constants/url'
import { postAxiosSingle, getAxiosSingle, postRequest } from 'utils/axios'
import { IPageData } from 'types'

import { IconUpload } from 'assets/icons'

const units: { [key: string]: number } = {
  months: 259200,
  weeks: 103680,
  days: 8640,
  hours: 360,
  minutes: 60,
}

const CreateScenario: FC<IPageData> = () => {
  const { tasksHeap, scenario, setScenario } = useScenario()

  const calcDelay = (data: any) => {
    const { amount, unit } = data
    return units[unit] * Number(amount)
  }

  const prepareHeap = () => {
    const preparedHeap: { [key: string]: any } = {}
    if (!tasksHeap || !scenario) return
    const { name, startDate, scenarioType } = scenario
    for (const key in tasksHeap) {
      const { input, output, type, properties } = tasksHeap[key]
      const backType = type === 'finish' ? 'finish' : type === 'condition' ? 'split' : type
      const backProperties = () => {
        if (type === 'start') {
          return {
            audience: properties,
            startDate,
            scenarioType,
          }
        }
        if (type === 'wait') {
          return {
            type: 'delay',
            delay: calcDelay(properties),
          }
        }
        if (type === 'email') {
          return {
            email: properties.emailId,
            title: properties.emailTitle,
            preheader: properties.emailSubTitle,
          }
        }
        if (type === 'condition') {
          const { conditionType, ...rest } = properties
          console.log({ conditionType })
          if (conditionType === 'random') {
            Object.keys(rest).forEach((branch, index) => {
              if (!output) return
              rest[branch] = {
                percent: Number(rest[branch]),
                output: output[index],
              }
            })
          }
          if (conditionType === 'atribute') {
            Object.keys(rest).forEach((branch, index) => {
              if (!output) return
              rest[branch] = {
                query: rest[branch],
                output: output[index],
              }
            })
          }
          return {
            type: conditionType,
            ...rest,
          }
        } else {
          return properties
        }
      }
      preparedHeap[key] = {
        input: input,
        output: output,
        type: backType,
        properties: backProperties(),
        name: 'task name',
      }
    }
    return { start: '1', events: preparedHeap }
  }

  const getAllScenarios = async () => {
    const eventAll = await getAxiosSingle(EVENT_URL_ALL)
    console.log({ eventAll })
  }

  const validateScenario = async () => {
    const preparedHeap = prepareHeap()
    const response = await postAxiosSingle(EVENT_URL_VALIDATE, null, preparedHeap)
    console.log('validateScenario', { response })
  }

  const saveScenario = async () => {
    const preparedHeap = prepareHeap()
    const response = await postAxiosSingle(EVENT_URL_ADD, null, preparedHeap)
    const { id } = response.data
    setScenario({ scenarioId: id })
  }

  const activateScenario = async () => {
    const response = await getAxiosSingle(`${EVENT_URL_START}${scenario?.scenarioId}`)
    console.log('activateScenario', response)
  }

  return (
    <div className={cx(styles.pageContent)}>
      <PageHead
        title="Сценарии"
        mod={pageHeadStyle.headScenario}
        separateBlock={<Button modificator={buttonStyles.theme_secondary}></Button>}
      >
        <Button modificator={buttonStyles.theme_secondary} onClick={saveScenario}>
          <IconUpload />
          <span>Сохранить</span>
        </Button>
        <Button modificator={buttonStyles.theme_secondary} onClick={validateScenario}>
          <IconUpload />
          <span>Валидировать</span>
        </Button>
        {/* <Button modificator={buttonStyles.theme_secondary}>
            <IconUpload />
            <span>Создать копию</span>
          </Button>
          <Button modificator={buttonStyles.theme_secondary}>
            <IconUpload />
            <span>Удалить</span>
          </Button> */}
        <Button onClick={activateScenario} disabled={!scenario?.scenarioId}>
          <IconUpload />
          <span>Активировать</span>
        </Button>
      </PageHead>
      <TasksStorage />
      <ScenarioBuilder />
    </div>
  )
}

export default CreateScenario
