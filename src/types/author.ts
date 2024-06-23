export interface AuthorInfo {
  name: string;
  siteName: string;
  website: string;
  avatar: string;
  description: string;
  email: string;
  extendsParams?: Extends;
}

export interface AuthorInfoSave {
  name: string;
  siteName: string;
  website: string;
  avatar: string;
  description: string;
  email: string;
  extendsParams?: string;
}

interface Extends {
  enName: string;
  announcement: string;
  github: string;
  footer: string;
  copyright: string;
  icp: string;
  version?: string;
}

