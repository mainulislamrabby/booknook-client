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
import { useRouter } from "next/navigation";

const LogIn = () => {
  const router = useRouter();
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
      const fromData = new FormData(e.target);
      const user = Object.fromEntries(fromData.entries()) as {
        email: string;
        password: string;
      };
      const { data, error } = await authClient.signIn.email({
        ...user,
      });
      if (data) {
        router.push("/");
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

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      console.log("Google login data:", data);
      console.log("Google login error:", error);

      if (error) {
        toast.add({
          title: "Google login failed",
          description: error.message || "Unable to login with Google.",
          type: "error",
        });

        setIsLoading(false);
      }
    } catch (error) {
      console.error("Google login error:", error);

      toast.add({
        title: "Google login failed",
        description: "Something went wrong. Please try again.",
        type: "error",
      });

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

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-12 w-full"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.25a4.48 4.48 0 0 1-1.95 2.94v2.45h3.15c1.84-1.7 2.9-4.2 2.9-7.42z"
              />
              <path
                fill="#34A853"
                d="M12 21.6c2.63 0 4.84-.87 6.45-2.35l-3.15-2.45c-.87.58-1.98.92-3.3.92-2.54 0-4.7-1.72-5.47-4.03H3.27v2.53A9.73 9.73 0 0 0 12 21.6z"
              />
              <path
                fill="#FBBC05"
                d="M6.53 13.69A5.84 5.84 0 0 1 6.23 12c0-.59.1-1.16.3-1.69V7.78H3.27A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.02 4.22l3.26-2.53z"
              />
              <path
                fill="#EA4335"
                d="M12 6.27c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.35 14.63 2.4 12 2.4a9.73 9.73 0 0 0-8.73 5.38l3.26 2.53C7.3 7.99 9.46 6.27 12 6.27z"
              />
            </svg>
            Continue with Google
          </Button>

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
