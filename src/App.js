import {useState, useEffect} from 'react'
import {ConfigProvider, Button, InputNumber, Space} from 'antd'
import { loremIpsum } from 'lorem-ipsum';
import words from './words'
import './App.css';

function App() {

  const [text, updateText] = useState('')
  const [number, updateNumber] = useState(3)

  const onCopy = () => {
    const parsedText = text.replaceAll('<p>', '\n').replaceAll('</p>', '')
    navigator.clipboard.writeText(parsedText)
  }

  const onGenerate = () => {
    updateText(loremIpsum({
      count: number,               
      format: "html",         // "plain" or "html"
      paragraphLowerBound: 3,  // Min. number of sentences per paragraph.
      paragraphUpperBound: 7,  // Max. number of sentences per paragraph.
      random: Math.random,     // A PRNG function
      sentenceLowerBound: 5,   // Min. number of words per sentence.
      sentenceUpperBound: 15,  // Max. number of words per sentence.
      suffix: "\n",            // Line ending, defaults to "\n" or "\r\n" (win32)
      units: 'paragraphs',      // paragraph(s), "sentence(s)", or "word(s)"
      words,
    }))
  }

  useEffect(() => {
    updateText(loremIpsum({
      count: number,                // Number of "words", "sentences", or "paragraphs"
      format: "html",         // "plain" or "html"
      paragraphLowerBound: 3,  // Min. number of sentences per paragraph.
      paragraphUpperBound: 7,  // Max. number of sentences per paragraph.
      random: Math.random,     // A PRNG function
      sentenceLowerBound: 5,   // Min. number of words per sentence.
      sentenceUpperBound: 15,  // Max. number of words per sentence.
      suffix: "\n",            // Line ending, defaults to "\n" or "\r\n" (win32)
      units: "paragraphs",      // paragraph(s), "sentence(s)", or "word(s)"
      words,      // Array of words to draw from
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#21b96b',
        colorSecondary: '#a6e329',
      },
    }}
  >
    <div className="App">
      <div className="App-header">
        <h1>
          Lorem Simlish
        </h1>
        <Space>
          <InputNumber addonBefore="Paragraphs:" value={number} min={1} max={50} defaultValue={3} onChange={(e) => updateNumber(e)} />
          <Button onClick={onGenerate} type="primary">Generate</Button>
          <Button type="secondary" onClick={onCopy}>Copy</Button>
        </Space>
        <div
          dangerouslySetInnerHTML={{__html: text}}
        />
        <Space>
          <Button type="link" target="_blank" href="https://crumplebottomacademy.com/">Read my sim stories!</Button>
        </Space>
      </div>
    </div>
    </ConfigProvider>
  );
}

export default App;
