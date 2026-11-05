"use client";

import Link from "next/link";
import { BookOpen, Menu, LogOut, UserRound, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
];

const privateLinks = [
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const visibleLinks = user ? [...navLinks, ...privateLinks] : navLinks;

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
            {visibleLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
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
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown size={16} />
                  </Button>
                }
              />

              <PopoverContent align="end" className="w-60 p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                    />
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-green-800">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="my-3 border-t" />

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => router.push("/my-profile")}
                >
                  <UserRound className="mr-2 h-4 w-4" />
                  My Profile
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="border-green-700 text-green-700 hover:bg-green-50"
              >
                Login
              </Button>

              <Button
                onClick={() => router.push("/signup")}
                className="bg-green-700 text-white hover:bg-green-800"
              >
                Register
              </Button>
            </>
          )}
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
              {visibleLinks.map((link) => (
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
                  {link.name}
                </Button>
              ))}

              <div className="mt-4 flex flex-col gap-3 border-t pt-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.image || ""} alt={user.name} />
                        <AvatarFallback>
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-green-800">
                        {user.name}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => router.push("/my-profile")}
                    >
                      <UserRound className="mr-2 h-4 w-4" />
                      My Profile
                    </Button>

                    <Button
                      variant="outline"
                      className="justify-start border-red-600 text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => router.push("/login")}
                      variant="outline"
                      className="border-green-700 text-green-700"
                    >
                      Login
                    </Button>

                    <Button
                      onClick={() => router.push("/signup")}
                      className="bg-green-700 text-white hover:bg-green-800"
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
