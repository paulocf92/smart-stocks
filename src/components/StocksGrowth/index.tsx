import Image from 'next/image';
import { HTMLAttributes } from 'react';
import {
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    hour: '10:00',
    price: 0,
  },
  {
    hour: '10:30',
    price: 700,
  },
  {
    hour: '11:00',
    price: 900,
  },
  {
    hour: '12:00',
    price: 800,
  },
  {
    hour: '13:00',
    price: 850,
  },
  {
    hour: '14:00',
    price: 50,
  },
  {
    hour: '14:30',
    price: 240,
  },
  {
    hour: '15:00',
    price: 100,
  },
  {
    hour: '16:00',
    price: 190,
  },
  {
    hour: '17:00',
    price: 240,
  },
  {
    hour: '17:30',
    price: 190,
  },
  {
    hour: '18:00',
    price: 250,
  },
];

import styles from './styles.module.scss';

interface CustomActiveDotProps {
  cx?: number;
  cy?: number;
}
const CustomActiveDot = ({ cx, cy }: CustomActiveDotProps) => {
  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r='8'
        stroke='var(--primary)'
        strokeWidth='2'
        fill='white'
      />
      <circle cx={cx} cy={cy} r='3' fill='var(--primary)' />
    </>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: string;
  }[];
  label?: string;
}
const CustomTooltip = ({
  active,
  payload = [{ value: '' }],
  label,
}: CustomTooltipProps) => {
  if (active) {
    return <div className='stocksGrowthTooltip'>{`$${payload[0].value}`}</div>;
  }

  return null;
};

export function StocksGrowth() {
  return (
    <div className={styles.stocksGrowthContainer}>
      <div className={styles.stocksGrowthHeader}>
        <div className={styles.stocksGrowthCompany}>
          <div className={styles.stocksGrowthFavoriteTooltip}>
            <button type='button'>
              <Image src='/images/star.svg' width={24} height={24} alt='' />
            </button>

            <span>Adicionar aos favoritos</span>
          </div>
          <div>
            <strong>MSFT</strong>
            <p>Microsoft</p>
          </div>
        </div>
        <div className={styles.stocksGrowthValuation}>
          <div>
            <Image src='/images/price-fall.svg' width={16} height={16} alt='' />
            <strong>$265,42</strong>
          </div>
          <span>$-0.09 (-0.03%)</span>
        </div>
      </div>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          style={{
            cursor: 'pointer',
          }}
          margin={{ top: 0, right: 30, left: 10, bottom: 80 }}
        >
          <defs>
            <linearGradient id='colorPrice' x1='0' y1='0' x2='0' y2='1'>
              <stop
                offset='0%'
                stopColor='var(--primary-translucent)'
                stopOpacity={0.3}
              />
              <stop
                offset='100%'
                stopColor='var(--primary-translucent)'
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey='hour'
            tick={{ fontSize: 11, fontWeight: 400 }}
            axisLine={false}
            tickLine={false}
            dy={5}
          />
          <YAxis
            tick={{ fontSize: 11, fontWeight: 400 }}
            axisLine={false}
            tickLine={false}
            dx={-5}
            tickCount={6}
            tickFormatter={tick => {
              return `$${tick}`;
              /* return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(tick); */
            }}
          />
          <CartesianGrid strokeWidth={1} stroke='var(--gray-001)' />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Area
            type='monotone'
            dataKey='price'
            stroke='var(--primary)'
            strokeWidth={2}
            strokeOpacity={0.67}
            dot={{ fill: 'var(--primary)', strokeWidth: 0, r: 2.5 }}
            activeDot={<CustomActiveDot />}
            fillOpacity={1}
            fill='url(#colorPrice)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
