import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-green-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-green-800">
                <BookOpen size={24} />
              </div>

              <span className="text-2xl font-bold">BookNook</span>
            </Link>

            <p className="text-sm leading-7 text-green-100">
              Your favorite place to discover, explore, and borrow books. Find
              your next great read and make every moment a reading adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-sm text-green-100">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/all-books" className="hover:text-white">
                  All Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">Contact Us</h3>

            <ul className="space-y-4 text-sm text-green-100">
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0" />
                <a href="mailto:your-email@example.com">
                  your-email@example.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <span>+880 1XXXXXXXXX</span>
              </li>

              <li className="flex items-center gap-3">
                <MapPin size={18} className="shrink-0" />
                <span>Your Location, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">Follow Us</h3>

            <p className="mb-5 text-sm leading-7 text-green-100">
              Stay connected with BookNook and discover more reading
              inspiration.
            </p>

            <div className="flex items-center gap-3">
              <Link
                href="https://facebook.com/your-page"
                target="_blank"
                aria-label="Facebook"
                className="rounded-full bg-green-800 p-3 transition hover:bg-white hover:text-green-900"
              >
                <FaFacebook size={20} />
              </Link>

              <Link
                href="https://instagram.com/your-page"
                target="_blank"
                aria-label="Instagram"
                className="rounded-full bg-green-800 p-3 transition hover:bg-white hover:text-green-900"
              >
                <FaSquareInstagram size={20} />
              </Link>

              <Link
                href="https://linkedin.com/company/your-page"
                target="_blank"
                aria-label="LinkedIn"
                className="rounded-full bg-green-800 p-3 transition hover:bg-white hover:text-green-900"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-green-800 pt-6 text-center">
          <p className="text-sm text-green-200">
            © {new Date().getFullYear()} BookNook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
