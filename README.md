# Zoé Clinic — Landing Page

Bilingual (Albanian / English) landing page for **Zoé Clinic**, a pediatric
physiotherapy & rehabilitation clinic.

> *Shëndeti i fëmijëve, prioriteti ynë — Children's health, our priority.*

## Features

- **Bilingual** SQ/EN toggle (remembers your choice)
- **Brand theme** — navy + teal, with a single fixed vector logo watermark that
  stays put as you scroll
- **"In action" section** — scroll-reveal therapy clips with descriptions
- Services, approach, team, and contact sections
- Fully responsive, no build step — plain HTML/CSS/JS

## Tech

Vanilla HTML, CSS and JavaScript. No framework, no build tooling.

## Run locally

Any static server works, e.g.:

```bash
python -m http.server 8777
```

Then open <http://localhost:8777>.

## Adding media

Drop photos/clips into `media/` using the filenames listed in
[`media/README.txt`](media/README.txt) — the page picks them up automatically.

- `hero.jpg`, `team.jpg` — photos
- `action-1.mp4` … `action-4.mp4` — short therapy clips (autoplay, muted, looped)

## Structure

```
index.html    markup + bilingual copy
styles.css    brand styling + animations
script.js     language toggle, scroll reveal, media auto-load
media/         photos, video clips, logo
```
