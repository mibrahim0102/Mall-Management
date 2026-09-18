import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  employees: [
    {
      id: 1,
      name: 'ahmed khan',
      email: 'ahmed@example.com',
      department: 'sales',
      brand: 'nike',
      phone: '03001234567',
      status: 'active'
    },
    {
      id: 2,
      name: 'ali raza',
      email: 'ali@example.com',
      department: 'management',
      brand: 'adidas',
      phone: '03111234567',
      status: 'active'
    },
    {
      id: 3,
      name: 'usman malik',
      email: 'usman@example.com',
      department: 'sales',
      brand: 'khaadi',
      phone: '03067894521',
      status: 'active'
    },
    {
      id: 4,
      name: 'hamza iqbal',
      email: 'hamza@example.com',
      department: 'operations',
      brand: 'gul ahmed',
      phone: '03147823690',
      status: 'active'
    },
    {
      id: 5,
      name: 'bilal ahmed',
      email: 'bilal@example.com',
      department: 'customer service',
      brand: 'sapphire',
      phone: '03219876543',
      status: 'active'
    }
  ]
}

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload)
    },

    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload.id
      )

      if (index !== -1) {
        state.employees[index] = action.payload
      }
    },

    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      )
    }
  }
})

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee
} = employeeSlice.actions

export default employeeSlice.reducer