
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface ReturnBookButtonProps {
  borrowId: string;
  status: "borrowed" | "returned";
  onReturned: (borrowId: string) => void;
}

const ReturnBookButton = ({
  borrowId,
  status,
  onReturned,
}: ReturnBookButtonProps) => {
  const [returning, setReturning] = useState(false);

  const handleReturn = async () => {
    try {
      setReturning(true);

      const res = await fetch(
        `http://localhost:5000/return-book/${borrowId}`,
        {
          method: "PATCH",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to return book.");
      }

      onReturned(borrowId);

      toast.add({
        title: "Book returned!",
        description: "The book has been successfully returned.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Return failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        type: "error",
      });
    } finally {
      setReturning(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      disabled={status === "returned" || returning}
      onClick={handleReturn}
    >
      {returning
        ? "Returning..."
        : status === "returned"
          ? "Returned"
          : "Return Book"}
    </Button>
  );
};

export default ReturnBookButton;
