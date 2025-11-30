import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types";
import { loginUser, getCurrentUser, LoginResponse } from "@/services/api/authService";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const mapLoginResponseToUser = (response: LoginResponse): User => ({
  id: response.id,
  username: response.username,
  email: response.email,
  firstName: response.firstName,
  lastName: response.lastName,
  gender: response.gender,
  image: response.image,
});

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string; expiresInMins?: number }, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      return mapLoginResponseToUser(response);
    } catch (error: any) {
      // Extract meaningful error message from API response
      const errorMessage = 
        error?.response?.data?.message || 
        error?.response?.data?.error || 
        error?.message || 
        "Invalid username or password. Please try again.";
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  "auth/checkAuth",
  async () => {
    const response = await getCurrentUser();
    return mapLoginResponseToUser(response);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("authToken"); // Clear auth token
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            state.user = JSON.parse(storedUser);
            state.isAuthenticated = true;
          } catch (error) {
            localStorage.removeItem("user");
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Login async thunk
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        // Use the rejected value (error message) if available, otherwise use error message
        state.error = (action.payload as string) || action.error.message || "Login failed. Please check your credentials and try again.";
        state.isAuthenticated = false;
      });

    // Check auth async thunk
    builder
      .addCase(checkAuthAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          localStorage.removeItem("authToken"); // Clear invalid token
        }
      });
  },
});

export const { login, logout, clearError, initializeAuth } = authSlice.actions;
export default authSlice.reducer;

