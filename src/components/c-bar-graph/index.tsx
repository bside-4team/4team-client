export interface BarGraphProps {
  $trackRank: 'smallest' | 'small' | 'medium' | 'large' | 'largest' | string;
  $trackWidth: number;
}

const getColor = (trackRank: string) => {
  switch (trackRank) {
    case 'smallest':
      return 'bg-primary-y05 border-primary-y20';
    case 'small':
      return 'bg-primary-y10 border-primary-y30';
    case 'medium':
      return 'bg-primary-y30 border-primary-y50';
    case 'large':
      return 'bg-primary-y50 border-primary-y70';
    case 'largest':
      return 'bg-primary-y70 border-secondary-o50';
    default:
      return 'bg-neutral-bg05 border-neutral-bg10';
  }
};

export default function CBarGraph({ $trackRank, $trackWidth }: BarGraphProps) {
  const trackClasses = getColor($trackRank);

  return (
    <div className="relative h-10 w-full border-1 border-solid border-neutral-bg10 bg-neutral-bg05">
      <div className={`absolute left-0 top-0 h-full outline ${trackClasses}`} style={{ width: `${$trackWidth}%` }} />
    </div>
  );
}
