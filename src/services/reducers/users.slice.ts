import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Admin, Student, Teacher } from '../../models/models';
import { RootState } from '../store';
import { emptyUser, mockTeacher } from '../../models/mockAdminData';

type GeneralType = Teacher | Student | Admin;

interface IProcessingErrors {
  firstNameError: boolean;
  lastNameError: boolean;
  fatherNameError: boolean;
  emailError: boolean;
  phoneNumberError: boolean;
  passwordError: boolean;
  currentPasswordError: boolean;
}

interface IUsersState {
  currentUser: GeneralType;
  selectedUser: GeneralType;
  pageMode?: 'add' | 'edit' | 'no-edit'; // 'no-edit' is neither edit, nor add
  processingErrors: IProcessingErrors;
  teachers: {
    data: Teacher[];
    isSet: boolean;
  };
  students: {
    data: Student[];
    isSet: boolean;
  };
}

const initialState: IUsersState = {
  // This should be set only in login page
  currentUser: mockTeacher, // TODO: change to emptyUser after development
  // This is default
  // NOTE: In AddUser page, this will point to an id that doesn't yet exist. If operation succeeds, it will be added, otherwise, discarded.
  selectedUser: emptyUser, // TODO: change to emptyUser after development
  processingErrors: {
    firstNameError: false,
    lastNameError: false,
    fatherNameError: false,
    emailError: false,
    phoneNumberError: false,
    passwordError: false,
    currentPasswordError: false,
  },
  pageMode: 'no-edit', // TODO: default
  teachers: {
    data: [],
    isSet: false,
  },
  students: {
    data: [],
    isSet: false,
  },
};

type UserCategory = 'students' | 'teachers';
type User = Teacher | Student;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // When App.tsx mounts, all the users are downloaded (it takes around 300kB of data in browser)
    setIsSet: (state: IUsersState, action: PayloadAction<{ userCategory: UserCategory }>) => {
      const { userCategory } = action.payload;
      state[userCategory].isSet = true;
    },

    // Add and edit modes are used in AddUser and EditUser pages, respectively. Other pages are no-edit.
    // TODO: Maybe change name from no-edit to no-mode.
    setPageMode: (state: IUsersState, action: PayloadAction<'add' | 'edit' | 'no-edit'>) => {
      state.pageMode = action.payload;
    },

    setProcessingErrors: (state: IUsersState, action: PayloadAction<IProcessingErrors>) => {
      state.processingErrors = action.payload;
    },

    // Set users array, current user, and selected user
    // Note: selectedUserId should be changed to default once operation on selected user ends. Default is teacher of id 1
    setUsers: (state: IUsersState, action: PayloadAction<{ userCategory: UserCategory; data: Teacher[] | Student[] }>) => {
      const { userCategory, data } = action.payload;
      state[userCategory].data = data;
    },
    setCurrentUser: (state: IUsersState, action: PayloadAction<GeneralType>) => {
      state.currentUser = action.payload;
    },
    setSelectedUser: (state: IUsersState, action: PayloadAction<GeneralType>) => {
      state.selectedUser = action.payload;
    },

    // Adds user of selectedUserId to users array
    addUser: (state: IUsersState, action: PayloadAction<{ userCategory: UserCategory; data: User }>) => {
      const { userCategory, data } = action.payload;
      state[userCategory].data = [...state[userCategory].data, data];
    },

    // Removes user of selectedUserId from array
    deleteUser: (state: IUsersState, action: PayloadAction<{ userCategory: UserCategory; userId: number }>) => {
      const { userCategory, userId } = action.payload;
      state[userCategory].data = state[userCategory].data.filter((user) => user.id !== userId);
    },
  },
});

export const { setIsSet, setUsers, setCurrentUser, setSelectedUser, setProcessingErrors, setPageMode, addUser, deleteUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const selectTeachersIsSet = (state: RootState) => state.users.teachers.isSet;
export const selectStudentsIsSet = (state: RootState) => state.users.students.isSet;

export const selectTeachers = (state: RootState) => state.users.teachers.data;
export const selectStudents = (state: RootState) => state.users.students.data;

export const selectPageMode = (state: RootState) => state.users.pageMode;

export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectSelectedUser = (state: RootState) => state.users.selectedUser;
export const selectProcessingErrors = (state: RootState) => state.users.processingErrors;
