// Validate first name
export const validateFirstName = (value: string): boolean => {
  // First name should contain only letters and be 2 to 30 characters long
  const regex = /^[a-zA-Z]{2,30}$/;
  return regex.test(value);
};

// Validate last name
export const validateLastName = (value: string): boolean => {
  // Last name should contain only letters and be 2 to 30 characters long
  const regex = /^[a-zA-Z]{2,30}$/;
  return regex.test(value);
};

// Validate father name
export const validateFatherName = (value: string): boolean => {
  // Father name should contain only letters and be 2 to 30 characters long
  const regex = /^[a-zA-Z]{2,30}$/;
  return regex.test(value);
};

// Validate email
export const validateEmail = (value: string): boolean => {
  // Simple email validation and max 50 characters
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) && value.length <= 50;
};

// Validate phone number
export const validatePhoneNumber = (value: string): boolean => {
  // Phone number should contain only digits and be 10 characters long
  const regex = /^\d{6,20}$/;
  return regex.test(value);
};

// Validate password
export const validatePassword = (value: string): boolean => {
  // Password should be at least 8 and at most 50 characters long
  return value.length >= 8 && value.length <= 50;
};
