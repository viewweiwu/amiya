import React from 'react'
import { useEffect, createRef } from 'react'

export default function Demo () {
  const ref = createRef(false)

  useEffect(() => {
    ref.current = 'hello'
  }, [])
  return (
    <AmButton>{ref.current}</AmButton>
  )
}