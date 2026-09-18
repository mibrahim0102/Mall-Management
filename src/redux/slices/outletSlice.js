import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  outlets: [
    {
      id: 1,
      name: 'shop 101',
      floor: 'ground floor',
      category: 'fashion',
      status: 'active'
    },
    {
      id: 2,
      name: 'shop 204',
      floor: 'first floor',
      category: 'electronics',
      status: 'active'
    },
    {
      id: 3,
      name: 'shop 315',
      floor: 'second floor',
      category: 'home decor',
      status: 'active'
    },
    {
      id: 4,
      name: 'shop 118',
      floor: 'ground floor',
      category: 'food and beverage',
      status: 'active'
    },
    {
      id: 5,
      name: 'shop 427',
      floor: 'third floor',
      category: 'sportswear',
      status: 'inactive'
    },
    {
      id: 6,
      name: 'kiosk 09',
      floor: 'atrium',
      category: 'accessories',
      status: 'active'
    }
  ]
}

const outletSlice = createSlice({
  name: 'outlets',
  initialState,
  reducers: {
    addOutlet: (state, action) => {
      state.outlets.push(action.payload)
    },
    updateOutlet: (state, action) => {
      const index = state.outlets.findIndex(
        (outlet) => outlet.id === action.payload.id
      )

      if (index !== -1) {
        state.outlets[index] = action.payload
      }
    },
    deleteOutlet: (state, action) => {
      state.outlets = state.outlets.filter(
        (outlet) => outlet.id !== action.payload
      )
    }
  }
})

export const {
  addOutlet,
  updateOutlet,
  deleteOutlet
} = outletSlice.actions

export default outletSlice.reducer