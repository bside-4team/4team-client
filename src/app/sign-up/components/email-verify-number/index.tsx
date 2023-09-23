import MainButton from '@/components/Button/MainButton';
import TextInput from '@/components/Input/TextInput';
import CHeader from '@/components/c-header';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import * as S from './page.styled';

interface FormValue {
  authNum: string;
}

export default function EmailVerifyNumber() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValue>();

  return (
    <>
      <CHeader title="인증코드 입력" isBackBtn />

      <S.Wrapper>
        <S.Title>
          입력하신 회사 이메일 주소로
          <br />
          인증코드를 발송했어요.
        </S.Title>
        <S.SubTitle>
          1시간 안에 이메일로 발송된
          <br />
          인증코드를 입력해주세요.
        </S.SubTitle>

        <S.MainContainer>
          <TextInput
            label="인증코드 6자리"
            placeholder="인증코드 6자리 숫자 입력"
            type="number"
            maxLength={6}
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length > e.target.maxLength)
                e.target.value = e.target.value.slice(0, e.target.maxLength);
            }}
            {...register('authNum', { required: true, pattern: /[0-9]{6}/, maxLength: 6 })}
          />
        </S.MainContainer>

        <S.NextButtonWrapper>
          <MainButton btnText="다음" disabled />
        </S.NextButtonWrapper>
      </S.Wrapper>
    </>
  );
}
