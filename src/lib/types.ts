export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  featured?: boolean;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
}
