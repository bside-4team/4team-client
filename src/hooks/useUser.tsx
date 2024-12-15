import { getUser } from '@/apis/user/getUser';
import { setUser } from '@sentry/nextjs';
import { useQuery } from '@tanstack/react-query';
import useToken from './useToken';

export default function useUser() {
  const { token } = useToken();

  if (!token)
    return {
      isLoggedIn: false,
    };

  const { data: userData } = useQuery(['user'], () => getUser(token), {
    enabled: !!token,
    staleTime: Infinity, // token 값을 받으면 user 정보를 받아와 react-query에 저장
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  if (userData) {
    setUser({
      id: userData.id,
      username: userData.nickname,
      email: userData.account.accountEmail,
    });
  }

  return {
    isLoggedIn: Boolean(token),
    token,
    hasActivityArea: userData && token ? Boolean(userData?.area?.address) : false,
    data: {
      ...userData,
    },
  };
}
