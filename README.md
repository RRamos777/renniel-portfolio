# Renniel Ramos — Graphic Designer & Video Editor Portfolio

A dependency-free, responsive creative portfolio designed for Vercel.

## Included

- Main filters for **Video Editing** and **Graphic Design**
- Video categories: Reels, Motion Graphics, Vlogs, YouTube Shorts
- Design categories: Brand Identity, Logo Design, Thumbnail Design, Social Media Design
- Responsive editorial project grid
- Clickable project modal with long, scrollable case studies
- Dedicated **Logo Designs** collection with nine presentation boards
- Optimized WebP logo artwork for faster loading
- Scrollable Motion Graphics collection prepared for nine MP4 projects
- Vlog project prepared for `Vlog1.mp4` inside `public/videos/video_editing/vlogs/`
- YouTube Shorts project prepared for one landscape four-shorts montage named `Shorts1.mp4` inside `public/videos/video_editing/youtube_shorts/`
- Mobile bottom navigation, touch-friendly filters, responsive project cards, and phone-ready project modals
- Motion Graphics videos autoplay muted when at least 60% visible, pause when scrolled away, and loop while active
- Asset validation before production builds
- No npm packages required

## Run locally

```bash
npm run dev
```

Open `http://localhost:5173`.

Do not open `index.html` directly from File Explorer. The portfolio uses root-relative paths such as `/images/...`, so it should be served through the development server or deployed through Vercel.

## Check local assets

```bash
npm run check
```

This checks every local image, stylesheet, and script referenced by the portfolio and reports missing files.

## Build

```bash
npm run build
```

The deployable website is created inside `dist/`. Vercel runs this command automatically when deploying the source project.

## Update portfolio projects

Edit the `projects` array in `script.js`.

Each project supports:

- `discipline`: `video` or `design`
- `category`: one of the existing filter names
- `image`: project-cover path
- `size`: `standard`, `wide`, or `tall`
- `summary`, `client`, `year`, and `tags`
- `gallery.images`: an ordered list of images shown while scrolling through the modal

Gallery entries may be direct paths:

```js
gallery: {
  images: [
    '/images/project/image-01.webp',
    '/images/project/image-02.webp',
  ],
}
```

Or objects with visible captions:

```js
gallery: {
  layout: 'logo-collection',
  images: [
    { src: '/images/project/logo-01.webp', title: 'Brand name' },
  ],
}
```

## Logo Designs collection

The project cover and its nine presentation boards are stored here:

```text
public/images/graphic_design/logo_design/
```

The current files are:

```text
logo_designs_cover.webp
01_xyz_networks.webp
02_cafela.webp
03_aa_architects.webp
04_pizza_district.webp
05_rj_travel_tours.webp
06_bookery.webp
07_furfam.webp
08_malan.webp
09_korus.webp
```

To add another logo presentation:

1. Export it as WebP and place it in the same folder.
2. Add another `{ src, title }` entry to the `logo-designs` gallery in `script.js`.
3. Run `npm run check` and `npm run build`.

## Vanta Motion case study

The Vanta Motion project uses an explicit ordered image list in `script.js`, so the browser only requests files that actually exist.

Its optimized WebP images are stored here:

```text
public/images/graphic_design/brand_identity/
```

## Header profile image

The circular header avatar uses:

```text
public/images/renniel-profile.webp
```

## Social Media Designs gallery

The graphic-design filter now includes a scrollable Social Media Designs collection with nine campaign case studies, including massage, gym, skincare/face products, restaurant, real estate, cafe, dental, fashion, and healthy food concepts.


## Motion Graphics collection

The **Video Editing** filter now includes a **Motion Graphics** category and a scrollable nine-video project.

Place your MP4 exports in this exact folder:

```text
public/videos/video_editing/motion_graphics/
```

Use these exact filenames:

```text
motion_graphics1.mp4
motion_graphics2.mp4
motion_graphics3.mp4
motion_graphics4.mp4
motion_graphics5.mp4
motion_graphics6.mp4
motion_graphics7.mp4
motion_graphics8.mp4
motion_graphics9.mp4
```

The matching website paths are already connected in `script.js`:

```text
/videos/video_editing/motion_graphics/motion_graphics1.mp4
...
/videos/video_editing/motion_graphics/motion_graphics9.mp4
```

Until a video is added, the project gallery displays a filename placeholder instead of a broken player. Once an MP4 is placed in the folder and the site is refreshed, the video player appears automatically.

Motion Graphics playback behavior:

- The most visible video starts automatically when at least 60% of it is in view.
- Autoplay begins muted to comply with browser autoplay rules.
- The video loops while visible and pauses when scrolled away.
- Only one Motion Graphics video plays at a time.
- Player controls remain available for seeking, pausing, and unmuting.
- Autoplay is disabled when the visitor has enabled reduced-motion preferences.

Recommended export settings:

- MP4 container
- H.264 video codec
- AAC audio codec
- Web optimized / fast start enabled
- 1920 × 1080 for landscape or 1080 × 1920 for vertical work


## YouTube Shorts landscape montage

Place the single landscape MP4 in this folder:

```text
public/videos/video_editing/youtube_shorts/
```

Use this exact filename:

```text
Shorts1.mp4
```

`Shorts1.mp4` should contain the four Shorts in one landscape montage. The player uses the video's real aspect ratio after loading, stays full-width inside the project modal, and scales cleanly on tablets and phones without cropping. Until the file is added, the project displays a filename placeholder.
