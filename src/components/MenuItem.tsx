import React from 'react';
import { MenuItemProps } from '../types';

const MenuItem = ({ item }: MenuItemProps) => {
    return (
        <a
            href={item.href}
            className="text-text-secondary hover:text-text-dark hover:underline no-underline"
        >
            {item.name}
        </a>
    );
};

export default MenuItem;