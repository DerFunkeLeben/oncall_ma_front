const configTest: IStep = {
  name: 'Длительность',
  type: 'duration',
  title: 'Установите продолжительность теста',
  getNextStep: () => {
    return {
      name: 'ТекстАреа',
      type: 'textarea',
      title: 'Аудитория',
      getNextStep: () => {
        return {
          name: 'ТекстИнпут',
          type: 'inputs',
          title: 'Аудитория',
          getNextStep: () => {
            return {
              name: 'Слайдер',
              type: 'slider',
              title: 'Выберите процент аудитории для тестирования',
              getNextStep: () => {
                return {
                  name: 'СлайдерСоотношение',
                  type: 'sliderRelation',
                  title: 'Выберите процент аудитории для тестирования',
                  count: 2,
                  getNextStep: () => {
                    return {
                      name: 'Радио',
                      type: 'radiogroup',
                      options: [
                        { name: 'deliveryRate', label: 'delivery rate 11' },
                        { name: 'openRate', label: 'open rate 444212' },
                        { name: 'clickRate', label: 'click rate' },
                        { name: 'unsubscribeRate', label: 'unsub rate' },
                      ],
                      getNextStep: () => {
                        return {
                          name: 'Фильтр',
                          type: 'filter',
                          title: 'Аудитория',
                          getNextStep: () => {
                            return {
                              name: 'Таблица',
                              type: 'table',
                              title: 'Аудитория',
                            }
                          },
                        }
                      },
                    }
                  },
                }
              },
            }
          },
        }
      },
    }
  },
}
