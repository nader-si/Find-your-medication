document.addEventListener('DOMContentLoaded', () => {
  // ---- LocalStorage Helpers ----
  function getData(key, defaultVal = null) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : defaultVal; }
    catch { return defaultVal; }
  }
  function setData(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
  function getUsers() { return getData('users', []); }
  function saveUsers(u) { setData('users', u); }
  function getMedications() { return getData('medications', []); }
  function saveMedications(m) { setData('medications', m); }
  function getFiles() { return getData('medicine_files', []); }
  function saveFiles(f) { setData('medicine_files', f); }
  function getCurrentUser() { return getData('currentUser', null); }
  function saveCurrentUser(u) { setData('currentUser', u); }
  function clearCurrentUser() { localStorage.removeItem('currentUser'); }
  function getNextId(arr) { return arr.reduce((max, item) => Math.max(max, item.id || 0), 0) + 1; }

  // ---- Seed Data ----
  function seedData() {
    if (!getData('seeded')) {
      const users = [{ id: 1, username: 'admin', email: 'admin@example.com', password_hash: btoa('admin123'), created_at: new Date().toISOString() }];
      saveUsers(users);
      const meds = [
        { id: 1, name: 'Paracetamol', generic_name: 'Acetaminophen', category: 'Pain Relief', dosage: '500 mg every 6 hours', description: 'Common pain reliever and fever reducer.', side_effects: 'Nausea, stomach upset, liver damage with overdose.', price: '5.99', stock: 120, location: 'Shelf A-3, Pharmacy #1', admin_name: 'Dr. Ahmed', admin_phone: '+1234567890', created_at: new Date().toISOString() },
        { id: 2, name: 'Amoxicillin', generic_name: 'Amoxicillin', category: 'Antibiotic', dosage: '500 mg every 8 hours', description: 'Broad-spectrum antibiotic for bacterial infections.', side_effects: 'Diarrhea, rash, allergic reactions.', price: '12.50', stock: 85, location: 'Shelf B-2, Pharmacy #1', admin_name: 'Dr. Sara', admin_phone: '+1234567891', created_at: new Date().toISOString() },
        { id: 3, name: 'Loratadine', generic_name: 'Loratadine', category: 'Antihistamine', dosage: '10 mg once daily', description: 'Non-drowsy allergy relief.', side_effects: 'Headache, dry mouth, fatigue.', price: '8.75', stock: 200, location: 'Shelf C-1, Pharmacy #2', admin_name: 'Dr. Khalid', admin_phone: '+1234567892', created_at: new Date().toISOString() }
      ];
      saveMedications(meds);
      const files = [{ id: 1, medicine_id: 1, title: 'Paracetamol Leaflet', file_name: 'paracetamol_leaflet.pdf', file_path: '#', description: 'Official patient information leaflet.', location: 'Shelf A-3', admin_name: 'Dr. Ahmed', admin_phone: '+1234567890', uploaded_at: new Date().toISOString() }];
      saveFiles(files);
      setData('seeded', true);
    }
  }
  seedData();

  // ---- Translations ----
  const translations = {
    en: {
      brand: 'Medicine Finder', home: 'Home', about: 'About', login: 'Login', logout: 'Logout', dashboard: 'Dashboard',
      heroTitle: 'Find trusted medicines quickly', heroSubtitle: 'Search medication details, usage, dosage, and safety information in one place.',
      resultsTitle: 'Available medicines', searchPlaceholder: 'Search for a medicine', searchButton: 'Search', statusSearching: 'Searching...', statusLoading: 'Loading medications...',
      noMedsFound: 'No medicines found.', authLogin: 'Login', authRegister: 'Register', authUsername: 'Username', authEmail: 'Email', authPassword: 'Password',
      authSignIn: 'Sign in', authCreateAccount: 'Create account', required: 'Please fill in the required fields.', processing: 'Processing...',
      loginSuccess: 'Login successful.', registerSuccess: 'Account created successfully.', loginFailed: 'Invalid username or password.',
      userExists: 'Username already exists.', emailExists: 'Email already registered.', dashboardTitle: 'Admin Dashboard', welcome: 'Welcome',
      totalMeds: 'Total medications in the system:', filesSection: 'Files', filesDesc: 'Upload and manage medicine-related files and documents.',
      goToFiles: 'Go to Files', manageMeds: 'Manage Medicines', manageMedsDesc: 'Add medication details and the admin location/contact information.',
      addMed: 'Add Medicine', updateMed: 'Update Medicine', medName: 'Medicine Name', genericName: 'Generic Name', category: 'Category',
      dosage: 'Dosage', price: 'Price', stock: 'Stock', location: 'Location', adminName: 'Admin Name', adminPhone: 'Admin Phone',
      description: 'Description', sideEffects: 'Side Effects', existingMeds: 'Existing Medicines', noMeds: 'No medications yet.',
      edit: 'Edit', delete: 'Delete', view: 'View', uploadFile: 'Upload File', updateFile: 'Update File', fileTitle: 'Title',
      file: 'File', linkedMed: 'Linked Medicine', general: 'General', uploadedFiles: 'Uploaded Files', noFiles: 'No files uploaded yet.',
      medicine: 'Medicine', admin: 'Admin', phone: 'Phone', files: 'Files', clear: 'Clear', confirmDelete: 'Are you sure you want to delete this item?',
      fileRequired: 'Please upload a file.', titleRequired: 'Title is required.', fileTooLarge: 'File size must be less than 5MB.',
      fileTypeNotAllowed: 'Only PDF, Word, and image files are allowed.', uploadFailed: 'Failed to upload file.',
      medAdded: 'Medication added successfully.', medUpdated: 'Medication updated successfully.', medDeleted: 'Medication deleted successfully.',
      fileAdded: 'File uploaded successfully.', fileUpdated: 'File information updated successfully.', fileDeleted: 'File deleted successfully.',
      aboutTitle: 'About this project', aboutParagraph1: 'This demo web app helps users browse medication information and sign in to access the search experience securely.',
      aboutParagraph2: 'It uses a lightweight client-side storage so it can run without any server setup.'
    },
    ar: {
      brand: 'مكتشف الأدوية', home: 'الرئيسية', about: 'عن المشروع', login: 'تسجيل الدخول', logout: 'تسجيل الخروج', dashboard: 'لوحة التحكم',
      heroTitle: 'ابحث عن الأدوية بثقة بسرعة', heroSubtitle: 'ابحث عن تفاصيل الأدوية والاستخدام والجرعة ومعلومات السلامة في مكان واحد.',
      resultsTitle: 'الأدوية المتاحة', searchPlaceholder: 'ابحث عن دواء', searchButton: 'بحث', statusSearching: 'جارٍ البحث...', statusLoading: 'جارٍ تحميل الأدوية...',
      noMedsFound: 'لم يتم العثور على أدوية.', authLogin: 'تسجيل الدخول', authRegister: 'إنشاء حساب', authUsername: 'اسم المستخدم', authEmail: 'البريد الإلكتروني',
      authPassword: 'كلمة المرور', authSignIn: 'تسجيل الدخول', authCreateAccount: 'إنشاء الحساب', required: 'يرجى تعبئة جميع الحقول المطلوبة.',
      processing: 'جارٍ المعالجة...', loginSuccess: 'تم تسجيل الدخول بنجاح.', registerSuccess: 'تم إنشاء الحساب بنجاح.',
      loginFailed: 'اسم المستخدم أو كلمة المرور غير صحيحة.', userExists: 'اسم المستخدم موجود بالفعل.', emailExists: 'البريد الإلكتروني مسجل بالفعل.',
      dashboardTitle: 'لوحة التحكم', welcome: 'مرحبًا', totalMeds: 'إجمالي الأدوية في النظام:', filesSection: 'الملفات',
      filesDesc: 'رفع وإدارة الملفات والمستندات المتعلقة بالأدوية.', goToFiles: 'الذهاب إلى الملفات', manageMeds: 'إدارة الأدوية',
      manageMedsDesc: 'أضف تفاصيل الدواء ومعلومات الموقع وجهة الاتصال.', addMed: 'إضافة دواء', updateMed: 'تحديث الدواء',
      medName: 'اسم الدواء', genericName: 'الاسم العام', category: 'الفئة', dosage: 'الجرعة', price: 'السعر', stock: 'المخزون',
      location: 'الموقع', adminName: 'اسم المسؤول', adminPhone: 'رقم المسؤول', description: 'الوصف', sideEffects: 'الآثار الجانبية',
      existingMeds: 'الأدوية الموجودة', noMeds: 'لا توجد أدوية بعد.', edit: 'تعديل', delete: 'حذف', view: 'عرض', uploadFile: 'رفع ملف',
      updateFile: 'تحديث الملف', fileTitle: 'العنوان', file: 'الملف', linkedMed: 'الدواء المرتبط', general: 'عام',
      uploadedFiles: 'الملفات المرفوعة', noFiles: 'لم يتم رفع أي ملفات بعد.', medicine: 'الدواء', admin: 'المسؤول', phone: 'الهاتف',
      files: 'الملفات', clear: 'مسح', confirmDelete: 'هل أنت متأكد من حذف هذا العنصر؟', fileRequired: 'يرجى رفع ملف.',
      titleRequired: 'العنوان مطلوب.', fileTooLarge: 'يجب أن يكون حجم الملف أقل من 5 ميجابايت.', fileTypeNotAllowed: 'يُسمح فقط بملفات PDF و Word والصور.',
      uploadFailed: 'فشل رفع الملف.', medAdded: 'تم إضافة الدواء بنجاح.', medUpdated: 'تم تحديث الدواء بنجاح.', medDeleted: 'تم حذف الدواء بنجاح.',
      fileAdded: 'تم رفع الملف بنجاح.', fileUpdated: 'تم تحديث معلومات الملف بنجاح.', fileDeleted: 'تم حذف الملف بنجاح.',
      aboutTitle: 'عن هذا المشروع', aboutParagraph1: 'يساعد هذا التطبيق التجريبي المستخدمين على تصفح معلومات الأدوية وتسجيل الدخول للوصول إلى تجربة البحث بأمان.',
      aboutParagraph2: 'يستخدم تخزيناً خفيفاً على جانب العميل بحيث يمكنه العمل بدون إعداد خادم.'
    }
  };

  let lang = localStorage.getItem('lang') || 'en';

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        if (el.tagName === 'INPUT') el.placeholder = t[key];
        else el.textContent = t[key];
      }
    });
    document.querySelectorAll('.brand').forEach(el => el.textContent = t.brand);
    const langToggle = document.getElementById('langToggle');
    if (langToggle) langToggle.textContent = lang === 'ar' ? 'English' : 'العربية';
  }

  document.getElementById('langToggle')?.addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', lang);
    applyLanguage();
    const page = window.location.pathname.split('/').pop() || 'index.html';
    if (page === 'index.html') initIndex();
    else if (page === 'medicines.html') initMedicines();
    else if (page === 'files.html') initFiles();
    else if (page === 'dashboard.html') initDashboard();
  });

  // ---- Theme Toggle ----
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  function escHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function isImage(path) { return /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(path); }

  // ---- Index Logic ----
  function initIndex() {
    const container = document.getElementById('medicationsList');
    const searchInput = document.getElementById('searchInput');
    const inlineSearchInput = document.getElementById('inlineSearchInput');
    const statusMsg = document.getElementById('statusMessage');

    if (!container) return;

    function renderMedications(filter = '') {
      let meds = getMedications();
      if (filter.trim()) {
        const f = filter.trim().toLowerCase();
        meds = meds.filter(m =>
          (m.name || '').toLowerCase().includes(f) ||
          (m.generic_name || '').toLowerCase().includes(f) ||
          (m.category || '').toLowerCase().includes(f) ||
          (m.description || '').toLowerCase().includes(f)
        );
      }
      if (meds.length === 0) {
        container.innerHTML = `<p class="status">${translations[lang].noMedsFound}</p>`;
        return;
      }
      const allFiles = getFiles();
      let html = '';
      meds.forEach(med => {
        const files = allFiles.filter(f => f.medicine_id === med.id);
        html += `
          <article class="result-item">
            <h3>${escHtml(med.name)}</h3>
            <p><strong>${translations[lang].genericName}:</strong> ${escHtml(med.generic_name || '-')}</p>
            <p><strong>${translations[lang].category}:</strong> ${escHtml(med.category || '-')}</p>
            <p><strong>${translations[lang].dosage}:</strong> ${escHtml(med.dosage || '-')}</p>
            <p><strong>${translations[lang].price}:</strong> $${escHtml(med.price || '-')}</p>
            <p><strong>${translations[lang].stock}:</strong> ${escHtml(String(med.stock ?? 0))}</p>
            <p><strong>${translations[lang].location}:</strong> ${escHtml(med.location || '-')}</p>
            <p><strong>${translations[lang].adminName}:</strong> ${escHtml(med.admin_name || '-')}</p>
            <p><strong>${translations[lang].phone}:</strong> ${escHtml(med.admin_phone || '-')}</p>
            <p><strong>${translations[lang].description}:</strong> ${escHtml(med.description || '-')}</p>
            <p><strong>${translations[lang].sideEffects}:</strong> ${escHtml(med.side_effects || '-')}</p>
            ${files.length > 0 ? `
              <div style="margin-top:0.7rem;">
                <strong>${translations[lang].files}:</strong>
                <ul>
                  ${files.map(f => `
                    <li>
                      <a href="${escHtml(f.file_path)}" target="_blank" rel="noopener">${escHtml(f.title || f.file_name)}</a>
                      ${isImage(f.file_path) ? `<br/><img src="${escHtml(f.file_path)}" alt="${escHtml(f.title)}" style="max-width:100%;max-height:180px;margin-top:0.5rem;border-radius:8px;" />` : ''}
                    </li>
                  `).join('')}
                </ul>
              </div>
            ` : ''}
          </article>
        `;
      });
      container.innerHTML = html;
    }

    document.getElementById('searchForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = searchInput ? searchInput.value.trim() : '';
      if (!q) return;
      if (statusMsg) statusMsg.textContent = translations[lang].statusSearching;
      renderMedications(q);
      if (inlineSearchInput) inlineSearchInput.value = q;
      if (statusMsg) statusMsg.textContent = '';
    });

    document.getElementById('inlineSearchForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = inlineSearchInput ? inlineSearchInput.value.trim() : '';
      renderMedications(q);
      if (searchInput) searchInput.value = q;
    });

    document.getElementById('clearSearch')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (inlineSearchInput) inlineSearchInput.value = '';
      if (searchInput) searchInput.value = '';
      renderMedications('');
    });

    renderMedications('');
  }

  // ---- Auth Logic ----
  function initAuth() {
    const authForm = document.getElementById('authForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const emailField = document.getElementById('email');
    const modeField = document.getElementById('mode');
    const authMessage = document.getElementById('authMessage');

    if (!authForm) return;

    loginTab?.addEventListener('click', () => {
      modeField.value = 'login';
      emailField.required = false;
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      authForm.querySelector('button[type="submit"]').textContent = translations[lang].authSignIn;
    });

    registerTab?.addEventListener('click', () => {
      modeField.value = 'register';
      emailField.required = true;
      loginTab.classList.remove('active');
      registerTab.classList.add('active');
      authForm.querySelector('button[type="submit"]').textContent = translations[lang].authCreateAccount;
    });

    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(authForm);
      const mode = formData.get('mode') || 'login';
      const username = String(formData.get('username') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const password = String(formData.get('password') || '').trim();

      if ((mode === 'register' && (!username || !email || !password)) || (mode === 'login' && (!username || !password))) {
        authMessage.textContent = translations[lang].required;
        return;
      }
      authMessage.textContent = translations[lang].processing;

      const users = getUsers();
      if (mode === 'login') {
        const user = users.find(u => u.username === username && u.password_hash === btoa(password));
        if (!user) {
          authMessage.textContent = translations[lang].loginFailed;
          return;
        }
        saveCurrentUser(user);
        authMessage.textContent = translations[lang].loginSuccess;
        setTimeout(() => window.location.href = 'dashboard.html', 300);
      } else {
        if (users.find(u => u.username === username)) {
          authMessage.textContent = translations[lang].userExists;
          return;
        }
        if (users.find(u => u.email === email)) {
          authMessage.textContent = translations[lang].emailExists;
          return;
        }
        const newUser = { id: getNextId(users), username, email, password_hash: btoa(password), created_at: new Date().toISOString() };
        users.push(newUser);
        saveUsers(users);
        saveCurrentUser(newUser);
        authMessage.textContent = translations[lang].registerSuccess;
        setTimeout(() => window.location.href = 'dashboard.html', 300);
      }
    });
  }

  // ---- Dashboard Logic ----
  function initDashboard() {
    if (!getCurrentUser()) { window.location.href = 'auth.html'; return; }
    const totalMeds = getMedications().length;
    const totalMedsEl = document.getElementById('totalMedsCount');
    const welcomeUserEl = document.getElementById('welcomeUser');
    if (totalMedsEl) totalMedsEl.textContent = totalMeds;
    if (welcomeUserEl) welcomeUserEl.textContent = getCurrentUser().username;
  }

  // ---- Medicines Logic ----
  function initMedicines() {
    if (!getCurrentUser()) { window.location.href = 'auth.html'; return; }

    let editId = 0;
    const form = document.getElementById('medForm');
    const listContainer = document.getElementById('medList');
    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');
    const searchInput = document.getElementById('medSearchInput');

    if (!form) return;

    function renderList(filter = '') {
      let meds = getMedications();
      if (filter.trim()) {
        const f = filter.trim().toLowerCase();
        meds = meds.filter(m => (m.name || '').toLowerCase().includes(f));
      }
      if (meds.length === 0) {
        listContainer.innerHTML = `<p class="status">${translations[lang].noMeds}</p>`;
        return;
      }
      let html = '';
      meds.forEach(med => {
        html += `
          <article class="result-item">
            <h4>${escHtml(med.name)}</h4>
            <p><strong>${translations[lang].genericName}:</strong> ${escHtml(med.generic_name || '-')}</p>
            <p><strong>${translations[lang].category}:</strong> ${escHtml(med.category || '-')}</p>
            <p><strong>${translations[lang].dosage}:</strong> ${escHtml(med.dosage || '-')}</p>
            <p><strong>${translations[lang].price}:</strong> ${escHtml(med.price || '-')}</p>
            <p><strong>${translations[lang].stock}:</strong> ${escHtml(String(med.stock ?? 0))}</p>
            <p><strong>${translations[lang].location}:</strong> ${escHtml(med.location || '-')}</p>
            <p><strong>${translations[lang].adminName}:</strong> ${escHtml(med.admin_name || '-')}</p>
            <p><strong>${translations[lang].phone}:</strong> ${escHtml(med.admin_phone || '-')}</p>
            <div class="nav-links" style="margin-top:0.7rem;justify-content:flex-start;">
              <a href="#" onclick="event.preventDefault(); loadMedForEdit(${med.id})">${translations[lang].edit}</a>
              <form style="display:inline;" onsubmit="event.preventDefault(); deleteMed(${med.id})">
                <button type="submit" style="background:transparent;color:var(--primary);text-decoration:underline;">${translations[lang].delete}</button>
              </form>
            </div>
          </article>
        `;
      });
      listContainer.innerHTML = html;
    }

    window.loadMedForEdit = function(id) {
      const med = getMedications().find(m => m.id === id);
      if (!med) return;
      editId = id;
      document.getElementById('medName').value = med.name || '';
      document.getElementById('genericName').value = med.generic_name || '';
      document.getElementById('category').value = med.category || '';
      document.getElementById('dosage').value = med.dosage || '';
      document.getElementById('price').value = med.price || '';
      document.getElementById('stock').value = med.stock || 0;
      document.getElementById('location').value = med.location || '';
      document.getElementById('adminName').value = med.admin_name || '';
      document.getElementById('adminPhone').value = med.admin_phone || '';
      document.getElementById('description').value = med.description || '';
      document.getElementById('sideEffects').value = med.side_effects || '';
      document.getElementById('submitBtn').textContent = translations[lang].updateMed;
      document.getElementById('formTitle').textContent = translations[lang].updateMed;
    };

    window.deleteMed = function(id) {
      if (!confirm(translations[lang].confirmDelete)) return;
      let meds = getMedications().filter(m => m.id !== id);
      saveMedications(meds);
      if (successMsg) successMsg.textContent = translations[lang].medDeleted;
      renderList(searchInput ? searchInput.value : '');
      setTimeout(() => { if (successMsg) successMsg.textContent = ''; }, 2000);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('medName').value.trim();
      if (!name) { if (errorMsg) errorMsg.textContent = translations[lang].required; return; }
      const data = {
        name,
        generic_name: document.getElementById('genericName').value.trim(),
        category: document.getElementById('category').value.trim(),
        dosage: document.getElementById('dosage').value.trim(),
        description: document.getElementById('description').value.trim(),
        side_effects: document.getElementById('sideEffects').value.trim(),
        price: document.getElementById('price').value.trim(),
        stock: parseInt(document.getElementById('stock').value) || 0,
        location: document.getElementById('location').value.trim(),
        admin_name: document.getElementById('adminName').value.trim(),
        admin_phone: document.getElementById('adminPhone').value.trim(),
      };
      let meds = getMedications();
      if (editId > 0) {
        const idx = meds.findIndex(m => m.id === editId);
        if (idx !== -1) {
          meds[idx] = { ...meds[idx], ...data };
          saveMedications(meds);
          if (successMsg) successMsg.textContent = translations[lang].medUpdated;
        }
      } else {
        data.id = getNextId(meds);
        data.created_at = new Date().toISOString();
        meds.push(data);
        saveMedications(meds);
        if (successMsg) successMsg.textContent = translations[lang].medAdded;
      }
      editId = 0;
      form.reset();
      document.getElementById('submitBtn').textContent = translations[lang].addMed;
      document.getElementById('formTitle').textContent = translations[lang].addMed;
      renderList(searchInput ? searchInput.value : '');
      setTimeout(() => { if (successMsg) successMsg.textContent = ''; }, 2000);
    });

    document.getElementById('medSearchForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      renderList(searchInput ? searchInput.value : '');
    });

    document.getElementById('medClearSearch')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchInput) searchInput.value = '';
      renderList('');
    });

    renderList('');
  }

  // ---- Files Logic ----
  function initFiles() {
    if (!getCurrentUser()) { window.location.href = 'auth.html'; return; }

    let editId = 0;
    const form = document.getElementById('fileForm');
    const listContainer = document.getElementById('fileList');
    const successMsg = document.getElementById('fileSuccessMsg');
    const errorMsg = document.getElementById('fileErrorMsg');
    const medSelect = document.getElementById('medicine_id');
    const fileInput = document.getElementById('fileInput');

    if (!form) return;

    const meds = getMedications();
    meds.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = m.name;
      medSelect.appendChild(opt);
    });

    function renderList() {
      const files = getFiles();
      if (files.length === 0) {
        listContainer.innerHTML = `<p class="status">${translations[lang].noFiles}</p>`;
        return;
      }
      let html = '';
      files.forEach(f => {
        html += `
          <article class="result-item">
            <h4>${escHtml(f.title)}</h4>
            <p><strong>${translations[lang].file}:</strong> ${escHtml(f.file_name)}</p>
            <p><strong>${translations[lang].description}:</strong> ${escHtml(f.description || '-')}</p>
            <p><strong>${translations[lang].location}:</strong> ${escHtml(f.location || '-')}</p>
            <p><strong>${translations[lang].adminName}:</strong> ${escHtml(f.admin_name || '-')}</p>
            <p><strong>${translations[lang].phone}:</strong> ${escHtml(f.admin_phone || '-')}</p>
            <p><strong>${translations[lang].linkedMed}:</strong> ${f.medicine_id ? 'Yes' : 'No'}</p>
            <div class="nav-links" style="margin-top:0.7rem;justify-content:flex-start;">
              <a href="#" onclick="event.preventDefault(); loadFileForEdit(${f.id})">${translations[lang].edit}</a>
              <a href="${escHtml(f.file_path)}" target="_blank">${translations[lang].view}</a>
              <form style="display:inline;" onsubmit="event.preventDefault(); deleteFile(${f.id})">
                <button type="submit" style="background:transparent;color:var(--primary);text-decoration:underline;">${translations[lang].delete}</button>
              </form>
            </div>
          </article>
        `;
      });
      listContainer.innerHTML = html;
    }

    window.loadFileForEdit = function(id) {
      const file = getFiles().find(f => f.id === id);
      if (!file) return;
      editId = id;
      document.getElementById('fileTitle').value = file.title || '';
      document.getElementById('fileDesc').value = file.description || '';
      document.getElementById('fileLocation').value = file.location || '';
      document.getElementById('fileAdminName').value = file.admin_name || '';
      document.getElementById('fileAdminPhone').value = file.admin_phone || '';
      medSelect.value = file.medicine_id || 0;
      document.getElementById('fileSubmitBtn').textContent = translations[lang].updateFile;
      document.getElementById('fileFormTitle').textContent = translations[lang].updateFile;
    };

    window.deleteFile = function(id) {
      if (!confirm(translations[lang].confirmDelete)) return;
      let files = getFiles().filter(f => f.id !== id);
      saveFiles(files);
      if (successMsg) successMsg.textContent = translations[lang].fileDeleted;
      renderList();
      setTimeout(() => { if (successMsg) successMsg.textContent = ''; }, 2000);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('fileTitle').value.trim();
      if (!title) { if (errorMsg) errorMsg.textContent = translations[lang].titleRequired; return; }
      const file = fileInput.files[0];
      let fileData = { file_name: '', file_path: '#' };

      function saveFileData(fileDataObj) {
        const data = {
          medicine_id: parseInt(medSelect.value) || 0,
          title,
          description: document.getElementById('fileDesc').value.trim(),
          location: document.getElementById('fileLocation').value.trim(),
          admin_name: document.getElementById('fileAdminName').value.trim(),
          admin_phone: document.getElementById('fileAdminPhone').value.trim(),
        };
        let files = getFiles();
        if (editId > 0) {
          const idx = files.findIndex(f => f.id === editId);
          if (idx !== -1) {
            if (fileDataObj) {
              files[idx].file_name = fileDataObj.file_name;
              files[idx].file_path = fileDataObj.file_path;
            }
            files[idx] = { ...files[idx], ...data };
            saveFiles(files);
            if (successMsg) successMsg.textContent = translations[lang].fileUpdated;
          }
        } else {
          data.id = getNextId(files);
          data.file_name = fileDataObj.file_name;
          data.file_path = fileDataObj.file_path;
          data.uploaded_at = new Date().toISOString();
          files.push(data);
          saveFiles(files);
          if (successMsg) successMsg.textContent = translations[lang].fileAdded;
        }
        editId = 0;
        form.reset();
        medSelect.value = 0;
        document.getElementById('fileSubmitBtn').textContent = translations[lang].uploadFile;
        document.getElementById('fileFormTitle').textContent = translations[lang].uploadFile;
        renderList();
        setTimeout(() => { if (successMsg) successMsg.textContent = ''; }, 2000);
        if (errorMsg) errorMsg.textContent = '';
      }

      if (file) {
        if (file.size > 5 * 1024 * 1024) { if (errorMsg) errorMsg.textContent = translations[lang].fileTooLarge; return; }
        const ext = file.name.split('.').pop().toLowerCase();
        if (!['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'].includes(ext)) {
          if (errorMsg) errorMsg.textContent = translations[lang].fileTypeNotAllowed;
          return;
        }
        fileData.file_name = file.name;
        const reader = new FileReader();
        reader.onload = function(evt) {
          fileData.file_path = evt.target.result;
          saveFileData(fileData);
        };
        reader.readAsDataURL(file);
      } else if (editId > 0) {
        saveFileData(null);
      } else {
        if (errorMsg) errorMsg.textContent = translations[lang].fileRequired;
      }
    });

    renderList();
  }

  // ---- Logout Logic ----
  function initLogout() {
    clearCurrentUser();
    window.location.href = 'index.html';
  }

  // ---- Page Router ----
  const page = window.location.pathname.split('/').pop() || 'index.html';
  applyLanguage();

  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const user = getCurrentUser();
    const oldDash = navLinks.querySelector('a[href="dashboard.html"]');
    if (oldDash && !user) oldDash.remove();
    if (user && !navLinks.querySelector('a[href="dashboard.html"]')) {
      const dash = document.createElement('a');
      dash.href = 'dashboard.html';
      dash.setAttribute('data-i18n', 'dashboard');
      dash.textContent = translations[lang].dashboard;
      const auth = document.getElementById('authLink');
      if (auth) navLinks.insertBefore(dash, auth);
    }
    const authLink = document.getElementById('authLink');
    if (authLink) {
      authLink.textContent = user ? translations[lang].logout : translations[lang].login;
      authLink.href = user ? 'logout.html' : 'auth.html';
    }
  }

  if (page === 'index.html') initIndex();
  else if (page === 'auth.html') initAuth();
  else if (page === 'dashboard.html') initDashboard();
  else if (page === 'medicines.html') initMedicines();
  else if (page === 'files.html') initFiles();
  else if (page === 'logout.html') initLogout();
});
