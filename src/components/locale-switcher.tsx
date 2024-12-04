"use client";

import React from "react";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { Button } from "./ui/button";
import { LOCALES } from "@/config";
import ReactCountryFlag from "react-country-flag";

type LOCALE = (typeof LOCALES)[number];

const flags: Record<
  LOCALE,
  {
    flag: string;
    title: string;
    className?: string;
  }
> = {
  km: {
    flag: "kh",
    title: "ខ្មែរ",
  },
  en: {
    flag: "us",
    title: "EN",
  },
};

export const LocaleSwitcher: React.FC = () => {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();
  const toggleLocale = () => {
    const newLocale = locale === "km" ? "en" : "km";
    changeLocale(newLocale);
  };

  return (
    <Button onClick={toggleLocale} variant="outline">
      <ReactCountryFlag
        svg
        className="text-xl"
        countryCode={flags[locale].flag}
        title={flags[locale].flag}
      />
      <span className={flags[locale].className}>{flags[locale].title}</span>
    </Button>
  );
};
