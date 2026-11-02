import Image from "next/image";
import { notFound } from "next/navigation";
import { BookOpen, UserRound, Mail, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

  const res = await fetch(`http://localhost:5000/book/${id}`, {
    cache: "no-store",
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

          {/* Book Information */}
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
              {/* Description */}
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

              {/* Added By */}
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

            <Button className="mt-8 h-12 w-full bg-green-700 text-base font-semibold hover:bg-green-800">
              Borrow This Book
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default BookDetails;
