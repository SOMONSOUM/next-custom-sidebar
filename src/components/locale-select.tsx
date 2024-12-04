"use client";

import React from "react";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { LOCALES } from "@/config";
import ReactCountryFlag from "react-country-flag";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

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

export const LocaleSelect = () => {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();
  const toggleLocale = () => {
    const newLocale = locale === "km" ? "en" : "km";
    changeLocale(newLocale);
  };
  return (
    <Select defaultValue={locale} onValueChange={toggleLocale}>
      <SelectTrigger
        aria-label="Select language"
        className="w-auto min-w-[90px] bg-transparent"
      >
        <div className="flex items-center gap-2 uppercase">
          <ReactCountryFlag
            svg
            className="text-xl"
            countryCode={flags[locale].flag}
            title={flags[locale].flag}
          />
          <span>{flags[locale].title}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((l) => (
          <SelectItem key={l} value={l}>
            <div className="flex items-center gap-2 uppercase">
              <ReactCountryFlag
                svg
                className="text-xl"
                countryCode={flags[l].flag}
                title={flags[l].flag}
              />
              <span className={flags[l].className}>{flags[l].title}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
