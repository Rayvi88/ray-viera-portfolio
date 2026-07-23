import { getRequestConfig } from "next-intl/server";
import es from "./messages/es.json";
import en from "./messages/en.json";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? "en";

  const messages = locale === "es" ? es : en;

  console.log("LOCALE:", locale);
  console.log("HAS FOOTER:", !!messages.footer);
  console.log("FOOTER:", messages.footer);

  return {
    locale,
    messages,
  };
});