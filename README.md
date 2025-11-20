# SCSS & JavaScript Build System - Complete Guide

## 🚀 Quick Start

```bash
npm install              # Install dependencies (first time only)

# SCSS Commands
npm run watch            # Auto-compile SCSS on save (fast, no prefixes)
npm run dev              # Build SCSS with autoprefixer (testing)
npm run build            # Production SCSS build (minified + prefixed)

# JavaScript Commands
npm run watch:js         # Auto-compile JS on save
npm run dev:js           # Build JS (merged, readable)
npm run build:js         # Production JS build (merged + minified)

# Combined Commands (SCSS + JS)
npm run watch:all        # Watch both SCSS and JS
npm run dev:all          # Build both (development)
npm run build:all        # Build both (production)
```

## 📁 Project Structure

### SCSS Structure
```
scss/
├── abstracts/
│   ├── _variables.scss      # Breakpoints ($mobile-max, etc.) + CSS vars (:root)
│   └── _mixins.scss         # Reusable mixins (primaryBackgroundGradient, etc.)
├── base/
│   ├── _reset.scss          # CSS reset
│   └── _typography.scss     # Typography (h1-h6, paragraphs)
├── components/
│   └── _*.scss              # UI components (auto-imported)
├── layout/
│   └── _*.scss              # Headers, footers, grids (auto-imported)
├── pages/
│   └── _*.scss              # Page-specific styles (auto-imported)
├── main.scss                # 🤖 Auto-generated entry point
└── styles.scss              # ✅ ORIGINAL (untouched backup)

Output: css/main.css (expanded) or css/main.min.css (minified)
```

### JavaScript Structure
```
js/
├── global/
│   └── *.js                 # Global variables & config (auto-imported first)
│                            # Example: CURRENT_LANG, mediaQueries, BREAKPOINTS
├── utils/
│   └── *.js                 # Utility functions (auto-imported second)
│                            # Example: debounce, throttle, $, $$
├── components/
│   └── *.js                 # Component code (auto-imported third)
│                            # Example: header.js, navigation.js
└── pages/
    └── *.js                 # Page-specific code (auto-imported last)
                             # Example: home.js, product.js

Output: dist/main.js (readable) and dist/main.min.js (minified)
```

## ✨ Fully Automatic System

### SCSS: Variables & Mixins - Automatically Available Everywhere! 🎉

**NO imports needed!** Variables and mixins from `abstracts/` are imported once in `main.scss` and cascade to all components/pages.

Just create your file and start using them:

```scss
// scss/components/_my-button.scss
// NO @import needed! Everything is available from main.scss cascade

.my-button {
  @include primaryBackgroundGradient;  // ✅ Works!
  font-size: var(--fs-18);             // ✅ Works!

  @media screen and (max-width: $mobile-max) {  // ✅ Works!
    font-size: var(--fs-14);
  }
}
```

### JavaScript: Global Variables - Automatically Available Everywhere! 🎉

**NO imports needed!** All files in `js/global/` are merged first, making variables available to all other JS files.

```javascript
// js/global/config.js - Define global variables
const CURRENT_LANG = document.documentElement.lang || 'cs';
const IS_CZECH = CURRENT_LANG === 'cs';

const mediaQueries = {
  isMobile: () => window.matchMedia('(max-width: 767px)').matches,
  isDesktop: () => window.matchMedia('(min-width: 1280px)').matches
};

// js/components/header.js - Use global variables directly
function initHeader() {
  console.log('Current language:', CURRENT_LANG);  // ✅ Works!

  if (mediaQueries.isMobile()) {  // ✅ Works!
    // Mobile logic
  }
}
```

### SCSS Components & Pages - Automatically Imported!

**NO manual imports!** All `_*.scss` files in `components/`, `layout/`, and `pages/` are automatically found and imported into `main.scss`.

## 📝 Adding New Components (SUPER EASY!)

### Adding SCSS Components

1. **Create** `scss/components/_my-component.scss`:
   ```scss
   // NO @import needed! Mixins & variables are already available!

   .my-component {
     @include secondaryBackgroundGradient;
     padding: 1em 2em;
   }
   ```

2. **Compile** - component is auto-imported:
   ```bash
   npm run dev    # Auto-generates main.scss with your new component!
   ```

That's it! The build script automatically:
- ✅ Finds your new file
- ✅ Adds it to `main.scss`

### Adding JavaScript Components

1. **Create** `js/components/my-component.js`:
   ```javascript
   // NO imports needed! Global variables are already available!

   function initMyComponent() {
     // Use global variables directly
     if (CURRENT_LANG === 'cs') {
       console.log('Czech version');
     }

     // Use utility functions
     const element = $('.my-component');
   }

   onReady(initMyComponent);
   ```

2. **Compile** - component is auto-merged:
   ```bash
   npm run dev:js    # Auto-merges all JS files into dist/main.js
   ```

That's it! The build script automatically:
- ✅ Finds your new file
- ✅ Merges it into `dist/main.js`
- ✅ Global variables and utils are available everywhere

## 🎨 Available Resources

### SCSS Mixins
```scss
@include primaryBackgroundGradient;
@include secondaryBackgroundGradient;
@include tertiaryBackgroundGradient;
@include list-reset;
```

### SCSS Breakpoint Variables
```scss
$mobile-max: 767px;
$tablet-min: 768px;
$desktop-min: 1280px;
```

### CSS Custom Properties
```scss
var(--fs-10) to var(--fs-48)    // Font sizes
var(--ff-m), var(--ff-h)        // Font families
var(--color-primary-200)        // Colors
var(--padding-sides)            // Spacing
```

### JavaScript Global Variables (js/global/config.js)
```javascript
// Language detection
CURRENT_LANG          // 'cs', 'en', etc.
IS_CZECH              // Boolean
IS_ENGLISH            // Boolean

// Breakpoints (matching SCSS)
BREAKPOINTS.MOBILE_MAX        // 767
BREAKPOINTS.TABLET_MIN        // 768
BREAKPOINTS.DESKTOP_MIN       // 1280

// Media query helpers
mediaQueries.isMobile()       // Returns boolean
mediaQueries.isTablet()       // Returns boolean
mediaQueries.isDesktop()      // Returns boolean
```

### JavaScript Utility Functions (js/utils/helpers.js)
```javascript
debounce(func, wait)          // Debounce function calls
throttle(func, limit)         // Throttle function calls
$(selector)                   // querySelector shorthand
$$(selector)                  // querySelectorAll shorthand (returns Array)
onReady(callback)             // DOM ready helper
```

## 🌐 Browser Compatibility

Configured for **maximum legacy support**:

- ✅ **Internet Explorer 9, 10, 11** (full support)
- ✅ **Safari 9+** (2015+)
- ✅ **iOS Safari 9+** (iPhone 4S and newer)
- ✅ **Chrome 49+** (2016+)
- ✅ **Firefox 45+** (2016+)
- ✅ **Edge 12+** (all versions)
- ✅ **Android 4.4+** (KitKat 2013+)
- ✅ **Last 10 versions** of all major browsers
- ✅ **~98% browser coverage** worldwide

### What Gets Autoprefixed

| Your SCSS | Compiled CSS |
|-----------|-------------|
| `transform: scale(1.2);` | `-webkit-transform: scale(1.2);`<br>`-ms-transform: scale(1.2);`<br>`transform: scale(1.2);` |
| `display: flex;` | `-webkit-box;`<br>`-ms-flexbox;`<br>`display: flex;` |
| `user-select: none;` | `-webkit-user-select: none;`<br>`-moz-user-select: none;`<br>`-ms-user-select: none;`<br>`user-select: none;` |
| `transition: all 0.3s;` | `-webkit-transition: all 0.3s;`<br>`transition: all 0.3s;` |
| `box-sizing: border-box;` | `-webkit-box-sizing: border-box;`<br>`box-sizing: border-box;` |

**Note:** Autoprefixer intelligently adds only the prefixes needed for your target browsers.

## ⚙️ Build Commands

| Command | Speed | Autoprefixer | Minified | Use Case |
|---------|-------|--------------|----------|----------|
| **`npm run watch`** | ⚡ Fast | ❌ No | ❌ No | Active development |
| **`npm run dev`** | 🐢 Slower | ✅ Yes | ❌ No | Browser testing |
| **`npm run build`** | 🐢 Slower | ✅ Yes | ✅ Yes | Production deploy |

### When to Use Each Command

**During Development:**
```bash
npm run watch
# - Fast compilation (instant)
# - No autoprefixer overhead
# - Perfect for rapid iteration
```

**Before Testing in Browsers:**
```bash
npm run dev
# - Adds vendor prefixes
# - Readable CSS for debugging
# - Test browser compatibility
```

**Before Deploying:**
```bash
npm run build
# - Minified CSS (~30% smaller)
# - Autoprefixed
# - Production-ready
```

## 🔧 Build Process

### 1. SCSS Compilation
Converts `.scss` to `.css` with all your variables, mixins, and nesting.

### 2. Autoprefixer (dev & build only)
Automatically adds vendor prefixes based on [.browserslistrc](.browserslistrc) configuration.

**Example:**
```scss
// Your SCSS
.component {
  transform: scale(1.2);
}

// After autoprefixer
.component {
  -webkit-transform: scale(1.2);
      -ms-transform: scale(1.2);
          transform: scale(1.2);
}
```

### 3. Minification (build only)
Removes whitespace, comments, and optimizes CSS.

**Development build:**
```css
.btn-primary {
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-hover));
  padding: 1em 2em;
}
```

**Production build:**
```css
.btn-primary{background:linear-gradient(90deg,var(--color-primary),var(--color-primary-hover));padding:1em 2em}
```

## 📊 File Size Impact

| Build Type | Size Increase | Worth It? |
|------------|--------------|-----------|
| Development | +15-25% | Yes - readable for debugging |
| Production | +10-15% | Yes - 98% browser coverage |

## 🎯 Workflow Examples

### Quick Development
```bash
npm run watch
# Make changes to SCSS
# CSS compiles instantly
# Refresh browser
```

### Development with Prefixes
```bash
npm run dev
# Test in older browsers
# Check vendor prefixes
```

### Production Deployment
```bash
npm run build
# Upload css/ folder to server
# Users get optimized CSS
```

## 🔄 Customizing Browser Support

Edit [.browserslistrc](.browserslistrc) to adjust browser targets:

**Current (Maximum Legacy Support):**
```
IE >= 9
Safari >= 9
iOS >= 9
Chrome >= 49
Firefox >= 45
Android >= 4.4
last 10 versions
> 0.2%
```

**For Modern Browsers Only (Fewer Prefixes):**
```
last 3 versions
> 1%
not dead
```

After changing, run `npm run build` to rebuild with new prefixes.

**Check current targets:**
```bash
npx browserslist
```

## 🤖 How the Automation Works

Every time you run `npm run dev`, `npm run build`, or `npm run watch`, the following happens automatically:

### 1. Auto-Discovery (build-scss.js)
```
📂 Scans scss/components/ for _*.scss files
📂 Scans scss/layout/ for _*.scss files
📂 Scans scss/pages/ for _*.scss files
```

### 2. Auto-Import Injection
```
✨ Adds these imports to new files:
   @import '../abstracts/variables';
   @import '../abstracts/mixins';

   (skips files that already have imports)
```

### 3. Auto-Generate main.scss
```
📝 Creates scss/main.scss with all discovered files
   - Imports abstracts (variables & mixins)
   - Imports base (reset & typography)
   - Imports all components (sorted alphabetically)
   - Imports all layouts (sorted alphabetically)
   - Imports all pages (sorted alphabetically)
```

### 4. Compile & Process
```
🔨 Sass compiles main.scss → css/main.css
🌐 Autoprefixer adds vendor prefixes
📦 CSSNano minifies (production only)
```

**Result:** You just create files and use mixins/variables - everything else is automatic! 🎉

## ⚠️ Important Notes

### Import Warnings
You may see deprecation warnings about `@import`. These are safe to ignore - they're notices for future Dart Sass 3.0.0 compatibility.

### Grid Warnings
Warnings about grid autoplacement in IE11 are expected. Modern CSS Grid has limited IE support.

### Auto-Generated Files
- `scss/main.scss` is auto-generated - don't edit it manually!
- The build script recreates it every time you build
- Component files get auto-import added once (not overwritten)

### Backup Files
Your original [scss/styles.scss](scss/styles.scss) is **untouched** as a backup. All content was **copied** to the new structure.

### Compiled CSS
The `css/` folder is in [.gitignore](.gitignore) because it's auto-generated. Only commit your SCSS source files.

## 🛠️ Configuration Files

| File | Purpose |
|------|---------|
| [build-scss.js](build-scss.js) | Auto-discovery & import injection |
| [package.json](package.json) | NPM scripts and dependencies |
| [postcss.config.js](postcss.config.js) | Autoprefixer & minification config |
| [.browserslistrc](.browserslistrc) | Browser support targets |
| [scss/main.scss](scss/main.scss) | Auto-generated import list (don't edit!) |

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| CSS not updating | Make sure `npm run watch` is running |
| Variables not found | Run `npm run dev` to regenerate main.scss and inject imports |
| Component not included | Ensure filename starts with `_` and is in components/layout/pages folder |
| Prefixes missing | Run `npm install` then `npm run dev` |
| Build fails | Check SCSS syntax errors in terminal |
| main.scss not updating | Delete it and run `npm run dev` to regenerate |

## 📚 Migration Path

1. ✅ Original `styles.scss` is **untouched** (backup)
2. ✅ Variables, mixins, reset, typography **copied** to new folders
3. ⏭️ You can either:
   - Start fresh with `main.scss` as entry point
   - Gradually migrate from `styles.scss` to new structure

## 🎓 Example

See [scss/components/_example-button.scss](scss/components/_example-button.scss) for a working example of how to use the auto-import system.

---

**Questions?** All configuration is in these 4 files:
- [package.json](package.json) - Build scripts
- [postcss.config.js](postcss.config.js) - CSS processing
- [.browserslistrc](.browserslistrc) - Browser support
- [scss/main.scss](scss/main.scss) - Import order

🎉 **You're ready to build!** Start with `npm run watch`
