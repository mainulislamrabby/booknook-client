"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound, Mail, ImagePlus, Save, ArrowLeft } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MyProfile = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [initialized, setInitialized] = useState(false);

  if (user && !initialized) {
    setName(user.name || "");
    setImage(user.image || "");
    setInitialized(true);
  }

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-green-900">Login Required</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Please log in to view your profile.
            </p>

            <Button
              className="mt-5 bg-green-700 hover:bg-green-800"
              onClick={() => router.push("/login")}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.add({
        title: "Name required",
        description: "Please enter your name.",
        type: "error",
      });

      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (error) {
        toast.add({
          title: "Update failed",
          description: error.message || "Unable to update your profile.",
          type: "error",
        });

        return;
      }

      toast.add({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Profile update error:", error);

      toast.add({
        title: "Update failed",
        description: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <main className="min-h-[80vh] bg-green-50/30 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Button
          variant="ghost"
          className="mb-5 text-green-800"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="overflow-hidden border-0">
          <CardHeader className="bg-green-700 text-white pt-2">
            <CardTitle className="text-2xl">My Profile</CardTitle>

            <p className="text-sm text-green-100">
              View and update your account information.
            </p>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            {/* Profile Preview */}
            <div className="mb-8 flex flex-col items-center gap-4 border-b pb-8 sm:flex-row">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={image || user.image || ""}
                  alt={name || user.name}
                  referrerPolicy="no-referrer"
                />

                <AvatarFallback className="bg-green-100 text-2xl font-bold text-green-800">
                  {(name || user.name)?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-green-900">
                  {name || user.name}
                </h2>

                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  <UserRound className="mr-2 inline h-4 w-4" />
                  Full Name
                </Label>

                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="mr-2 inline h-4 w-4" />
                  Email Address
                </Label>

                <Input
                  id="email"
                  value={user.email}
                  readOnly
                  className="bg-muted"
                />

                <p className="text-xs text-muted-foreground">
                  Email changes will be handled separately.
                </p>
              </div>

              {/* Image */}
              <div className="space-y-2">
                <Label htmlFor="image">
                  <ImagePlus className="mr-2 inline h-4 w-4" />
                  Profile Image URL
                </Label>

                <Input
                  id="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/profile.jpg"
                />
              </div>

              {/* Save */}
              <Button
                type="submit"
                disabled={isUpdating}
                className="w-full bg-green-700 hover:bg-green-800"
              >
                <Save className="mr-2 h-4 w-4" />

                {isUpdating ? "Saving Changes..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default MyProfile;
