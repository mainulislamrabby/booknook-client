import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookNook | Sign Up",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
