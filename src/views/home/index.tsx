import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, Form } from 'antd';
import { DeleteOutlined, FormOutlined, EyeOutlined } from '@ant-design/icons';
import DonationModal from '../../components/donationModal';
import styles from './_home.module.css';
import { MODE } from '../../constants/modes';
import { httpGet, httpPost, httpPut, httpDelete } from '../../utils/https';
import URLS from '../../utils/urls';

export default function Home(props: any) {
    let { donations } = props;
    const [donationsList, setDonationsList] = useState<[]>(donations || []);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [modeType, setModeType] = useState<string>('');
    const [form] = Form.useForm();

    const handleModal = ({ mode, data }: { mode: string; data?: any }) => {
        if (mode === MODE.EDIT || mode === MODE.VIEW) {
            fillFormData({ mode, data });
        } else {
            form.resetFields();
            setModeType(mode);
            setIsModalVisible(true);
        }
    };

    const fillFormData = ({ mode, data }: { mode: string; data: any }) => {
        if (Object.entries(data) && Object.entries(data).length > 0) {
            Object.entries(data).forEach(([key, value]: any) => {
                form.setFieldsValue({
                    [key]: value,
                });
            });
        }
        setModeType(mode);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const fetchDonations = async () => {
        let donationsData: any = await httpGet(URLS.DONATION.GET_DONATION_LIST);
        const fomattingDonation =
            (donationsData &&
                donationsData.data &&
                donationsData.data.length > 0 &&
                donationsData.data.map((donation: any) => {
                    return {
                        ...donation,
                        key: donation.id,
                    };
                })) ||
            [];
        setDonationsList(fomattingDonation);
    };

    const resetData = () => {
        form.resetFields();
        setModeType('');
        setIsModalVisible(false);
    };

    const addDonation = () => {
        form.submit();
        form.validateFields()
            .then(async (data: any) => {
                const donationParams = {
                    amount: parseInt(data?.amount) || 0,
                    tip: data?.tip || 0,
                    userId: data?.userId || 0,
                };
                setIsAdding(true);
                httpPost(URLS.DONATION.ADD_DONATION, donationParams)
                    .then((res) => {
                        resetData();
                        fetchDonations();
                        setIsAdding(false);
                    })
                    .catch((err) => {
                        setIsAdding(false);
                    });
            })
            .catch((err) => {});
    };

    const updateDonation = () => {
        form.submit();
        form.validateFields()
            .then(async (data: any) => {
                const donationParams = {
                    amount: parseInt(data?.amount) || 0,
                    tip: data?.tip || 0,
                    userId: data?.userId || 0,
                };
                setIsUpdating(true);
                const url = URLS.DONATION.EDIT_DONATION.replace(
                    '#DONATION_ID#',
                    data?.id
                );
                httpPut(url, donationParams)
                    .then((res) => {
                        resetData();
                        fetchDonations();
                        setIsUpdating(false);
                    })
                    .catch((err) => {
                        setIsUpdating(false);
                    });
            })
            .catch((err) => {});
    };

    const deleteDonation = (id: string) => {
        const url = URLS.DONATION.DELETE_DONATION.replace('#DONATION_ID#', id);
        httpDelete(url)
            .then((res) => {
                fetchDonations();
                setIsDeleting(false);
            })
            .catch((err) => {
                setIsDeleting(false);
            });
    };

    const columns = [
        {
            title: 'User Email',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: 'Donation id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Donation amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: string, data: any) => {
                return (function Actions() {
                    return <div>$ {amount || 0}</div>;
                })();
            },
        },
        {
            title: 'Donation tip',
            dataIndex: 'tip',
            key: 'tip',
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: 'action',
            render: (id: string, data: any) => {
                return (function Actions() {
                    return (
                        <div>
                            <Button
                                type="link"
                                shape="circle"
                                onClick={() =>
                                    handleModal({ mode: MODE.EDIT, data })
                                }
                            >
                                <FormOutlined type="primary" />
                            </Button>
                            <Button
                                type="link"
                                shape="circle"
                                onClick={() =>
                                    handleModal({ mode: MODE.VIEW, data })
                                }
                            >
                                <EyeOutlined type="primary" />
                            </Button>
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => deleteDonation(id)}
                            >
                                <Button
                                    type="link"
                                    danger
                                    shape="circle"
                                    htmlType="submit"
                                >
                                    <DeleteOutlined />
                                </Button>
                            </Popconfirm>
                        </div>
                    );
                })();
            },
        },
    ];

    return (
        <div className={styles['home']}>
            <div className={styles['header']}>
                <div className={styles['heading']}>
                    <h1 className={styles['title']}>Donations</h1>
                    <Button
                        type="primary"
                        onClick={() => handleModal({ mode: MODE.ADD })}
                    >
                        Add Donation
                    </Button>
                </div>
            </div>
            <Table
                dataSource={donationsList || []}
                columns={columns}
                pagination={false}
            />
            {isModalVisible && (
                <DonationModal
                    form={form}
                    isModalVisible={isModalVisible}
                    modeType={modeType}
                    closeModal={closeModal}
                    addDonation={addDonation}
                    isAdding={isAdding}
                    updateDonation={updateDonation}
                    isUpdating={isUpdating}
                />
            )}
        </div>
    );
}
