import HEADER_LAYOUT_LOGO from '@/assets/logo/header_layout.svg';
interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
  return (
    // <S.LayoutWrapper>
    <div className="flex min-h-screen w-full justify-center bg-neutral-bg05">
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
    </div>
    // </S.LayoutWrapper>
  );
}
