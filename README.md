# Publist Landing

A responsive landing page project created for practicing modern frontend development.
The project demonstrates working with **semantic HTML**, **modular CSS architecture (BEM)**, responsive layouts, and **light/dark theme switching**.

---

## 🚀 Features

- Adaptive design (desktop + mobile)
- Semantic HTML5 structure
- CSS Grid & Flexbox layouts
- BEM methodology for class naming
- Global variables for typography and colors
- Light and dark theme support
- Accessible markup (aria-labels, hidden overlays)
- Burger menu with drawer navigation

---

## 🛠️ Technologies Used

- **HTML5** — semantic structure of the page
- **CSS3** — layout and styling
  - Flexbox & Grid
  - Variables (`:root` custom properties)
  - Media queries for responsiveness
- **BEM** — block-element-modifier class naming methodology
- **JavaScript (vanilla)** — for interactivity (menu toggle, theme switcher)
- **SVG** — icons embedded inline for flexibility and accessibility

---

## 📂 Project Structure

```
publist-landing/
│
├── fonts/              # Local fonts
├── images/             # Image assets
├── scripts/
│   ├── theme.js        # JS logic for interactivity
│   └── menu.js
├── styles/
│   ├── globals.css     # Reset and global rules
│   ├── variables.css   # CSS custom properties
│   ├── style.css       # Main stylesheet
│   ├── dark.css        # Dark theme overrides
│   └── light.css       # Light theme overrides
├── index.html          # Entry point
└── README.md           # Project documentation
```

---

📱 Responsive Layout

- **Desktop (≥ 1024px):**
  Multi-column layouts, full header with menu items.

- **Tablet & Mobile (≤ 768px):**
  Simplified structure, collapsible navigation (burger menu), adaptive spacing.

---

## 🎨 Theming

The project supports both **light** and **dark** themes via CSS custom properties and `prefers-color-scheme` media query.
User can also toggle themes manually.
