import { LoginForm } from "@/features/auth/components";
import { Metadata } from "next";
import { getScopedI18n } from "@/locales/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n("metadata");
  return {
    title: t("login_page_title"),
    description: t("login_page_description"),
  };
}

export default async function Login() {
  const t = await getScopedI18n("login");

  return (
    <>
      <div className="mb-4 grid gap-2 text-center">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
      <LoginForm />
    </>
  );
}
