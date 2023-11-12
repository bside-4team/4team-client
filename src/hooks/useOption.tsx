import { FoodOptionRes } from '@/apis/food/option';
import { RestaurantOptionRes } from '@/apis/restaurant/option';
import { queryClient } from '@/lib/react-query/ReactQueryProvider';

interface Props {
  type: 'restaurant' | 'food';
}

export default function useOption({ type }: Props) {
  const optionData = queryClient.getQueryData([
    type === 'restaurant' ? 'restaurant-option' : 'food-option',
  ]) as FoodOptionRes & RestaurantOptionRes;

  return {
    data: {
      ...optionData,
    },
  };
}
