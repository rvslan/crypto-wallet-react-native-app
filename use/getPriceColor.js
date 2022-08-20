import { COLORS } from '../constants';

export function getPriceColor(price) {
  if (price == 0) {
    return COLORS.lightGray3;
  }

  if (price > 0) {
    return COLORS.lightGreen;
  }

  return COLORS.red;
}
