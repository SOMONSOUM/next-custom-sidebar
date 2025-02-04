import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Image from "next/image";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-grow">
      <div className="flex w-full flex-col-reverse justify-end lg:grid lg:grid-cols-2">
        <div className="jusify-center container flex flex-grow py-6">
          <div className="mx-auto flex w-full flex-col-reverse">
            <div className="flex max-w-[380px] flex-grow flex-col justify-center self-center min-[400px]:w-[380px]">
              {children}
            </div>
            <div className="flex justify-start gap-4 self-end">
              <LocaleSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
        <div className="relative top-0 max-h-screen min-h-[150px] bg-muted lg:sticky">
          <Image
            priority
            src="/images/auth-bg.webp"
            alt=""
            placeholder="blur"
            fill
            className="object-cover"
            blurDataURL="/images/auth-bg.webp"
            sizes="(max-width:768px) 70vw, (max-width: 1200px) 80vw, 100vw"
          />
        </div>
      </div>
    </main>
  );
};
