import { useState, useMemo, useEffect } from 'react'
import './App.css'
import Editor from 'react-simple-code-editor';
import { markdown } from 'markdown';
import { highlight, languages } from 'prismjs/components/prism-core';
import { templateRows } from './templates-rows';
import { templateColumns } from './templates-columns';
import { templateRichText } from './templates-rich-text';
import { templateH1 } from './templates-h1';
import { templateLink } from './templates-link';
import { templateImage } from './templates-image';
import { templateSlider } from './templates-slider';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css'; //Example style, you can use another

const generatorList = {
  templateColumns,
  templateRows,
  templateRichText,
  templateH1,
  templateLink,
  templateImage,
  templateSlider
};

function App() {
  const [generatorName, setGeneratorName] = useState('')
  const [values, setValues] = useState({})

  function handleValues(field) {
    return function (value) {
      setValues(prevValue => ({ ...prevValue, [field]: value }))
    }
  }

  function handleGeneratorName(e) {
    setGeneratorName(e.target.value)
  }
  
  const selectedGenerator = useMemo(() => {
    if (generatorName && generatorList[generatorName]) {
      return generatorList[generatorName]
    }
    return undefined
  }, [generatorName])

  useEffect(() => {
    if (generatorName) {
      setValues(() => {
        const newValue = {}
        selectedGenerator.generatorFields.forEach(({ defaultValue, name }) => {
          newValue[name] = defaultValue;
        })
        return newValue;
      })
    }
  }, [generatorName])

  const GeneratorPreview = selectedGenerator ? selectedGenerator?.generatorPreview: null

  return (
    <div style={{
      display: 'flex',
      paddingRight: '28px',
      paddingLeft: '28px',
      gap: '28px',
      fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '400',
      color: 'rgba(255, 255, 255, 0.87)',
      backgroundColor: '#242424',
      height: '100vh'
    }}>
      <div style={{
        width: '50%',
      }}>
        <h1 style={{
          fontSize: '3.2em',
          lineHeight: '1.1',
        }}>Flex layout</h1>
        <select
          style={{
            display: 'block',
            borderRadius:'8px',
            border: '1px solid transparent',
            padding: '.6em .8em',
            fontSize:'2em',
            fontWeight: 600,
            fontFamily: 'inherit',
            transition: 'border-color 0.25s',
            width: '100%',
            boxSizing: 'border-box',
          }}
          value={generatorName}
          onChange={handleGeneratorName}
        >
          <option value=""></option>
          {Object.keys(generatorList).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        {selectedGenerator && (
          <>
            {
              selectedGenerator.generatorFields.map(({ name, props, fieldType }) => {
                const FieldComponent = fieldTypes[fieldType]
                return <FieldComponent key={name} {...props} value={values[name]} onChange={handleValues(name)} />
              })
            }
            <div className='preview-box'>
              {selectedGenerator && <GeneratorPreview {...mapAndFormatValues(values, selectedGenerator.generatorFields)} />} 
            </div>
          </>
        )}
      </div>
      <div style={{
        width: '50%',
      }}>
        {selectedGenerator && (<>
          {selectedGenerator.generatorTemplates?.map(({templateName, templateLanguage, templateContent }) => (
            <Code
              key={templateName}
              code={templateContent(mapAndFormatValues(values, selectedGenerator.generatorFields))}
              language={templateLanguage}
            />
          ))}
        </>)}
      </div>
    </div>
  )
}

export default App

export function Code({ code, setCode, language = 'json' }) {
  const [copied, setCopied] = useState(false)

  function handleCopyCode() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }).catch(() => {
      console.error('Didnt copy')
    });
  }

  return (
    <div style={{
      position: 'relative',
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
    }}>
      <button
        title="Copy Code"
        onClick={handleCopyCode}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: '3',
          display: 'block',
          justifyContent: 'center',
          alignItems: 'center',
          borderradius: '8px',
          border: '1px solid transparent',
          padding: '0.6em 1.2em',
          fontSize: '1em',
          fontWeight: '500',
          fontFamily: 'inherit',
          backgroundColor: '#1a1a1a',
          cursor: 'pointer',
          transition: 'border-color 0.25s',
        }}
      >
          {copied?'Copied':'Copy'}    
      </button>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages[language] || languages.json)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 18,
        }}
      />
    </div>
  );
}

const fieldTypes = {
  text: TextField,
  textarea: TextAreaField,
  list: ListField,
}

function TextField(props) {

  return (<>
    <input
      style={{
        display: 'block',
        borderRadius:'8px',
        border: '1px solid transparent',
        padding: '.8em 1em',
        marginTop: '.6em',
        fontSize:'2em',
        fontWeight: 600,
        fontFamily: 'inherit',
        transition: 'border-color 0.25s',
        width: '100%',
        boxSizing: 'border-box',
      }}
      type="text"
      placeholder=""
      {...props}
      onChange={(e) => props.onChange(e.target.value)}
    />
  </>)
}

function TextAreaField(props) {

  return (<>
    <textarea
      style={{
        display: 'block',
        borderRadius:'8px',
        border: '1px solid transparent',
        padding: '.8em 1em',
        marginTop: '.6em',
        fontSize:'2em',
        fontWeight: 600,
        fontFamily: 'inherit',
        transition: 'border-color 0.25s',
        width: '100%',
        boxSizing: 'border-box',
      }}
      placeholder=""
      {...props}
      onChange={(e) => props.onChange(e.target.value)}
    />
  </>)
}

function ListField({ range, value, onChange }) {

  return (<>
    <div style={{
      paddingTop: '2em',
      paddingBottom: '2em',
    }}>
      <ul style={{
        display: 'block',
        margin: 0,
        padding: 0,
      }}>
        {[...Array(range).keys()].map((index) => (
          <li
            key={index}
            style={{
              display: 'inline-block',
              margin: 0,
              padding: '4px',
            }}
          >
            <button
              className={value === index + 1 ?'active':''}
              style={{
                borderRadius: '8px',
                border: '1px solid transparent',
                padding: '0.6em 1.2em',
                fontSize: '1em',
                fontWeight: '500',
                fontFamily: 'inherit',
                backgroundColor:value === index + 1  ?'#1a1a1a': '#f0f0f0',
                color:value === index + 1  ?'#f0f0f0': '#1a1a1a',
                cursor: 'pointer',
                transition: 'border-color 0.25s',
              }}
              onClick={() => onChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </>)
}

// Utils
function mapAndFormatValues(values, generatorFields) {

  const result = {};
  generatorFields.forEach((field) => {
    if (values[field.name]) {
      if (field.trim) {
        result[field.name] = values[field.name]?.trim().toLocaleLowerCase().replace(/\s/g, '-');
      }
      if (field.md) {
        result[field.name] = values[field.name]?.trim().replace(/\n/g, '\\n');
        result[`${field.name}__md`] = markdown.toHTML(values[field.name])
      }
    }
  })
  const listFields = generatorFields
    .filter((field) => field.fieldType === 'list')
    .map((field) => field.name);
  listFields.forEach(field => {
    const selectedValues = [...Array(values[field]).keys()]
    result[`${field}`] = selectedValues.map((index) => ({
      index: index+1,
      nolast: selectedValues.length !== index+1,
      __parent: values,
    }))
  })
  return { ...values, ...result }
}