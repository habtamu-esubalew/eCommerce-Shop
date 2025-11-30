"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginAsync, clearError } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { MainLayout } from "@/components/layout/main-layout";
import { spacing } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    dispatch(clearError());
    
    try {
      await dispatch(loginAsync({
        username: formData.username,
        password: formData.password,
        expiresInMins: 30,
      })).unwrap();
      
      toast.success("Logged in successfully!");
      router.push("/");
    } catch (error: any) {
      const errorMessage = 
        typeof error === "string" 
          ? error 
          : error?.message || 
            error?.response?.data?.message || 
            error?.response?.data?.error ||
            "Invalid username or password. Please check your credentials and try again.";
      
      toast.error(errorMessage, {
        duration: 4000,
        description: "Please verify your username and password are correct.",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <MainLayout>
      <div className={spacing.section}>
        <div className={spacing.container}>
          <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="w-full max-w-md">
              <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-4">
                  <ShoppingBag className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div 
                      id="error-message"
                      className="flex items-start gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5 text-destructive animate-in slide-in-from-top-2"
                      role="alert"
                      aria-live="polite"
                    >
                      <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <p className="font-medium text-sm">Authentication Failed</p>
                        <p className="text-sm opacity-90">{typeof error === "string" ? error : String(error)}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      placeholder="Enter your username"
                      autoComplete="username"
                      disabled={loading}
                      className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                      aria-invalid={error ? "true" : "false"}
                      aria-describedby={error ? "error-message" : undefined}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={loading}
                        className={cn(
                          "pr-10",
                          error ? "border-destructive focus-visible:ring-destructive" : ""
                        )}
                        aria-invalid={error ? "true" : "false"}
                        aria-describedby={error ? "error-message" : undefined}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground text-center">
                    <p>Use this credentials( username: emilys, password: emilyspass) to login</p>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

