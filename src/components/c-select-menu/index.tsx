'use client';

import { getFoodOption } from '@/apis/food/option';
import * as S from '@/app/select-menu/page.styled';
import RefreshButton from '@/components/Button/RefreshButton';
import CHeader from '@/components/c-header';
import CRecommendButton from '@/components/c-recommend-button';
import CSelectCategory from '@/components/c-select-category';
import CSelectKeyword from '@/components/c-select-keyword';
import CSelectSection from '@/components/c-select-section';
import useOption from '@/hooks/useOption';
import { selectFoodState } from '@/lib/atom';
import { queryClient } from '@/lib/react-query/ReactQueryProvider';
import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRecoilState } from 'recoil';

export default function CSelectMenu() {
  const [foodState, setFoodState] = useRecoilState(selectFoodState);

  const recommendBtnDisabled = foodState?.category?.length === 0 || foodState?.keyword?.length === 0;
  const refreshBtnDisabled = foodState?.category?.length === 0 && foodState?.keyword?.length === 0;

  const { data } = useOption({ type: 'food' });

  return (
    <>
      <CHeader title="메뉴 고르기" isBackBtn />

      <S.Container>
        <CSelectSection title="음식 종류 선택" subtitle="(복수 선택 가능)">
          <CSelectCategory data={data?.categories} selectType="food" />
        </CSelectSection>

        <CSelectSection title="키워드" subtitle="(복수 선택 가능)">
          <CSelectKeyword data={data?.keywords} selectType="food" />
        </CSelectSection>
      </S.Container>

      <CRecommendButton
        btnText="메뉴 추첨 시작"
        selectType="food"
        disabled={recommendBtnDisabled}
        style={{ margin: '48px auto 0' }}
      />

      <RefreshButton
        btnText="선택 초기화"
        disabled={refreshBtnDisabled}
        onClick={() =>
          setFoodState({
            category: [],
            keyword: [],
          })
        }
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery({
    queryKey: ['food-option'],
    queryFn: () => getFoodOption(),
    staleTime: 0,
    cacheTime: 0,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
