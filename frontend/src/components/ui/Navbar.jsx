import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button"; // If using shadcn's Button component
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 text-gray-700 cursor-pointer" />
        <h1 className="text-xl font-semibold">My App</h1>
      </div>
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="outline">Home</Button>
        </Link>
        <Link href="/about">
          <Button>About</Button>
        </Link>
      </div>
    </nav>
  );
}
