import { LoginResponse } from "@/types/auth/res";
import { LoginRequest } from "@/types/auth/req";
import httpService from "../core/httpService";
import { API_CONST } from "@/constants/config/api";

export default class AuthService {
    login = async (request: LoginRequest): Promise<LoginResponse> => {
        const endPoint = API_CONST.AUTH.LOGIN;
        const response = await httpService.post<LoginResponse>(endPoint, request);
        
        return response.data;
    };

    logout = async (): Promise<void> => {
        const endPoint = API_CONST.AUTH.LOGOUT;
        await httpService.post(endPoint, {});
    };
}