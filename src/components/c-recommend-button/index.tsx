'use client';

import { FoodRecommendRes, postFoodRecommend } from '@/apis/food/recommend';
import { RestaurantRecommendRes, postRestaurantRecommend } from '@/apis/restaurant/recommend';
import useUser from '@/hooks/useUser';
import { useSelectFoodStore } from '@/store/useSelectFoodStore';
import { useSelectRestaurantStore } from '@/store/useSelectRestaurantStore';
import { useSelectResultStore } from '@/store/useSelectResultStore';
import { FoodCategory, FoodKeyword } from '@taehoya/tastetionary/lib/domain/food/food.enum';
import { RestaurantCategory } from '@taehoya/tastetionary/lib/domain/restaurant/restaurant.enum';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import DefaultButton from '../Button/DefaultButton';
import { MainButtonProps } from '../Button/MainButton';
import { MODAL_TYPES } from '../Modal/GlobalModal';
import useModal from '../Modal/GlobalModal/hooks/useModal';
import { toUnicodeEscape } from './utils';

interface Props extends MainButtonProps {
  selectType: 'food' | 'restaurant';
}

export default function CRecommendButton({ selectType, btnText, ...rest }: Props) {
  const router = useRouter();
  const { token } = useUser();
  const { openModal, closeModal } = useModal();
  const pathname = usePathname();

  const { category: foodCategory, keyword: foodKeyword } = useSelectFoodStore();
  const {
    category: restaurantCategory,
    keyword: restaurantKeyword,
    price: restaurantPrice,
    resetSelectRestaurant,
  } = useSelectRestaurantStore();
  const { setSelectFoodResult, setSelectRestaurantResult } = useSelectResultStore();

  const isResultPage = pathname?.includes('result');

  const goScrollToTop = () => {
    if (typeof window === undefined) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const loginModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '인증이 필요합니다.\n로그인을 해주세요.',
      confirmText: '로그인하기',
      cancelText: '취소',
      needClose: true,
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      handleConfirm: () => router.push('/login'),
    });
  };

  const noResultModal = () => {
    setTimeout(() => {
      openModal(MODAL_TYPES.dialog, {
        title: isResultPage ? '더 이상 추첨할 식당이 없어요.' : '선택하신 조건으로 추첨할 식당이 없어요.',
        message: isResultPage
          ? '더 이상 추첨할 식당이 없습니다.\n다른 조건으로 추첨해보세요!'
          : '다른 조건으로 추첨해 보세요!',
        handleConfirm: () => {
          resetSelectRestaurant();

          router.push('/select-restaurant');
        },
        handleClose: () => closeModal(MODAL_TYPES.dialog),
        cancelText: '닫기',
        confirmText: '조건 재설정',
        needClose: true,
      });
    }, 500);
  };

  const loadingModal = (res?: RestaurantRecommendRes | FoodRecommendRes) => {
    openModal(MODAL_TYPES.loading, {
      maxWidth: 120,
      handleClose: () => {
        const unicodeFoodCategory = foodCategory
          .filter(c => c !== '전체')
          .map(c => toUnicodeEscape(c))
          .join(',');
        const unicodeFoodKeyword = foodKeyword
          .filter(c => c !== '전체')
          .map(c => toUnicodeEscape(c.replaceAll("'", '')))
          .join(',');

        const encodedFoodCategory = encodeURIComponent(unicodeFoodCategory);
        const encodedFoodKeyword = encodeURIComponent(unicodeFoodKeyword);

        if (!res && selectType === 'restaurant') {
          return noResultModal();
        }

        if (res && selectType === 'food') {
          const encodedFoodId = encodeURIComponent(toUnicodeEscape(res?.id + ''));
          const encodedFoodName = encodeURIComponent(toUnicodeEscape(res?.name));

          goScrollToTop();

          return router.push(
            `/select-menu/result-share?category=${encodedFoodCategory}&keyword=${encodedFoodKeyword}&id=${encodedFoodId}&name=${encodedFoodName}`
          );
        }

        if (res && 'aggregateReviews' in res) {
          setSelectRestaurantResult({
            name: res?.name,
            latitude: res?.latitude ?? 33.450701,
            longitude: res?.longitude ?? 126.570667,
            id: res?.id,
            ...(res?.aggregateReviews
              ? {
                  review: {
                    total: res?.aggregateReviews?.totalCount ?? 0,
                    revisitRatio: res?.aggregateReviews?.revisitRatio ?? 0,
                    prices: res?.aggregateReviews?.prices ?? [],
                    priceList: [],
                    keywords: res?.aggregateReviews?.keywords ?? [],
                  },
                }
              : {}),
          });
        } else {
          setSelectFoodResult({
            id: res?.id ? +res.id : 0,
            name: res?.name,
          });
        }

        goScrollToTop();

        router.push(`/select-restaurant/result`);
      },
    });
  };

  const { mutate: getFood } = useMutation<FoodRecommendRes, AxiosError>({
    mutationFn: () =>
      postFoodRecommend(
        {
          categories: foodCategory?.filter(c => c !== '전체') as FoodCategory[],
          keywords: foodKeyword?.filter(c => c !== '전체') as FoodKeyword[],
        },
        token
      ),
    onSuccess: res => loadingModal(res),
    onError: err => {
      if (err?.response?.status === 401) {
        return loginModal();
      }
    },
  });

  const { mutate: getRestaurant } = useMutation<RestaurantRecommendRes, AxiosError>({
    mutationFn: () =>
      postRestaurantRecommend(
        {
          category: restaurantCategory?.filter(c => c !== '전체') as RestaurantCategory[],
          keywords: restaurantKeyword?.filter(c => c !== '전체'),
          price: 10000 + 1000 * restaurantPrice,
          excludeIds: [],
        },
        token
      ),
    onSuccess: res => loadingModal(res),
    onError: err => {
      if (err?.response?.status === 401) {
        return loginModal();
      }
    },
  });

  const onButtonClick = () => {
    if (selectType === 'food') return getFood();

    if (selectType === 'restaurant') return getRestaurant();
  };

  return (
    <DefaultButton bgColor="yellow" customStyle="flex-grow py-12" {...rest} onClick={() => onButtonClick()}>
      <span className="body1 text-white">{btnText}</span>
    </DefaultButton>
  );
}
