import { DiscountItemType } from '@shared/types';

export type DiscountsState = {
  discounts: DiscountsType[];
  newDiscounts: DiscountsType | null;
};

export type DiscountsType = {
  id: number;
  name: string;
  data: DiscountItemType[];
};
