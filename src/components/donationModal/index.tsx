import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Select } from 'antd';
import { MODE } from '../../constants/modes';
import URLS from '../../utils/urls';
import { httpGet } from '../../utils/https';

const Option = Select;

function DonationModal(props: any) {
    const { isModalVisible, closeModal }: any = props;
    const [userList, setUserList] = useState<[]>([]);
    const [isUserFetching, setIsUserFetching] = useState<boolean>(false);

    useEffect(() => {
        setIsUserFetching(true);
        httpGet(URLS.USER.GET_USERS)
            .then((res) => {
                setUserList(res?.data || []);
                setIsUserFetching(false);
            })
            .catch(() => {
                setIsUserFetching(false);
            });
    }, []);

    return (
        <Modal visible={isModalVisible} onCancel={closeModal}>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col className="gutter-row" xs={24} sm={12} md={8}>
                        <Form.Item
                            name="type"
                            label="Select User"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Select Expense Type!',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select User"
                                // onChange={(typeName: string) =>
                                //     setSelectedExpenseType(typeName)
                                // }
                                // disabled={isDisabled}
                            >
                                {!isUserFetching &&
                                    userList &&
                                    userList.length > 0 &&
                                    userList.map((data, i) => {
                                        const { firstName, id } = data || {};
                                        return (
                                            <Option value={id} key={i}>
                                                {firstName}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default DonationModal;
