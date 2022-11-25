import Handlebars from "handlebars";

export const templateH1 = {
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
      name: 'content',
      fieldType: 'text',
      props: { placeholder: 'h1 text...' },
      defaultValue: ''
    },
  ],
  generatorPreview: ({ content }) => (
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
        marginTop: '40px',
      }}
    >
        <h1>{content}</h1>
    </div>
  ),
  generatorTemplates: [
    {
      templateName: 'RICH TEXT Code',
      templateLanguage: 'json',
      templateContent: Handlebars.compile(
        [
          // `{`,
          `  // Starts H1 #{{name}}`,
          `  "rich-text#{{name}}": {`,
          `    "props":{`,
          `      "text": "# {{content}}",`,
          `      "blockClass": "{{name}}"`,
          `    }`,
          `  },`,
          // `}`
        ].join('\n')
      ),
    },
    {
      templateName: 'H1 CSS',
      templateLanguage: 'css',
      templateContent: Handlebars.compile(
        [
          `/*  CSS for H1 #{{name}}*/`,
          `.container--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} .headingLevel1--{{name}} {}`,
        ].join('\n')
      )
    }
  ]
};
