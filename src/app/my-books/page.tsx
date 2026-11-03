"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"edit" | "delete">("edit");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    image: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);

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
  }, [user?.email, isPending]);

  // Open edit dialog
  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      image: book.image,
      description: book.description,
    });
    setDialogType("edit");
    setDialogOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (book: Book) => {
    setSelectedBook(book);
    setDialogType("delete");
    setDialogOpen(true);
  };

  // Update book
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedBook || !user?.email) return;

    try {
      setSaving(true);

      const res = await fetch(
        `http://localhost:5000/book/${selectedBook._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            email: user.email,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update book.");
      }

      setBooks((prev) =>
        prev.map((book) =>
          book._id === selectedBook._id ? { ...book, ...formData } : book,
        ),
      );

      setDialogOpen(false);
      setSelectedBook(null);

      toast.add({
        title: "Book updated!",
        description: "Your book details have been updated successfully.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Update failed",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  // Delete book
  const handleDelete = async () => {
    if (!selectedBook || !user?.email) return;

    try {
      setSaving(true);

      const res = await fetch(
        `http://localhost:5000/book/${selectedBook._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete book.");
      }

      setBooks((prev) => prev.filter((book) => book._id !== selectedBook._id));

      setDialogOpen(false);
      setSelectedBook(null);

      toast.add({
        title: "Book deleted!",
        description: "Your book has been deleted successfully.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Delete failed",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  if (isPending || loading) {
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(book)}
                          >
                            Edit
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteClick(book)}
                          >
                            Delete
                          </Button>
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

      {/* Edit and Delete Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {dialogType === "edit" ? (
            <>
              <DialogHeader>
                <DialogTitle>Edit Book</DialogTitle>
                <DialogDescription>
                  Update your book information below.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Book Title
                  </label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="author" className="text-sm font-medium">
                    Author
                  </label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    Image URL
                  </label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    required
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Delete Book?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete{" "}
                  <strong>{selectedBook?.title}</strong>? This action cannot be
                  undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={saving}
                >
                  {saving ? "Deleting..." : "Yes, Delete"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyBooks;
