import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button, Stack } from 'react-bootstrap'

import './App.css'

import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { SectionType } from './types.d'
import { LanguageSelector } from './components/LanguageSelector'
import TextArea from './components/TextArea'
import { useEffect } from 'react'
import { translateFree } from './services/translateFree'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    switchLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debounceFromText = useDebounce(fromText)

  // const controller = new AbortController()

  useEffect(() => {
    if (debounceFromText === '') return
    translateFree({ fromLanguage, toLanguage, fromText: debounceFromText })
      .then((result) => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
    // return () => {
    //   controller.abort()
    // }
  }, [debounceFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    speechSynthesis.speak(utterance)
  }

  return (
    <>
    <Container fluid>
      <h1 style={{ textAlign: 'center', color: 'green', paddingBottom: '50px' }}>Translate Free</h1>
      <Row>
        <Col>
        <Stack gap={2}>
          <LanguageSelector onChange={setFromLanguage} type={SectionType.From} value={fromLanguage} />
          <TextArea type={SectionType.From} value={fromText} onChange={setFromText} />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button variant='link' onClick={switchLanguages} disabled={fromLanguage === AUTO_LANGUAGE}>
          <ArrowsIcon />
          </Button>
        </Col>

        <Col>
        <Stack gap={2}>
          <LanguageSelector onChange={setToLanguage} type={SectionType.To} value={toLanguage}/>
          <div style={{ position: 'relative' }}>
          <TextArea
            type={SectionType.To}
            value={result}
            onChange={setResult}
            loading={loading}
          />
            <div style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              opacity: 0.5,
              display: result === '' ? 'none' : 'flex'
            }}>
              <Button variant='link' onClick={handleSpeak}>
                <SpeakerIcon />
              </Button>
              <Button variant='link' onClick={handleClipboard}>
                <ClipboardIcon />
              </Button>
            </div>
          </div>
          </Stack>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default App
