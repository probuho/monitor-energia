import React from 'react';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { DollarSign, TrendingUp } from 'lucide-react';

interface DualPriceDisplayProps {
  usdAmount: number;
  showIcons?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const DualPriceDisplay: React.FC<DualPriceDisplayProps> = ({
  usdAmount,
  showIcons = true,
  size = 'md',
  className = ''
}) => {
  const { convertUSDToVES, formatUSD, formatVES, rate } = useExchangeRate();

  if (!rate) {
    return (
      <div className={`text-muted-foreground ${className}`}>
        {formatUSD(usdAmount)}
      </div>
    );
  }

  const vesAmount = convertUSDToVES(usdAmount);

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {/* Precio en USD */}
      <div className={`flex items-center space-x-1 ${sizeClasses[size]} font-medium`}>
        {showIcons && <DollarSign className={`${iconSize[size]} text-green-600`} />}
        <span>{formatUSD(usdAmount)}</span>
      </div>
      
      {/* Precio en VES */}
      <div className={`flex items-center space-x-1 ${sizeClasses[size]} text-muted-foreground`}>
        {showIcons && <TrendingUp className={`${iconSize[size]} text-blue-600`} />}
        <span>{formatVES(vesAmount)}</span>
      </div>
    </div>
  );
};

export default DualPriceDisplay;
