
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Landmark,
  WandSparkles,
  Heart,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    name: "Fiction",
    description: "Discover stories that take you to another world.",
    icon: BookOpen,
    color: "bg-green-100 text-green-800",
  },
  {
    name: "Science",
    description: "Explore discoveries, technology, and innovation.",
    icon: FlaskConical,
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "History",
    description: "Travel through time and explore the past.",
    icon: Landmark,
    color: "bg-amber-100 text-amber-800",
  },
  {
    name: "Fantasy",
    description: "Experience magical worlds and epic adventures.",
    icon: WandSparkles,
    color: "bg-purple-100 text-purple-800",
  },
  {
    name: "Romance",
    description: "Enjoy beautiful stories about love and life.",
    icon: Heart,
    color: "bg-pink-100 text-pink-800",
  },
  {
    name: "Business",
    description: "Learn about leadership, finance, and success.",
    icon: BriefcaseBusiness,
    color: "bg-orange-100 text-orange-800",
  },
];

const BookCategories = () => {
  return (
    <section className="bg-green-50/70 py-16 md:py-20">
      <div className="container mx-auto px-4">

        <div className="mb-12 flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
              EXPLORE COLLECTIONS
            </Badge>

            <h2 className="mb-3 text-3xl font-bold text-green-900 md:text-4xl">
              Explore Book Categories
            </h2>

            <p className="max-w-xl text-gray-600 leading-7">
              Find your next favorite read from our diverse
              collection of book genres.
            </p>
          </div>

          <Button
            variant="outline"
            className="border-green-700 text-green-800 hover:bg-green-100"
          >
            <Link className="flex items-center" href="/books">
              View All Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Card
                key={category.name}
                className="group border-green-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
              >
                <CardContent className="flex items-start gap-5 p-6">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${category.color}`}
                  >
                    <Icon size={27} />
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-green-800">
                      {category.name}
                    </h3>

                    <p className="text-sm leading-6 text-gray-600">
                      {category.description}
                    </p>

                    <Link
                      href={`/books?category=${category.name.toLowerCase()}`}
                      className="mt-3 inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-900"
                    >
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BookCategories;
