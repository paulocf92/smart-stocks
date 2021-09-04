import Image from 'next/image';
import { StockDataFormatted } from '../../interfaces/stocks';

import styles from './styles.module.scss';

interface CardProps {
  company: StockDataFormatted;
  star?: boolean;
  extraStyles?: object;
  onClick(): void;
}

export function Card({
  company,
  star = false,
  extraStyles,
  onClick,
}: CardProps) {
  return (
    <button className={styles.card} style={extraStyles} onClick={onClick}>
      <div className={styles.cardCompany}>
        {star && (
          <Image
            src='/images/star.svg'
            width={24}
            height={24}
            layout='fixed'
            alt=''
          />
        )}
        <div className={styles.companyIcon}>
          <Image
            src={`https://storage.googleapis.com/iex/api/logos/${company.symbol}.png`}
            width={36}
            height={36}
            layout='fixed'
            alt=''
          />
          {
            <svg height='36' width='36'>
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
          }
        </div>

        <div className={styles.companyName}>
          <strong>{company.symbol}</strong>
          <p>{company.companyName}</p>
        </div>
      </div>
      <div className={styles.cardCompanyValuation}>
        <span
          style={{
            color:
              company.changePercent > 0 ? 'var(--success)' : 'var(--danger)',
          }}
        >
          {company.changePercentStr}
        </span>
        <Image
          src={`/images/price-${
            company.changePercent > 0 ? 'rise' : 'fall'
          }.svg`}
          width={16}
          height={16}
          layout='fixed'
          alt=''
        />
      </div>
    </button>
  );
}
