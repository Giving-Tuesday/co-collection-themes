import type { Dispatch, ElementType, SetStateAction } from 'react';

export interface Item {
  _id?: string;
  _collection: string;
  published: boolean;
  visibility: 'public' | 'tracked' | 'private';
  title: string;
  author?: string[];
  desc?: string;
  resource_url?: string;
  slug: string;
  custom_fields: Record<string, any>;
  page_views?: number;
}

export interface CardProps {
  CustomLink?: ElementType | undefined;
  href: string;
  item: Item;
  setItem?: () => void | undefined;
  showYear?: boolean;
}
