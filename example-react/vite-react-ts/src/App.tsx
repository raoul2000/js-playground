import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Play1 } from './play-1/Play1'
import OverviewDemo from './play-ka-table/overview-demo'
import ColumnResizingDemo from './play-ka-table/col-resizing-demo'

function App() {

  // <Play1 />
  return (
    <div className="App">
      <ColumnResizingDemo />
      {/* <OverviewDemo /> */}
    </div>
  )
}

export default App
