import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-green-700">404</h1>

        <h2 className="mt-4 text-2xl font-bold text-green-900">
          Page Not Found
        </h2>

        <p className="mt-2 text-muted-foreground">
          Sorry, the page you are looking for does not exist.
        </p>

        <Button
          className="mt-6 bg-green-700 hover:bg-green-800"
          render={<Link href="/" />}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}
