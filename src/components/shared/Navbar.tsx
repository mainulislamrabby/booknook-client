"use client";

import Link from "next/link";
import { BookOpen, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/all-books" },
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">
            <BookOpen size={24} />
          </div>

          <span className="text-2xl font-bold text-green-800">BookNook</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink>
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-green-50 text-green-800"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Login & Register */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            onClick={() => router.push("/login")}
            variant="outline"
            className="border-green-700 text-green-700 hover:bg-green-50"
          >
            <Link href="/login">Login</Link>
          </Button>

          <Button
            onClick={() => router.push("/signup")}
            className="bg-green-700 text-white hover:bg-green-800"
          >
            <Link href="/signup">Register</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger>
            <Button
              variant="outline"
              size="icon"
              className="border-green-700 text-green-700 md:hidden"
            >
              <Menu size={22} />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="bg-white">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-xl font-bold text-green-800">
                <BookOpen size={22} />
                BookNook
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-3 px-4">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  onClick={() => router.push(link.href)}
                  variant="ghost"
                  className={`justify-start ${
                    pathname === link.href
                      ? "bg-green-50 text-green-800"
                      : "text-gray-600"
                  }`}
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              ))}

              <div className="mt-4 flex flex-col gap-3 border-t pt-4">
                <Button
                  onClick={() => router.push("/login")}
                  variant="outline"
                  className="border-green-700 text-green-700"
                >
                  <Link href="/login">Login</Link>
                </Button>

                <Button
                  onClick={() => router.push("/signup")}
                  className="bg-green-700 text-white hover:bg-green-800"
                >
                  <Link href="/signup">Register</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
