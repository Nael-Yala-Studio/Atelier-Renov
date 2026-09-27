document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================= */

    const loader = document.querySelector(".page-loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 800);


    /* =========================
       HEADER
    ========================= */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       BEFORE / AFTER SLIDER
    ========================= */

    const range = document.getElementById("comparisonRange");
    const beforeImage = document.querySelector(".comparison-before");
    const handle = document.getElementById("comparisonHandle");

    function updateComparison(value) {

        beforeImage.style.width = `${value}%`;
        handle.style.left = `${value}%`;

    }

    range.addEventListener("input", event => {
        updateComparison(event.target.value);
    });

    updateComparison(50);


    /* =========================
       PROJECT FILTERS
    ========================= */

    const filters = document.querySelectorAll(".filter");
    const projects = document.querySelectorAll(".project-card");

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });

            filter.classList.add("active");

            const selected = filter.dataset.filter;

            projects.forEach(project => {

                const category = project.dataset.category;

                if (
                    selected === "all" ||
                    category === selected
                ) {
                    project.classList.remove("hidden");
                } else {
                    project.classList.add("hidden");
                }

            });

        });

    });


    /* =========================
       PROJECT MODAL
    ========================= */

    const modal = document.getElementById("projectModal");
    const modalClose = document.getElementById("modalClose");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDescription = document.getElementById("modalDescription");

    const projectData = {

        1: {
            title: "Maison familiale — Marcq-en-Barœul",
            category: "Rénovation complète",
            image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
            description:
                "Transformation complète d'une maison familiale : redistribution des espaces, cuisine ouverte, nouvelles circulations et rénovation des finitions."
        },

        2: {
            title: "Appartement — Lille Centre",
            category: "Rénovation intérieure",
            image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
            description:
                "Rénovation d'un appartement ancien avec mise en valeur des volumes, modernisation des pièces de vie et création d'une ambiance plus lumineuse."
        },

        3: {
            title: "Maison contemporaine — Wasquehal",
            category: "Extension & extérieur",
            image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
            description:
                "Réaménagement d'une maison contemporaine avec amélioration des espaces extérieurs et création d'une continuité entre intérieur et jardin."
        },

        4: {
            title: "Cuisine & séjour — La Madeleine",
            category: "Rénovation intérieure",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
            description:
                "Réorganisation complète de la cuisine et du séjour pour créer un espace plus ouvert, fonctionnel et contemporain."
        }

    };


    document.querySelectorAll(".project-open").forEach(button => {

        button.addEventListener("click", () => {

            const project = projectData[button.dataset.project];

            if (!project) return;

            modalImage.style.backgroundImage =
                `url("${project.image}")`;

            modalTitle.textContent = project.title;
            modalCategory.textContent = project.category;
            modalDescription.textContent = project.description;

            modal.classList.add("open");

            document.body.classList.add("modal-open");

        });

    });


    function closeModal() {

        modal.classList.remove("open");
        document.body.classList.remove("modal-open");

    }

    modalClose.addEventListener("click", closeModal);

    document.querySelector(".modal-backdrop")
        .addEventListener("click", closeModal);


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    /* =========================
       FAQ
    ========================= */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("open");

            faqItems.forEach(other => {

                other.classList.remove("open");

                const otherAnswer =
                    other.querySelector(".faq-answer");

                otherAnswer.style.maxHeight = null;

            });

            if (!isOpen) {

                item.classList.add("open");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });


    /* =========================
       QUOTE FORM
    ========================= */

    const quoteForm = document.getElementById("quoteForm");

    const formSteps =
        document.querySelectorAll(".form-step");

    const nextButtons =
        document.querySelectorAll(".next-button");

    const backButtons =
        document.querySelectorAll(".back-button");

    const progressBar =
        document.getElementById("progressBar");

    let currentStep = 1;


    function showStep(step) {

        formSteps.forEach(formStep => {

            formStep.classList.remove("active");

            if (
                Number(formStep.dataset.step) === step
            ) {
                formStep.classList.add("active");
            }

        });

        progressBar.style.width =
            `${(step / 3) * 100}%`;

        const progressNumber =
            document.querySelector(".progress-number");

        progressNumber.textContent =
            String(step).padStart(2, "0");

    }


    nextButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (currentStep === 1) {

                const selected =
                    document.querySelector(
                        'input[name="projectType"]:checked'
                    );

                if (!selected) {

                    showToast(
                        "Sélectionnez un type de projet."
                    );

                    return;
                }

            }


            if (currentStep < 3) {

                currentStep++;

                showStep(currentStep);

            }

        });

    });


    backButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (currentStep > 1) {

                currentStep--;

                showStep(currentStep);

            }

        });

    });


    quoteForm.addEventListener("submit", event => {

        event.preventDefault();

        showToast(
            "Merci. Votre demande de projet a bien été enregistrée."
        );

        quoteForm.reset();

        currentStep = 1;

        showStep(1);

    });


    /* =========================
       TOAST
    ========================= */

    const toast = document.getElementById("toast");

    let toastTimeout;

    function showToast(message) {

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimeout);

        toastTimeout = setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);

    }


    /* =========================
       SUBTLE HERO PARALLAX
    ========================= */

    const heroObject =
        document.querySelector(".hero-object");

    if (heroObject && window.innerWidth > 900) {

        window.addEventListener("mousemove", event => {

            const x =
                (event.clientX / window.innerWidth - .5) * 8;

            const y =
                (event.clientY / window.innerHeight - .5) * 8;

            heroObject.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }


    /* =========================
       CARD 3D TILT
    ========================= */

    document.querySelectorAll(".project-card").forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 900) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - .5) * 3;

            const rotateX =
                ((y / rect.height) - .5) * -3;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

});