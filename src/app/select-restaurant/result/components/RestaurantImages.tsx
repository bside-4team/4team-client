import IC_BOOKMARK from '@/assets/common/Icons/bookmark.svg';
import { useSelectResultStore } from '@/store/useSelectResultStore';
import { theme } from '@/styles/theme';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function RestaurantImages() {
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  console.log(imageUrl);

  const { restaurant } = useSelectResultStore();
  const restaurantName = restaurant?.name;
  const lat = restaurant?.latitude;
  const lng = restaurant?.longitude;

  useEffect(() => {
    const getImage = async () => {
      const needDistrict = !restaurantName?.includes(' ');
      const district = address?.split(' ')?.[1];

      const res = await axios.get(
        `/search-image-api?query=${needDistrict && district ? `${district} ${restaurantName}` : restaurantName}`,
        {
          headers: {
            'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
          },
        }
      );

      if (res?.data?.total >= 15) {
        setImageUrl([res?.data?.items?.[1]?.link, res?.data?.items?.[2]?.link, res?.data?.items?.[3]?.link]);
      } else {
        setImageUrl([]);
      }
    };

    if (restaurantName && restaurantName?.length > 0 && address !== '') {
      getImage();
    }
  }, [restaurant, address]);

  useEffect(() => {
    const getAddress = async () => {
      const res = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      });

      const data = res?.data?.documents?.[0];

      if (data) {
        setAddress(data?.road_address?.address_name ?? data?.address?.address_name);
      }
    };

    if (lat && lng) {
      getAddress();
    }
  }, [lat, lng]);

  if (imageUrl?.length === 0) return <div className="h-280 w-full bg-neutral-bg10"></div>;

  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute right-[10px] top-[10px] z-2 cursor-pointer rounded-2 bg-[#00000040] p-10">
        <IC_BOOKMARK />
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={24}
        scrollbar={{ draggable: true }}
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        style={{ width: '100%' }}
      >
        {imageUrl?.map((p, i) => {
          return (
            <SwiperSlide key={i}>
              <div className=" h-280 w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${p})` }} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="absolute bottom-lg z-1 flex gap-xs">
        {imageUrl?.map((_, i) => (
          <div
            key={i}
            className="h-4 w-24 bg-neutral-bg20 transition-colors"
            style={activeIndex === i ? { backgroundColor: theme.colors.white } : undefined}
          />
        ))}
      </div>
    </div>
  );
}
