export interface ProductRequestSave {
    name:     string;
    price:    number;
    quantity: number;
    picture:  null | string;
    category: Category;
}

export interface ProductRequestUpdate {
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