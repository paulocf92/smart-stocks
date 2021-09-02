import Image from 'next/image';
import { useEffect } from 'react';
import { FormEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getStockData, selectStocks } from '../../store/modules/stocks';

import styles from './styles.module.scss';

export function SearchInput() {
  const dispatch = useAppDispatch();
  const { pending, error } = useAppSelector(selectStocks);
  const [searchedCompany, setSearchedCompany] = useState('');

  const searchCompany = (event: FormEvent) => {
    event.preventDefault();
    dispatch(getStockData(searchedCompany));
  };

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
