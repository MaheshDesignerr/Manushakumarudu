/**
 * Manushakumarudu – Bible Promise Studio
 * Main Application Logic
 * Version: 1.0.0
 */

// ============================================================
// SECTION 1: APP STATE
// ============================================================

const AppState = {
  currentPage: 'dashboard',
  verses: [],
  generatedImages: [],
  selectedFormat: 'instagram-square',
  selectedTemplate: 1,
  bgMode: 'template',
  selectedBg: 'orange-solid',
  batchId: null,
  isGenerating: false,
  settings: {
    maxVerses: 100,
    defaultFormat: 'instagram-square',
    quality: 'high',
    autoSaveHistory: true,
    appsScriptUrl: '',
    driveFolderId: '',
    theme: 'light'
  },
  brand: {
    name: 'Manushakumarudu',
    logoDataUrl: null,
    logoEnabled: true,
    nameEnabled: true,
    font: 'Inter',
    color: '#FFFFFF',
    position: 'bottom-center',
    size: 24,
    opacity: 0.9
  },
  history: [],
  customBgs: [],
  favTemplates: [],
  importPreview: [],
  cancelRequested: false
};

// ============================================================
// SECTION 6: IMAGE DIMENSIONS
// ============================================================

const IMAGE_FORMATS = {
  'instagram-square':   { width: 1080, height: 1080,  label: 'Instagram Square' },
  'instagram-portrait': { width: 1080, height: 1350,  label: 'Instagram Portrait' },
  'instagram-story':    { width: 1080, height: 1920,  label: 'Instagram Story' },
  'landscape':          { width: 1920, height: 1080,  label: 'Landscape Post' },
  'a4-poster':          { width: 2480, height: 3508,  label: 'A4 Poster' },
  'a5-poster':          { width: 1748, height: 2480,  label: 'A5 Poster' }
};

// ============================================================
// SECTION 7: BACKGROUND LIBRARY DATA
// ============================================================

const BACKGROUNDS = {
  solid: [
    { id: 'orange-solid',      label: 'Orange',       color: '#D4722A' },
    { id: 'cream-solid',       label: 'Cream',        color: '#FFF8F0' },
    { id: 'beige-solid',       label: 'Beige',        color: '#F5F0E8' },
    { id: 'white-solid',       label: 'White',        color: '#FFFFFF' },
    { id: 'black-solid',       label: 'Black',        color: '#1A1A1A' },
    { id: 'navy-solid',        label: 'Navy Blue',    color: '#1A2F4E' },
    { id: 'royal-blue-solid',  label: 'Royal Blue',   color: '#2563EB' },
    { id: 'pastel-pink-solid', label: 'Pastel Pink',  color: '#FDF2F8' },
    { id: 'light-green-solid', label: 'Light Green',  color: '#F0FDF4' },
    { id: 'dark-green-solid',  label: 'Dark Green',   color: '#14532D' },
    { id: 'gold-solid',        label: 'Gold',         color: '#D4A017' },
    { id: 'brown-solid',       label: 'Brown',        color: '#7C4A24' }
  ],
  gradient: [
    { id: 'sunrise-gradient',   label: 'Sunrise',      colors: ['#FF8C00', '#FFD700'] },
    { id: 'sunset-gradient',    label: 'Sunset',       colors: ['#FF6B35', '#FFB347', '#FF6B6B'] },
    { id: 'ocean-gradient',     label: 'Ocean',        colors: ['#1A2F4E', '#2563EB', '#38BDF8'] },
    { id: 'forest-gradient',    label: 'Forest',       colors: ['#14532D', '#16A34A', '#86EFAC'] },
    { id: 'golden-gradient',    label: 'Golden',       colors: ['#78350F', '#D97706', '#FDE68A'] },
    { id: 'purple-gradient',    label: 'Purple',       colors: ['#4C1D95', '#7C3AED', '#C4B5FD'] },
    { id: 'pink-gradient',      label: 'Pink Blossom', colors: ['#9D174D', '#EC4899', '#FDF2F8'] },
    { id: 'earth-gradient',     label: 'Earth',        colors: ['#44403C', '#A8956A', '#FFF8F0'] },
    { id: 'royal-gradient',     label: 'Royal',        colors: ['#1E1B4B', '#3730A3', '#818CF8'] },
    { id: 'morning-gradient',   label: 'Morning',      colors: ['#FFF1F2', '#FDE68A', '#FFFFFF'] },
    { id: 'deep-blue-gradient', label: 'Deep Blue',    colors: ['#0C1445', '#1E3A8A', '#3B82F6'] },
    { id: 'warm-gradient',      label: 'Warm Cream',   colors: ['#FFF8F0', '#FDDCB5', '#F9CBA7'] }
  ],
  pattern: [
    { id: 'marble-pattern',     label: 'Marble',         type: 'marble' },
    { id: 'paper-pattern',      label: 'Paper Texture',  type: 'paper' },
    { id: 'watercolor-pattern', label: 'Watercolour',    type: 'watercolor' },
    { id: 'cross-pattern',      label: 'Cross Pattern',  type: 'cross' },
    { id: 'dove-pattern',       label: 'Light Rays',     type: 'rays' },
    { id: 'floral-pattern',     label: 'Floral',         type: 'floral' }
  ]
};

// ============================================================
// SECTION 8: DESIGN TEMPLATES DATA
// ============================================================

const TEMPLATES = [
  { id:  1, name: 'Minimal Elegant',       category: 'minimal',   textColor: '#1A1A1A', refColor: '#6B7280', bgId: 'cream-solid',       font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: null,              refFont: 'Inter',            overlay: null,             decorative: 'minimal-line' },
  { id:  2, name: 'Orange Gold',           category: 'modern',    textColor: '#FFFFFF', refColor: '#FDE68A', bgId: 'orange-solid',      font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: 'gold-thin',       refFont: 'Inter',            overlay: 'gold-vignette',  decorative: 'gold-ornament' },
  { id:  3, name: 'Royal Blue',            category: 'modern',    textColor: '#FFFFFF', refColor: '#BAE6FD', bgId: 'navy-solid',        font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: 'white-thin',      refFont: 'Inter',            overlay: null,             decorative: 'star-ornament' },
  { id:  4, name: 'Sunrise Theme',         category: 'nature',    textColor: '#FFFFFF', refColor: '#FEF3C7', bgId: 'sunrise-gradient',  font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: null,              refFont: 'Inter',            overlay: 'light-overlay',  decorative: 'sun-rays' },
  { id:  5, name: 'Dark Premium',          category: 'dark',      textColor: '#F5C842', refColor: '#FFFFFF', bgId: 'black-solid',       font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: 'gold-thin',       refFont: 'Inter',            overlay: null,             decorative: 'gold-ornament' },
  { id:  6, name: 'Golden Bible',          category: 'christian', textColor: '#3D1A00', refColor: '#7C4A24', bgId: 'golden-gradient',   font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: 'brown-elegant',   refFont: 'Inter',            overlay: null,             decorative: 'bible-ornament' },
  { id:  7, name: 'Ocean Deep',            category: 'nature',    textColor: '#FFFFFF', refColor: '#BAE6FD', bgId: 'ocean-gradient',    font: 'Inter',            fontSize: 'auto', align: 'center', refPosition: 'bottom-right',  border: null,              refFont: 'Inter',            overlay: null,             decorative: null },
  { id:  8, name: 'Forest Green',          category: 'nature',    textColor: '#FFFFFF', refColor: '#86EFAC', bgId: 'forest-gradient',   font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: null,              refFont: 'Inter',            overlay: 'dark-overlay',   decorative: null },
  { id:  9, name: 'Cream Classic',         category: 'minimal',   textColor: '#3D1A00', refColor: '#7C4A24', bgId: 'warm-gradient',     font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: 'brown-thin',      refFont: 'Inter',            overlay: null,             decorative: 'minimal-line' },
  { id: 10, name: 'Modern Typography',     category: 'modern',    textColor: '#1A1A1A', refColor: '#D4722A', bgId: 'white-solid',       font: 'Inter',            fontSize: 'auto', align: 'left',   refPosition: 'bottom-left',   border: 'orange-left-accent', refFont: 'Inter',           overlay: null,             decorative: 'left-bar' },
  { id: 11, name: 'Purple Royal',          category: 'modern',    textColor: '#FFFFFF', refColor: '#C4B5FD', bgId: 'purple-gradient',   font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: null,              refFont: 'Inter',            overlay: null,             decorative: 'star-ornament' },
  { id: 12, name: 'Morning Light',         category: 'nature',    textColor: '#1A1A1A', refColor: '#6B7280', bgId: 'morning-gradient',  font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: null,              refFont: 'Inter',            overlay: null,             decorative: 'minimal-line' },
  { id: 13, name: 'Pink Blossom',          category: 'nature',    textColor: '#831843', refColor: '#BE185D', bgId: 'pink-gradient',     font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: null,              refFont: 'Inter',            overlay: null,             decorative: 'floral-corner' },
  { id: 14, name: 'Earth Tones',           category: 'nature',    textColor: '#1C1917', refColor: '#78350F', bgId: 'earth-gradient',    font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: 'brown-thin',      refFont: 'Inter',            overlay: null,             decorative: 'minimal-line' },
  { id: 15, name: 'Deep Blue Scripture',   category: 'christian', textColor: '#FFFFFF', refColor: '#93C5FD', bgId: 'deep-blue-gradient',font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: 'white-elegant',   refFont: 'Inter',            overlay: null,             decorative: 'cross-subtle' },
  { id: 16, name: 'Vintage Paper',         category: 'minimal',   textColor: '#3D2B1F', refColor: '#7C4A24', bgId: 'paper-pattern',     font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: 'vintage-frame',   refFont: 'Playfair Display', overlay: null,             decorative: 'vintage-ornament' },
  { id: 17, name: 'Gradient Modern',       category: 'modern',    textColor: '#FFFFFF', refColor: '#FDE68A', bgId: 'royal-gradient',    font: 'Inter',            fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: null,              refFont: 'Inter',            overlay: 'subtle-overlay', decorative: null },
  { id: 18, name: 'Scripture Highlight',   category: 'christian', textColor: '#1A2F4E', refColor: '#D4722A', bgId: 'cream-solid',       font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: 'blue-elegant',    refFont: 'Inter',            overlay: null,             decorative: 'cross-subtle' },
  { id: 19, name: 'Premium Poster',        category: 'dark',      textColor: '#FDE68A', refColor: '#FFFFFF', bgId: 'navy-solid',        font: 'Playfair Display', fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: 'gold-elegant',    refFont: 'Inter',            overlay: null,             decorative: 'gold-ornament' },
  { id: 20, name: 'Minimal White',         category: 'minimal',   textColor: '#1A1A1A', refColor: '#6B7280', bgId: 'white-solid',       font: 'Inter',            fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: 'light-thin',      refFont: 'Inter',            overlay: null,             decorative: null }
];

// ============================================================
// SECTION 20: UTILITY FUNCTIONS
// ============================================================

function detectScriptLanguage(text, fallback) {
  var t = text || '';
  if (/[\u0C00-\u0C7F]/.test(t)) return 'telugu';
  if (/[\u0B80-\u0BFF]/.test(t)) return 'tamil';
  if (/[\u0C80-\u0CFF]/.test(t)) return 'kannada';
  if (/[\u0D00-\u0D7F]/.test(t)) return 'malayalam';
  if (/[\u0980-\u09FF]/.test(t)) return 'bengali';
  if (/[\u0900-\u097F]/.test(t)) return 'hindi';
  return fallback || 'english';
}

function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function formatDate(date) {
  if (!date) date = new Date();
  if (!(date instanceof Date)) date = new Date(date);
  return date.toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function truncateText(text, maxLen) {
  if (!text) return '';
  return text.length > maxLen ? text.substring(0, maxLen) + '...' : text;
}

function debounce(fn, delay) {
  var timer;
  return function() {
    var args = arguments;
    var ctx = this;
    clearTimeout(timer);
    timer = setTimeout(function() { fn.apply(ctx, args); }, delay);
  };
}

function sanitizeFilename(text) {
  if (!text) return 'image';
  return text.replace(/[^a-z0-9_\-\.]/gi, '_').replace(/_+/g, '_').substring(0, 60);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

// ============================================================
// SECTION 3: TOAST NOTIFICATIONS
// ============================================================

function showToast(message, type, duration) {
  type = type || 'info';
  duration = duration || 4000;

  var container = document.getElementById('toast-container');
  if (!container) return;

  // Max 5 toasts — remove oldest
  var existing = container.querySelectorAll('.toast');
  if (existing.length >= 5) {
    container.removeChild(existing[0]);
  }

  var icons = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    error:   '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
    warning: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
    info:    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
  };

  var toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML =
    '<span class="toast-icon">' + (icons[type] || icons.info) + '</span>' +
    '<span class="toast-message">' + message + '</span>' +
    '<button class="toast-close" aria-label="Close">&times;</button>';

  var closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', function() { removeToast(toast); });

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(function() { toast.classList.add('toast-show'); });

  // Auto-remove
  setTimeout(function() { removeToast(toast); }, duration);
}

function removeToast(toast) {
  if (!toast || !toast.parentNode) return;
  toast.classList.remove('toast-show');
  toast.classList.add('toast-hide');
  setTimeout(function() {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 400);
}

// ============================================================
// SECTION 2: NAVIGATION
// ============================================================

function initNavigation() {
  var navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(function(item) {
    item.addEventListener('click', function() {
      var page = item.getAttribute('data-page');
      if (page) navigateTo(page);
    });
  });

  var sidebarToggle = document.getElementById('sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
      var sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.toggle('open');
    });
  }
}

var PAGE_TITLES = {
  dashboard:   'Dashboard',
  create:      'Create Promise Cards',
  import:      'Bulk Import',
  templates:   'Design Templates',
  backgrounds: 'Background Library',
  gallery:     'Generated Images',
  history:     'Generation History',
  brand:       'Brand Settings',
  settings:    'General Settings'
};

function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });

  // Show target page
  var target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  // Update nav items
  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.classList.remove('active');
    if (item.getAttribute('data-page') === page) {
      item.classList.add('active');
    }
  });

  // Update page title
  var titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.textContent = PAGE_TITLES[page] || page;

  AppState.currentPage = page;

  // Page-specific actions
  if (page === 'gallery') renderGallery();
  if (page === 'dashboard') updateDashboardStats();
  if (page === 'history') renderHistory();
  if (page === 'backgrounds') renderBackgroundLibrary();
  if (page === 'templates') renderTemplatesGrid();
  if (page === 'create' || page === 'import') mountDesignPanel(page);

  // Close sidebar on mobile
  var sidebar = document.getElementById('sidebar');
  if (sidebar && window.innerWidth < 768) {
    sidebar.classList.remove('open');
  }
}

// ============================================================
// SECTION 4: VERSE MANAGEMENT
// ============================================================

function addVerseManually() {
  var textEl = document.getElementById('verse-text');
  var refEl  = document.getElementById('verse-reference');
  var langEl = document.getElementById('verse-language');

  var text = textEl ? textEl.value.trim() : '';
  var reference = refEl ? refEl.value.trim() : '';
  var language  = detectScriptLanguage(text, langEl ? langEl.value : 'english');

  if (!text) {
    showToast('Please enter verse text.', 'error');
    return;
  }
  if (!reference) {
    showToast('Reference is empty. It will be marked as missing.', 'warning');
  }

  // Check for duplicate
  var isDuplicate = AppState.verses.some(function(v) {
    return v.text.trim().toLowerCase() === text.toLowerCase();
  });

  var verse = {
    id: generateId(),
    text: text,
    reference: reference,
    language: language,
    status: isDuplicate ? 'duplicate' : (reference ? 'valid' : 'missing-ref'),
    isEditing: false
  };

  AppState.verses.push(verse);
  renderVerseQueue();
  updateDashboardStats();
  updateVerseCountBadge();
  refreshPreview();

  // Clear form
  if (textEl) textEl.value = '';
  if (refEl)  refEl.value = '';

  showToast(isDuplicate ? 'Verse added (duplicate detected).' : 'Verse added successfully!', isDuplicate ? 'warning' : 'success');
}

function renderVerseQueue() {
  var table = document.getElementById('verse-queue-table');
  if (!table) return;

  var tbody = table.querySelector('tbody');
  if (!tbody) {
    tbody = document.createElement('tbody');
    table.appendChild(tbody);
  }

  if (AppState.verses.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No verses added yet. Add verses manually or import a file.</td></tr>';
  } else {
    tbody.innerHTML = AppState.verses.map(function(v, i) {
      var statusBadge = '';
      if (v.status === 'valid')       statusBadge = '<span class="badge badge-success">Valid</span>';
      else if (v.status === 'duplicate')  statusBadge = '<span class="badge badge-warning">Duplicate</span>';
      else if (v.status === 'missing-ref') statusBadge = '<span class="badge badge-error">No Ref</span>';

      return '<tr data-id="' + v.id + '">' +
        '<td>' + (i + 1) + '</td>' +
        '<td class="verse-preview">' + truncateText(v.text, 80) + '</td>' +
        '<td>' + (v.reference || '—') + '</td>' +
        '<td>' + (v.language || 'english') + '</td>' +
        '<td>' + statusBadge + '</td>' +
        '<td class="action-btns">' +
          '<button class="btn-icon btn-edit" onclick="editVerse(\'' + v.id + '\')" title="Edit">✏️</button>' +
          '<button class="btn-icon btn-delete" onclick="deleteVerse(\'' + v.id + '\')" title="Delete">🗑️</button>' +
        '</td>' +
      '</tr>';
    }).join('');
  }

  // Update verse count badge
  var badge = document.getElementById('verse-count-badge');
  if (badge) badge.textContent = AppState.verses.length;
}

function editVerse(id) {
  var verse = AppState.verses.find(function(v) { return v.id === id; });
  if (!verse) return;

  var textEl = document.getElementById('verse-text');
  var refEl  = document.getElementById('verse-reference');
  var langEl = document.getElementById('verse-language');

  if (textEl) textEl.value = verse.text;
  if (refEl)  refEl.value = verse.reference;
  if (langEl) langEl.value = verse.language || 'english';

  verse.isEditing = true;

  // Change add button to update
  var addBtn = document.getElementById('btn-add-verse');
  if (addBtn) {
    addBtn.textContent = 'Update Verse';
    addBtn.onclick = function() {
      var newText = textEl ? textEl.value.trim() : '';
      var newRef  = refEl  ? refEl.value.trim()  : '';
      var newLang = langEl ? langEl.value : 'english';

      if (!newText) { showToast('Verse text cannot be empty.', 'error'); return; }

      verse.text      = newText;
      verse.reference = newRef;
      verse.language  = newLang;
      verse.isEditing = false;
      verse.status    = newRef ? 'valid' : 'missing-ref';

      renderVerseQueue();
      showToast('Verse updated.', 'success');
      if (textEl) textEl.value = '';
      if (refEl)  refEl.value = '';

      addBtn.textContent = 'Add Verse';
      addBtn.onclick = addVerseManually;
    };
  }

  // Scroll to form
  var form = document.getElementById('verse-form');
  if (form) form.scrollIntoView({ behavior: 'smooth' });
}

function deleteVerse(id) {
  if (!confirm('Delete this verse?')) return;
  AppState.verses = AppState.verses.filter(function(v) { return v.id !== id; });
  renderVerseQueue();
  updateDashboardStats();
  showToast('Verse deleted.', 'info');
}

function validateVerses() {
  var valid = 0, invalid = 0, duplicate = 0;
  AppState.verses.forEach(function(v) {
    if (v.status === 'duplicate')   duplicate++;
    else if (v.status === 'missing-ref' || !v.text) invalid++;
    else valid++;
  });
  return { valid: valid, invalid: invalid, duplicate: duplicate };
}

// ============================================================
// SECTION 5: FILE IMPORT
// ============================================================

function initDropzone() {
  var dropzone  = document.getElementById('dropzone');
  var fileInput = document.getElementById('file-input');

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener('click', function() { fileInput.click(); });

  dropzone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropzone.classList.add('drag-over');
  });

  dropzone.addEventListener('dragleave', function(e) {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
  });

  dropzone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    var file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  fileInput.addEventListener('change', function() {
    if (fileInput.files.length) handleFile(fileInput.files[0]);
    fileInput.value = '';
  });
}

function handleFile(file) {
  var progress = document.getElementById('upload-progress');
  if (progress) { progress.style.display = 'block'; }

  var ext = file.name.split('.').pop().toLowerCase();
  try {
    if (ext === 'xlsx' || ext === 'xls') {
      importExcel(file);
    } else if (ext === 'csv') {
      importCSV(file);
    } else if (ext === 'pdf') {
      importPDF(file);
    } else if (ext === 'docx') {
      importDocx(file);
    } else {
      if (progress) progress.style.display = 'none';
      showToast('Unsupported file type. Use .xlsx, .csv, .pdf, or .docx', 'error');
    }
  } catch (err) {
    if (progress) progress.style.display = 'none';
    showToast('File read error: ' + err.message, 'error');
  }
}

function detectColumns(headers) {
  var verseIdx = -1, refIdx = -1, langIdx = -1;
  headers.forEach(function(h, i) {
    if (!h) return;
    var lower = String(h).toLowerCase().trim();
    if (verseIdx < 0 && ['bible verse','verse','text','content'].indexOf(lower) >= 0) verseIdx = i;
    if (refIdx   < 0 && ['bible reference','reference','ref','book','passage'].indexOf(lower) >= 0) refIdx = i;
    if (langIdx  < 0 && ['language','lang'].indexOf(lower) >= 0) langIdx = i;
  });
  return { verseIdx: verseIdx, refIdx: refIdx, langIdx: langIdx };
}

function importExcel(file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = new Uint8Array(e.target.result);
      var workbook = window.XLSX.read(data, { type: 'array' });
      var sheetName = workbook.SheetNames[0];
      var sheet = workbook.Sheets[sheetName];
      var rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

      if (!rows || rows.length < 2) {
        showToast('No data found in the Excel file.', 'error');
        var progress = document.getElementById('upload-progress');
        if (progress) progress.style.display = 'none';
        return;
      }

      var headers = rows[0].map(function(h) { return String(h).toLowerCase().trim(); });
      var cols = detectColumns(headers);
      var hasHeader = (cols.verseIdx >= 0 || cols.refIdx >= 0);

      var startRow = hasHeader ? 1 : 0;
      var vIdx = cols.verseIdx >= 0 ? cols.verseIdx : 1;
      var rIdx = cols.refIdx   >= 0 ? cols.refIdx   : 2;
      var lIdx = cols.langIdx  >= 0 ? cols.langIdx  : -1;

      var verses = [];
      for (var i = startRow; i < rows.length; i++) {
        var row = rows[i];
        var text = String(row[vIdx] || '').trim();
        var ref  = String(row[rIdx] || '').trim();
        var lang = lIdx >= 0 ? String(row[lIdx] || 'english').trim() : 'english';
        if (text) {
          verses.push({ id: generateId(), text: text, reference: ref, language: lang, status: 'valid', isEditing: false });
        }
      }
      processImportedVerses(verses);
    } catch (err) {
      showToast('Excel parse error: ' + err.message, 'error');
      var progress = document.getElementById('upload-progress');
      if (progress) progress.style.display = 'none';
    }
  };
  reader.readAsArrayBuffer(file);
}

function importCSV(file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var text = e.target.result;
      var rows = parseCSV(text);

      if (!rows || rows.length < 2) {
        showToast('No data found in the CSV file.', 'error');
        var progress = document.getElementById('upload-progress');
        if (progress) progress.style.display = 'none';
        return;
      }

      var headers = rows[0].map(function(h) { return String(h).toLowerCase().trim(); });
      var cols = detectColumns(headers);
      var hasHeader = (cols.verseIdx >= 0 || cols.refIdx >= 0);

      var startRow = hasHeader ? 1 : 0;
      var vIdx = cols.verseIdx >= 0 ? cols.verseIdx : 1;
      var rIdx = cols.refIdx   >= 0 ? cols.refIdx   : 2;
      var lIdx = cols.langIdx  >= 0 ? cols.langIdx  : -1;

      var verses = [];
      for (var i = startRow; i < rows.length; i++) {
        var row = rows[i];
        var txt = String(row[vIdx] || '').trim();
        var ref = String(row[rIdx] || '').trim();
        var lng = lIdx >= 0 ? String(row[lIdx] || 'english').trim() : 'english';
        if (txt) {
          verses.push({ id: generateId(), text: txt, reference: ref, language: lng, status: 'valid', isEditing: false });
        }
      }
      processImportedVerses(verses);
    } catch (err) {
      showToast('CSV parse error: ' + err.message, 'error');
      var progress = document.getElementById('upload-progress');
      if (progress) progress.style.display = 'none';
    }
  };
  reader.readAsText(file);
}

function parseCSV(text) {
  var rows = [];
  var lines = text.split(/\r?\n/);
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (!line.trim()) continue;
    var fields = [];
    var inQuote = false;
    var current = '';
    for (var c = 0; c < line.length; c++) {
      var ch = line[c];
      if (ch === '"') {
        if (inQuote && line[c + 1] === '"') { current += '"'; c++; }
        else inQuote = !inQuote;
      } else if (ch === ',' && !inQuote) {
        fields.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    fields.push(current);
    rows.push(fields);
  }
  return rows;
}

function importPDF(file) {
  if (!window.pdfjsLib) {
    showToast('PDF.js library not loaded. Cannot import PDF.', 'error');
    var progress = document.getElementById('upload-progress');
    if (progress) progress.style.display = 'none';
    return;
  }

  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  var reader = new FileReader();
  reader.onload = function(e) {
    var typedArray = new Uint8Array(e.target.result);
    window.pdfjsLib.getDocument(typedArray).promise.then(function(pdf) {
      var fullText = '';
      var pagePromises = [];
      for (var pn = 1; pn <= pdf.numPages; pn++) {
        pagePromises.push(pdf.getPage(pn).then(function(page) {
          return page.getTextContent().then(function(content) {
            return content.items.map(function(item) { return item.str; }).join(' ');
          });
        }));
      }
      return Promise.all(pagePromises).then(function(pages) {
        fullText = pages.join('\n');
        return fullText;
      });
    }).then(function(text) {
      // Parse numbered list patterns
      var verses = parsePDFText(text);
      if (verses.length === 0) {
        showToast('Could not extract verses from PDF. This may be a scanned PDF.', 'warning');
      }
      processImportedVerses(verses);
    }).catch(function(err) {
      showToast('PDF import error: ' + err.message, 'error');
      var progress = document.getElementById('upload-progress');
      if (progress) progress.style.display = 'none';
    });
  };
  reader.readAsArrayBuffer(file);
}

function parsePDFText(text) {
  var verses = [];
  // Try numbered patterns: "1. text (Ref)" or "1) text"
  var numberedPattern = /\d+[\.\)]\s+(.+?)(?:\n|$)/g;
  var match;
  while ((match = numberedPattern.exec(text)) !== null) {
    var line = match[1].trim();
    if (!line) continue;
    // Try to extract reference from end: (Book X:Y) or Book X:Y
    var refMatch = line.match(/\(([^)]+\d+:\d+[^)]*)\)\s*$/) ||
                   line.match(/([A-Z][a-z]+\s+\d+:\d+)\s*$/);
    var ref = '';
    var verseText = line;
    if (refMatch) {
      ref = refMatch[1];
      verseText = line.substring(0, line.length - refMatch[0].length).trim();
    }
    if (verseText) {
      verses.push({ id: generateId(), text: verseText, reference: ref, language: 'english', status: ref ? 'valid' : 'missing-ref', isEditing: false });
    }
  }

  // If no numbered patterns found, split by newlines
  if (verses.length === 0) {
    text.split('\n').forEach(function(line) {
      line = line.trim();
      if (line.length < 10) return;
      var refMatch = line.match(/\(([^)]+\d+:\d+[^)]*)\)\s*$/) ||
                     line.match(/([A-Z][a-z]+\s+\d+:\d+)\s*$/);
      var ref = '';
      var verseText = line;
      if (refMatch) {
        ref = refMatch[1];
        verseText = line.substring(0, line.length - refMatch[0].length).trim();
      }
      if (verseText && verseText.split(' ').length > 3) {
        verses.push({ id: generateId(), text: verseText, reference: ref, language: 'english', status: ref ? 'valid' : 'missing-ref', isEditing: false });
      }
    });
  }
  return verses;
}

function importDocx(file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      if (!window.JSZip) {
        showToast('JSZip library not loaded. Cannot import DOCX.', 'error');
        var progress = document.getElementById('upload-progress');
        if (progress) progress.style.display = 'none';
        return;
      }
      window.JSZip.loadAsync(e.target.result).then(function(zip) {
        var xmlFile = zip.file('word/document.xml');
        if (!xmlFile) {
          showToast('Invalid DOCX file structure.', 'error');
          return;
        }
        return xmlFile.async('string');
      }).then(function(xmlStr) {
        if (!xmlStr) return;
        var parser = new DOMParser();
        var doc = parser.parseFromString(xmlStr, 'application/xml');
        var paragraphs = doc.querySelectorAll('p');
        var lines = [];
        paragraphs.forEach(function(para) {
          var runs = para.querySelectorAll('t');
          var lineText = '';
          runs.forEach(function(t) { lineText += t.textContent; });
          if (lineText.trim()) lines.push(lineText.trim());
        });

        var verses = [];
        lines.forEach(function(line) {
          if (line.length < 5) return;
          // Remove leading number if present
          var cleaned = line.replace(/^\d+[\.\)]\s*/, '');
          var refMatch = cleaned.match(/\(([^)]+\d+:\d+[^)]*)\)\s*$/) ||
                         cleaned.match(/([A-Z][a-z]+\s+\d+:\d+)\s*$/);
          var ref = '';
          var verseText = cleaned;
          if (refMatch) {
            ref = refMatch[1];
            verseText = cleaned.substring(0, cleaned.length - refMatch[0].length).trim();
          }
          if (verseText && verseText.split(' ').length > 2) {
            verses.push({ id: generateId(), text: verseText, reference: ref, language: 'english', status: ref ? 'valid' : 'missing-ref', isEditing: false });
          }
        });
        processImportedVerses(verses);
      }).catch(function(err) {
        showToast('DOCX import error: ' + err.message, 'error');
        var progress = document.getElementById('upload-progress');
        if (progress) progress.style.display = 'none';
      });
    } catch (err) {
      showToast('DOCX read error: ' + err.message, 'error');
      var progress = document.getElementById('upload-progress');
      if (progress) progress.style.display = 'none';
    }
  };
  reader.readAsArrayBuffer(file);
}

function processImportedVerses(importedVerses) {
  var progress = document.getElementById('upload-progress');
  if (progress) progress.style.display = 'none';

  if (!importedVerses || importedVerses.length === 0) {
    showToast('No verses found in file.', 'warning');
    return;
  }

  // Filter empties
  var filtered = importedVerses.filter(function(v) { return v.text && v.text.trim(); });
  filtered.forEach(function(v) {
    if (!v.language || String(v.language).toLowerCase() === 'english') v.language = detectScriptLanguage(v.text, 'english');
  });

  // Mark duplicates within batch
  var seen = {};
  filtered.forEach(function(v) {
    var key = v.text.trim().toLowerCase();
    if (seen[key]) { v.status = 'duplicate'; }
    else { seen[key] = true; }
  });

  // Also check against existing verses
  filtered.forEach(function(v) {
    if (v.status === 'duplicate') return;
    var exists = AppState.verses.some(function(existing) {
      return existing.text.trim().toLowerCase() === v.text.trim().toLowerCase();
    });
    if (exists) v.status = 'duplicate';
    if (!v.reference) v.status = 'missing-ref';
  });

  AppState.importPreview = filtered;

  // Check batch size
  var max = AppState.settings.maxVerses || 20;
  var batchWarning = document.getElementById('batch-warning');
  if (filtered.length > max && batchWarning) {
    batchWarning.style.display = 'block';
    batchWarning.innerHTML =
      '<strong>⚠️ Batch size exceeded!</strong> Found ' + filtered.length +
      ' verses but max is ' + max + '. Only the first ' + max + ' will be imported. ' +
      '<button onclick="splitBatch()" class="btn btn-secondary btn-sm">Split into batches</button>';
  } else if (batchWarning) {
    batchWarning.style.display = 'none';
  }

  renderExtractedTable(filtered);

  // Show validation summary
  var valid = 0, invalid = 0, dup = 0;
  filtered.forEach(function(v) {
    if (v.status === 'valid') valid++;
    else if (v.status === 'duplicate') dup++;
    else invalid++;
  });

  var summary = document.getElementById('validation-summary');
  if (summary) {
    summary.style.display = 'block';
    summary.innerHTML =
      '<div class="validation-stats">' +
        '<span class="badge badge-success">✓ ' + valid + ' valid</span> ' +
        '<span class="badge badge-warning">⚠ ' + dup + ' duplicates</span> ' +
        '<span class="badge badge-error">✗ ' + invalid + ' missing ref</span>' +
      '</div>';
  }

  var confirmBtn = document.getElementById('btn-confirm-generate');
  if (confirmBtn) {
    confirmBtn.disabled = false;
    confirmBtn.removeAttribute('aria-disabled');
    confirmBtn.style.display = 'inline-flex';
  }
  if (typeof schedulePreview === 'function') schedulePreview();

  showToast('Extracted ' + filtered.length + ' verses from file.', 'success');
}

function renderExtractedTable(verses) {
  var countEl = document.getElementById('extracted-count');
  if (countEl) countEl.textContent = (verses ? verses.length : 0) + ' verses';
  var container = document.getElementById('extracted-verses-table');
  if (!container) return;

  if (!verses || verses.length === 0) {
    container.innerHTML = '<p class="empty-state">No verses extracted.</p>';
    return;
  }

  var html = '<table class="data-table"><thead><tr>' +
    '<th>#</th><th>Verse Text</th><th>Reference</th><th>Language</th><th>Status</th><th>Actions</th>' +
    '</tr></thead><tbody>';

  verses.forEach(function(v, i) {
    var statusBadge = '';
    if (v.status === 'valid')        statusBadge = '<span class="badge badge-success">Valid</span>';
    else if (v.status === 'duplicate')    statusBadge = '<span class="badge badge-warning">Duplicate</span>';
    else if (v.status === 'missing-ref') statusBadge = '<span class="badge badge-error">No Ref</span>';

    html += '<tr data-preview-id="' + v.id + '">' +
      '<td>' + (i + 1) + '</td>' +
      '<td contenteditable="true" class="editable-cell" onblur="updatePreviewVerse(\'' + v.id + '\', \'text\', this.textContent)">' + v.text + '</td>' +
      '<td contenteditable="true" class="editable-cell" onblur="updatePreviewVerse(\'' + v.id + '\', \'reference\', this.textContent)">' + (v.reference || '') + '</td>' +
      '<td>' + (v.language || 'english') + '</td>' +
      '<td>' + statusBadge + '</td>' +
      '<td><button class="btn-icon btn-delete" onclick="deletePreviewVerse(\'' + v.id + '\')" title="Delete">🗑️</button></td>' +
      '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

function updatePreviewVerse(id, field, value) {
  var verse = AppState.importPreview.find(function(v) { return v.id === id; });
  if (!verse) return;
  verse[field] = value.trim();
  if (field === 'reference' && value.trim()) verse.status = 'valid';
  if (field === 'reference' && !value.trim()) verse.status = 'missing-ref';
}

function deletePreviewVerse(id) {
  AppState.importPreview = AppState.importPreview.filter(function(v) { return v.id !== id; });
  renderExtractedTable(AppState.importPreview);
}

function splitBatch() {
  var max = AppState.settings.maxVerses || 20;
  AppState.importPreview = AppState.importPreview.slice(0, max);
  renderExtractedTable(AppState.importPreview);
  var batchWarning = document.getElementById('batch-warning');
  if (batchWarning) batchWarning.style.display = 'none';
  showToast('Batch trimmed to ' + max + ' verses.', 'info');
}

// ============================================================
// SECTION 7 continued: BACKGROUND RENDERING
// ============================================================

function createBgItem(bg, size) {
  var item = document.createElement('div');
  item.className = 'bg-item' + (AppState.selectedBg === bg.id ? ' selected' : '');
  item.setAttribute('data-bg-id', bg.id);
  item.setAttribute('title', bg.label);
  item.style.width  = size + 'px';
  item.style.height = size + 'px';
  item.style.cursor = 'pointer';
  item.style.borderRadius = '8px';
  item.style.overflow = 'hidden';
  item.style.display = 'flex';
  item.style.alignItems = 'center';
  item.style.justifyContent = 'center';
  item.style.position = 'relative';

  if (bg.gen) {
    // Art library (Christian / Nature / Abstract): draw the real background as the thumbnail
    var acv = document.createElement('canvas');
    acv.width = size; acv.height = size;
    drawArt(acv.getContext('2d'), size, size, bg);
    item.appendChild(acv);
  } else if (bg.color) {
    // Solid
    item.style.background = bg.color;
  } else if (bg.colors) {
    // Gradient
    item.style.background = 'linear-gradient(135deg, ' + bg.colors.join(', ') + ')';
  } else if (bg.dataUrl) {
    item.style.backgroundImage = 'url(' + bg.dataUrl + ')';
    item.style.backgroundSize = 'cover';
    item.style.backgroundPosition = 'center';
  } else if (bg.type) {
    // Pattern — use a mini canvas preview
    var canvas = document.createElement('canvas');
    canvas.width  = size;
    canvas.height = size;
    var pctx = canvas.getContext('2d');
    drawPatternPreview(pctx, size, size, bg.type);
    item.appendChild(canvas);
  }

  var label = document.createElement('div');
  label.style.position = 'absolute';
  label.style.bottom = '0';
  label.style.left = '0';
  label.style.right = '0';
  label.style.background = 'rgba(0,0,0,0.5)';
  label.style.color = '#fff';
  label.style.fontSize = '10px';
  label.style.textAlign = 'center';
  label.style.padding = '2px';
  label.textContent = bg.label;
  item.appendChild(label);

  item.addEventListener('click', function() { selectBackground(bg.id); });
  return item;
}

function drawPatternPreview(ctx, W, H, type) {
  switch (type) {
    case 'marble':
      ctx.fillStyle = '#f5f0e8';
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(150,130,100,0.3)';
      ctx.lineWidth = 1;
      for (var i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * W, 0);
        ctx.bezierCurveTo(Math.random() * W, H * 0.3, Math.random() * W, H * 0.6, Math.random() * W, H);
        ctx.stroke();
      }
      break;
    case 'paper':
      ctx.fillStyle = '#f9f3e8';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(0,0,0,0.03)';
      for (var j = 0; j < 200; j++) {
        ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
      }
      break;
    case 'watercolor':
      var gr = ctx.createLinearGradient(0, 0, W, H);
      gr.addColorStop(0, '#e8f4f8');
      gr.addColorStop(0.5, '#fce4ec');
      gr.addColorStop(1, '#f3e5f5');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, W, H);
      break;
    case 'cross':
      ctx.fillStyle = '#f5f0e8';
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(150,100,50,0.2)';
      ctx.lineWidth = 1;
      for (var x = 0; x < W; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (var y = 0; y < H; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      break;
    case 'rays':
      var rgr = ctx.createRadialGradient(W / 2, 0, 0, W / 2, H / 2, Math.max(W, H));
      rgr.addColorStop(0, '#fffde7');
      rgr.addColorStop(1, '#fff8e1');
      ctx.fillStyle = rgr;
      ctx.fillRect(0, 0, W, H);
      break;
    case 'floral':
      ctx.fillStyle = '#fdf2f8';
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(200,100,150,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(10, 10, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(W - 10, H - 10, 8, 0, Math.PI * 2);
      ctx.stroke();
      break;
    default:
      if (!drawPatternExtra(ctx, W, H, type)) {
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(0, 0, W, H);
      }
  }
}

// ============================================================
// SECTION 8 continued: TEMPLATE RENDERING
// ============================================================

function renderTemplatesGrid(filter) {
  filter = filter || 'all';
  var grid = document.getElementById('templates-grid');
  if (!grid) return;
  grid.innerHTML = '';

  var list = filter === 'all' ? TEMPLATES : TEMPLATES.filter(function(t) { return t.category === filter; });
  list.forEach(function(template) {
    var card = createTemplateCard(template, 200);
    grid.appendChild(card);
  });
}

function renderTemplateSelector() {
  var container = document.getElementById('template-selector');
  if (!container) return;
  container.innerHTML = '';

  TEMPLATES.forEach(function(template) {
    var card = createTemplateCard(template, 100);
    container.appendChild(card);
  });
}

function createTemplateCard(template, size) {
  var card = document.createElement('div');
  card.className = 'template-card' + (AppState.selectedTemplate === template.id ? ' selected' : '');
  card.setAttribute('data-template-id', template.id);
  card.style.cursor = 'pointer';
  card.style.borderRadius = '8px';
  card.style.overflow = 'hidden';
  card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  card.style.display = 'inline-flex';
  card.style.flexDirection = 'column';
  card.style.width = size + 'px';

  // Mini canvas preview
  var canvas = document.createElement('canvas');
  canvas.width  = size;
  canvas.height = size;
  var pctx = canvas.getContext('2d');
  drawTemplatePreview(pctx, size, size, template);
  card.appendChild(canvas);

  // Name label
  var nameDiv = document.createElement('div');
  nameDiv.style.padding = '4px 6px';
  nameDiv.style.background = '#fff';
  nameDiv.style.fontSize = size > 150 ? '12px' : '10px';
  nameDiv.style.textAlign = 'center';
  nameDiv.style.borderTop = '1px solid #eee';
  nameDiv.textContent = template.name;
  card.appendChild(nameDiv);

  if (size > 150) {
    // Buttons for full grid
    var btns = document.createElement('div');
    btns.style.display = 'flex';
    btns.style.gap = '4px';
    btns.style.padding = '4px 6px';
    btns.style.background = '#fff';
    btns.innerHTML =
      '<button class="btn btn-primary btn-sm" style="flex:1" onclick="selectTemplate(' + template.id + ')">Apply</button>' +
      '<button class="btn btn-secondary btn-sm" onclick="toggleFavTemplate(' + template.id + ')" title="Favourite">★</button>';
    card.appendChild(btns);
  }

  canvas.addEventListener('click', function() { selectTemplate(template.id); });
  nameDiv.addEventListener('click', function() { selectTemplate(template.id); });

  return card;
}

function drawTemplatePreview(ctx, W, H, template) {
  // Draw background
  var bgId = template.bgId;
  drawBackgroundSync(ctx, W, H, bgId);

  // Sample text
  ctx.fillStyle = template.textColor || '#FFFFFF';
  ctx.font = 'italic ' + Math.floor(W * 0.07) + 'px serif';
  ctx.textAlign = 'center';
  ctx.fillText('"Promise of God"', W / 2, H * 0.5);

  // Reference
  ctx.fillStyle = template.refColor || '#CCCCCC';
  ctx.font = Math.floor(W * 0.055) + 'px sans-serif';
  ctx.fillText('— John 3:16', W / 2, H * 0.65);

  // Template name
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = Math.floor(W * 0.045) + 'px sans-serif';
  ctx.fillText(template.name, W / 2, H * 0.9);
}

function drawBackgroundSync(ctx, W, H, bgId) {
  // Solid
  var solid = BACKGROUNDS.solid.find(function(b) { return b.id === bgId; });
  if (solid) {
    ctx.fillStyle = solid.color;
    ctx.fillRect(0, 0, W, H);
    return;
  }
  // Gradient
  var grad = BACKGROUNDS.gradient.find(function(b) { return b.id === bgId; });
  if (grad) {
    var gr = ctx.createLinearGradient(0, 0, 0, H);
    var stops = grad.colors;
    stops.forEach(function(c, i) {
      gr.addColorStop(i / (stops.length - 1), c);
    });
    ctx.fillStyle = gr;
    ctx.fillRect(0, 0, W, H);
    return;
  }
  // Pattern
  var pat = BACKGROUNDS.pattern.find(function(b) { return b.id === bgId; });
  if (pat) {
    drawPatternPreview(ctx, W, H, pat.type);
    return;
  }
  // Art library (Christian / Nature / Abstract)
  var art = BACKGROUNDS.art ? BACKGROUNDS.art.find(function(b) { return b.id === bgId; }) : null;
  if (art) { drawArt(ctx, W, H, art); return; }
  // Fallback
  ctx.fillStyle = '#CCCCCC';
  ctx.fillRect(0, 0, W, H);
}

function toggleFavTemplate(id) {
  var idx = AppState.favTemplates.indexOf(id);
  if (idx >= 0) {
    AppState.favTemplates.splice(idx, 1);
    showToast('Removed from favourites.', 'info', 1500);
  } else {
    AppState.favTemplates.push(id);
    showToast('Added to favourites.', 'success', 1500);
  }
  saveToLocalStorage();
}

// ============================================================
// SECTION 6 continued: FORMAT SELECTOR
// ============================================================

// ============================================================
// SECTION 9: CANVAS IMAGE GENERATOR
// ============================================================

function wrapText(ctx, text, maxWidth) {
  var lines = [];
  // Handle explicit newlines
  var paragraphs = text.split(/\n/);
  paragraphs.forEach(function(para) {
    if (!para.trim()) { lines.push(''); return; }
    var words = para.split(' ');
    var currentLine = '';
    words.forEach(function(word) {
      var testLine = currentLine ? currentLine + ' ' + word : word;
      var metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    if (currentLine) lines.push(currentLine);
  });
  return lines;
}

async function drawBackground(ctx, W, H, bgId) {
  // Check custom bgs first
  var customBg = AppState.customBgs.find(function(b) { return b.id === bgId; });
  if (customBg && customBg.dataUrl) {
    return new Promise(function(resolve) {
      var img = new Image();
      img.onload = function() {
        // Cover fit
        var scale = Math.max(W / img.width, H / img.height);
        var sw = img.width * scale;
        var sh = img.height * scale;
        ctx.drawImage(img, (W - sw) / 2, (H - sh) / 2, sw, sh);
        resolve();
      };
      img.onerror = function() {
        ctx.fillStyle = '#CCCCCC';
        ctx.fillRect(0, 0, W, H);
        resolve();
      };
      img.src = customBg.dataUrl;
    });
  }

  drawBackgroundSync(ctx, W, H, bgId);
}

function drawOverlay(ctx, W, H, overlayType) {
  switch (overlayType) {
    case 'dark-overlay': {
      var gr = ctx.createLinearGradient(0, H * 0.5, 0, H);
      gr.addColorStop(0, 'rgba(0,0,0,0)');
      gr.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, W, H);
      break;
    }
    case 'light-overlay': {
      var gr2 = ctx.createLinearGradient(0, 0, 0, H * 0.5);
      gr2.addColorStop(0, 'rgba(255,255,255,0.3)');
      gr2.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gr2;
      ctx.fillRect(0, 0, W, H);
      break;
    }
    case 'gold-vignette': {
      var gr3 = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75);
      gr3.addColorStop(0, 'rgba(0,0,0,0)');
      gr3.addColorStop(1, 'rgba(80,40,0,0.45)');
      ctx.fillStyle = gr3;
      ctx.fillRect(0, 0, W, H);
      break;
    }
    case 'subtle-overlay': {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, W, H);
      break;
    }
  }
}

function drawDecoration(ctx, W, H, decorType, template) {
  ctx.save();
  switch (decorType) {
    case 'minimal-line': {
      ctx.strokeStyle = template.textColor || '#FFFFFF';
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = W * 0.0015;
      var lineY1 = H * 0.22;
      var lineY2 = H * 0.78;
      var lineX1 = W * 0.12;
      var lineX2 = W * 0.88;
      ctx.beginPath(); ctx.moveTo(lineX1, lineY1); ctx.lineTo(lineX2, lineY1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(lineX1, lineY2); ctx.lineTo(lineX2, lineY2); ctx.stroke();
      break;
    }
    case 'gold-ornament': {
      ctx.fillStyle = '#D4A017';
      ctx.globalAlpha = 0.8;
      var cx = W / 2, oy = H * 0.1;
      ctx.font = Math.floor(W * 0.06) + 'px serif';
      ctx.textAlign = 'center';
      ctx.fillText('✦ ✦ ✦', cx, oy);
      break;
    }
    case 'star-ornament': {
      ctx.fillStyle = template.textColor || '#FFFFFF';
      ctx.globalAlpha = 0.4;
      var stars = [[W * 0.1, H * 0.1], [W * 0.9, H * 0.1], [W * 0.1, H * 0.9], [W * 0.9, H * 0.9]];
      ctx.font = Math.floor(W * 0.035) + 'px serif';
      ctx.textAlign = 'center';
      stars.forEach(function(s) { ctx.fillText('★', s[0], s[1]); });
      break;
    }
    case 'sun-rays': {
      ctx.strokeStyle = 'rgba(255,220,80,0.3)';
      ctx.lineWidth = 1;
      var numRays = 24;
      var centerX = W / 2;
      var centerY = -H * 0.1;
      for (var r = 0; r < numRays; r++) {
        var angle = (r / numRays) * Math.PI;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * H * 1.5, centerY + Math.sin(angle) * H * 1.5);
        ctx.stroke();
      }
      break;
    }
    case 'floral-corner': {
      ctx.strokeStyle = template.textColor || '#831843';
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = W * 0.003;
      var corners = [[W * 0.08, H * 0.08], [W * 0.92, H * 0.08], [W * 0.08, H * 0.92], [W * 0.92, H * 0.92]];
      corners.forEach(function(c) {
        ctx.beginPath();
        ctx.arc(c[0], c[1], W * 0.04, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(c[0], c[1], W * 0.025, 0, Math.PI * 2);
        ctx.stroke();
      });
      break;
    }
    case 'cross-subtle': {
      ctx.strokeStyle = template.textColor || '#FFFFFF';
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = W * 0.004;
      var crossX = W / 2, crossY = H * 0.1, crossSize = W * 0.04;
      ctx.beginPath();
      ctx.moveTo(crossX, crossY - crossSize);
      ctx.lineTo(crossX, crossY + crossSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crossX - crossSize * 0.65, crossY - crossSize * 0.1);
      ctx.lineTo(crossX + crossSize * 0.65, crossY - crossSize * 0.1);
      ctx.stroke();
      break;
    }
    case 'bible-ornament': {
      ctx.fillStyle = template.textColor || '#FFFFFF';
      ctx.globalAlpha = 0.6;
      ctx.font = Math.floor(W * 0.07) + 'px serif';
      ctx.textAlign = 'center';
      ctx.fillText('📖', W / 2, H * 0.12);
      break;
    }
    case 'vintage-ornament': {
      ctx.strokeStyle = template.textColor || '#3D2B1F';
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = W * 0.002;
      var inset = W * 0.08;
      // Corner flourishes
      [
        [inset, inset, 1, 1],
        [W - inset, inset, -1, 1],
        [inset, H - inset, 1, -1],
        [W - inset, H - inset, -1, -1]
      ].forEach(function(c) {
        ctx.beginPath();
        ctx.arc(c[0], c[1], W * 0.02, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(c[0], c[1]);
        ctx.lineTo(c[0] + c[2] * W * 0.06, c[1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(c[0], c[1]);
        ctx.lineTo(c[0], c[1] + c[3] * W * 0.06);
        ctx.stroke();
      });
      break;
    }
    case 'left-bar': {
      ctx.fillStyle = '#D4722A';
      ctx.globalAlpha = 0.9;
      ctx.fillRect(0, 0, W * 0.012, H);
      break;
    }
    default:
      break;
  }
  ctx.restore();
}

function drawBorder(ctx, W, H, borderType) {
  ctx.save();
  switch (borderType) {
    case 'gold-thin': {
      ctx.strokeStyle = '#D4A017';
      ctx.lineWidth = Math.max(2, W * 0.004);
      var inset = W * 0.025;
      ctx.strokeRect(inset, inset, W - inset * 2, H - inset * 2);
      break;
    }
    case 'white-thin': {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = Math.max(2, W * 0.004);
      var inset2 = W * 0.025;
      ctx.strokeRect(inset2, inset2, W - inset2 * 2, H - inset2 * 2);
      break;
    }
    case 'brown-thin': {
      ctx.strokeStyle = '#7C4A24';
      ctx.lineWidth = Math.max(2, W * 0.004);
      var inset3 = W * 0.025;
      ctx.strokeRect(inset3, inset3, W - inset3 * 2, H - inset3 * 2);
      break;
    }
    case 'light-thin': {
      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = Math.max(1, W * 0.002);
      var inset4 = W * 0.015;
      ctx.strokeRect(inset4, inset4, W - inset4 * 2, H - inset4 * 2);
      break;
    }
    case 'gold-elegant': {
      ctx.strokeStyle = '#D4A017';
      ctx.lineWidth = Math.max(2, W * 0.004);
      var i1 = W * 0.025;
      ctx.strokeRect(i1, i1, W - i1 * 2, H - i1 * 2);
      ctx.lineWidth = Math.max(1, W * 0.002);
      var i2 = W * 0.035;
      ctx.strokeRect(i2, i2, W - i2 * 2, H - i2 * 2);
      break;
    }
    case 'white-elegant': {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = Math.max(2, W * 0.004);
      var wi1 = W * 0.025;
      ctx.strokeRect(wi1, wi1, W - wi1 * 2, H - wi1 * 2);
      ctx.lineWidth = Math.max(1, W * 0.002);
      var wi2 = W * 0.035;
      ctx.strokeRect(wi2, wi2, W - wi2 * 2, H - wi2 * 2);
      break;
    }
    case 'blue-elegant': {
      ctx.strokeStyle = '#1A2F4E';
      ctx.lineWidth = Math.max(2, W * 0.004);
      var bi1 = W * 0.025;
      ctx.strokeRect(bi1, bi1, W - bi1 * 2, H - bi1 * 2);
      ctx.lineWidth = Math.max(1, W * 0.002);
      var bi2 = W * 0.035;
      ctx.strokeRect(bi2, bi2, W - bi2 * 2, H - bi2 * 2);
      break;
    }
    case 'brown-elegant': {
      ctx.strokeStyle = '#7C4A24';
      ctx.lineWidth = Math.max(2, W * 0.005);
      var bei1 = W * 0.025;
      ctx.strokeRect(bei1, bei1, W - bei1 * 2, H - bei1 * 2);
      ctx.strokeStyle = '#D4A017';
      ctx.lineWidth = Math.max(1, W * 0.002);
      var bei2 = W * 0.038;
      ctx.strokeRect(bei2, bei2, W - bei2 * 2, H - bei2 * 2);
      break;
    }
    case 'orange-left-accent': {
      ctx.fillStyle = '#D4722A';
      ctx.fillRect(0, 0, W * 0.012, H);
      break;
    }
    case 'vintage-frame': {
      ctx.strokeStyle = '#7C4A24';
      ctx.lineWidth = Math.max(3, W * 0.006);
      var vfi = W * 0.03;
      ctx.strokeRect(vfi, vfi, W - vfi * 2, H - vfi * 2);
      ctx.strokeStyle = '#D4A017';
      ctx.lineWidth = Math.max(1, W * 0.002);
      var vfi2 = W * 0.045;
      ctx.strokeRect(vfi2, vfi2, W - vfi2 * 2, H - vfi2 * 2);
      break;
    }
    default:
      break;
  }
  ctx.restore();
}

// Indic-script support: use Noto Sans Telugu etc. so conjuncts render correctly
function hasIndicScript(text) { return /[\u0900-\u0DFF]/.test(text || ''); }

// ============================================================
// SECTION 10: BULK GENERATION ENGINE
// ============================================================

function cancelGeneration() {
  AppState.cancelRequested = true;
  showToast('Cancelling generation…', 'warning', 2000);
}

function getRandomDesign() {
  var template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  var allBgs = BACKGROUNDS.solid.concat(BACKGROUNDS.gradient);
  var bg = allBgs[Math.floor(Math.random() * allBgs.length)];
  return { templateId: template.id, bgId: bg.id };
}

function getInputValue(id) {
  var el = document.getElementById(id);
  if (!el) return '';
  return el.value || '';
}

// ============================================================
// SECTION 11: GALLERY
// ============================================================

// ============================================================
// SECTION 12: BRAND SETTINGS
// ============================================================

function initBrandSettings() {
  setInputValue('brand-name',    AppState.brand.name);
  setInputValue('brand-font',    AppState.brand.font);
  setInputValue('brand-color',   AppState.brand.color);
  setInputValue('brand-size',    AppState.brand.size);
  setInputValue('brand-opacity', AppState.brand.opacity);

  var logoEnabled = document.getElementById('brand-logo-enabled');
  if (logoEnabled) logoEnabled.checked = AppState.brand.logoEnabled;

  var nameEnabled = document.getElementById('brand-name-enabled');
  if (nameEnabled) nameEnabled.checked = AppState.brand.nameEnabled;

  // Position radio
  var posRadios = document.querySelectorAll('input[name="brand-position"]');
  posRadios.forEach(function(radio) {
    if (radio.value === AppState.brand.position) radio.checked = true;
  });

  // Logo preview
  if (AppState.brand.logoDataUrl) {
    setLogoPreview(AppState.brand.logoDataUrl);
  }

  // Logo upload handler
  var logoUpload = document.getElementById('logo-upload');
  if (logoUpload) {
    logoUpload.addEventListener('change', function() {
      var file = logoUpload.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(e) {
        AppState.brand.logoDataUrl = e.target.result;
        setLogoPreview(e.target.result);
        showToast('Logo uploaded.', 'success', 2000);
      };
      reader.readAsDataURL(file);
    });
  }
}

function saveBrandSettings() {
  AppState.brand.name       = getInputValue('brand-name')    || 'Manushakumarudu';
  AppState.brand.font       = getInputValue('brand-font')    || 'Inter';
  AppState.brand.color      = getInputValue('brand-color')   || '#FFFFFF';
  AppState.brand.size       = parseFloat(getInputValue('brand-size'))    || 24;
  AppState.brand.opacity    = parseFloat(getInputValue('brand-opacity')) || 0.9;

  var logoEnabled = document.getElementById('brand-logo-enabled');
  if (logoEnabled) AppState.brand.logoEnabled = logoEnabled.checked;

  var nameEnabled = document.getElementById('brand-name-enabled');
  if (nameEnabled) AppState.brand.nameEnabled = nameEnabled.checked;

  var posRadio = document.querySelector('input[name="brand-position"]:checked');
  if (posRadio) AppState.brand.position = posRadio.value;

  saveToLocalStorage();
  showToast('Brand settings saved!', 'success');

  if (AppState.settings.appsScriptUrl) {
    saveToBackend({ action: 'saveBrand', brand: AppState.brand });
  }
}

// ============================================================
// SECTION 13: GENERAL SETTINGS
// ============================================================

function initSettings() {
  setInputValue('max-verses',      AppState.settings.maxVerses);
  setInputValue('default-format',  AppState.settings.defaultFormat);
  setInputValue('output-quality',         AppState.settings.quality);
  setInputValue('apps-script-url', AppState.settings.appsScriptUrl);
  setInputValue('drive-folder-id', AppState.settings.driveFolderId);

  var autoSave = document.getElementById('auto-save-history');
  if (autoSave) autoSave.checked = AppState.settings.autoSaveHistory;
}

function saveSettings() {
  AppState.settings.maxVerses      = parseInt(getInputValue('max-verses'))     || 20;
  AppState.settings.defaultFormat  = getInputValue('default-format')           || 'instagram-square';
  AppState.settings.quality        = getInputValue('output-quality')                  || 'high';
  AppState.settings.appsScriptUrl  = (getInputValue('apps-script-url') || '').trim();
  AppState.settings.driveFolderId  = getInputValue('drive-folder-id')          || '';

  var autoSave = document.getElementById('auto-save-history');
  if (autoSave) AppState.settings.autoSaveHistory = autoSave.checked;

  saveToLocalStorage();
  showToast('Settings saved!', 'success');
}

function testConnection() {
  var url = (getInputValue('apps-script-url') || AppState.settings.appsScriptUrl || '').trim();
  if (!url) {
    showToast('Please enter your Apps Script URL first.', 'error');
    return;
  }

  var statusEl = document.getElementById('connection-status');
  if (statusEl) { statusEl.textContent = 'Testing…'; statusEl.className = 'connection-status'; }

  fetch(url + '?action=ping')
    .then(function(res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function(data) {
      if (statusEl) { statusEl.textContent = '✅ Connected'; statusEl.className = 'connection-status success'; }
      showToast('Connection successful!', 'success');
    })
    .catch(function(err) {
      if (statusEl) { statusEl.textContent = '❌ Failed: ' + err.message; statusEl.className = 'connection-status error'; }
      showToast('Connection failed: ' + err.message, 'error');
    });
}

// ============================================================
// SECTION 14: GOOGLE APPS SCRIPT INTEGRATION
// ============================================================

function saveToBackend(batchData) {
  var url = AppState.settings.appsScriptUrl;
  if (!url) return;

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: 'saveGenerationHistory', data: batchData })
  }).catch(function(err) {
    console.warn('Backend save failed (non-critical):', err.message);
  });
}

function loadHistoryFromBackend() {
  var url = AppState.settings.appsScriptUrl;
  if (!url) return;

  fetch(url + '?action=getHistory')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data && Array.isArray(data.history)) {
        AppState.history = data.history;
        renderHistory();
      }
    })
    .catch(function(err) {
      console.warn('History load failed (non-critical):', err.message);
    });
}

// ============================================================
// SECTION 15: HISTORY
// ============================================================

function renderHistory() {
  var table = document.getElementById('history-table');
  if (!table) return;

  var tbody = table.querySelector('tbody');
  if (!tbody) {
    tbody = document.createElement('tbody');
    table.appendChild(tbody);
  }

  if (AppState.history.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No generation history yet.</td></tr>';
    return;
  }

  tbody.innerHTML = AppState.history.map(function(batch, i) {
    return '<tr>' +
      '<td>' + (i + 1) + '</td>' +
      '<td><code>' + (batch.id || '').substring(0, 12) + '…</code></td>' +
      '<td>' + formatDate(batch.date) + '</td>' +
      '<td>' + (batch.verses || 0) + '</td>' +
      '<td>' + (batch.images || 0) + '</td>' +
      '<td><span class="badge badge-success">' + (batch.status || 'completed') + '</span></td>' +
    '</tr>';
  }).join('');
}

// ============================================================
// SECTION 16: DASHBOARD
// ============================================================

function updateDashboardStats() {
  var statVerses = document.getElementById('stat-verses');
  if (statVerses) statVerses.textContent = AppState.verses.length;

  var statImages = document.getElementById('stat-images');
  if (statImages) statImages.textContent = AppState.generatedImages.length;

  var statBatches = document.getElementById('stat-batches');
  if (statBatches) statBatches.textContent = AppState.history.length;

  // Count today's images
  var today = new Date().toDateString();
  var todayCount = AppState.history.reduce(function(sum, batch) {
    if (new Date(batch.date).toDateString() === today) return sum + (batch.images || 0);
    return sum;
  }, 0);
  var statToday = document.getElementById('stat-today');
  if (statToday) statToday.textContent = todayCount;

  // Recent activity
  var activityEl = document.getElementById('recent-activity');
  if (activityEl) {
    if (AppState.history.length === 0) {
      activityEl.innerHTML = '<p class="empty-state">No activity yet. Start by creating your first promise card!</p>';
    } else {
      activityEl.innerHTML = '<ul class="activity-list">' +
        AppState.history.slice(0, 5).map(function(batch) {
          return '<li>' +
            '<span class="activity-icon">🖼</span>' +
            '<span class="activity-text">Generated <strong>' + batch.images + '</strong> images from <strong>' + batch.verses + '</strong> verses</span>' +
            '<span class="activity-date">' + formatDate(batch.date) + '</span>' +
          '</li>';
        }).join('') +
      '</ul>';
    }
  }
}

// ============================================================
// SECTION 17: THEME
// ============================================================

function initTheme() {
  var saved = localStorage.getItem('bpc_theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-theme');
    AppState.settings.theme = 'dark';
  } else {
    document.body.classList.remove('dark-theme');
    AppState.settings.theme = 'light';
  }
  updateThemeToggleIcon();
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  var isDark = document.body.classList.contains('dark-theme');
  AppState.settings.theme = isDark ? 'dark' : 'light';
  localStorage.setItem('bpc_theme', AppState.settings.theme);
  updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  btn.title       = document.body.classList.contains('dark-theme') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

// ============================================================
// SECTION 18: LOCAL STORAGE
// ============================================================

function saveToLocalStorage() {
  try {
    localStorage.setItem('bpc_settings',     JSON.stringify(AppState.settings));
    localStorage.setItem('bpc_brand',        JSON.stringify(AppState.brand));
    localStorage.setItem('bpc_history',      JSON.stringify(AppState.history.slice(0, 50)));
    localStorage.setItem('bpc_favTemplates', JSON.stringify(AppState.favTemplates));
  } catch (e) {
    console.warn('localStorage save failed:', e.message);
  }
}

function loadFromLocalStorage() {
  try {
    var settings = localStorage.getItem('bpc_settings');
    if (settings) {
      var parsed = JSON.parse(settings);
      Object.assign(AppState.settings, parsed);
    }

    var brand = localStorage.getItem('bpc_brand');
    if (brand) {
      var parsedBrand = JSON.parse(brand);
      Object.assign(AppState.brand, parsedBrand);
    }

    var history = localStorage.getItem('bpc_history');
    if (history) {
      AppState.history = JSON.parse(history);
    }

    var favTemplates = localStorage.getItem('bpc_favTemplates');
    if (favTemplates) {
      AppState.favTemplates = JSON.parse(favTemplates);
    }
  } catch (e) {
    console.warn('localStorage load failed:', e.message);
  }
}

// ============================================================
// HELPERS
// ============================================================

function setInputValue(id, value) {
  var el = document.getElementById(id);
  if (!el) return;
  if (el.type === 'checkbox') {
    el.checked = !!value;
  } else {
    el.value = (value !== null && value !== undefined) ? value : '';
  }
}

// ============================================================
// SECTION 19: INITIALIZATION
// ============================================================

function init() {
  loadFromLocalStorage();
  initNavigation();
  initFormatSelector();
  initDropzone();
  initBrandSettings();
  initSettings();
  initTheme();
  renderBackgroundLibrary();
  renderTemplatesGrid();
  renderTemplateSelector();
  renderBgGalleryCreate();
  updateDashboardStats();

  // Wire up buttons
  bindBtn('btn-add-verse',         addVerseManually);
  bindBtn('btn-generate',          startGeneration);
  bindBtn('btn-confirm-generate',  confirmImport);
  bindBtn('btn-save-brand',        saveBrandSettings);
  bindBtn('btn-save-settings',     saveSettings);
  bindBtn('btn-test-connection',   testConnection);
  bindBtn('btn-cancel-gen',        cancelGeneration);
  bindBtn('download-all-zip',      downloadAllZip);
  bindBtn('download-selected-zip', downloadSelectedZip);
  bindBtn('theme-toggle',          toggleTheme);

  // Template filter tabs
  document.querySelectorAll('[data-template-filter]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = btn.getAttribute('data-template-filter');
      document.querySelectorAll('[data-template-filter]').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderTemplatesGrid(filter);
    });
  });

  // Background category tabs
  document.querySelectorAll('[data-bg-category]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var cat = btn.getAttribute('data-bg-category');
      document.querySelectorAll('[data-bg-category]').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderBgsByCategory(cat);
    });
  });

  // Background mode radio
  document.querySelectorAll('input[name="bg-mode"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      AppState.bgMode = radio.value;
    });
  });

  // Custom background upload
  var customBgUpload = document.getElementById('custom-bg-upload');
  if (customBgUpload) {
    customBgUpload.addEventListener('change', function() {
      var file = customBgUpload.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(e) {
        var id = generateId();
        AppState.customBgs.push({ id: id, dataUrl: e.target.result, label: file.name });
        showToast('Custom background uploaded!', 'success', 2000);
        renderBackgroundLibrary();
      };
      reader.readAsDataURL(file);
    });
  }

  // Format card click handlers (make full card clickable)
  document.querySelectorAll('.format-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        AppState.selectedFormat = radio.value;
        document.querySelectorAll('.format-card').forEach(function(c) { c.classList.remove('selected'); });
        card.classList.add('selected');
      }
    });
  });

  navigateTo('dashboard');

  // Initialize new advanced features
  initDesignRotation();
  initDesignV2();
  initV3();
  initManualPicker();
  bindBtn('btn-refresh-preview', refreshPreview);
  bindBtn('btn-clear-queue', function() {
    if (AppState.verses.length === 0) return;
    if (confirm('Clear all verses from the queue?')) {
      AppState.verses = [];
      renderVerseQueue();
      updateVerseCountBadge();
      showToast('Queue cleared', 'info', 2000);
    }
  });

  // Quick action buttons on dashboard
  document.querySelectorAll('.quick-action-btn[data-page]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      navigateTo(btn.getAttribute('data-page'));
    });
  });

  // Trigger initial preview
  setTimeout(refreshPreview, 500);

  console.log('✅ Manushakumarudu Bible Promise Studio initialized.');
}

function bindBtn(id, fn) {
  var el = document.getElementById(id);
  if (el) el.addEventListener('click', fn);
}

// ============================================================
// SECTION 21: DESIGN ROTATION (NEW ADVANCED FEATURE)
// ============================================================

// Design mode: 'single', 'rotate', 'random'
// When 'rotate', change template every N images
// When 'random', randomize each image

function initDesignRotation() {
  var modeRadios = document.querySelectorAll('input[name="design-mode"]');
  var rotationConfig = document.getElementById('rotation-config');

  modeRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      AppState.designMode = this.value;
      if (this.value === 'rotate') {
        if (rotationConfig) rotationConfig.classList.remove('hidden');
        renderRotationTemplatePicker();
      } else {
        if (rotationConfig) rotationConfig.classList.add('hidden');
      }
    });
  });

  AppState.designMode = 'single';
  AppState.rotateEveryN = 3;
  AppState.rotationTemplates = [];

  var rotateInput = document.getElementById('rotate-every-n');
  if (rotateInput) {
    rotateInput.addEventListener('change', function() {
      AppState.rotateEveryN = parseInt(this.value) || 3;
    });
  }
}

function renderRotationTemplatePicker() {
  var container = document.getElementById('rotation-template-picker');
  if (!container) return;
  container.innerHTML = '';

  TEMPLATES.forEach(function(template) {
    var card = document.createElement('div');
    card.className = 'template-mini-card' + (AppState.rotationTemplates.indexOf(template.id) >= 0 ? ' selected' : '');
    card.style.cssText = 'cursor:pointer; padding:8px; border:2px solid #E5E7EB; border-radius:8px; text-align:center; font-size:12px; transition:all 0.2s;';
    card.textContent = template.name;
    card.setAttribute('data-template-id', template.id);

    if (AppState.rotationTemplates.indexOf(template.id) >= 0) {
      card.style.borderColor = '#D4722A';
      card.style.background = '#FFF5EE';
    }

    card.addEventListener('click', function() {
      var tid = template.id;
      var idx = AppState.rotationTemplates.indexOf(tid);
      if (idx >= 0) {
        AppState.rotationTemplates.splice(idx, 1);
        this.style.borderColor = '#E5E7EB';
        this.style.background = '';
      } else {
        AppState.rotationTemplates.push(tid);
        this.style.borderColor = '#D4722A';
        this.style.background = '#FFF5EE';
      }
    });

    container.appendChild(card);
  });
}

// ============================================================
// SECTION 22: LIVE PREVIEW (NEW ADVANCED FEATURE)
// ============================================================

// ============================================================
// SECTION 23: ADVANCED FEATURES
// ============================================================

// Verse counter badge
function updateVerseCountBadge() {
  var badge = document.getElementById('verse-count-badge');
  if (!badge) {
    // Create a badge in the sidebar
    var navItem = document.querySelector('[data-page="create"]');
    if (navItem) {
      badge = document.createElement('span');
      badge.id = 'verse-count-badge';
      badge.style.cssText = 'margin-left:auto; background:#D4722A; color:#fff; font-size:11px; padding:2px 7px; border-radius:100px; font-weight:600;';
      navItem.appendChild(badge);
    }
  }
  if (badge) {
    badge.textContent = AppState.verses.length;
    badge.style.display = AppState.verses.length > 0 ? 'inline-block' : 'none';
  }
}

// Quick verse count on import page
function updateImportVerseCount() {
  var badge = document.getElementById('import-count-badge');
  if (!badge) return;
  badge.textContent = AppState.importPreview.length + ' verses detected';
}

// ============================================================
// DOMContentLoaded
// ============================================================

document.addEventListener('DOMContentLoaded', init);

// ============================================================
// V2: DESIGN ENGINE, FONT LIBRARY, BULK GENERATION, MORE TEMPLATES
// ============================================================

function $id(id) { return document.getElementById(id); }
function val(id) { var e = $id(id); return e ? e.value : ''; }
function templateById(id) {
  return TEMPLATES.find(function(t) { return t.id === id; }) || TEMPLATES[0];
}

// ---------- More backgrounds ----------
BACKGROUNDS.solid.push(
  { id: 'ivory-solid',      label: 'Ivory',       color: '#FFFFF0' },
  { id: 'peach-solid',      label: 'Peach',       color: '#FFE5D0' },
  { id: 'sky-solid',        label: 'Sky',         color: '#E0F2FE' },
  { id: 'mint-solid',       label: 'Mint',        color: '#D1FAE5' },
  { id: 'lavender-solid',   label: 'Lavender',    color: '#EDE9FE' },
  { id: 'lemon-solid',      label: 'Lemon',       color: '#FEF9C3' },
  { id: 'rose-solid',       label: 'Rose',        color: '#FFE4E6' },
  { id: 'sand-solid',       label: 'Sand',        color: '#E8D9B5' },
  { id: 'maroon-solid',     label: 'Maroon',      color: '#7F1D1D' },
  { id: 'burgundy-solid',   label: 'Burgundy',    color: '#581C2F' },
  { id: 'crimson-solid',    label: 'Crimson',     color: '#B91C1C' },
  { id: 'teal-solid',       label: 'Teal',        color: '#0F766E' },
  { id: 'indigo-solid',     label: 'Indigo',      color: '#3730A3' },
  { id: 'purple-solid',     label: 'Purple',      color: '#6D28D9' },
  { id: 'charcoal-solid',   label: 'Charcoal',    color: '#2D2D2D' },
  { id: 'midnight-solid',   label: 'Midnight',    color: '#0B1026' },
  { id: 'olive-solid',      label: 'Olive',       color: '#4D5B2A' },
  { id: 'coffee-solid',     label: 'Coffee',      color: '#4A2C1A' },
  { id: 'saffron-solid',    label: 'Saffron',     color: '#F59E0B' },
  { id: 'turquoise-solid',  label: 'Turquoise',   color: '#0891B2' },
  { id: 'rosegold-solid',   label: 'Rose Gold',   color: '#B76E79' },
  { id: 'slate-solid',      label: 'Slate',       color: '#334155' },
  { id: 'emerald-solid',    label: 'Emerald',     color: '#047857' },
  { id: 'tangerine-solid',  label: 'Tangerine',   color: '#EA580C' }
);

BACKGROUNDS.gradient.push(
  { id: 'rosegold-gradient',  label: 'Rose Gold',   colors: ['#7A3E4C', '#B76E79', '#D99AA5'] },
  { id: 'aurora-gradient',    label: 'Aurora',      colors: ['#0F2027', '#203A43', '#2C5364'] },
  { id: 'candy-gradient',     label: 'Candy',       colors: ['#FF9A9E', '#FECFEF', '#FFE4EC'] },
  { id: 'lagoon-gradient',    label: 'Lagoon',      colors: ['#0083B0', '#00B4DB'] },
  { id: 'flame-gradient',     label: 'Flame',       colors: ['#C21500', '#F12711', '#F5AF19'] },
  { id: 'mango-gradient',     label: 'Mango',       colors: ['#FFE259', '#FFC95C', '#FFA751'] },
  { id: 'peacock-gradient',   label: 'Peacock',     colors: ['#0F3D4A', '#134E5E', '#3F8C6B'] },
  { id: 'twilight-gradient',  label: 'Twilight',    colors: ['#2B1055', '#4B3A9E', '#7597DE'] },
  { id: 'cherry-gradient',    label: 'Cherry',      colors: ['#B3122B', '#EB3349', '#F45C43'] },
  { id: 'mintfresh-gradient', label: 'Fresh Mint',  colors: ['#0B7A6E', '#11998E', '#38EF7D'] },
  { id: 'berry-gradient',     label: 'Berry',       colors: ['#8E2DE2', '#4A00E0'] },
  { id: 'dawn-gradient',      label: 'Dawn',        colors: ['#3B4371', '#B5607A', '#F3904F'] },
  { id: 'goldrush-gradient',  label: 'Gold Rush',   colors: ['#F7971E', '#FFD200'] },
  { id: 'midnight-gradient',  label: 'Midnight',    colors: ['#0F0C29', '#302B63', '#24243E'] },
  { id: 'sky-gradient',       label: 'Blue Sky',    colors: ['#2F80ED', '#56CCF2'] },
  { id: 'blush-gradient',     label: 'Blush',       colors: ['#FFECD2', '#FCB69F'] },
  { id: 'spring-gradient',    label: 'Spring',      colors: ['#D4FC79', '#96E6A1'] },
  { id: 'galaxy-gradient',    label: 'Galaxy',      colors: ['#141E30', '#243B55'] },
  { id: 'coral-gradient',     label: 'Coral',       colors: ['#FF758C', '#FF7EB3'] },
  { id: 'heaven-gradient',    label: 'Heaven',      colors: ['#E0EAFC', '#CFDEF3'] },
  { id: 'pearl-gradient',     label: 'Pearl',       colors: ['#FFFFFF', '#E6E9F0'] },
  { id: 'creamgold-gradient', label: 'Cream Gold',  colors: ['#FFF8E7', '#F5DEB3'] },
  { id: 'royalred-gradient',  label: 'Royal Red',   colors: ['#7F0000', '#B71C1C', '#E53935'] },
  { id: 'emerald-gradient',   label: 'Emerald',     colors: ['#064E3B', '#059669'] },
  { id: 'violet-gradient',    label: 'Violet Dream',colors: ['#3A0CA3', '#7209B7', '#F72585'] },
  { id: 'ember-gradient',     label: 'Ember',       colors: ['#2D0A0A', '#8A2D0E', '#F59E0B'] }
);

BACKGROUNDS.pattern.push(
  { id: 'dots-pattern',      label: 'Soft Dots',    type: 'dots' },
  { id: 'stripes-pattern',   label: 'Soft Stripes', type: 'stripes' },
  { id: 'bokeh-pattern',     label: 'Bokeh Lights', type: 'bokeh' },
  { id: 'stars-pattern',     label: 'Starry Night', type: 'stars' },
  { id: 'waves-pattern',     label: 'Ocean Waves',  type: 'waves' },
  { id: 'clouds-pattern',    label: 'Clouds',       type: 'clouds' },
  { id: 'geometric-pattern', label: 'Geometric',    type: 'geometric' },
  { id: 'linen-pattern',     label: 'Linen',        type: 'linen' },
  { id: 'sunburst-pattern',  label: 'Sunburst',     type: 'sunburst' },
  { id: 'crossdark-pattern', label: 'Dark Crosses', type: 'crossdark' },
  { id: 'diamond-pattern',   label: 'Diamond Lace', type: 'diamond' },
  { id: 'hills-pattern',     label: 'Dusk Hills',   type: 'hills' }
);

function seededRand(seed) {
  var t = seed >>> 0;
  return function() {
    t += 0x6D2B79F5;
    var r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function drawPatternExtra(ctx, W, H, type) {
  var u = Math.min(W, H) / 100;
  var rnd = seededRand(type.length * 7919 + type.charCodeAt(0) * 31);
  var i, x, y, g, k;
  function vgrad(stops) {
    var gr = ctx.createLinearGradient(0, 0, 0, H);
    stops.forEach(function(c, n) { gr.addColorStop(n / (stops.length - 1), c); });
    ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
  }
  switch (type) {
    case 'dots':
      ctx.fillStyle = '#FFF8EC'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(212,114,42,0.20)';
      for (y = 0, k = 0; y < H + 7 * u; y += 7 * u, k++) {
        for (x = (k % 2) * 3.5 * u; x < W + 7 * u; x += 7 * u) {
          ctx.beginPath(); ctx.arc(x, y, 1.3 * u, 0, Math.PI * 2); ctx.fill();
        }
      }
      return true;
    case 'stripes':
      ctx.fillStyle = '#F8F3EA'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(150,110,60,0.09)'; ctx.lineWidth = 4 * u;
      for (x = -H; x < W; x += 9 * u) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + H, H); ctx.stroke(); }
      return true;
    case 'bokeh':
      vgrad(['#1B1035', '#3B1F5E', '#5B2A86']);
      var cols = ['255,200,120', '255,140,200', '140,180,255', '255,255,255'];
      for (i = 0; i < 38; i++) {
        ctx.fillStyle = 'rgba(' + cols[Math.floor(rnd() * cols.length)] + ',' + (0.10 + rnd() * 0.18) + ')';
        ctx.beginPath(); ctx.arc(rnd() * W, rnd() * H, (3 + rnd() * 11) * u, 0, Math.PI * 2); ctx.fill();
      }
      return true;
    case 'stars':
      vgrad(['#050A24', '#101C55', '#1A2A6C']);
      for (i = 0; i < 140; i++) {
        ctx.fillStyle = 'rgba(255,255,255,' + (0.35 + rnd() * 0.65) + ')';
        ctx.beginPath(); ctx.arc(rnd() * W, rnd() * H, (0.15 + rnd() * 0.45) * u, 0, Math.PI * 2); ctx.fill();
      }
      for (i = 0; i < 6; i++) {
        x = rnd() * W; y = rnd() * H * 0.7;
        g = ctx.createRadialGradient(x, y, 0, x, y, 4 * u);
        g.addColorStop(0, 'rgba(255,240,180,0.9)'); g.addColorStop(1, 'rgba(255,240,180,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 4 * u, 0, Math.PI * 2); ctx.fill();
      }
      return true;
    case 'waves':
      vgrad(['#0A2A5E', '#124A9C', '#1E6FD9']);
      for (i = 0; i < 6; i++) {
        ctx.fillStyle = 'rgba(255,255,255,0.07)';
        ctx.beginPath(); ctx.moveTo(0, H);
        for (x = 0; x <= W; x += W / 40) {
          ctx.lineTo(x, H * (0.35 + i * 0.1) + Math.sin(x / (9 * u) + i) * 3 * u);
        }
        ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
      }
      return true;
    case 'clouds':
      vgrad(['#7FB8F5', '#B7DBFB', '#E8F6FF']);
      for (i = 0; i < 9; i++) {
        x = rnd() * W; y = (0.1 + rnd() * 0.8) * H;
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        for (k = 0; k < 4; k++) {
          ctx.beginPath(); ctx.ellipse(x + k * 6 * u, y + (k % 2) * 1.5 * u, (7 + rnd() * 5) * u, (3.5 + rnd() * 2) * u, 0, 0, Math.PI * 2); ctx.fill();
        }
      }
      return true;
    case 'geometric':
      ctx.fillStyle = '#0F1B3D'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(212,160,23,0.28)'; ctx.lineWidth = Math.max(1, 0.25 * u);
      for (y = 0; y < H + 12 * u; y += 12 * u) {
        for (x = 0; x < W + 12 * u; x += 12 * u) {
          ctx.beginPath(); ctx.moveTo(x, y - 6 * u); ctx.lineTo(x + 6 * u, y); ctx.lineTo(x, y + 6 * u); ctx.lineTo(x - 6 * u, y); ctx.closePath(); ctx.stroke();
        }
      }
      return true;
    case 'linen':
      ctx.fillStyle = '#F3EBDD'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(120,90,50,0.07)'; ctx.lineWidth = Math.max(1, 0.35 * u);
      for (x = 0; x < W; x += 1.3 * u) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (y = 0; y < H; y += 1.3 * u) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      return true;
    case 'sunburst':
      ctx.fillStyle = '#FFF6DC'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(255,196,70,0.22)';
      for (i = 0; i < 24; i += 2) {
        var a0 = Math.PI + (i / 24) * Math.PI, a1 = Math.PI + ((i + 1) / 24) * Math.PI;
        ctx.beginPath(); ctx.moveTo(W / 2, H * 1.02);
        ctx.arc(W / 2, H * 1.02, Math.max(W, H) * 1.6, a0, a1); ctx.closePath(); ctx.fill();
      }
      return true;
    case 'crossdark':
      vgrad(['#0B1433', '#14214D']);
      ctx.strokeStyle = 'rgba(245,230,179,0.14)'; ctx.lineWidth = Math.max(1, 0.4 * u);
      for (y = 7 * u; y < H; y += 14 * u) {
        for (x = 7 * u; x < W; x += 14 * u) {
          ctx.beginPath(); ctx.moveTo(x, y - 2 * u); ctx.lineTo(x, y + 2 * u); ctx.moveTo(x - 1.4 * u, y - 0.6 * u); ctx.lineTo(x + 1.4 * u, y - 0.6 * u); ctx.stroke();
        }
      }
      return true;
    case 'diamond':
      ctx.fillStyle = '#FBF3E4'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(150,100,40,0.16)'; ctx.lineWidth = Math.max(1, 0.3 * u);
      for (x = -H; x < W + H; x += 8 * u) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + H, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, H); ctx.lineTo(x + H, 0); ctx.stroke();
      }
      return true;
    case 'hills':
      vgrad(['#3A1C71', '#B45A86', '#FFAF7B']);
      var hillCols = ['rgba(60,25,90,0.55)', 'rgba(40,15,70,0.75)', 'rgba(20,8,45,0.95)'];
      for (i = 0; i < 3; i++) {
        ctx.fillStyle = hillCols[i];
        ctx.beginPath(); ctx.moveTo(0, H);
        for (x = 0; x <= W; x += W / 30) {
          ctx.lineTo(x, H * (0.78 + i * 0.07) + Math.sin(x / (14 * u) + i * 2) * 4 * u);
        }
        ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
      }
      return true;
    default:
      return false;
  }
}

// ---------- More templates ----------
(function addTemplates() {
  function T(id, name, cat, text, ref, bg, font, o) {
    o = o || {};
    TEMPLATES.push({
      id: id, name: name, category: cat, textColor: text, refColor: ref, bgId: bg,
      font: font, fontSize: 'auto', align: o.align || 'center', refPosition: o.refPosition || 'bottom-center',
      border: o.border || null, refFont: o.refFont || 'Inter', overlay: o.overlay || null, decorative: o.deco || null
    });
  }
  T(21, 'Rose Gold Elegance', 'elegant',     '#FFFFFF', '#FFE4E6', 'rosegold-gradient',  'Cormorant Garamond', { border: 'white-elegant', deco: 'star-ornament' });
  T(22, 'Midnight Stars',     'dark',        '#F8FAFC', '#FDE68A', 'stars-pattern',      'Playfair Display',   { border: 'gold-thin',     deco: 'star-ornament' });
  T(23, 'Peaceful Sky',       'nature',      '#1E3A8A', '#1D4ED8', 'clouds-pattern',     'Lora',               { deco: 'minimal-line' });
  T(24, 'Aurora Night',       'modern',      '#FFFFFF', '#A7F3D0', 'aurora-gradient',    'Montserrat',         { border: 'white-thin' });
  T(25, 'Candy Blush',        'floral',      '#831843', '#BE185D', 'candy-gradient',     'Dancing Script',     { deco: 'floral-corner' });
  T(26, 'Lagoon Blue',        'modern',      '#FFFFFF', '#E0F2FE', 'lagoon-gradient',    'Poppins',            { border: 'white-thin' });
  T(27, 'Flame of Fire',      'bold',        '#FFFFFF', '#FDE68A', 'flame-gradient',     'Montserrat',         { overlay: 'subtle-overlay' });
  T(28, 'Golden Mango',       'bold',        '#3D1A00', '#7C2D12', 'mango-gradient',     'Playfair Display',   { border: 'brown-thin', deco: 'minimal-line' });
  T(29, 'Twilight Hills',     'nature',      '#FFFFFF', '#FDE68A', 'hills-pattern',      'Lora',               {});
  T(30, 'Cherry Red Passion', 'bold',        '#FFFFFF', '#FECACA', 'royalred-gradient',  'Cinzel',             { border: 'gold-elegant', deco: 'gold-ornament' });
  T(31, 'Mint Fresh',         'nature',      '#064E3B', '#047857', 'spring-gradient',    'Lato',               { border: 'light-thin' });
  T(32, 'Berry Royal',        'elegant',     '#FFFFFF', '#E9D5FF', 'berry-gradient',     'Cormorant Garamond', { border: 'white-elegant', deco: 'star-ornament' });
  T(33, 'Sunburst Glory',     'christian',   '#3D1A00', '#7C4A24', 'sunburst-pattern',   'Playfair Display',   { border: 'brown-elegant', deco: 'cross-subtle' });
  T(34, 'Dark Cross',         'christian',   '#F5E6B3', '#FFFFFF', 'crossdark-pattern',  'Cinzel',             { border: 'gold-thin', deco: 'cross-subtle' });
  T(35, 'Pearl Minimal',      'minimal',     '#1F2937', '#6B7280', 'pearl-gradient',     'Inter',              { border: 'light-thin' });
  T(36, 'Heaven Light',       'christian',   '#1E3A8A', '#2563EB', 'heaven-gradient',    'Lora',               { deco: 'cross-subtle' });
  T(37, 'Peacock Green',      'nature',      '#FFFFFF', '#FDE68A', 'peacock-gradient',   'Merriweather',       { border: 'white-thin' });
  T(38, 'Coffee Warm',        'traditional', '#FFF8F0', '#FDDCB5', 'coffee-solid',       'Playfair Display',   { border: 'gold-thin', deco: 'vintage-ornament' });
  T(39, 'Maroon Traditional', 'traditional', '#FDE68A', '#FFFFFF', 'maroon-solid',       'Playfair Display',   { border: 'gold-elegant', deco: 'gold-ornament' });
  T(40, 'Saffron Blessing',   'traditional', '#3D1A00', '#7C2D12', 'saffron-solid',      'Playfair Display',   { border: 'brown-elegant', deco: 'sun-rays' });
  T(41, 'Emerald Grace',      'elegant',     '#FDE68A', '#FFFFFF', 'emerald-gradient',   'Cinzel',             { border: 'gold-elegant', deco: 'gold-ornament' });
  T(42, 'Bokeh Dream',        'modern',      '#FFFFFF', '#FBCFE8', 'bokeh-pattern',      'Poppins',            {});
  T(43, 'Linen Classic',      'minimal',     '#3D2B1F', '#7C4A24', 'linen-pattern',      'Lora',               { border: 'brown-thin' });
  T(44, 'Ocean Waves',        'nature',      '#FFFFFF', '#BAE6FD', 'waves-pattern',      'Montserrat',         { border: 'white-thin' });
  T(45, 'Lavender Peace',     'floral',      '#4C1D95', '#7C3AED', 'lavender-solid',     'Dancing Script',     { deco: 'floral-corner' });
  T(46, 'Sky Gradient',       'modern',      '#FFFFFF', '#E0F2FE', 'sky-gradient',       'Poppins',            {});
  T(47, 'Geometric Gold',     'bold',        '#FDE68A', '#FFFFFF', 'geometric-pattern',  'Montserrat',         { border: 'gold-thin' });
  T(48, 'Soft Dots Joy',      'floral',      '#7C2D12', '#C2410C', 'dots-pattern',       'Dancing Script',     { deco: 'minimal-line' });
  T(49, 'Royal Violet',       'elegant',     '#FFFFFF', '#FBCFE8', 'violet-gradient',    'Cormorant Garamond', { border: 'white-elegant' });
  T(50, 'Ember Glow',         'dark',        '#FFF3D6', '#FBBF24', 'ember-gradient',     'Playfair Display',   { border: 'gold-thin' });
})();

// ============================================================
// FONT LIBRARY (all free, Google Fonts, SIL Open Font License)
// ============================================================

var FONT_LIBRARY = {
  english: [
    { name: '', label: 'Theme default', w: '' },
    { name: 'Playfair Display', w: '400;700' }, { name: 'Cormorant Garamond', w: '400;700' },
    { name: 'Lora', w: '400;700' },              { name: 'Merriweather', w: '400;700' },
    { name: 'Noto Serif', w: '400;700' },        { name: 'Cinzel', w: '400;700' },
    { name: 'Inter', w: '400;700' },             { name: 'Lato', w: '400;700' },
    { name: 'Montserrat', w: '400;700' },        { name: 'Poppins', w: '400;700' },
    { name: 'Dancing Script', w: '400;700' },    { name: 'Great Vibes', w: '' }
  ],
  telugu: [
    { name: 'Noto Sans Telugu', w: '400;700' }, { name: 'Noto Serif Telugu', w: '400;700' },
    { name: 'Anek Telugu', w: '400;700' },       { name: 'Hind Guntur', w: '400;700' },
    { name: 'Mandali', w: '' },  { name: 'Ramabhadra', w: '' }, { name: 'Suranna', w: '' },
    { name: 'Gurajada', w: '' }, { name: 'Peddana', w: '' },    { name: 'Ramaraja', w: '' },
    { name: 'Lakki Reddy', w: '' }, { name: 'Dhurjati', w: '' }
  ],
  hindi: [
    { name: 'Noto Sans Devanagari', w: '400;700' }, { name: 'Noto Serif Devanagari', w: '400;700' },
    { name: 'Hind', w: '400;700' }, { name: 'Mukta', w: '400;700' }, { name: 'Tiro Devanagari Hindi', w: '' }
  ],
  tamil: [
    { name: 'Noto Sans Tamil', w: '400;700' }, { name: 'Noto Serif Tamil', w: '400;700' },
    { name: 'Hind Madurai', w: '400;700' }, { name: 'Mukta Malar', w: '400;700' }, { name: 'Catamaran', w: '400;700' }
  ],
  kannada: [
    { name: 'Noto Sans Kannada', w: '400;700' }, { name: 'Noto Serif Kannada', w: '400;700' }, { name: 'Tiro Kannada', w: '' }
  ],
  malayalam: [
    { name: 'Noto Sans Malayalam', w: '400;700' }, { name: 'Noto Serif Malayalam', w: '400;700' }, { name: 'Manjari', w: '400;700' }
  ],
  bengali: [
    { name: 'Noto Sans Bengali', w: '400;700' }, { name: 'Noto Serif Bengali', w: '400;700' },
    { name: 'Hind Siliguri', w: '400;700' }, { name: 'Tiro Bangla', w: '' }
  ]
};

var FONT_TAB_LABELS = {
  english: 'English', telugu: 'తెలుగు Telugu', hindi: 'हिन्दी Hindi', tamil: 'தமிழ் Tamil',
  kannada: 'ಕನ್ನಡ Kannada', malayalam: 'മലയാളം Malayalam', bengali: 'বাংলা Bengali'
};

var FONT_SAMPLE_TEXT = {
  english: 'The Lord is my shepherd', telugu: 'యెహోవా నా కాపరి', hindi: 'प्रभु मेरा चरवाहा है',
  tamil: 'கர்த்தர் என் மேய்ப்பர்', kannada: 'ಕರ್ತನು ನನ್ನ ಕುರುಬನು', malayalam: 'യഹോവ എന്റെ ഇടയൻ', bengali: 'প্রভু আমার পালক'
};

var SAMPLE_VERSES = {
  english:   { text: 'The Lord is my shepherd; I shall not want.', reference: 'Psalm 23:1', language: 'english' },
  telugu:    { text: 'యెహోవా నా కాపరి; నాకు లేమి కలుగదు.', reference: 'కీర్తనలు 23:1', language: 'telugu' },
  hindi:     { text: 'यहोवा मेरा चरवाहा है, मुझे कुछ घटी न होगी।', reference: 'भजन संहिता 23:1', language: 'hindi' },
  tamil:     { text: 'கர்த்தர் என் மேய்ப்பராயிருக்கிறார்; நான் தாழ்ச்சியடையேன்.', reference: 'சங்கீதம் 23:1', language: 'tamil' },
  kannada:   { text: 'ಕರ್ತನು ನನ್ನ ಕುರುಬನು; ನನಗೆ ಕೊರತೆಯಿಲ್ಲ.', reference: 'ಕೀರ್ತನೆ 23:1', language: 'kannada' },
  malayalam: { text: 'യഹോവ എന്റെ ഇടയനാകുന്നു; എനിക്കു മുട്ടുണ്ടാകയില്ല.', reference: 'സങ്കീർത്തനം 23:1', language: 'malayalam' },
  bengali:   { text: 'সদাপ্রভু আমার পালক; আমার অভাব হবে না।', reference: 'গীতসংহিতা ২৩:১', language: 'bengali' }
};

var NOTO_FALLBACK = {
  telugu: 'Noto Sans Telugu', hindi: 'Noto Sans Devanagari', tamil: 'Noto Sans Tamil',
  kannada: 'Noto Sans Kannada', malayalam: 'Noto Sans Malayalam', bengali: 'Noto Sans Bengali'
};

var SANS_FONTS = ['Inter', 'Lato', 'Montserrat', 'Poppins', 'Hind', 'Mukta'];

var FONT_FLAT = {};
Object.keys(FONT_LIBRARY).forEach(function(lang) {
  FONT_LIBRARY[lang].forEach(function(f) { if (f.name) FONT_FLAT[f.name] = f; });
});
Object.keys(NOTO_FALLBACK).forEach(function(lang) {
  if (!FONT_FLAT[NOTO_FALLBACK[lang]]) FONT_FLAT[NOTO_FALLBACK[lang]] = { name: NOTO_FALLBACK[lang], w: '400;700' };
});

var _fontPromises = {};
function loadFontCss(name) {
  if (!name) return Promise.resolve();
  if (_fontPromises[name]) return _fontPromises[name];
  var f = FONT_FLAT[name] || { name: name, w: '' };
  _fontPromises[name] = new Promise(function(resolve) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + encodeURIComponent(f.name).replace(/%20/g, '+') +
                (f.w ? ':wght@' + f.w : '') + '&display=swap';
    link.onload = function() { resolve(); };
    link.onerror = function() { resolve(); };
    document.head.appendChild(link);
    setTimeout(resolve, 6000);
  });
  return _fontPromises[name];
}

async function ensureFont(name, sample) {
  if (!name) return;
  await loadFontCss(name);
  if (document.fonts && document.fonts.load) {
    var s = sample || 'Aa';
    var p = Promise.all([
      document.fonts.load('400 32px "' + name + '"', s),
      document.fonts.load('700 32px "' + name + '"', s)
    ]).catch(function() {});
    await Promise.race([p, new Promise(function(r) { setTimeout(r, 5000); })]);
  }
}

function buildFamily(primary, fallback, generic) {
  var parts = [];
  if (primary) parts.push("'" + primary + "'");
  if (fallback && fallback !== primary) parts.push("'" + fallback + "'");
  parts.push(generic || 'serif');
  return parts.join(', ');
}

// ---------- Font picker UI ----------
function loadSavedFonts() {
  AppState.fonts = { english: '', telugu: 'Noto Sans Telugu', hindi: 'Noto Sans Devanagari', tamil: 'Noto Sans Tamil',
                     kannada: 'Noto Sans Kannada', malayalam: 'Noto Sans Malayalam', bengali: 'Noto Sans Bengali' };
  try {
    var saved = JSON.parse(localStorage.getItem('bpc_fonts') || 'null');
    if (saved) Object.assign(AppState.fonts, saved);
  } catch (e) { /* ignore */ }
  AppState.fontTab = 'english';
}

function saveFonts() {
  try { localStorage.setItem('bpc_fonts', JSON.stringify(AppState.fonts)); } catch (e) { /* ignore */ }
}

function renderFontPicker() {
  var tabs = $id('font-lang-tabs');
  var grid = $id('font-chip-grid');
  if (!tabs || !grid) return;
  var tab = AppState.fontTab || 'english';

  tabs.innerHTML = '';
  Object.keys(FONT_LIBRARY).forEach(function(lang) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'tab-btn font-lang-tab' + (lang === tab ? ' active' : '');
    b.textContent = FONT_TAB_LABELS[lang];
    b.addEventListener('click', function() { AppState.fontTab = lang; renderFontPicker(); schedulePreview(); });
    tabs.appendChild(b);
  });

  grid.innerHTML = '';
  var current = AppState.fonts[tab] || '';
  var sample = FONT_SAMPLE_TEXT[tab];
  FONT_LIBRARY[tab].forEach(function(f) {
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'font-chip' + (f.name === current ? ' selected' : '');
    chip.setAttribute('role', 'option');
    chip.setAttribute('aria-selected', f.name === current ? 'true' : 'false');
    var s = document.createElement('span');
    s.className = 'font-chip-sample';
    s.textContent = f.name ? sample : 'Uses each theme\u2019s own font';
    if (f.name) {
      s.style.fontFamily = "'" + f.name + "', " + (SANS_FONTS.indexOf(f.name) >= 0 || /Sans/.test(f.name) ? 'sans-serif' : 'serif');
      loadFontCss(f.name);
    }
    var n = document.createElement('span');
    n.className = 'font-chip-name';
    n.textContent = f.name || f.label;
    chip.appendChild(s); chip.appendChild(n);
    chip.addEventListener('click', function() {
      AppState.fonts[tab] = f.name;
      saveFonts();
      renderFontPicker();
      schedulePreview();
    });
    grid.appendChild(chip);
  });
}

function setFontTabForLanguage(lang) {
  if (lang === 'marathi') lang = 'hindi';
  if (!FONT_LIBRARY[lang]) return;
  if (AppState.fontTab !== lang) { AppState.fontTab = lang; renderFontPicker(); }
}

// ============================================================
// DESIGN STATE: theme, colors, backgrounds
// ============================================================

var FORMAT_BY_VALUE = {
  '1080x1080': 'instagram-square', '1080x1350': 'instagram-portrait', '1080x1920': 'instagram-story',
  '1920x1080': 'landscape', '2480x3508': 'a4-poster', '1748x2480': 'a5-poster'
};

function getSelectedFormatKey() {
  var r = document.querySelector('input[name="output-format"]:checked');
  if (r && FORMAT_BY_VALUE[r.value]) return FORMAT_BY_VALUE[r.value];
  return IMAGE_FORMATS[AppState.selectedFormat] ? AppState.selectedFormat : 'instagram-square';
}

function setFormatRadio(valueOrKey) {
  var value = valueOrKey;
  Object.keys(FORMAT_BY_VALUE).forEach(function(v) { if (FORMAT_BY_VALUE[v] === valueOrKey) value = v; });
  var r = document.querySelector('input[name="output-format"][value="' + value + '"]');
  if (r) { r.checked = true; AppState.selectedFormat = FORMAT_BY_VALUE[value] || AppState.selectedFormat; }
}

function initFormatSelector() {
  document.querySelectorAll('input[name="output-format"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      AppState.selectedFormat = FORMAT_BY_VALUE[radio.value] || 'instagram-square';
      schedulePreview();
    });
  });
}

function hexLum(hex) {
  var m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return 0.5;
  var n = parseInt(m[1], 16);
  return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255;
}

function syncControlsFromTemplate(t) {
  AppState.touched = {};
  setInputValue('text-color', t.textColor);
  setInputValue('ref-color', t.refColor);
  setInputValue('text-align', t.align || 'center');
  setInputValue('ref-position', t.refPosition || 'bottom-center');
  var sh = $id('text-shadow');
  if (sh) sh.checked = hexLum(t.textColor) > 0.6;
  ['text-color', 'ref-color'].forEach(function(id) {
    var el = $id(id);
    var hex = el && el.parentElement ? el.parentElement.querySelector('.color-hex') : null;
    if (hex && el) hex.value = el.value;
  });
}

function selectTemplate(id) {
  AppState.selectedTemplate = id;
  document.querySelectorAll('.template-card').forEach(function(card) {
    card.classList.toggle('selected', parseInt(card.getAttribute('data-template-id'), 10) === id);
  });
  var t = templateById(id);
  syncControlsFromTemplate(t);
  setBgMode('template');
  showToast('Theme applied: ' + t.name, 'info', 1500);
  schedulePreview();
}

function bgListForMode(mode) {
  if (mode === 'solid' || mode === 'gradient' || mode === 'pattern') return BACKGROUNDS[mode];
  if (mode === 'christian' || mode === 'nature' || mode === 'abstract') return BACKGROUNDS.art.filter(function(b) { return b.cat === mode; });
  return [];
}
function isListMode(mode) { return ['solid', 'gradient', 'pattern', 'christian', 'nature', 'abstract'].indexOf(mode) >= 0; }

function bgCategoryOf(bgId) {
  var art = BACKGROUNDS.art.filter(function(b) { return b.id === bgId; })[0];
  if (art) return art.cat;
  if (BACKGROUNDS.solid.some(function(b) { return b.id === bgId; })) return 'solid';
  if (BACKGROUNDS.gradient.some(function(b) { return b.id === bgId; })) return 'gradient';
  if (BACKGROUNDS.pattern.some(function(b) { return b.id === bgId; })) return 'pattern';
  return 'custom';
}

function selectBackground(bgId) {
  var cat = bgCategoryOf(bgId);
  AppState.selectedBg = bgId;
  if (cat !== 'custom') AppState.bgByCategory[cat] = bgId;
  document.querySelectorAll('.bg-item').forEach(function(item) {
    item.classList.toggle('selected', item.getAttribute('data-bg-id') === bgId);
  });
  setBgMode(cat);
  showToast('Background applied.', 'info', 1200);
}

function setBgMode(mode) {
  AppState.bgMode = mode;
  var r = document.querySelector('input[name="bg-mode"][value="' + mode + '"]');
  if (r) r.checked = true;
  renderBgGalleryCreate();
  schedulePreview();
}

function renderBgGalleryCreate() {
  var grid = $id('bg-gallery-create');
  if (!grid) return;
  grid.innerHTML = '';
  var mode = AppState.bgMode;
  var hint = $id('bg-mode-hint');
  var up = $id('bg-custom-upload-row');
  if (up) up.hidden = mode !== 'custom';

  var hints = {
    template: 'Using each theme\u2019s own background and colors. Pick Colors, Vibrant or Patterns to change it.',
    random: 'A different random background on every card. Text color adjusts automatically.',
    custom: AppState.customBgs.length ? 'Your uploaded images are used in turn. Click one to preview it.' : 'Upload your own background image(s) below.'
  };
  if (hint) hint.textContent = hints[mode] || '';

  var list = [];
  if (isListMode(mode)) {
    list = bgListForMode(mode);
    AppState.selectedBg = AppState.bgByCategory[mode];
  } else if (mode === 'custom') {
    list = AppState.customBgs;
  }
  list.forEach(function(bg) { grid.appendChild(createBgItem(bg, 70)); });
}

function renderBgsByCategory(cat) {
  AppState.bgLibTab = cat;
  var grid = $id('backgrounds-grid');
  if (!grid) return;
  grid.innerHTML = '';
  var list;
  if (isListMode(cat)) list = bgListForMode(cat);
  else if (cat === 'custom') list = AppState.customBgs;
  else list = BACKGROUNDS.solid.concat(BACKGROUNDS.gradient).concat(BACKGROUNDS.pattern).concat(BACKGROUNDS.art).concat(AppState.customBgs);
  var q = (AppState.bgSearch || '').trim().toLowerCase();
  if (q) list = list.filter(function(b) { return ((b.label || '') + ' ' + (b.kind || '') + ' ' + (b.cat || '')).toLowerCase().indexOf(q) >= 0; });
  list.forEach(function(bg) { grid.appendChild(createBgItem(bg, 100)); });
  if (!list.length) grid.innerHTML = '<p class="config-hint">' + (cat === 'custom' ? 'No custom backgrounds yet. Upload images below.' : 'Nothing found.') + '</p>';
  var cnt = $id('bg-count');
  if (cnt) cnt.textContent = list.length + ' backgrounds';
  var upCard = $id('custom-bg-upload');
  if (upCard) upCard.hidden = cat !== 'custom';
}

function renderBackgroundLibrary() { renderBgsByCategory(AppState.bgLibTab || 'all'); }

function pickRandom(arr, rnd) { return arr[Math.floor((rnd || Math.random)() * arr.length)]; }

function designForIndex(i) {
  var mode = AppState.designMode;
  var tid = AppState.selectedTemplate;
  if (mode === 'random') {
    tid = pickRandom(TEMPLATES).id;
  } else if (mode === 'rotate') {
    var ids = AppState.rotationTemplates && AppState.rotationTemplates.length
      ? AppState.rotationTemplates : TEMPLATES.map(function(t) { return t.id; });
    var n = AppState.rotateEveryN || 3;
    tid = ids[Math.floor(i / n) % ids.length];
  }
  var d = { templateId: tid, bgId: undefined, overrideBg: false, custom: false };
  var bm = AppState.bgMode;
  if (isListMode(bm)) {
    var list = bgListForMode(bm);
    var chosen = AppState.bgByCategory[bm];
    d.bgId = list.some(function(b) { return b.id === chosen; }) ? chosen : list[0].id;
    d.overrideBg = true;
  } else if (bm === 'random') {
    d.bgId = pickRandom(BACKGROUNDS.solid.concat(BACKGROUNDS.gradient).concat(BACKGROUNDS.pattern).concat(BACKGROUNDS.art)).id;
    d.overrideBg = true;
  } else if (bm === 'custom' && AppState.customBgs.length) {
    var cb = AppState.customBgs;
    var sel = cb.filter(function(b) { return b.id === AppState.selectedBg; })[0];
    d.bgId = (AppState.previewOnly && sel) ? sel.id : cb[i % cb.length].id;
    d.overrideBg = true;
    d.custom = true;
  }
  return d;
}

function buildCardOptions(index) {
  var d = designForIndex(index);
  var tch = AppState.touched || {};
  var o = {
    format: getSelectedFormatKey(), templateId: d.templateId, bgId: d.bgId, customBg: d.custom,
    autoContrast: d.overrideBg && !tch['text-color'], fonts: AppState.fonts, brand: AppState.brand
  };
  if (tch['text-color']) o.textColor = val('text-color');
  if (tch['ref-color']) o.refColor = val('ref-color');
  if (tch['text-align']) o.align = val('text-align');
  if (tch['ref-position']) o.refPosition = val('ref-position');
  if (tch['text-shadow']) o.textShadow = !!($id('text-shadow') && $id('text-shadow').checked);
  var fs = parseFloat(val('font-size')); if (fs > 0) o.fontSize = fs;
  var rfs = parseFloat(val('ref-font-size')); if (rfs > 0) o.refFontSize = rfs;
  o.fontWeight = val('font-weight') || '400';
  o.lineSpacing = parseFloat(val('line-spacing')) || 1.6;
  o.letterSpacing = parseFloat(val('letter-spacing')) || 0;
  return o;
}

// ============================================================
// CARD RENDERER (used by preview AND final generation)
// ============================================================

function regionLum(ctx, W, H, x0, y0, x1, y1) {
  try {
    var tmp = document.createElement('canvas');
    tmp.width = 16; tmp.height = 16;
    var t = tmp.getContext('2d');
    t.drawImage(ctx.canvas, W * x0, H * y0, W * (x1 - x0), H * (y1 - y0), 0, 0, 16, 16);
    var d = t.getImageData(0, 0, 16, 16).data, sum = 0, n = d.length / 4;
    for (var i = 0; i < d.length; i += 4) sum += (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;
    return sum / n;
  } catch (e) { return 0.5; }
}

function loadImg(src) {
  return new Promise(function(resolve) {
    var img = new Image();
    img.onload = function() { resolve(img); };
    img.onerror = function() { resolve(null); };
    img.src = src;
  });
}

async function drawBrand(ctx, W, H, brand, ext) {
  ext = ext || {};
  if (!brand) return;
  var S = W / 1080;
  var showLogo = !!(brand.logoEnabled && brand.logoDataUrl);
  var showName = !!(brand.nameEnabled && brand.name);
  if (!showLogo && !showName) return;

  var img = showLogo ? await loadImg(brand.logoDataUrl) : null;
  if (!img) showLogo = false;
  if (!showLogo && !showName) return;

  var pos = brand.position || 'bottom-center';
  var yC = pos.indexOf('top') === 0 ? H * 0.075 : H * 0.925;
  var d = 64 * S;           // standard round logo size
  var gap = 14 * S;
  var fs = (brand.size || 24) * S;
  var family = (brand.font || 'Inter');
  await ensureFont(family, brand.name);

  ctx.save();
  ctx.font = '600 ' + fs + 'px "' + family + '", sans-serif';
  var nameW = showName ? ctx.measureText(brand.name).width : 0;
  var maxW = W * 0.84;
  var logoPart = showLogo ? d + (showName ? gap : 0) : 0;
  if (showName && logoPart + nameW > maxW) {
    fs = fs * Math.max(0.5, (maxW - logoPart) / nameW);
    ctx.font = '600 ' + fs + 'px "' + family + '", sans-serif';
    nameW = ctx.measureText(brand.name).width;
  }
  var total = logoPart + nameW;
  var startX = pos.indexOf('left') >= 0 ? W * 0.06 : (pos.indexOf('right') >= 0 ? W * 0.94 - total : W / 2 - total / 2);

  ctx.globalAlpha = brand.opacity || 0.9;

  if (showLogo) {
    var cx = startX + d / 2;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.30)'; ctx.shadowBlur = 8 * S; ctx.shadowOffsetY = 2 * S;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath(); ctx.arc(cx, yC, d / 2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, yC, d / 2 - 2 * S, 0, Math.PI * 2); ctx.clip();
    var side = Math.min(img.width, img.height);
    ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, cx - d / 2, yC - d / 2, d, d);
    ctx.restore();
    ctx.lineWidth = 2.5 * S; ctx.strokeStyle = 'rgba(255,255,255,0.95)';
    ctx.beginPath(); ctx.arc(cx, yC, d / 2 - 1 * S, 0, Math.PI * 2); ctx.stroke();
  }

  if (showName) {
    var color = brand.color || '#FFFFFF';
    var lum = hexLum(color);
    if (ext.lightBg && lum > 0.8) color = '#1F2937';
    if (!ext.lightBg && lum < 0.2) color = '#FFFFFF';
    ctx.fillStyle = color;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    if (!ext.lightBg) { ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 4 * S; }
    ctx.fillText(brand.name, startX + (showLogo ? d + gap : 0), yC);
  }
  ctx.restore();
}

// Browser-independent text alignment (iOS Safari ignored textAlign in some cases)
function fillAligned(ctx, text, x, y, align) {
  ctx.textAlign = 'left';
  var w = ctx.measureText(text).width;
  var px = align === 'center' ? x - w / 2 : (align === 'right' ? x - w : x);
  ctx.fillText(text, px, y);
}

async function renderCard(verse, options) {
  options = options || {};
  var fmt = IMAGE_FORMATS[options.format] || IMAGE_FORMATS['instagram-square'];
  var k = options.sizeScale || 1;
  var W = Math.round(fmt.width * k), H = Math.round(fmt.height * k), S = W / 1080;
  var canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext('2d');

  var template = templateById(options.templateId || 1);
  var text = String(verse.text || '');
  var lang = detectScriptLanguage(text, 'english');
  var fonts = options.fonts || AppState.fonts || {};
  var choice = fonts[lang] || '';
  var primary = choice || (lang === 'english' ? (template.font || 'Playfair Display') : '');
  var noto = NOTO_FALLBACK[lang] || '';
  var sample = text + ' ' + (verse.reference || '');

  await ensureFont(primary, sample);
  if (noto) await ensureFont(noto, sample);
  var generic = (lang === 'english' && SANS_FONTS.indexOf(primary) < 0) ? 'serif' : 'sans-serif';
  var bodyFamily = buildFamily(primary, noto, generic);
  var refPrimary = lang === 'english' ? (template.refFont || 'Inter') : (choice || noto);
  if (lang === 'english') await ensureFont(refPrimary, 'Aa');
  var refFamily = buildFamily(refPrimary, noto, (lang === 'english' && refPrimary === 'Playfair Display') ? 'serif' : 'sans-serif');

  // 1. Background
  await drawBackground(ctx, W, H, options.bgId || template.bgId);
  var bgLum = regionLum(ctx, W, H, 0.1, 0.15, 0.9, 0.8);
  if (options.customBg) {
    ctx.fillStyle = 'rgba(0,0,0,' + (bgLum > 0.6 ? 0.55 : (bgLum > 0.4 ? 0.45 : 0.32)) + ')';
    ctx.fillRect(0, 0, W, H);
    bgLum = bgLum * 0.4;
  } else if (template.overlay && !options.bgId) {
    drawOverlay(ctx, W, H, template.overlay);
  }

  // 2. Decoration + border
  if (template.decorative) drawDecoration(ctx, W, H, template.decorative, template);
  if (template.border) drawBorder(ctx, W, H, template.border);

  var brandLum = regionLum(ctx, W, H, 0.1, 0.88, 0.9, 0.98);

  // 3. Colors
  var auto = options.autoContrast || options.customBg || (template.autoText && !options.textColor);
  var lightBg = bgLum > 0.58;
  var textColor = options.textColor || (auto ? (lightBg ? '#1F2937' : '#FFFFFF') : template.textColor);
  var refColor = options.refColor || (auto ? (lightBg ? '#7C4A24' : '#FDE68A') : template.refColor);

  // 4. Layout + auto-fit
  var margin = W * 0.1, areaW = W - margin * 2;
  var areaTop = H * 0.15, areaBottom = H * 0.78, areaH = areaBottom - areaTop;
  var weight = options.fontWeight || '400';
  var italic = (lang === 'english' && !choice && template.font === 'Playfair Display' && weight !== '700') ? 'italic ' : '';
  var lineSpacing = options.lineSpacing || 1.6;
  var fontSize = options.fontSize ? options.fontSize * S : W * 0.06;
  var minFS = W * 0.022;
  var hasLS = ('letterSpacing' in ctx);
  if (hasLS) ctx.letterSpacing = ((options.letterSpacing || 0) * S) + 'px';

  var lines;
  for (;;) {
    ctx.font = italic + weight + ' ' + fontSize + 'px ' + bodyFamily;
    lines = wrapText(ctx, text, areaW);
    if (lines.length * fontSize * lineSpacing <= areaH || fontSize <= minFS) break;
    fontSize -= Math.max(1, W * 0.002);
  }

  var align = options.align || template.align || 'center';
  var lh = fontSize * lineSpacing;
  var blockH = lines.length * lh;
  var refPos = options.refPosition || template.refPosition || 'bottom-center';
  var top = (areaTop + areaBottom) / 2 - blockH / 2 - (refPos === 'inline' ? fontSize * 0.6 : 0);
  var textX = align === 'center' ? W / 2 : (align === 'left' ? margin : W - margin);

  var shadowOn = options.textShadow !== undefined ? options.textShadow : hexLum(textColor) > 0.6;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  // opening quote mark
  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = textColor;
  ctx.font = '700 ' + (fontSize * 2.2) + 'px ' + bodyFamily;
  fillAligned(ctx, '\u201C', textX, top - fontSize * 0.2, align);
  ctx.restore();

  if (shadowOn) {
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 8 * S; ctx.shadowOffsetX = 2 * S; ctx.shadowOffsetY = 2 * S;
  }
  ctx.font = italic + weight + ' ' + fontSize + 'px ' + bodyFamily;
  ctx.fillStyle = textColor;
  lines.forEach(function(line, i) { fillAligned(ctx, line, textX, top + i * lh + lh / 2, align); });
  ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
  if (hasLS) ctx.letterSpacing = '0px';

  // 5. Reference
  if (verse.reference) {
    var refFS = options.refFontSize ? options.refFontSize * S : Math.max(fontSize * 0.55, W * 0.026);
    ctx.font = '600 ' + refFS + 'px ' + refFamily;
    ctx.fillStyle = refColor;
    ctx.textBaseline = 'alphabetic';
    var refText = '\u2014 ' + verse.reference;
    var rx, ry = H * 0.855, ra = 'center';
    if (refPos === 'bottom-right') { rx = W - margin; ra = 'right'; }
    else if (refPos === 'bottom-left') { rx = margin; ra = 'left'; }
    else if (refPos === 'top-center') { rx = W / 2; ry = H * 0.105; }
    else if (refPos === 'inline') { rx = textX; ra = align; ry = top + blockH + refFS * 1.4; }
    else { rx = W / 2; }
    fillAligned(ctx, refText, rx, ry, ra);
  }

  // 6. Brand (logo + name side by side, never overlapping)
  var brand = options.brand || AppState.brand;
  if (brand && ((brand.nameEnabled && brand.name) || (brand.logoEnabled && brand.logoDataUrl))) {
    await drawBrand(ctx, W, H, brand, { lightBg: brandLum > 0.58 });
  }
  return canvas;
}

async function generateImage(verse, options) {
  var c = await renderCard(verse, options);
  return await new Promise(function(resolve) {
    c.toBlob(function(blob) { resolve(blob); c.width = 0; c.height = 0; }, 'image/png', 1.0);
  });
}

// ============================================================
// LIVE PREVIEW (same renderer as the final cards)
// ============================================================

var _previewSeq = 0;
var schedulePreview = debounce(function() { refreshPreview(); }, 250);

function getPreviewVerse() {
  var t = (val('verse-text') || '').trim();
  var r = (val('verse-reference') || '').trim();
  var v = null;
  if (t) v = { text: t, reference: r, language: val('verse-language') };
  else if (AppState.currentPage === 'import' && AppState.importPreview && AppState.importPreview.length) v = AppState.importPreview[0];
  else if (AppState.verses.length) v = AppState.verses[0];
  var tab = AppState.fontTab || 'english';
  if (!v) return SAMPLE_VERSES[tab] || SAMPLE_VERSES.english;
  // when browsing a non-English font tab, show a sample in that script so the font can be judged
  if (tab !== 'english' && detectScriptLanguage(v.text, 'english') !== tab && !(tab === 'hindi' && detectScriptLanguage(v.text, 'english') === 'hindi')) {
    return SAMPLE_VERSES[tab];
  }
  return v;
}

async function refreshPreview() {
  var canvas = $id('preview-canvas');
  if (!canvas) return;
  var seq = ++_previewSeq;
  try {
    AppState.previewOnly = true;
    var opts = buildCardOptions(AppState.designMode === 'manual' ? (AppState.previewIndex || 0) : 0);
    AppState.previewOnly = false;
    var fmt = IMAGE_FORMATS[opts.format] || IMAGE_FORMATS['instagram-square'];
    opts.sizeScale = Math.min(1, 560 / Math.max(fmt.width, fmt.height));
    var c = await renderCard(getPreviewVerse(), opts);
    if (seq !== _previewSeq) return;
    canvas.width = c.width; canvas.height = c.height;
    canvas.getContext('2d').drawImage(c, 0, 0);
    canvas.style.width = '100%';
    canvas.style.maxWidth = c.width + 'px';
    canvas.style.height = 'auto';
  } catch (e) {
    AppState.previewOnly = false;
    console.warn('Preview failed:', e);
  }
}

// ============================================================
// CUSTOM BACKGROUND UPLOAD
// ============================================================

function downscaleDataUrl(dataUrl, maxPx, cb) {
  var img = new Image();
  img.onload = function() {
    var m = Math.max(img.width, img.height);
    if (m <= maxPx) { cb(dataUrl); return; }
    var s = maxPx / m, c = document.createElement('canvas');
    c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    cb(c.toDataURL('image/jpeg', 0.88));
  };
  img.onerror = function() { cb(dataUrl); };
  img.src = dataUrl;
}

function handleCustomBgFiles(files) {
  var list = Array.prototype.slice.call(files || []).filter(function(f) { return /^image\//.test(f.type); });
  if (!list.length) { showToast('Please choose image files (JPG, PNG, WEBP).', 'warning'); return; }
  var left = list.length;
  list.forEach(function(file) {
    if (file.size > 10 * 1024 * 1024) { showToast(file.name + ' is larger than 10 MB.', 'warning'); left--; return; }
    var reader = new FileReader();
    reader.onload = function(e) {
      downscaleDataUrl(e.target.result, 1800, function(url) {
        var id = generateId();
        AppState.customBgs.push({ id: id, dataUrl: url, label: file.name });
        AppState.selectedBg = id;
        if (--left === 0) onCustomBgsChanged();
      });
    };
    reader.readAsDataURL(file);
  });
  if (left === 0) return;
}

function onCustomBgsChanged() {
  showToast('Custom background added.', 'success', 2000);
  setBgMode('custom');
  renderBgsByCategory(AppState.bgLibTab || 'all');
}

function initCustomBgUpload() {
  var a = $id('create-bg-file');
  if (a) a.addEventListener('change', function() { handleCustomBgFiles(a.files); a.value = ''; });
  var b = $id('bg-file-input');
  if (b) b.addEventListener('change', function() { handleCustomBgFiles(b.files); b.value = ''; });
  var dz = $id('bg-dropzone');
  if (dz) {
    dz.addEventListener('click', function() { if (b) b.click(); });
    dz.addEventListener('dragover', function(e) { e.preventDefault(); dz.classList.add('dragover'); });
    dz.addEventListener('dragleave', function() { dz.classList.remove('dragover'); });
    dz.addEventListener('drop', function(e) { e.preventDefault(); dz.classList.remove('dragover'); handleCustomBgFiles(e.dataTransfer.files); });
  }
}

// ============================================================
// BULK IMPORT -> GENERATE
// ============================================================

function beginGeneration(list) {
  if (AppState.isGenerating) { showToast('Generation already in progress.', 'warning'); return; }
  var verses = Array.isArray(list) ? list : AppState.verses.slice();
  if (verses.length === 0) { showToast('No verses to generate. Please add verses first.', 'error'); return; }

  AppState.genVerses = verses;
  var bar = $id('gen-progress-bar'); if (bar) bar.style.width = '0%';
  var modal = $id('gen-modal'); if (modal) modal.style.display = 'flex';

  AppState.batchId = generateId();
  AppState.isGenerating = true;
  AppState.cancelRequested = false;
  generateBatch();
}

async function generateBatch() {
  var verses = (AppState.genVerses || AppState.verses).slice();
  var total = verses.length;
  var newImages = [];
  var format = getSelectedFormatKey();
  var templateId = AppState.selectedTemplate;

  try {
    for (var i = 0; i < total; i++) {
      if (AppState.cancelRequested) break;
      var verse = verses[i];
      updateProgress(i + 1, total);
      try {
        var opts = buildCardOptions(i);
        var blob = await generateImage(verse, opts);
        var imgObj = {
          id: generateId(), verseIdx: i, blob: blob, url: URL.createObjectURL(blob),
          format: opts.format, templateId: opts.templateId, bgId: opts.bgId,
          verse: verse, createdAt: new Date().toISOString(), batchId: AppState.batchId
        };
        newImages.push(imgObj);
        AppState.generatedImages.push(imgObj);
        persistImage(imgObj);
      } catch (err) {
        console.error(err);
        showToast('Error generating image for verse ' + (i + 1) + ': ' + err.message, 'error');
      }
      await new Promise(function(resolve) { setTimeout(resolve, 30); });
    }
  } finally {
    AppState.isGenerating = false;
    var modal = $id('gen-modal');
    if (modal) modal.style.display = 'none';
  }

  if (AppState.cancelRequested) {
    showToast('Generation cancelled. ' + newImages.length + ' image(s) saved.', 'warning');
    AppState.cancelRequested = false;
    if (newImages.length) navigateTo('gallery');
    return;
  }
  showToast('Generated ' + newImages.length + ' images successfully!', 'success');
  if (AppState.settings.autoSaveHistory) {
    var batch = {
      id: AppState.batchId, date: new Date().toISOString(), verses: total, images: newImages.length,
      status: 'completed', format: format, templateId: templateId
    };
    AppState.history.unshift(batch);
    saveToLocalStorage();
    if (AppState.settings.appsScriptUrl) saveToBackend(batch);
  }
  navigateTo('gallery');
}

function updateProgress(current, total) {
  var pct = total > 0 ? Math.round((current / total) * 100) : 0;
  var bar = $id('gen-progress-bar'); if (bar) bar.style.width = pct + '%';
  var counter = $id('gen-counter'); if (counter) counter.textContent = current + ' / ' + total;
  var status = $id('gen-status');
  if (status) {
    var list = AppState.genVerses || AppState.verses;
    var v = list[current - 1];
    status.textContent = 'Processing: ' + (v ? truncateText(v.reference || v.text, 40) : '');
  }
}

// ============================================================
// DESIGN PANEL: shared by Create Cards and Bulk Import
// ============================================================

function mountDesignPanel(page) {
  var slot = $id('design-slot-' + page);
  var panel = $id('design-panel');
  if (slot && panel && panel.parentNode !== slot) slot.appendChild(panel);
  if (typeof updateManualStatus === 'function') updateManualStatus();
  schedulePreview();
}

function bindColorPair(id) {
  var el = $id(id);
  if (!el) return;
  var hex = el.parentElement ? el.parentElement.querySelector('.color-hex') : null;
  el.addEventListener('input', function() {
    AppState.touched[id] = true;
    if (hex) hex.value = el.value;
  });
  if (hex) {
    hex.addEventListener('input', function() {
      if (/^#[0-9a-f]{6}$/i.test(hex.value.trim())) {
        el.value = hex.value.trim();
        AppState.touched[id] = true;
        schedulePreview();
      }
    });
  }
}

function initDesignV2() {
  AppState.touched = {};
  AppState.bgMode = 'template';
  AppState.bgByCategory = { solid: 'orange-solid', gradient: 'sunrise-gradient', pattern: 'marble-pattern', christian: 'art-rays-1', nature: 'art-mountains-1', abstract: 'art-blobs-1' };
  AppState.bgLibTab = 'all';
  AppState.previewOnly = false;
  AppState.genVerses = null;

  if (AppState.settings.maxVerses === 20) {
    AppState.settings.maxVerses = 100;
    setInputValue('max-verses', 100);
  }

  loadSavedFonts();
  renderFontPicker();
  initFormatSelector();
  setFormatRadio(AppState.settings.defaultFormat || 'instagram-square');

  bindColorPair('text-color');
  bindColorPair('ref-color');
  ['text-align', 'ref-position', 'text-shadow'].forEach(function(id) {
    var el = $id(id);
    if (el) el.addEventListener('change', function() { AppState.touched[id] = true; });
  });
  var reset = $id('btn-reset-text');
  if (reset) reset.addEventListener('click', function() {
    syncControlsFromTemplate(templateById(AppState.selectedTemplate));
    ['font-size', 'ref-font-size'].forEach(function(id) { setInputValue(id, ''); });
    setInputValue('font-weight', '400'); setInputValue('line-spacing', '1.6'); setInputValue('letter-spacing', '0');
    schedulePreview();
    showToast('Text settings reset to the theme.', 'info', 1500);
  });

  document.querySelectorAll('input[name="bg-mode"]').forEach(function(r) {
    r.addEventListener('change', function() { setBgMode(r.value); });
  });

  initCustomBgUpload();
  syncControlsFromTemplate(templateById(AppState.selectedTemplate));
  renderBgGalleryCreate();

  ['input', 'change'].forEach(function(ev) {
    document.addEventListener(ev, function(e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.id === 'verse-language') setFontTabForLanguage(t.value);
      if (t.id === 'verse-text') {
        var l = detectScriptLanguage(t.value, '');
        if (l) setFontTabForLanguage(l);
      }
      if (t.closest('#design-panel') || /^(verse-text|verse-reference|verse-language|brand-)/.test(t.id || '')) schedulePreview();
    });
  });

  var logoUpload = $id('logo-upload');
  if (logoUpload) logoUpload.addEventListener('change', function() { setTimeout(schedulePreview, 400); });

  mountDesignPanel('create');
  setTimeout(refreshPreview, 400);
}

function setLogoPreview(url) {
  var box = $id('logo-preview');
  if (!box) return;
  box.innerHTML = '';
  var img = document.createElement('img');
  img.src = url; img.alt = 'Logo preview';
  img.style.cssText = 'width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.25);';
  box.appendChild(img);
}

// ============================================================
// V3: ART BACKGROUND LIBRARY (205 procedural backgrounds)
// Christian, Nature and Abstract. All drawn in code: no copyright,
// no image files, any size (Instagram to A4 poster).
// ============================================================

BACKGROUNDS.art = [];

function artRgba(hex, a) {
  var m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return 'rgba(255,255,255,' + a + ')';
  var n = parseInt(m[1], 16);
  return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
}
function artMix(h1, h2, t) {
  var a = parseInt(h1.slice(1), 16), b = parseInt(h2.slice(1), 16);
  var r = Math.round(((a >> 16) & 255) * (1 - t) + ((b >> 16) & 255) * t);
  var g = Math.round(((a >> 8) & 255) * (1 - t) + ((b >> 8) & 255) * t);
  var bl = Math.round((a & 255) * (1 - t) + (b & 255) * t);
  return 'rgb(' + r + ',' + g + ',' + bl + ')';
}
function artVGrad(ctx, W, H, stops, y0, y1) {
  var gr = ctx.createLinearGradient(0, y0 || 0, 0, y1 === undefined ? H : y1);
  stops.forEach(function(c, n) { gr.addColorStop(stops.length === 1 ? 0 : n / (stops.length - 1), c); });
  ctx.fillStyle = gr;
  ctx.fillRect(0, y0 || 0, W, (y1 === undefined ? H : y1) - (y0 || 0));
}
function artGlow(ctx, x, y, r, color, a) {
  var g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, artRgba(color, a));
  g.addColorStop(1, artRgba(color, 0));
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}
function artRidge(ctx, W, H, baseY, amp, f1, f2, ph, color, sharp) {
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.moveTo(0, H);
  for (var x = 0; x <= W; x += Math.max(2, W / 120)) {
    var s = Math.sin(x * f1 + ph) * amp + Math.sin(x * f2 + ph * 2.3) * amp * 0.45;
    if (sharp) s = -Math.abs(Math.sin(x * f1 + ph)) * amp + Math.sin(x * f2 + ph * 2.3) * amp * 0.25;
    ctx.lineTo(x, baseY + s);
  }
  ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
}
function artCross(ctx, x, baseY, h, w, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x - w / 2, baseY - h, w, h);
  ctx.fillRect(x - h * 0.28, baseY - h * 0.78, h * 0.56, w);
}
function artVeil(ctx, W, H) {
  var lum = regionLum(ctx, W, H, 0.2, 0.25, 0.8, 0.75);
  var col = lum > 0.58 ? '255,255,255' : '0,0,0';
  var a = lum > 0.58 ? 0.22 : 0.26;
  var cy = H * 0.47, r = Math.max(W, H) * 0.55;
  var g = ctx.createRadialGradient(W / 2, cy, 0, W / 2, cy, r);
  g.addColorStop(0, 'rgba(' + col + ',' + a + ')');
  g.addColorStop(1, 'rgba(' + col + ',0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}

var ART_GEN = {
  // ---------- CHRISTIAN ----------
  rays: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1], c[2]]);
    var ox = W * 0.5, oy = -H * 0.04, n = 20, i;
    ctx.fillStyle = artRgba(c[3], 0.15);
    for (i = 0; i < n; i += 2) {
      var a0 = Math.PI * 0.04 + (i / n) * Math.PI * 0.92, a1 = Math.PI * 0.04 + ((i + 1) / n) * Math.PI * 0.92;
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.arc(ox, oy, H * 1.7, a0, a1); ctx.closePath(); ctx.fill();
    }
    artGlow(ctx, ox, oy, H * 0.8, c[3], 0.55);
  },
  crosshill: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1], c[2]]);
    var cx = W * 0.78;
    artGlow(ctx, cx, H * 0.6, H * 0.4, c[3], 0.85);
    var y1 = function(x) { return H * 0.74 + Math.sin(x / (18 * u) + 1) * 3 * u; };
    ctx.fillStyle = c[4]; ctx.beginPath(); ctx.moveTo(0, H);
    for (var x = 0; x <= W; x += W / 80) ctx.lineTo(x, y1(x));
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    artCross(ctx, cx, y1(cx) + 0.5 * u, 15 * u, 1.3 * u, c[6]);
    artRidge(ctx, W, H, H * 0.84, 3 * u, 1 / (14 * u), 1 / (6 * u), 3, c[5]);
  },
  stainedglass: function(ctx, W, H, c, rnd, u) {
    ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H);
    var d = 8 * u, row = 0, x, y, cells = [];
    for (y = -d; y < H + d * 2; y += d, row++) {
      for (x = -d + (row % 2) * d; x < W + d * 2; x += 2 * d) cells.push([x, y]);
    }
    cells.forEach(function(p) {
      ctx.fillStyle = c[Math.floor(rnd() * c.length)];
      ctx.beginPath(); ctx.moveTo(p[0], p[1] - d); ctx.lineTo(p[0] + d, p[1]); ctx.lineTo(p[0], p[1] + d); ctx.lineTo(p[0] - d, p[1]); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = '#141414'; ctx.lineWidth = Math.max(1, 0.7 * u); ctx.stroke();
    });
    artGlow(ctx, W / 2, H * 0.4, Math.max(W, H) * 0.6, '#FFFFFF', 0.28);
  },
  rosewindow: function(ctx, W, H, c, rnd, u) {
    var cx = W / 2, cy = H * 0.46, R = Math.min(W, H) * 0.48, i;
    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.75);
    g.addColorStop(0, c[0]); g.addColorStop(1, c[1]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = artRgba(c[2], 0.35); ctx.lineWidth = Math.max(1, 0.35 * u);
    [1, 0.82, 0.55, 0.3, 0.12].forEach(function(f) { ctx.beginPath(); ctx.arc(cx, cy, R * f, 0, Math.PI * 2); ctx.stroke(); });
    for (i = 0; i < 12; i++) {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(i * Math.PI * 2 / 12);
      ctx.fillStyle = artRgba(c[3], 0.14); ctx.strokeStyle = artRgba(c[2], 0.4);
      ctx.beginPath(); ctx.ellipse(R * 0.42, 0, R * 0.2, R * 0.085, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(R * 0.9, 0, R * 0.05, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
    for (i = 0; i < 24; i++) {
      var a = i * Math.PI * 2 / 24;
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R * 0.12, cy + Math.sin(a) * R * 0.12);
      ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.strokeStyle = artRgba(c[2], 0.12); ctx.stroke();
    }
    artGlow(ctx, cx, cy, R * 0.5, c[3], 0.25);
  },
  arch: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    var m = Math.min(W, H), cx = W / 2, ys = H * 0.58;
    function arch(a, lw, alpha, fill) {
      ctx.beginPath();
      ctx.moveTo(cx - a, H * 1.02); ctx.lineTo(cx - a, ys);
      ctx.arc(cx + a, ys, 2 * a, Math.PI, Math.PI + Math.PI / 3, false);
      ctx.arc(cx - a, ys, 2 * a, Math.PI * 5 / 3, Math.PI * 2, false);
      ctx.lineTo(cx + a, H * 1.02);
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      ctx.strokeStyle = artRgba(c[3], alpha); ctx.lineWidth = lw; ctx.stroke();
    }
    var g = ctx.createLinearGradient(0, ys - 0.45 * m, 0, H);
    g.addColorStop(0, artRgba(c[2], 0.5)); g.addColorStop(1, artRgba(c[2], 0.05));
    arch(0.27 * m, 0.1, 0, g);
    arch(0.27 * m, Math.max(2, 0.9 * u), 0.75);
    arch(0.23 * m, Math.max(1, 0.4 * u), 0.45);
    arch(0.31 * m, Math.max(1, 0.3 * u), 0.25);
    artGlow(ctx, cx, ys - 0.2 * m, 0.45 * m, c[2], 0.35);
  },
  crosspattern: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    ctx.fillStyle = artRgba(c[2], 0.2);
    var sp = 16 * u, row = 0, x, y;
    for (y = 8 * u; y < H + sp; y += sp, row++) {
      for (x = 8 * u + (row % 2) * sp / 2; x < W + sp; x += sp) {
        ctx.fillRect(x - 0.45 * u, y - 3 * u, 0.9 * u, 6.4 * u);
        ctx.fillRect(x - 1.8 * u, y - 1.2 * u, 3.6 * u, 0.9 * u);
      }
    }
  },
  starbethlehem: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1], c[2]]);
    var i;
    for (i = 0; i < 110; i++) {
      ctx.fillStyle = artRgba('#FFFFFF', 0.25 + rnd() * 0.6);
      ctx.beginPath(); ctx.arc(rnd() * W, rnd() * H * 0.7, (0.12 + rnd() * 0.38) * u, 0, Math.PI * 2); ctx.fill();
    }
    var sx = W * 0.72, sy = H * 0.2;
    artGlow(ctx, sx, sy, 26 * u, c[3], 0.55);
    ctx.fillStyle = artRgba(c[3], 0.95);
    [[16, 1.5, 0], [16, 1.5, Math.PI / 2], [9, 1.1, Math.PI / 4], [9, 1.1, -Math.PI / 4]].forEach(function(s) {
      ctx.save(); ctx.translate(sx, sy); ctx.rotate(s[2]);
      ctx.beginPath(); ctx.moveTo(-s[0] * u, 0); ctx.lineTo(0, -s[1] * u); ctx.lineTo(s[0] * u, 0); ctx.lineTo(0, s[1] * u); ctx.closePath(); ctx.fill();
      ctx.restore();
    });
    artRidge(ctx, W, H, H * 0.86, 3 * u, 1 / (20 * u), 1 / (7 * u), 2, c[4]);
  },
  candles: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    artGlow(ctx, W / 2, H * 1.0, H * 0.7, c[2], 0.35);
    for (var i = 0; i < 46; i++) {
      var y = H * (0.25 + rnd() * 0.75);
      artGlow(ctx, rnd() * W, y, (2 + rnd() * 8) * u, rnd() > 0.5 ? c[2] : c[3], 0.12 + rnd() * 0.3);
    }
  },
  waters: function(ctx, W, H, c, rnd, u) {
    var hy = H * 0.56;
    artVGrad(ctx, W, H, [c[0], c[1]], 0, hy);
    artVGrad(ctx, W, H, [c[3], c[4]], hy, H);
    artGlow(ctx, W / 2, hy, 40 * u, c[2], 0.85);
    var i;
    for (i = 0; i < 26; i++) {
      var y = hy + (i + 1) * (H - hy) / 27, w = (6 + rnd() * 26) * u * (1 + i / 20);
      ctx.fillStyle = artRgba(c[2], 0.35 - i * 0.011);
      ctx.fillRect(W / 2 - w / 2 + (rnd() - 0.5) * 3 * u, y, w, Math.max(1, 0.5 * u));
    }
    ctx.strokeStyle = artRgba('#FFFFFF', 0.08); ctx.lineWidth = Math.max(1, 0.25 * u);
    for (i = 0; i < 16; i++) {
      var yy = hy + (i + 1) * (H - hy) / 17;
      ctx.beginPath(); ctx.moveTo(0, yy);
      for (var x = 0; x <= W; x += W / 40) ctx.lineTo(x, yy + Math.sin(x / (8 * u) + i) * u * 0.6);
      ctx.stroke();
    }
  },
  heaven: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    artGlow(ctx, W / 2, H * 0.16, H * 0.75, c[2], 0.7);
    for (var i = 0; i < 15; i++) {
      var x = rnd() * W, y = H * (0.3 + rnd() * 0.7);
      ctx.fillStyle = artRgba(c[3], 0.28 + rnd() * 0.3);
      for (var k = 0; k < 5; k++) {
        ctx.beginPath(); ctx.ellipse(x + k * 6 * u, y + (k % 2) * 2 * u, (7 + rnd() * 6) * u, (3.5 + rnd() * 2.5) * u, 0, 0, Math.PI * 2); ctx.fill();
      }
    }
  },
  ornament: function(ctx, W, H, c, rnd, u) {
    var g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.75);
    g.addColorStop(0, c[0]); g.addColorStop(1, c[1]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    var r = 7 * u, row = 0, x, y;
    ctx.strokeStyle = artRgba(c[2], 0.24); ctx.lineWidth = Math.max(1, 0.3 * u);
    for (y = 0; y < H + r; y += r * 0.866, row++) {
      for (x = (row % 2) * r / 2; x < W + r; x += r) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); }
    }
  },
  parchment: function(ctx, W, H, c, rnd, u) {
    var g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
    g.addColorStop(0, c[0]); g.addColorStop(1, c[1]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    var i;
    for (i = 0; i < 14; i++) artGlow(ctx, rnd() * W, rnd() * H, (8 + rnd() * 20) * u, c[3], 0.07);
    ctx.strokeStyle = artRgba(c[3], 0.05); ctx.lineWidth = Math.max(1, 0.2 * u);
    for (i = 0; i < 90; i++) { var x = rnd() * W, y = rnd() * H; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (rnd() - 0.5) * 8 * u, y + (rnd() - 0.5) * 8 * u); ctx.stroke(); }
    var v = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.78);
    v.addColorStop(0, artRgba(c[2], 0)); v.addColorStop(1, artRgba(c[2], 0.6));
    ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
  },

  // ---------- NATURE ----------
  mountains: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]], 0, H * 0.8);
    artGlow(ctx, W * 0.3, H * 0.38, 28 * u, c[2], 0.9);
    artRidge(ctx, W, H, H * 0.62, 9 * u, 1 / (16 * u), 1 / (7 * u), 1, c[3], true);
    artRidge(ctx, W, H, H * 0.74, 8 * u, 1 / (13 * u), 1 / (6 * u), 4, c[4], true);
    artRidge(ctx, W, H, H * 0.86, 6 * u, 1 / (11 * u), 1 / (5 * u), 7, c[5], true);
  },
  forest: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    function trees(yBase, size, color, count) {
      ctx.fillStyle = color;
      for (var i = 0; i < count; i++) {
        var x = (i + rnd() * 0.8) * W / count, s = size * (0.7 + rnd() * 0.6);
        for (var t = 0; t < 3; t++) {
          var ty = yBase - s * (0.55 * t), tw = s * (0.55 - t * 0.12);
          ctx.beginPath(); ctx.moveTo(x - tw, ty); ctx.lineTo(x, ty - s * 0.75); ctx.lineTo(x + tw, ty); ctx.closePath(); ctx.fill();
        }
        ctx.fillRect(x - s * 0.06, yBase, s * 0.12, s * 0.2);
      }
      ctx.fillRect(0, yBase + size * 0.15, W, H);
    }
    trees(H * 0.72, 12 * u, artMix(c[3], c[1], 0.45), 16);
    artVGrad(ctx, W, H, [artRgba(c[2], 0), artRgba(c[2], 0.55)], H * 0.6, H * 0.8);
    trees(H * 0.84, 16 * u, c[3], 12);
    artVGrad(ctx, W, H, [artRgba(c[2], 0), artRgba(c[2], 0.3)], H * 0.76, H * 0.92);
    trees(H * 0.97, 22 * u, c[4], 9);
  },
  sunset: function(ctx, W, H, c, rnd, u) {
    var hy = H * 0.62;
    artVGrad(ctx, W, H, [c[0], c[1], c[2]], 0, hy);
    artVGrad(ctx, W, H, [c[4], c[5]], hy, H);
    artGlow(ctx, W / 2, hy, 46 * u, c[3], 0.8);
    ctx.fillStyle = c[3]; ctx.beginPath(); ctx.arc(W / 2, hy - 1 * u, 9 * u, Math.PI, Math.PI * 2); ctx.fill();
    for (var i = 0; i < 22; i++) {
      var y = hy + (i + 1) * (H - hy) / 24, w = (10 + rnd() * 18) * u * (1 + i / 14);
      ctx.fillStyle = artRgba(c[3], 0.42 - i * 0.017);
      ctx.fillRect(W / 2 - w / 2, y, w, Math.max(1, 0.6 * u));
    }
  },
  dunes: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]], 0, H * 0.7);
    artGlow(ctx, W * 0.75, H * 0.32, 24 * u, '#FFFFFF', 0.4);
    artRidge(ctx, W, H, H * 0.62, 7 * u, 1 / (22 * u), 1 / (9 * u), 1, c[2]);
    artRidge(ctx, W, H, H * 0.74, 7 * u, 1 / (18 * u), 1 / (8 * u), 3, c[3]);
    artRidge(ctx, W, H, H * 0.88, 6 * u, 1 / (15 * u), 1 / (7 * u), 6, c[4]);
  },
  flowers: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    var i, k;
    for (i = 0; i < 12; i++) artGlow(ctx, rnd() * W, rnd() * H * 0.6, (3 + rnd() * 7) * u, '#FFFFFF', 0.18);
    artRidge(ctx, W, H, H * 0.68, 4 * u, 1 / (20 * u), 1 / (8 * u), 2, c[5]);
    for (i = 0; i < 90; i++) {
      var x = rnd() * W, y = H * (0.7 + rnd() * 0.3), s = (1.2 + rnd() * 1.6) * u * (0.7 + (y / H - 0.7) * 3);
      ctx.fillStyle = c[2 + Math.floor(rnd() * 3)];
      for (k = 0; k < 5; k++) { var a = k * Math.PI * 2 / 5; ctx.beginPath(); ctx.arc(x + Math.cos(a) * s, y + Math.sin(a) * s, s * 0.75, 0, Math.PI * 2); ctx.fill(); }
      ctx.fillStyle = '#FFE066'; ctx.beginPath(); ctx.arc(x, y, s * 0.5, 0, Math.PI * 2); ctx.fill();
    }
  },
  snow: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    for (var i = 0; i < 160; i++) {
      ctx.fillStyle = artRgba(c[2], 0.3 + rnd() * 0.6);
      ctx.beginPath(); ctx.arc(rnd() * W, rnd() * H, (0.2 + rnd() * 0.6) * u, 0, Math.PI * 2); ctx.fill();
    }
    artRidge(ctx, W, H, H * 0.82, 4 * u, 1 / (22 * u), 1 / (9 * u), 2, c[3]);
    artRidge(ctx, W, H, H * 0.92, 3 * u, 1 / (16 * u), 1 / (7 * u), 5, artMix(c[3], '#FFFFFF', 0.5));
  },
  aurora: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    var i, k;
    for (i = 0; i < 90; i++) {
      ctx.fillStyle = artRgba('#FFFFFF', 0.2 + rnd() * 0.6);
      ctx.beginPath(); ctx.arc(rnd() * W, rnd() * H * 0.75, (0.12 + rnd() * 0.3) * u, 0, Math.PI * 2); ctx.fill();
    }
    for (k = 0; k < 3; k++) {
      var base = H * (0.25 + k * 0.12), col = c[2 + k];
      var g = ctx.createLinearGradient(0, base - 14 * u, 0, base + 30 * u);
      g.addColorStop(0, artRgba(col, 0)); g.addColorStop(0.4, artRgba(col, 0.5)); g.addColorStop(1, artRgba(col, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, H);
      for (var x = 0; x <= W; x += W / 60) ctx.lineTo(x, base + Math.sin(x / (14 * u) + k * 2) * 6 * u);
      ctx.lineTo(W, H); ctx.closePath(); ctx.save(); ctx.clip();
      ctx.fillRect(0, base - 14 * u, W, 44 * u); ctx.restore();
    }
  },
  rain: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    ctx.strokeStyle = artRgba(c[2], 0.16); ctx.lineWidth = Math.max(1, 0.25 * u);
    for (var i = 0; i < 190; i++) {
      var x = rnd() * W * 1.1, y = rnd() * H;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 1.6 * u, y + 6 * u); ctx.stroke();
    }
  },

  // ---------- ABSTRACT ----------
  blobs: function(ctx, W, H, c, rnd, u) {
    ctx.fillStyle = c[0]; ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < 9; i++) artGlow(ctx, rnd() * W, rnd() * H, (28 + rnd() * 34) * u, c[1 + (i % 4)], 0.6);
  },
  mesh: function(ctx, W, H, c, rnd, u) {
    ctx.fillStyle = c[0]; ctx.fillRect(0, 0, W, H);
    var m = Math.max(W, H);
    artGlow(ctx, W * 0.1, H * 0.1, m * 0.75, c[1], 0.95);
    artGlow(ctx, W * 0.95, H * 0.25, m * 0.7, c[2], 0.9);
    artGlow(ctx, W * 0.2, H * 0.95, m * 0.75, c[3], 0.9);
    artGlow(ctx, W * 0.85, H * 0.9, m * 0.6, c[1], 0.7);
  },
  triangles: function(ctx, W, H, c, rnd, u) {
    var s = 12 * u, row = 0, x, y;
    for (y = 0; y < H + s; y += s * 0.866, row++) {
      for (x = -s + (row % 2) * s / 2; x < W + s; x += s) {
        var t = Math.min(1, Math.max(0, (x / W + y / H) / 2 + (rnd() - 0.5) * 0.22));
        var t2 = Math.min(1, Math.max(0, t + (rnd() - 0.5) * 0.12));
        ctx.fillStyle = artMix(c[0], c[1], t);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + s, y); ctx.lineTo(x + s / 2, y + s * 0.866); ctx.closePath(); ctx.fill();
        ctx.fillStyle = artMix(c[0], c[1], t2);
        ctx.beginPath(); ctx.moveTo(x + s / 2, y + s * 0.866); ctx.lineTo(x + s * 1.5, y + s * 0.866); ctx.lineTo(x + s, y); ctx.closePath(); ctx.fill();
      }
    }
  },
  hexgrid: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    var r = 7 * u, h = r * 0.866, x, y, row = 0;
    ctx.strokeStyle = artRgba(c[2], 0.22); ctx.lineWidth = Math.max(1, 0.3 * u);
    for (y = 0; y < H + r * 2; y += h, row++) {
      for (x = (row % 2) * r * 1.5; x < W + r * 2; x += r * 3) {
        ctx.beginPath();
        for (var k = 0; k < 6; k++) { var a = k * Math.PI / 3; ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
        ctx.closePath(); ctx.stroke();
      }
    }
  },
  topo: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    ctx.strokeStyle = artRgba(c[2], 0.2); ctx.lineWidth = Math.max(1, 0.3 * u);
    for (var k = 0; k < 26; k++) {
      ctx.beginPath();
      for (var x = 0; x <= W; x += W / 100) {
        var y = H * (k / 25) + Math.sin(x / (13 * u) + k * 0.5) * 3.5 * u + Math.sin(x / (5 * u) + k) * 1.1 * u;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  },
  waveslines: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    ctx.lineWidth = Math.max(1, 0.4 * u);
    for (var k = 0; k < 16; k++) {
      ctx.strokeStyle = artRgba(c[2 + (k % 2)], 0.35);
      ctx.beginPath();
      for (var x = 0; x <= W; x += W / 100) {
        var y = H * (0.15 + k * 0.05) + Math.sin(x / (16 * u) + k * 0.4) * 5 * u * (1 + k / 12);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  },
  grain: function(ctx, W, H, c, rnd, u) {
    artVGrad(ctx, W, H, [c[0], c[1]]);
    var n = Math.min(160000, Math.floor(W * H / 55)), sz = Math.max(1, 0.3 * u);
    for (var i = 0; i < n; i++) {
      ctx.fillStyle = rnd() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
      ctx.fillRect(rnd() * W, rnd() * H, sz, sz);
    }
  },
  circles: function(ctx, W, H, c, rnd, u) {
    ctx.fillStyle = c[0]; ctx.fillRect(0, 0, W, H);
    var cx = W * 0.2, cy = H * 0.15, cx2 = W * 0.85, cy2 = H * 0.9;
    for (var i = 1; i <= 7; i++) {
      ctx.strokeStyle = artRgba(c[1 + (i % 3)], 0.28); ctx.lineWidth = Math.max(1, (0.6 + i * 0.25) * u);
      ctx.beginPath(); ctx.arc(cx, cy, i * 9 * u, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx2, cy2, i * 8 * u, 0, Math.PI * 2); ctx.stroke();
    }
    artGlow(ctx, cx2, cy2, 40 * u, c[3], 0.25);
  },
  glow: function(ctx, W, H, c, rnd, u) {
    ctx.fillStyle = c[0]; ctx.fillRect(0, 0, W, H);
    artGlow(ctx, W / 2, H * 0.46, Math.max(W, H) * 0.7, c[1], 0.6);
    artGlow(ctx, W / 2, H * 0.46, Math.max(W, H) * 0.3, c[1], 0.25);
  }
};

function drawArt(ctx, W, H, b) {
  var fn = ART_GEN[b.gen];
  if (!fn) { ctx.fillStyle = '#CCCCCC'; ctx.fillRect(0, 0, W, H); return; }
  var u = Math.min(W, H) / 100;
  ctx.save();
  fn(ctx, W, H, b.colors, seededRand(b.seed), u);
  ctx.restore();
  if (b.veil) artVeil(ctx, W, H);
}

(function buildArtLibrary() {
  function add(gen, cat, kind, list, veil) {
    list.forEach(function(p, i) {
      BACKGROUNDS.art.push({
        id: 'art-' + gen + '-' + (i + 1), label: p[0], kind: kind, gen: gen, cat: cat,
        colors: p[1], seed: (i + 1) * 101 + gen.length * 17, veil: veil !== false
      });
    });
  }
  // ----- Christian -----
  add('rays', 'christian', 'Heavenly Rays', [
    ['Golden Dawn', ['#7A4A12', '#D9902B', '#FFE3A0', '#FFF6D8']], ['Pure Light', ['#9CC9F5', '#D6EAFB', '#FFFFFF', '#FFFFFF']],
    ['Heaven Blue', ['#0B2A6B', '#2F6FD6', '#9CCBFF', '#E8F4FF']], ['Sunset Glory', ['#4A1F5E', '#D2603C', '#FFC27A', '#FFE9B8']],
    ['Violet Majesty', ['#1E1450', '#5B2A9E', '#B88CF0', '#F1E4FF']], ['Emerald Light', ['#07322B', '#12805E', '#7FE0B4', '#E6FFF3']],
    ['Rose Mercy', ['#5C1A3A', '#C2477A', '#FFC1D6', '#FFF0F5']], ['Midnight Gold', ['#050A1E', '#12224F', '#3D4F8F', '#FFD36B']],
    ['Amber Glory', ['#3B1A06', '#B5651D', '#F7C873', '#FFEFC9']], ['Silver Mist', ['#2B3440', '#7C8A9C', '#DDE5EE', '#FFFFFF']]]);
  add('crosshill', 'christian', 'Cross on the Hill', [
    ['Sunrise Calvary', ['#2B1B5A', '#E0703A', '#FFD68A', '#FFF1C2', '#3A1F3D', '#1E0F26', '#1A0B14']],
    ['Golden Evening', ['#5B2C0E', '#E59A2C', '#FFE29A', '#FFFAE0', '#4A2A12', '#2A1608', '#150A04']],
    ['Blue Dawn', ['#0E2A5C', '#4A86D6', '#CFE6FF', '#FFFFFF', '#27406B', '#12223F', '#0A1428']],
    ['Crimson Sky', ['#3A0A14', '#B5282F', '#F59E6B', '#FFE2B8', '#3D1218', '#210A0E', '#12060A']],
    ['Violet Dusk', ['#1A1040', '#6B3FA0', '#F2A0B8', '#FFE9F0', '#2E1B4D', '#170D2B', '#0C0618']],
    ['Misty Morning', ['#6E7E94', '#B7C4D4', '#F1F4F8', '#FFFFFF', '#5E6E80', '#3F4D5C', '#252E38']],
    ['Green Hills', ['#1D5B8C', '#7FC4E8', '#EAF7E8', '#FFFBE0', '#2E7D4F', '#1A5233', '#0F2E1C']],
    ['Night Vigil', ['#030614', '#0B1A44', '#2A3F82', '#E8EEFF', '#0A1022', '#05080F', '#02040A']],
    ['Peach Glow', ['#7A3E5C', '#F08A6C', '#FFD9B8', '#FFF4E5', '#5E3050', '#3B1D36', '#1F0F1D']],
    ['Silver Hope', ['#232B38', '#6B7A8F', '#C9D3DF', '#FFFFFF', '#2F3745', '#171C26', '#0B0E14']]]);
  add('stainedglass', 'christian', 'Stained Glass', [
    ['Cathedral Jewels', ['#C0392B', '#2E86C1', '#27AE60', '#F1C40F', '#8E44AD', '#E67E22']],
    ['Sapphire', ['#0B3D91', '#1E6FD9', '#4FA3F7', '#7FD1FF', '#0A2A66', '#3B5BDB']],
    ['Ruby and Gold', ['#8B0000', '#C0392B', '#E74C3C', '#F1C40F', '#D4A017', '#5E0F0F']],
    ['Emerald Glass', ['#064E3B', '#059669', '#34D399', '#A7F3D0', '#0F766E', '#14B8A6']],
    ['Amethyst', ['#3B0764', '#6D28D9', '#A855F7', '#D8B4FE', '#4C1D95', '#C026D3']],
    ['Sunrise Glass', ['#B45309', '#F59E0B', '#FCD34D', '#F97316', '#DC2626', '#FBBF24']]]);
  add('rosewindow', 'christian', 'Rose Window', [
    ['Royal Rose', ['#2A1055', '#0D0626', '#F2D388', '#C9A0FF']], ['Gold Rose', ['#4A2B05', '#150A02', '#FFD36B', '#FFB347']],
    ['Blue Rose', ['#0B2A6B', '#040C26', '#BFE0FF', '#6FB1FF']], ['Crimson Rose', ['#5C0A1E', '#1A0309', '#FFC9A8', '#FF8A8A']],
    ['Emerald Rose', ['#064E3B', '#021A14', '#C6F5E0', '#6EE7B7']], ['Silver Rose', ['#2B3440', '#0B0E14', '#E5ECF5', '#9FB3C8']]]);
  add('arch', 'christian', 'Cathedral Arch', [
    ['Golden Sanctuary', ['#1B1204', '#0B0702', '#FFD36B', '#F5D98B']], ['Blue Sanctuary', ['#0A1840', '#040A22', '#7FB6FF', '#BFD9FF']],
    ['Royal Chapel', ['#2A1055', '#10052A', '#C9A0FF', '#E3D0FF']], ['White Chapel', ['#8FA3BF', '#D9E3EE', '#FFFFFF', '#FFFFFF']],
    ['Ember Chapel', ['#3A0F0A', '#150504', '#FF9A5C', '#FFC9A0']], ['Forest Chapel', ['#0A2A20', '#04120D', '#6EE7B7', '#B6F5DC']]]);
  add('crosspattern', 'christian', 'Cross Pattern', [
    ['Royal Crosses', ['#1E1B4B', '#0F0D2E', '#C7B8FF']], ['Gold Crosses', ['#3A2305', '#1A0F02', '#FFD36B']],
    ['Sky Crosses', ['#E6F2FF', '#BFDDF7', '#1E3A8A']], ['Cream Crosses', ['#FFF8EC', '#F1E2C4', '#7C4A24']],
    ['Crimson Crosses', ['#5C0A1E', '#2A040D', '#FFD0C0']], ['Forest Crosses', ['#0F3D2E', '#06201A', '#BFF5DC']],
    ['Slate Crosses', ['#2B3440', '#171C26', '#C9D3DF']], ['Blush Crosses', ['#FFE9F0', '#FBD0E0', '#9D174D']]], false);
  add('starbethlehem', 'christian', 'Star of Bethlehem', [
    ['Bethlehem Night', ['#030614', '#0E1B4A', '#2B3F8A', '#FFE9A8', '#05080F']], ['Christmas Gold', ['#1A0B05', '#4A2A0E', '#B5651D', '#FFE29A', '#0A0502']],
    ['Silent Night', ['#0A1A33', '#1D3C6B', '#4F7AB5', '#FFFFFF', '#06101F']], ['Royal Star', ['#1E1050', '#4A2A9E', '#9D7CE8', '#FFF0C2', '#0C0626']],
    ['Winter Star', ['#14283F', '#3C6A94', '#C7E3F5', '#FFFFFF', '#0B1824']], ['Crimson Star', ['#2A060F', '#7A1A2A', '#D2603C', '#FFE9B8', '#12030A']]]);
  add('candles', 'christian', 'Worship Lights', [
    ['Candlelight', ['#1A0C04', '#0A0502', '#FFB347', '#FFD98A']], ['Warm Worship', ['#2A0F0A', '#0F0504', '#FF8A4C', '#FFC58A']],
    ['Golden Bokeh', ['#2B1A05', '#120A02', '#FFD36B', '#FFF0B8']], ['Rose Worship', ['#2A0A1E', '#10040C', '#FF7FB0', '#FFC6DD']],
    ['Blue Worship', ['#08122B', '#030610', '#7FB6FF', '#C8E0FF']], ['Violet Worship', ['#1A0A33', '#09041A', '#B88CF0', '#E5D2FF']]]);
  add('waters', 'christian', 'Living Waters', [
    ['Galilee Dawn', ['#2B3F7A', '#F2B27A', '#FFF1C2', '#2E5A8C', '#0E2A4F']], ['Calm Waters', ['#6FB1E8', '#E8F4FF', '#FFFFFF', '#3E8CC4', '#14527F']],
    ['Golden Lake', ['#5B2C0E', '#F2B84C', '#FFF3C4', '#7A5A2A', '#2A1A08']], ['Evening Sea', ['#2A1055', '#E0703A', '#FFD68A', '#3A2A6B', '#10082A']],
    ['Emerald Sea', ['#0A3A3A', '#7FE0C4', '#F0FFF9', '#127A74', '#05302F']], ['Moonlit Water', ['#040A22', '#1D3A7A', '#E8EEFF', '#14306B', '#040C26']]]);
  add('heaven', 'christian', 'Heavens', [
    ['Open Heavens', ['#5B9BE8', '#EAF5FF', '#FFFFFF', '#FFFFFF']], ['Golden Heavens', ['#C97A1E', '#FFE9B0', '#FFF8DC', '#FFFFFF']],
    ['Twilight Heavens', ['#2B1B6B', '#F0A0C8', '#FFE9F2', '#FFFFFF']], ['Dawn Heavens', ['#3A5A9E', '#FFD0A0', '#FFF5E0', '#FFFFFF']],
    ['Storm Breaking', ['#2B3440', '#9FB3C8', '#FFFFFF', '#E5ECF5']], ['Rose Heavens', ['#9D4A7A', '#FFD0E0', '#FFF5F9', '#FFFFFF']],
    ['Mint Heavens', ['#4A9E9A', '#E0FFF5', '#FFFFFF', '#FFFFFF']], ['Midnight Heavens', ['#050A22', '#1D3A7A', '#9FC4FF', '#C8DCFF']]]);
  add('ornament', 'christian', 'Lattice', [
    ['Royal Lattice', ['#2A1055', '#0D0626', '#F2D388']], ['Gold Lattice', ['#4A2B05', '#150A02', '#FFD36B']],
    ['Ivory Lattice', ['#FFF8EC', '#F1E2C4', '#B5651D']], ['Sky Lattice', ['#0B2A6B', '#040C26', '#BFE0FF']],
    ['Emerald Lattice', ['#064E3B', '#021A14', '#C6F5E0']], ['Rose Lattice', ['#5C1A3A', '#22071A', '#FFC1D6']],
    ['Pearl Lattice', ['#FFFFFF', '#E6E9F0', '#6B7A99']], ['Charcoal Lattice', ['#2D2D2D', '#0F0F0F', '#D4A017']]], false);
  add('parchment', 'christian', 'Scroll', [
    ['Old Scroll', ['#F5E6C0', '#E3C98A', '#7A4A12', '#8B5A1A']], ['Aged Bible', ['#EBD9A8', '#D4B26B', '#5E3A0E', '#6B4410']],
    ['Light Parchment', ['#FBF1DA', '#F0DDB0', '#B58A3A', '#A87A2A']], ['Rose Parchment', ['#F7E1D8', '#E8BFB0', '#8A4A3A', '#8A3A2A']],
    ['Grey Parchment', ['#E8E4DC', '#CFC8B8', '#6B6558', '#5E574A']], ['Dark Parchment', ['#8A6A3A', '#5E4220', '#2A1A08', '#1A1004']]]);
  // ----- Nature -----
  add('mountains', 'nature', 'Mountains', [
    ['Alpine Morning', ['#5B9BE8', '#FFE9D0', '#FFF7E0', '#8FA6C4', '#5E7799', '#2E4566']], ['Purple Peaks', ['#2B1B6B', '#F0A0C8', '#FFE9F2', '#7A5AA8', '#4A3578', '#251A4A']],
    ['Golden Range', ['#7A3E12', '#FFD68A', '#FFF5D8', '#B5803A', '#7A5222', '#3E2A10']], ['Blue Ridge', ['#0E2A5C', '#9CCBFF', '#FFFFFF', '#4A6FA8', '#2A4578', '#12224A']],
    ['Misty Peaks', ['#8FA3BF', '#E8EEF5', '#FFFFFF', '#B7C4D4', '#8798AD', '#566A82']], ['Sunset Range', ['#3A0A3A', '#F2703A', '#FFD68A', '#7A2A4A', '#4A1A3A', '#1E0A22']],
    ['Emerald Valley', ['#1D5B8C', '#D8F2E4', '#FFFBE0', '#5BA87A', '#2E7D4F', '#165233']], ['Night Mountains', ['#030614', '#1D3A7A', '#E8EEFF', '#1A2A52', '#0E1830', '#060B18']],
    ['Rose Mountains', ['#6A3A7A', '#FFC8D8', '#FFF3F7', '#C28AA8', '#8F5A80', '#4F2F50']], ['Snow Summit', ['#6FA3D8', '#F0F7FF', '#FFFFFF', '#DDE8F5', '#A9BED8', '#6A86AE']]]);
  add('forest', 'nature', 'Forest', [
    ['Pine Morning', ['#7FB6E8', '#EAF6FF', '#FFFFFF', '#3E7A5A', '#1E4A36']], ['Deep Forest', ['#0A2A20', '#2E6E56', '#BFE8D8', '#14503A', '#06241A']],
    ['Golden Woods', ['#7A4A12', '#FFD68A', '#FFF3D0', '#5E7A2E', '#2E4A14']], ['Misty Pines', ['#6E7E94', '#D8E2EC', '#FFFFFF', '#4A6A66', '#26403E']],
    ['Twilight Woods', ['#2B1B6B', '#B88CF0', '#F2E4FF', '#3A2A6B', '#150E36']], ['Autumn Forest', ['#8A3A12', '#FFC27A', '#FFF0D8', '#B5651D', '#5E2E0A']]]);
  add('sunset', 'nature', 'Sea Sunset', [
    ['Tropical Sunset', ['#3A1A6B', '#F2703A', '#FFD68A', '#FFF3C4', '#5E2E6B', '#1E0F3A']], ['Golden Horizon', ['#5B2C0E', '#E59A2C', '#FFE29A', '#FFFFFF', '#8A5A1E', '#2E1A08']],
    ['Pink Horizon', ['#6A3A7A', '#F58AB0', '#FFD9C8', '#FFF5E8', '#7A4A8A', '#2E1A4A']], ['Crimson Horizon', ['#2A060F', '#B5282F', '#FF9A5C', '#FFE0B0', '#5E1A2A', '#1A060E']],
    ['Ocean Calm', ['#1D5B8C', '#7FC4E8', '#F0FAFF', '#FFFFFF', '#2E7DB0', '#0E3A5E']], ['Violet Horizon', ['#1A1040', '#8A5AC0', '#F2B8D8', '#FFF0F8', '#4A2A7A', '#150C2E']],
    ['Amber Evening', ['#3B1A06', '#D2803A', '#FFD28A', '#FFF1C8', '#6A3A1A', '#1E0F06']], ['Teal Dusk', ['#0A2A3A', '#2E8A9E', '#C8F2F0', '#FFFFFF', '#1A5A70', '#06202E']]]);
  add('dunes', 'nature', 'Desert', [
    ['Sahara Gold', ['#5B9BE8', '#FFE9C0', '#F2C27A', '#D9A04A', '#A8742A']], ['Red Desert', ['#6A2A5A', '#FFC8A0', '#E8804A', '#B5502A', '#7A2E14']],
    ['Moonlit Dunes', ['#050A22', '#2A3F82', '#4A5A9A', '#2E3A72', '#161C44']], ['White Sands', ['#8FC4F0', '#FFFFFF', '#F5ECD8', '#E3D2AE', '#C8B286']],
    ['Dusk Dunes', ['#3A1A5A', '#F29A8A', '#C8704A', '#8A4A3A', '#4A2420']]]);
  add('flowers', 'nature', 'Flowers', [
    ['Spring Meadow', ['#7FC4F0', '#F0FAFF', '#FF8AB0', '#FFD93A', '#FFFFFF', '#4E9E5A']], ['Lavender Field', ['#8A6AC8', '#F2E4FF', '#B88CF0', '#8A5AD8', '#E5D2FF', '#5E8A5A']],
    ['Sunflower Field', ['#5B9BE8', '#FFF3C4', '#FFC21A', '#FFA200', '#FFE066', '#4E8A3A']], ['Rose Garden', ['#C8789A', '#FFE9F0', '#E5365A', '#FF7FA0', '#FFC6D6', '#3E7A4A']],
    ['Wild Flowers', ['#7FB6E8', '#FFF8E8', '#FF6A4A', '#B84AE8', '#FFE066', '#5E9E4A']], ['Lily Pond', ['#6FA8C8', '#E8F7F5', '#FFFFFF', '#FFC6D6', '#F5F5C8', '#3E8A6A']]]);
  add('snow', 'nature', 'Winter', [
    ['Winter Night', ['#0A1A33', '#2A4A7A', '#FFFFFF', '#DDE8F5']], ['Winter Dawn', ['#6F8FBF', '#F5D8E0', '#FFFFFF', '#F0F5FF']],
    ['Frozen Blue', ['#1D3C6B', '#9CCBF0', '#FFFFFF', '#E8F4FF']], ['Silent Snow', ['#4A5A6E', '#C8D2DE', '#FFFFFF', '#F5F8FC']]]);
  add('aurora', 'nature', 'Aurora', [
    ['Northern Lights', ['#030614', '#0B1A33', '#2EE59D', '#3A8AF2', '#8A4AE8']], ['Violet Aurora', ['#0A0626', '#1A0B44', '#B84AE8', '#3A8AF2', '#2EE5C8']],
    ['Green Aurora', ['#02100A', '#06261A', '#2EE59D', '#C8F52E', '#2EC8E5']], ['Rose Aurora', ['#1A0618', '#2E0B2E', '#F25A9E', '#B84AE8', '#FFC86A']],
    ['Arctic Aurora', ['#050E1F', '#0E2644', '#6AE5F2', '#2EE59D', '#8AA8F2']]]);
  add('rain', 'nature', 'Rain', [
    ['Gentle Rain', ['#6E7E94', '#B7C4D4', '#FFFFFF']], ['Night Rain', ['#0B1020', '#2A3552', '#BFD4FF']], ['Warm Rain', ['#7A5A5A', '#D8B8A8', '#FFF0E5']]]);
  // ----- Abstract -----
  add('blobs', 'abstract', 'Watercolor', [
    ['Peach Watercolor', ['#FFF1E6', '#FFB8A0', '#FFD28A', '#F59EB8', '#FFE0C0']], ['Ocean Watercolor', ['#EAF6FF', '#7FC4F0', '#9CE0D8', '#B8C8F5', '#D8F0FF']],
    ['Lavender Watercolor', ['#F5EEFF', '#C8A8F0', '#F0A8D8', '#A8B8F5', '#E5D2FF']], ['Mint Watercolor', ['#F0FFF8', '#A8E8C8', '#F5F5A8', '#A8D8F0', '#D8F5E5']],
    ['Rose Watercolor', ['#FFF0F5', '#F5A8C0', '#FFC8A8', '#E0A8F0', '#FFD8E5']], ['Sunrise Watercolor', ['#FFF8E5', '#FFC86A', '#FF9A8A', '#F5A8D0', '#FFE29A']],
    ['Dark Ink', ['#0B1020', '#3A4AA8', '#8A3AA8', '#2A8AA8', '#1A2A5A']], ['Midnight Bloom', ['#10062A', '#6A2AA8', '#A82A8A', '#2A4AA8', '#3A1A6A']],
    ['Forest Ink', ['#06201A', '#1A8A5A', '#2A6AA8', '#8AA82A', '#0E4A3A']], ['Fire Ink', ['#1A0606', '#A82A1A', '#F58A2A', '#A8285A', '#5A1A0E']],
    ['Cream Soft', ['#FFFBF0', '#F5E1B8', '#F5C8A8', '#E8D8F0', '#FFF1D0']], ['Sky Soft', ['#F0F7FF', '#BFDDF7', '#D8D0F5', '#F5D0E0', '#E0F0FF']]]);
  add('mesh', 'abstract', 'Gradient Mesh', [
    ['Aurora Mesh', ['#1A1040', '#3A8AF2', '#2EE5C8', '#B84AE8']], ['Sunset Mesh', ['#5B1A5E', '#F2703A', '#FFD68A', '#F25A9E']],
    ['Ocean Mesh', ['#0B2A6B', '#1E6FD9', '#7FD1FF', '#2EE5C8']], ['Candy Mesh', ['#FFD0E0', '#FF9AC0', '#C8A8F5', '#9CE0F5']],
    ['Forest Mesh', ['#06261A', '#1A8A5A', '#8AE0A8', '#2A6AA8']], ['Gold Mesh', ['#3A2305', '#D9902B', '#FFE29A', '#A8581A']],
    ['Violet Mesh', ['#1E1450', '#6A3AE8', '#C08AF5', '#F25A9E']], ['Peach Mesh', ['#FFF1E6', '#FFB8A0', '#FFD28A', '#F5A8C8']],
    ['Mint Mesh', ['#E0FFF5', '#8AE8C8', '#8AC8F5', '#D8F5A8']], ['Rose Mesh', ['#5C1A3A', '#C2477A', '#F5A8C0', '#8A3AA8']],
    ['Steel Mesh', ['#1A2230', '#4A6A9E', '#9FB3C8', '#2A3A52']], ['Fire Mesh', ['#2A0606', '#D2402A', '#F5A82A', '#8A1A3A']]]);
  add('triangles', 'abstract', 'Low Poly', [
    ['Low-Poly Sky', ['#1E3A8A', '#7FD1FF']], ['Low-Poly Sunset', ['#5B1A5E', '#FFB86A']], ['Low-Poly Forest', ['#0A3A2A', '#8AE0A8']],
    ['Low-Poly Rose', ['#7A1A4A', '#FFC1D6']], ['Low-Poly Gold', ['#4A2B05', '#FFD36B']], ['Low-Poly Violet', ['#2A1055', '#C9A0FF']],
    ['Low-Poly Mono', ['#1A2230', '#9FB3C8']], ['Low-Poly Cream', ['#F1E2C4', '#FFFFFF']]], false);
  add('hexgrid', 'abstract', 'Hex Grid', [
    ['Tech Blue', ['#0A1840', '#040A22', '#7FB6FF']], ['Gold Hex', ['#3A2305', '#120A02', '#FFD36B']], ['Violet Hex', ['#1E1050', '#0A0626', '#C08AF5']],
    ['Green Hex', ['#06261A', '#02100A', '#6EE7B7']], ['Light Hex', ['#F5F8FC', '#DDE8F5', '#6A86AE']], ['Rose Hex', ['#4A0F2E', '#1A0412', '#FFC1D6']]], false);
  add('topo', 'abstract', 'Contours', [
    ['Topo Cream', ['#FFF8EC', '#F1E2C4', '#7C4A24']], ['Topo Night', ['#0A1840', '#040A22', '#7FB6FF']], ['Topo Forest', ['#0F3D2E', '#06201A', '#BFF5DC']],
    ['Topo Sand', ['#F2E4C4', '#E3C98A', '#8A5A1A']], ['Topo Violet', ['#2A1055', '#0D0626', '#C9A0FF']], ['Topo Mist', ['#E8EEF5', '#C8D2DE', '#566A82']]], false);
  add('waveslines', 'abstract', 'Flow Lines', [
    ['Flow Blue', ['#0B2A6B', '#040C26', '#7FD1FF', '#BFE0FF']], ['Flow Sunset', ['#5B1A5E', '#1E0A22', '#FFB86A', '#F25A9E']], ['Flow Mint', ['#064E3B', '#021A14', '#6EE7B7', '#C6F5E0']],
    ['Flow Gold', ['#3A2305', '#120A02', '#FFD36B', '#FFF0B8']], ['Flow Light', ['#F5F8FC', '#DDE8F5', '#7FB6FF', '#B88CF0']], ['Flow Rose', ['#4A0F2E', '#1A0412', '#FF8AB0', '#FFD0E0']]], false);
  add('grain', 'abstract', 'Grain', [
    ['Grain Sand', ['#E8D9B5', '#C8B286']], ['Grain Slate', ['#3A4556', '#1A2230']], ['Grain Rose', ['#F5C8D0', '#D8909E']],
    ['Grain Sky', ['#BFDDF7', '#7FB6E8']], ['Grain Olive', ['#7A8A4A', '#4A5A2A']], ['Grain Night', ['#1A1E3A', '#0A0C1C']]], false);
  add('circles', 'abstract', 'Rings', [
    ['Ring Gold', ['#2A1A05', '#FFD36B', '#F59E0B', '#FFF0B8']], ['Ring Blue', ['#0A1840', '#7FB6FF', '#3A8AF2', '#BFE0FF']], ['Ring Rose', ['#3A0F28', '#FF8AB0', '#F25A9E', '#FFD0E0']],
    ['Ring Mint', ['#06261A', '#6EE7B7', '#2EC8A0', '#C6F5E0']], ['Ring Light', ['#F5F8FC', '#BFDDF7', '#B88CF0', '#FFD0E0']], ['Ring Violet', ['#1A0B44', '#C08AF5', '#8A4AE8', '#E5D2FF']]]);
  add('glow', 'abstract', 'Soft Glow', [
    ['Glow Gold', ['#120A02', '#FFB347']], ['Glow Blue', ['#040C26', '#3A8AF2']], ['Glow Violet', ['#0A0626', '#8A4AE8']], ['Glow Rose', ['#1A0412', '#F25A9E']],
    ['Glow Emerald', ['#02100A', '#2EE59D']], ['Glow Crimson', ['#12030A', '#E5365A']], ['Glow Teal', ['#031A1E', '#2EC8E5']], ['Glow Amber', ['#1A0C04', '#FF9A3A']],
    ['Glow Slate', ['#0B0E14', '#7A8A9E']], ['Glow White', ['#DDE8F5', '#FFFFFF']]], false);
})();

// ---------- Christian / Nature / Modern templates that use the new art ----------
(function addArtTemplates() {
  function T(id, name, cat, bg, font, o) {
    o = o || {};
    TEMPLATES.push({
      id: id, name: name, category: cat, textColor: o.text || '#FFFFFF', refColor: o.ref || '#FDE68A', bgId: bg, font: font,
      fontSize: 'auto', align: 'center', refPosition: 'bottom-center', border: o.border || null, refFont: 'Inter',
      overlay: null, decorative: o.deco || null, autoText: true
    });
  }
  T(51, 'Heavenly Rays Gold', 'christian', 'art-rays-1', 'Playfair Display');
  T(52, 'Open Heavens', 'christian', 'art-heaven-1', 'Lora');
  T(53, 'Calvary Sunrise', 'christian', 'art-crosshill-1', 'Cinzel');
  T(54, 'Calvary Golden Evening', 'christian', 'art-crosshill-2', 'Playfair Display');
  T(55, 'Stained Glass Jewels', 'christian', 'art-stainedglass-1', 'Cinzel', { border: 'gold-thin' });
  T(56, 'Rose Window Royal', 'christian', 'art-rosewindow-1', 'Cormorant Garamond');
  T(57, 'Cathedral Arch Gold', 'christian', 'art-arch-1', 'Cinzel', { border: 'gold-thin' });
  T(58, 'Bethlehem Night', 'christian', 'art-starbethlehem-1', 'Playfair Display', { border: 'gold-thin' });
  T(59, 'Candlelight Worship', 'christian', 'art-candles-1', 'Cormorant Garamond');
  T(60, 'Galilee Dawn', 'christian', 'art-waters-1', 'Lora');
  T(61, 'Old Scroll', 'traditional', 'art-parchment-1', 'Playfair Display');
  T(62, 'Gold Lattice Glory', 'christian', 'art-ornament-2', 'Cinzel', { border: 'gold-thin' });
  T(63, 'Pure Light', 'christian', 'art-rays-2', 'Lato');
  T(64, 'Violet Majesty', 'christian', 'art-rays-5', 'Cormorant Garamond');
  T(65, 'Alpine Morning', 'nature', 'art-mountains-1', 'Montserrat');
  T(66, 'Aurora Lights', 'modern', 'art-aurora-1', 'Poppins');
  T(67, 'Spring Meadow', 'nature', 'art-flowers-1', 'Dancing Script');
  T(68, 'Soft Gold Glow', 'modern', 'art-glow-1', 'Cinzel');
  T(69, 'Tropical Sunset', 'nature', 'art-sunset-1', 'Montserrat');
  T(70, 'Peach Watercolor', 'floral', 'art-blobs-1', 'Dancing Script');
  T(71, 'Blue Sanctuary', 'christian', 'art-arch-2', 'Cinzel', { border: 'white-thin' });
  T(72, 'Silent Night', 'christian', 'art-starbethlehem-3', 'Playfair Display');
})();

// ============================================================
// V3: GALLERY, DOWNLOAD, GOOGLE DRIVE, SAVED GALLERY, SHARE, UPGRADES
// ============================================================

AppState.gallerySelected = {};

function cardFileName(image, i, ext) {
  var ref = image.verse && image.verse.reference ? String(image.verse.reference) : '';
  ref = ref.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, '_').substring(0, 40);
  var n = String(i + 1).padStart(2, '0');
  return n + '_' + (ref || 'Card') + '_' + (image.format || 'card') + '.' + (ext || 'png');
}

function getGalleryImage(id) {
  return AppState.generatedImages.filter(function(i) { return i.id === id; })[0];
}
function selectedGalleryImages() {
  return AppState.generatedImages.filter(function(i) { return AppState.gallerySelected[i.id]; });
}

function updateGalleryToolbar() {
  var n = selectedGalleryImages().length;
  var total = AppState.generatedImages.length;
  var cnt = $id('selected-count');
  if (cnt) cnt.textContent = n + ' selected' + (total ? ' of ' + total : '');
  var dl = $id('btn-download-selected-zip');
  if (dl) { dl.disabled = n === 0; dl.setAttribute('aria-disabled', n === 0 ? 'true' : 'false'); }
  var sel = $id('btn-select-all');
  if (sel) sel.lastChild.textContent = (n > 0 && n === total) ? ' Deselect All' : ' Select All';
  ['btn-share-selected', 'btn-delete-selected'].forEach(function(id) { var b = $id(id); if (b) b.disabled = n === 0; });
  document.querySelectorAll('.gcard').forEach(function(card) {
    var on = !!AppState.gallerySelected[card.getAttribute('data-image-id')];
    card.classList.toggle('selected', on);
    var cb = card.querySelector('input[type=checkbox]');
    if (cb) cb.checked = on;
  });
}

function renderGallery() {
  var grid = $id('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';
  // drop selections for images that no longer exist
  Object.keys(AppState.gallerySelected).forEach(function(id) { if (!getGalleryImage(id)) delete AppState.gallerySelected[id]; });

  if (AppState.generatedImages.length === 0) {
    grid.innerHTML = '<div class="empty-state gallery-empty-state"><h3>No Images Yet</h3><p>Generated cards will appear here. Start by creating or importing verses.</p>' +
      '<button class="btn btn-primary" type="button" onclick="navigateTo(\'create\')">Create Your First Card</button></div>';
    updateGalleryToolbar();
    return;
  }

  AppState.generatedImages.forEach(function(image, idx) {
    var card = document.createElement('div');
    card.className = 'gcard';
    card.setAttribute('data-image-id', image.id);

    var pick = document.createElement('label');
    pick.className = 'gcard-pick';
    pick.title = 'Select';
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.addEventListener('change', function() {
      if (cb.checked) AppState.gallerySelected[image.id] = true; else delete AppState.gallerySelected[image.id];
      updateGalleryToolbar();
    });
    pick.appendChild(cb);

    var imgWrap = document.createElement('button');
    imgWrap.type = 'button';
    imgWrap.className = 'gcard-img';
    imgWrap.title = 'Click to enlarge';
    var img = document.createElement('img');
    img.src = image.url; img.loading = 'lazy';
    img.alt = image.verse ? (image.verse.reference || 'Bible verse') : 'Generated image';
    imgWrap.appendChild(img);
    imgWrap.addEventListener('click', function() { openLightbox(idx); });

    var cap = document.createElement('div');
    cap.className = 'gcard-cap';
    cap.textContent = image.verse ? (image.verse.reference || ('Card ' + (idx + 1))) : ('Card ' + (idx + 1));

    var actions = document.createElement('div');
    actions.className = 'gcard-actions';
    [['⬇ Download', 'btn btn-primary btn-sm', function() { downloadImage(image.id); }],
     ['☁ Drive', 'btn btn-secondary btn-sm', function() { saveImagesToDrive([image]); }],
     ['🗑', 'btn btn-danger btn-sm', function() { deleteFromGallery(image.id); }]].forEach(function(a) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = a[1]; b.textContent = a[0]; b.addEventListener('click', a[2]);
      actions.appendChild(b);
    });

    card.appendChild(pick); card.appendChild(imgWrap); card.appendChild(cap); card.appendChild(actions);
    grid.appendChild(card);
  });
  updateGalleryToolbar();
}

// ---------- downloads ----------
function triggerDownload(url, filename) {
  var a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

function downloadImage(imageId) {
  var image = getGalleryImage(imageId);
  if (!image) return;
  var idx = AppState.generatedImages.indexOf(image);
  var name = cardFileName(image, idx);
  triggerDownload(image.url, name);
  showToast('Downloaded: ' + name, 'success', 2000);
}

function downloadSelectedZip() {
  var images = selectedGalleryImages();
  if (images.length === 0) { showToast('Tick the images you want first (or use Download All).', 'warning'); return; }
  if (images.length === 1) { downloadImage(images[0].id); return; }
  buildZip(images);
}

function downloadAllZip() {
  if (AppState.generatedImages.length === 0) { showToast('No images in the gallery.', 'warning'); return; }
  buildZip(AppState.generatedImages.slice());
}

function buildZip(images) {
  if (!window.JSZip) {
    showToast('ZIP tool could not load. Downloading images one by one instead…', 'warning', 4000);
    images.forEach(function(img, i) { setTimeout(function() { triggerDownload(img.url, cardFileName(img, AppState.generatedImages.indexOf(img))); }, i * 450); });
    return;
  }
  showToast('Creating ZIP with ' + images.length + ' images…', 'info', 3000);
  var zip = new window.JSZip();
  Promise.all(images.map(function(image) {
    return image.blob ? Promise.resolve(image.blob) : fetch(image.url).then(function(r) { return r.blob(); });
  })).then(function(blobs) {
    blobs.forEach(function(blob, i) { zip.file(cardFileName(images[i], i), blob); });
    return zip.generateAsync({ type: 'blob' });
  }).then(function(zipBlob) {
    var url = URL.createObjectURL(zipBlob);
    triggerDownload(url, 'ManushakumaruduBPC_' + new Date().toISOString().slice(0, 10) + '.zip');
    setTimeout(function() { URL.revokeObjectURL(url); }, 4000);
    showToast('ZIP downloaded with ' + images.length + ' images.', 'success');
  }).catch(function(err) {
    showToast('ZIP creation failed: ' + err.message, 'error');
  });
}

function deleteFromGallery(imageId) {
  var idx = AppState.generatedImages.findIndex(function(img) { return img.id === imageId; });
  if (idx < 0) return;
  var image = AppState.generatedImages[idx];
  if (image.url) URL.revokeObjectURL(image.url);
  AppState.generatedImages.splice(idx, 1);
  delete AppState.gallerySelected[imageId];
  idbDelete([imageId]);
  renderGallery();
  showToast('Image deleted.', 'info', 1500);
}

function deleteSelectedImages() {
  var imgs = selectedGalleryImages();
  if (!imgs.length) return;
  if (!confirm('Delete ' + imgs.length + ' selected image(s)?')) return;
  var ids = imgs.map(function(i) { return i.id; });
  imgs.forEach(function(i) { if (i.url) URL.revokeObjectURL(i.url); });
  AppState.generatedImages = AppState.generatedImages.filter(function(i) { return ids.indexOf(i.id) < 0; });
  ids.forEach(function(id) { delete AppState.gallerySelected[id]; });
  idbDelete(ids);
  renderGallery();
  showToast(ids.length + ' image(s) deleted.', 'info', 2000);
}

function toggleSelectAll() {
  var total = AppState.generatedImages.length;
  var all = total > 0 && selectedGalleryImages().length === total;
  AppState.gallerySelected = {};
  if (!all) AppState.generatedImages.forEach(function(i) { AppState.gallerySelected[i.id] = true; });
  updateGalleryToolbar();
}

// ---------- share (phones: WhatsApp, Telegram, Instagram...) ----------
async function shareSelected() {
  var imgs = selectedGalleryImages().slice(0, 10);
  if (!imgs.length) { showToast('Tick the images to share first.', 'warning'); return; }
  try {
    var files = imgs.map(function(img, i) {
      return new File([img.blob], cardFileName(img, AppState.generatedImages.indexOf(img)), { type: 'image/png' });
    });
    if (navigator.canShare && navigator.canShare({ files: files })) {
      await navigator.share({ files: files, title: 'Bible Promise Cards' });
    } else {
      showToast('Sharing is not supported on this browser. Use Download instead.', 'warning', 4000);
    }
  } catch (e) {
    if (e && e.name !== 'AbortError') showToast('Share failed: ' + e.message, 'error');
  }
}

// ---------- lightbox ----------
var _lbIndex = 0;
function ensureLightbox() {
  var lb = $id('lightbox');
  if (lb) return lb;
  lb = document.createElement('div');
  lb.id = 'lightbox'; lb.className = 'lightbox'; lb.hidden = true;
  lb.innerHTML = '<button type="button" class="lb-close" aria-label="Close">✕</button>' +
    '<button type="button" class="lb-nav lb-prev" aria-label="Previous">‹</button>' +
    '<img class="lb-img" alt="" />' +
    '<button type="button" class="lb-nav lb-next" aria-label="Next">›</button>' +
    '<div class="lb-cap"></div>' +
    '<div class="lb-actions"><button type="button" class="btn btn-primary btn-sm lb-dl">⬇ Download</button>' +
    '<button type="button" class="btn btn-secondary btn-sm lb-drive">☁ Save to Drive</button></div>';
  document.body.appendChild(lb);
  lb.addEventListener('click', function(e) { if (e.target === lb) closeLightbox(); });
  lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lb.querySelector('.lb-prev').addEventListener('click', function() { showLightbox(_lbIndex - 1); });
  lb.querySelector('.lb-next').addEventListener('click', function() { showLightbox(_lbIndex + 1); });
  lb.querySelector('.lb-dl').addEventListener('click', function() { var im = AppState.generatedImages[_lbIndex]; if (im) downloadImage(im.id); });
  lb.querySelector('.lb-drive').addEventListener('click', function() { var im = AppState.generatedImages[_lbIndex]; if (im) saveImagesToDrive([im]); });
  document.addEventListener('keydown', function(e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightbox(_lbIndex - 1);
    if (e.key === 'ArrowRight') showLightbox(_lbIndex + 1);
  });
  return lb;
}
function openLightbox(i) { var lb = ensureLightbox(); lb.hidden = false; showLightbox(i); }
function closeLightbox() { var lb = $id('lightbox'); if (lb) lb.hidden = true; }
function showLightbox(i) {
  var n = AppState.generatedImages.length;
  if (!n) { closeLightbox(); return; }
  _lbIndex = (i + n) % n;
  var im = AppState.generatedImages[_lbIndex], lb = ensureLightbox();
  lb.querySelector('.lb-img').src = im.url;
  lb.querySelector('.lb-cap').textContent = (im.verse && im.verse.reference ? im.verse.reference + '  ·  ' : '') + (_lbIndex + 1) + ' / ' + n;
}

// ============================================================
// GOOGLE DRIVE (through your Apps Script)
// ============================================================

function blobToBase64(blob) {
  return new Promise(function(resolve, reject) {
    var r = new FileReader();
    r.onload = function() { resolve(String(r.result).split(',')[1] || ''); };
    r.onerror = function() { reject(new Error('Could not read image')); };
    r.readAsDataURL(blob);
  });
}

var _driveBusy = false;
async function saveImagesToDrive(images) {
  var url = (AppState.settings.appsScriptUrl || '').trim();
  if (!url) {
    showToast('Add your Apps Script URL in General Settings first.', 'error', 5000);
    navigateTo('settings');
    return;
  }
  if (!images || !images.length) { showToast('Nothing to save.', 'warning'); return; }
  if (_driveBusy) { showToast('Already saving to Drive. Please wait…', 'warning'); return; }
  _driveBusy = true;

  var btn = $id('btn-save-to-drive');
  var oldLabel = btn ? btn.lastChild.textContent : '';
  var ok = 0, failed = [], folderUrl = '', firstError = '';
  var folderId = (AppState.settings.driveFolderId || '').trim();
  var day = new Date().toISOString().slice(0, 10);

  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    if (btn) { btn.disabled = true; btn.lastChild.textContent = ' Saving ' + (i + 1) + '/' + images.length + '…'; }
    try {
      var data = await blobToBase64(img.blob || await (await fetch(img.url)).blob());
      var res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'saveImage', folderId: folderId, subfolder: day,
          filename: cardFileName(img, AppState.generatedImages.indexOf(img)), mimeType: 'image/png', data: data,
          meta: { reference: img.verse && img.verse.reference, text: img.verse && img.verse.text, language: img.verse && img.verse.language, format: img.format, templateId: img.templateId, batchId: img.batchId }
        })
      });
      var txt = await res.text();
      var json;
      try { json = JSON.parse(txt); } catch (e) { throw new Error('Unexpected reply from Apps Script. Redeploy it as a new version (see instructions).'); }
      if (!json.ok) throw new Error(json.error || 'Apps Script refused the file');
      ok++;
      if (json.folderUrl) folderUrl = json.folderUrl;
    } catch (err) {
      failed.push(i + 1);
      if (!firstError) firstError = err.message;
    }
  }

  _driveBusy = false;
  if (btn) { btn.disabled = false; btn.lastChild.textContent = oldLabel; }
  if (ok && !failed.length) {
    showToast('Saved ' + ok + ' image(s) to Google Drive' + (folderUrl ? '.' : '.'), 'success', 6000);
    if (folderUrl && confirm('Saved ' + ok + ' image(s) to Drive. Open the Drive folder now?')) window.open(folderUrl, '_blank');
  } else if (ok) {
    showToast('Saved ' + ok + ', but ' + failed.length + ' failed (' + firstError + ').', 'warning', 8000);
  } else {
    showToast('Could not save to Drive: ' + firstError, 'error', 9000);
  }
}

function saveToDriveClicked() {
  var imgs = selectedGalleryImages();
  if (!imgs.length) imgs = AppState.generatedImages.slice();
  if (!imgs.length) { showToast('No images in the gallery yet.', 'warning'); return; }
  if (imgs.length > 1 && selectedGalleryImages().length === 0 && !confirm('Save all ' + imgs.length + ' images to Google Drive?')) return;
  saveImagesToDrive(imgs);
}

// ============================================================
// SAVED GALLERY (IndexedDB) so images survive a page refresh
// ============================================================

var _idb = null;
function idbOpen() {
  if (_idb) return Promise.resolve(_idb);
  return new Promise(function(resolve) {
    try {
      var req = indexedDB.open('bpc_gallery', 1);
      req.onupgradeneeded = function() { req.result.createObjectStore('images', { keyPath: 'id' }); };
      req.onsuccess = function() { _idb = req.result; resolve(_idb); };
      req.onerror = function() { resolve(null); };
    } catch (e) { resolve(null); }
  });
}
function idbTx(mode, fn) {
  return idbOpen().then(function(db) {
    if (!db) return null;
    return new Promise(function(resolve) {
      var tx = db.transaction('images', mode), st = tx.objectStore('images'), out = fn(st);
      tx.oncomplete = function() { resolve(out && out.result !== undefined ? out.result : true); };
      tx.onerror = function() { resolve(null); };
    });
  });
}
function persistImage(img) {
  if (!img || !img.blob) return;
  idbTx('readwrite', function(st) {
    st.put({ id: img.id, blob: img.blob, verse: img.verse, format: img.format, templateId: img.templateId, bgId: img.bgId, batchId: img.batchId, createdAt: img.createdAt });
  });
  // keep the newest 300
  if (AppState.generatedImages.length > 300) {
    var drop = AppState.generatedImages.splice(0, AppState.generatedImages.length - 300);
    drop.forEach(function(d) { if (d.url) URL.revokeObjectURL(d.url); });
    idbDelete(drop.map(function(d) { return d.id; }));
  }
}
function idbDelete(ids) { idbTx('readwrite', function(st) { ids.forEach(function(id) { st.delete(id); }); }); }
function idbClear() { return idbTx('readwrite', function(st) { st.clear(); }); }

async function restoreGallery() {
  var rows = await idbTx('readonly', function(st) { return st.getAll(); });
  if (!rows || !rows.length) return;
  rows.sort(function(a, b) { return String(a.createdAt).localeCompare(String(b.createdAt)); });
  rows.forEach(function(r) {
    if (getGalleryImage(r.id)) return;
    AppState.generatedImages.push({
      id: r.id, blob: r.blob, url: URL.createObjectURL(r.blob), verse: r.verse, format: r.format,
      templateId: r.templateId, bgId: r.bgId, batchId: r.batchId, createdAt: r.createdAt
    });
  });
  updateDashboardStats();
  if (AppState.currentPage === 'gallery') renderGallery();
}

function clearGallery() {
  if (!AppState.generatedImages.length) return;
  if (!confirm('Remove ALL ' + AppState.generatedImages.length + ' images from the gallery? (Files already downloaded or on Drive are not affected.)')) return;
  AppState.generatedImages.forEach(function(i) { if (i.url) URL.revokeObjectURL(i.url); });
  AppState.generatedImages = [];
  AppState.gallerySelected = {};
  idbClear();
  renderGallery();
  updateDashboardStats();
}

// ============================================================
// REMEMBER DESIGN SETTINGS
// ============================================================

var DESIGN_FIELDS = ['font-size', 'ref-font-size', 'font-weight', 'line-spacing', 'letter-spacing', 'text-align', 'ref-position', 'text-color', 'ref-color'];
function saveDesign() {
  try {
    var d = {
      template: AppState.selectedTemplate, bgMode: AppState.bgMode, bgByCategory: AppState.bgByCategory,
      format: getSelectedFormatKey(), touched: AppState.touched, fields: {}, shadow: !!($id('text-shadow') && $id('text-shadow').checked),
      designMode: AppState.designMode, rotateEveryN: AppState.rotateEveryN
    };
    DESIGN_FIELDS.forEach(function(id) { d.fields[id] = val(id); });
    localStorage.setItem('bpc_design', JSON.stringify(d));
  } catch (e) { /* ignore */ }
}
var scheduleSaveDesign = debounce(saveDesign, 400);

function loadDesign() {
  try {
    var d = JSON.parse(localStorage.getItem('bpc_design') || 'null');
    if (!d) return;
    if (d.template && TEMPLATES.some(function(t) { return t.id === d.template; })) {
      AppState.selectedTemplate = d.template;
      document.querySelectorAll('.template-card').forEach(function(card) {
        card.classList.toggle('selected', parseInt(card.getAttribute('data-template-id'), 10) === d.template);
      });
      syncControlsFromTemplate(templateById(d.template));
    }
    if (d.bgByCategory) Object.assign(AppState.bgByCategory, d.bgByCategory);
    if (d.format) setFormatRadio(d.format);
    AppState.touched = d.touched || {};
    Object.keys(d.fields || {}).forEach(function(id) {
      var isColorOrLayout = ['text-color', 'ref-color', 'text-align', 'ref-position'].indexOf(id) >= 0;
      if (!isColorOrLayout || AppState.touched[id]) setInputValue(id, d.fields[id]);
    });
    if (AppState.touched['text-shadow']) { var sh = $id('text-shadow'); if (sh) sh.checked = !!d.shadow; }
    ['text-color', 'ref-color'].forEach(function(id) {
      var el = $id(id), hex = el && el.parentElement ? el.parentElement.querySelector('.color-hex') : null;
      if (hex && el) hex.value = el.value;
    });
    if (d.bgMode) setBgMode(d.bgMode);
  } catch (e) { /* ignore */ }
}

// ============================================================
// SAMPLE FILES for Bulk Import
// ============================================================

var SAMPLE_ROWS = [
  ['యెహోవా నా కాపరి; నాకు లేమి కలుగదు.', 'కీర్తనలు 23:1'],
  ['నన్ను బలపరచు క్రీస్తునందు నేను సమస్తమును చేయగలను.', 'ఫిలిప్పీయులకు 4:13'],
  ['నేను నీకు తోడై యున్నాను; భయపడకుము.', 'యెషయా 41:10'],
  ['The Lord is my light and my salvation; whom shall I fear?', 'Psalm 27:1'],
  ['I can do all things through Christ who strengthens me.', 'Philippians 4:13']
];

function downloadSampleCsv() {
  var lines = ['S.No,Bible Verse,Bible Reference'];
  SAMPLE_ROWS.forEach(function(r, i) { lines.push((i + 1) + ',"' + r[0].replace(/"/g, '""') + '","' + r[1].replace(/"/g, '""') + '"'); });
  var blob = new Blob(['\uFEFF' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
  var url = URL.createObjectURL(blob);
  triggerDownload(url, 'sample-verses.csv');
  setTimeout(function() { URL.revokeObjectURL(url); }, 3000);
}

function downloadSampleXlsx() {
  if (!window.XLSX) { downloadSampleCsv(); showToast('Excel tool not loaded, downloaded CSV instead.', 'info'); return; }
  var rows = [['S.No', 'Bible Verse', 'Bible Reference']].concat(SAMPLE_ROWS.map(function(r, i) { return [i + 1, r[0], r[1]]; }));
  var ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 6 }, { wch: 80 }, { wch: 24 }];
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Verses');
  XLSX.writeFile(wb, 'sample-verses.xlsx');
}

// ============================================================
// WIRE EVERYTHING UP
// ============================================================

function initV3() {
  bindBtn('btn-select-all', toggleSelectAll);
  bindBtn('btn-download-selected-zip', downloadSelectedZip);
  bindBtn('btn-download-all-zip', downloadAllZip);
  bindBtn('btn-save-to-drive', saveToDriveClicked);

  // extra gallery buttons (share / delete selected / clear all)
  var right = document.querySelector('.gallery-toolbar-right');
  if (right && !$id('btn-share-selected')) {
    [['btn-share-selected', '📤 Share', 'btn btn-secondary btn-sm', shareSelected],
     ['btn-delete-selected', '🗑 Delete Selected', 'btn btn-ghost btn-sm', deleteSelectedImages],
     ['btn-clear-gallery', 'Clear All', 'btn btn-ghost btn-sm', clearGallery]].forEach(function(b) {
      var el = document.createElement('button');
      el.id = b[0]; el.type = 'button'; el.className = b[2]; el.textContent = b[1];
      el.addEventListener('click', b[3]);
      right.appendChild(el);
    });
  }
  updateGalleryToolbar();

  var search = $id('bg-search');
  if (search) search.addEventListener('input', debounce(function() { AppState.bgSearch = search.value; renderBgsByCategory(AppState.bgLibTab || 'all'); }, 150));

  // sample file buttons on the Import page
  var firstCard = document.querySelector('#page-import .card');
  if (firstCard && !$id('btn-sample-csv')) {
    var row = document.createElement('div');
    row.className = 'sample-file-row';
    row.innerHTML = '<span class="form-hint">Not sure about the format? Columns: <b>S.No | Bible Verse | Bible Reference</b>.</span> ' +
      '<button type="button" id="btn-sample-xlsx" class="btn btn-secondary btn-sm">⬇ Sample Excel</button> ' +
      '<button type="button" id="btn-sample-csv" class="btn btn-ghost btn-sm">⬇ Sample CSV</button>';
    firstCard.appendChild(row);
    $id('btn-sample-xlsx').addEventListener('click', downloadSampleXlsx);
    $id('btn-sample-csv').addEventListener('click', downloadSampleCsv);
  }

  // remember design choices
  document.addEventListener('input', function(e) { if (e.target.closest && e.target.closest('#design-panel')) scheduleSaveDesign(); });
  document.addEventListener('change', function(e) { if (e.target.closest && e.target.closest('#design-panel')) scheduleSaveDesign(); });
  document.addEventListener('click', function(e) { if (e.target.closest && e.target.closest('.template-card, .bg-item, .font-chip')) setTimeout(scheduleSaveDesign, 100); });

  loadDesign();
  restoreGallery();
}

// ============================================================
// V4: PICK DESIGNS MANUALLY FOR BULK CARDS
// Card 1 gets your 1st pick, card 2 gets your 2nd, and so on.
// If you pick fewer than the number of cards, you are asked
// whether the rest should be random, repeat your picks, or
// whether you want to pick more.
// ============================================================

AppState.manualPicks = [];
AppState.manualFill = 'random';
AppState.manualTab = 'themes';
AppState.manualSearch = '';
AppState.previewIndex = 0;

var MANUAL_TABS = [
  ['themes', 'Themes'], ['solid', 'Colors'], ['gradient', 'Vibrant'], ['pattern', 'Patterns'],
  ['christian', '\u271D Christian'], ['nature', 'Nature'], ['abstract', 'Abstract'], ['custom', 'My Uploads']
];

function allBackgrounds() {
  return BACKGROUNDS.solid.concat(BACKGROUNDS.gradient, BACKGROUNDS.pattern, BACKGROUNDS.art, AppState.customBgs);
}
function findBg(id) { return allBackgrounds().filter(function(b) { return b.id === id; })[0]; }
function pickIndex(kind, id) {
  for (var i = 0; i < AppState.manualPicks.length; i++) {
    var p = AppState.manualPicks[i];
    if (p.kind === kind && p.id === id) return i;
  }
  return -1;
}
function pickLabel(p) {
  if (p.kind === 'theme') return templateById(p.id).name;
  var b = findBg(p.id);
  return b ? (b.label || b.id) : 'Background';
}

function currentCardCount() {
  if (AppState.currentPage === 'import') {
    return (AppState.importPreview || []).filter(function(v) { return v.text && String(v.text).trim(); }).length;
  }
  return AppState.verses.length;
}

function savePicks() {
  try { localStorage.setItem('bpc_picks', JSON.stringify(AppState.manualPicks.filter(function(p) { return p.kind === 'theme' || !(findBg(p.id) || {}).dataUrl; }))); } catch (e) { /* ignore */ }
}
function loadPicks() {
  try {
    var saved = JSON.parse(localStorage.getItem('bpc_picks') || '[]');
    AppState.manualPicks = saved.filter(function(p) {
      return p && (p.kind === 'theme' ? TEMPLATES.some(function(t) { return t.id === p.id; }) : !!findBg(p.id));
    });
  } catch (e) { AppState.manualPicks = []; }
}

// ---------- design resolution for one card ----------
function manualDesign(i) {
  var picks = AppState.manualPicks, base = AppState.selectedTemplate;
  var p = picks[i];
  if (!p && picks.length && AppState.manualFill === 'repeat') p = picks[i % picks.length];
  if (!p) {
    var rb = pickRandom(BACKGROUNDS.solid.concat(BACKGROUNDS.gradient, BACKGROUNDS.pattern, BACKGROUNDS.art));
    return { templateId: base, bgId: rb.id, overrideBg: true, custom: false };
  }
  if (p.kind === 'theme') return { templateId: p.id, bgId: undefined, overrideBg: false, custom: false };
  var bg = findBg(p.id);
  return { templateId: base, bgId: p.id, overrideBg: true, custom: !!(bg && bg.dataUrl) };
}

(function hookDesignForIndex() {
  var original = designForIndex;
  designForIndex = function(i) {
    if (AppState.designMode === 'manual') return manualDesign(i);
    return original(i);
  };
})();

// ---------- thumbnails ----------
function pickThumb(p, size) {
  var cv = document.createElement('canvas');
  cv.width = size; cv.height = size;
  var c = cv.getContext('2d');
  if (p.kind === 'theme') {
    drawTemplatePreview(c, size, size, templateById(p.id));
  } else {
    var bg = findBg(p.id);
    if (bg && bg.dataUrl) {
      var im = new Image();
      im.onload = function() {
        var s = Math.min(im.width, im.height);
        c.drawImage(im, (im.width - s) / 2, (im.height - s) / 2, s, s, 0, 0, size, size);
      };
      im.src = bg.dataUrl;
    } else {
      drawBackgroundSync(c, size, size, p.id);
    }
  }
  return cv;
}

// ---------- the picker UI ----------
function tabItems(tab) {
  var q = (AppState.manualSearch || '').trim().toLowerCase();
  var items;
  if (tab === 'themes') items = TEMPLATES.map(function(t) { return { kind: 'theme', id: t.id, label: t.name, hay: t.name + ' ' + (t.category || '') }; });
  else {
    var list = tab === 'custom' ? AppState.customBgs : bgListForMode(tab);
    items = list.map(function(b) { return { kind: 'bg', id: b.id, label: b.label || b.id, hay: (b.label || '') + ' ' + (b.kind || '') + ' ' + (b.cat || '') }; });
  }
  if (q) items = items.filter(function(it) { return it.hay.toLowerCase().indexOf(q) >= 0; });
  return items;
}

function updateManualStatus() {
  var box = $id('manual-status');
  if (!box) return;
  var cards = currentCardCount(), picked = AppState.manualPicks.length;
  var msg, cls;
  if (cards === 0) {
    msg = 'Designs picked: ' + picked + '. Add verses (or import a file) and the card count will show here.';
    cls = 'info';
  } else if (picked === 0) {
    msg = 'Cards to generate: ' + cards + ' · Designs picked: 0. Tap designs below to choose them.';
    cls = 'warn';
  } else if (picked < cards) {
    msg = 'Cards to generate: ' + cards + ' · Designs picked: ' + picked + '. ' + (cards - picked) + ' card(s) have no design yet. You will be asked how to fill them when you generate.';
    cls = 'warn';
  } else if (picked > cards) {
    msg = 'Cards to generate: ' + cards + ' · Designs picked: ' + picked + '. The extra ' + (picked - cards) + ' pick(s) will not be used.';
    cls = 'info';
  } else {
    msg = 'Cards to generate: ' + cards + ' · Designs picked: ' + picked + '. Every card has its own design.';
    cls = 'ok';
  }
  box.textContent = msg;
  box.className = 'manual-status ' + cls;
}

function renderManualPicker() {
  var cfg = $id('manual-config');
  if (!cfg) return;
  updateManualStatus();

  // picked list
  var picksBox = $id('manual-picks');
  picksBox.innerHTML = '';
  if (!AppState.manualPicks.length) {
    picksBox.innerHTML = '<span class="manual-empty">Nothing picked yet. Tap a theme or background below.</span>';
  }
  AppState.manualPicks.forEach(function(p, i) {
    var chip = document.createElement('div');
    chip.className = 'pick-chip' + (AppState.previewIndex === i ? ' previewing' : '');
    var th = pickThumb(p, 34);
    th.className = 'pick-chip-thumb';
    th.title = 'Show this design in Live Preview';
    th.addEventListener('click', function() { AppState.previewIndex = i; renderManualPicker(); schedulePreview(); });
    var num = document.createElement('span'); num.className = 'pick-chip-num'; num.textContent = i + 1;
    var name = document.createElement('span'); name.className = 'pick-chip-name'; name.textContent = pickLabel(p);
    function mk(txt, title, fn) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'pick-chip-btn'; b.textContent = txt; b.title = title;
      b.addEventListener('click', function(e) { e.stopPropagation(); fn(); }); return b;
    }
    chip.appendChild(num); chip.appendChild(th); chip.appendChild(name);
    chip.appendChild(mk('\u25C0', 'Move earlier', function() { movePick(i, -1); }));
    chip.appendChild(mk('\u25B6', 'Move later', function() { movePick(i, 1); }));
    chip.appendChild(mk('\u2715', 'Remove', function() { AppState.manualPicks.splice(i, 1); afterPicksChanged(); }));
    picksBox.appendChild(chip);
  });

  // tabs
  var tabs = $id('manual-tabs');
  tabs.innerHTML = '';
  MANUAL_TABS.forEach(function(t) {
    if (t[0] === 'custom' && !AppState.customBgs.length) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'tab-btn' + (AppState.manualTab === t[0] ? ' active' : '');
    b.textContent = t[1];
    b.addEventListener('click', function() { AppState.manualTab = t[0]; renderManualPicker(); });
    tabs.appendChild(b);
  });

  // grid
  var grid = $id('manual-grid');
  grid.innerHTML = '';
  var items = tabItems(AppState.manualTab);
  if (!items.length) grid.innerHTML = '<span class="manual-empty">Nothing found.</span>';
  items.forEach(function(it) {
    var idx = pickIndex(it.kind, it.id);
    var tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'pick-tile' + (idx >= 0 ? ' picked' : '');
    tile.setAttribute('aria-pressed', idx >= 0 ? 'true' : 'false');
    tile.title = it.label;
    tile.appendChild(pickThumb(it, 84));
    var lab = document.createElement('span'); lab.className = 'pick-tile-label'; lab.textContent = it.label;
    tile.appendChild(lab);
    if (idx >= 0) { var badge = document.createElement('span'); badge.className = 'pick-badge'; badge.textContent = idx + 1; tile.appendChild(badge); }
    tile.addEventListener('click', function() {
      var at = pickIndex(it.kind, it.id);
      if (at >= 0) AppState.manualPicks.splice(at, 1); else AppState.manualPicks.push({ kind: it.kind, id: it.id });
      afterPicksChanged();
    });
    grid.appendChild(tile);
  });
}

function afterPicksChanged() {
  if (AppState.previewIndex >= AppState.manualPicks.length) AppState.previewIndex = Math.max(0, AppState.manualPicks.length - 1);
  savePicks();
  var scroller = $id('manual-grid'), top = scroller ? scroller.scrollTop : 0;
  renderManualPicker();
  if (scroller) scroller.scrollTop = top;
  schedulePreview();
}

function movePick(i, d) {
  var j = i + d, a = AppState.manualPicks;
  if (j < 0 || j >= a.length) return;
  var t = a[i]; a[i] = a[j]; a[j] = t;
  AppState.previewIndex = j;
  afterPicksChanged();
}

function shuffleArr(a) {
  for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}

function addRandomFromTab() {
  var n = parseInt(val('manual-rand-n'), 10) || 10;
  var items = tabItems(AppState.manualTab).filter(function(it) { return pickIndex(it.kind, it.id) < 0; });
  shuffleArr(items).slice(0, n).forEach(function(it) { AppState.manualPicks.push({ kind: it.kind, id: it.id }); });
  afterPicksChanged();
}

function fillToMatchCards() {
  var need = currentCardCount() - AppState.manualPicks.length;
  if (need <= 0) { showToast(currentCardCount() === 0 ? 'No cards yet. Add or import verses first.' : 'You already have enough designs.', 'info'); return; }
  var pool = shuffleArr(allBackgrounds().filter(function(b) { return pickIndex('bg', b.id) < 0 && !b.dataUrl; }));
  pool.slice(0, need).forEach(function(b) { AppState.manualPicks.push({ kind: 'bg', id: b.id }); });
  afterPicksChanged();
  showToast('Added ' + need + ' random background(s).', 'success', 2200);
}

// ---------- ask how to fill the remaining cards ----------
function showFillDialog(picked, total, onChoose) {
  var old = $id('fill-modal'); if (old) old.remove();
  var rest = total - picked;
  var m = document.createElement('div');
  m.id = 'fill-modal'; m.className = 'fill-modal';
  m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
  m.innerHTML =
    '<div class="fill-box">' +
      '<h3>Not enough designs picked</h3>' +
      '<p>You picked <b>' + picked + '</b> design' + (picked === 1 ? '' : 's') + ' but have <b>' + total + '</b> cards.<br/>' +
      'What should happen with the remaining <b>' + rest + '</b> card' + (rest === 1 ? '' : 's') + '?</p>' +
      '<div class="fill-actions">' +
        '<button type="button" class="btn btn-primary" data-choice="random">\uD83C\uDFB2 Use random backgrounds for the rest</button>' +
        '<button type="button" class="btn btn-secondary" data-choice="repeat">\uD83D\uDD01 Repeat my picks in order</button>' +
        '<button type="button" class="btn btn-ghost" data-choice="more">\u270B Let me pick more</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(m);
  m.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-choice]');
    if (!btn && e.target !== m) return;
    var choice = btn ? btn.getAttribute('data-choice') : 'more';
    m.remove();
    onChoose(choice);
  });
  var first = m.querySelector('button'); if (first) first.focus();
}

function prepareDesigns(count, go) {
  if (AppState.designMode !== 'manual') { go(); return; }
  var picked = AppState.manualPicks.length;
  if (picked === 0) {
    showToast('Pick at least one design in "Pick Designs Manually", or choose another design mode.', 'warning', 5000);
    var cfg = $id('manual-config'); if (cfg) cfg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  if (picked >= count) { go(); return; }
  showFillDialog(picked, count, function(choice) {
    if (choice === 'more') {
      var cfg2 = $id('manual-config');
      if (cfg2) cfg2.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('Pick ' + (count - picked) + ' more design(s), then generate again.', 'info', 4500);
      return;
    }
    AppState.manualFill = choice;
    go();
  });
}

// ---------- start generation with the design check ----------
function startGeneration(list) {
  if (AppState.isGenerating) { showToast('Generation already in progress.', 'warning'); return; }
  var verses = Array.isArray(list) ? list : AppState.verses.slice();
  if (verses.length === 0) { showToast('No verses to generate. Please add verses first.', 'error'); return; }
  prepareDesigns(verses.length, function() { beginGeneration(verses); });
}

function confirmImport() {
  var all = (AppState.importPreview || []).filter(function(v) { return v.text && String(v.text).trim(); });
  if (all.length === 0) { showToast('No verses to import.', 'error'); return; }
  if (AppState.isGenerating) { showToast('Generation already in progress.', 'warning'); return; }
  var max = AppState.settings.maxVerses || 100;
  var toAdd = all.slice(0, max);
  if (all.length > max) showToast('Only the first ' + max + ' of ' + all.length + ' verses are used (limit is set in Settings).', 'warning', 5000);
  prepareDesigns(toAdd.length, function() {
    AppState.verses = AppState.verses.concat(toAdd);
    AppState.importPreview = [];
    renderVerseQueue();
    updateDashboardStats();
    renderExtractedTable([]);
    var btn = $id('btn-confirm-generate');
    if (btn) btn.disabled = true;
    beginGeneration(toAdd);
  });
}

// ---------- keep the counter up to date ----------
['renderVerseQueue', 'renderExtractedTable', 'processImportedVerses'].forEach(function(name) {
  var orig = window[name];
  if (typeof orig !== 'function') return;
  window[name] = function() {
    var r = orig.apply(this, arguments);
    try { updateManualStatus(); } catch (e) { /* ignore */ }
    return r;
  };
});

function initManualPicker() {
  loadPicks();
  var radios = document.querySelectorAll('input[name="design-mode"]');
  radios.forEach(function(r) {
    r.addEventListener('change', function() {
      var cfg = $id('manual-config'), rot = $id('rotation-config');
      if (r.value === 'manual') {
        if (cfg) cfg.classList.remove('hidden');
        if (rot) rot.classList.add('hidden');
        renderManualPicker();
      } else if (cfg) {
        cfg.classList.add('hidden');
      }
      AppState.previewIndex = 0;
      schedulePreview();
    });
  });
  var s = $id('manual-search');
  if (s) s.addEventListener('input', debounce(function() { AppState.manualSearch = s.value; renderManualPicker(); }, 150));
  bindBtn('manual-btn-random', addRandomFromTab);
  bindBtn('manual-btn-fill', fillToMatchCards);
  bindBtn('manual-btn-shuffle', function() { shuffleArr(AppState.manualPicks); afterPicksChanged(); });
  bindBtn('manual-btn-clear', function() { AppState.manualPicks = []; AppState.previewIndex = 0; afterPicksChanged(); });
  renderManualPicker();
}
