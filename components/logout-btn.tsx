"use client";
import { LogOut } from "@/app/actions/auth.actions";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => LogOut()}
      variant="outline"
      className="w-full text-blue-500 hover:text-blue-600"
    >
      Log Out
    </Button>
  );
}
