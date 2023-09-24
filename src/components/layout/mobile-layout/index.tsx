import HEADER_LAYOUT_LOGO from '@/assets/logo/header_layout.svg';
import * as S from './page.styled';
interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
  return (
    <S.LayoutWrapper>
      <S.Layout>
        <S.LogoWrapper>
          <HEADER_LAYOUT_LOGO />
        </S.LogoWrapper>
        {children}
      </S.Layout>
    </S.LayoutWrapper>
  );
}
