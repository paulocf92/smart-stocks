import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href='/'>
          <a>
            <Image
              src='/images/logo.svg'
              width={46}
              height={46}
              layout='fixed'
              alt='Smart Stocks'
            />
          </a>
        </Link>
        <nav>
          <ActiveLink href='/' activeClassName={styles.active}>
            <a>
              <Image
                src='/images/home-nav.svg'
                width={32}
                height={32}
                alt='Home'
              />
            </a>
          </ActiveLink>
        </nav>
      </div>
    </header>
  );
}
