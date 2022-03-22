export interface ProductModel{
    id: string,
    name: string,
    count:number,
    measurementUnits: MeasurementUnits,
    price: number,
    buyWhere: string,
    replacement: string,
    createDate: string,
}

export enum MeasurementUnits {
    Grams = 'Грамм',
    Pieces = "Штук",
    Milliliters = "Миллитр"
}