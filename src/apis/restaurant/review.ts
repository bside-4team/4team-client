import { RestaurantCategory, RestaurantKeyword } from '@taehoya/tastetionary/lib/domain/restaurant/restaurant.enum';
import http from '../http';

interface Req {
  review: {
    category: RestaurantCategory;
    keywords: RestaurantKeyword[];
    price: number;
    summary: string;
    opinion: string;
  };
  external: {
    externalUUID: number;
    name: string;
    latitude: number;
    longitude: number;
    referenceLink?: string;
  };
}

interface Res {}

export const postRestarantReview = async (req: Req, token?: string) => {
  return await http.post<Res, Req>(
    '/apis/v1/restaurant/review',
    req,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined
  );
};
