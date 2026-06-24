# 🎵 Last.fm Wrapped — v3

> Visualize seu ano em música — no estilo Spotify Wrapped — usando seu histórico real do Last.fm.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge)

---

## ✨ O que há de novo na v3

- **Download de slides como imagem** — botão flutuante em cada slide que salva um PNG de alta resolução (2×) usando `html2canvas-pro`
- **Importação dinâmica** do html2canvas — não afeta o tempo de carregamento inicial
- **Nomes de arquivo descritivos** — cada slide salvo com nome identificável (`lastfm-wrapped-top-artistas.png`, etc.)

> Veja o histórico de versões: [v1](../v1-base) · [v2](../v2)

---

## 🖥️ Slides

| Slide | Conteúdo |
|-------|----------|
| 🎬 Cover | Ano em destaque + total de plays com número animado |
| 🎤 Top Artistas | Top 5 com foto, barras animadas e contagem |
| 🎵 Top Músicas | Top 10 com capa do álbum e artista |
| 💿 Top Álbuns | Top 5 com capa, barra de progresso e artista |
| 🎸 Gêneros | Gráfico de barras colorido (Recharts) |
| 🕐 Horários | AreaChart de distribuição de escuta por hora |
| 📅 Artista do Mês | Grid com foto do artista dominante em cada mês |
| 📊 Estatísticas | Cards com total de plays, hora mais ativa e mais |

Todos os slides têm um botão **⬇️ Salvar slide** que gera um PNG para download.

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 20+
- API key do Last.fm — gratuita em [last.fm/api/account/create](https://www.last.fm/api/account/create)

### Instalação

```bash
git clone https://github.com/Henriqueue/Spotify-wrapped-clone
cd Spotify-wrapped-clone
npm install
```

Crie o arquivo `.env.local` na raiz:

```
NEXT_PUBLIC_LASTFM_API_KEY=sua_api_key_aqui
```

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## 📂 Como usar

1. Acesse [mainstream.ghan.nl/export.html](https://mainstream.ghan.nl/export.html)
2. Digite seu usuário do Last.fm e exporte o CSV
3. Arraste o arquivo para a zona de upload — ou clique em **"Ver com dados de exemplo"**
4. Navegue pelos slides com os botões, teclado ou swipe (mobile)
5. Use o seletor de ano para alternar entre diferentes anos
6. Clique em **⬇️ Salvar slide** para baixar qualquer slide como imagem

---

## 🛠️ Stack

| Tecnologia | Uso |
|-----------|-----|
| [Next.js 16](https://nextjs.org/) | Framework React com App Router |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS v4](https://tailwindcss.com/) | Estilização com `@theme` |
| [Motion](https://motion.dev/) | Animações e transições entre slides |
| [Recharts](https://recharts.org/) | Gráficos de barras e área |
| [PapaParse](https://www.papaparse.com/) | Parser do CSV do Last.fm |
| [html2canvas-pro](https://github.com/yorickshan/html2canvas-pro) | Captura de slides como PNG |
| [Wikipedia API](https://en.wikipedia.org/api/rest_v1/) | Fotos de artistas |
| [Cover Art Archive](https://coverartarchive.org/) | Capas de álbuns via MusicBrainz |
| [Last.fm API](https://www.last.fm/api) | Capas de músicas e fallback de álbuns |

---

## 📁 Estrutura do projeto

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                   ← orquestrador + área de captura
├── components/
│   ├── slides/
│   │   ├── SlideWrapper.tsx
│   │   ├── SlideCover.tsx
│   │   ├── SlideTopArtists.tsx
│   │   ├── SlideTopSongs.tsx
│   │   ├── SlideTopAlbums.tsx
│   │   ├── SlideGenres.tsx
│   │   ├── SlideHourly.tsx
│   │   ├── SlideMonthlyArtist.tsx
│   │   └── SlideStats.tsx
│   └── ui/
│       ├── AnimatedNumber.tsx
│       ├── ScreenshotButton.tsx   ← novo
│       ├── UploadZone.tsx
│       ├── SlideNav.tsx
│       └── YearSelector.tsx
├── hooks/
│   ├── useWrappedData.ts
│   └── useScreenshot.ts           ← novo
├── lib/
│   ├── parser.ts
│   └── lastfm.ts
├── data/
│   └── sample.ts
└── types/
    └── index.ts
```

---

## 🗺️ Histórico de versões

| Branch | O que foi adicionado |
|--------|---------------------|
| [`v1-base`](../../tree/v1-base) | Estrutura base: upload CSV, 6 slides, animações, Recharts, swipe, dados de exemplo |
| [`v2`](../../tree/v2) | Fotos via Wikipedia, capas via Cover Art Archive, seletor de ano, artista do mês |
| [`main`](../../tree/main) | Download de slides como PNG (html2canvas-pro) |

---

## 🗺️ Meus próximos passos

- [ ] Streak de dias consecutivos ouvindo música
- [ ] Slide de personalidade musical baseado nos gêneros
- [ ] Compartilhamento via URL única (Supabase)
- [ ] Modo comparação entre dois anos
- [ ] Filtro por mês/trimestre

---

## 📄 Licença

MIT © [Henriqueie](https://github.com/Henriqueue)
