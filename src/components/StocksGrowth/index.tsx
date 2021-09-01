import Image from 'next/image';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { api } from '../../services/api';

const data2 = [
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
}
const CustomTooltip = ({
  active,
  payload = [{ value: '' }],
}: CustomTooltipProps) => {
  if (active && !!payload.length) {
    return <div className='stocksGrowthTooltip'>{`$${payload[0].value}`}</div>;
  }

  return null;
};

type CompanyData = {
  companyName: string;
  symbol: string;
  latestPrice: number;
  latestPriceFormatted: string;
  change: number;
  changeFormatted: string;
  changePercent: number;
  changePercentFormatted: string;
};

type HistoricalDataSlice = {
  minute: string;
  close: number;
};

export function StocksGrowth() {
  const [companyData, setCompanyData] = useState<CompanyData>(
    {} as CompanyData
  );
  const [historicalData, setHistoricalData] = useState<HistoricalDataSlice[]>();

  async function loadCompanyData() {
    try {
      const response = await api.get('/gsat/quote', {
        params: {
          token: process.env.NEXT_PUBLIC_IEXCLOUD_TOKEN,
        },
      });

      const data: CompanyData = response.data;

      setCompanyData({
        ...data,
        latestPriceFormatted: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(data.latestPrice),
        changeFormatted: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(data.change),
        changePercentFormatted: data.changePercent.toFixed(3) + '%',
      });

      console.log(data);
    } catch (err) {
      alert(err.message);
    }
  }

  async function loadHistoricalData() {
    try {
      const response = await api.get('/gsat/chart/today', {
        params: {
          chartInterval: 30,
          token: process.env.NEXT_PUBLIC_IEXCLOUD_TOKEN,
        },
      });

      const data: HistoricalDataSlice[] = response.data;

      const filtered = data.filter(slice => slice.close !== null);

      setHistoricalData(filtered);

      console.log(filtered);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    loadCompanyData();
    loadHistoricalData();
  }, []);

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
            <strong>{companyData.symbol}</strong>
            <p>{companyData.companyName}</p>
          </div>
        </div>
        <div
          className={styles.stocksGrowthValuation}
          style={{
            color: companyData.change > 0 ? 'var(--success)' : 'var(--danger)',
          }}
        >
          <div>
            <Image
              src={`/images/price-${
                companyData.change > 0 ? 'rise' : 'fall'
              }.svg`}
              width={16}
              height={16}
              alt=''
            />
            <strong>{companyData.latestPriceFormatted}</strong>
          </div>
          <span>
            {companyData.changeFormatted} ({companyData.changePercentFormatted})
          </span>
        </div>
      </div>

      <ResponsiveContainer height='80%'>
        <AreaChart
          data={historicalData}
          style={{
            cursor: 'pointer',
          }}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id='colorPrice' x1='0' y1='0' x2='0' y2='1'>
              <stop
                offset='0%'
                stopColor='var(--primary-translucent-001)'
                stopOpacity={0.3}
              />
              <stop
                offset='100%'
                stopColor='var(--primary-translucent-001)'
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey='minute'
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
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(tick);
            }}
          />
          <CartesianGrid strokeWidth={1} stroke='var(--gray-001)' />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Area
            type='monotone'
            dataKey='close'
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
