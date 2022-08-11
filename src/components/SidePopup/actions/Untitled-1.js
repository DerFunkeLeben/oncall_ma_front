;[
  {
    argument: 'speciality',
    type: 'include',
    value: 'урология',
  },
  {
    operator: 'or',
  },
  {
    argument: 'speciality',
    type: 'equal',
    value: 'Турапевт',
  },
],
{
    [
    {
        argument: 'city',
        type: 'not equal',
        value: '1',
    },
    {
        operator: 'or',
    },
    {
        type: 'inqual',
        value: '2',
    },
]
}
