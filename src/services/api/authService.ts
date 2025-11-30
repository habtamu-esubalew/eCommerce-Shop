import axiosInstance from "@/lib/axios";

export interface LoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    credentials
  );
  
  if (typeof window !== "undefined" && response.data.accessToken) {
    localStorage.setItem("authToken", response.data.accessToken);
  }
  
  return response.data;
}

export async function getCurrentUser(): Promise<LoginResponse> {
  const response = await axiosInstance.get<LoginResponse>("/auth/me");
  return response.data;
}

