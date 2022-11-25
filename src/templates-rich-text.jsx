import Handlebars from "handlebars";

export const templateRichText = {
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
      fieldType: 'textarea',
      props: { placeholder: 'Content...' },
      defaultValue: '',
      md: true,
    },
  ],
  generatorPreview: ({ content__md }) => (
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
      dangerouslySetInnerHTML={{__html: content__md}}>
    </div>
  ),
  generatorTemplates: [
    {
      templateName: 'RICH TEXT Code',
      templateLanguage: 'json',
      templateContent: Handlebars.compile(
        [
          // `{`,
          `  // Starts RICH TEXT #{{name}}`,
          `  "rich-text#{{name}}": {`,
          `    "props":{`,
          `      "text": "{{content}}",`,
          `      "blockClass": "{{name}}"`,
          `    }`,
          `  },`,
          // `}`
        ].join('\n')
      ),
    },
    {
      templateName: 'RICH TEXT CSS',
      templateLanguage: 'css',
      templateContent: Handlebars.compile(
        [
          `/*  CSS for Rich Text #{{name}}*/`,
          `.container--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} .headingLevel1--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} .headingLevel2--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} .headingLevel3--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} .headingLevel4--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} .headingLevel5--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} .headingLevel6--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} .paragraph--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} .link--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} .strong--{{name}} {}`,
          `.container--{{name}} .wrapper--{{name}} .italic--{{name}} {}`,
        ].join('\n')
      )
    }
  ]
};
