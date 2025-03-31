const PatternHelperTextStyle = (): string => {
  return `
font-size: var(--font-size-#{$name});
font-weight: var(--font-weight-#{$name});
line-height: var(--font-height-#{$name});
`;
};

export { PatternHelperTextStyle };
