// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../configs/axios.config';
// const categoriesSlice = createSlice({
//     name: 'categories',
//     initialState: { status: 'idle', data: [] },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getCategories.pending, (state, action) => {
//                 state.status = 'loading';
//             })
//             .addCase(getCategories.fulfilled, (state, action) => {
//                 state.data = action.payload;
//                 state.status = 'idle';
//             })
//             .addCase(getCategories.rejected, (state, action) => {
//                 state.status = 'error';
//             })
//     },
// });

// export const getCategories = createAsyncThunk('categories/getCategories', async () => {
//     try {
//         const res = await api.get(`/category`);
//         if (res.status == 200) {
//             const result = res.data;
//             return result.data;
//         }
//     } catch (error) {
//         throw error;
//     }
// });

// export default categoriesSlice;
