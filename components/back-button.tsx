"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

export default function BackButton() {
  return (
    <Button
      variant={"ghost"}
      onClick={() => window.history.back()}
      className="mr-2"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}
