import React, {useEffect, useState} from "react";
import {cancel, document1, document2} from "../FakeData/FakeData";
import {notification, Spin} from "antd";
import {Documents, DocumentType} from "../FakeData/FakeDataTypes";
import DocumentTable from "./Components/DocumentTable";
import {SearchValues} from "./WorkspaceTypes";
import moment from "moment";

export default function Workspace () {
    const [loading, setLoading] = useState<boolean>(false);
    const [tableLoading, setTableLoading] = useState<boolean>(false);
    const [documents, setDocuments] = useState<Documents | null>(null);
    const [searchResult, setSearchResult] = useState<Documents | null>(null);
    const [totalVolume, setTotalVolume] = useState<number>(0);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);

    const formatDate = (date: string | number) => moment(date).format('DD.MM.YYYY');

    const getData = () => {
        setLoading(true);
        Promise.all([document1(), document2()])
            .then((res) => {
                const content: Documents = [...res[0], ...res[1]];
                let volume: number = 0;
                let quantity: number = 0;
                content.map((item) => {
                    volume += item.volume;
                    quantity += item.qty;
                });
                setDocuments(content);
                setSearchResult(content);
                setTotalVolume(volume);
                setTotalQuantity(quantity);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    }

    const postCancel = (values: Documents) => {
        setTableLoading(true);
        cancel(values)
            .then((res) => {
                notification['success']({
                    message: res,
                })
                setTableLoading(false);
            })
            .catch(() => {
                setTableLoading(false);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const onFinishSearch = (values: SearchValues) => {
        setTableLoading(true);
        const searchKeys: Array<string> = [];
        for (let key in values) {
            if (values[key as keyof SearchValues]) searchKeys.push(key);
        }
        if (searchKeys.length > 0) {
            let result: Documents = documents ? documents : [];
            searchKeys.map((key) => {
                if (values && values[key as keyof SearchValues] && documents) {
                    result = result.filter((item) => {
                        if (key === 'delivery_date') {
                            return formatDate(item[key as keyof DocumentType]) ===
                                formatDate(values[key as keyof SearchValues]);
                        } else if (key === 'sum' || key === 'qty' || key === 'volume') {
                            return item[key as keyof DocumentType] ===
                                values[key as keyof SearchValues];
                        } else if (key === 'total') {
                            return `${item['sum'] + item['qty']} ${item.currency}`
                                .includes(values[key as keyof SearchValues].toString().trim());
                        } else {
                            return item[key as keyof DocumentType].toString().toUpperCase()
                                .includes(values[key as keyof SearchValues].toString().toUpperCase().trim());
                        }
                    })
                }
            });
            setSearchResult(result);
        } else {
            setSearchResult(documents);
        }

        setTableLoading(false);
    }

    const onClearSearch = () => {
        setLoading(true);
        setSearchResult(documents);
        setLoading(false);
    }

    return (
        <div style={{height: '100vh'}}>
            {loading &&
                <div className='loader'>
                    <Spin spinning={loading} size='large' tip='Генерируем данные...'/>
                </div>
            }
            {!loading && searchResult &&
                <DocumentTable
                    content={searchResult}
                    onFinishSearch={onFinishSearch}
                    onClearSearch={onClearSearch}
                    totalVolume={totalVolume}
                    totalQuantity={totalQuantity}
                    postCancel={postCancel}
                    tableLoading={tableLoading}
                />
            }
        </div>
    );
}