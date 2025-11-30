"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeAuth, checkAuthAsync } from "@/store/slices/authSlice";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    if (mounted && isAuthenticated) {
      dispatch(checkAuthAsync()).catch((error) => {
        console.log("Session check failed:", error);
      });
    }
  }, [mounted, isAuthenticated, dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className={className || "flex-1"}>{children}</main>
      <Footer />
    </div>
  );
}

