import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  termsAccepted: boolean;
  picture: string;
  country: string;
}

interface FormState {
  uncontrolledFormData: FormData | null;
  controlledFormData: FormData | null;
}

const initialState: FormState = {
  uncontrolledFormData: null,
  controlledFormData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolledFormData = action.payload;
    },
    setControlledFormData: (state, action: PayloadAction<FormData>) => {
      state.controlledFormData = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setControlledFormData } =
  formSlice.actions;
export default formSlice.reducer;
