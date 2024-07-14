import { ButtonHTMLAttributes } from 'react';

export interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
}

export default function MainButton({ btnText, ...rest }: MainButtonProps) {
  return (
    <button
      {...rest}
      className={`flex h-60 w-full items-center justify-center bg-contain bg-center bg-no-repeat text-lg font-normal text-white
    ${rest.disabled ? 'text-yellow-300 bg-[url("/image/Button/Main_Button_disabled.svg")]' : 'bg-[url("/image/Button/Main_Button_default.svg")] text-white'}
    ${!rest.disabled && 'active:bg-[url("/image/Button/Main_Button_pressed.svg")]'}`}
    >
      {btnText}
    </button>
  );
}
