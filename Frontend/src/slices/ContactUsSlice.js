import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const sendContactEmail = createAsyncThunk(
  'contact/sendEmail',
  async (contactData) => {
    const response = await fetch('http://localhost:8000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    return await response.json();
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendContactEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendContactEmail.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(sendContactEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
