import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  favoritesSelector,
  removeFavorite,
  selectUser,
} from '../../store/modules/user';
import { getStockData } from '../../store/modules/stocks';

import { Card } from '../Card';

import { Container, User, Title, Favorites, Item, Delete } from './styles';

export function FavoriteCompanies() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const { favorites, symbols } = useAppSelector(favoritesSelector);

  return (
    <Container>
      <User>
        <Image
          src='/images/avatar.svg'
          width={32}
          height={32}
          alt={user?.name}
        />
        <strong>{user?.name}</strong>
        <button>
          <Image
            src='/images/chevron-down.svg'
            width={16}
            height={16}
            alt='Dados'
            title='Editar dados'
          />
        </button>
      </User>
      <Title>
        <Image src='/images/star-filled.svg' width={24} height={24} alt='' />
        <strong>Empresas favoritas</strong>
      </Title>
      <Favorites>
        {symbols.map(symbol => (
          <Item key={symbol}>
            <Card
              company={favorites[symbol]}
              isFavorite
              onClick={() => dispatch(getStockData(symbol))}
            />
            <Delete onClick={() => dispatch(removeFavorite(symbol))}>
              <Image src='/images/trashbin.svg' width={24} height={24} alt='' />
            </Delete>
          </Item>
        ))}
      </Favorites>
    </Container>
  );
}
