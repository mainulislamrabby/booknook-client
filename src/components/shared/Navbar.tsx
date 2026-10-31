import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center gap-2">
          <div>
            <h2>BookNook</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link href={"/"}>Home</Link>
            <Link href={"/all-books"}>All Books</Link>
            <Link href={"/add-book"}>Add Book</Link>
            <Link href={"/my-books"}>My Books</Link>
            <Link href={"/my-borrows"}>My Borrows</Link>
          </div>
          <div>
            <Link href={"/signup"}>
              <Button>Sign Up</Button>
            </Link>
            <Link href={"/signup"}>
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
