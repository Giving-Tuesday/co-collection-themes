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
