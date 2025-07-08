'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div>
      The page your are looking for is not found.
      <div>
      <Button  asChild ><Link href={"/"} >Go back</Link></Button>

      </div>
    </div>
  );
}
