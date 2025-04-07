import { LoginRequest } from "@/types/auth/req";
import AuthService from "./authService";
import { LoginResponse } from "@/types/auth/res";
import { useMutation } from "@tanstack/react-query";

export default class AuthQuery {
  authService = new AuthService();

  loginMutation = () => {
    return useMutation<LoginResponse, Error, LoginRequest>({
      mutationKey: ["loginApi"],
      mutationFn: (request: LoginRequest) => this.authService.login(request),
    });
  };

  logoutMutation = () => {
    return useMutation<void, Error, void>({
      mutationKey: ["logoutApi"],
      mutationFn: () => this.authService.logout(),
    });
  };
}