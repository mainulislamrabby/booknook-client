"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserRound,
  Mail,
  ImagePlus,
  LockKeyhole,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";

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

const SignUp = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordError("");
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    return "";
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const error = validatePassword(formData.password);

    if (error) {
      setPasswordError(error);

      toast.add({
        title: "Invalid password",
        description: error,
        type: "error",
      });

      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: formData.photoURL,
      });

      if (error) {
        toast.add({
          title: "Registration failed",
          description: error.message || "Unable to create your account.",
          type: "error",
        });

        return;
      }

      if (data) {
        toast.add({
          title: "Registration successful",
          description: "Your account has been created successfully.",
          type: "success",
        });

        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);

      toast.add({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

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
      <Card className="w-full max-w-lg border-green-100 shadow-sm">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <UserPlus size={28} />
          </div>

          <CardTitle className="text-3xl font-bold text-green-900">
            Create an Account
          </CardTitle>

          <CardDescription>
            Join BookNook and discover your next favorite book.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>

              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="pl-10 focus-visible:ring-green-600"
                  required
                />
              </div>
            </div>

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

            {/* Photo URL */}
            <div className="space-y-2">
              <Label htmlFor="photoURL">Photo URL</Label>

              <div className="relative">
                <ImagePlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="photoURL"
                  name="photoURL"
                  type="url"
                  value={formData.photoURL}
                  onChange={handleChange}
                  placeholder="https://example.com/profile.jpg"
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
                  placeholder="Create a password"
                  className="pl-10 focus-visible:ring-green-600"
                  required
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Password must contain uppercase, lowercase, and at least 6
                characters.
              </p>

              {passwordError && (
                <p className="text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full bg-green-700 text-base font-semibold hover:bg-green-800"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>

          {/* Google Login */}
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

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-green-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignUp;
