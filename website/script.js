// script.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle (Light/Dark Mode)
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');

    // DEFAULT TO LIGHT MODE UNLESS USER EXPLICITLY SAVED DARK MODE PREVIOUSLY
    if (localStorage.theme === 'dark') {
        htmlElement.classList.add('dark');
        updateIcons('dark');
    } else {
        // Force light mode
        htmlElement.classList.remove('dark');
        updateIcons('light');
    }

    function updateIcons(theme) {
        if (theme === 'dark') {
            // If dark theme is active, show the Sun icon to switch to light
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            if(mobileThemeIcon) mobileThemeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            // If light theme is active, show the Moon icon to switch to dark
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            if(mobileThemeIcon) mobileThemeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    function toggleTheme() {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.theme = 'dark';
            updateIcons('dark');
        } else {
            localStorage.theme = 'light';
            updateIcons('light');
        }
    }

    themeToggleBtn.addEventListener('click', toggleTheme);
    if(mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }

    // 2. Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        const icon = btn.querySelector('i');
        if(menu.classList.contains('hidden')){
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            const icon = btn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 3. Portfolio Filtering (with dynamic class updates for light/dark)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset all buttons
            filterBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'shadow-md', 'shadow-primary/20');
                b.classList.add('bg-white/70', 'dark:bg-card/70', 'text-gray-700', 'dark:text-gray-300');
            });
            
            // Highlight clicked button
            btn.classList.remove('bg-white/70', 'dark:bg-card/70', 'text-gray-700', 'dark:text-gray-300');
            btn.classList.add('bg-primary', 'text-white', 'shadow-md', 'shadow-primary/20');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 4. FAQ Accordion
    const faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close others
            document.querySelectorAll('.faq-content').forEach(c => {
                if (c !== content) {
                    c.classList.add('hidden');
                    c.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current
            content.classList.toggle('hidden');
            
            if(content.classList.contains('hidden')) {
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});