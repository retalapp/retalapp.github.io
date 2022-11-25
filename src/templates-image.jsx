import Handlebars from "handlebars";

export const templateImage = {
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
      name: 'src',
      fieldType: 'text',
      props: { placeholder: 'Src...' },
      defaultValue: ''
    },
    {
      name: 'alt',
      fieldType: 'text',
      props: { placeholder: 'Alt...' },
      defaultValue: ''
    },
    {
      name: 'link',
      fieldType: 'text',
      props: { placeholder: 'Link...' },
      defaultValue: ''
    },
  ],
  generatorPreview: ({ src, alt, link }) => (
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
      <a href={link || '#'}>
        <img src={src} alt={alt} title={alt} />
      </a>
    </div>
  ),
  generatorTemplates: [
    {
      templateName: 'JSONC Code',
      templateLanguage: 'json',
      templateContent: Handlebars.compile(
        [
          // `{`,
          `  // Starts MAIN ROW #{{name}}`,
          `  "image#{{name}}__image": {`,
          `    "props": {`,
          `      "src": "{{src}}",`,
          `      "title": "{{alt}}",`,
          `      "alt": "{{alt}}",`,
          `      "link": "{{link}}",`,
          `      // "maxHeight": 500, // Max height of the image.`,
          `      // "maxWidth": 500, // Max width of the image.`,
          `      // "sizes": "", // Different image sizes for each page layout.`,
          `      "blockClass": "{{name}}"`,
          `    }`,
          `  },`,
          // `}`,
        ].join('\n')
      ),
    },
    {
      templateName: 'CSS Code',
      templateLanguage: 'css',
      templateContent: Handlebars.compile(
        [
          `/* IMAGE CSS {{name}} vtex.store-components.css */`,
          `.imageElement--{{name}} {`,
          ``,
          `}`,
        ].join('\n')
      )
    }
  ]
};
