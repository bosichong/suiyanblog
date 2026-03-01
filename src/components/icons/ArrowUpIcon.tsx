import { ArrowUp } from 'lucide-react';

interface ArrowUpIconProps {
  size?: number;
}

const ArrowUpIcon = ({ size = 20 }: ArrowUpIconProps) => {
  return <ArrowUp size={size}  />;
};

export { ArrowUpIcon };