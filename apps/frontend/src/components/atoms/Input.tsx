import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <label className="grid gap-2">
      {label}
      <input
        className={`ui-input w-full ${className}`}
        {...props}
      />
      {error ? <span>{error}</span> : null}
    </label>
  );
}
