export type MeasurementUnitsType = 'Grams' | 'Pieces' | 'Milliliters';

export interface ProductModel {
  id: string;
  name: string;
  count: number;
  price: number;
  buyWhere: string;
  dateCreate: Date;
  date: Date;
  totalPrice: number;
  replacement: string;
  measurementUnits?: MeasurementUnitsType;
  bought: boolean;
}

export const MeasurementUnits: Record<MeasurementUnitsType, string> = {
  Grams: 'гр',
  Pieces: 'шт',
  Milliliters: 'мл',
};
