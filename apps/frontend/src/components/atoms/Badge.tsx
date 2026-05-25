type BadgeProps = {
  children: string;
  tone?: 'plain' | 'done' | 'draft';
};

const tones = {
  plain: '',
  done: '',
  draft: '',
};

export function Badge({ children, tone = 'plain' }: BadgeProps) {
  return <span className={`ui-badge inline-flex ${tones[tone]}`}>{children}</span>;
}
