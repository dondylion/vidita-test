import React, {useState} from 'react';
import {Button, PageHeader, Popconfirm, Spin, Table, Tag} from "antd";
import moment from "moment";
import {DocumentTableProps} from "../WorkspaceTypes";
import {Documents, DocumentType} from "../../FakeData/FakeDataTypes";
import SearchPanel from "./SearchPanel";
import {ColumnsType} from "antd/es/table";

export default function DocumentTable(props: DocumentTableProps) {
    const [selected, setSelected] = useState<Documents>([]);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [namesList, setNamesList] = useState<Array<string>>([]);
    const columns: ColumnsType<DocumentType> = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: '20%'
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: '10%',
            render: (item: string) => {
                return (
                    <Tag color={item === 'active' ? 'green' : 'red'}>
                        {item === 'active' ? 'Активен' : 'В архиве'}
                    </Tag>);
            }
        },
        {
            title: 'Сумма',
            dataIndex: 'sum',
            key: 'sum',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Количество',
            dataIndex: 'qty',
            key: 'qty',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Объём',
            dataIndex: 'volume',
            key: 'volume',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Дата доставки',
            dataIndex: 'delivery_date',
            key: 'delivery_date',
            align: 'center',
            width: '15%',
            render: (item: string) => {
                return moment(item).format('DD.MM.YYYY');
            },
            sorter: (a: DocumentType, b: DocumentType) => {
                return moment(a.delivery_date).valueOf() - moment(b.delivery_date).valueOf();
            },
            sortDirections: ['ascend', 'descend'],
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Валюта',
            dataIndex: 'currency',
            key: 'currency',
            align: 'center',
            width: '10%',
        },
        {
            title: 'Всего',
            dataIndex: 'sum',
            key: 'total',
            align: 'center',
            width: '15%',
            render: (item: number, record: DocumentType) => {
                return `${item + record.qty} ${record.currency}`;
            }
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Documents) => {
            const names: Array<string> = [];
            selectedRows.map((item) => names.push(item.name));
            setSelected(selectedRows);
            setSelectedKeys(selectedRowKeys)
            setNamesList(names);
        },
        selectedRowKeys: selectedKeys,
    };
    const tableFooter = () => {
        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{marginLeft: '10px'}}>
                        {`Общий объём: ${props.totalVolume}`}
                    </div>
                    <div style={{marginLeft: '30px'}}>
                        {`Общее количество: ${props.totalQuantity}`}
                    </div>
                </div>
                <div>
                    <Popconfirm
                        title={`Вы уверены, что хотите аннулировать товары ${namesList.join(', ')}?`}
                        okText='Применить'
                        cancelText='Отклонить'
                        onConfirm={() => {
                            props.postCancel(selected);
                            setSelectedKeys([]);
                            setSelected([]);
                        }}
                    >
                        <Button
                            danger
                            disabled={selected.length === 0}
                        >
                            Аннулировать
                        </Button>
                    </Popconfirm>
                </div>
            </div>
        );
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh'}}>
            <div>
                <PageHeader>
                    <SearchPanel onFinish={props.onFinishSearch} onClear={props.onClearSearch}/>
                </PageHeader>
                <Table
                    dataSource={props.content}
                    pagination={false}
                    bordered
                    columns={columns}
                    size='small'
                    rowKey={(record) => record.id}
                    rowSelection={{...rowSelection}}
                    scroll={{y: '65vh'}}
                    loading={props.tableLoading}
                />
            </div>
            <footer style={{padding: '10px', backgroundColor: '#fafafa'}}>{tableFooter()}</footer>
        </div>
    )
}