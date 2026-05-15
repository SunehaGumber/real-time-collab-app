import React from 'react'
import '../index.css'
import { router } from './App.routes'
import { RouterProvider } from 'react-router'
import store from '../app/app.store'
import {Provider} from 'react-redux'
const App = () => {
  return (

    <RouterProvider router={router}>
      <Provider store={store}>
        <App/>
      </Provider>
    </RouterProvider>
  )
}

export default App