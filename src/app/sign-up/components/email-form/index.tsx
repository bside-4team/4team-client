import DefaultButton from '@/components/Button/DefaultButton';
// import Header from '@/components/Header';
import BottomButtonContainer from '@/components/Button/BottomButtonContainer';
import CHeader from '@/components/c-header';
import TextInput from '@/components/Input/TextInput';
import { emailRegex } from '@/constants';
import { useFormContext } from 'react-hook-form';
import useAccountAuthCodeMutate from '../../hooks/query/useAccountAuthCodeMutate';

interface Props {
  onNext: () => void;
  setEmailAuthId: (value: number) => void;
}

export default function EmailForm({ onNext, setEmailAuthId }: Props) {
  const {
    register,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useFormContext<{
    account: {
      identification: string;
    };
  }>();

  const { mutate: accountAuthCodeMutate } = useAccountAuthCodeMutate({ onNext, setEmailAuthId, category: 'account' });

  const onEmailAuthRequest = () => {
    accountAuthCodeMutate({ identification: getValues('account.identification'), type: 'email', category: 'account' });
  };

  return (
    <>
      <CHeader title="회원가입" />
      <div className="mx-xl mb-20 mt-xl">
        <header>
          <h1 className="title2 font-bold">
            아이디로 사용할 <br /> 이메일 주소를 입력해 주세요. ✍️
          </h1>
          <p className="body2 mt-3 text-neutral-bg80">
            입력하신 이메일 주소는 로그인과 비밀번호 재설정, 중요한 소식 전달에 사용됩니다. 정확한 이메일 주소를 입력해
            주세요.
          </p>
        </header>

        <section className="mt-12">
          <TextInput
            type="text"
            label="이메일 주소"
            placeholder="example@tastetionary.com"
            errorMsg={errors.account?.identification ? '이메일 형식이 맞지 않습니다.' : undefined}
            {...register('account.identification', { required: true, pattern: emailRegex })}
          />
        </section>
      </div>

      <BottomButtonContainer>
        <DefaultButton
          bgColor="yellow"
          customStyle="flex w-full py-[12px] px-[16px]"
          disabled={!isDirty || !isValid}
          onClick={onEmailAuthRequest}
          type="button"
        >
          <span className="font-pretendard text-white">다음</span>
        </DefaultButton>
      </BottomButtonContainer>
    </>
  );
}
