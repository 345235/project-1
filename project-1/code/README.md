👋Hi this is my first Project. It is not finished yet but you can already download what i have done so far. If you have any tips or feedback than notice me please thanks.

⬇️ How to download :

Step 1:     
Download all of the files 

Step 2:
Open the startseite-4.html with your favorite browser

Finished ✅

🌍 **TRANSLATION SYSTEM**

Your website now supports multiple languages: **German (Deutsch), English, Spanish (Español), French (Français), and Portuguese (Português)**

**How It Works:**
- All text that has `data-t` attributes will be automatically translated
- The translation file is `translations.js` which is automatically loaded on all pages
- Languages are persisted in browser localStorage, so user's language choice is remembered

**How to Use:**

1. **Add Language Selector** (Optional):
   - Include the `language-selector.html` in your page to let users switch languages
   - Or users can set language programmatically by calling: `setLanguage('en')` or `setLanguage('es')`

2. **Add Translatable Text**:
   - Use the `data-t` attribute on HTML elements with the translation key
   - Example: `<span data-t="dashboard">Dashboard</span>`
   - The script will automatically replace the text based on the current language

3. **Available Translation Keys**:
   - dashboard, startseite, termine, projects, profile, kalendar, settings
   - create, todo, project, folder, document
   - work, school, private, other

4. **Change Language Programmatically**:
   ```javascript
   setLanguage('en');  // Switch to English
   setLanguage('es');  // Switch to Spanish
   setLanguage('fr');  // Switch to French
   setLanguage('pt');  // Switch to Portuguese
   setLanguage('de');  // Switch to German (default)
   ```

5. **Get Current Language**:
   ```javascript
   getCurrentLanguage(); // Returns current language code
   ```

**Current Translation Coverage:**

| Key | Deutsch | English | Español | Français | Português |
|-----|---------|---------|---------|----------|-----------|
| dashboard | Dashboard | Dashboard | Panel de Control | Tableau de Bord | Painel |
| startseite | startseite | Home | Inicio | Accueil | Início |
| termine | termine | Appointments | Citas | Rendez-vous | Compromissos |
| projects | Projects | Projects | Proyectos | Projets | Projetos |
| profile | Profile | Profile | Perfil | Profil | Perfil |
| kalendar | Kalendar | Calendar | Calendario | Calendrier | Calendário |
| settings | Einstellungen | Settings | Configuración | Paramètres | Configurações |
| create | Create | Create | Crear | Créer | Criar |
| todo | Todo-list | To-do List | Lista de Tareas | Liste de Tâches | Lista de Tarefas |

**To Add More Translations:**
1. Edit `translations.js`
2. Add your new key to all language objects (en, es, fr, pt)
3. Use `data-t="your-key"` in your HTML elements

---

I am german so I first made the website in german and now it has multi-language support!

I did a little bit of vibe coding for the settings page so it looks a bit different
