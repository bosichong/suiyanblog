import React from 'react';
import { MenuItemProps } from '../types';
import RainbowLink from './RainbowLink';

const MenuItem = ({ item, index, onClick }: MenuItemProps & { onClick?: () => void }) => {
  return (
    <RainbowLink
      href={item.href}
      className="w-full flex justify-center transition-all duration-200 px-4 py-2"
      onClick={onClick}
    >
      {item.name}
    </RainbowLink>
  );
};

export default MenuItem;