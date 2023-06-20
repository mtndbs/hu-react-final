export interface Bcard {
  _id?: string | null;
  title?: string | null;
  subTitle?: string | null;
  description?: string | null;
  phone?: string | null;
  email?: string | null;
  web?: string | null;
  image?: string | null;
  country?: string | null;
  city?: string | null;
  houseNumber?: string | null;
  zip?: string | null;
  favorite?: [] | null;
}

export interface User {
  name?: string | null;
  lastName?: string | null;
  password?: string | null;
  phone?: string | null;
  email?: string | null;
  confirmPassword?: string | null;
  image?: string | null;
  country?: string | null;
  city?: string | null;
  houseNumber?: string | null;
  zip?: string | null;
  bizChecked?: boolean | null;
  token?: string | undefined;
  biz?: boolean | null;
}
