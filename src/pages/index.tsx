import Head from 'next/head';
import Image from 'next/image';

import { Header } from '../components/Header';

import { SearchInput } from '../components/SearchInput';
import { StocksGrowth } from '../components/StocksGrowth';
import { RecentlyBrowsed } from '../components/RecentlyBrowsed';

import { FavoriteCompanies } from '../components/FavoriteCompanies';

import { Wrapper, Container, Content, PageTitle } from './styles';
import { Marquee } from '../components/Marquee';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Smart Stocks</title>
      </Head>

      <Wrapper>
        <Header />
        <Container>
          <Content>
            <PageTitle>
              <Image
                src='/images/dashboard-icon.svg'
                width={24}
                height={28}
                layout='fixed'
                alt='Dashboard'
              />
              <strong>Dashboard</strong>
            </PageTitle>

            <SearchInput />
            <Marquee />
            <StocksGrowth />
            <RecentlyBrowsed />
          </Content>
        </Container>

        <FavoriteCompanies />
      </Wrapper>
    </>
  );
}
