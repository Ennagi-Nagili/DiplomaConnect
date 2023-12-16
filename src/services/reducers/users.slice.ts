import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Student, Teacher } from '../../models/models';
import { RootState } from '../store';

interface IUsersState {
  teachers: {
    data: Teacher[];
    selectedTeacherId?: number;
    isSet: boolean;
  };
  students: {
    data: Student[];
    selectedStudentId?: number;
    isSet: boolean;
  };
}

const initialState: IUsersState = {
  teachers: {
    data: [],
    selectedTeacherId: undefined,
    isSet: false,
  },
  students: {
    data: [],
    selectedStudentId: undefined,
    isSet: false,
  },
};

type UserCategory = 'students' | 'teachers';
type User = Teacher | Student;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state: IUsersState, action: PayloadAction<{ userCategory: UserCategory; data: Teacher[] | Student[] }>) => {
      const { userCategory, data } = action.payload;
      state[userCategory].data = data;
      console.log(action.payload);
    },
    addUser: (state: IUsersState, action: PayloadAction<{ userCategory: UserCategory; data: User }>) => {
      const { userCategory, data } = action.payload;
      state[userCategory].data = [...state[userCategory].data, data];
      console.log(action.payload);
    },
    deleteUser: (state: IUsersState, action: PayloadAction<{ userCategory: UserCategory; userId: number }>) => {
      const { userCategory, userId } = action.payload;
      state[userCategory].data = state[userCategory].data.filter((user) => user.id !== userId);
      console.log(action.payload);
    },
    setIsSet: (state: IUsersState, action: PayloadAction<{ userCategory: UserCategory }>) => {
      const { userCategory } = action.payload;
      state[userCategory].isSet = true;
      console.log(action.payload);
    },
  },
});

export const { setUsers, setIsSet, addUser, deleteUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

export const selectTeachers = (state: RootState) => state.users.teachers.data;
export const selectStudents = (state: RootState) => state.users.students.data;

export const selectTeachersIsSet = (state: RootState) => state.users.teachers.isSet;
export const selectStudentsIsSet = (state: RootState) => state.users.students.isSet;
