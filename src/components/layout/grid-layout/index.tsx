import * as S from './page.styled';

interface Props {
  children: React.ReactNode;
}
export default function GridLayout({ children }: Props) {
  return <S.Wrapper>{children}</S.Wrapper>;
  // return <div className="h-full bg-[length:20px_20px] pt-100">{children}</div>;
}
