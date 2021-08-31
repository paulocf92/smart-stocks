import Image from 'next/image';

import styles from './styles.module.scss';

export type Company = {
  id: string;
  name: string;
  ticker: string;
  valuation: string;
  delta: 'fall' | 'rise';
};

interface TickerScrollItemProps {
  company: Company;
}

export function TickerScrollItem({ company }: TickerScrollItemProps) {
  return (
    <div key={company.id} className={styles.tickerScrollItem}>
      <div className={styles.tickerCompany}>
        <button type='button'>
          <Image src='/images/star.svg' width={24} height={24} alt='' />
        </button>
        <div style={{ position: 'relative' }}>
          <Image
            src={`/placeholder/${company.name.toLowerCase()}.svg`}
            width={36}
            height={36}
            alt=''
          />
          <svg
            height='36'
            width='36'
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
            }}
          >
            <circle
              cx='18'
              cy='18'
              r='17'
              stroke='var(--white)'
              fill='none'
              strokeWidth='2'
              strokeOpacity='0.5'
            ></circle>
          </svg>
        </div>

        <div>
          <strong>{company.ticker}</strong>
          <p>{company.name}</p>
        </div>
      </div>
      <div className={styles.tickerCompanyValuation}>
        <span>{company.valuation}</span>
        <Image
          src={`/images/price-${company.delta}.svg`}
          width={16}
          height={16}
          alt=''
        />
      </div>
    </div>
  );
}
