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
          "w-full flex justify-center"
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
