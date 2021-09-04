import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  getStockData,
  recentlyBrowsedSelector,
  selectStocks,
} from '../../store/modules/stocks';
import { favoritesSelector } from '../../store/modules/user';

import { Card } from '../Card';

import { Container, Header, Title, Buttons, Ticker } from './styles';

const PARENT_LEFT_PADDING = 24;
const CHILD_WIDTH = 360;
const CHILD_PADDED_WIDTH = CHILD_WIDTH + 24;

interface RecentlyBrowsedProps {
  elementsToScroll?: number;
}

export function RecentlyBrowsed({ elementsToScroll }: RecentlyBrowsedProps) {
  const dispatch = useAppDispatch();
  const { companies: recentCompanies, symbols } = useAppSelector(
    recentlyBrowsedSelector
  );
  const { favorites } = useAppSelector(favoritesSelector);
  const { pending } = useAppSelector(selectStocks);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollByExtraElements, setScrollByExtraElements] = useState(0);

  useEffect(() => {
    if (!pending) {
      containerRef?.current?.scrollTo(0, 0);
    }
  }, [pending]);

  useEffect(() => {
    const containerWidth = containerRef?.current?.clientWidth || 0;
    const withinViewport = Math.floor(containerWidth / CHILD_PADDED_WIDTH);

    // Default = scroll by number of elements within viewport
    const scrollBy = elementsToScroll
      ? Math.max(0, elementsToScroll - 1)
      : Math.max(0, withinViewport - 1);

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
    <Container>
      <Header>
        <Title>
          <Image src='/images/stats.svg' width={24} height={24} alt='' />
          <strong>Empresas recentes</strong>
        </Title>
        <Buttons>
          <button onClick={() => executeScroll('backward')}>
            <HiOutlineChevronLeft size={20} />
          </button>
          <button onClick={() => executeScroll('forward')}>
            <HiOutlineChevronRight size={20} />
          </button>
        </Buttons>
      </Header>

      <Ticker>
        <div ref={containerRef}>
          <div>
            {symbols.map(symbol => (
              <Card
                key={symbol}
                company={recentCompanies[symbol]}
                isFavorite={!!favorites[symbol]?.symbol}
                star
                onClick={() => dispatch(getStockData(symbol))}
              />
            ))}
          </div>
        </div>
      </Ticker>
    </Container>
  );
}
