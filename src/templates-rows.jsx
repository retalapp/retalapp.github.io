import Handlebars from "handlebars";

export const templateRows = {
  generatorName: 'Display rows',
  generatorFields: [
    {
      name: 'name',
      fieldType: 'text',
      props: { placeholder: 'Enter the #id...' },
      trim: true,
      defaultValue: ''
    },
    {
      name: 'rows',
      fieldType: 'list',
      props: { range: 12 },
      defaultValue: 1
    },
  ],
  generatorPreview: ({ rows }) => (
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
        flexDirection: 'column',
      }}
    >
      {[...Array(rows).keys()].map((index) => (
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
          `  // Starts MAIN ROW #{{name}}`,
          `  "flex-layout.row#{{name}}": {`,
          `    "children": [`,
          `      "flex-layout.col#{{name}}__maincol"`,
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
          `  // Starts MAIN COLUMN #{{name}}`,
          `  "flex-layout.col#{{name}}__maincol": {`,
          `    "children": [`,
          `      {{#rows}}`,
          `      "flex-layout.row#{{__parent.name}}__row{{index}}"{{#if nolast}},{{/if}}`,
          `      {{/rows}}`,
          `    ],`,
          `    "props": {`,
          `      "blockClass": "{{name}}__maincol"`,
          `    }`,
          `  },`,
          `  `,
          `  {{#rows}}`,
          `  // Starts ROW #{{index}}`,
          `  "flex-layout.row#{{__parent.name}}__row{{index}}": {`,
          `    "children": [`,
          `      "flex-layout.col#{{__parent.name}}__row-col{{index}}"`,
          `    ],`,
          `    "props": {`,
          `      "blockClass": "",`,
          `      "colSizing": "equal", // auto|equal`,
          `      "preserveLayoutOnMobile": true,`,
          `      "horizontalAlign": "around", // left|right|center|between|around`,
          `      "colJustify": "justify-content", // justify-content|between|around`,
          `      "fullWidth": true,`,
          `      "colGap": 0 // 0...10`,
          `    }`,
          `  },`,
          `  "flex-layout.col#{{__parent.name}}__row-col{{index}}": {`,
          `    "children": [`,
          `      "rich-text#{{__parent.name}}__contentrow{{index}}"`,
          `    ],`,
          `    "props": {`,
          `      "blockClass": "",`,
          `      "horizontalAlign": "center"`,
          `    }`,
          `  },`,
          `  "rich-text#{{__parent.name}}__contentrow{{index}}": {`,
          `    "props": {`,
          `      "text": "ROW # {{index}}",`,
          `      "blockClass": ""`,
          `    }`,
          `  }{{#if nolast}},{{/if}}`,
          `  {{/rows}}`,
          `}`,
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
          `}`,
          `/* Mobile sm */`,
          `@media screen and (max-width: 390px) {`,
          `  .flexRow--{{name}} {`,
          `    width: 100%;`,
          `    padding-right: 15px;`,
          `    padding-left: 15px;`,
          `  }`,
          `}`,
        ].join('\n')
      )
    }
  ]
};
