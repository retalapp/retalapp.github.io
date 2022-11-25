import Handlebars from "handlebars";

export const templateLink = {
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
      name: 'label',
      fieldType: 'text',
      props: { placeholder: 'label...' },
      defaultValue: ''
    },
    {
      name: 'href',
      fieldType: 'text',
      props: { placeholder: 'Href...' },
      defaultValue: ''
    },
  ],
  generatorPreview: ({ label, href }) => (
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
        <a href={href}>{label}</a>
    </div>
  ),
  generatorTemplates: [
    {
      templateName: 'LINK Code',
      templateLanguage: 'json',
      templateContent: Handlebars.compile(
        [
          // `{`,
          `  // Starts LINK #{{name}}`,
          `  // Dependencies: "vtex.store-link": "0.x",`,
          `  "link.product#{{name}}__link": {`,
          `    "props": {`,
          `      "href": "{{href}}",`,
          `      "label": "{{label}}",`,
          `      "blockClass": "{{name}}"`,
          `    }`,
          `  },`,
          // `}`
        ].join('\n')
      ),
    },
    {
      templateName: 'LINK CSS',
      templateLanguage: 'css',
      templateContent: Handlebars.compile(
        [
          `/*  CSS for H1 #{{name}} vtex.store-link.css file*/`,
          `/*  Dependencies: "vtex.store-link": "0.x", */`,
          `.link--{{name}} {`,
          `  color: #000000;`,
          `  font-size: 13px;`,
          `  font-weight: 400;`,
          `  font-style: normal;`,
          `  line-height: 23px;`,
          `  text-transform: capitalize;`,
          `}`,
        ].join('\n')
      )
    }
  ]
};
