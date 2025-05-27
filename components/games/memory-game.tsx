"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Volume2 } from "lucide-react"

interface MemoryGameProps {
  language: string
  theme: string
  colorBlindness: string
  onClose: () => void
}

interface GameCard {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

const symbols = ["🎀", "🌙", "⭐", "🎮", "🌈", "💎", "🎵", "🎨"]

const translations = {
  pt: {
    title: "Jogo da Memória",
    score: "Pontuação",
    moves: "Movimentos",
    level: "Nível",
    newGame: "Novo Jogo",
    cardFlipped: "Carta virada",
    cardMatched: "Par encontrado",
    gameWon: "Parabéns! Você venceu!",
    instructions: "Use as setas ou Tab para navegar, Enter para virar cartas",
  },
  en: {
    title: "Memory Game",
    score: "Score",
    moves: "Moves",
    level: "Level",
    newGame: "New Game",
    cardFlipped: "Card flipped",
    cardMatched: "Pair found",
    gameWon: "Congratulations! You won!",
    instructions: "Use arrows or Tab to navigate, Enter to flip cards",
  },
  es: {
    title: "Juego de Memoria",
    score: "Puntuación",
    moves: "Movimientos",
    level: "Nivel",
    newGame: "Nuevo Juego",
    cardFlipped: "Carta volteada",
    cardMatched: "Par encontrado",
    gameWon: "¡Felicidades! ¡Ganaste!",
    instructions: "Usa las flechas o Tab para navegar, Enter para voltear cartas",
  },
  fr: {
    title: "Jeu de Mémoire",
    score: "Score",
    moves: "Mouvements",
    level: "Niveau",
    newGame: "Nouveau Jeu",
    cardFlipped: "Carte retournée",
    cardMatched: "Paire trouvée",
    gameWon: "Félicitations! Vous avez gagné!",
    instructions: "Utilisez les flèches ou Tab pour naviguer, Entrée pour retourner les cartes",
  },
  ru: {
    title: "Игра на Память",
    score: "Счет",
    moves: "Ходы",
    level: "Уровень",
    newGame: "Новая Игра",
    cardFlipped: "Карта перевернута",
    cardMatched: "Пара найдена",
    gameWon: "Поздравляем! Вы выиграли!",
    instructions: "Используйте стрелки или Tab для навигации, Enter чтобы перевернуть карты",
  },
}

export default function MemoryGame({ language, theme, colorBlindness, onClose }: MemoryGameProps) {
  const [cards, setCards] = useState<GameCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const [focusedCard, setFocusedCard] = useState<number>(0)
  const [gameWon, setGameWon] = useState<boolean>(false)

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
  const playSound = useCallback((type: "flip" | "match" | "win") => {
    if ("vibrate" in navigator) {
      switch (type) {
        case "flip":
          navigator.vibrate(50)
          break
        case "match":
          navigator.vibrate([100, 50, 100])
          break
        case "win":
          navigator.vibrate([200, 100, 200, 100, 200])
          break
      }
    }
  }, [])

  // Inicializar jogo
  const initializeGame = useCallback(() => {
    const gameSymbols = symbols.slice(0, 4 + level)
    const gameCards = [...gameSymbols, ...gameSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))

    setCards(gameCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setFocusedCard(0)
    setGameWon(false)
    announceText(`${t.title} ${t.level} ${level}`)
  }, [level, t, announceText])

  // Virar carta
  const flipCard = useCallback(
    (cardId: number) => {
      if (flippedCards.length === 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
        return
      }

      const newFlippedCards = [...flippedCards, cardId]
      setFlippedCards(newFlippedCards)
      setMoves((prev) => prev + 1)

      setCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, isFlipped: true } : card)))

      playSound("flip")
      announceText(`${t.cardFlipped}: ${cards[cardId].symbol}`)

      if (newFlippedCards.length === 2) {
        const [firstCard, secondCard] = newFlippedCards
        if (cards[firstCard].symbol === cards[secondCard].symbol) {
          // Par encontrado
          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === firstCard || card.id === secondCard ? { ...card, isMatched: true } : card,
              ),
            )
            setMatchedPairs((prev) => prev + 1)
            setScore((prev) => prev + 100)
            setFlippedCards([])
            playSound("match")
            announceText(t.cardMatched)
          }, 1000)
        } else {
          // Não é par
          setTimeout(() => {
            setCards((prev) =>
              prev.map((card) =>
                card.id === firstCard || card.id === secondCard ? { ...card, isFlipped: false } : card,
              ),
            )
            setFlippedCards([])
          }, 1000)
        }
      }
    },
    [flippedCards, cards, t, playSound, announceText],
  )

  // Navegação por teclado
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const gridSize = Math.ceil(Math.sqrt(cards.length))
      const currentRow = Math.floor(focusedCard / gridSize)
      const currentCol = focusedCard % gridSize

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          if (currentRow > 0) {
            setFocusedCard(focusedCard - gridSize)
          }
          break
        case "ArrowDown":
          e.preventDefault()
          if (currentRow < gridSize - 1 && focusedCard + gridSize < cards.length) {
            setFocusedCard(focusedCard + gridSize)
          }
          break
        case "ArrowLeft":
          e.preventDefault()
          if (currentCol > 0) {
            setFocusedCard(focusedCard - 1)
          }
          break
        case "ArrowRight":
          e.preventDefault()
          if (currentCol < gridSize - 1 && focusedCard + 1 < cards.length) {
            setFocusedCard(focusedCard + 1)
          }
          break
        case "Enter":
        case " ":
          e.preventDefault()
          flipCard(focusedCard)
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
      }
    },
    [focusedCard, cards.length, flipCard, onClose],
  )

  // Verificar vitória
  useEffect(() => {
    if (matchedPairs === 4 + level && matchedPairs > 0) {
      setGameWon(true)
      playSound("win")
      announceText(t.gameWon)
      setTimeout(() => {
        setLevel((prev) => prev + 1)
        initializeGame()
      }, 3000)
    }
  }, [matchedPairs, level, t, playSound, announceText, initializeGame])

  // Inicializar jogo e eventos
  useEffect(() => {
    initializeGame()
  }, [initializeGame])

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

  const cardClasses = theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
  const flippedCardClasses = theme === "dark" ? "bg-blue-600" : "bg-blue-500"
  const matchedCardClasses = theme === "dark" ? "bg-green-600" : "bg-green-500"

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
            {t.moves}: {moves}
          </Badge>
        </div>

        {/* Grid de cartas */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {cards.map((card, index) => (
            <button
              key={card.id}
              className={`
                aspect-square rounded-lg border-2 text-2xl font-bold transition-all duration-300
                ${cardClasses}
                ${card.isFlipped || card.isMatched ? flippedCardClasses : ""}
                ${card.isMatched ? matchedCardClasses : ""}
                ${focusedCard === index ? "ring-4 ring-blue-400" : ""}
                hover:scale-105 focus:scale-105 focus:outline-none
              `}
              onClick={() => flipCard(card.id)}
              onFocus={() => setFocusedCard(index)}
              aria-label={`Carta ${index + 1}${card.isFlipped || card.isMatched ? `: ${card.symbol}` : ""}`}
              aria-pressed={card.isFlipped || card.isMatched}
              disabled={flippedCards.length === 2 && !card.isFlipped}
            >
              {card.isFlipped || card.isMatched ? card.symbol : "?"}
            </button>
          ))}
        </div>

        {/* Controles */}
        <div className="flex gap-4">
          <Button onClick={initializeGame} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            {t.newGame}
          </Button>
        </div>

        {/* Mensagem de vitória */}
        {gameWon && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
            <p className="font-bold text-green-800 dark:text-green-200">{t.gameWon}</p>
          </div>
        )}

        {/* Região para anúncios de acessibilidade */}
        <div aria-live="polite" aria-atomic="true" className="sr-only"></div>
      </Card>
    </div>
  )
}
