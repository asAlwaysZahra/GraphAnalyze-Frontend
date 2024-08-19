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
  username: string;
  firstName: string;
  lastName: string;
  permission: string;
}
