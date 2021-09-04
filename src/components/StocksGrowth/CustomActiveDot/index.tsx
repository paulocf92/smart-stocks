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
        stroke='var(--primary)'
        strokeWidth='2'
        fill='white'
      />
      <circle cx={cx} cy={cy} r='3' fill='var(--primary)' />
    </>
  );
}
