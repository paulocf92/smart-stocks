interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    value: string;
  }[];
}

export function CustomTooltip({
  active,
  payload = [{ value: '' }],
}: CustomTooltipProps) {
  return active && !!payload?.length ? (
    <div className='stocksGrowthTooltip'>{`$${payload[0].value}`}</div>
  ) : null;
}
