export interface User {
  firstName: string;
  lastName: string;
  imageURL: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  firstName: string;
  lastName: string;
  imageURL: string | null;
}

export interface UserPermissions {
  firstName: string;
  lastName: string;
  image: string | null;
  permission: string[];
}

export interface RegisterRequest {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleName: string;
}

export interface RegisterResponse {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleName: string;
}

export interface UpdateUserRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleName: string;
}

export interface ForgetPasswordRequest {
  newPassword: 'string';
  confirmPassword: 'string';
}

export interface NewPasswordRequest {
  oldPassword: 'string';
  newPassword: 'string';
  confirmPassword: 'string';
}
