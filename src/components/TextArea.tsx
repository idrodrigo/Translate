import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  value: string
  loading?: boolean
  onChange: (value: string) => void
}

const commonStyle = {
  height: '300px',
  width: '300px',
  border: 0,
  resize: 'none'
}

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (SectionType.From === type) return 'Enter text'
  if (loading === true) return 'Translating...'
  return 'Translation'
}

const TextArea: React.FC<Props> = ({ loading, type, value, onChange }) => {
  const styles = type === SectionType.From
    ? commonStyle
    : { ...commonStyle, backgroundColor: '#eee' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      as='textarea'
      rows={3}
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SectionType.From}
      style={styles}
      value={value}
      onChange={handleChange}
      disabled={SectionType.To === type}
    />
  )
}

export default TextArea
