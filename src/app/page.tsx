'use client';

import CHeader from '@/components/c-header';
import CNavButton from '@/components/c-nav-button';
import CPickerButton from '@/components/c-pickerButton';
import GridLayout from '@/components/layout/grid-layout';
import * as S from './page.styled';

import HomeIcon from '@/assets/logo/home.svg';
import MypageIcon from '@/assets/logo/my-page.svg';
import ReviewIcon from '@/assets/logo/review.svg';
import { usePathname } from 'next/navigation';

export default function Home() {
  const pathName = usePathname();

  return (
    <>
      <CHeader title="맛셔너리" isLogo />
      <GridLayout>
        <S.MainContent>
          <CPickerButton title={'메뉴 고르기'} desc={'오늘은 어떤 음식을 먹을까?'} subject={'menu'} />
          <CPickerButton title={'식당 고르기'} desc={'오늘은 어떤 식당에 가볼까?'} subject={'restaurant'} />
        </S.MainContent>
      </GridLayout>
      <S.NavContainer>
        <CNavButton title="리뷰" icon={<ReviewIcon />} isActive={false} />
        <CNavButton title="홈" icon={<HomeIcon />} isActive={pathName === '/'} />
        <CNavButton title="마이페이지" icon={<MypageIcon />} isActive={false} />
      </S.NavContainer>
    </>
  );
}
