import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

/**
 * Metadados da aplicação Hello Tinny's
 * Define informações básicas que aparecem no navegador e mecanismos de busca
 */
export const metadata: Metadata = {
  title: "Hello Tinny's - Acessibilidade e Inclusão Digital", // Título da página no navegador
  description:
    "Plataforma dedicada à acessibilidade digital com jogos inclusivos e personalização completa para todos os usuários", // Descrição para SEO
  generator: "v0.dev", // Ferramenta utilizada para gerar o projeto
}

/**
 * Layout raiz da aplicação Next.js
 *
 * Este componente define a estrutura HTML básica que envolve todas as páginas.
 * Funcionalidades implementadas:
 *
 * 1. ESTRUTURA HTML SEMÂNTICA:
 *    - Define idioma padrão como inglês (pode ser alterado dinamicamente)
 *    - Estrutura HTML5 válida e acessível
 *
 * 2. ACESSIBILIDADE:
 *    - Estrutura semântica adequada para leitores de tela
 *    - Preparado para receber atributos de acessibilidade dinâmicos
 *
 * 3. PERFORMANCE:
 *    - Carregamento otimizado de estilos globais
 *    - Estrutura mínima para melhor performance inicial
 *
 * @param children - Componentes filhos que serão renderizados dentro do layout
 * @returns JSX.Element - Estrutura HTML básica da aplicação
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
