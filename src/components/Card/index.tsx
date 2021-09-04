import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';

import { StockDataFormatted } from '../../interfaces/stocks';

import { Container, Company, Icon, Name, Valuation } from './styles';

interface CardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  company: StockDataFormatted;
  isFavorite?: boolean;
  star?: boolean;
}

export function Card({
  company,
  isFavorite = false,
  star = false,
  ...rest
}: CardProps) {
  return (
    <Container showStar={star} {...rest}>
      <Company>
        {star && (
          <Image
            src={`/images/star${isFavorite ? '-filled' : ''}.svg`}
            width={24}
            height={24}
            layout='fixed'
            alt=''
          />
        )}
        <Icon>
          <Image
            src={`https://storage.googleapis.com/iex/api/logos/${company.symbol}.png`}
            width={36}
            height={36}
            layout='fixed'
            alt=''
          />

          <svg height='36' width='36'>
            <circle cx='18' cy='18' r='17'></circle>
          </svg>
        </Icon>

        <Name>
          <strong>{company.symbol}</strong>
          <p>{company.companyName}</p>
        </Name>
      </Company>
      <Valuation isIncrease={company.changePercent > 0}>
        <span>{company.changePercentStr}</span>
        <Image
          src={`/images/price-${
            company.changePercent > 0 ? 'rise' : 'fall'
          }.svg`}
          width={16}
          height={16}
          layout='fixed'
          alt=''
        />
      </Valuation>
    </Container>
  );
}
