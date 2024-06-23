export interface HomeStatistics {
  readonly columnsTotal: number;
  articles: ArticleStatistics;
  views: ViewStatistics;
  yesterdayViews: ViewStatistics;
}

interface ArticleStatistics {
  readonly publish: number;
  readonly total: number;
}

interface ViewStatistics {
  readonly pv: number;
  readonly uv: number;
}
