let data = [
  {
    id: '2144',
    name: 'Терапевты апрель 2022',
    contact_count: '540',
    create_date: '26.02.2022',
    last_update_date: '27.02.2022',
  },
  {
    id: '2145',
    name: 'Терапевты март 2022',
    contact_count: '540',
    create_date: '26.02.2022',
    last_update_date: '27.02.2022',
  },
  {
    id: '2146',
    name: 'Терапевты май 2022',
    contact_count: '540',
    create_date: '26.02.2022',
    last_update_date: '27.02.2022',
  },
]

data = data.map((el, index) => ({ ...el, id: index.toString() }))

export { data }
