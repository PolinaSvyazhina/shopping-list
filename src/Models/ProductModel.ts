export interface ProductModel {
  id: string;
  name: string;
  count: string;
  measurementUnits: MeasurementUnits;
  price: string;
  buyWhere: string;
  replacement: string;
  createDate: string;
}

export enum MeasurementUnits {
  Grams = 'Грамм',
  Pieces = 'Штук',
  Milliliters = 'Миллилитр',
}
