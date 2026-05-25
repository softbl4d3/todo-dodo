import type { ReactNode, SelectHTMLAttributes } from 'react';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
  error?: string;
};

export function Select({ label, children, error, className = '', ...props }: SelectProps) {
  return (
    <label className="grid gap-2">
      {label}
      <select
        className={`ui-select w-full ${className}`}
        {...props}
      >
        {children}
      </select>
      {error ? <span>{error}</span> : null}
    </label>
  );
}
