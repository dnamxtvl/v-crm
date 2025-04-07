import { useDispatch } from 'react-redux';
import { setToken, setProfile } from '@/store/slices/authSlice';
import { setCookie } from 'cookies-next';
import { LoginResponse } from '@/types/auth/res';
import { clearToken } from '@/store/slices/authSlice';
import { deleteCookie } from 'cookies-next';
import { JWT_KEY_ACEESS_TOKEN_NAME, USER_PROFILE_KEY_NAME } from '@/constants/config/app';

export const useAuth = () => {
  const dispatch = useDispatch();

  const login = async (data: LoginResponse) => {
    const userInfo = {
      id: data.user.id as unknown as string,
      email: data.user.email,
      name: data.user.name,
      avatar: data.user.avatar ?? null,
    };

    setCookie("isLoggedIn", true, {
      maxAge: 7 * 24 * 60 * 60,
    });
    setCookie("token", data.token, {
      maxAge: 7 * 24 * 60 * 60,
    });
    setCookie("user", userInfo, {
      maxAge: 7 * 24 * 60 * 60,
    });

    dispatch(setToken(data.token));
    dispatch(setProfile(userInfo));
  };

  const logOut = () => {
    const dispatch = useDispatch();
    setCookie("isLoggedIn", false);
    deleteCookie(JWT_KEY_ACEESS_TOKEN_NAME);
    deleteCookie(USER_PROFILE_KEY_NAME);

    dispatch(clearToken());
  };

  return { login, logOut };
};