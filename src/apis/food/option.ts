import http from '../http';

export interface FoodOptionRes {
  categories: { id: number; name: string; icon: string }[];
  keywords: { id: number; name: string }[];
}

export const getFoodOption = async () => {
  const res = await http.get<{ data?: FoodOptionRes }>('/apis/v1/food/option');

  if (res?.data) {
    return res?.data;
  }
};

export const getSSRFoodOption = async () => {
  const res = await http.get<{ data?: FoodOptionRes }>(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/v1/food/option`);

  if (res?.data) {
    return res?.data;
  }
};
