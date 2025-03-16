import React from 'react';
import {Link, Image} from "@nextui-org/react";

const FriendCard = ({ link }) => {
  return (
    <div 
      key={link.site_name} 
      className="group rounded-xl p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-primary-50 dark:hover:bg-primary-900/20 dark:bg-default-50"
    >
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={link.site_avatar}
          alt={link.site_name}
          className="h-24 w-24 rounded-full object-cover shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-110 group-hover:rotate-3"
        />
        <h3 className="text-xl font-semibold text-foreground transition-all duration-300 group-hover:text-primary">
          <Link href={link.site_url} color="primary">
            {link.site_name}
          </Link>
        </h3>
        <p className="text-center text-sm leading-relaxed text-default-600 line-clamp-3 transition-all duration-300 group-hover:text-default-800 dark:group-hover:text-default-400">
          {link.site_description}
        </p>
        <Link
          href={link.site_url}
          color="primary"
          className="mt-2 transition-all duration-200 hover:translate-x-1 group-hover:font-medium"
          underline="hover"
        >
          <span className="flex items-center gap-1 text-sm">
            访问博客
            <span className="i-mdi-arrow-right-thin transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;