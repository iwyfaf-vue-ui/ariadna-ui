const PatternBreakpoints = (sizeName: string | undefined, width: string | undefined): string => {
  return `
{{var}}break-${sizeName}{{=}}${width};`;
};

export { PatternBreakpoints };
