import React, { useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { DeleteOutlined, FormOutlined, EyeOutlined } from '@ant-design/icons';
import DonationModal from '../../components/donationModal';
import styles from './_home.module.css';

export default function Home(props: any) {
    const { donations } = props;
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const handleAddDonation = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
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
                    return <div>Rs.{amount || 0}</div>;
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
                                className="edit-btn"
                            >
                                <FormOutlined
                                    type="primary"
                                    className="edit-icon"
                                />
                            </Button>
                            <Button
                                type="link"
                                shape="circle"
                                className="edit-btn"
                            >
                                <EyeOutlined
                                    type="primary"
                                    className="edit-icon"
                                />
                            </Button>
                            <Popconfirm title="Sure to delete?">
                                <Button
                                    type="link"
                                    danger
                                    shape="circle"
                                    htmlType="submit"
                                    className="delete-btn"
                                >
                                    <DeleteOutlined className="delete-icon" />
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
                    <Button type="primary" onClick={handleAddDonation}>
                        Add Donation
                    </Button>
                </div>
            </div>
            <Table
                dataSource={donations || []}
                columns={columns}
                pagination={false}
            />
            {isModalVisible && (
                <DonationModal
                    isModalVisible={isModalVisible}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}
