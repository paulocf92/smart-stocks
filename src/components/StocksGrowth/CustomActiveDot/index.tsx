import theme from '../../../styles/theme';

interface CustomActiveDotProps {
  cx?: number;
  cy?: number;
}

export function CustomActiveDot({ cx, cy }: CustomActiveDotProps) {
  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r='8'
        stroke={theme.colors.primary}
        strokeWidth='2'
        fill='white'
      />
      <circle cx={cx} cy={cy} r='3' fill={theme.colors.primary} />
    </>
  );
}
