export interface CategoryResponse {
    metadata: Metadatum[];
    data:     Datum[];
}

export interface Datum {
    id:          number;
    name:        string;
    description: string;
}

export interface Metadatum {
    date: Date;
    code: string;
    type: string;
}
