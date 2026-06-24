# 🎵 Last.fm Wrapped — v2

> Visualize seu ano em música — no estilo Spotify Wrapped — usando seu histórico real do Last.fm.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge)

---

## ✨ O que há de novo na v2

- **Fotos de artistas reais** via Wikipedia Thumbnail API (sem autenticação)
- **Capas de álbuns e músicas** via Cover Art Archive (MusicBrainz) + Last.fm API como fallback
- **Seletor de ano** — troca todo o Wrapped sem re-upload do CSV
- **MBID nativo** — o parser agora usa os IDs do MusicBrainz que já estão no CSV para buscar capas com mais precisão
- **Estado `enriching`** — os slides aparecem imediatamente enquanto as imagens carregam em background

> Veja a [v1](../v1-base) para a versão inicial sem imagens externas.

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

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 20+
- API key do Last.fm — gratuita em [last.fm/api/account/create](https://www.last.fm/api/account/create)

### Instalação

```bash
git clone [https://github.com/Henriqueue/Spotify-wrapped-clone.git]
cd Spotify-wrapped-clone.git
git checkout v2
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

## 📂 Como exportar seu histórico do Last.fm

1. Acesse [mainstream.ghan.nl/export.html](https://mainstream.ghan.nl/export.html)
2. Digite seu usuário e clique em **Export as CSV**
3. Arraste o arquivo `.csv` para a zona de upload
4. Use o seletor de ano para alternar entre diferentes anos do seu histórico

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
│   └── page.tsx
├── components/
│   ├── slides/
│   │   ├── SlideWrapper.tsx
│   │   ├── SlideCover.tsx
│   │   ├── SlideTopArtists.tsx    ← fotos via Wikipedia
│   │   ├── SlideTopSongs.tsx      ← capas via Last.fm
│   │   ├── SlideTopAlbums.tsx     ← capas via Cover Art Archive
│   │   ├── SlideGenres.tsx
│   │   ├── SlideHourly.tsx
│   │   ├── SlideMonthlyArtist.tsx ← fotos via Wikipedia
│   │   └── SlideStats.tsx
│   └── ui/
│       ├── AnimatedNumber.tsx
│       ├── UploadZone.tsx
│       ├── SlideNav.tsx           ← seletor de ano integrado
│       └── YearSelector.tsx       ← novo
├── hooks/
│   └── useWrappedData.ts          ← estado enriching + changeYear
├── lib/
│   ├── parser.ts                  ← MBID + filterByYear + getAvailableYears
│   └── lastfm.ts                  ← Wikipedia + CAA + Last.fm
├── data/
│   └── sample.ts
└── types/
    └── index.ts                   ← MonthlyArtist + availableYears + mbid
```

---

## 🗺️ Próximos passos (v3+)

- [ ] Download de cada slide como imagem (html2canvas)
- [ ] Streak de dias consecutivos ouvindo música
- [ ] Slide de personalidade musical baseado nos gêneros
- [ ] Compartilhamento via URL única (Supabase)
- [ ] Modo comparação entre dois anos

---

## 📄 Licença

MIT © [HenriqueUE](https://github.com/Henriqueue)
