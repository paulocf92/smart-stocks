import Image from 'next/image';
import { FormEvent, useState } from 'react';

import styles from './styles.module.scss';

export function SearchInput() {
  const [searchedCompany, setSearchedCompany] = useState('');

  const searchCompany = (event: FormEvent) => {
    event.preventDefault();
    console.log(searchedCompany);
  };

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
