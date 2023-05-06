// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../configs/axios.config';
// const itemsSlice = createSlice({
//     name: 'items',
//     initialState: { status: 'idle', data: [] },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getItems.pending, (state, action) => {
//                 state.status = 'loading';
//             })
//             .addCase(getItems.fulfilled, (state, action) => {
//                 state.data = action.payload;
//                 state.status = 'idle';
//             })
//             .addCase(getItems.rejected, (state, action) => {
//                 state.status = 'error';
//             })
//     },
// });

// export const getItems = createAsyncThunk('items/getItems', async () => {
//     try {
//         const res = await api.get(`/item`);
//         if (res.status == 200) {
//             const result = res.data;
//             return result.data;
//         }
//     } catch (error) {
//         throw error;
//     }
// });

// export default itemsSlice;
