import HEADER_LAYOUT_LOGO from '@/assets/logo/header_layout.svg';
import * as S from './page.styled';
interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
  return (
    <S.LayoutWrapper>
      {/* <S.Layout> */}
      <div className="max-w-360 md:max-w-full relative mx-auto w-full bg-white">
        {/* <S.LogoWrapper> */}
        <div className="md:w-full fixed top-0 z-1 h-44 w-360 bg-neutral-bg10">
          <HEADER_LAYOUT_LOGO />
        </div>
        {/* </S.LogoWrapper> */}
        {children}
      </div>
      {/* </S.Layout> */}
    </S.LayoutWrapper>
  );
}
