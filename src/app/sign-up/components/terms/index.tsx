import MainButton from '@/components/Button/MainButton';
import CheckBox2 from '@/components/CheckBox/CheckBox2';
import CHeader from '@/components/c-header';
import { agreeTermState } from '@/lib/atom';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import * as S from './page.styled';

interface Props {
  onNext: () => void;
}

export default function Terms({ onNext }: Props) {
  const router = useRouter();

  const [agreeTerms, setAgreeTerms] = useRecoilState(agreeTermState);

  const handleChangeAgreeTerms = (checked: boolean, type: 'all' | 'privacy' | 'marketing' | 'service') => {
    if (type === 'all') {
      setAgreeTerms({
        all: checked,
        privacy: checked,
        marketing: checked,
        service: checked,
      });

      return;
    }

    if (type === 'marketing') {
      setAgreeTerms({
        ...agreeTerms,
        marketing: checked,
      });

      return;
    }

    if (type === 'privacy') {
      setAgreeTerms({
        ...agreeTerms,
        privacy: checked,
      });

      return;
    }

    if (type === 'service') {
      setAgreeTerms({
        ...agreeTerms,
        service: checked,
      });

      return;
    }
  };

  return (
    <>
      <CHeader title="약관 동의" isBackBtn />
      <S.Wrapper>
        <S.TitleContainer>
          <S.Title>
            서비스 이용을 위해 <br />
            아래 약관에 동의해주세요.
          </S.Title>
          <S.SubTitle>
            서비스 이용을 위해 동의가 필요합니다. <br /> 정책 및 약관을 확인 후 회원가입을 진행해주세요.
          </S.SubTitle>
        </S.TitleContainer>
        <S.CheckboxWrapper>
          <S.Divider isActive></S.Divider>
          <S.CheckboxContainer isActive>
            <CheckBox2
              checkBoxId="all"
              label="이용 약관 전체 동의"
              onChangeEvent={checked => handleChangeAgreeTerms(checked, 'all')}
              checked={agreeTerms.privacy && agreeTerms.marketing}
            />
          </S.CheckboxContainer>
        </S.CheckboxWrapper>
        <S.PrivacyNoticeWrapper>
          <S.PrivacyNoticeCheckboxContainer>
            <CheckBox2
              checkBoxId="privacy"
              onChangeEvent={checked => handleChangeAgreeTerms(checked, 'privacy')}
              checked={agreeTerms.privacy}
            />
          </S.PrivacyNoticeCheckboxContainer>
          <S.PrivacyNoticeContainer>
            <S.PrivacyNoticeTitle>[필수] 개인정보 처리방침</S.PrivacyNoticeTitle>
            <S.PrivacyNoticeLook onClick={() => router.push('/sign-up?step=privacy-notice')}>보기</S.PrivacyNoticeLook>
          </S.PrivacyNoticeContainer>
        </S.PrivacyNoticeWrapper>

        <S.MarketingWrapper>
          <S.MarketingCheckboxContainer>
            <CheckBox2
              checkBoxId="marketing"
              onChangeEvent={checked => handleChangeAgreeTerms(checked, 'marketing')}
              checked={agreeTerms.marketing}
            />
          </S.MarketingCheckboxContainer>
          <S.MarketingContainer>
            <S.MarketingTitle>[필수] 마케팅 활용 정보 수신 제공</S.MarketingTitle>
            <S.MarketingLook onClick={() => router.push('/sign-up?step=opt-in-marketing')}>보기</S.MarketingLook>
          </S.MarketingContainer>
        </S.MarketingWrapper>

        <S.MarketingWrapper>
          <S.MarketingCheckboxContainer>
            <CheckBox2
              checkBoxId="service"
              onChangeEvent={checked => handleChangeAgreeTerms(checked, 'service')}
              checked={agreeTerms.service}
            />
          </S.MarketingCheckboxContainer>
          <S.MarketingContainer>
            <S.MarketingTitle>[필수] 서비스 이용약관</S.MarketingTitle>
            <S.MarketingLook onClick={() => router.push('/sign-up?step=terms-of-service')}>보기</S.MarketingLook>
          </S.MarketingContainer>
        </S.MarketingWrapper>

        <S.NextButtonWrapper>
          <MainButton
            type="button"
            btnText="다음"
            disabled={!(agreeTerms.marketing && agreeTerms.privacy && agreeTerms.service)}
            onClick={onNext}
          />
        </S.NextButtonWrapper>
      </S.Wrapper>
    </>
  );
}
