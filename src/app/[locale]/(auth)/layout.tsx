import { AuthLayout } from "@/components/layout/auth-layout";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}
