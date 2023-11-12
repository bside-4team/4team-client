'use client';

import * as S from '@/app/select-restaurant/page.styled';
import RefreshButton from '@/components/Button/RefreshButton';
import CChangeRegion from '@/components/c-change-region';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import CSelectSection from '@/components/c-select-section';
import CSlider from '@/components/c-slider';
import useOption from '@/hooks/useOption';
import { selectRestaurantState } from '@/lib/atom';
import { useRecoilState } from 'recoil';

export default function CSelectRestaurant() {
  const [restaurantState, setRestaurantState] = useRecoilState(selectRestaurantState);

  const recommendBtnDisabled = restaurantState?.category?.length === 0 || restaurantState?.keyword?.length === 0;
  const refreshBtnDisabled = restaurantState?.category?.length === 0 && restaurantState?.keyword?.length === 0;

  const { data } = useOption({ type: 'restaurant' });

  return (
    <>
      <CHeader title="식당 고르기" isBackBtn />

      <CChangeRegion type="dining_area" />

      <S.SectionContainer>
        <CSelectSection title="음식 종류">
          <CSelectCategory data={data?.categories} selectType="restaurant" isDuplicate={false} />
        </CSelectSection>

        <CSelectSection title="키워드" subtitle="(복수 선택 가능)">
          <CSelectKeyword data={data?.keywords} selectType="restaurant" />
        </CSelectSection>

        <CSelectSection title="가격">
          <CSlider markData={data?.prices ?? []} type="restaurant" />
        </CSelectSection>
      </S.SectionContainer>

      <CRecommendButton
        btnText="추첨 시작"
        selectType="restaurant"
        disabled={recommendBtnDisabled}
        style={{ margin: '48px auto 0' }}
      />

      <RefreshButton
        btnText="선택 초기화"
        disabled={refreshBtnDisabled}
        onClick={() =>
          setRestaurantState({
            category: [],
            keyword: [],
            price: 0,
          })
        }
      />
    </>
  );
}
