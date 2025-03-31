export default (): string => {
  return `
{{before_mixin}}{{name}}({{params}}) {{brace}}
{{content}}
{{/brace}}`;
};
