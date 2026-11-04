import Image from "next/image";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import BorrowBookCard from "@/components/books/BorrowBookCard";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

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

interface BookDetailsProps {
  params: Promise<{ id: string }>;
}

const BookDetails = async ({ params }: BookDetailsProps) => {
  const { id } = await params;
  const token = await getTokenFromServer();
  const res = await fetch(`http://localhost:5000/book/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to fetch book details");
  }

  const book: Book = await res.json();

  return (
    <section className="container mx-auto px-4 py-10 md:py-14">
      <Card className="mx-auto max-w-5xl overflow-hidden border-green-100 shadow-sm">
        <div className="grid md:grid-cols-2">
          {/* Book Image */}
          <div className="relative min-h-87.5 bg-green-50 md:min-h-137.5">
            <Image
              src={book.image}
              alt={book.title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>

          <BorrowBookCard book={book} />
        </div>
      </Card>
    </section>
  );
};

export default BookDetails;
