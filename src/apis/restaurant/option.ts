import http from '../http';

export interface RestaurantOptionRes {
  categories: { id: number; name: string; icon: string }[];
  keywords: { id: number; name: string }[];
  prices: { id: number; name: string }[];
}

export const getRestaurantOption = async () => {
  const res = await http.get<{ data?: RestaurantOptionRes }>('/apis/v1/restaurant/option');

  if (res?.data) {
    return res?.data;
  }
};

export const getSSRRestaurantOption = async () => {
  const res = await http.get<{ data?: RestaurantOptionRes }>(
    `${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/v1/restaurant/option`
  );

  if (res?.data) {
    return res?.data;
  }
};
