const configTest: IStep = {
  name: 'ВыборДаты',
  title: 'Выбор даты',
  type: SidePopupActions.DATE,
  getNextStep: () => {
    return {
      name: 'ПрисвоениеАтрибута',
      type: SidePopupActions.ATTRIBUTES,
      getNextStep: () => {
        return {
          name: 'Длительность',
          type: SidePopupActions.DURATION,
          title: 'Количество',
          getNextStep: () => {
            return {
              name: 'Слайдер',
              type: SidePopupActions.SLIDER,
              title: 'Выберите процент аудитории для тестирования',
              getNextStep: () => {
                return {
                  name: 'СлайдерСоотношение',
                  type: SidePopupActions.SLIDER_RELATION,
                  title: 'Выберите процент аудитории для тестирования',
                  count: 2,
                  getNextStep: () => {
                    return {
                      name: 'Радио',
                      type: SidePopupActions.RADIO,
                      options: [
                        { name: 'deliveryRate', label: 'delivery rate 11' },
                        { name: 'openRate', label: 'open rate 444212' },
                        { name: 'clickRate', label: 'click rate' },
                        { name: 'unsubscribeRate', label: 'unsub rate' },
                      ],
                      getNextStep: () => {
                        return {
                          name: 'Инпут',
                          type: SidePopupActions.INPUT,
                          title: 'Прехедер',
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