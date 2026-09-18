import { configureStore } from '@reduxjs/toolkit'

import brandReducer from './slices/brandSlice'
import outletReducer from './slices/outletSlice'
import employeeReducer from './slices/employeeSlice'
import attendanceReducer from './slices/attendanceSlice'
import taskReducer from './slices/taskSlice'

const store = configureStore({
  reducer: {
    brands: brandReducer,
    outlets: outletReducer,
    employees: employeeReducer,
    attendance: attendanceReducer,
    tasks: taskReducer
  }
})

export default store