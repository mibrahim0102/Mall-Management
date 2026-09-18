
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  brands: [
    {
      id: 1,
      name: 'nike',
      owner: 'john smith',
      contact: '03001234567',
    },
    {
      id: 2,
      name: 'adidas',
      owner: 'ali khan',
      contact: '03111234567',
    },
    {
      id: 3,
      name: 'khaadi',
      owner: 'shamoon sultan',
      contact: '03067894521',
    },
    {
      id: 4,
      name: 'gul ahmed',
      owner: 'iqbal gul ahmed',
      contact: '03147823690',
    },
    {
      id: 5,
      name: 'sapphire',
      owner: 'zahid bashir',
      contact: '03219876543',
    },
    {
      id: 6,
      name: 'j.',
      owner: 'junaid jamshed',
      contact: '03324567891',
    },
  ],
}

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    addBrand: (state, action) => {
      state.brands.push(action.payload)
    },

    updateBrand: (state, action) => {
      const index = state.brands.findIndex(
        (brand) => brand.id === action.payload.id
      )

      if (index !== -1) {
        state.brands[index] = action.payload
      }
    },

    deleteBrand: (state, action) => {
      state.brands = state.brands.filter(
        (brand) => brand.id !== action.payload
      )
    },
  },
})

export const {
  addBrand,
  updateBrand,
  deleteBrand,
} = brandSlice.actions

export default brandSlice.reducer
