import { Search } from "lucide-react";
// Update the import path below to the correct location of your Input component
// Update the path below to the correct location of your Input component
// Example: import { Input } from "../../../components/ui/input"
import { Input } from "../../../../../components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage() {
  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9 bg-muted" />
        </div>
      </header>

      {/* Categories */}
      <div className="px-4 py-3 border-b">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            "For you",
            "Travel",
            "Architecture",
            "Food",
            "Nature",
            "Art",
            "Sports",
          ].map((category) => (
            <div
              key={category}
              className="px-3 py-1.5 bg-muted rounded-full text-sm whitespace-nowrap"
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {Array.from({ length: 21 }).map((_, i) => (
          <Link href="#" key={i} className="aspect-square relative">
            <Image
              src={`https://media.newyorker.com/photos/665f65409ad64d9e7a494208/4:3/w_1003,h_752,c_limit/Chayka-screenshot-06-05-24`}
              alt={`Explore post ${i + 1}`}
              fill
              className="object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
