import dayjs from "dayjs";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  JWT_KEY_ACEESS_TOKEN_NAME,
  USER_PROFILE_KEY_NAME,
} from "@/constants/config/app";
import CookieManager from "./cookies";
import { useValidator } from "./validator";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default class Helper {
  static getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }

    return String(error);
  };

  //   static logOutWhenTokenExpired = () => {
  //     CookieManager.setCookie("isLoggedIn", false);
  //     let store = useMainStore();
  //     store.logout(store.$state);
  //   };

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

  //   static setValueStoreLogin = async (data: LoginResponse) => {
  //     let store = useMainStore();
  //     const userInfo = {
  //       id: data.user.id,
  //       email: data.user.email,
  //       name: data.user.name,
  //       avatar: data.user.avatar,
  //     };
  //     CookieManager.setCookie("isLoggedIn", true);
  //     CookieManager.setCookie(JWT_KEY_ACEESS_TOKEN_NAME, data.token);
  //     CookieManager.setCookie(USER_PROFILE_KEY_NAME, userInfo);
  //     store.login(store.$state, userInfo, data.token);
  //   };

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
}
