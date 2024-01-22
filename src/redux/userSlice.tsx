/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface StepOneFormData {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  idType: string;
  idNumber: string;
}

interface StepTwoFormData {
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: string;
}

interface UserData {
  data: (StepOneFormData & StepTwoFormData & { id: number })[];
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    
    userInfo: {
      data: [] as UserData['data'],
    },
  },
  reducers: {
   
    updateFormData: (state, action) => {
      const newDataEntry = {
        id: state.userInfo.data.length + 1,
        ...action.payload,
      };
    
      const newDataArray = [...state.userInfo.data, newDataEntry];
    
      state.userInfo.data = newDataArray;
    },
  },
});

export const {  updateFormData } = userSlice.actions;

export default userSlice.reducer;
