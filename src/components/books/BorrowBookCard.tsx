"use client";

import { useState } from "react";
import {
  BookOpen,
  UserRound,
  Mail,
  CalendarDays,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

interface BorrowBookCardProps {
  book: {
    _id: string;
    title: string;
    image: string;
    category: string;
    author: string;
    description: string;
    userName: string;
    email: string;
    addedDate?: string;
  };
}

const BorrowBookCard = ({ book }: BorrowBookCardProps) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBorrow = async () => {
    if (!user) {
      toast.add({
        title: "Login required",
        description: "Please log in to borrow this book.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/borrow-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
          bookTitle: book.title,
          bookImage: book.image,
          userEmail: user.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to borrow book.");
      }

      toast.add({
        title: "Book borrowed successfully!",
        description: "You can view this book in My Borrows.",
        type: "success",
      });

      setOpen(false);
    } catch (error) {
      console.error("Borrow error:", error);

      toast.add({
        title: "Borrow failed",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-6 md:p-8">
      <CardHeader className="p-0">
        <Badge className="mb-4 w-fit bg-green-100 text-green-800 hover:bg-green-100">
          {book.category}
        </Badge>

        <CardTitle className="text-2xl font-bold text-green-950 md:text-3xl">
          {book.title}
        </CardTitle>

        <CardDescription className="mt-2 flex items-center gap-2 text-base">
          <UserRound className="h-4 w-4" />
          By {book.author}
        </CardDescription>
      </CardHeader>

      <Separator className="my-6" />

      <CardContent className="flex-1 space-y-6 p-0">
        <div>
          <h2 className="mb-2 flex items-center gap-2 font-semibold text-green-900">
            <BookOpen className="h-5 w-5" />
            About This Book
          </h2>

          <p className="text-sm leading-7 text-muted-foreground">
            {book.description}
          </p>
        </div>

        <Separator />

        <div>
          <h2 className="mb-4 font-semibold text-green-900">Added By</h2>

          <div className="space-y-3">
            <p className="flex items-center gap-3 text-sm text-muted-foreground">
              <UserRound className="h-4 w-4 text-green-700" />
              {book.userName}
            </p>

            <p className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-green-700" />
              {book.email}
            </p>

            <p className="flex items-center gap-3 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-green-700" />
              {book.addedDate
                ? new Date(book.addedDate).toLocaleDateString()
                : "Date not available"}
            </p>
          </div>
        </div>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              disabled={!user}
              className="mt-8 h-12 w-full bg-green-700 text-base font-semibold hover:bg-green-800"
            >
              Borrow This Book
            </Button>
          }
        />

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-green-900">
              Borrow {book.title}
            </DialogTitle>
            <DialogDescription>
              Confirm your details to borrow this book.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="space-y-2">
              <Label htmlFor="borrow-name">User Name</Label>
              <Input
                id="borrow-name"
                value={user?.name || ""}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="borrow-email">Email Address</Label>
              <Input
                id="borrow-email"
                value={user?.email || ""}
                readOnly
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleBorrow}
              disabled={isLoading || !user}
              className="w-full bg-green-700 hover:bg-green-800"
            >
              {isLoading ? "Processing..." : "Confirm Borrow"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BorrowBookCard;