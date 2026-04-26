interface LoveKeyProps {
  /** Optional suffix appended after "Love Key", e.g. " Guardian", " Essential", " App". */
  suffix?: string;
  className?: string;
}

/**
 * Renders the brand name "Love Key" with the word "Love" highlighted in the
 * primary brand color (red). Use this anywhere the brand name appears in
 * user-facing UI to keep the styling consistent.
 */
const LoveKey = ({ suffix = "", className }: LoveKeyProps) => {
  return (
    <span className={className}>
      <span className="text-primary">Love</span> Key{suffix}
    </span>
  );
};

export default LoveKey;
