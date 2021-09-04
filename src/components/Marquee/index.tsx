import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getStockData,
  recentlyBrowsedSelector,
} from '../../store/modules/stocks';
import { favoritesSelector } from '../../store/modules/user';

import { FavoriteCompany } from './FavoriteCompany';

import { Container, Content } from './styles';

interface MarqueeProps {
  duration?: number;
}

export function Marquee({ duration = 15 }: MarqueeProps) {
  const dispatch = useAppDispatch();
  const { favorites, symbols } = useAppSelector(favoritesSelector);

  const effectiveDuration = useMemo(
    () => duration + symbols.length * 2,
    [duration, symbols]
  );

  return (
    <Container>
      <Content duration={effectiveDuration}>
        {symbols.map(symbol => (
          <FavoriteCompany
            key={symbol}
            company={favorites[symbol]}
            onClick={() => dispatch(getStockData(symbol))}
          />
        ))}
      </Content>
    </Container>
  );
}
