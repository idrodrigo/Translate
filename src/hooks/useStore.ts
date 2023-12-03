import { useReducer } from 'react'
import { type Language, type Action, type State, type FromLanguage } from '../types'
import { AUTO_LANGUAGE } from '../constants'

const inicialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

const reducer = (state: State, action: Action) => {
  const { type } = action

  if (type === 'SWITCH_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      loading,
      result: state.fromText,
      fromText: state.result,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }
  if (type === 'SET_FROM_LANGUAGE') {
    if (action.payload === state.fromLanguage) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    }
  }
  if (type === 'SET_TO_LANGUAGE') {
    if (action.payload === state.toLanguage) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    }
  }
  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''
    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    }
  }
  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

export function useStore () {
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, inicialState)

  const switchLanguages = () => dispatch({ type: 'SWITCH_LANGUAGES' })
  const setFromLanguage = (payload: FromLanguage) => dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  const setToLanguage = (payload: Language) => dispatch({ type: 'SET_TO_LANGUAGE', payload })
  const setFromText = (payload: string) => dispatch({ type: 'SET_FROM_TEXT', payload })
  const setResult = (payload: string) => dispatch({ type: 'SET_RESULT', payload })

  return {
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
  }
}
