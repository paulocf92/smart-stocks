import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? 'active' : '';

  return (
    <Link {...rest}>
      <a className={className}>{children}</a>
    </Link>
  );
}
