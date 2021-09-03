import Image from 'next/image';
import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { css } from '@emotion/react';
import DotLoader from 'react-spinners/DotLoader';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectStocks,
  stockDataSelector,
  stockHistoricalDataSelector,
} from '../../store/modules/stocks';
import {
  addFavorite,
  favoritesSelector,
  removeFavorite,
} from '../../store/modules/user';
import { CustomActiveDot } from './CustomActiveDot';
import { CustomTooltip } from './CustomTooltip';
import styles from './styles.module.scss';

export function StocksGrowth() {
  const dispatch = useAppDispatch();

  const { pending, error } = useAppSelector(selectStocks);
  const stockData = useAppSelector(stockDataSelector);
  const historicalData = useAppSelector(stockHistoricalDataSelector);

  const { favorites } = useAppSelector(favoritesSelector);

  const isFavorite = useMemo(() => {
    const stockSymbol = stockData?.symbol;
    const stock = favorites[stockSymbol];
    return !!stock?.symbol;
  }, [stockData, favorites]);

  function handleFavoriteToggle() {
    if (isFavorite) {
      dispatch(removeFavorite(stockData?.symbol));
    } else {
      dispatch(addFavorite(stockData));
    }
  }

  return (
    <div className={styles.stocksGrowthContainer}>
      <DotLoader
        color={'var(--primary-translucent-001)'}
        loading={pending}
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
        `}
        size={60}
      />

      <div className={styles.stocksGrowthHeader}>
        {stockData?.symbol ? (
          <>
            <div className={styles.stocksGrowthCompany}>
              <div className={styles.stocksGrowthFavoriteTooltip}>
                <button type='button' onClick={handleFavoriteToggle}>
                  <Image
                    src={`/images/star${isFavorite ? '-filled' : ''}.svg`}
                    width={24}
                    height={24}
                    alt=''
                  />
                </button>

                <span>
                  {isFavorite
                    ? 'Remover dos favoritos'
                    : 'Adicionar aos favoritos'}
                </span>
              </div>
              <div>
                <strong>{stockData.symbol}</strong>
                <p>{stockData.companyName}</p>
              </div>
            </div>
            <div
              className={styles.stocksGrowthValuation}
              style={{
                color:
                  stockData.change > 0 ? 'var(--success)' : 'var(--danger)',
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
                <strong>{stockData.latestPriceStr}</strong>
              </div>
              <span>
                {stockData.changeStr} ({stockData.changePercentStr})
              </span>
            </div>
          </>
        ) : (
          <strong className={styles.stillBlank}>
            Nada aqui por enquanto...
          </strong>
        )}
      </div>

      <ResponsiveContainer height='80%'>
        <AreaChart
          data={historicalData}
          style={{
            cursor: 'pointer',
          }}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
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
