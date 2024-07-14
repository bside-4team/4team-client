import IC_DINNER from '@/assets/common/dinner.svg';
import IC_EXCEPT from '@/assets/common/except.svg';
import IC_REFRESH from '@/assets/common/refresh_default.svg';
import { ButtonHTMLAttributes, useState } from 'react';

interface RefreshButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
  iconType?: 'refresh' | 'except' | 'dinner';
}

export default function RefreshButton({ btnText, iconType = 'refresh', ...rest }: RefreshButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      {...rest}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      className={`cursor-${rest.disabled ? 'not-allowed' : 'pointer'} mx-auto mb-18 mt-24 flex w-full max-w-[166px] items-center justify-center gap-2.5 p-3 opacity-${rest.disabled ? '40' : '100'}`}
    >
      {iconType === 'except' ? <IC_EXCEPT /> : iconType === 'dinner' ? <IC_DINNER /> : <IC_REFRESH />}

      <span className={`text-14 font-normal ${isClicked ? 'text-secondary-o50' : ''}`}>{btnText}</span>
    </button>
  );
}
