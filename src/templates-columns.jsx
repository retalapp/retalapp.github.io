import Handlebars from "handlebars";

export const templateColumns = {
  generatorName: 'Display columns',
  generatorFields: [
    {
      name: 'name',
      fieldType: 'text',
      props: { placeholder: 'Enter the #id...' },
      trim: true,
      defaultValue: ''
    },
    {
      name: 'columns',
      fieldType: 'list',
      props: { range: 12 },
      defaultValue: 1
    },
  ],
  generatorPreview: ({ columns }) => (
    <div
      style={{
        borderRadius: '8px',
        border: '1px solid transparent',
        padding: '0.6em',
        fontSize: '1em',
        fontWeight: '500',
        fontFamily: 'inherit',
        backgroundColor: '#1a1a1a',
        transition: 'border-color 0.25s',
        display: 'flex',
        gap: '10px',
        marginTop: '40px',
      }}
    >
      {[...Array(columns).keys()].map((index) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: '1',
            backgroundColor: 'hsl(0, 0%, 40%)',
            borderRadius: '8px',
            border: '1px solid transparent',
            padding: '0.6em 1.2em',
            minHeight: '100px',
          }}
          key={index}
        >
          {index + 1}
        </div>
      ))}
    </div>
  ),
  generatorTemplates: [
    {
      templateName: 'JSONC Code',
      templateLanguage: 'json',
      templateContent: Handlebars.compile(
        [
          `{`,
          `  // Starts ROW #{{name}}`,
          `  "flex-layout.row#{{name}}": {`,
          `    "children": [`,
          `      {{#columns}}`,
          `      "flex-layout.col#{{__parent.name}}__col{{index}}"{{#if nolast}},{{/if}}`,
          `      {{/columns}}`,
          `    ],`,
          `    "props": {`,
          `      "blockClass": "{{name}}",`,
          `      "colSizing": "equal", // auto|equal`,
          `      "preserveLayoutOnMobile": true,`,
          `      "horizontalAlign": "around", // left|right|center|between|around`,
          `      "colJustify": "justify-content", // justify-content|between|around`,
          `      "fullWidth": true,`,
          `      "colGap": 0 // 0...10`,
          `    }`,
          `  },`,
          `  `,
          `  {{#columns}}`,
          `  // Starts COL #{{index}}`,
          `  "flex-layout.col#{{__parent.name}}__col{{index}}": {`,
          `    "children": [`,
          `      "rich-text#{{__parent.name}}__contentcol{{index}}"`,
          `    ],`,
          `    "props": {`,
          `      "blockClass": "",`,
          `      "horizontalAlign": "center",`,
          `      "verticalAlign": "center"`,
          `    }`,
          `  },`,
          `  "rich-text#{{__parent.name}}__contentcol{{index}}": {`,
          `    "props": {`,
          `      "text": "COL # {{index}}",`,
          `      "blockClass": ""`,
          `    }`,
          `  }{{#if nolast}},{{/if}}`,
          `  {{/columns}}`,
          `}`
        ].join('\n')
      ),
    },
    {
      templateName: 'CSS Code',
      templateLanguage: 'css',
      templateContent: Handlebars.compile(
        [
          `.flexRow--{{name}} {`,
          `  /* background-color: blue */`,
          `}`,
          `/* Desktop */`,
          `.flexRow--{{name}} .flexRowContent--{{name}} {`,
          `  max-width: 1240px;`,
          `  margin: 0 auto;`,
          `  padding-top: 60px;`,
          `  padding-bottom: 60px;`,
          `}`,
          `.flexRow--{{name}} .flexColChild--{{name}}__maincol {`,
          `   /* background-color: pink */`,
          `}`,
          `/* Desktop small */`,
          `@media screen and (max-width: 1280px) {`,
          `  .flexRow--{{name}} {`,
          `    width: 100%;`,
          `    padding-right: 30px;`,
          `    padding-left: 30px;`,
          `  }`,
          `}`,
          `/* Tables sm */`,
          `@media screen and (max-width: 1024px) {`,
          `  .flexRow--{{name}} {`,
          `    width: 100%;`,
          `    padding-right: 15px;`,
          `    padding-left: 15px;`,
          `  }`,
          `}`,
          `/* Mobile small/tables sm */`, 
          `@media screen and (max-width: 768px) {`,
          `  .flexRow--{{name}} {`,
          `    width: 100%;`,
          `    padding-right: 15px;`,
          `    padding-left: 15px;`,
          `  }`,
          `  .flexRow--{{name}} .flexRowContent--{{name}} {`,
          `    flex-flow: column;`,
          `  }`,
          `  .flexRow--{{name}} .flexRowContent--{{name}} .stretchChildrenWidth {`,
          `    width: 100% !important;`,
          `  }`,
          `}`,
          `/* Mobile sm */`,
          `@media screen and (max-width: 390px) {`,
          `  .flexRow--{{name}} {`,
          `    width: 100%;`,
          `    padding-right: 15px;`,
          `    padding-left: 15px;`,
          `  }`,
          `  .flexRow--{{name}} .flexRowContent--{{name}} {`,
          `    flex-flow: column;`,
          `  }`,
          `  .flexRow--{{name}} .flexRowContent--{{name}} .stretchChildrenWidth {`,
          `    width: 100% !important;`,
          `  }`,
          `}`
        ].join('\n')
      )
    }
  ]
};
