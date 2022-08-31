import { AyForm } from 'amiya'
import React from 'react'

const options = [
  {
    label: '🍎苹果',
    value: 'apple',
    desc: '苹果，又稱柰或林檎，是苹果树的果实，一般呈紅色，富含矿物质和维生素，是人们最常食用的水果之一。'
  },
  {
    label: '🍌香蕉',
    value: 'banana',
    desc: '香蕉，又名 甘蕉、芎蕉、芽蕉，弓蕉，为芭蕉科芭蕉属小果野蕉及野蕉的自然或人工杂交的栽培种，为多年生草本植物。'
  },
  {
    label: '🍐香梨',
    value: 'pear',
    desc: '雪梨，又名 香梨、黄梨，是蔷薇科梨属的落叶乔木物种。'
  }
]

function Demo() {
  const fields = [
    {
      title: '喜欢的水果',
      type: 'card-group',
      key: 'fruit',
      defaultValue: 'apple',
      help: `{{ ${JSON.stringify(options)}.find(option => option.value === formValues.fruit)?.desc }}`,
      options
    }
  ]

  return <AyForm fields={fields} />
}
export default Demo
