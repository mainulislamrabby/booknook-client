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
import ReturnBookButton from "@/components/borrows/ReturnBookButton";

interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
  status: "borrowed" | "returned";
}

const MyBorrows = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's borrowed books
  useEffect(() => {
    if (!user?.email) return;

    const fetchBorrows = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-borrows/${user.email}`,
          { cache: "no-store" },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch borrowed books.");
        }

        const data = await res.json();
        setBorrows(data);
      } catch (error) {
        console.error(error);

        toast.add({
          title: "Error",
          description: "Could not load your borrowed books.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBorrows();
  }, [user?.email]);

  // Update book status after returning
  const handleBookReturned = (borrowId: string) => {
    setBorrows((prev) =>
      prev.map((borrow) =>
        borrow._id === borrowId ? { ...borrow, status: "returned" } : borrow,
      ),
    );
  };

  if (isPending || (user && loading)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Loading your borrowed books...</p>
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
              You need to log in to view your borrowed books.
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
          <CardTitle className="text-2xl font-bold">
            My Borrowed Books
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            View and manage the books you have borrowed.
          </p>
        </CardHeader>

        <CardContent>
          {borrows.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg font-medium">No borrowed books yet.</p>

              <p className="mt-2 text-sm text-muted-foreground">
                Books you borrow will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Borrow Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {borrows.map((borrow) => (
                    <TableRow key={borrow._id}>
                      <TableCell>
                        <div className="relative h-16 w-12 overflow-hidden rounded-md">
                          <Image
                            src={
                              borrow.bookImage || "/images/book-placeholder.png"
                            }
                            alt={borrow.bookTitle}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">
                        {borrow.bookTitle}
                      </TableCell>

                      <TableCell>
                        {new Date(borrow.borrowDate).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        {new Date(borrow.returnDate).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            borrow.status === "returned"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {borrow.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <ReturnBookButton
                          borrowId={borrow._id}
                          status={borrow.status}
                          onReturned={handleBookReturned}
                        />
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

export default MyBorrows;
