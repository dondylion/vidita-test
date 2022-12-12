import React, {Key, RefObject} from "react";
import {Documents, DocumentType} from "../FakeData/FakeDataTypes";
import type {InputRef} from 'antd';

export declare type LayoutProps = {
    children: React.ReactNode;
}

export declare type DocumentTableProps = {
    content: Documents;
    onFinishSearch: (values: SearchValues) => void;
    onClearSearch: () => void;
    totalVolume: number;
    totalQuantity: number;
}

export declare type SearchProps = {
    onFinish: (values: SearchValues) => void;
    onClear: () => void;
}

export declare type SearchValues = {
    status: 'active' | 'archive',
    sum: number,
    qty: number,
    volume: number,
    name: string,
    delivery_date: string,
    currency: string,
    total: string
}