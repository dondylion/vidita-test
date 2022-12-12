import {faker} from '@faker-js/faker';
import {Documents, DocumentType, getDocumentType} from "./FakeDataTypes";

const getNumber = (min: number, max: number, precision: number) => {
    return faker.datatype.number({min, max, precision});
}

const getDocuments = () => {
    const amount: number = getNumber(10, 30, 1);
    const result: Array<DocumentType> = [];

    const getDocument: getDocumentType = (id: number) => {
        const status: boolean = faker.datatype.boolean();
        return {
            id: `${Date.now()}${id}`,
            status: status ? 'active' : 'archive',
            sum: getNumber(1, 50, 1),
            qty: getNumber(1, 50,1),
            volume: getNumber(1, 50, 1),
            name: faker.random.words(2),
            delivery_date: `${faker.date.past()}`,
            currency: faker.finance.currencySymbol(),
        };
    }

    for (let i = 0; i < amount; i++) {
        result.push(getDocument(i));
    }

    return result;
}

export function document1 () {
    const delay = getNumber(1000, 2000, 500);
    const data: Array<DocumentType> = getDocuments();
    const documentPromise: Promise<Documents> = new Promise(resolve => {
        setTimeout(() => resolve(data), delay)
    })
    return documentPromise;
}

export function document2 () {
    const delay = getNumber(1000, 2000, 500);
    const data: Array<DocumentType> = getDocuments();
    const documentPromise: Promise<Documents> = new Promise(resolve => {
        setTimeout(() => resolve(data), delay)
    })
    return documentPromise;
}
