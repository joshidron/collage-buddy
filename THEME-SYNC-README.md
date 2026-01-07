# Dark/Light Theme Synchronization

## Overview
The CollageBuddy application now has a **centralized theme management system** that synchronizes dark and light modes across all pages.

## How It Works

### 1. Centralized Theme Manager (`js/theme-manager.js`)
- All theme logic is centralized in a single JavaScript file
- Uses `localStorage` to persist theme preference
- Automatically applies the saved theme on page load
- Syncs theme changes across browser tabs using the Storage API

### 2. Key Features
- ✅ **Persistent Theme**: Your theme choice is saved and remembered
- ✅ **Cross-Page Sync**: Theme stays consistent across all pages
- ✅ **Cross-Tab Sync**: Theme changes sync across browser tabs in real-time
- ✅ **Smooth Transitions**: CSS transitions for seamless theme switching
- ✅ **Icon Updates**: Theme toggle icon automatically updates (moon ↔ sun)

### 3. Implementation Details

#### Theme Storage
- Storage Key: `studybuddy-theme`
- Values: `'light'` or `'dark'`
- Location: Browser's `localStorage`

#### CSS Variables
The theme system uses CSS custom properties (variables) defined in `:root` and `body.dark-mode`:

```css
:root {
  --bg-body: #FAFAFA;
  --bg-card: #FFFFFF;
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --accent: #2563EB;
  --accent-light: #EFF6FF;
  --border: #E2E8F0;
}

body.dark-mode {
  --bg-body: #0F172A;
  --bg-card: #1E293B;
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --accent-light: #334155;
  --border: #334155;
}
```

#### Theme Toggle Button
All pages have a theme toggle button in the sidebar:
```html
<a href="#" class="nav-item" onclick="toggleTheme()">
  <i class="fas fa-moon" id="theme-icon"></i>
  <span>Wait/Dark</span>
</a>
```

### 4. Updated Files
All HTML pages now include the centralized theme manager:
- ✅ index.html
- ✅ collab.html
- ✅ profile.html
- ✅ courses.html
- ✅ about.html
- ✅ celendar.html
- ✅ coding-practice.html
- ✅ course_details.html
- ✅ interview.html
- ✅ onboarding.html
- ✅ resources.html
- ✅ system-design.html
- ✅ todo.html
- ✅ 2nd.html

### 5. Testing
To test the theme synchronization:
1. Open any page (e.g., `index.html`)
2. Click the theme toggle button in the sidebar
3. Navigate to another page - theme should persist
4. Open the same site in another tab - theme should match
5. Change theme in one tab - other tabs update automatically

### 6. Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

## Technical Notes

### Storage Event Listener
The theme manager listens for storage events to sync across tabs:
```javascript
window.addEventListener('storage', (e) => {
  if (e.key === THEME_KEY && e.newValue) {
    applyTheme(e.newValue);
  }
});
```

### Auto-Initialization
The theme is automatically applied when the DOM loads:
```javascript
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  initializeTheme();
}
```

## Maintenance
- All theme-related code is in `js/theme-manager.js`
- To modify theme behavior, edit only this file
- CSS variables can be customized in each page's `<style>` section
- No need to update individual pages for theme logic changes

## Future Enhancements
- [ ] System theme detection (prefers-color-scheme)
- [ ] Multiple theme options (not just dark/light)
- [ ] Theme transition animations
- [ ] Per-page theme overrides
