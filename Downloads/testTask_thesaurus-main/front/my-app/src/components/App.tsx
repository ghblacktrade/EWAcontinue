import React, { FC, useState } from 'react';

import './App.css'
import { ResTranslation } from '../interfaces/translation.interface'

const App:FC<ResTranslation> = ({
  success,
  translation,
  message
}) => {

  const [rusWord, setRusWord] = useState<string>('')
  const [engWords, setEngWords] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRusWord(event.target.value)
  }

  const handleTranslateClick = async (): Promise<void> => {

    try {

      const response = await fetch(`http://localhost:3000/translate/${rusWord}`);
      const data: ResTranslation = await response.json()

      if (data.success) {
        setEngWords(data.translation!)

      } else {

        setEngWords(data.message!)

      }
    } catch (error) {

      console.error(error)

      setEngWords('Internal server error')
    }
  }

  return (
    <div>

      <input type="text" value={rusWord} onChange={handleInputChange} />
      <button onClick={handleTranslateClick}>Translate</button>
      <div>{engWords}</div>

    </div>
  )
}

export default App;
