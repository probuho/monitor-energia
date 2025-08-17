declare module 'driver.js' {
  export interface DriverStep {
    element?: string;
    popover: {
      title?: string;
      description?: string;
      side?: 'top' | 'right' | 'bottom' | 'left';
      align?: 'start' | 'center' | 'end';
    };
  }

  export interface DriverOptions {
    animate?: boolean;
    opacity?: number;
    padding?: number;
    allowClose?: boolean;
    overlayClickNext?: boolean;
    doneBtnText?: string;
    closeBtnText?: string;
    nextBtnText?: string;
    prevBtnText?: string;
    showProgress?: boolean;
    steps: DriverStep[];
    onComplete?: () => void;
    onDeselected?: () => void;
    onHighlightStarted?: () => void;
    onHighlighted?: () => void;
    onNextClick?: () => void;
    onPreviousClick?: () => void;
    onReset?: () => void;
    onStart?: () => void;
    onStop?: () => void;
  }

  export interface Driver {
    drive(): void;
    moveNext(): void;
    movePrevious(): void;
    moveTo(index: number): void;
    hasNextStep(): boolean;
    hasPreviousStep(): boolean;
    getCurrentStep(): number;
    getTotalSteps(): number;
    isActivated(): boolean;
    destroy(): void;
    reset(): void;
  }

  export function driver(options: DriverOptions): Driver;
}
