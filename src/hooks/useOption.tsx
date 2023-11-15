import { getSSRFoodOption } from '@/apis/food/option';
import { getSSRRestaurantOption } from '@/apis/restaurant/option';
import { useQuery } from '@tanstack/react-query';

interface Props {
  type: 'restaurant' | 'food';
}

export default function useOption({ type }: Props) {
  const { data: optionData } = useQuery(
    [type === 'restaurant' ? 'restaurant-option' : 'food-option'],
    type === 'restaurant' ? () => getSSRRestaurantOption() : () => getSSRFoodOption(),
    {
      cacheTime: 60 * 1000 * 5, // 5분
      staleTime: 60 * 1000, // 1분
    }
  );

  return {
    data: {
      ...optionData,
    },
  };
}
