import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp._id !== action.payload);
    },
  },
});

export const { setEmployees, setLoading, setError, removeEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
