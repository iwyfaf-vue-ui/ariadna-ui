export default (): string => {
  return `
{{before_if}}{{name}} {{brace}}
{{content}}
{{/brace}}`;
};
