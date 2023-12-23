export type Teacher = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  faculty: { id: number; name: string };
  subjects: [{ id: number; name: string }];
};
