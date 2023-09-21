'use client';

import useFunnel from '@/hooks/useFunnel';
import { FormProvider, useForm } from 'react-hook-form';
import SignUpComplete from '../complete';
import EmailForm from '../email-form';
import OptInMarketing from '../opt-in-marketing';
import PrivacyNotice from '../privacy-notice';
import Terms from '../terms';
import UserInfoForm from '../user-info-form';

export default function SignUpComponent() {
  const [Funnel, setStep] = useFunnel(
    ['terms', 'privacy-notice', 'opt-in-marketing', 'complete', 'email-form'],
    'terms'
  );

  const methods = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Funnel>
          <Funnel.Step name="terms">
            <Terms onNext={() => setStep('email-form')} />
          </Funnel.Step>
          <Funnel.Step name="privacy-notice">
            <PrivacyNotice />
          </Funnel.Step>
          <Funnel.Step name="opt-in-marketing">
            <OptInMarketing />
          </Funnel.Step>
          <Funnel.Step name="email-form">
            <EmailForm onNext={() => setStep('email-form')} />
          </Funnel.Step>
          <Funnel.Step name="user-info">
            <UserInfoForm />
          </Funnel.Step>
          <Funnel.Step name="complete">
            <SignUpComplete />
          </Funnel.Step>
        </Funnel>
      </form>
    </FormProvider>
  );
}
