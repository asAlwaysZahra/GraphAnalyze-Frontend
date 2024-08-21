export interface UserData {
  guid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  roleName: string;
}

export interface GetUserResponse {
  users: UserData[];
  count: number;
  thisPage: number;
}
