import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

import styles from './styles.module.scss';

import { TickerScrollItem, Company } from './TickerScrollItem';

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
  {
    id: '3',
    ticker: 'MSFT',
    name: 'Microsoft',
    valuation: '+4%',
    delta: 'rise',
  },
  {
    id: '4',
    ticker: 'SBUX',
    name: 'Starbucks',
    valuation: '-0.2%',
    delta: 'fall',
  },
  {
    id: '5',
    ticker: 'SBUX',
    name: 'Starbucks',
    valuation: '-0.2%',
    delta: 'fall',
  },
  {
    id: '6',
    ticker: 'SBUX',
    name: 'Starbucks',
    valuation: '-0.2%',
    delta: 'fall',
  },
];

const PARENT_LEFT_PADDING = 24;
const CHILD_WIDTH = 300;
const CHILD_PADDED_WIDTH = CHILD_WIDTH + 24;

interface RecentlyBrowsedProps {
  elementsToScroll?: number;
}

export function RecentlyBrowsed({ elementsToScroll }: RecentlyBrowsedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollByExtraElements, setScrollByExtraElements] = useState(0);

  useEffect(() => {
    const containerWidth = containerRef?.current?.clientWidth || 0;
    const withinViewport = Math.floor(containerWidth / CHILD_PADDED_WIDTH);

    // Default = scroll by number of elements within viewport
    const scrollBy = elementsToScroll
      ? Math.max(0, elementsToScroll - 1)
      : Math.max(0, withinViewport - 1);

    console.log({ withinViewport, scrollBy });
    setScrollByExtraElements(scrollBy);
  }, [elementsToScroll]);

  const executeScroll = useCallback(
    (direction: 'forward' | 'backward') => {
      const scrollLeft = containerRef?.current?.scrollLeft || 0;
      const scroll =
        scrollLeft +
        (PARENT_LEFT_PADDING +
          CHILD_WIDTH +
          CHILD_PADDED_WIDTH * scrollByExtraElements) *
          (direction === 'forward' ? 1 : -1);

      containerRef?.current?.scrollTo(scroll, 0);
    },
    [scrollByExtraElements]
  );

  return (
    <div className={styles.recentlyBrowsedContainer}>
      <div className={styles.recentlyBrowsedHeader}>
        <div className={styles.recentlyBrowsedTitle}>
          <Image src='/images/stats.svg' width={24} height={24} alt='' />
          <strong>Empresas recentes</strong>
        </div>
        <div className={styles.recentlyBrowsedButtons}>
          <button type='button' onClick={() => executeScroll('backward')}>
            <HiOutlineChevronLeft color='var(--primary)' size={20} />
          </button>
          <button type='button' onClick={() => executeScroll('forward')}>
            <HiOutlineChevronRight color='var(--primary)' size={20} />
          </button>
        </div>
      </div>

      <div className={styles.tickerScrollContainer}>
        <div className={styles.tickerScrollContent} ref={containerRef}>
          <div className={styles.tickerScrollFlex}>
            {data.map((company: Company) => (
              <TickerScrollItem key={company.id} company={company} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
