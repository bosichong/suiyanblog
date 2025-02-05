// MenuItem.js
import React from 'react';
import { Link } from '@nextui-org/react';


const MenuItem = ({ item, index }) => {

  return (
    <li
      key={`${item}-${index}`}
      className={'mb-4'}
    >
      <Link
        className={
          "w-full hover:motion-preset-shake flex justify-center"
        }
        href={item.href}
        size="md"
      >
        {item.name}
      </Link>
    </li>
  );
};

export default MenuItem;
