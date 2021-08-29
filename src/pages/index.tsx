import Head from 'next/head';
import Image from 'next/image';

import { SearchInput } from '../components/SearchInput';

import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Smart Stocks</title>
      </Head>

      <main className={styles.mainContainer}>
        <div className={styles.mainContent}>
          <div className={styles.titleContainer}>
            <Image
              src='/images/dashboard-icon.svg'
              width={24}
              height={28}
              layout='fixed'
              alt='Dashboard'
            />
            <strong>Dashboard</strong>
          </div>

          <SearchInput />
        </div>
      </main>
    </>
  );
}
