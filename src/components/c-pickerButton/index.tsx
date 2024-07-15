'use client';

import { useState } from 'react';
import HorizontalLayout from '../layout/horizontal-layout';

interface Props {
  title: string;
  desc: string;
  subject: 'menu' | 'restaurant';
  clickEvent?: () => void;
}

const getBackgroundClass = (subject: 'menu' | 'restaurant', active = false) => {
  if (subject === 'menu') {
    return active ? 'bg-menu_gradient_active' : 'bg-menu_gradient';
  }
  return active ? 'bg-restaurant_gradient_active' : 'bg-restaurant_gradient';
};

const getIcon = (subject: 'menu' | 'restaurant', active = false) => {
  if (subject === 'menu') {
    return active ? '/image/PickerButton/menu_pressed_icon.svg' : '/image/PickerButton/menu_icon.svg';
  }
  return active ? '/image/PickerButton/restaurant_pressed_icon.svg' : '/image/PickerButton/restaurant_icon.svg';
};

export default function CPickerButton({ title, desc, subject, clickEvent }: Props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className={`w-full p-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] ${getBackgroundClass(subject, isActive)}`}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onClick={() => {
        if (clickEvent) clickEvent();
      }}
    >
      <HorizontalLayout subject={subject}>
        <div className="h-20 w-full" />
        <div className="flex flex-col items-center pt-12">
          <div
            className="h-72 w-72"
            style={{ backgroundImage: `url(${getIcon(subject, isActive)})`, backgroundSize: 'cover' }}
          ></div>
          <p className="text-shadow-white-outline text-20 font-normal">{title}</p>
          <p className={`pb-17 pt-19 text-14 ${subject === 'menu' ? 'text-secondary-o30' : 'text-primary-y50'}`}>
            {desc}
          </p>
        </div>
      </HorizontalLayout>
    </button>
  );
}
