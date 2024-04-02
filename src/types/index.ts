export type AuthType = {
  email: string;
  accessToken: string;
};

export type ProductType = {
  id: number;
  name: string;
  alias: string;
  price: number;
  description: string;
  size: string[];
  shortDescription: string;
  quantity: number;
  deleted: boolean;
  categories: CategoryType[];
  feature: boolean;
  image: string;
};

export type ProductDetailType = {
  id: number;
  name: string;
  alias: string;
  price: number;
  description: string;
  size: string[];
  shortDescription: string;
  quantity: number;
  categories: CategoryType[];
  image: string;
  relatedProducts: ProductType[];
};

type CategoryType = {
  id: string;
  category: string;
};

export type ProfileType = {
  ordersHistory: {
    orderDetail: {
      name: string;
      alias: string;
      shortDescription: string;
      quantity: number;
      price: number;
      image: string;
      description: string;
    }[];
    id: number;
    date: Date;
    status: null;
    email: string;
    alias: string;
  }[];
  email: string;
  name: string;
  password: null;
  gender: boolean;
  phone: string;
  facebookId: string;
  deleted: boolean;
  avatar: string;
  image: string;
};
