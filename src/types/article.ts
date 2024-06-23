export interface ArticleItem {
  readonly id: string;
  title: string;
  createdDate: string;
  updatedDate: string;
  type: string;
  weight: string;
  status: string;
  keyword?: string;
}

export interface Article {
  readonly id: string;
  path: string;
  title: string;
  thumbnail: string;
  content: string;
  htmlContent: string;
  description: string;
  createdDate: string;
  updatedDate: string;
  style: string;
  type: number;
  weight: number;
  status: number;
  isDraft?: boolean;
  columnIds: string[];
}
