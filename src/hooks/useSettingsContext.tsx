import { useContext } from 'react'
import SettingsContext from '../contexts/SettingsContext'

export const useSettingsContext = () => {
  return useContext(SettingsContext)
}
