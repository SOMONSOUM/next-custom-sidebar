"use client";

import { User } from "@/generated/graphql-types";
import { initializeUserStore } from "@/store/user-store";
import React, { ReactNode } from "react";

interface AppInitializerProps {
  user: User | null;
  children: ReactNode;
}

export default function AppInitializer({
  user,
  children,
}: AppInitializerProps) {
  // Initialize the store with the user data
  initializeUserStore(user);

  return <>{children}</>;
}
