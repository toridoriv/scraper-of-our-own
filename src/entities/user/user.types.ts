export type UserProps = UserPropsRequired & Required<UserPropsOptional>;

export type UserPropsRequired = {
  id: number;
  username: string;
};

export type UserPropsOptional = Partial<{
  bio: string;
  bookmarks: number[];
  collections: string[];
  created_at: Date | string;
  email: string;
  gifts: number[];
  pseuds: string[];
  series: number[];
  works: number[];
}>;
