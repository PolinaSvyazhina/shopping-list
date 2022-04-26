import clsx from 'clsx';
import React, { forwardRef } from 'react';

import classes from './Input.module.css';

interface InputProps {
  error?: boolean;
  className?: string;
  value?: string | null;
  placeholder?: string;
  type: 'number' | 'string';
  width?: React.CSSProperties['width'];
  onValueChange?: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, width, value, onValueChange, placeholder, type, error }, ref) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      onValueChange(e.currentTarget.value || '');
    };

    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ width: width || '100%' }}
        className={clsx(classes.input, error && classes.error, className)}
      />
    );
  }
);
