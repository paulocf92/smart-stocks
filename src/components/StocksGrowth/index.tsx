import Image from 'next/image';
import { useEffect, useCallback } from 'react';
import {
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { StockData } from '../../interfaces/stocks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getStockData,
  selectStocks,
  stockDataSelector,
  stockHistoricalDataSelector,
} from '../../store/modules/stocks';

import { CustomTooltip } from './CustomTooltip';
import { CustomActiveDot } from './CustomActiveDot';

import styles from './styles.module.scss';

interface StockDataFormatted extends StockData {
  latestPriceStr: string;
  changeStr: string;
  changePercentStr: string;
}

export function StocksGrowth() {
  const dispatch = useAppDispatch();
  const { pending, error } = useAppSelector(selectStocks);
  const stockData = useAppSelector<StockDataFormatted>(stockDataSelector);
  const historicalData = useAppSelector(stockHistoricalDataSelector);

  const loadSampleData = useCallback(() => {
    dispatch(getStockData('gsat'));
  }, [dispatch]);

  useEffect(() => {
    loadSampleData();
  }, [loadSampleData]);

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
            <strong>{stockData.symbol}</strong>
            <p>{stockData.companyName}</p>
          </div>
        </div>
        <div
          className={styles.stocksGrowthValuation}
          style={{
            color: stockData.change > 0 ? 'var(--success)' : 'var(--danger)',
          }}
        >
          <div>
            <Image
              src={`/images/price-${
                stockData.change > 0 ? 'rise' : 'fall'
              }.svg`}
              width={16}
              height={16}
              alt=''
            />
            <strong>{stockData.latestPriceStr}!!</strong>
          </div>
          <span>
            {stockData.changeStr} ({stockData.changePercentStr})
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
