const PatternMarkdownHeader = (header: number = 1): string => {
  return `{{h${header}}} {{content}}`;
};

export { PatternMarkdownHeader };
