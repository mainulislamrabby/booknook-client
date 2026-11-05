import Image from "next/image";
import Link from "next/link";
import { BookOpen, UserRound } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Book } from "@/types/bookDataTypes";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card className="group overflow-hidden border-green-100 py-0 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-64 w-full overflow-hidden bg-green-50">
        <Image
          src={book.image}
          alt={book.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {book.category}
          </Badge>

          <BookOpen className="h-5 w-5 text-green-700" />
        </div>

        <div>
          <h2 className="line-clamp-1 text-lg font-bold text-green-950">
            {book.title}
          </h2>

          <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <UserRound className="h-4 w-4" />
            {book.author}
          </p>
        </div>
        <Link href={`/books/${book._id}`}>
          <Button className="cursor-pointer w-full bg-green-700 hover:bg-green-800">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BookCard;
