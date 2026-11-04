import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
}

const NewArrivals = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/new-arrivals`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch new arrivals.");
  }

  const newArrivals: Book[] = await res.json();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-3">
            <BookOpen className="mr-1 h-3 w-3" />
            Discover Books
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            New Arrivals
          </h2>

          <p className="mt-3 max-w-xl text-muted-foreground">
            Explore the newest additions to our book collection.
          </p>
        </div>

        {/* Book Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newArrivals.map((book) => (
            <Card key={book._id} className="overflow-hidden">
              <div className="relative h-64 w-full bg-muted">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <CardContent className="space-y-3 pt-5">
                <Badge variant="outline">{book.category}</Badge>

                <div>
                  <h3 className="line-clamp-1 text-lg font-semibold">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    By {book.author}
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full">
                  <Link className={"flex items-center"} href={`/books/${book._id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* See All Books */}
        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg">
            <Link className={"flex items-center"} href="/books">
              See All Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;