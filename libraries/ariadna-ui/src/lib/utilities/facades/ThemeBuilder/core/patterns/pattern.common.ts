export default (): object => {
  return {
    '{{var}}': '$',
    '{{string-var}}': '#{$',
    '{{/string-var}}': '}',
    '{{%}}': '%',
    '{{&}}': '&',
    '{{=}}': ': ',
    '{{:}}': ': ',
    '{{;}}': '; ',
    '{{n}}': '\\n ',
    '{{before_mixin}}': '@mixin ',
    '{{before_if}}': '@if ',
    '{{before_include}}': '@include ',
    '{{brace}}': '{',
    '{{/brace}}': '}',
    '{{block-content-var}}': '',
    '{{block-content-extract}}': '@content',
  };
};
