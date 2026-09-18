import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  attendance: [
    {
      id: 1,
      employee: 'ahmed khan',
      date: '2026-09-12',
      checkIn: '09:00',
      checkOut: '17:00',
      status: 'present'
    },
    {
      id: 2,
      employee: 'ali raza',
      date: '2026-09-12',
      checkIn: '09:15',
      checkOut: '17:05',
      status: 'present'
    },
    {
      id: 3,
      employee: 'usman malik',
      date: '2026-09-13',
      checkIn: '08:40',
      checkOut: '16:45',
      status: 'present'
    },
    {
      id: 4,
      employee: 'hamza iqbal',
      date: '2026-09-13',
      checkIn: '09:35',
      checkOut: '17:20',
      status: 'late'
    },
    {
      id: 5,
      employee: 'bilal ahmed',
      date: '2026-09-13',
      checkIn: '08:50',
      checkOut: '16:55',
      status: 'present'
    },
    {
      id: 6,
      employee: 'usman malik',
      date: '2026-09-10',
      checkIn: '09:10',
      checkOut: '17:15',
      status: 'present'
    },
    {
      id: 7,
      employee: 'hamza iqbal',
      date: '2026-09-10',
      checkIn: '08:45',
      checkOut: '16:30',
      status: 'leave'
    }
  ]
}

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    addAttendance: (state, action) => {
      state.attendance.push(action.payload)
    },

    updateAttendance: (state, action) => {
      const index = state.attendance.findIndex(
        (record) => record.id === action.payload.id
      )

      if (index !== -1) {
        state.attendance[index] = action.payload
      }
    },

    deleteAttendance: (state, action) => {
      state.attendance = state.attendance.filter(
        (record) => record.id !== action.payload
      )
    }
  }
})

export const {
  addAttendance,
  updateAttendance,
  deleteAttendance
} = attendanceSlice.actions

export default attendanceSlice.reducer