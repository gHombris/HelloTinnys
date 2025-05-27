"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RotateCcw, Volume2, Lightbulb } from "lucide-react"

interface WordPuzzleGameProps {
  language: string
  theme: string
  colorBlindness: string
  onClose: () => void
}

const wordLists = {
  pt: [
    { word: "ACESSIBILIDADE", hint: "Qualidade de ser acessível a todos" },
    { word: "INCLUSAO", hint: "Ato de incluir e integrar" },
    { word: "TECNOLOGIA", hint: "Aplicação de conhecimentos científicos" },
    { word: "USUARIO", hint: "Pessoa que usa um sistema" },
    { word: "INTERFACE", hint: "Ponto de interação entre sistemas" },
    { word: "NAVEGACAO", hint: "Ato de navegar por um site" },
    { word: "CONTRASTE", hint: "Diferença entre cores ou tons" },
    { word: "AUDIO", hint: "Som ou sinal sonoro" },
  ],
  en: [
    { word: "ACCESSIBILITY", hint: "Quality of being accessible to all" },
    { word: "INCLUSION", hint: "Act of including and integrating" },
    { word: "TECHNOLOGY", hint: "Application of scientific knowledge" },
    { word: "USER", hint: "Person who uses a system" },
    { word: "INTERFACE", hint: "Point of interaction between systems" },
    { word: "NAVIGATION", hint: "Act of navigating through a site" },
    { word: "CONTRAST", hint: "Difference between colors or tones" },
    { word: "AUDIO", hint: "Sound or audio signal" },
  ],
  es: [
    { word: "ACCESIBILIDAD", hint: "Calidad de ser accesible a todos" },
    { word: "INCLUSION", hint: "Acto de incluir e integrar" },
    { word: "TECNOLOGIA", hint: "Aplicación de conocimientos científicos" },
    { word: "USUARIO", hint: "Persona que usa un sistema" },
    { word: "INTERFAZ", hint: "Punto de interacción entre sistemas" },
    { word: "NAVEGACION", hint: "Acto de navegar por un sitio" },
    { word: "CONTRASTE", hint: "Diferencia entre colores o tonos" },
    { word: "AUDIO", hint: "Sonido o señal de audio" },
  ],
  fr: [
    { word: "ACCESSIBILITE", hint: "Qualité d'être accessible à tous" },
    { word: "INCLUSION", hint: "Acte d'inclure et d'intégrer" },
    { word: "TECHNOLOGIE", hint: "Application de connaissances scientifiques" },
    { word: "UTILISATEUR", hint: "Personne qui utilise un système" },
    { word: "INTERFACE", hint: "Point d'interaction entre systèmes" },
    { word: "NAVIGATION", hint: "Acte de naviguer sur un site" },
    { word: "CONTRASTE", hint: "Différence entre couleurs ou tons" },
    { word: "AUDIO", hint: "Son ou signal audio" },
  ],
  ru: [
    { word: "ДОСТУПНОСТЬ", hint: "Качество быть доступным для всех" },
    { word: "ВКЛЮЧЕНИЕ", hint: "Акт включения и интеграции" },
    { word: "ТЕХНОЛОГИЯ", hint: "Применение научных знаний" },
    { word: "ПОЛЬЗОВАТЕЛЬ", hint: "Человек, использующий систему" },
    { word: "ИНТЕРФЕЙС", hint: "Точка взаимодействия между системами" },
    { word: "НАВИГАЦИЯ", hint: "Акт навигации по сайту" },
    { word: "КОНТРАСТ", hint: "Разница между цветами или тонами" },
    { word: "АУДИО", hint: "Звук или аудиосигнал" },
  ],
}

const translations = {
  pt: {
    title: "Quebra-cabeça de Palavras",
    score: "Pontuação",
    level: "Nível",
    hint: "Dica",
    found: "Encontradas",
    guess: "Sua resposta",
    submit: "Enviar",
    newGame: "Novo Jogo",
    showHint: "Mostrar Dica",
    correct: "Correto!",
    wrong: "Tente novamente",
    gameWon: "Parabéns! Todas as palavras encontradas!",
    instructions: "Digite a palavra que corresponde à dica. Use Tab para navegar.",
    wordFound: "Palavra encontrada",
    hintAnnouncement: "Dica",
  },
  en: {
    title: "Word Puzzle",
    score: "Score",
    level: "Level",
    hint: "Hint",
    found: "Found",
    guess: "Your answer",
    submit: "Submit",
    newGame: "New Game",
    showHint: "Show Hint",
    correct: "Correct!",
    wrong: "Try again",
    gameWon: "Congratulations! All words found!",
    instructions: "Type the word that matches the hint. Use Tab to navigate.",
    wordFound: "Word found",
    hintAnnouncement: "Hint",
  },
  es: {
    title: "Rompecabezas de Palabras",
    score: "Puntuación",
    level: "Nivel",
    hint: "Pista",
    found: "Encontradas",
    guess: "Tu respuesta",
    submit: "Enviar",
    newGame: "Nuevo Juego",
    showHint: "Mostrar Pista",
    correct: "¡Correcto!",
    wrong: "Inténtalo de nuevo",
    gameWon: "¡Felicidades! ¡Todas las palabras encontradas!",
    instructions: "Escribe la palabra que corresponde a la pista. Usa Tab para navegar.",
    wordFound: "Palabra encontrada",
    hintAnnouncement: "Pista",
  },
  fr: {
    title: "Puzzle de Mots",
    score: "Score",
    level: "Niveau",
    hint: "Indice",
    found: "Trouvés",
    guess: "Votre réponse",
    submit: "Soumettre",
    newGame: "Nouveau Jeu",
    showHint: "Montrer l'Indice",
    correct: "Correct!",
    wrong: "Réessayez",
    gameWon: "Félicitations! Tous les mots trouvés!",
    instructions: "Tapez le mot qui correspond à l'indice. Utilisez Tab pour naviguer.",
    wordFound: "Mot trouvé",
    hintAnnouncement: "Indice",
  },
  ru: {
    title: "Словесная Головоломка",
    score: "Счет",
    level: "Уровень",
    hint: "Подсказка",
    found: "Найдено",
    guess: "Ваш ответ",
    submit: "Отправить",
    newGame: "Новая Игра",
    showHint: "Показать Подсказку",
    correct: "Правильно!",
    wrong: "Попробуйте снова",
    gameWon: "Поздравляем! Все слова найдены!",
    instructions: "Введите слово, которое соответствует подсказке. Используйте Tab для навигации.",
    wordFound: "Слово найдено",
    hintAnnouncement: "Подсказка",
  },
}

export default function WordPuzzleGame({ language, theme, colorBlindness, onClose }: WordPuzzleGameProps) {
  const [currentWord, setCurrentWord] = useState<{ word: string; hint: string } | null>(null)
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [guess, setGuess] = useState<string>("")
  const [score, setScore] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const [showHint, setShowHint] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<string>("")
  const [hintUsed, setHintUsed] = useState<boolean>(false)

  const t = translations[language as keyof typeof translations] || translations.pt
  const words = wordLists[language as keyof typeof wordLists] || wordLists.pt

  // Função para anunciar texto para leitores de tela
  const announceText = useCallback((text: string) => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.className = "sr-only"
    announcement.textContent = text
    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 1000)
  }, [])

  // Função para reproduzir som (simulado com vibração se disponível)
  const playSound = useCallback((type: "correct" | "wrong" | "hint" | "levelUp") => {
    if ("vibrate" in navigator) {
      switch (type) {
        case "correct":
          navigator.vibrate([100, 50, 100])
          break
        case "wrong":
          navigator.vibrate(200)
          break
        case "hint":
          navigator.vibrate(100)
          break
        case "levelUp":
          navigator.vibrate([200, 100, 200, 100, 200])
          break
      }
    }
  }, [])

  // Selecionar nova palavra
  const selectNewWord = useCallback(() => {
    const availableWords = words.filter((w) => !foundWords.includes(w.word))
    if (availableWords.length === 0) {
      // Todas as palavras encontradas - próximo nível
      setLevel((prev) => prev + 1)
      setFoundWords([])
      setScore((prev) => prev + level * 100)
      playSound("levelUp")
      announceText(t.gameWon)
      return
    }

    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)]
    setCurrentWord(randomWord)
    setGuess("")
    setShowHint(false)
    setHintUsed(false)
    setFeedback("")
  }, [words, foundWords, level, t, playSound, announceText])

  // Verificar resposta
  const checkAnswer = useCallback(() => {
    if (!currentWord || !guess.trim()) return

    const normalizedGuess = guess.trim().toUpperCase()
    const normalizedWord = currentWord.word.toUpperCase()

    if (normalizedGuess === normalizedWord) {
      // Resposta correta
      const points = hintUsed ? 50 : 100
      setScore((prev) => prev + points)
      setFoundWords((prev) => [...prev, currentWord.word])
      setFeedback(t.correct)
      playSound("correct")
      announceText(`${t.correct} ${t.wordFound}: ${currentWord.word}`)

      setTimeout(() => {
        selectNewWord()
      }, 1500)
    } else {
      // Resposta incorreta
      setFeedback(t.wrong)
      playSound("wrong")
      announceText(t.wrong)

      setTimeout(() => {
        setFeedback("")
      }, 1500)
    }
  }, [currentWord, guess, hintUsed, t, playSound, announceText, selectNewWord])

  // Mostrar dica
  const handleShowHint = useCallback(() => {
    if (currentWord) {
      setShowHint(true)
      setHintUsed(true)
      playSound("hint")
      announceText(`${t.hintAnnouncement}: ${currentWord.hint}`)
    }
  }, [currentWord, t, playSound, announceText])

  // Navegação por teclado
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
          if (e.target === document.querySelector('input[type="text"]')) {
            e.preventDefault()
            checkAnswer()
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
        case "F1":
          e.preventDefault()
          handleShowHint()
          break
      }
    },
    [checkAnswer, onClose, handleShowHint],
  )

  // Inicializar jogo
  useEffect(() => {
    selectNewWord()
  }, [selectNewWord])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const getColorBlindnessFilter = () => {
    switch (colorBlindness) {
      case "deuteranopia":
        return "hue-rotate-[240deg] saturate-50"
      case "protanopia":
        return "hue-rotate-[180deg] saturate-75"
      case "tritanopia":
        return "hue-rotate-[60deg] saturate-50"
      default:
        return ""
    }
  }

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${getColorBlindnessFilter()}`}>
      <Card className={`max-w-2xl w-full mx-4 p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t.title}</h2>
          <Button variant="outline" onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* Instruções de acessibilidade */}
        <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-4 h-4" />
            <span className="font-semibold">Instruções:</span>
          </div>
          <p className="text-sm">{t.instructions}</p>
          <p className="text-xs mt-1">Pressione F1 para dica sonora</p>
        </div>

        {/* Status do jogo */}
        <div className="flex gap-4 mb-6">
          <Badge variant="secondary">
            {t.level}: {level}
          </Badge>
          <Badge variant="secondary">
            {t.score}: {score}
          </Badge>
          <Badge variant="secondary">
            {t.found}: {foundWords.length}/{words.length}
          </Badge>
        </div>

        {/* Área do jogo */}
        {currentWord && (
          <div className="space-y-6">
            {/* Dica */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  onClick={handleShowHint}
                  variant="outline"
                  className="flex items-center gap-2"
                  aria-label={`${t.showHint}. Pressione F1 como atalho`}
                >
                  <Lightbulb className="w-4 h-4" />
                  {t.showHint}
                </Button>
              </div>

              {showHint && (
                <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <p className="text-lg font-medium" aria-live="polite">
                    <strong>{t.hint}:</strong> {currentWord.hint}
                  </p>
                </div>
              )}
            </div>

            {/* Input de resposta */}
            <div className="space-y-4">
              <div>
                <label htmlFor="word-input" className="block text-sm font-medium mb-2">
                  {t.guess}:
                </label>
                <Input
                  id="word-input"
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Digite sua resposta..."
                  className="text-lg text-center"
                  autoFocus
                  aria-describedby="word-input-help"
                />
                <div id="word-input-help" className="sr-only">
                  Digite a palavra que corresponde à dica fornecida
                </div>
              </div>

              <Button onClick={checkAnswer} className="w-full" disabled={!guess.trim()}>
                {t.submit}
              </Button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div
                className={`text-center p-3 rounded-lg ${
                  feedback === t.correct
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                }`}
              >
                <p className="font-bold" aria-live="polite">
                  {feedback}
                </p>
              </div>
            )}

            {/* Palavras encontradas */}
            {foundWords.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">{t.found}:</h3>
                <div className="flex flex-wrap gap-2">
                  {foundWords.map((word, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 dark:bg-green-900">
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Controles */}
        <div className="flex gap-4 mt-6">
          <Button onClick={selectNewWord} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            {t.newGame}
          </Button>
        </div>

        {/* Região para anúncios de acessibilidade */}
        <div aria-live="polite" aria-atomic="true" className="sr-only"></div>
      </Card>
    </div>
  )
}
