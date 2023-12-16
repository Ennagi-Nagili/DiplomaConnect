// import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { Student, Teacher, User } from '../../../models/models';
// import { RootState } from '../../store';

// interface IPivotUser {
//   // pivot user will be of general type
//   data: {
//     // USER
//     id?: number;
//     type?: 'teacher' | 'student' | 'admin';
//     profilePhoto?: string;
//     firstName?: string;
//     lastName?: string;
//     fatherName?: string;
//     phoneNumber?: string;
//     email?: string;
//     password?: string;
//     // Teacher Specific
//     department?: string;
//     subject?: string;
//     students?: number[];
//     // Student Specific
//     group?: string;
//     teacher?: number;
//     // Pivot Specific
//     firstNameError?: boolean;
//     lastNameError?: boolean;
//     fatherNameError?: boolean;
//     phoneError?: boolean;
//     emailError?: boolean;
//     passwordError?: boolean;
//     currentPasswordError?: boolean;
//   };
// }

// const initialState: IPivotUser = {
//   data: {
//     // USER
//     id: -1,
//     type: 'teacher',
//     profilePhoto: '',
//     firstName: '',
//     lastName: '',
//     fatherName: '',
//     phoneNumber: '',
//     email: '',
//     password: '',
//     // Teacher Specific
//     department: '',
//     subject: '',
//     students: [],
//     // Student Specific
//     group: '',
//     teacher: -1,
//     // Pivot Specific
//     firstNameError: false,
//     lastNameError: false,
//     fatherNameError: false,
//     phoneError: false,
//     emailError: false,
//     passwordError: false,
//     currentPasswordError: false,
//   },
// };

// const currentUserSlice = createSlice({
//   name: 'pivotUser',
//   initialState,
//   reducers: {
//     // TODO: set and edit perform the same actions but semantically are different
//     // NOTE: User should be set in login page
//     setPivotUser: (state: IPivotUser, action: PayloadAction<Student | Teacher | User>) => {
//       state.data = action.payload;
//       console.log(action.payload);
//     },
//     editPivotUser: (state: IPivotUser, action: PayloadAction<Student | Teacher | User>) => {
//       state.data = action.payload;
//       console.log(action.payload);
//     },
//   },
// });

// export const { setPivotUser, editPivotUser } = currentUserSlice.actions;
// export const pivotUserReducer = currentUserSlice.reducer;

// export const selectPivotUser = (state: RootState) => state.pivotUser.data;
