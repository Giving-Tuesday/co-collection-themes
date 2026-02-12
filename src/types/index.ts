import type { ElementType } from 'react';

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

interface CommonCardProps {
  item: Item;
  showYear?: boolean;
}

interface ActionCardProps extends CommonCardProps {
  setItem: () => void;
  href?: never;
  CustomLink?: never;
}

interface CustomLinkCardProps extends CommonCardProps {
  CustomLink: ElementType;
  href: string;
  setItem?: never;
}

interface StandardLinkCardProps extends CommonCardProps {
  href: string;
  CustomLink?: never;
  setItem?: never;
}

export type CardProps = ActionCardProps | CustomLinkCardProps | StandardLinkCardProps;

export interface ItemPageProps {
  item: Item;
  inModal?: boolean;
}
