import Image from 'next/image';
import { FormEvent, useState } from 'react';

import styles from './styles.module.scss';

import { Card, Company } from '../Card';

const data: Company[] = [
  {
    id: '0',
    ticker: 'FB',
    name: 'Facebook',
    valuation: '+2.3%',
    delta: 'rise',
  },
  {
    id: '1',
    ticker: 'AAPL',
    name: 'Apple',
    valuation: '-0.12%',
    delta: 'fall',
  },
  {
    id: '2',
    ticker: 'ADBE',
    name: 'Adobe',
    valuation: '+0.1%',
    delta: 'rise',
  },
];

interface FavoriteCompaniesProps {
  items?: Company[];
}

export function FavoriteCompanies({ items = data }: FavoriteCompaniesProps) {
  return (
    <aside className={styles.favoriteContainer}>
      <div className={styles.userInfo}>
        <Image
          src='/images/avatar.svg'
          className={styles.userAvatar}
          width={32}
          height={32}
          alt='João da Silva Almeida Magalhães'
        />
        <strong>João da Silva Almeida Magalhães</strong>
        <button type='button'>
          <Image
            src='/images/chevron-down.svg'
            width={16}
            height={16}
            alt='Dados'
            title='Editar dados'
          />
        </button>
      </div>
      <div className={styles.favoriteTitle}>
        <Image src='/images/star-filled.svg' width={24} height={24} alt='' />
        <strong>Empresas favoritas</strong>
      </div>
      <div className={styles.favoriteCompanies}>
        {items?.map(company => (
          <div key={company.id} className={styles.companyItem}>
            <Card
              company={company}
              extraStyles={{
                boxShadow: '6px 6px 10px rgba(43, 37, 63, 0.1)',
                borderTop: '1px solid rgba(43, 37, 63, 0.04)',
                borderLeft: '1px solid rgba(43, 37, 63, 0.04)',
              }}
              onClick={() => {}}
            />
            <button type='button'>
              <Image src='/images/trashbin.svg' width={24} height={24} alt='' />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
