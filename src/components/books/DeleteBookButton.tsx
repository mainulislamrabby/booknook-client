"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface DeleteBookButtonProps {
  bookId: string;
  bookTitle: string;
  email: string;
  onDeleted: (bookId: string) => void;
}

const DeleteBookButton = ({
  bookId,
  bookTitle,
  email,
  onDeleted,
}: DeleteBookButtonProps) => {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const token = await getTokenFromClient();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete book.");
      }

      onDeleted(bookId);
      setOpen(false);

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
      setDeleting(false);
    }
  };

  return (
    <>
      <Button size="sm" variant="destructive" onClick={() => setOpen(true)}>
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{bookTitle}</strong>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Yes, Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteBookButton;
