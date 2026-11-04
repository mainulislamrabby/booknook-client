"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, LockKeyhole, LogIn as LogInIcon } from "lucide-react";

import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Authentication will be connected here.
      const fromData = new FormData(e.target);
      const user = Object.fromEntries(fromData.entries()) as {
        email: string;
        password: string;
      };
      const { data, error } = await authClient.signIn.email({
        ...user,
      });
      if (data) {
        redirect("/");
      }
      if (error) {
        toast.add({
          title: "Login failed",
          description: error.message || "Invalid email or password.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Login error:", error);

      toast.add({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md border-green-100 shadow-sm">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <LogInIcon size={28} />
          </div>

          <CardTitle className="text-3xl font-bold text-green-900">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Log in to your BookNook account and continue reading.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="pl-10 focus-visible:ring-green-600"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="pl-10 focus-visible:ring-green-600"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-green-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full bg-green-700 text-base font-semibold hover:bg-green-800"
            >
              <LogInIcon className="mr-2 h-5 w-5" />
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-700 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default LogIn;
