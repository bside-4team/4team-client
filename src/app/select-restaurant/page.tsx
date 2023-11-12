import { getSSRRestaurantOption } from '@/apis/restaurant/option';
import CSelectRestaurant from '@/components/c-select-restaurant';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { Hydrate, dehydrate } from '@tanstack/react-query';

export default async function HydratedSelectRestaurant() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['restaurant-option'], () => getSSRRestaurantOption(), {
    cacheTime: 60 * 1000 * 5, // 5분
    staleTime: 60 * 1000, // 1분
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <CSelectRestaurant />
    </Hydrate>
  );
}
