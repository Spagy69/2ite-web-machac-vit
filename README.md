# Linux One-Page Vizitka

Moderní, vizuálně úchvatná jednostránková prezentace operačního systému Linux s interaktivním 3D modelem maskota Tuxe.

## O projektu

Interaktivní webová vizitka věnovaná historii a vývoji Linuxu - od jeho vzniku v roce 1991 až po současnost. Stránka představuje:

- **Historii Linuxu** - timeline s klíčovými milníky
- **Linus Torvalds** - tvůrce Linuxu a jeho příběh
- **Populární distribuce** - Ubuntu, Debian, Fedora, Arch, Mint, Pop!_OS
- **3D Tux interaktivní model** - maskot Linuxu v Three.js

**Živá ukázka:** [https://spagy69.github.io/2ite-web-vit-machac/](https://spagy69.github.io/2ite-web-vit-machac/)

## Použité technologie

### Core
- **HTML5** - sémantická struktura
- **CSS3** - custom properties, glassmorphism, animace
- **JavaScript (ES6+)** - modulární architektura

### Knihovny (CDN)
- **[Three.js](https://threejs.org/)** - 3D grafika, GLTFLoader, OrbitControls
- **[GSAP](https://greensock.com/gsap/)** - pokročilé animace, ScrollTrigger
- **[Google Fonts](https://fonts.google.com/)** - Outfit, Inter

## Spuštění

Projekt nevyžaduje žádný build proces. Stačí:

1. Naklonovat repozitář:
   ```bash
   git clone https://github.com/Spagy69/2ite-web-vit-machac.git
   ```

2. Otevřít `index.html` v prohlížeči

Alternativně použít lokální server:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve
```

## Prvky

### Design & UX
- **Premium dark theme** s gradientovou color paletou (orange + blue)
- **Glassmorphism efekty** s backdrop blur na kartách
- **Responzivní design** od mobilů po 4K monitory

### 3D Interakce
- **Tux 3D model** s OrbitControls - uživatel může rotovat a interagovat
- **Idle animace** - jemné plovoucí pohyby
- **Dynamické osvětlení** - teplé a studené světlo pro depth

### Animace
- **Particle background** - plovoucí částice v hero sekci
- **Typewriter efekt** - postupné vypisování textu
- **Scroll-triggered animace** - elementy se objevují při scrollování
- **Timeline reveal** - postupné odhalování historie
- **Counter animace** - počítání statistik od nuly
- **3D card tilt** - karty distribucí reagují na pohyb myši

### Responzivita
- Mobile-first přístup
- Plynulé přechody mezi breakpointy
- Optimalizace pro 4K displeje

### SEO & Přístupnost
- Kompletní meta tagy (Open Graph)
- Sémantická HTML5 struktura
- Správná hierarchie nadpisů
- Přístupné navigační elementy

## Struktura projektu

```
2ite-web-vit-machac/
├── index.html              # Hlavní HTML soubor
├── assets/
│   ├── images/             # SVG ikony a loga
│   │   ├── linux-tux.svg
│   │   ├── ubuntu.svg
│   │   ├── debian.svg
│   │   ├── fedora.svg
│   │   ├── arch.svg
│   │   ├── mint.svg
│   │   └── pop!_os.svg
│   └── models/
│       └── tux.glb         # 3D model Tuxe
├── css/
│   └── styles.css          # Všechny styly
├── js/
│   ├── main.js             # Animace a interakce
│   └── tux3d.js            # Three.js 3D scéna
├── LICENSE
└── README.md
```

## Autor

**Vít Machač** - 2.ITE

---

*Školní projekt 2026*
