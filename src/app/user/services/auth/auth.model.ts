// models.ts
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
