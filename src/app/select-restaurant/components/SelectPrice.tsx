import { getRestaurantOption } from '@/apis/restaurant/option';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import { useSelectRestaurantStore } from '@/store/useSelectRestaurantStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function SelectPrice() {
  const { prices, setRestaurantPrice } = useSelectRestaurantStore();

  const { data } = useQuery({
    queryKey: ['restaurant-option'],
    queryFn: () => getRestaurantOption(),
    enabled: false, // Do not refetch on the client
  });

  useEffect(() => {
    setRestaurantPrice([]);
  }, []);

  return (
    <>
      {data?.prices?.map((p, i) => (
        <div key={i} className="flex items-center gap-xs py-9">
          <CheckBox2
            label={p.name}
            checkBoxId={`price-${i}`}
            checked={prices.includes(p.name)}
            onChangeEvent={() => setRestaurantPrice([p.name])}
          />
        </div>
      ))}
    </>
  );
}
