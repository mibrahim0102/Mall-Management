import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [
    {
      id: 1,
      title: 'prepare sales report',
      description: 'prepare monthly sales report',
      employee: 'ahmed khan',
      priority: 'high',
      dueDate: '2026-09-15',
      status: 'pending'
    },
    {
      id: 2,
      title: 'update outlet details',
      description: 'update shop information',
      employee: 'ali raza',
      priority: 'medium',
      dueDate: '2026-09-16',
      status: 'in progress'
    },
    {
      id: 3,
      title: 'audit khaadi stockroom',
      description: 'count incoming garments and update the stock register',
      employee: 'usman malik',
      priority: 'high',
      dueDate: '2026-09-14',
      status: 'pending'
    },
    {
      id: 4,
      title: 'review gul ahmed signage',
      description: 'inspect seasonal displays and report maintenance needs',
      employee: 'hamza iqbal',
      priority: 'medium',
      dueDate: '2026-09-18',
      status: 'in progress'
    },
    {
      id: 5,
      title: 'organize sapphire launch desk',
      description: 'prepare the customer help desk for the new collection launch',
      employee: 'bilal ahmed',
      priority: 'low',
      dueDate: '2026-09-21',
      status: 'pending'
    },
    {
      id: 6,
      title: 'coordinate j. campaign',
      description: 'schedule campaign posters and confirm promotional material delivery',
      employee: 'usman malik',
      priority: 'medium',
      dueDate: '2026-09-22',
      status: 'completed'
    }
  ]
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      )

      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
      )
    }
  }
})

export const {
  addTask,
  updateTask,
  deleteTask
} = taskSlice.actions

export default taskSlice.reducer