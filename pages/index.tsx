import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Home from '../src/views/home';
import { httpGet } from '../src/utils/https';
import URLS from '../src/utils/urls';

export const getStaticProps = async () => {
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
    return { props: { donations: fomattingDonation }, revalidate: 1 };
};

export default function HomePage(props: any) {
    const { donations }: any = props;

    return (
        <div className={styles.container}>
            <Head>
                <title>Donations</title>
                <meta name="description" content="Donation App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Home donations={donations} />
        </div>
    );
}
