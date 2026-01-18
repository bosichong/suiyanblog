import React from 'react';
import Link from 'next/link';
import { MenuItemProps } from '../types';

const MenuItem = ({ item, index, onClick }: MenuItemProps & { onClick?: () => void }) => {
  return (
    <li key={index}
      className={'mb-4'}
    >
      <Link
        className={
          "rainbow_hover w-full flex justify-center transition-all duration-200 hover:translate-x-1 "
        }
        href={item.href}
        onClick={onClick}
      >
        {item.name}
      </Link>
    </li>
  );
};

export default MenuItem;