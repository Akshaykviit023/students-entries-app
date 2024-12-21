import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabaseClient';

interface StudentType {
    cohort: string
    courses: string[] | null
    dateJoined: string
    id: number
    lastLogin: string
    name: string
    status: boolean
}

interface StudentsState {
  students: StudentType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Async thunk to fetch students
export const fetchStudents = createAsyncThunk<StudentType[], void, { rejectValue: string }>(
  'students/fetch',
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase.from('Student').select('*');
    if (error) return rejectWithValue(error.message);
    return data as StudentType[];
  }
);

const initialState: StudentsState = {
  students: [],
  status: 'idle',
  error: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch students';
      });
  },
});

export default studentsSlice.reducer;