document.addEventListener('DOMContentLoaded', () => {
    // ---------- عناصر التحكم الرئيسية ----------
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // ---------- تعدد اللغات (i18n) ----------
    const translations = {
        ar: {
            site_name: "ابحث عن دوائك",
            home: "الرئيسية",
            about: "معلومات عنا",
            login: "تسجيل الدخول",
            hero_title: "اعثر على دوائك بكل سهولة وأمان",
            hero_subtitle: "ابحث عن الأدوية المتاحة، قارن الأسعار، واطلب من أقرب صيدلية.",
            search_placeholder: "ابحث عن اسم الدواء...",
            search: "بحث",
            popular_medicines: "الأدوية الشائعة",
            med1: "باراسيتامول",
            med1_desc: "مسكن ألم وخافض حرارة.",
            med2: "أموكسيسيللين",
            med2_desc: "مضاد حيوي واسع المجال.",
            med3: "إنسولين",
            med3_desc: "لعلاج مرض السكري.",
            med4: "سيتريزين",
            med4_desc: "مضاد للحساسية.",
            price: "السعر",
            footer_text: "© 2024 ابحث عن دوائك. جميع الحقوق محفوظة.",
            login_tab: "تسجيل الدخول",
            signup_tab: "إنشاء حساب",
            welcome_back: "مرحباً بعودتك",
            create_account: "إنشاء حساب جديد",
            patient: "مريض",
            pharmacy: "صيدلية",
            email_placeholder: "البريد الإلكتروني",
            password_placeholder: "كلمة المرور",
            fullname_placeholder: "الاسم الكامل",
            confirm_password_placeholder: "تأكيد كلمة المرور",
            login_btn: "دخول",
            signup_btn: "إنشاء",
            about_heading: "عن منصة ابحث عن دوائك",
            about_mission: "نهدف إلى تسهيل وصول المرضى إلى الأدوية المطلوبة من خلال ربطهم مباشرة بأقرب الصيدليات المتوفرة، مما يضمن تجربة آمنة وسريعة وشفافة.",
            how_works: "كيف تعمل المنصة؟",
            step1_title: "ابحث عن دوائك",
            step1_desc: "استخدم شريط البحث للعثور على الدواء الذي تحتاجه.",
            step2_title: "اختر الصيدلية",
            step2_desc: "قارن الأسعار والتقييمات واختر الأنسب لك.",
            step3_title: "استلم طلبك",
            step3_desc: "تواصل مع الصيدلية مباشرة أو اطلب التوصيل."
        },
        en: {
            site_name: "Find Your Medicine",
            home: "Home",
            about: "About Us",
            login: "Login",
            hero_title: "Find Your Medicine Easily & Safely",
            hero_subtitle: "Search available medicines, compare prices, and order from the nearest pharmacy.",
            search_placeholder: "Search for medicine name...",
            search: "Search",
            popular_medicines: "Popular Medicines",
            med1: "Paracetamol",
            med1_desc: "Pain reliever and fever reducer.",
            med2: "Amoxicillin",
            med2_desc: "Broad-spectrum antibiotic.",
            med3: "Insulin",
            med3_desc: "For diabetes treatment.",
            med4: "Cetirizine",
            med4_desc: "Antihistamine for allergies.",
            price: "Price",
            footer_text: "© 2024 Find Your Medicine. All rights reserved.",
            login_tab: "Login",
            signup_tab: "Sign Up",
            welcome_back: "Welcome Back",
            create_account: "Create New Account",
            patient: "Patient",
            pharmacy: "Pharmacy",
            email_placeholder: "Email Address",
            password_placeholder: "Password",
            fullname_placeholder: "Full Name",
            confirm_password_placeholder: "Confirm Password",
            login_btn: "Login",
            signup_btn: "Sign Up",
            about_heading: "About Find Your Medicine",
            about_mission: "We aim to facilitate patients' access to required medications by connecting them directly with the nearest available pharmacies, ensuring a safe, fast, and transparent experience.",
            how_works: "How It Works",
            step1_title: "Search Your Medicine",
            step1_desc: "Use the search bar to find the medicine you need.",
            step2_title: "Choose Pharmacy",
            step2_desc: "Compare prices and ratings and choose the best for you.",
            step3_title: "Receive Your Order",
            step3_desc: "Contact the pharmacy directly or request delivery."
        }
    };

    let currentLang = localStorage.getItem('lang') || 'ar';

    function applyLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('lang', lang);

        // تحديث النص في زر اللغة
        const langText = document.querySelector('.lang-text');
        if (langText) langText.textContent = lang === 'ar' ? 'EN' : 'AR';

        // تحديث جميع العناصر القابلة للترجمة
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // تحديث النصوص المؤقتة (placeholders)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(input => {
            const key = input.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                input.placeholder = translations[lang][key];
            }
        });
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            applyLanguage(newLang);
        });
    }

    // ---------- الوضع المظلم ----------
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }

    // ---------- القائمة المتنقلة ----------
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // ---------- تبديل نماذج التسجيل ----------
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginTab && signupTab && loginForm && signupForm) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        });

        signupTab.addEventListener('click', () => {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        });

        // منع إرسال النماذج للتوضيح
        document.querySelectorAll('.auth-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert(currentLang === 'ar' ? 'تم إرسال النموذج (محاكاة)' : 'Form submitted (simulation)');
            });
        });
    }

    // ---------- بحث الأدوية ----------
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('medicine-search');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                alert(currentLang === 'ar' ? `جاري البحث عن: ${query}` : `Searching for: ${query}`);
            } else {
                alert(currentLang === 'ar' ? 'الرجاء إدخال اسم الدواء' : 'Please enter a medicine name');
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // تطبيق اللغة المحفوظة عند التحميل
    applyLanguage(currentLang);
});
