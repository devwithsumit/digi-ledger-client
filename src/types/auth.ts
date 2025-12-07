export interface User {
  id: number;
  email: string;
  name: string;
  createdAt?: string;
  role?: string;
  owner?: boolean;
  tenant?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  name?: string;
  password?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface UpdateProfileResponse {
  data: User;
  message: string;
  status: number;
}

export interface ErrorResponse extends Response {
  status: number;
  data: {
    message: string;
    details: string;
    timestamp: string;
  };
}
