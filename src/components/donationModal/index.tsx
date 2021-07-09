import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Select, Input, Button } from 'antd';
import { MODE } from '../../constants/modes';
import URLS from '../../utils/urls';
import { httpGet } from '../../utils/https';

const Option = Select;

function DonationModal(props: any) {
    const {
        isModalVisible,
        closeModal,
        modeType,
        form,
        addDonation,
        isAdding,
        updateDonation,
        isUpdating,
    }: any = props;
    const [userList, setUserList] = useState<[]>([]);
    const [isUserFetching, setIsUserFetching] = useState<boolean>(false);
    const [validateFieldsName, setValidateFieldsName] = useState<string[]>([]);
    const isDisabled = isAdding || isUpdating;
    const isViewMode = modeType === MODE.VIEW;

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

    const handleValidateFieldNames = (name: string) => {
        const isFieldName = validateFieldsName.find(
            (fieldName) => fieldName === name
        );
        if (isFieldName) return 'onChange';
        return 'onBlur';
    };

    const cancelButton = (
        <Button key="cancel" disabled={isDisabled} onClick={closeModal}>
            Cancel
        </Button>
    );

    let modalTitle = 'Add Donation';
    let modalfooterButtons = [
        cancelButton,
        <Button
            key="add"
            disabled={isDisabled}
            type="primary"
            onClick={addDonation}
        >
            {isAdding ? 'Save...' : 'Save'}
        </Button>,
    ];

    if (modeType === MODE.EDIT) {
        modalTitle = 'Edit Donation';
        modalfooterButtons = [
            cancelButton,
            <Button
                key="add"
                disabled={isDisabled}
                type="primary"
                onClick={updateDonation}
            >
                {isUpdating ? 'Save...' : 'Save'}
            </Button>,
        ];
    }
    if (modeType === MODE.VIEW) {
        modalTitle = 'View Donation';
        modalfooterButtons = [
            <Button key="close" disabled={isDisabled} onClick={closeModal}>
                Close
            </Button>,
        ];
    }
    return (
        <Modal
            title={modalTitle}
            visible={isModalVisible}
            footer={modalfooterButtons}
            onCancel={() => !isDisabled && closeModal()}
            maskClosable={false}
            forceRender={true}
        >
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Form.Item name="id" hidden={true}>
                        <Input type="text" />
                    </Form.Item>
                    <Col className="gutter-row" xs={24} sm={12} md={12}>
                        <Form.Item
                            name="userId"
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
                                disabled={isViewMode}
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
                    <Col className="gutter-row" xs={24} sm={12} md={12}>
                        <Form.Item
                            name="amount"
                            label="Amount"
                            validateTrigger={handleValidateFieldNames('amount')}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter amount!',
                                },
                                {
                                    validator(_, value) {
                                        if (value && value <= 0) {
                                            return Promise.reject(
                                                'Please enter valid amount'
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input
                                disabled={isViewMode}
                                type="number"
                                placeholder="Amount"
                                onBlur={() =>
                                    setValidateFieldsName([
                                        ...validateFieldsName,
                                        'amount',
                                    ])
                                }
                            />
                        </Form.Item>{' '}
                    </Col>
                    <Col className="gutter-row" xs={24} sm={12} md={24}>
                        <Form.Item name="tip" label="Tip">
                            <Input.TextArea
                                disabled={isViewMode}
                                rows={4}
                                placeholder="Please enter tip, if any"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default DonationModal;
