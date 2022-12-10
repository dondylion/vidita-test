export declare type DocumentType = {
    id: string,
    status: 'active' | 'archive',
    sum: number,
    qty: number,
    volume: number,
    name: string,
    delivery_date: string,
    currency: string
}

export declare type getDocumentType = ()=>DocumentType;