"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon, Globe, Heart, Star, Users, Sparkles, Play } from "lucide-react"
import MemoryGame from "@/components/games/memory-game"
import ColorMatchGame from "@/components/games/color-match-game"
import WordPuzzleGame from "@/components/games/word-puzzle-game"
import RhythmGame from "@/components/games/rhythm-game"

type Language = "pt" | "en" | "es" | "fr" | "ru"
type ColorBlindness = "none" | "deuteranopia" | "protanopia" | "tritanopia"
type FontSize = "small" | "medium" | "large"
type Theme = "light" | "dark"
type ActiveTab = "home" | "about" | "characters" | "minigames"
type ActiveGame = "memory" | "colorMatch" | "wordPuzzle" | "rhythm" | null

const translations = {
  pt: {
    title: "Hello Tinny's 🎀",
    nav: {
      home: "Início",
      about: "Sobre",
      characters: "Personagens",
      minigames: "Minijogos",
    },
    sidebar: {
      personalization: "Personalização",
      fontSize: "Tamanho da fonte",
      colorblind: "Daltonismo",
      languages: "Idiomas",
      darkTheme: "Tema escuro",
    },
    home: {
      title: "A Importância da Personalização do Usuário em Sites",
      text: "A personalização do usuário em sites é crucial para melhorar a experiência de navegação, tornando o ambiente digital mais acessível e agradável. Ao adaptar o site às preferências individuais dos usuários, como aparência, idioma e acessibilidade, os desenvolvedores podem atender melhor às necessidades de cada pessoa, promovendo uma interação mais satisfatória e inclusiva.",
    },
    about: {
      title: "Sobre o Hello Tinny's",
      subtitle: "Um projeto dedicado à acessibilidade e inclusão digital",
      mission: "Nossa Missão",
      missionText:
        "Criar experiências digitais verdadeiramente inclusivas, onde cada usuário pode personalizar sua jornada de acordo com suas necessidades específicas. Acreditamos que a tecnologia deve ser acessível a todos, independentemente de suas habilidades ou preferências.",
      values: "Nossos Valores",
      valuesList: [
        "Acessibilidade em primeiro lugar",
        "Design inclusivo e universal",
        "Personalização centrada no usuário",
        "Tecnologia para todos",
        "Experiências memoráveis",
      ],
      team: "Nossa Equipe",
      teamText:
        "Somos um time apaixonado por criar soluções que fazem a diferença na vida das pessoas. Cada membro contribui com sua expertise única para tornar a web mais acessível.",
    },
    characters: {
      title: "Conheça Nossos Personagens",
      subtitle: "Cada personagem representa diferentes aspectos da acessibilidade",
      tinny: {
        name: "Tinny",
        role: "Guia Principal",
        description:
          "Tinny é nossa mascote principal, sempre pronta para ajudar os usuários a descobrir novas formas de personalizar sua experiência. Ela representa a curiosidade e a vontade de aprender.",
      },
      luna: {
        name: "Luna",
        role: "Especialista em Temas",
        description:
          "Luna cuida dos temas claro e escuro, garantindo que todos tenham uma experiência visual confortável. Ela entende a importância do contraste e da legibilidade.",
      },
      pixel: {
        name: "Pixel",
        role: "Mestre dos Jogos",
        description:
          "Pixel é responsável pelos minijogos e atividades interativas. Ele garante que todos os jogos sejam acessíveis e divertidos para pessoas com diferentes habilidades.",
      },
      iris: {
        name: "Iris",
        role: "Especialista em Cores",
        description:
          "Iris ajuda usuários com daltonismo, oferecendo diferentes filtros de cor para garantir que todos possam ver e interagir com o conteúdo de forma clara.",
      },
    },
    minigames: {
      title: "Minijogos Acessíveis",
      subtitle: "Diversão para todos, com foco em acessibilidade",
      memoryGame: {
        name: "Jogo da Memória",
        difficulty: "Fácil",
        description:
          "Um clássico jogo da memória com suporte a navegação por teclado e descrições de áudio para cada carta.",
        features: ["Navegação por teclado", "Áudio descritivo", "Diferentes níveis"],
      },
      colorMatch: {
        name: "Combinação de Cores",
        difficulty: "Médio",
        description:
          "Combine cores e formas neste jogo que se adapta automaticamente aos filtros de daltonismo ativados.",
        features: ["Adaptável ao daltonismo", "Feedback tátil", "Múltiplos modos"],
      },
      wordPuzzle: {
        name: "Quebra-cabeça de Palavras",
        difficulty: "Médio",
        description: "Encontre palavras escondidas com suporte completo a leitores de tela e múltiplos idiomas.",
        features: ["Multilíngue", "Leitor de tela", "Dicas sonoras"],
      },
      rhythmGame: {
        name: "Jogo de Ritmo",
        difficulty: "Difícil",
        description:
          "Siga o ritmo com feedback visual e tátil, perfeito para usuários com diferentes necessidades sensoriais.",
        features: ["Feedback visual", "Vibração", "Controles adaptativos"],
      },
    },
    colorblindOptions: {
      deuteranopia: "Deuteranopia",
      protanopia: "Protanopia",
      tritanopia: "Tritanopia",
    },
    languageOptions: {
      pt: "Português",
      en: "English",
      es: "Spanish",
      fr: "Français",
      ru: "Russo",
    },
    fontSizes: {
      small: "Pequeno",
      medium: "Médio",
      large: "Grande",
    },
    common: {
      play: "Jogar",
      difficulty: "Dificuldade",
      features: "Características",
    },
  },
  en: {
    title: "Hello Tinny's 🎀",
    nav: {
      home: "Home",
      about: "About",
      characters: "Characters",
      minigames: "Minigames",
    },
    sidebar: {
      personalization: "Personalization",
      fontSize: "Font size",
      colorblind: "Color blindness",
      languages: "Languages",
      darkTheme: "Dark theme",
    },
    home: {
      title: "The Importance of User Personalization on Websites",
      text: "User personalization on websites is crucial for improving the browsing experience, making the digital environment more accessible and pleasant. By adapting the site to individual user preferences, such as appearance, language and accessibility, developers can better meet the needs of each person, promoting a more satisfactory and inclusive interaction.",
    },
    about: {
      title: "About Hello Tinny's",
      subtitle: "A project dedicated to accessibility and digital inclusion",
      mission: "Our Mission",
      missionText:
        "Create truly inclusive digital experiences, where each user can customize their journey according to their specific needs. We believe technology should be accessible to everyone, regardless of their abilities or preferences.",
      values: "Our Values",
      valuesList: [
        "Accessibility first",
        "Inclusive and universal design",
        "User-centered personalization",
        "Technology for everyone",
        "Memorable experiences",
      ],
      team: "Our Team",
      teamText:
        "We are a team passionate about creating solutions that make a difference in people's lives. Each member contributes their unique expertise to make the web more accessible.",
    },
    characters: {
      title: "Meet Our Characters",
      subtitle: "Each character represents different aspects of accessibility",
      tinny: {
        name: "Tinny",
        role: "Main Guide",
        description:
          "Tinny is our main mascot, always ready to help users discover new ways to customize their experience. She represents curiosity and the desire to learn.",
      },
      luna: {
        name: "Luna",
        role: "Theme Specialist",
        description:
          "Luna takes care of light and dark themes, ensuring everyone has a comfortable visual experience. She understands the importance of contrast and readability.",
      },
      pixel: {
        name: "Pixel",
        role: "Game Master",
        description:
          "Pixel is responsible for minigames and interactive activities. He ensures all games are accessible and fun for people with different abilities.",
      },
      iris: {
        name: "Iris",
        role: "Color Specialist",
        description:
          "Iris helps users with color blindness, offering different color filters to ensure everyone can see and interact with content clearly.",
      },
    },
    minigames: {
      title: "Accessible Minigames",
      subtitle: "Fun for everyone, with focus on accessibility",
      memoryGame: {
        name: "Memory Game",
        difficulty: "Easy",
        description: "A classic memory game with keyboard navigation support and audio descriptions for each card.",
        features: ["Keyboard navigation", "Audio description", "Different levels"],
      },
      colorMatch: {
        name: "Color Match",
        difficulty: "Medium",
        description: "Match colors and shapes in this game that automatically adapts to activated colorblind filters.",
        features: ["Colorblind adaptive", "Haptic feedback", "Multiple modes"],
      },
      wordPuzzle: {
        name: "Word Puzzle",
        difficulty: "Medium",
        description: "Find hidden words with full screen reader support and multiple languages.",
        features: ["Multilingual", "Screen reader", "Audio hints"],
      },
      rhythmGame: {
        name: "Rhythm Game",
        difficulty: "Hard",
        description:
          "Follow the rhythm with visual and haptic feedback, perfect for users with different sensory needs.",
        features: ["Visual feedback", "Vibration", "Adaptive controls"],
      },
    },
    colorblindOptions: {
      deuteranopia: "Deuteranopia",
      protanopia: "Protanopia",
      tritanopia: "Tritanopia",
    },
    languageOptions: {
      pt: "Portuguese",
      en: "English",
      es: "Spanish",
      fr: "French",
      ru: "Russian",
    },
    fontSizes: {
      small: "Small",
      medium: "Medium",
      large: "Large",
    },
    common: {
      play: "Play",
      difficulty: "Difficulty",
      features: "Features",
    },
  },
  es: {
    title: "Hello Tinny's 🎀",
    nav: {
      home: "Inicio",
      about: "Acerca de",
      characters: "Personajes",
      minigames: "Minijuegos",
    },
    sidebar: {
      personalization: "Personalización",
      fontSize: "Tamaño de fuente",
      colorblind: "Daltonismo",
      languages: "Idiomas",
      darkTheme: "Tema oscuro",
    },
    home: {
      title: "La Importancia de la Personalización del Usuario en Sitios Web",
      text: "La personalización del usuario en sitios web es crucial para mejorar la experiencia de navegación, haciendo el ambiente digital más accesible y agradable. Al adaptar el sitio a las preferencias individuales de los usuarios, como apariencia, idioma y accesibilidad, los desarrolladores pueden atender mejor las necesidades de cada persona, promoviendo una interacción más satisfactoria e inclusiva.",
    },
    about: {
      title: "Acerca de Hello Tinny's",
      subtitle: "Un proyecto dedicado a la accesibilidad e inclusión digital",
      mission: "Nuestra Misión",
      missionText:
        "Crear experiencias digitales verdaderamente inclusivas, donde cada usuario pueda personalizar su viaje según sus necesidades específicas. Creemos que la tecnología debe ser accesible para todos, independientemente de sus habilidades o preferencias.",
      values: "Nuestros Valores",
      valuesList: [
        "Accesibilidad primero",
        "Diseño inclusivo y universal",
        "Personalización centrada en el usuario",
        "Tecnología para todos",
        "Experiencias memorables",
      ],
      team: "Nuestro Equipo",
      teamText:
        "Somos un equipo apasionado por crear soluciones que marcan la diferencia en la vida de las personas. Cada miembro contribuye con su experiencia única para hacer la web más accesible.",
    },
    characters: {
      title: "Conoce Nuestros Personajes",
      subtitle: "Cada personaje representa diferentes aspectos de la accesibilidad",
      tinny: {
        name: "Tinny",
        role: "Guía Principal",
        description:
          "Tinny es nuestra mascota principal, siempre lista para ayudar a los usuarios a descubrir nuevas formas de personalizar su experiencia. Representa la curiosidad y el deseo de aprender.",
      },
      luna: {
        name: "Luna",
        role: "Especialista en Temas",
        description:
          "Luna se encarga de los temas claro y oscuro, asegurando que todos tengan una experiencia visual cómoda. Entiende la importancia del contraste y la legibilidad.",
      },
      pixel: {
        name: "Pixel",
        role: "Maestro de Juegos",
        description:
          "Pixel es responsable de los minijuegos y actividades interactivas. Se asegura de que todos los juegos sean accesibles y divertidos para personas con diferentes habilidades.",
      },
      iris: {
        name: "Iris",
        role: "Especialista en Colores",
        description:
          "Iris ayuda a usuarios con daltonismo, ofreciendo diferentes filtros de color para asegurar que todos puedan ver e interactuar con el contenido claramente.",
      },
    },
    minigames: {
      title: "Minijuegos Accesibles",
      subtitle: "Diversión para todos, con enfoque en accesibilidad",
      memoryGame: {
        name: "Juego de Memoria",
        difficulty: "Fácil",
        description:
          "Un clásico juego de memoria con soporte de navegación por teclado y descripciones de audio para cada carta.",
        features: ["Navegación por teclado", "Descripción de audio", "Diferentes niveles"],
      },
      colorMatch: {
        name: "Combinación de Colores",
        difficulty: "Medio",
        description:
          "Combina colores y formas en este juego que se adapta automáticamente a los filtros de daltonismo activados.",
        features: ["Adaptable al daltonismo", "Retroalimentación táctil", "Múltiples modos"],
      },
      wordPuzzle: {
        name: "Rompecabezas de Palabras",
        difficulty: "Medio",
        description: "Encuentra palabras ocultas con soporte completo para lectores de pantalla y múltiples idiomas.",
        features: ["Multilingüe", "Lector de pantalla", "Pistas de audio"],
      },
      rhythmGame: {
        name: "Juego de Ritmo",
        difficulty: "Difícil",
        description:
          "Sigue el ritmo con retroalimentación visual y táctil, perfecto para usuarios con diferentes necesidades sensoriales.",
        features: ["Retroalimentación visual", "Vibración", "Controles adaptativos"],
      },
    },
    colorblindOptions: {
      deuteranopia: "Deuteranopia",
      protanopia: "Protanopia",
      tritanopia: "Tritanopia",
    },
    languageOptions: {
      pt: "Portugués",
      en: "Inglés",
      es: "Español",
      fr: "Francés",
      ru: "Ruso",
    },
    fontSizes: {
      small: "Pequeño",
      medium: "Mediano",
      large: "Grande",
    },
    common: {
      play: "Jugar",
      difficulty: "Dificultad",
      features: "Características",
    },
  },
  fr: {
    title: "Hello Tinny's 🎀",
    nav: {
      home: "Accueil",
      about: "À propos",
      characters: "Personnages",
      minigames: "Mini-jeux",
    },
    sidebar: {
      personalization: "Personnalisation",
      fontSize: "Taille de police",
      colorblind: "Daltonisme",
      languages: "Langues",
      darkTheme: "Thème sombre",
    },
    home: {
      title: "L'Importance de la Personnalisation Utilisateur sur les Sites Web",
      text: "La personnalisation utilisateur sur les sites web est cruciale pour améliorer l'expérience de navigation, rendant l'environnement numérique plus accessible et agréable. En adaptant le site aux préférences individuelles des utilisateurs, comme l'apparence, la langue et l'accessibilité, les développeurs peuvent mieux répondre aux besoins de chaque personne, favorisant une interaction plus satisfaisante et inclusive.",
    },
    about: {
      title: "À propos de Hello Tinny's",
      subtitle: "Un projet dédié à l'accessibilité et à l'inclusion numérique",
      mission: "Notre Mission",
      missionText:
        "Créer des expériences numériques véritablement inclusives, où chaque utilisateur peut personnaliser son parcours selon ses besoins spécifiques. Nous croyons que la technologie doit être accessible à tous, indépendamment de leurs capacités ou préférences.",
      values: "Nos Valeurs",
      valuesList: [
        "Accessibilité d'abord",
        "Design inclusif et universel",
        "Personnalisation centrée sur l'utilisateur",
        "Technologie pour tous",
        "Expériences mémorables",
      ],
      team: "Notre Équipe",
      teamText:
        "Nous sommes une équipe passionnée par la création de solutions qui font la différence dans la vie des gens. Chaque membre apporte son expertise unique pour rendre le web plus accessible.",
    },
    characters: {
      title: "Rencontrez Nos Personnages",
      subtitle: "Chaque personnage représente différents aspects de l'accessibilité",
      tinny: {
        name: "Tinny",
        role: "Guide Principal",
        description:
          "Tinny est notre mascotte principale, toujours prête à aider les utilisateurs à découvrir de nouvelles façons de personnaliser leur expérience. Elle représente la curiosité et le désir d'apprendre.",
      },
      luna: {
        name: "Luna",
        role: "Spécialiste des Thèmes",
        description:
          "Luna s'occupe des thèmes clair et sombre, s'assurant que chacun ait une expérience visuelle confortable. Elle comprend l'importance du contraste et de la lisibilité.",
      },
      pixel: {
        name: "Pixel",
        role: "Maître des Jeux",
        description:
          "Pixel est responsable des mini-jeux et activités interactives. Il s'assure que tous les jeux soient accessibles et amusants pour les personnes avec différentes capacités.",
      },
      iris: {
        name: "Iris",
        role: "Spécialiste des Couleurs",
        description:
          "Iris aide les utilisateurs avec daltonisme, offrant différents filtres de couleur pour s'assurer que tous puissent voir et interagir avec le contenu clairement.",
      },
    },
    minigames: {
      title: "Mini-jeux Accessibles",
      subtitle: "Amusement pour tous, avec focus sur l'accessibilité",
      memoryGame: {
        name: "Jeu de Mémoire",
        difficulty: "Facile",
        description:
          "Un jeu de mémoire classique avec support de navigation au clavier et descriptions audio pour chaque carte.",
        features: ["Navigation au clavier", "Description audio", "Différents niveaux"],
      },
      colorMatch: {
        name: "Correspondance de Couleurs",
        difficulty: "Moyen",
        description:
          "Associez couleurs et formes dans ce jeu qui s'adapte automatiquement aux filtres de daltonisme activés.",
        features: ["Adaptable au daltonisme", "Retour tactile", "Modes multiples"],
      },
      wordPuzzle: {
        name: "Puzzle de Mots",
        difficulty: "Moyen",
        description: "Trouvez des mots cachés avec support complet pour lecteurs d'écran et langues multiples.",
        features: ["Multilingue", "Lecteur d'écran", "Indices audio"],
      },
      rhythmGame: {
        name: "Jeu de Rythme",
        difficulty: "Difficile",
        description:
          "Suivez le rythme avec retour visuel et tactile, parfait pour utilisateurs avec différents besoins sensoriels.",
        features: ["Retour visuel", "Vibration", "Contrôles adaptatifs"],
      },
    },
    colorblindOptions: {
      deuteranopia: "Deutéranopie",
      protanopia: "Protanopie",
      tritanopia: "Tritanopie",
    },
    languageOptions: {
      pt: "Portugais",
      en: "Anglais",
      es: "Espagnol",
      fr: "Français",
      ru: "Russe",
    },
    fontSizes: {
      small: "Petit",
      medium: "Moyen",
      large: "Grand",
    },
    common: {
      play: "Jouer",
      difficulty: "Difficulté",
      features: "Caractéristiques",
    },
  },
  ru: {
    title: "Hello Tinny's 🎀",
    nav: {
      home: "Главная",
      about: "О нас",
      characters: "Персонажи",
      minigames: "Мини-игры",
    },
    sidebar: {
      personalization: "Персонализация",
      fontSize: "Размер шрифта",
      colorblind: "Дальтонизм",
      languages: "Языки",
      darkTheme: "Темная тема",
    },
    home: {
      title: "Важность Персонализации Пользователя на Веб-сайтах",
      text: "Персонализация пользователя на веб-сайтах имеет решающее значение для улучшения опыта просмотра, делая цифровую среду более доступной и приятной. Адаптируя сайт к индивидуальным предпочтениям пользователей, таким как внешний вид, язык и доступность, разработчики могут лучше удовлетворить потребности каждого человека, способствуя более удовлетворительному и инклюзивному взаимодействию.",
    },
    about: {
      title: "О Hello Tinny's",
      subtitle: "Проект, посвященный доступности и цифровой инклюзии",
      mission: "Наша Миссия",
      missionText:
        "Создавать действительно инклюзивные цифровые опыты, где каждый пользователь может настроить свое путешествие в соответствии со своими специфическими потребностями. Мы верим, что технологии должны быть доступны всем, независимо от их способностей или предпочтений.",
      values: "Наши Ценности",
      valuesList: [
        "Доступность прежде всего",
        "Инклюзивный и универсальный дизайн",
        "Персонализация, ориентированная на пользователя",
        "Технологии для всех",
        "Незабываемые впечатления",
      ],
      team: "Наша Команда",
      teamText:
        "Мы команда, увлеченная созданием решений, которые меняют жизнь людей к лучшему. Каждый участник вносит свой уникальный опыт, чтобы сделать веб более доступным.",
    },
    characters: {
      title: "Познакомьтесь с Нашими Персонажами",
      subtitle: "Каждый персонаж представляет разные аспекты доступности",
      tinny: {
        name: "Тинни",
        role: "Главный Гид",
        description:
          "Тинни - наш главный талисман, всегда готовый помочь пользователям открыть новые способы настройки их опыта. Она представляет любопытство и желание учиться.",
      },
      luna: {
        name: "Луна",
        role: "Специалист по Темам",
        description:
          "Луна заботится о светлых и темных темах, обеспечивая всем комфортный визуальный опыт. Она понимает важность контраста и читаемости.",
      },
      pixel: {
        name: "Пиксель",
        role: "Мастер Игр",
        description:
          "Пиксель отвечает за мини-игры и интерактивные активности. Он обеспечивает доступность и веселье всех игр для людей с разными способностями.",
      },
      iris: {
        name: "Ирис",
        role: "Специалист по Цветам",
        description:
          "Ирис помогает пользователям с дальтонизмом, предлагая различные цветовые фильтры, чтобы все могли четко видеть и взаимодействовать с контентом.",
      },
    },
    minigames: {
      title: "Доступные Мини-игры",
      subtitle: "Веселье для всех, с фокусом на доступность",
      memoryGame: {
        name: "Игра на Память",
        difficulty: "Легко",
        description:
          "Классическая игра на память с поддержкой навигации клавиатурой и аудио описаниями для каждой карты.",
        features: ["Навигация клавиатурой", "Аудио описание", "Разные уровни"],
      },
      colorMatch: {
        name: "Сопоставление Цветов",
        difficulty: "Средне",
        description:
          "Сопоставляйте цвета и формы в этой игре, которая автоматически адаптируется к активированным фильтрам дальтонизма.",
        features: ["Адаптивна к дальтонизму", "Тактильная обратная связь", "Множественные режимы"],
      },
      wordPuzzle: {
        name: "Словесная Головоломка",
        difficulty: "Средне",
        description: "Найдите скрытые слова с полной поддержкой программ чтения с экрана и множественными языками.",
        features: ["Многоязычная", "Программа чтения экрана", "Звуковые подсказки"],
      },
      rhythmGame: {
        name: "Ритмическая Игра",
        difficulty: "Сложно",
        description:
          "Следуйте ритму с визуальной и тактильной обратной связью, идеально для пользователей с разными сенсорными потребностями.",
        features: ["Визуальная обратная связь", "Вибрация", "Адаптивные элементы управления"],
      },
    },
    colorblindOptions: {
      deuteranopia: "Дейтеранопия",
      protanopia: "Протанопия",
      tritanopia: "Тританопия",
    },
    languageOptions: {
      pt: "Португальский",
      en: "Английский",
      es: "Испанский",
      fr: "Французский",
      ru: "Русский",
    },
    fontSizes: {
      small: "Маленький",
      medium: "Средний",
      large: "Большой",
    },
    common: {
      play: "Играть",
      difficulty: "Сложность",
      features: "Особенности",
    },
  },
}

export default function Component() {
  const [language, setLanguage] = useState<Language>("pt")
  const [theme, setTheme] = useState<Theme>("light")
  const [fontSize, setFontSize] = useState<FontSize>("medium")
  const [colorBlindness, setColorBlindness] = useState<ColorBlindness>("none")
  const [activeTab, setActiveTab] = useState<ActiveTab>("home")
  const [activeGame, setActiveGame] = useState<ActiveGame>(null)

  const t = translations[language]

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small":
        return "text-sm"
      case "medium":
        return "text-base"
      case "large":
        return "text-lg"
      default:
        return "text-base"
    }
  }

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

  const themeClasses =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-white"

  const sidebarClasses = theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-pink-400/80 backdrop-blur-sm"

  const cardClasses =
    theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-pink-300/60 backdrop-blur-sm border-pink-200"

  const openGame = (gameType: ActiveGame) => {
    setActiveGame(gameType)
  }

  const closeGame = () => {
    setActiveGame(null)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <Card className={`max-w-4xl mx-auto p-8 rounded-3xl ${cardClasses}`}>
            <h1 className="text-3xl font-bold text-center mb-8">{t.home.title}</h1>
            <p className="text-lg leading-relaxed text-center">{t.home.text}</p>
          </Card>
        )

      case "about":
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className={`p-8 rounded-3xl ${cardClasses}`}>
              <h1 className="text-3xl font-bold text-center mb-4">{t.about.title}</h1>
              <p className="text-lg text-center mb-8 opacity-90">{t.about.subtitle}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-6 h-6" />
                    <h2 className="text-xl font-bold">{t.about.mission}</h2>
                  </div>
                  <p className="leading-relaxed">{t.about.missionText}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-6 h-6" />
                    <h2 className="text-xl font-bold">{t.about.team}</h2>
                  </div>
                  <p className="leading-relaxed">{t.about.teamText}</p>
                </div>
              </div>
            </Card>

            <Card className={`p-8 rounded-3xl ${cardClasses}`}>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-6 h-6" />
                <h2 className="text-2xl font-bold">{t.about.values}</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.about.valuesList.map((value, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-white/10">
                    <Sparkles className="w-4 h-4" />
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )

      case "characters":
        const characters = [
          { key: "tinny", icon: "🎀", color: "bg-pink-500" },
          { key: "luna", icon: "🌙", color: "bg-purple-500" },
          { key: "pixel", icon: "🎮", color: "bg-blue-500" },
          { key: "iris", icon: "🌈", color: "bg-green-500" },
        ]

        return (
          <div className="max-w-6xl mx-auto space-y-8">
            <Card className={`p-8 rounded-3xl ${cardClasses} text-center`}>
              <h1 className="text-3xl font-bold mb-4">{t.characters.title}</h1>
              <p className="text-lg opacity-90">{t.characters.subtitle}</p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {characters.map((char) => {
                const charData = t.characters[char.key as keyof typeof t.characters] as any
                return (
                  <Card key={char.key} className={`p-6 rounded-3xl ${cardClasses}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-full ${char.color} flex items-center justify-center text-2xl`}>
                        {char.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{charData.name}</h3>
                        <Badge variant="secondary" className="mb-3 bg-white/20 text-white">
                          {charData.role}
                        </Badge>
                        <p className="leading-relaxed">{charData.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case "minigames":
        const games = [
          { key: "memoryGame", icon: "🧠", difficulty: "easy", gameType: "memory" as ActiveGame },
          { key: "colorMatch", icon: "🎨", difficulty: "medium", gameType: "colorMatch" as ActiveGame },
          { key: "wordPuzzle", icon: "📝", difficulty: "medium", gameType: "wordPuzzle" as ActiveGame },
          { key: "rhythmGame", icon: "🎵", difficulty: "hard", gameType: "rhythm" as ActiveGame },
        ]

        const getDifficultyColor = (difficulty: string) => {
          switch (difficulty) {
            case "easy":
              return "bg-green-500"
            case "medium":
              return "bg-yellow-500"
            case "hard":
              return "bg-red-500"
            default:
              return "bg-gray-500"
          }
        }

        return (
          <div className="max-w-6xl mx-auto space-y-8">
            <Card className={`p-8 rounded-3xl ${cardClasses} text-center`}>
              <h1 className="text-3xl font-bold mb-4">{t.minigames.title}</h1>
              <p className="text-lg opacity-90">{t.minigames.subtitle}</p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {games.map((game) => {
                const gameData = t.minigames[game.key as keyof typeof t.minigames] as any
                return (
                  <Card key={game.key} className={`p-6 rounded-3xl ${cardClasses}`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                        {game.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{gameData.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm">{t.common.difficulty}:</span>
                          <Badge className={`${getDifficultyColor(game.difficulty)} text-white`}>
                            {gameData.difficulty}
                          </Badge>
                        </div>
                        <p className="leading-relaxed mb-4">{gameData.description}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        {t.common.features}:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {gameData.features.map((feature: string, index: number) => (
                          <Badge key={index} variant="outline" className="bg-white/10 text-white border-white/30">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                      onClick={() => openGame(game.gameType)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {t.common.play}
                    </Button>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${themeClasses} ${getColorBlindnessFilter()} ${getFontSizeClass()}`}>
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/20">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <nav className="flex gap-4">
          {Object.entries(t.nav).map(([key, label]) => (
            <Button
              key={key}
              variant={activeTab === key ? "secondary" : "ghost"}
              className={`rounded-full px-6 ${
                theme === "dark" ? "text-white hover:bg-gray-700" : "text-white hover:bg-white/20"
              } ${activeTab === key ? (theme === "dark" ? "bg-gray-700" : "bg-white/30") : ""}`}
              onClick={() => setActiveTab(key as ActiveTab)}
            >
              {label}
            </Button>
          ))}
        </nav>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-80 min-h-[calc(100vh-4rem)] p-6 ${sidebarClasses} border-r border-white/20`}>
          <h2 className="text-xl font-bold mb-6">{t.sidebar.personalization}</h2>

          {/* Font Size */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">{t.sidebar.fontSize}</h3>
            <div className="space-y-2">
              {(["small", "medium", "large"] as FontSize[]).map((size) => (
                <Button
                  key={size}
                  variant={fontSize === size ? "secondary" : "ghost"}
                  className={`w-full justify-start rounded-full ${
                    theme === "dark" ? "text-white hover:bg-gray-700" : "text-white hover:bg-white/20"
                  } ${fontSize === size ? (theme === "dark" ? "bg-gray-700" : "bg-white/30") : ""}`}
                  onClick={() => setFontSize(size)}
                >
                  {t.fontSizes[size]}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Blindness */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3">{t.sidebar.colorblind}</h3>
            <div className="space-y-2">
              <Button
                variant={colorBlindness === "none" ? "secondary" : "ghost"}
                className={`w-full justify-start rounded-full ${
                  theme === "dark" ? "text-white hover:bg-gray-700" : "text-white hover:bg-white/20"
                } ${colorBlindness === "none" ? (theme === "dark" ? "bg-gray-700" : "bg-white/30") : ""}`}
                onClick={() => setColorBlindness("none")}
              >
                Normal
              </Button>
              {(["deuteranopia", "protanopia", "tritanopia"] as ColorBlindness[]).map((type) => (
                <Button
                  key={type}
                  variant={colorBlindness === type ? "secondary" : "ghost"}
                  className={`w-full justify-start rounded-full ${
                    theme === "dark" ? "text-white hover:bg-gray-700" : "text-white hover:bg-white/20"
                  } ${colorBlindness === type ? (theme === "dark" ? "bg-gray-700" : "bg-white/30") : ""}`}
                  onClick={() => setColorBlindness(type)}
                >
                  {t.colorblindOptions[type]}
                </Button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4" />
              <h3 className="font-semibold">{t.sidebar.languages}</h3>
            </div>
            <div className="space-y-2">
              {(Object.keys(translations) as Language[]).map((lang) => (
                <Button
                  key={lang}
                  variant={language === lang ? "secondary" : "ghost"}
                  className={`w-full justify-start rounded-full ${
                    theme === "dark" ? "text-white hover:bg-gray-700" : "text-white hover:bg-white/20"
                  } ${language === lang ? (theme === "dark" ? "bg-gray-700" : "bg-white/30") : ""}`}
                  onClick={() => setLanguage(lang)}
                >
                  {t.languageOptions[lang]}
                </Button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <h3 className="font-semibold">{t.sidebar.darkTheme}</h3>
            </div>
            <Button
              variant="ghost"
              className={`w-full justify-start rounded-full ${
                theme === "dark" ? "text-white hover:bg-gray-700" : "text-white hover:bg-white/20"
              }`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
              {theme === "dark" ? "Tema claro" : "Tema escuro"}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{renderContent()}</main>
      </div>

      {/* Game Modals */}
      {activeGame === "memory" && (
        <MemoryGame language={language} theme={theme} colorBlindness={colorBlindness} onClose={closeGame} />
      )}

      {activeGame === "colorMatch" && (
        <ColorMatchGame language={language} theme={theme} colorBlindness={colorBlindness} onClose={closeGame} />
      )}

      {activeGame === "wordPuzzle" && (
        <WordPuzzleGame language={language} theme={theme} colorBlindness={colorBlindness} onClose={closeGame} />
      )}

      {activeGame === "rhythm" && (
        <RhythmGame language={language} theme={theme} colorBlindness={colorBlindness} onClose={closeGame} />
      )}
    </div>
  )
}
