import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | All Books",
};
import BookCard from "@/components/books/BookCard";
import type { Book } from "@/types/bookDataTypes";
import { BookOpen } from "lucide-react";

const AllBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-books`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const books: Book[] = await res.json();

  return (
    <section className="container mx-auto px-4 py-10 md:py-14">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-green-900 md:text-4xl">
          Explore All Books
        </h1>

        <p className="mt-3 text-muted-foreground">
          Discover and explore books shared by the BookNook community.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="rounded-xl border border-dashed border-green-200 py-16 text-center">
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-green-700" />
          <h2 className="text-xl font-semibold text-green-900">
            No books found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Be the first to add a book to BookNook.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllBooks;