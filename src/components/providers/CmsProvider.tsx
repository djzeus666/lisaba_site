"use client";

import { createContext, useContext } from "react";
import {
  navLinks as staticNav,
  siteConfig as staticSite,
  topBarLinks as staticTop,
  heroBadges as staticBadges,
} from "@/data/content";
import type { CmsSiteSettings } from "@/lib/cms/queries";

type NavState = {
  topBarLinks: { href: string; label: string }[];
  navLinks: { href: string; label: string }[];
};

type CmsContextValue = {
  site: CmsSiteSettings;
  nav: NavState;
};

const CmsContext = createContext<CmsContextValue>({
  site: { ...staticSite, heroBadges: staticBadges },
  nav: { topBarLinks: staticTop, navLinks: staticNav },
});

export function CmsProvider({
  site,
  nav,
  children,
}: {
  site: CmsSiteSettings;
  nav: NavState;
  children: React.ReactNode;
}) {
  return <CmsContext.Provider value={{ site, nav }}>{children}</CmsContext.Provider>;
}

export function useCms() {
  return useContext(CmsContext);
}
