import dayjs from "dayjs";
import {
  JWT_KEY_ACEESS_TOKEN_NAME,
  USER_PROFILE_KEY_NAME,
  EXPIRES_COOKIE_DAY,
} from "@/constants/config/app";
import { useValidator } from "./validator";
import relativeTime from "dayjs/plugin/relativeTime";
import { setCookie, deleteCookie } from "cookies-next/client";
import { useDispatch } from "react-redux";
import { clearToken, setProfile, setToken } from "@/store/slices/authSlice";
import { LoginResponse } from "@/types/auth/res";

dayjs.extend(relativeTime);

export default class Helper {
  static getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }

    return String(error);
  };

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

  static setValueStoreLogin = async (data: LoginResponse) => {
    const dispatch = useDispatch();
    const userInfo = {
      id: data.user.id as unknown as number,
      email: data.user.email,
      name: data.user.name,
      avatar: data.user.avatar ?? null,
    };

    setCookie("isLoggedIn", true, {
      maxAge: EXPIRES_COOKIE_DAY * 24 * 60 * 60,
    });
    setCookie(JWT_KEY_ACEESS_TOKEN_NAME, data.token, {
      maxAge: EXPIRES_COOKIE_DAY * 24 * 60 * 60,
    });
    setCookie(USER_PROFILE_KEY_NAME, userInfo, {
      maxAge: EXPIRES_COOKIE_DAY * 24 * 60 * 60,
    });

    dispatch(setToken(data.token));
    dispatch(setProfile(userInfo));
  };

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
