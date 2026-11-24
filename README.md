# Manushakumarudu – Bible Promise Studio

> A professional, free Bible Promise Card Generator for creating beautiful social media images.

## ✨ Features

- **Bulk Import** – Upload Excel (.xlsx/.xls), CSV, PDF, or Word files with Bible verses
- **72 Design Templates** – Minimal, Nature, Christian, Modern, Dark, and more
- **300+ Backgrounds** – Colors, gradients, patterns, plus 205 drawn-in-code Christian, Nature and Abstract backgrounds
- **Saved Gallery** – generated cards survive a page refresh (stored in your browser)
- **Drive saving** – Save to Drive uses the included Code.gs (Apps Script)
- **Multiple Formats** – Instagram Square/Portrait/Story, Landscape, A4/A5 Posters
- **Canvas Rendering** – High-quality PNG generation in the browser (no AI API needed)
- **Design Rotation** – Automatically rotate designs every N cards for variety
- **Live Preview** – See your card design before generating
- **ZIP Download** – Download all generated images in one click
- **Google Drive** – Save images to organized Drive folders
- **Google Sheets** – Database for verses, history, settings, and logs
- **Responsive** – Works on desktop, tablet, and mobile
- **Brand Settings** – Add your logo and brand name to every card

## 📁 File Structure

```
ManushakumaruduBPC/
├── index.html          # Complete SPA (single-page application)
├── style.css           # All CSS styles (responsive + dark theme)
├── app.js              # Full application logic (canvas engine, imports, etc.)
├── Code.gs             # Google Apps Script backend
├── netlify.toml        # Netlify deployment config
├── DEPLOYMENT.md       # Step-by-step setup guide
├── sample-verses.csv   # 20 sample Bible verses for testing
└── README.md           # This file
```

## 🚀 Quick Start

1. **Deploy to Netlify**: Drag the project folder onto [app.netlify.com](https://app.netlify.com)
2. **Open the URL**: Visit your Netlify site
3. **Add a verse**: Go to Create Cards → type a verse → click Generate
4. **Bulk import**: Upload an Excel file with columns "Bible Verse" and "Bible Reference"

For Google Sheets/Drive integration, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🛠 Technologies

- HTML5, CSS3, JavaScript (vanilla)
- HTML Canvas API for image rendering
- [SheetJS](https://sheetjs.com/) for Excel parsing
- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF text extraction
- [JSZip](https://stuk.github.io/jszip/) for ZIP downloads
- [Google Fonts](https://fonts.google.com/) for typography
- Google Apps Script + Google Sheets + Google Drive (backend)
- Netlify (hosting)

## 📋 License

MIT License – Free for personal and ministry use.

## 🙏 Credits

Built for **Manushakumarudu** ministry.
