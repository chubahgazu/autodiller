document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data ---
    const cars = [
        {
            id: 1,
            make: "Rolls-Royce",
            model: "Phantom VIII",
            year: 2025,
            price: "$460,000",
            category: "sedan",
            engine: "6.75L V12",
            image: "rolls-royce.jpg",
            description: "The quietest Rolls-Royce ever created. A sanctuary of peace and tranquility."
        },
        {
            id: 2,
            make: "Bentley",
            model: "Continental GT Speed",
            year: 2024,
            price: "$302,000",
            category: "sport",
            engine: "6.0L W12",
            image: "bentley-continental.jpg",
            description: "The most dynamic road car in Bentley's 101-year history. A unique combination of performance and luxury."
        },
        {
            id: 3,
            make: "Lamborghini",
            model: "Urus",
            year: 2024,
            price: "$230,000",
            category: "suv",
            engine: "4.0L V8 Twin-Turbo",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Lamborghini_Urus_IMG_2640.jpg/800px-Lamborghini_Urus_IMG_2640.jpg",
            description: "The world's first Super Sport Utility Vehicle. Pure Lamborghini DNA."
        },
        {
            id: 4,
            make: "Mercedes-Maybach",
            model: "S 650 Pullman",
            year: 2024,
            price: "$229,000",
            category: "sedan",
            engine: "6.0L V12 Biturbo",
            image: "maybach-final.jpg",
            description: "The ultimate expression of individual luxury. Sophistication meets powerful V12 performance."
        },
        {
            id: 5,
            make: "Ferrari",
            model: "Roma",
            year: 2024,
            price: "$225,000",
            category: "sport",
            engine: "3.9L V8 Twin-Turbo",
            image: "ferrari-roma.jpg",
            description: "La Nuova Dolce Vita. A contemporary representation of the carefree lifestyle."
        },
        {
            id: 6,
            make: "Aston Martin",
            model: "DBX707",
            year: 2025,
            price: "$245,000",
            category: "suv",
            engine: "4.0L V8",
            image: "aston-martin-dbx707.jpg",
            description: "The world's most powerful luxury SUV. Unrivaled performance."
        }
    ];

    // --- DOM Elements ---
    const catalogGrid = document.getElementById('catalog-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    // --- Render Catalog ---
    function renderCatalog(filter = 'all') {
        if (!catalogGrid) return; // Guard clause for details page

        catalogGrid.innerHTML = '';

        const filteredCars = filter === 'all'
            ? cars
            : cars.filter(car => car.category === filter);

        filteredCars.forEach(car => {
            const card = document.createElement('div');
            card.className = 'car-card fade-in-scroll';
            card.innerHTML = `
                <div class="car-image-container">
                    <img src="${car.image}" alt="${car.make} ${car.model}">
                    <span class="car-badge">${car.year}</span>
                </div>
                <div class="car-details">
                    <h3 class="car-title">${car.make} ${car.model}</h3>
                    <ul class="car-specs">
                        <li><i class="fas fa-gas-pump"></i> ${car.engine}</li>
                        <li><i class="fas fa-tag"></i> ${car.category}</li>
                    </ul>
                    <div class="car-price">${car.price}</div>
                    <div class="car-actions">
                        <a href="details.html?id=${car.id}" class="btn-details">View Details</a>
                    </div>
                </div>
            `;
            catalogGrid.appendChild(card);
        });

        // Trigger animations for new elements
        observeElements();
    }

    // --- Filtering Logic ---
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                renderCatalog(filterValue);
            });
        });
    }

    // --- Mobile Menu ---
    function toggleMenu() {
        nav.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMenu);
        mobileMenuOverlay.addEventListener('click', toggleMenu);
    }

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) toggleMenu();
        });
    });

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Intersection Observer for Animations ---
    function observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .fade-in-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // --- Parallax Effect ---
    const parallaxBg = document.getElementById('parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
        });
    }

    // --- Form Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your interest! Our concierge team will contact you shortly.');
            contactForm.reset();
        });
    }

    // --- Details Page Logic ---
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    if (carId && window.location.pathname.includes('details.html')) {
        const car = cars.find(c => c.id === parseInt(carId));

        if (car) {
            // Update Title
            document.title = `${car.make} ${car.model} | LuxeAuto`;

            // Populate Hero
            document.getElementById('detail-hero-title').textContent = `${car.make} ${car.model}`;
            document.getElementById('detail-hero-subtitle').textContent = car.description;
            // In a real app, you'd probably have high-res hero images separately
            document.querySelector('.detail-hero-bg').style.backgroundImage = `url('${car.image}')`;

            // Populate Specs
            document.getElementById('spec-engine').textContent = car.engine;
            document.getElementById('spec-year').textContent = car.year;
            document.getElementById('spec-price').textContent = car.price;
            document.getElementById('spec-category').textContent = car.category.toUpperCase();


        } else {
            // Handle car not found
            document.querySelector('.container').innerHTML = '<h2>Car not found</h2><a href="index.html" class="btn btn-primary">Return to Catalog</a>';
        }
    }

    // Initial Render
    renderCatalog();
    observeElements();
});
