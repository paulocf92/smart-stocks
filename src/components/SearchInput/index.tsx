import Image from 'next/image';
import { useEffect } from 'react';
import { FormEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getStockData,
  selectStocks,
  stockDataSelector,
} from '../../store/modules/stocks';
import { updateFavorite, selectUser } from '../../store/modules/user';

import styles from './styles.module.scss';

export function SearchInput() {
  const dispatch = useAppDispatch();
  const { pending, error } = useAppSelector(selectStocks);
  const stockData = useAppSelector(stockDataSelector);
  const { favorites } = useAppSelector(selectUser);

  const [searchedCompany, setSearchedCompany] = useState('');

  function searchCompany(event: FormEvent) {
    event.preventDefault();

    if (searchedCompany) {
      dispatch(getStockData(searchedCompany));
    }
  }

  useEffect(() => {
    const { symbol } = stockData;

    // Update favorite on latestPrice change
    if (
      favorites[symbol] &&
      favorites[symbol].latestPrice !== stockData.latestPrice
    ) {
      dispatch(updateFavorite(stockData));
    }
  }, [stockData, favorites, dispatch]);

  useEffect(() => {
    if (!pending && !error) {
      setSearchedCompany('');
    }
  }, [pending, error]);

  return (
    <form className={styles.searchInputForm} onSubmit={searchCompany}>
      <input
        className={styles.searchInput}
        type='text'
        id='search'
        name='search'
        value={searchedCompany}
        onChange={e => setSearchedCompany(e.target.value)}
        placeholder='Buscar empresa'
        required
      />
      <button type='submit' className={styles.searchInputIcon}>
        <Image src='/images/search.svg' width={26} height={26} alt='' />
      </button>
    </form>
  );
}
