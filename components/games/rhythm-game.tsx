"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Volume2, Play, Pause } from "lucide-react"

interface RhythmGameProps {
  language: string
  theme: string
  colorBlindness: string
  onClose: () => void
}

interface Beat {
  id: number
  time: number
  lane: number
  hit: boolean
  missed: boolean
}

const translations = {
  pt: {
    title: "Jogo de Ritmo",
    score: "Pontuação",
    combo: "Combo",
    level: "Nível",
    accuracy: "Precisão",
    start: "Iniciar",
    pause: "Pausar",
    resume: "Continuar",
    newGame: "Novo Jogo",
    perfect: "Perfeito!",
    good: "Bom!",
    miss: "Perdeu!",
    gameOver: "Fim de Jogo!",
    instructions: "Use as teclas A, S, D, F ou as setas para seguir o ritmo",
    hitBeat: "Batida acertada",
    missedBeat: "Batida perdida",
  },
  en: {
    title: "Rhythm Game",
    score: "Score",
    combo: "Combo",
    level: "Level",
    accuracy: "Accuracy",
    start: "Start",
    pause: "Pause",
    resume: "Resume",
    newGame: "New Game",
    perfect: "Perfect!",
    good: "Good!",
    miss: "Miss!",
    gameOver: "Game Over!",
    instructions: "Use A, S, D, F keys or arrows to follow the rhythm",
    hitBeat: "Beat hit",
    missedBeat: "Beat missed",
  },
  es: {
    title: "Juego de Ritmo",
    score: "Puntuación",
    combo: "Combo",
    level: "Nivel",
    accuracy: "Precisión",
    start: "Iniciar",
    pause: "Pausar",
    resume: "Continuar",
    newGame: "Nuevo Juego",
    perfect: "¡Perfecto!",
    good: "¡Bien!",
    miss: "¡Perdido!",
    gameOver: "¡Fin del Juego!",
    instructions: "Usa las teclas A, S, D, F o las flechas para seguir el ritmo",
    hitBeat: "Ritmo acertado",
    missedBeat: "Ritmo perdido",
  },
  fr: {
    title: "Jeu de Rythme",
    score: "Score",
    combo: "Combo",
    level: "Niveau",
    accuracy: "Précision",
    start: "Commencer",
    pause: "Pause",
    resume: "Reprendre",
    newGame: "Nouveau Jeu",
    perfect: "Parfait!",
    good: "Bien!",
    miss: "Raté!",
    gameOver: "Fin du Jeu!",
    instructions: "Utilisez les touches A, S, D, F ou les flèches pour suivre le rythme",
    hitBeat: "Rythme réussi",
    missedBeat: "Rythme raté",
  },
  ru: {
    title: "Ритмическая Игра",
    score: "Счет",
    combo: "Комбо",
    level: "Уровень",
    accuracy: "Точность",
    start: "Начать",
    pause: "Пауза",
    resume: "Продолжить",
    newGame: "Новая Игра",
    perfect: "Отлично!",
    good: "Хорошо!",
    miss: "Промах!",
    gameOver: "Игра Окончена!",
    instructions: "Используйте клавиши A, S, D, F или стрелки для следования ритму",
    hitBeat: "Ритм попал",
    missedBeat: "Ритм пропущен",
  },
}

export default function RhythmGame({ language, theme, colorBlindness, onClose }: RhythmGameProps) {
  const [beats, setBeats] = useState<Beat[]>([])
  const [score, setScore] = useState<number>(0)
  const [combo, setCombo] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const [accuracy, setAccuracy] = useState<number>(100)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [gameTime, setGameTime] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>("")
  const [totalBeats, setTotalBeats] = useState<number>(0)
  const [hitBeats, setHitBeats] = useState<number>(0)
  const [activeLanes, setActiveLanes] = useState<boolean[]>([false, false, false, false])

  const gameRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const beatIdRef = useRef<number>(0)

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

  // Função para reproduzir som e vibração
  const playFeedback = useCallback((type: "perfect" | "good" | "miss") => {
    if ("vibrate" in navigator) {
      switch (type) {
        case "perfect":
          navigator.vibrate([50, 25, 50])
          break
        case "good":
          navigator.vibrate(100)
          break
        case "miss":
          navigator.vibrate(200)
          break
      }
    }
  }, [])

  // Gerar nova batida
  const generateBeat = useCallback(() => {
    const lane = Math.floor(Math.random() * 4)
    const newBeat: Beat = {
      id: beatIdRef.current++,
      time: gameTime,
      lane,
      hit: false,
      missed: false,
    }

    setBeats((prev) => [...prev, newBeat])
    setTotalBeats((prev) => prev + 1)
  }, [gameTime])

  // Verificar acerto de batida
  const hitBeat = useCallback(
    (lane: number) => {
      if (!isPlaying) return

      // Ativar feedback visual da lane
      setActiveLanes((prev) => {
        const newActive = [...prev]
        newActive[lane] = true
        setTimeout(() => {
          setActiveLanes((current) => {
            const updated = [...current]
            updated[lane] = false
            return updated
          })
        }, 200)
        return newActive
      })

      // Encontrar batida mais próxima na lane
      const currentTime = gameTime
      const tolerance = 300 // ms de tolerância

      const nearestBeat = beats
        .filter((beat) => beat.lane === lane && !beat.hit && !beat.missed)
        .find((beat) => Math.abs(beat.time + 2000 - currentTime) <= tolerance)

      if (nearestBeat) {
        const timeDiff = Math.abs(nearestBeat.time + 2000 - currentTime)
        let points = 0
        let feedbackText = ""

        if (timeDiff <= 100) {
          points = 100
          feedbackText = t.perfect
          playFeedback("perfect")
        } else if (timeDiff <= 200) {
          points = 50
          feedbackText = t.good
          playFeedback("good")
        } else {
          points = 25
          feedbackText = t.good
          playFeedback("good")
        }

        setScore((prev) => prev + points * (combo + 1))
        setCombo((prev) => prev + 1)
        setHitBeats((prev) => prev + 1)
        setFeedback(feedbackText)
        announceText(`${t.hitBeat}: ${feedbackText}`)

        // Marcar batida como acertada
        setBeats((prev) => prev.map((beat) => (beat.id === nearestBeat.id ? { ...beat, hit: true } : beat)))

        setTimeout(() => setFeedback(""), 500)
      } else {
        setCombo(0)
        setFeedback(t.miss)
        playFeedback("miss")
        announceText(t.missedBeat)
        setTimeout(() => setFeedback(""), 500)
      }
    },
    [beats, gameTime, isPlaying, combo, t, playFeedback, announceText],
  )

  // Navegação por teclado
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isPlaying) return

      switch (e.key.toLowerCase()) {
        case "a":
        case "arrowleft":
          e.preventDefault()
          hitBeat(0)
          break
        case "s":
        case "arrowdown":
          e.preventDefault()
          hitBeat(1)
          break
        case "d":
        case "arrowup":
          e.preventDefault()
          hitBeat(2)
          break
        case "f":
        case "arrowright":
          e.preventDefault()
          hitBeat(3)
          break
        case " ":
          e.preventDefault()
          setIsPlaying((prev) => !prev)
          break
        case "escape":
          e.preventDefault()
          onClose()
          break
      }
    },
    [isPlaying, hitBeat, onClose],
  )

  // Iniciar/pausar jogo
  const toggleGame = useCallback(() => {
    setIsPlaying((prev) => !prev)
    if (!isPlaying) {
      announceText(`${t.title} ${t.start}`)
    }
  }, [isPlaying, t, announceText])

  // Reiniciar jogo
  const resetGame = useCallback(() => {
    setBeats([])
    setScore(0)
    setCombo(0)
    setLevel(1)
    setAccuracy(100)
    setIsPlaying(false)
    setGameTime(0)
    setTotalBeats(0)
    setHitBeats(0)
    setFeedback("")
    beatIdRef.current = 0
    announceText(`${t.newGame}`)
  }, [t, announceText])

  // Loop principal do jogo
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setGameTime((prev) => prev + 50)

        // Gerar batidas baseado no nível
        if (Math.random() < 0.02 + level * 0.01) {
          generateBeat()
        }
      }, 50)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, level, generateBeat])

  // Remover batidas antigas e verificar misses
  useEffect(() => {
    setBeats((prev) => {
      const currentTime = gameTime
      return prev
        .map((beat) => {
          const beatPosition = beat.time + 2000 - currentTime
          if (beatPosition < -100 && !beat.hit && !beat.missed) {
            setCombo(0)
            return { ...beat, missed: true }
          }
          return beat
        })
        .filter((beat) => beat.time + 2000 - currentTime > -500)
    })
  }, [gameTime])

  // Calcular precisão
  useEffect(() => {
    if (totalBeats > 0) {
      setAccuracy(Math.round((hitBeats / totalBeats) * 100))
    }
  }, [hitBeats, totalBeats])

  // Aumentar nível baseado na pontuação
  useEffect(() => {
    const newLevel = Math.floor(score / 1000) + 1
    if (newLevel > level) {
      setLevel(newLevel)
      announceText(`${t.level} ${newLevel}`)
    }
  }, [score, level, t, announceText])

  // Eventos de teclado
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

  const laneColors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"]

  const laneKeys = ["A", "S", "D", "F"]

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${getColorBlindnessFilter()}`}>
      <Card className={`max-w-4xl w-full mx-4 p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}`}>
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
            {t.combo}: {combo}
          </Badge>
          <Badge variant="secondary">
            {t.accuracy}: {accuracy}%
          </Badge>
        </div>

        {/* Área do jogo */}
        <div
          ref={gameRef}
          className="relative h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-6"
          role="application"
          aria-label={t.title}
        >
          {/* Lanes */}
          <div className="absolute bottom-0 left-0 right-0 h-20 flex">
            {laneColors.map((color, index) => (
              <div
                key={index}
                className={`
                  flex-1 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center
                  ${activeLanes[index] ? `${color} opacity-80` : "bg-gray-200 dark:bg-gray-600"}
                  transition-all duration-200
                `}
                role="button"
                aria-label={`Lane ${index + 1}, tecla ${laneKeys[index]}`}
                onClick={() => hitBeat(index)}
              >
                <span className="text-2xl font-bold text-white drop-shadow-lg">{laneKeys[index]}</span>
              </div>
            ))}
          </div>

          {/* Linha de acerto */}
          <div className="absolute bottom-20 left-0 right-0 h-1 bg-white opacity-50"></div>

          {/* Batidas */}
          {beats.map((beat) => {
            const position = beat.time + 2000 - gameTime
            const topPosition = Math.max(0, 384 - 80 - position / 10)

            if (topPosition > 384 - 80 || beat.hit) return null

            return (
              <div
                key={beat.id}
                className={`
                  absolute w-1/4 h-12 flex items-center justify-center
                  ${laneColors[beat.lane]} opacity-80 rounded
                  transition-all duration-100
                  ${beat.missed ? "opacity-30" : ""}
                `}
                style={{
                  left: `${beat.lane * 25}%`,
                  top: `${topPosition}px`,
                }}
                aria-hidden="true"
              >
                <span className="text-white font-bold">♪</span>
              </div>
            )
          })}

          {/* Feedback */}
          {feedback && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className={`
                text-4xl font-bold px-6 py-3 rounded-lg
                ${
                  feedback === t.perfect
                    ? "bg-green-500 text-white"
                    : feedback === t.good
                      ? "bg-blue-500 text-white"
                      : "bg-red-500 text-white"
                }
                animate-pulse
              `}
              >
                {feedback}
              </div>
            </div>
          )}
        </div>

        {/* Controles */}
        <div className="flex gap-4">
          <Button onClick={toggleGame} className="flex items-center gap-2" aria-label={isPlaying ? t.pause : t.start}>
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? t.pause : t.start}
          </Button>

          <Button onClick={resetGame} className="flex items-center gap-2">
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
