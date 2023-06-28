export interface ProductResponse {
    metadata: Metadatum[];
    data:     Datum[];
}

export interface Datum {
    id:       number;
    name:     string;
    price:    number;
    quantity: number;
    picture:  null | string;
    category: Category;
}

export interface Category {
    id:          number;
    name:        string;
    description: string;
}

export interface Metadatum {
    date: Date;
    code: string;
    type: string;
}
