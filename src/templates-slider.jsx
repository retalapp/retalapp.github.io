import Handlebars from "handlebars";

export const templateSlider = {
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
      name: 'image1',
      fieldType: 'text',
      props: { placeholder: 'Image 1...' },
      defaultValue: ''
    },
    {
      name: 'image2',
      fieldType: 'text',
      props: { placeholder: 'Image 2...' },
      defaultValue: ''
    },
    {
      name: 'image3',
      fieldType: 'text',
      props: { placeholder: 'Image 3...' },
      defaultValue: ''
    },
    {
      name: 'image4',
      fieldType: 'text',
      props: { placeholder: 'Image 4...' },
      defaultValue: ''
    },
    {
      name: 'image5',
      fieldType: 'text',
      props: { placeholder: 'Image 5...' },
      defaultValue: ''
    },
  ],
  generatorPreview: ({ image1, image2, image3, image4, image5 }) => (
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
      <img src={image1} alt='' title='' />
      <img src={image2} alt='' title='' />
      <img src={image3} alt='' title='' />
      <img src={image4} alt='' title='' />
      <img src={image5} alt='' title='' />
    </div>
  ),
  generatorTemplates: [
    {
      templateName: 'JSONC Code',
      templateLanguage: 'json',
      templateContent: Handlebars.compile(
        [
          // `{`,
				`  // Starts SLIDER #{{name}}`,
				`  // Dependencies: "vtex.store-media": "0.x"`,
				`  "list-context.media-list#{{name}}": {`,
				`    "children": ["slider-layout#{{name}}-media"],`,
				`     "props": {`,
				`       "height": 720,`,
				`       "mediaList": [`,
				`          {`,
				`            "image": "{{image1}}"`,
				`          },`,
				`          {`,
				`            "image": "{{image2}}"`,
				`          },`,
				`          {`,
				`            "image": "{{image3}}"`,
				`          },`,
				`          {`,
				`            "image": "{{image4}}"`,
				`          },`,
				`          {`,
				`            "image": "{{image5}}"`,
				`          }`,
				`        ]`,
				`    }`,
				`  },`,
				`  "slider-layout#{{name}}-media": {`,
				`    "props": {`,
				`      "itemsPerPage": 1,`,
				`      "infinite": true,`,
				`      "showNavigationArrows": "desktopOnly",`,
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
          `/* IMAGE CSS {{name}} vtex.store-media.css */`,
          `/* Dependencies: "vtex.store-media": "0.x" */`,
          `.sliderLayoutContainer--{{name}} {`,
          ``,
          `}`,
        ].join('\n')
      )
    }
  ]
};
