import { FormEvent, useState } from 'react';
import { MdSearch } from 'react-icons/md';

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
        <MdSearch size={26} color='#ffffff' />
      </button>
    </form>
  );
}
