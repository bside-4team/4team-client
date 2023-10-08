'use client';

import MainButton from '@/components/Button/MainButton';
import CHeader from '@/components/c-header';
import { useRouter } from 'next/navigation';
import * as S from './page.styled';

export default function PasswordComplete() {
  const { push } = useRouter();

  return (
    <>
      <CHeader title="임시 비밀번호 전송" isBackBtn />

      <S.Wrapper>
        <S.Title>
          입력하신 이메일 주소로 <br />
          임시 비밀번호를 전송했어요.
        </S.Title>
        <S.SubTitle>
          입력하신 이메일 주소로 임시 비밀번호를 <br />
          전송했어요. 확인 후 로그인 해주세요.
        </S.SubTitle>
        <S.NextButtonWrapper>
          <MainButton btnText="로그인" disabled={false} onClick={() => push('/login')} />
        </S.NextButtonWrapper>
      </S.Wrapper>
    </>
  );
}
