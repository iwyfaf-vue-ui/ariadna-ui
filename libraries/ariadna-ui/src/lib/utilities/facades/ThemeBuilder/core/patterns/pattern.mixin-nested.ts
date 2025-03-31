export default (): string => {
  return `
{{before_mixin}}{{name}}({{params}}) {{brace}}
  {{&}} {{brace}}
    {{content}}
  {{/brace}}
{{/brace}}`;
};
