import React, { useEffect, useState, useRef } from 'react'
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa'

import { Toast } from '../Toast'
import styles from './styles.module.css'

export const ToastContainer = ({ mainList }) => {
  const [list, setList] = useState([])
  const [toastList, setToastList] = useState([])

  let toastProperties = null

  const prevList = usePrevious(list)

  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  useEffect(() => {
    if (mainList && mainList.length) {
      for (let i = 0; i < mainList.length; i++) {
        showToast(
          mainList[i].type,
          mainList[i].description,
          mainList[i].delaytime
        )
      }
    }
  }, [mainList])

  useEffect(() => {
    if (prevList?.length) {
      let dup = [...prevList]
      let newlist = []
      for (let i = 0; i < toastList.length; i++) {
        const oldItem = dup.find((x) => x.id == toastList[i].id)
        if (oldItem) {
          newlist.push(oldItem)
        } else {
          newlist.push(toastList[i])
        }
      }
      setList(newlist)
    } else {
      setList([...toastList])
    }
  }, [toastList])

  useEffect(() => {
    for (let i = 0; i < list?.length; i++) {
      if (!list[i].isRendered) {
        let dupList = [...list]
        dupList[i].isRendered = true
        setList(dupList)
      }
    }
  }, [list])

  const showToast = (type, text, delaytime) => {
    switch (type) {
      case 'success':
        toastProperties = {
          id: Math.floor(Math.random() * 101 + 1),
          description: text,
          type: styles.success,
          icon: <FaCheckCircle />,
          delayTime: delaytime,
          date: new Date(),
          isRendered: false,
          isShow: false
        }
        break

      case 'danger':
        toastProperties = {
          id: Math.floor(Math.random() * 101 + 1),
          description: text,
          type: styles.error,
          icon: <FaExclamationCircle />,
          delayTime: delaytime,
          date: new Date(),
          isRendered: false,
          isShow: false
        }
        break

      case 'warning':
        toastProperties = {
          id: Math.floor(Math.random() * 101 + 1),
          description: text,
          type: styles.warning,
          icon: <FaExclamationTriangle />,
          delayTime: delaytime,
          date: new Date(),
          isRendered: false,
          isShow: false
        }
        break

      case 'info':
        toastProperties = {
          id: Math.floor(Math.random() * 101 + 1),
          description: text,
          type: styles.info,
          icon: <FaInfoCircle />,
          delayTime: delaytime,
          date: new Date(),
          isRendered: false,
          isShow: false
        }
        break

      default:
        toastProperties = {
          id: Math.floor(Math.random() * 101 + 1),
          description: 'This is a example toast',
          type: styles.info,
          icon: <FaInfoCircle />,
          delayTime: 4000,
          date: new Date(),
          isRendered: false,
          isShow: false
        }
        setToastList([])
        break
    }
    setToastList([...toastList, toastProperties])
  }

  return (
    <div className={styles.notificationContainer}>
      {list
        ? list?.map((item, index) => {
            if (!item?.isShow) {
              return <Toast item={item} key={index} />
            }
          })
        : null}
    </div>
  )
}
