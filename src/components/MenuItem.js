// MenuItem.js
import React from 'react';
import { Link } from '@nextui-org/react';


const MenuItem = ({ item, index, randomIndex }) => {

  return (
    <li
      key={`${item}-${index}`}
      className={'mb-4'}
    >
      <Link
        className={
          index === randomIndex
            ? "w-full motion-preset-seesaw hover:animate-none flex justify-center"
            : "w-full hover:motion-preset-shake flex justify-center"
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
