import type { TDefaultSettings } from '../../types/builder-default-settings/default-settings.type';

const defaultSettings: TDefaultSettings = {
  breakPoints: {
    sm: {
      width: '576px',
    },
    md: {
      width: '768px',
    },
    lg: {
      width: '992px',
    },
    xl: {
      width: '1200px',
    },
    xxl: {
      width: '1400px',
    },
  },
  gridSettings: {
    container: {
      container: '100%',
      sm: '540px',
      md: '720px',
      lg: '960px',
      xl: '1140px',
      xxl: '1320px',
    },
    fields: {
      fields: '16px',
    },
    gap: {
      gap: '32px',
    },
  },
  gridContainer: {
    container: {
      include: '@include grid-container-fluid()',

      'max-width': 'var(--container)',
      margin: '0 auto',

      extend: '@extend %grid-debug !optional',
    },
    fluid: {
      position: 'relative',
      width: '100%',
      'max-width': '100%',
      'padding-left': 'var(--fields)',
      'padding-right': 'var(--fields)',

      extend: '@extend %grid-debug !optional',
    },
  },
  gridDebug: {
    ' --columns': '#{$columns};',
    ' --grid-column-width': 'calc((100% - var(--gap) * var(--columns)) / var(--columns));',
    ' --grid-column-width-gap': 'calc(var(--grid-column-width) + var(--gap));',
    ' --grid-column-half-width-gap': 'calc(var(--grid-column-width) + var(--gap) / 2);',
    ' --half-gap': 'calc(var(--gap) / 2);',
    ' --grid-color': 'rgb(255 0 0 / 0.2);',
    ' --padding-color': '#6ccc7e73;',
    ' --heading-hint':
      "'BreakPoint: ' var(--debug-breakpoint) '; Container: ' var(--debug-container) '; Fields: ' var(--debug-fields) '; '  'Gap: ' var(--debug-gap);",
    before:
      '    &::before {\n' +
      '      counter-reset: variable var(--columns);\n' +
      '      content: var(--heading-hint);\n' +
      '      position: absolute;\n' +
      '      top: 0;\n' +
      '      right: 0;\n' +
      '      left: 0;\n' +
      '      height: calc(100% - 0px);\n' +
      '      pointer-events: none;\n' +
      '      border: solid transparent;\n' +
      '      border-width: 0 calc(var(--fields) - var(--gap) / 2);\n' +
      '      background-image: repeating-linear-gradient(\n' +
      '          to left,\n' +
      '          transparent 0,\n' +
      '          transparent var(--half-gap),\n' +
      '          var(--grid-color) var(--half-gap),\n' +
      '          var(--grid-color) var(--grid-column-half-width-gap),\n' +
      '          transparent var(--grid-column-half-width-gap),\n' +
      '          transparent var(--grid-column-width-gap)\n' +
      '      );\n' +
      '      background-repeat: space;\n' +
      '      font-size: 20px;\n' +
      '      font-weight: 500;\n' +
      '      font-family: system-ui;\n' +
      '      padding: 5px var(--fields) 25px;\n' +
      '      text-align: center;\n' +
      '      color: #00000080;\n' +
      '      z-index: 9999;\n' +
      '    }',
    after:
      '    &::after {\n' +
      "      content: counter(variable) ' columns grid';\n" +
      '      position: absolute;\n' +
      '      top: 0;\n' +
      '      left: 0;\n' +
      '      width: 100%;\n' +
      '      height: calc(100% - 0px);\n' +
      '      background-image:\n' +
      '          linear-gradient(to left,  var(--padding-color) 0, var(--padding-color) var(--fields)),\n' +
      '          linear-gradient(to left, var(--padding-color) 0, var(--padding-color) var(--fields));\n' +
      '      background-size:\n' +
      '          var(--fields) 100%,\n' +
      '          var(--fields) 100%;\n' +
      '      background-position:\n' +
      '          0 0,\n' +
      '          100% 0;\n' +
      '      background-repeat: no-repeat;\n' +
      '      pointer-events: none;\n' +
      '      padding-top: 20px;\n' +
      '      font-size: 13px;\n' +
      '      font-weight: 500;\n' +
      '      text-align: center;\n' +
      '      color: #00000080;\n' +
      '      font-family: system-ui;\n' +
      '      z-index: 9999;\n' +
      '    }',
  },
  gridDefault: {
    display: 'grid',
    'grid-template-columns': 'repeat($columns, 1fr)',
    'grid-gap': 'var(--gap)',
    width: '100%',
  },
};

export default defaultSettings;
