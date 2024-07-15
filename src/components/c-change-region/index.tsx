import IC_MAP from '@/assets/common/map.svg';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  type: 'activity_area' | 'dining_area';
}

export default function CChangeRegion({ type }: Props) {
  const router = useRouter();
  const { data } = useUser();

  const [isClicked, setIsClicked] = useState(false);

  const onClickEvent = () => {
    if (type === 'dining_area') {
      router.push('/select-restaurant/region-setting');
    } else {
      router.push('/register-review/region-setting');
    }
  };

  const regionClasses = 'ml-4 text-14 font-normal break-keep';
  const changeTextClasses = `${regionClasses} ml-0 text-neutral-bg40`;

  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-between px-20 py-8 ${isClicked ? 'bg-neutral-bg10' : 'bg-neutral-bg05'}`}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onClick={onClickEvent}
    >
      <div className="flex items-center gap-4">
        <IC_MAP width={24} height={24} />

        <span className={regionClasses}>
          {type === 'dining_area'
            ? data?.area?.diningArea?.address
            : type === 'activity_area'
              ? data?.area?.activityArea?.address
              : ''}
        </span>
      </div>

      <span className={changeTextClasses}>{type === 'dining_area' ? '식사' : '활동'} 지역 변경 &gt;</span>
    </div>
  );
}
