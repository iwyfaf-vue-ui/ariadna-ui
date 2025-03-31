const PatternMarkdownTableWrapper = (): string => {
  return `{{tableWrapper}}
  <thead>
  <tr>
    <th>Mixin</th>
    <th>Description</th>
  </tr>
  </thead>
  <tbody>
  {{content}}
  </tbody>
{{/tableWrapper}}
`;
};

export { PatternMarkdownTableWrapper };
