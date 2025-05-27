"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Volume2, Palette } from "lucide-react"

interface ColorMatchGameProps {
  language: string
  theme: string
  colorBlindness: string
  onClose: () => void
}

interface ColorShape {
  id: number
  color: string
  shape: string
  colorName: string
  shapeName: string
}

const colors = [
  { value: "bg-red-500", name: "vermelho", en: "red", es: "rojo", fr: "rouge", ru: "красный" },
  { value: "bg-blue-500", name: "azul", en: "blue", es: "azul", fr: "bleu", ru: "синий" },
  { value: "bg-green-500", name: "verde", en: "green", es: "verde", fr: "vert", ru: "зеленый" },
  { value: "bg-yellow-500", name: "amarelo", en: "yellow", es: "amarillo", fr: "jaune", ru: "желтый" },
  { value: "bg-purple-500", name: "roxo", en: "purple", es: "morado", fr: "violet", ru: "фиолетовый" },
  { value: "bg-orange-500", name: "laranja", en: "orange", es: "naranja", fr: "orange", ru: "оранжевый" },
]

const shapes = [
  { symbol: "●", name: "círculo", en: "circle", es: "círculo", fr: "cercle", ru: "круг" },
  { symbol: "■", name: "quadrado", en: "square", es: "cuadrado", fr: "carré", ru: "квадрат" },
  { symbol: "▲", name: "triângulo", en: "triangle", es: "triángulo", fr: "triangle", ru: "треугольник" },
  { symbol: "♦", name: "diamante", en: "diamond", es: "diamante", fr: "diamant", ru: "ромб" },
]

const translations = {
  pt: {
    title: "Combinação de Cores",
    score: "Pontuação",
    level: "Nível",
    target: "Alvo",
    newGame: "Novo Jogo",
    correct: "Correto!",
    wrong: "Tente novamente",
    gameWon: "Nível completo!",
    instructions: "Encontre a forma com a mesma cor e formato do alvo. Use Tab e Enter.",
    colorblindMode: "Modo daltonismo ativo",
  },
  en: {
    title: "Color Match",
    score: "Score",
    level: "Level",
    target: "Target",
    newGame: "New Game",
    correct: "Correct!",
    wrong: "Try again",
    gameWon: "Level complete!",
    instructions: "Find the shape with the same color and format as the target. Use Tab and Enter.",
    colorblindMode: "Colorblind mode active",
  },
  es: {
    title: "Combinación de Colores",
    score: "Puntuación",
    level: "Nivel",
    target: "Objetivo",
    newGame: "Nuevo Juego",
    correct: "¡Correcto!",
    wrong: "Inténtalo de nuevo",
    gameWon: "¡Nivel completo!",
    instructions: "Encuentra la forma con el mismo color y formato que el objetivo. Usa Tab y Enter.",
    colorblindMode: "Modo daltonismo activo",
  },
  fr: {
    title: "Correspondance de Couleurs",
    score: "Score",
    level: "Niveau",
    target: "Cible",
    newGame: "Nouveau Jeu",
    correct: "Correct!",
    wrong: "Réessayez",
    gameWon: "Niveau terminé!",
    instructions: "Trouvez la forme avec la même couleur et le même format que la cible. Utilisez Tab et Entrée.",
    colorblindMode: "Mode daltonisme actif",
  },
  ru: {
    title: "Сопоставление Цветов",
    score: "Счет",
    level: "Уровень",
    target: "Цель",
    newGame: "Новая Игра",
    correct: "Правильно!",
    wrong: "Попробуйте снова",
    gameWon: "Уровень завершен!",
    instructions: "Найдите фигуру с тем же цветом и форматом, что и цель. Используйте Tab и Enter.",
    colorblindMode: "Режим дальтонизма активен",
  },
}

export default function ColorMatchGame({ language, theme, colorBlindness, onClose }: ColorMatchGameProps) {
  const [targetShape, setTargetShape] = useState<ColorShape | null>(null)
  const [options, setOptions] = useState<ColorShape[]>([])
  const [score, setScore] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const [focusedOption, setFocusedOption] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>("")
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)

  const t = translations[language as keyof typeof translations] || translations.pt

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
  const playSound = useCallback((type: "correct" | "wrong" | "levelUp") => {
    if ("vibrate" in navigator) {
      switch (type) {
        case "correct":
          navigator.vibrate([100, 50, 100])
          break
        case "wrong":
          navigator.vibrate(200)
          break
        case "levelUp":
          navigator.vibrate([200, 100, 200, 100, 200])
          break
      }
    }
  }, [])

  // Obter nome da cor no idioma atual
  const getColorName = useCallback(
    (color: any) => {
      switch (language) {
        case "en":
          return color.en
        case "es":
          return color.es
        case "fr":
          return color.fr
        case "ru":
          return color.ru
        default:
          return color.name
      }
    },
    [language],
  )

  // Obter nome da forma no idioma atual
  const getShapeName = useCallback(
    (shape: any) => {
      switch (language) {
        case "en":
          return shape.en
        case "es":
          return shape.es
        case "fr":
          return shape.fr
        case "ru":
          return shape.ru
        default:
          return shape.name
      }
    },
    [language],
  )

  // Gerar nova rodada
  const generateRound = useCallback(() => {
    const targetColor = colors[Math.floor(Math.random() * colors.length)]
    const targetShapeData = shapes[Math.floor(Math.random() * shapes.length)]

    const target: ColorShape = {
      id: 0,
      color: targetColor.value,
      shape: targetShapeData.symbol,
      colorName: getColorName(targetColor),
      shapeName: getShapeName(targetShapeData),
    }

    // Gerar opções (incluindo a correta)
    const numOptions = Math.min(4 + level, 8)
    const newOptions: ColorShape[] = [target]

    // Adicionar opções incorretas
    while (newOptions.length < numOptions) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)]

      const option: ColorShape = {
        id: newOptions.length,
        color: randomColor.value,
        shape: randomShape.symbol,
        colorName: getColorName(randomColor),
        shapeName: getShapeName(randomShape),
      }

      // Evitar duplicatas exatas
      const isDuplicate = newOptions.some(
        (existing) => existing.color === option.color && existing.shape === option.shape,
      )

      if (!isDuplicate) {
        newOptions.push(option)
      }
    }

    // Embaralhar opções
    const shuffledOptions = newOptions.sort(() => Math.random() - 0.5)

    setTargetShape(target)
    setOptions(shuffledOptions)
    setFocusedOption(0)
    setFeedback("")

    announceText(`${t.target}: ${target.colorName} ${target.shapeName}`)
  }, [level, t, getColorName, getShapeName, announceText])

  // Verificar resposta
  const checkAnswer = useCallback(
    (selectedOption: ColorShape) => {
      if (!targetShape) return

      const isCorrect = selectedOption.color === targetShape.color && selectedOption.shape === targetShape.shape

      if (isCorrect) {
        setScore((prev) => prev + level * 10)
        setCorrectAnswers((prev) => prev + 1)
        setFeedback(t.correct)
        playSound("correct")
        announceText(t.correct)

        setTimeout(() => {
          if (correctAnswers + 1 >= 5) {
            setLevel((prev) => prev + 1)
            setCorrectAnswers(0)
            playSound("levelUp")
            announceText(t.gameWon)
          }
          generateRound()
        }, 1500)
      } else {
        setFeedback(t.wrong)
        playSound("wrong")
        announceText(`${t.wrong}. ${selectedOption.colorName} ${selectedOption.shapeName}`)

        setTimeout(() => {
          setFeedback("")
        }, 1500)
      }
    },
    [targetShape, level, correctAnswers, t, playSound, announceText, generateRound],
  )

  // Navegação por teclado
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          setFocusedOption((prev) => (prev > 0 ? prev - 1 : options.length - 1))
          break
        case "ArrowRight":
          e.preventDefault()
          setFocusedOption((prev) => (prev < options.length - 1 ? prev + 1 : 0))
          break
        case "ArrowUp":
          e.preventDefault()
          const upIndex = focusedOption - 2
          setFocusedOption(upIndex >= 0 ? upIndex : focusedOption)
          break
        case "ArrowDown":
          e.preventDefault()
          const downIndex = focusedOption + 2
          setFocusedOption(downIndex < options.length ? downIndex : focusedOption)
          break
        case "Enter":
        case " ":
          e.preventDefault()
          if (options[focusedOption]) {
            checkAnswer(options[focusedOption])
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
      }
    },
    [focusedOption, options, checkAnswer, onClose],
  )

  // Inicializar jogo
  useEffect(() => {
    generateRound()
  }, [generateRound])

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

  const getAdaptedColor = (color: string) => {
    if (colorBlindness === "none") return color

    // Adicionar padrões para daltonismo
    const patterns: { [key: string]: string } = {
      "bg-red-500": "bg-red-500 border-4 border-dashed border-red-800",
      "bg-blue-500": "bg-blue-500 border-4 border-dotted border-blue-800",
      "bg-green-500": "bg-green-500 border-4 border-double border-green-800",
      "bg-yellow-500": "bg-yellow-500 border-4 border-solid border-yellow-800",
      "bg-purple-500": "bg-purple-500 border-4 border-dashed border-purple-800",
      "bg-orange-500": "bg-orange-500 border-4 border-dotted border-orange-800",
    }

    return patterns[color] || color
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
          {colorBlindness !== "none" && (
            <div className="flex items-center gap-2 mt-2 text-sm text-blue-600 dark:text-blue-400">
              <Palette className="w-4 h-4" />
              {t.colorblindMode}
            </div>
          )}
        </div>

        {/* Status do jogo */}
        <div className="flex gap-4 mb-6">
          <Badge variant="secondary">
            {t.level}: {level}
          </Badge>
          <Badge variant="secondary">
            {t.score}: {score}
          </Badge>
          <Badge variant="secondary">Progresso: {correctAnswers}/5</Badge>
        </div>

        {/* Forma alvo */}
        {targetShape && (
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-3">{t.target}:</h3>
            <div className="flex justify-center">
              <div
                className={`
                  w-20 h-20 rounded-lg flex items-center justify-center text-4xl
                  ${getAdaptedColor(targetShape.color)}
                `}
                aria-label={`${t.target}: ${targetShape.colorName} ${targetShape.shapeName}`}
              >
                {targetShape.shape}
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {targetShape.colorName} {targetShape.shapeName}
            </p>
          </div>
        )}

        {/* Opções */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {options.map((option, index) => (
            <button
              key={option.id}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-3xl
                transition-all duration-200 hover:scale-105 focus:scale-105 focus:outline-none
                ${getAdaptedColor(option.color)}
                ${focusedOption === index ? "ring-4 ring-blue-400" : ""}
              `}
              onClick={() => checkAnswer(option)}
              onFocus={() => setFocusedOption(index)}
              aria-label={`Opção ${index + 1}: ${option.colorName} ${option.shapeName}`}
            >
              {option.shape}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-center p-3 rounded-lg mb-4 ${
              feedback === t.correct
                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
            }`}
          >
            <p className="font-bold">{feedback}</p>
          </div>
        )}

        {/* Controles */}
        <div className="flex gap-4">
          <Button onClick={generateRound} className="flex items-center gap-2">
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
