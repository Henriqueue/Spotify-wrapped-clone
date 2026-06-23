# 🎵 Last.fm Wrapped

> Visualize seu ano em música — no estilo Spotify Wrapped — usando seu histórico real do Last.fm.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge)

---

## ✨ Sobre o projeto

**Last.fm Wrapped** é uma aplicação web que transforma o histórico de scrobbles exportado do Last.fm em uma experiência visual animada — slides interativos com seus top artistas, músicas, álbuns e gêneros do ano, inspirados no Wrapped do Spotify.

O projeto foi construído com foco em **data visualization**, **animações de transição** e **processamento de dados no cliente**, sem necessidade de backend.

---

## 🖥️ Demo

> Experimente com os dados de exemplo clicando em **"Ver com dados de exemplo"** — nenhum arquivo necessário.

---

## 📸 Slides

| Slide | Conteúdo |
|-------|----------|
| 🎬 Cover | Ano em destaque + total de plays |
| 🎤 Top Artistas | Top 5 com barras de progresso animadas |
| 🎵 Top Músicas | Top 10 com contagem de plays |
| 💿 Top Álbuns | Top 5 com barras de progresso |
| 🎸 Top Gêneros | Gráfico de barras com Recharts |
| 📊 Estatísticas | Cards com dados gerais do ano |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 20 ou superior
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/spotify-wrapped-clone.git
cd spotify-wrapped-clone

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📂 Como usar com seu histórico do Last.fm

1. Acesse [mainstream.ghan.nl/export.html](https://mainstream.ghan.nl/export.html)
2. Digite seu usuário do Last.fm e clique em **Export as CSV**
3. Aguarde o download do arquivo `.csv`
4. Na aplicação, arraste o arquivo para a zona de upload ou clique para selecionar
5. Navegue pelos slides com os botões ou teclado

---

## 🛠️ Stack

| Tecnologia | Uso |
|-----------|-----|
| [Next.js 16](https://nextjs.org/) | Framework React com App Router |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização com `@theme` |
| [Motion](https://motion.dev/) | Animações e transições entre slides |
| [Recharts](https://recharts.org/) | Gráfico de barras dos gêneros |
| [PapaParse](https://www.papaparse.com/) | Parser do CSV do Last.fm |

---

## 📁 Estrutura do projeto

```
src/
├── app/
│   ├── globals.css        # Tema global (Tailwind @theme)
│   ├── layout.tsx
│   └── page.tsx           # Orquestrador de slides
│
├── components/
│   ├── slides/
│   │   ├── SlideWrapper.tsx    # Animação de transição (AnimatePresence)
│   │   ├── SlideCover.tsx      # Slide de abertura
│   │   ├── SlideTopArtists.tsx
│   │   ├── SlideTopSongs.tsx
│   │   ├── SlideTopAlbums.tsx
│   │   ├── SlideGenres.tsx     # Gráfico Recharts
│   │   └── SlideStats.tsx      # Cards de estatísticas
│   └── ui/
│       ├── UploadZone.tsx      # Drag & drop do CSV
│       └── SlideNav.tsx        # Navegação e indicadores
│
├── hooks/
│   └── useWrappedData.ts       # Estado e lógica central
│
├── lib/
│   └── parser.ts               # CSV → WrappedData
│
├── data/
│   └── sample.ts               # Dados de exemplo para demo
│
└── types/
    └── index.ts                # Interfaces TypeScript
```

---

## 🗺️ Próximos passos

- [ ] Gráfico de distribuição de escuta por hora do dia (AreaChart)
- [ ] Slide de artista dominante por mês
- [ ] Animação de contagem crescente nos números
- [ ] Suporte a swipe em dispositivos móveis
- [ ] Integração com Last.fm API para buscar capas de álbuns e fotos de artistas
- [ ] Botão de compartilhamento (geração de imagem com `html2canvas`)
- [ ] Filtro por período (mês/trimestre)

---

## 📄 Licença

MIT © [Seu Nome](https://github.com/seu-usuario)