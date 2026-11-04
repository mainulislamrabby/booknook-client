"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
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

interface EditBookButtonProps {
  book: Book;
  email: string;
  onUpdated: (updatedBook: Book) => void;
}

const EditBookButton = ({ book, email, onUpdated }: EditBookButtonProps) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    category: book.category,
    image: book.image,
    description: book.description,
  });

  const handleOpen = () => {
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      image: book.image,
      description: book.description,
    });
    setOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await fetch(`http://localhost:5000/book/${book._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update book.");
      }

      onUpdated({ ...book, ...formData });
      setOpen(false);

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

  return (
    <>
      <Button size="sm" variant="outline" onClick={handleOpen}>
        Edit
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update your book information below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor={`title-${book._id}`}
                className="text-sm font-medium"
              >
                Book Title
              </label>
              <Input
                id={`title-${book._id}`}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`author-${book._id}`}
                className="text-sm font-medium"
              >
                Author
              </label>
              <Input
                id={`author-${book._id}`}
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`category-${book._id}`}
                className="text-sm font-medium"
              >
                Category
              </label>
              <Input
                id={`category-${book._id}`}
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`image-${book._id}`}
                className="text-sm font-medium"
              >
                Image URL
              </label>
              <Input
                id={`image-${book._id}`}
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`description-${book._id}`}
                className="text-sm font-medium"
              >
                Description
              </label>
              <Textarea
                id={`description-${book._id}`}
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
                onClick={() => setOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditBookButton;
