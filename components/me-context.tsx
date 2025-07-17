"use client";

import { User } from "@/app/generated/prisma";
import { createContext } from "react";

export const MeContext = createContext<Omit<User, "password"> | null>(null);

export const MeContextProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Omit<User, "password"> | null;
}) => {
  return <MeContext value={value}>{children}</MeContext>;
};
