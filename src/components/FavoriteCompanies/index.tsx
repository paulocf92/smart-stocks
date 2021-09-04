import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  favoritesSelector,
  removeFavorite,
  selectUser,
} from '../../store/modules/user';

import styles from './styles.module.scss';

import { Card } from '../Card';
import { getStockData } from '../../store/modules/stocks';

export function FavoriteCompanies() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const { favorites, symbols } = useAppSelector(favoritesSelector);

  return (
    <aside className={styles.favoriteContainer}>
      <div className={styles.userInfo}>
        <Image
          src='/images/avatar.svg'
          className={styles.userAvatar}
          width={32}
          height={32}
          alt={user?.name}
        />
        <strong>{user?.name}</strong>
        <button type='button'>
          <Image
            src='/images/chevron-down.svg'
            width={16}
            height={16}
            alt='Dados'
            title='Editar dados'
          />
        </button>
      </div>
      <div className={styles.favoriteTitle}>
        <Image src='/images/star-filled.svg' width={24} height={24} alt='' />
        <strong>Empresas favoritas</strong>
      </div>
      <div className={styles.favoriteCompanies}>
        {symbols &&
          symbols?.map(symbol => (
            <div key={symbol} className={styles.companyItem}>
              <Card
                company={favorites[symbol]}
                extraStyles={{
                  boxShadow: '6px 6px 10px rgba(43, 37, 63, 0.1)',
                  borderTop: '1px solid rgba(43, 37, 63, 0.04)',
                  borderLeft: '1px solid rgba(43, 37, 63, 0.04)',
                }}
                onClick={() => dispatch(getStockData(symbol))}
              />
              <button
                type='button'
                onClick={() => dispatch(removeFavorite(symbol))}
              >
                <Image
                  src='/images/trashbin.svg'
                  width={24}
                  height={24}
                  alt=''
                />
              </button>
            </div>
          ))}
      </div>
    </aside>
  );
}
