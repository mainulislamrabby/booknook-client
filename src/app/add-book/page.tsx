"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  BookOpen,
  UserRound,
  Mail,
  ImagePlus,
  CalendarDays,
  Plus,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { BookFormData } from "@/types/bookDataTypes";

const initialFormData: BookFormData = {
  title: "",
  author: "",
  category: "",
  image: "",
  description: "",
  userName: "",
  email: "",
};

const AddBooks = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState<BookFormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.add({
        title: "Please log in",
        description: "You need to log in before adding a book.",
        type: "error",
      });
      return;
    }

    const newBook = {
      ...formData,
      userName: user.name || "",
      email: user.email,
      addedDate: new Date().toISOString(),
    };

    const res = await fetch("http://localhost:5000/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.add({
        title: "Failed to add book",
        description: data.message || "Something went wrong.",
        type: "error",
      });
      return;
    }

    toast.add({
      title: "Book added successfully!",
      description: `${formData.title} has been added to BookNook.`,
      type: "success",
    });

    setFormData({
      ...initialFormData,
      userName: user.name || "",
      email: user.email,
    });
  };

  return (
    <section className="container mx-auto px-4 py-10 md:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <BookOpen size={28} />
          </div>

          <h1 className="text-3xl font-bold text-green-900 md:text-4xl">
            Add a New Book
          </h1>

          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Share your favorite books with the BookNook community.
          </p>
        </div>

        <Card className="border-green-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-green-900">
              Book Information
            </CardTitle>
            <CardDescription>
              Fill in the details below to add a new book.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Book Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  required
                  className="focus-visible:ring-green-600"
                />
              </div>

              {/* Author and Category */}
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="author">Author Name</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    required
                    className="focus-visible:ring-green-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: value ?? "",
                      }))
                    }
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="kids">Kids</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Book Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image">Book Image URL</Label>
                <div className="relative">
                  <ImagePlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/book-image.jpg"
                    required
                    className="pl-10 focus-visible:ring-green-600"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a short description about this book..."
                  rows={5}
                  required
                  className="resize-none focus-visible:ring-green-600"
                />
              </div>

              {/* User Information */}
              <div className="rounded-xl border border-green-100 bg-green-50/50 p-5">
                <div className="mb-4">
                  <h3 className="font-semibold text-green-900">Added By</h3>
                  <p className="text-sm text-muted-foreground">
                    Your account information
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="userName">User Name</Label>
                    <div className="relative">
                      <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        readOnly
                        className="bg-white pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        readOnly
                        className="bg-white pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Added Date */}
              <div className="flex items-center gap-3 rounded-lg border border-dashed border-green-200 p-4">
                <CalendarDays className="h-5 w-5 text-green-700" />
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Date Added
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Automatically saved when you submit the form.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!formData.category}
                className="h-12 w-full bg-green-700 text-base font-semibold hover:bg-green-800"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Book
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AddBooks;
