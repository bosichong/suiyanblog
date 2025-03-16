// MenuItem.js
import React from 'react';
import { Link } from '@nextui-org/react';


const MenuItem = ({ item, index, onClick }) => {
  return (
    <li key={index}
      className={'mb-4'}
    >
      <Link
        className={
          "w-full flex justify-center transition-all duration-200 hover:translate-x-0.5"
        }
        href={item.href}
        size="md"
        onClick={onClick}
      >
        {item.name}
      </Link>
    </li>
  );
};

export default MenuItem;
