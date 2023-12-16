// import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { Student, Teacher, User } from '../../../models/models';
// import { RootState } from '../../store';
// import { emptyUser, mockTeacher } from '../../../models/mockAdminData';

// interface ICurrentUser {
//   data: User | Teacher | Student; // User accounts for Admin
// }

// const initialState: ICurrentUser = {
//   data: mockTeacher,
// };

// const currentUserSlice = createSlice({
//   name: 'currentUser',
//   initialState,
//   reducers: {
//     // TODO: set and edit perform the same actions but semantically are different
//     // NOTE: User should be set in login page
//     setCurrentUser: (state: ICurrentUser, action: PayloadAction<User>) => {
//       state.data = action.payload;
//     },
//     editUser: (state: ICurrentUser, action: PayloadAction<User>) => {
//       state.data = action.payload;
//       console.log(action.payload);
//     },
//   },
// });

// export const { editUser } = currentUserSlice.actions;
// export const currentUserReducer = currentUserSlice.reducer;

// export const selectCurrentUser = (state: RootState) => state.currentUser.data;
