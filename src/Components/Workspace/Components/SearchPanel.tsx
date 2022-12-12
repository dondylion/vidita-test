import React from "react";
import {Button, Col, Form, Input, Row, Select} from "antd";
import {SearchProps} from "../WorkspaceTypes";

export default function SearchPanel(props: SearchProps) {
    const [form] = Form.useForm();

    const onClear = () => {
        form.resetFields();
        props.onClear();
    }

    return (
        <Form
            layout='vertical'
            onFinish={props.onFinish}
            form={form}
        >
            <Row gutter={[16, 0]}>
                <Col span={8}>
                    <Form.Item
                        key='name'
                        name='name'
                        label='Название'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        key='status'
                        name='status'
                        label='Статус'
                    >
                        <Select
                            allowClear
                            options={[
                                {label: 'Активен', value: 'active'},
                                {label: 'В архиве', value: 'archive'},
                            ]}
                        />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        key='sum'
                        name='sum'
                        label='Сумма'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        key='qty'
                        name='qty'
                        label='Количество'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        key='volume'
                        name='volume'
                        label='Объём'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        key='delivery_date'
                        name='delivery_date'
                        label='Дата доставки'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        key='currency'
                        name='currency'
                        label='Валюта'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        key='total'
                        name='total'
                        label='Всего'
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <div style={{width: '100%', height: '100%', position: 'relative'}}>
                        <div style={{position: 'absolute', bottom: 0, right: 0}}>
                            <Button onClick={onClear} style={{marginRight: '20px'}}>
                                Сбросить
                            </Button>
                            <Button type='primary' htmlType='submit'>
                                Поиск
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}