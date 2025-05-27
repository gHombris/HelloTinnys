# Hello Tinny's 🎀 - Plataforma de Acessibilidade Digital

Uma aplicação web dedicada à acessibilidade e inclusão digital, oferecendo uma experiência completamente personalizável e jogos inclusivos para todos os usuários.

## 🌟 Visão Geral

Hello Tinny's é uma plataforma inovadora que demonstra como criar experiências digitais verdadeiramente inclusivas. O projeto combina design universal, tecnologias assistivas e personalização avançada para atender às necessidades de usuários com diferentes habilidades e preferências.

## ✨ Características Principais

### 🎯 Sistema de Personalização Completo
- **5 Idiomas**: Português, Inglês, Espanhol, Francês e Russo
- **Temas Visuais**: Modo claro e escuro com transições suaves
- **Tamanhos de Fonte**: Pequeno, médio e grande para melhor legibilidade
- **Filtros de Daltonismo**: Suporte para deuteranopia, protanopia e tritanopia

### 🎮 Minijogos Acessíveis
1. **Jogo da Memória** (Fácil)
   - Navegação por teclado completa
   - Descrições de áudio para cada carta
   - Múltiplos níveis de dificuldade

2. **Combinação de Cores** (Médio)
   - Adaptação automática aos filtros de daltonismo
   - Feedback tátil através de vibração
   - Padrões visuais alternativos

3. **Quebra-cabeça de Palavras** (Médio)
   - Suporte completo a leitores de tela
   - Dicas sonoras e visuais
   - Conteúdo multilíngue

4. **Jogo de Ritmo** (Difícil)
   - Controles adaptativos (A,S,D,F ou setas)
   - Feedback visual e tátil sincronizado
   - Sistema de precisão e combo

### 🔧 Tecnologias de Acessibilidade

#### Navegação por Teclado
- Suporte completo a navegação por Tab
- Atalhos de teclado intuitivos
- Indicadores visuais de foco
- Navegação por setas em grids

#### Leitores de Tela
- Atributos ARIA apropriados
- Anúncios dinâmicos com aria-live
- Labels descritivos para todos os elementos
- Estrutura semântica HTML5

#### Feedback Multissensorial
- Vibração para diferentes tipos de eventos
- Feedback visual com cores e animações
- Anúncios sonoros contextuais
- Indicadores táteis para ações

#### Adaptação Visual
- Filtros CSS para simulação de daltonismo
- Contraste otimizado para ambos os temas
- Tipografia legível e escalável
- Cores com significado semântico

## 🏗️ Arquitetura do Projeto

### Estrutura de Arquivos
\`\`\`
app/
├── layout.tsx          # Layout raiz com metadados e estrutura HTML
├── page.tsx            # Componente principal da aplicação
└── globals.css         # Estilos globais

components/
└── games/
    ├── memory-game.tsx      # Jogo da memória com navegação por teclado
    ├── color-match-game.tsx # Jogo de combinação com adaptação para daltonismo
    ├── word-puzzle-game.tsx # Quebra-cabeça de palavras multilíngue
    └── rhythm-game.tsx      # Jogo de ritmo com feedback multissensorial
\`\`\`

### Componentes Principais

#### `app/layout.tsx`
- **Função**: Layout raiz da aplicação Next.js
- **Características**:
  - Metadados otimizados para SEO e acessibilidade
  - Estrutura HTML5 semântica
  - Carregamento otimizado de estilos globais

#### `app/page.tsx`
- **Função**: Componente principal com sistema de personalização
- **Características**:
  - Sistema de traduções multilíngue
  - Gerenciamento de estado para preferências
  - Renderização condicional de conteúdo
  - Integração com jogos acessíveis

#### Jogos Acessíveis
Cada jogo implementa um conjunto completo de características de acessibilidade:

- **Navegação por Teclado**: Controles intuitivos e atalhos
- **Feedback Sonoro**: Anúncios para leitores de tela
- **Adaptação Visual**: Compatibilidade com filtros de daltonismo
- **Feedback Tátil**: Vibração para diferentes eventos
- **Multilíngue**: Suporte a 5 idiomas

## 🎨 Sistema de Design

### Temas Visuais
- **Tema Claro**: Gradiente rosa com alta legibilidade
- **Tema Escuro**: Tons de cinza com contraste otimizado
- **Transições**: Animações suaves entre estados

### Tipografia
- **Fonte Base**: Sistema de fontes nativo do navegador
- **Tamanhos**: 14px (pequeno), 16px (médio), 18px (grande)
- **Peso**: Hierarquia clara com diferentes pesos

### Cores e Contraste
- **Paleta Principal**: Rosa, roxo, azul, verde
- **Contraste**: Conformidade com WCAG 2.1 AA
- **Daltonismo**: Filtros CSS para simulação

## 🌐 Internacionalização

### Idiomas Suportados
- **Português (pt)**: Idioma padrão
- **Inglês (en)**: Tradução completa
- **Espanhol (es)**: Tradução completa
- **Francês (fr)**: Tradução completa
- **Russo (ru)**: Tradução completa com suporte a cirílico

### Sistema de Traduções
- Estrutura hierárquica organizada por seções
- Consistência terminológica em cada idioma
- Suporte a caracteres especiais e acentos
- Fallback para português em caso de tradução ausente

## 🔧 Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Navegador moderno com suporte a ES6+

### Instalação
\`\`\`bash
# Clone o repositório
git clone https://github.com/seu-usuario/hello-tinnys.git

# Entre no diretório
cd hello-tinnys

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
\`\`\`

### Build para Produção
\`\`\`bash
# Gere o build otimizado
npm run build

# Execute o servidor de produção
npm start
\`\`\`

## 🧪 Testes de Acessibilidade

### Ferramentas Recomendadas
- **axe-core**: Testes automatizados de acessibilidade
- **WAVE**: Avaliação visual de acessibilidade
- **Lighthouse**: Auditoria de performance e acessibilidade
- **NVDA/JAWS**: Testes com leitores de tela

### Checklist de Acessibilidade
- ✅ Navegação por teclado completa
- ✅ Suporte a leitores de tela
- ✅ Contraste adequado (WCAG 2.1 AA)
- ✅ Texto alternativo para imagens
- ✅ Estrutura semântica HTML5
- ✅ Formulários com labels apropriados
- ✅ Feedback para ações do usuário

## 🤝 Contribuição

### Como Contribuir
1. **Fork** o repositório
2. **Clone** sua fork localmente
3. **Crie** uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
4. **Implemente** suas mudanças seguindo os padrões de acessibilidade
5. **Teste** com ferramentas de acessibilidade
6. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade acessível'`)
7. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
8. **Abra** um Pull Request

### Diretrizes para Contribuição
- Mantenha a compatibilidade com leitores de tela
- Teste navegação por teclado em todas as funcionalidades
- Adicione traduções para novos textos em todos os idiomas
- Documente características de acessibilidade implementadas
- Siga os padrões de código existentes

## 📚 Recursos e Referências

### Diretrizes de Acessibilidade
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)

### Tecnologias Utilizadas
- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática para melhor desenvolvimento
- **Tailwind CSS**: Framework CSS utilitário
- **Lucide React**: Ícones acessíveis
- **shadcn/ui**: Componentes UI acessíveis

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Comunidade de acessibilidade web
- Usuários que testaram e forneceram feedback
- Desenvolvedores que contribuíram com melhorias
- Organizações que promovem inclusão digital


---

**Hello Tinny's** - Tornando a web mais acessível, um usuário por vez. 🎀✨
