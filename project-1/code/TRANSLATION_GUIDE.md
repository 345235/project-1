# Multi-Language Translation System - Implementation Guide

## ✅ What's Been Done

Your website now has a complete multi-language translation system supporting:
- 🇩🇪 Deutsch (German) - Default
- 🇬🇧 English
- 🇪🇸 Español (Spanish)
- 🇫🇷 Français (French)
- 🇵🇹 Português (Portuguese)

## 📁 New Files Created

1. **translations.js** - Main translation library with all dictionary entries
2. **language-selector.html** - Reusable language selector component
3. **TRANSLATION_GUIDE.md** - This file

## 🚀 How to Use

### Option 1: Add Language Selector to Your Pages

Add this snippet to any HTML file where you want the language selector to appear (recommended in header or top-right):

```html
<!-- Add this in your <body> or <main> section -->
<iframe src="language-selector.html" style="border:none; width:auto; height:auto;"></iframe>

<!-- Or embed the selector directly -->
<div class="language-selector">
  <select id="language-select" onchange="setLanguage(this.value)">
    <option value="de">Deutsch</option>
    <option value="en">English</option>
    <option value="es">Español</option>
    <option value="fr">Français</option>
    <option value="pt">Português</option>
  </select>
</div>
```

### Option 2: Programmatic Language Switching

In your JavaScript code:

```javascript
// Switch language
setLanguage('en');  // English
setLanguage('es');  // Spanish
setLanguage('fr');  // French
setLanguage('pt');  // Portuguese
setLanguage('de');  // German (default)

// Get current language
const currentLang = getCurrentLanguage();

// Get available languages
const langs = getAvailableLanguages(); // Returns ['de', 'en', 'es', 'fr', 'pt']
```

### Option 3: Add Translations in Settings

You could add language selection buttons in your settings.html page to let users choose their language.

## 📝 Adding New Translations

To add new text to translations:

1. **Open translations.js**
2. **Add a new key-value pair to each language object:**

```javascript
const translations = {
  de: {
    your_new_key: "Your German Text",
    // ...
  },
  en: {
    your_new_key: "Your English Text",
    // ...
  },
  es: {
    your_new_key: "Tu texto en español",
    // ...
  },
  fr: {
    your_new_key: "Votre texte en français",
    // ...
  },
  pt: {
    your_new_key: "Seu texto em português",
    // ...
  }
};
```

3. **Use in HTML:**

```html
<span data-t="your_new_key">Your German Text</span>
```

## 🔄 How It Works

1. **Auto-Loading**: `translations.js` is already added to all your HTML files
2. **Page Load**: When a page loads, it checks for a saved language preference (localStorage)
3. **Default**: Defaults to German (de) if no preference is saved
4. **Translation**: All elements with `data-t` attributes are automatically translated
5. **Persistence**: Language choice is saved to browser's localStorage

## 🎯 Current Translation Keys

Your site currently supports these translatable terms:

```
dashboard - Panel/Main dashboard
startseite - Home page
termine - Appointments/Schedule
projects - Projects section
profile - User profile
kalendar - Calendar
settings - Settings
create - Create button/action
todo - To-do list
project - Project item
folder - Folder item
document - Document item
work - Work category
school - School category
private - Private category
other - Other category
```

## 📱 Browser Compatibility

- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile browsers: Full support

Language preference is saved locally on each device.

## 🛠️ Troubleshooting

**Text not translating?**
- Ensure `translations.js` is loaded before other scripts
- Check that your HTML element has the `data-t` attribute with the correct key
- Check browser console for any errors

**Language not saving?**
- Browser's localStorage might be disabled
- Try clearing browser cache and reload

**Want to remove a language?**
- Edit `translations.js` and remove that language object
- Update `language-selector.html` to remove that option

## 💡 Tips

- Keep translation keys lowercase and use underscores (e.g., `new_feature`)
- Test translations in all 5 languages to ensure UI doesn't break
- Consider text length differences (German is typically longer than English)
- For RTL languages in the future, you can modify `updatePageTranslations()` to set `dir="rtl"`

---

Enjoy your multi-language website! 🌍
