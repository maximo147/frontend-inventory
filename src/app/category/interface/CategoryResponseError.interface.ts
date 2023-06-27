export interface CategoryResponse400 {
    headers:    Headers;
    status:     number;
    statusText: string;
    url:        string;
    ok:         boolean;
    name:       string;
    message:    string;
    error:      Error;
}

export interface Error {
    metadata: Metadatum[];
    message:  string;
}

export interface Metadatum {
    date: Date;
    code: string;
    type: string;
}

export interface Headers {
    normalizedNames: NormalizedNames;
    lazyUpdate:      null;
}

export interface NormalizedNames {
}
