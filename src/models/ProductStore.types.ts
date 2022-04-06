export type MeasurementUnitsType = 'Grams' | 'Pieces' | 'Milliliters';

export interface ProductModel {
  id: string;
  name: string;
  count: number;
  price: number;
  buyWhere: string;
  date: string;
  replacement: string;
  measurementUnits: MeasurementUnitsType;
}

export const MeasurementUnits: Record<MeasurementUnitsType, string> = {
  Grams: 'Грамм',
  Pieces: 'Штук',
  Milliliters: 'Миллилитр',
};
