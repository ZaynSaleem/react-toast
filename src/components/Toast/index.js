import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

export const Toast = ({ item }) => {
  const [displayBool, setDisplayBool] = useState(true)
  const [toggleClass, setToggleClass] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setToggleClass(styles.show)
    }, 100)
    let x = setInterval(() => {
      clearInterval(x)
      setToggleClass(styles.hide)
      setTimeout(() => {
        setDisplayBool(false)
      }, 1000)
    }, item?.delayTime)
  }, [])

  return (
    <div
      className={`${item?.type} ${styles.boxRightTop} ${toggleClass} ${
        !displayBool ? styles.dNone : ''
      }`}
    >
      <div className={styles.toastIcon}>{item?.icon}</div>
      {item?.description}
    </div>
  )
}
