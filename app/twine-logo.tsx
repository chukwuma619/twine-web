type TwineLogoProps = {
  className?: string;
};

export function TwineLogo({ className }: TwineLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2.52 15.54C4.79 13.27 9.88 20.06 12.14 17.8" />
      <path d="M5.64 12.42C7.9 10.16 12.99 16.95 15.25 14.69" />
      <path d="M8.75 9.31C11.01 7.05 16.1 13.84 18.36 11.58" />
      <path d="M11.86 6.2C14.12 3.94 19.21 10.73 21.48 8.46" />
    </svg>
  );
}
