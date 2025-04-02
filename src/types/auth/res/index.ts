export interface UserInfo {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
}

export interface LoginResponse {
  user: UserInfo;
  token: string;
  expires_at: string;
}

export interface ResponseData<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}
