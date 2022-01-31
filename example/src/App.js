import React, { useState } from 'react'

import Toast from 'react-toast'
import 'react-toast/dist/index.css'

const App = () => {
  const [list, setList] = useState([])
  const addToastData = () => {
    let properties = {
      type: 'warning',
      description: 'Custom react toast',
      delaytime: 3000
    }
    setList([...list, properties])
  }

  return (
    <>
      <Toast mainList={list} />

      <button onClick={addToastData}>Show Toasts</button>
    </>
  )
}

export default App
