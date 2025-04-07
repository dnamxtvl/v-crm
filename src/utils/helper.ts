import dayjs from "dayjs";
import {
  JWT_KEY_ACEESS_TOKEN_NAME,
  USER_PROFILE_KEY_NAME,
  DEFAULT_ERROR_CODE,
} from "@/constants/config/app";
import { useValidator } from "./validator";
import relativeTime from "dayjs/plugin/relativeTime";
import { setCookie, deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { clearToken } from "@/store/slices/authSlice";
import { store } from "@/store/store";

dayjs.extend(relativeTime);

const localeMessages = {
  en: () => import('@/locales/en.json'),
  vi: () => import('@/locales/vi.json')
};

export default class Helper {
  static logOutWhenTokenExpired = () => {
    const dispatch = useDispatch();
    setCookie("isLoggedIn", false);
    deleteCookie(JWT_KEY_ACEESS_TOKEN_NAME);
    deleteCookie(USER_PROFILE_KEY_NAME);

    dispatch(clearToken());
  };

  static getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  static calculateTimeAgo = (timestamp: string) => {
    return dayjs(timestamp).fromNow();
  };

  static convertSecondsToTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  static scrollToTop = (elementId: string) => {
    document
      .getElementById(elementId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  static detectHalfWidth = (value: string) => {
    if (value == "" || value == null || value == undefined) return "";

    const characters = value.split("");
    const charactersHalfWidth = characters.filter((character: string) =>
      useValidator().isHalfWidth(character)
    );

    return charactersHalfWidth.join("");
  };

  static trimFullWidth = (str: string): string => {
    return str.replace(/^[\s\u3000]+|[\s\u3000]+$/g, "");
  };

  static trimFormState = (formState: Record<string, any>) => {
    const trimmedState: Record<string, any> = {};
    for (const key in formState) {
      if (typeof formState[key] === "string") {
        trimmedState[key] = this.trimFullWidth(formState[key].trim());
      } else {
        trimmedState[key] = formState[key];
      }
    }

    return trimmedState;
  };

  static getErrorMessage = async (code: string) => {
    const locale = store.getState().auth.lang as keyof typeof localeMessages;
    const messages: Record<string, string> = (await localeMessages[locale]()).default.error_codes;
  
    return messages[code] ?? messages[DEFAULT_ERROR_CODE];
  }
}
