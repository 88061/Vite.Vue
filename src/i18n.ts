/* eslint-disable @typescript-eslint/no-explicit-any */
import { createI18n } from "vue-i18n";

type Locales = "en" | "zh";
const defaultLocale: Locales = "en";
const data: { value: Locales } = {
  value: defaultLocale,
};
const locales = new Set<Locales>([defaultLocale, "zh"]);
const loadedLocales = new Set<Locales>([]);
const messages = {} as {
  [key: string]: {
    [key: string]: object;
  };
};

const load = (locale: Locales) => {
  if (loadedLocales.has(locale)) {
    i18n.global.locale = locale;
  } else {
    loadedLocales.add(locale);
    let modules: any;
    if (locale === "zh") {
      modules = import.meta.glob("./modules/**/zh.json", {
        import: "default",
      });
    }
    if (locale === "en") {
      modules = import.meta.glob("./modules/**/en.json", {
        import: "default",
      });
    }

    Promise.all(
      Object.keys(modules).map((url: any) => {
        const [ns, lng] = url
          .replace(/modules|\.json|\.?\/?/g, "")
          .split("locales");

        return modules[url]().then((resources: any) => {
          if (ns === "app") {
            return Object.keys(resources).map((key) => {
              return [lng, key, resources[key]];
            });
          }
          return [lng, ns, resources];
        });
      }),
    ).then((resp: any) => {
      const result = resp.reduce(
        (result: any, info: any) => {
          if (typeof info.at(0) === "string") {
            const [lng, ns, data] = info;
            if (ns && data) {
              result.lng = lng;
              result.translation[ns] = data;
            }
          } else {
            info.forEach((_info: any) => {
              const [lng, ns, data] = _info;
              if (ns && data) {
                result.lng = lng;
                result.translation[ns] = data;
              }
            });
          }

          return result;
        },
        {
          lng: "",
          translation: {},
        },
      );

      i18n.global.setLocaleMessage(result.lng, result.translation);
      i18n.global.locale = locale;
    });
  }
};

export const i18n = createI18n({
  locale: defaultLocale,
  messages,
});

(() => load(defaultLocale))();

export const useLocales = () => {
  return {
    get value(): Locales {
      return data.value;
    },
    change: (lng: Locales) => {
      if (lng === data.value) return;
      if (locales.has(lng)) {
        load(lng);
        data.value = lng;
      }
    },
  };
};
