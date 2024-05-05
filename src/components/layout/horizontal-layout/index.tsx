// import * as S from './style';
import * as S from './page.styled';

interface Props {
  children: React.ReactNode;
  subject: 'menu' | 'restaurant';
}

export default function HorizontalLayout({ children, subject }: Props) {
  // return <div className={S.horizontalLayoutVariant({ subject })}>{children}</div>;
  return <S.Wrapper $subject={subject}>{children}</S.Wrapper>;
}
