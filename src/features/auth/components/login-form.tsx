"use client";

import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NextLink } from "@/components/link";
import { toast } from "sonner";
import { LoginInput, loginSchema } from "../schema";
import { login } from "../actions/login";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/locales/client";

export const LoginForm = () => {
  const t = useI18n();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (values) => {
    startTransition(async () => {
      const { error } = await login(values);

      if (error) {
        toast.error(error.message, { closeButton: true });
      } else {
        toast.success(t("login.success"), {
          id: "login-success",
          closeButton: true,
        });
        router.push("/");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{t("common.email")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="input-10"
                      className="peer pe-9"
                      placeholder={t("common.email")}
                      type="email"
                      {...field}
                    />
                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                      <Mail size={16} strokeWidth={2} aria-hidden="true" />
                    </div>
                  </div>
                </FormControl>
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>{t("common.password")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="input-23"
                      className="pe-9"
                      placeholder={t("common.password")}
                      type={isVisible ? "text" : "password"}
                      autoComplete="current-password"
                      {...field}
                    />
                    <button
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      aria-pressed={isVisible}
                      aria-controls="password"
                    >
                      {isVisible ? (
                        <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <Eye size={16} strokeWidth={2} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-8 mt-6 flex justify-between">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-muted-foreground">
                  {t("login.remember_me")}
                </FormLabel>
              </FormItem>
            )}
          />
          <NextLink
            href="/forgot-password"
            className="text-sm font-semibold text-primary focus:underline focus:outline-none"
          >
            {t("common.forgot_password")}
          </NextLink>
        </div>
        <div>
          <Button disabled={isPending} className="h-12 w-full" type="submit">
            {isPending && (
              <Loader2 className="h-4 w-4 animate-spin ltr:mr-2 rtl:ml-2" />
            )}
            {t("common.login")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
