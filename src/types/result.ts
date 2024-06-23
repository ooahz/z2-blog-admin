export interface Result<T> {
  readonly state: string;
  readonly code: string;
  readonly message: string;
  readonly data: T;
}

export interface ResultList<T> extends Result<T[]> {
  readonly page: Page;
}

export interface Page {
  readonly total: string;
  readonly count: number;
  readonly size: number;
  readonly pagination: number;
}
