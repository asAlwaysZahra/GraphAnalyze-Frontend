// models.ts
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  roles: {
    result: string[];
    id: number;
    exception: null;
    status: 5;
    isCanceled: false;
    isCompleted: true;
    isCompletedSuccessfully: true;
    creationOptions: 0;
    asyncState: null;
    isFaulted: false;
  };
}
