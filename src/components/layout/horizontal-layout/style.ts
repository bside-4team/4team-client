import { cva } from 'class-variance-authority';

export const horizontalLayoutVariant = cva('', {
  variants: {
    subject: {
      menu: 'bg-gradient-to-b from-secondary-o10 via-transparent to-transparent bg-origin-border bg-clip-border bg-size-1px-20px',
      restaurant:
        'bg-gradient-to-b from-primary-y10 via-transparent to-transparent bg-origin-border bg-clip-border bg-size-1px-20px',
    },
  },
});
