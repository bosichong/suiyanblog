// 博客文章数据类型
export interface Post {
  id: string;
  title?: string;
  time?: string;
  date?: string;
  tags?: string[];
  description?: string;
  content?: string;
  ai_label?: number;
  type?: string;
  preview?: string;
  [key: string]: any;
}

// 配置文件类型
export interface Config {
  BLOG_NAME: string;
  BLOG_NAME_EN: string;
  BLOG_AUTHOR: string;
  BLOG_DESCRIPTION_EN: string;
  ABOUT_ME: string;
  POSTS_PER_PAGE: number;
  META_DESCRIPTION: string;
  META_KEYWORDS: string;
  PROFILE_IMAGE: string;
  FRIENDS_PAGE_TITLE: string;
  FRIENDS_PAGE_DESCRIPTION: string;
  BLOG_AGGREGATION_TITLE: string;
  BLOG_AGGREGATION_DESCRIPTION: string;
  menuItems: MenuItem[];
  links: Link[];
  blogAggregations: BlogAggregation[];
  snsLinks: SnsLink[];
}

// 菜单项类型
export interface MenuItem {
  name: string;
  href: string;
  iconComponent?: string;
}

// 友情链接类型
export interface Link {
  site_name: string;
  site_url: string;
  site_description: string;
  site_avatar: string;
  is_active?: boolean;
}

// 博客聚合类型
export interface BlogAggregation {
  site_name: string;
  site_url: string;
  site_description: string;
}

// SNS链接类型
export interface SnsLink {
  name: string;
  url: string;
  iconComponent: string;
}

// Giscus配置类型
export interface GiscusConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  strict: string;
  theme: string;
  lang: string;
}

// 组件Props类型
export interface LayoutProps {
  children: React.ReactNode;
}

export interface PostCardProps {
  post: Post;
}

export interface PaginationProps {
  total: number;
  initialPage: number;
  onChange: (page: number) => void;
}