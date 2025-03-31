const PatternIncludeNested = (): string => {
  return `
{{before_include}}{{name}}() {{brace}}
{{content}}
{{/brace}}`;
};

const PatternIncludeStandalone = (): string => {
  return `
{{before_include}}{{name}}();
`;
};

export { PatternIncludeNested, PatternIncludeStandalone };
