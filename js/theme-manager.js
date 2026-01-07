/**
 * Centralized Theme Management System
 * Ensures dark/light theme syncs across all pages
 */

// Theme configuration
const THEME_KEY = 'studybuddy-theme';
const DARK_MODE_CLASS = 'dark-mode';

/**
 * Get the current theme from localStorage
 * @returns {string} 'dark' or 'light'
 */
function getCurrentTheme() {
  return localStorage.getItem(THEME_KEY) || 'light';
}

/**
 * Set and save the theme
 * @param {string} theme - 'dark' or 'light'
 */
function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

/**
 * Apply the theme to the document
 * @param {string} theme - 'dark' or 'light'
 */
function applyTheme(theme) {
  const isDark = theme === 'dark';
  
  if (isDark) {
    document.body.classList.add(DARK_MODE_CLASS);
  } else {
    document.body.classList.remove(DARK_MODE_CLASS);
  }
  
  updateThemeIcon(isDark);
}

/**
 * Update the theme toggle icon
 * @param {boolean} isDark - Whether dark mode is active
 */
function updateThemeIcon(isDark) {
  const themeIcon = document.getElementById('theme-icon');
  if (!themeIcon) return;
  
  if (isDark) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

/**
 * Initialize theme on page load
 */
function initializeTheme() {
  const savedTheme = getCurrentTheme();
  applyTheme(savedTheme);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  // DOM is already ready
  initializeTheme();
}

// Listen for storage changes from other tabs/windows
window.addEventListener('storage', (e) => {
  if (e.key === THEME_KEY && e.newValue) {
    applyTheme(e.newValue);
  }
});
