import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';
import { StockDataFormatted } from '../../../interfaces/stocks';

interface FavoriteCompanyProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  company: StockDataFormatted;
}

import { Container } from './styles';

export function FavoriteCompany({ company, ...rest }: FavoriteCompanyProps) {
  return (
    <Container isIncrease={company.change > 0} {...rest}>
      <strong>{company.companyName}</strong>
      <div>{company.latestPrice}</div>
      <Image
        src={`/images/price-${company.changePercent > 0 ? 'rise' : 'fall'}.svg`}
        width={16}
        height={16}
        layout='fixed'
        alt=''
      />
      <div>{company.changeStr}</div>
      <div>{company.changePercentStr}</div>
    </Container>
  );
}
