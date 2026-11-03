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

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const user = Object.fromEntries(fromData.entries()) as {
      name: string;
      email: string;
      photoURL: string;
      password: string; 
    };
    const { data, error } = await authClient.signUp.email({
      ...user,
      image: user.photoURL,
    });
    if (data) {
      redirect("/");
    }
    if (error) {
      console.log(error);
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
                  minLength={6}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters.
              </p>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              className="h-12 w-full bg-green-700 text-base font-semibold hover:bg-green-800"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              Register
            </Button>
          </form>

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
