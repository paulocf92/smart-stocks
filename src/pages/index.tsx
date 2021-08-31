import Head from 'next/head';
import Image from 'next/image';
import { RecentlyBrowsed } from '../components/RecentlyBrowsed';

import { SearchInput } from '../components/SearchInput';
import { StocksGrowth } from '../components/StocksGrowth';
import { FavoriteCompanies } from '../components/FavoriteCompanies';

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

          <StocksGrowth />

          <RecentlyBrowsed />
        </div>
      </main>

      <FavoriteCompanies />
    </>
  );
}
