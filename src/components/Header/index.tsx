import Image from 'next/image';
import Link from 'next/link';

import { ActiveLink } from '../ActiveLink';

import { Container, Content } from './styles';

export function Header() {
  return (
    <Container>
      <Content>
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
          <ActiveLink href='/'>
            <Image
              src='/images/home-nav.svg'
              width={32}
              height={32}
              alt='Home'
            />
          </ActiveLink>
        </nav>
      </Content>
    </Container>
  );
}
