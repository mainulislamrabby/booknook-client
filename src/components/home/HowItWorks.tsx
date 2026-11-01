import { Search, BookOpen, Library, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    id: 1,
    title: "Discover Books",
    description:
      "Explore our collection and find books that match your interests and curiosity.",
    icon: Search,
  },
  {
    id: 2,
    title: "Borrow Your Book",
    description:
      "Choose your favorite book and submit a borrowing request with just a few clicks.",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Enjoy Reading",
    description:
      "Start reading, gain knowledge, and return your book when your borrowing period ends.",
    icon: Library,
  },
];

const HowItWorks = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
          SIMPLE PROCESS
        </Badge>

        <h2 className="mb-4 text-3xl font-bold text-green-900 md:text-4xl">
          How Borrowing Works
        </h2>

        <p className="text-gray-600 leading-7">
          Getting your favorite book has never been easier. Follow three simple
          steps and begin your reading journey.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <Card
              key={step.id}
              className="border-green-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center p-8 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-800">
                  <Icon size={30} />
                </div>

                <span className="mb-2 text-sm font-semibold text-green-700">
                  STEP 0{step.id}
                </span>

                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-gray-600">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Button className="bg-green-700 hover:bg-green-800">
          <Link className="flex items-center p-0.5" href="/all-books">
            Explore Books
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HowItWorks;
