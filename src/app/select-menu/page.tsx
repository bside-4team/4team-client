import { getSSRFoodOption } from '@/apis/food/option';
import CSelectMenu from '@/components/c-select-menu';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { Hydrate, dehydrate } from '@tanstack/react-query';

export default async function HydratedSelectMenu() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['food-option'], () => getSSRFoodOption(), {
    cacheTime: 60 * 1000 * 5, // 5분
    staleTime: 60 * 1000, // 1분
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <CSelectMenu />
    </Hydrate>
  );
}
