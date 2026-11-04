"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditBookButton from "@/components/books/EditBookButton";
import DeleteBookButton from "@/components/books/DeleteBookButton";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  description: string;
  userName: string;
  email: string;
  addedDate: string;
}

const MyBooks = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's books
  useEffect(() => {
    if (!user?.email) return;

    const fetchMyBooks = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:5000/my-books/${user.email}`,
          { cache: "no-store" },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch books.");
        }

        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error(error);

        toast.add({
          title: "Error",
          description: "Could not load your books.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, [user?.email]);

  // Update book in the UI
  const handleBookUpdated = (updatedBook: Book) => {
    setBooks((prev) =>
      prev.map((book) => (book._id === updatedBook._id ? updatedBook : book)),
    );
  };

  // Remove deleted book from the UI
  const handleBookDeleted = (bookId: string) => {
    setBooks((prev) => prev.filter((book) => book._id !== bookId));
  };

  if (isPending || (user && loading)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading your books...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">Please log in</h2>
            <p className="mt-2 text-muted-foreground">
              You need to log in to manage your books.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Books</CardTitle>

          <p className="text-sm text-muted-foreground">
            Manage the books you have added to BookNook.
          </p>
        </CardHeader>

        <CardContent>
          {books.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="text-lg font-semibold">
                You haven&apos;t added any books yet.
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Your added books will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book._id}>
                      <TableCell>
                        <div className="relative h-16 w-12 overflow-hidden rounded-md">
                          <Image
                            src={book.image || "/images/book-placeholder.png"}
                            alt={book.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">
                        {book.title}
                      </TableCell>

                      <TableCell>{book.author}</TableCell>

                      <TableCell>
                        <Badge variant="secondary">{book.category}</Badge>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline">Added</Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <EditBookButton
                            book={book}
                            email={user.email}
                            onUpdated={handleBookUpdated}
                          />

                          <DeleteBookButton
                            bookId={book._id}
                            bookTitle={book.title}
                            email={user.email}
                            onDeleted={handleBookDeleted}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyBooks;
