import { ArrowUp } from 'lucide-react';

interface ArrowUpIconProps {
  size?: number;
  className?: string;
}

const ArrowUpIcon = ({ size = 20, className = '' }: ArrowUpIconProps) => {
  return <ArrowUp size={size} className={className} />;
};

export { ArrowUpIcon };