/* ============================================================
   UTILITIES
   ============================================================ */

/* Builds a WhatsApp click-to-chat link using the number stored
   in SITE_CONFIG.BUSINESS_WHATSAPP (js/products.js). Never
   hardcode the number anywhere else. */
function buildWhatsAppLink(message) {
    var number = SITE_CONFIG.BUSINESS_WHATSAPP;
    var encoded = encodeURIComponent(message);
    return "https://wa.me/" + number + "?text=" + encoded;
}

function openWhatsAppEnquiry(productName) {
    var message = "Hello, I am interested in the " + productName +
        ". Please share the price, specifications and availability.";
    window.open(buildWhatsAppLink(message), "_blank");
}

function openWhatsAppGeneral() {
    var message = "Hello, I would like to enquire about your commercial kitchen equipment.";
    window.open(buildWhatsAppLink(message), "_blank");
}

/* Replaces a broken <img> with a simple placeholder box so the
   catalogue still looks presentable before real product photos
   are added. Called via the image's onerror attribute. */
function imgFallback(imgEl, label) {
    /* 1st failure: a real photo (.jpg) is missing, so try the bundled .svg illustration with the same name */
    var src = imgEl.getAttribute("src") || "";
    if (!imgEl.dataset.svgTried && /\.(jpe?g|png)$/i.test(src)) {
        imgEl.dataset.svgTried = "1";
        imgEl.src = src.replace(/\.(jpe?g|png)$/i, ".svg");
        return;
    }
    if (imgEl.classList.contains("img-hover")) { imgEl.remove(); return; }
    /* 2nd failure: show a neutral placeholder box */
    var wrap = document.createElement("div");
    wrap.className = "img-ph";
    wrap.setAttribute("role", "img");
    wrap.setAttribute("aria-label", label + " — image coming soon");
    wrap.innerHTML =
        '<svg viewBox="0 0 24 24" class="img-ph-icon" aria-hidden="true">' +
        '<path fill="currentColor" d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2ZM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5Z"/>' +
        "</svg>" +
        '<span>' + label + '</span>';
    imgEl.replaceWith(wrap);
}

/* Simple query-string reader, used on the product details page */
function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
}

/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */
function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".nav-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
        var isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        toggle.classList.toggle("is-active", isOpen);
    });

    /* Close the menu after a link is chosen (mobile) */
    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.classList.remove("is-active");
        });
    });
}

/* ============================================================
   SMOOTH SCROLL for in-page anchors (e.g. "#quote", "#products")
   ============================================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            var id = link.getAttribute("href").slice(1);
            var target = id ? document.getElementById(id) : null;
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

/* ============================================================
   HEADER: "Products" mega-dropdown, built from CATEGORIES
   ============================================================ */
function initNavDropdown() {
    var dropdown = document.getElementById("navCategoryDropdown");
    if (!dropdown) return;

    dropdown.innerHTML =
        '<div class="nav-dropdown-grid">' +
        CATEGORIES.map(function (cat) {
            return '<a href="products.html?category=' + cat.slug + '">' +
                "<strong>" + cat.name + "</strong>" +
                '<span>' + PRODUCTS.filter(function (p) { return p.category === cat.slug; }).length + " products</span>" +
                "</a>";
        }).join("") +
        '<a class="nav-dropdown-all" href="products.html">View All Products →</a>' +
        "</div>";
}

/* ============================================================
   HOME PAGE: category cards
   ============================================================ */
function renderCategoryCards() {
    var grid = document.getElementById("categoryGrid");
    if (!grid) return;

    grid.innerHTML = CATEGORIES.map(function (cat) {
        return (
            '<article class="category-card">' +
            '<div class="category-card-media">' +
            '<img src="images/gallery/' + cat.slug + '.jpg" alt="' + cat.name + '" loading="lazy" ' +
            'onerror="imgFallback(this, \'' + cat.name + '\')">' +
            "</div>" +
            '<div class="category-card-body">' +
            "<h3>" + cat.name + "</h3>" +
            "<p>" + cat.description + "</p>" +
            '<a class="btn btn-outline" href="products.html?category=' + cat.slug + '">View Products</a>' +
            "</div>" +
            "</article>"
        );
    }).join("");
}

/* ============================================================
   PRODUCT CARD MARKUP (shared by products page and home teaser)
   ============================================================ */
function productCardMarkup(product) {
    /* If a second photo/angle exists, show it on hover (like typical ecommerce listings) */
    var hoverImg = (product.images && product.images[0])
        ? '<img class="img-hover" src="' + product.images[0] + '" alt="' + product.name + ' alternate view" loading="lazy" onerror="imgFallback(this, \'' + product.name + '\')">'
        : "";

    return (
        '<article class="product-card" data-category="' + product.category + '" data-name="' + product.name.toLowerCase() + '">' +
        '<div class="product-card-media">' +
        '<img class="img-main" src="' + product.image + '" alt="' + product.name + '" loading="lazy" ' +
        'onerror="imgFallback(this, \'' + product.name + '\')">' +
        hoverImg +
        '<button type="button" class="quick-view-btn" onclick="openQuickView(' + product.id + ')" aria-label="Quick view ' + product.name + '">Quick View</button>' +
        "</div>" +
        '<div class="product-card-body">' +
        '<span class="product-card-category">' + product.categoryName + "</span>" +
        "<h3>" + product.name + "</h3>" +
        "<p>" + product.shortDescription + "</p>" +
        '<div class="product-card-actions">' +
        '<a class="btn btn-outline btn-sm" href="product-details.html?id=' + product.id + '">View Details</a>' +
        '<button type="button" class="btn btn-primary btn-sm" onclick="openWhatsAppEnquiry(\'' + product.name + '\')">Get Quote</button>' +
        "</div>" +
        "</div>" +
        "</article>"
    );
}

/* ============================================================
   PRODUCTS PAGE: filtering + search
   ============================================================ */
function initProductsPage() {
    var grid = document.getElementById("productGrid");
    if (!grid) return;

    /* Build filter buttons from CATEGORIES so new categories appear automatically */
    var bar = document.getElementById("filterBar");
    if (bar) {
        bar.innerHTML = [{ slug: "all", name: "All" }].concat(CATEGORIES).map(function (c) {
            return '<button type="button" class="filter-btn" data-category="' + c.slug + '" aria-pressed="false">' + c.name + "</button>";
        }).join("");
    }
    var filterButtons = document.querySelectorAll(".filter-btn");
    var searchInput = document.getElementById("productSearch");
    var emptyState = document.getElementById("productEmptyState");
    var activeCategory = getQueryParam("category") || "all";

    function draw() {
        var query = (searchInput && searchInput.value.trim().toLowerCase()) || "";

        var visible = PRODUCTS.filter(function (p) {
            var matchesCategory = activeCategory === "all" || p.category === activeCategory;
            var matchesSearch =
                query === "" ||
                p.name.toLowerCase().indexOf(query) !== -1 ||
                p.categoryName.toLowerCase().indexOf(query) !== -1;
            return matchesCategory && matchesSearch;
        });

        grid.innerHTML = visible.map(productCardMarkup).join("");

        if (emptyState) {
            emptyState.hidden = visible.length !== 0;
        }
    }

    /* Set the initial active filter button to match the URL, if any */
    filterButtons.forEach(function (btn) {
        var isActive = btn.dataset.category === activeCategory;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");

        btn.addEventListener("click", function () {
            filterButtons.forEach(function (b) {
                b.classList.remove("is-active");
                b.setAttribute("aria-pressed", "false");
            });
            btn.classList.add("is-active");
            btn.setAttribute("aria-pressed", "true");
            activeCategory = btn.dataset.category;
            draw();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", draw);
    }

    draw();
}

/* ============================================================
   PRODUCT IMAGE GALLERY (shared by the details page and Quick View)
   Renders a large main image plus clickable thumbnails for every
   angle/view available in product.images, "ecommerce style".
   ============================================================ */
function galleryMarkup(product, idPrefix) {
    var allImages = [product.image].concat(product.images || []);
    var mainId = idPrefix + "-main";

    var thumbs = allImages.length > 1
        ? '<div class="thumb-row">' + allImages.map(function (src, i) {
            return '<button type="button" class="' + (i === 0 ? "is-active" : "") + '" ' +
                'onclick="setGalleryImage(\'' + mainId + '\', \'' + src + '\', this)">' +
                '<img src="' + src + '" alt="' + product.name + ' view ' + (i + 1) + '" loading="lazy" ' +
                'onerror="imgFallback(this, \'' + product.name + '\')">' +
                "</button>";
        }).join("") + "</div>"
        : "";

    return (
        '<div class="detail-media">' +
        '<img id="' + mainId + '" src="' + allImages[0] + '" alt="' + product.name + '" ' +
        'onerror="imgFallback(this, \'' + product.name + '\')" onclick="openLightboxImage(this.src, this.alt)">' +
        "</div>" +
        thumbs
    );
}

function setGalleryImage(mainId, src, btn) {
    var main = document.getElementById(mainId);
    if (main) main.src = src;
    var row = btn.parentElement;
    row.querySelectorAll("button").forEach(function (b) { b.classList.remove("is-active"); });
    btn.classList.add("is-active");
}

/* Reuse the gallery lightbox (defined in initGallery) to zoom any product image */
function openLightboxImage(src, label) {
    var lightbox = document.getElementById("lightbox");
    if (!lightbox) { window.open(src, "_blank"); return; }
    document.getElementById("lightboxImg").src = src;
    document.getElementById("lightboxImg").alt = label;
    document.getElementById("lightboxCaption").textContent = label;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
}

/* ============================================================
   QUICK VIEW MODAL (ecommerce-style product preview from a card,
   without leaving the catalogue/listing page)
   ============================================================ */
function openQuickView(id) {
    var product = getProductById(id);
    var modal = document.getElementById("quickView");
    var body = document.getElementById("quickViewBody");
    if (!product || !modal || !body) return;

    var featuresHtml = product.features && product.features.length
        ? "<ul class=\"detail-list\">" + product.features.slice(0, 4).map(function (f) { return "<li>" + f + "</li>"; }).join("") + "</ul>"
        : "<p>Contact us for specifications and quotation.</p>";

    body.innerHTML =
        '<div class="quick-view-gallery">' + galleryMarkup(product, "qv") + "</div>" +
        '<div class="quick-view-info">' +
        '<span class="product-card-category">' + product.categoryName + "</span>" +
        "<h2>" + product.name + "</h2>" +
        "<p>" + product.description + "</p>" +
        "<h3>Features</h3>" + featuresHtml +
        '<div class="detail-actions">' +
        '<a class="btn btn-primary" href="contact.html?product=' + encodeURIComponent(product.name) + '#quote">Request Quote</a>' +
        '<button type="button" class="btn btn-outline" onclick="openWhatsAppEnquiry(\'' + product.name + '\')">WhatsApp Us</button>' +
        '<a class="btn btn-outline" href="product-details.html?id=' + product.id + '">Full Details</a>' +
        "</div>" +
        "</div>";

    modal.hidden = false;
    document.body.style.overflow = "hidden";
}

function closeQuickView() {
    var modal = document.getElementById("quickView");
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
}

function initQuickView() {
    var modal = document.getElementById("quickView");
    if (!modal) return;
    modal.querySelectorAll("[data-qv-close]").forEach(function (el) {
        el.addEventListener("click", closeQuickView);
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeQuickView();
    });
}

/* ============================================================
   PRODUCT DETAILS PAGE
   ============================================================ */
function initProductDetailsPage() {
    var container = document.getElementById("productDetails");
    if (!container) return;

    var id = getQueryParam("id");
    var product = getProductById(id);

    if (!product) {
        container.innerHTML =
            '<div class="not-found">' +
            "<h1>Product not found</h1>" +
            "<p>The product you are looking for is not available. Please browse our full catalogue.</p>" +
            '<a class="btn btn-primary" href="products.html">View Products</a>' +
            "</div>";
        return;
    }

    document.title = product.name + " | " + SITE_CONFIG.businessName;

    var featuresHtml = product.features && product.features.length
        ? "<ul class=\"detail-list\">" + product.features.map(function (f) { return "<li>" + f + "</li>"; }).join("") + "</ul>"
        : "<p>Contact us for specifications and quotation.</p>";

    var specsHtml = product.specifications && product.specifications.trim() !== ""
        ? "<p>" + product.specifications + "</p>"
        : "<p>Contact us for specifications and quotation.</p>";

    var customizationHtml = product.customization && product.customization.trim() !== ""
        ? "<p>" + product.customization + "</p>"
        : "<p>Contact us for specifications and quotation.</p>";

    var applicationsHtml = product.applications && product.applications.length
        ? "<ul class=\"pill-list\">" + product.applications.map(function (a) { return "<li>" + a + "</li>"; }).join("") + "</ul>"
        : "<p>Contact us for specifications and quotation.</p>";

    var brochureBtn = product.brochure
        ? '<a class="btn btn-outline" href="' + product.brochure + '" target="_blank" rel="noopener">Download PDF</a>'
        : "";

    container.innerHTML =
        '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="products.html">Products</a> / <span>' + product.name + "</span></nav>" +
        '<div class="detail-layout">' +
        '<div class="detail-gallery">' + galleryMarkup(product, "pd") + "</div>" +
        '<div class="detail-info">' +
        '<span class="product-card-category">' + product.categoryName + "</span>" +
        "<h1>" + product.name + "</h1>" +
        "<p class=\"detail-desc\">" + product.description + "</p>" +
        '<div class="detail-actions">' +
        '<a class="btn btn-primary" href="contact.html?product=' + encodeURIComponent(product.name) + '#quote">Request Quote</a>' +
        '<button type="button" class="btn btn-outline" onclick="openWhatsAppEnquiry(\'' + product.name + '\')">WhatsApp Us</button>' +
        '<a class="btn btn-outline" href="tel:' + SITE_CONFIG.phone.replace(/\s+/g, "") + '">Call Now</a>' +
        brochureBtn +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="detail-sections">' +
        '<section><h2>Features</h2>' + featuresHtml + "</section>" +
        '<section><h2>Material / Specifications</h2>' + specsHtml + "</section>" +
        '<section><h2>Customization</h2>' + customizationHtml + "</section>" +
        '<section><h2>Suitable Applications</h2>' + applicationsHtml + "</section>" +
        "</div>";

    /* Related products from the same category */
    var related = document.getElementById("relatedProducts");
    if (related) {
        var others = PRODUCTS.filter(function (p) { return p.category === product.category && p.id !== product.id; }).slice(0, 3);
        related.innerHTML = others.map(productCardMarkup).join("");
        var relatedSection = document.getElementById("relatedSection");
        if (relatedSection) relatedSection.hidden = others.length === 0;
    }
}

/* ============================================================
   POPULATE PRODUCT DROPDOWN ON THE QUOTE FORM
   ============================================================ */
function populateProductSelect() {
    var select = document.getElementById("qProduct");
    if (!select) return;

    var options = ["<option value=\"\">Select a product</option>"];
    CATEGORIES.forEach(function (cat) {
        var opts = PRODUCTS.filter(function (p) { return p.category === cat.slug; })
            .map(function (p) { return '<option value="' + p.name + '">' + p.name + "</option>"; })
            .join("");
        options.push('<optgroup label="' + cat.name + '">' + opts + "</optgroup>");
    });
    options.push('<option value="Other / Not sure">Other / Not sure</option>');
    select.innerHTML = options.join("");

    /* Pre-select a product if the page was opened with ?product=... */
    var preselected = getQueryParam("product");
    if (preselected) {
        select.value = preselected;
        if (select.value !== preselected) {
            /* Product name wasn't an exact option match; add it as a custom option */
            var custom = document.createElement("option");
            custom.value = preselected;
            custom.textContent = preselected;
            custom.selected = true;
            select.appendChild(custom);
        }
    }
}

/* ============================================================
   ENQUIRY / QUOTE FORM
   ============================================================ */
function initQuoteForm() {
    var form = document.getElementById("quoteForm");
    if (!form) return;

    var successBox = document.getElementById("formSuccess");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors(form);

        var name = form.querySelector("#qName");
        var mobile = form.querySelector("#qMobile");
        var product = form.querySelector("#qProduct");
        var valid = true;

        if (!name.value.trim()) {
            showError(name, "Please enter your name.");
            valid = false;
        }

        var mobileValue = mobile.value.trim();
        if (!mobileValue) {
            showError(mobile, "Please enter your mobile number.");
            valid = false;
        } else if (!/^[0-9+\s-]{7,15}$/.test(mobileValue)) {
            showError(mobile, "Please enter a valid mobile number.");
            valid = false;
        }

        if (!product.value) {
            showError(product, "Please select a product.");
            valid = false;
        }

        if (!valid) return;

        /* Build the WhatsApp message from the form fields */
        var business = form.querySelector("#qBusiness").value.trim();
        var city = form.querySelector("#qCity").value.trim();
        var quantity = form.querySelector("#qQuantity").value.trim();
        var requirements = form.querySelector("#qRequirements").value.trim();
        var message = form.querySelector("#qMessage").value.trim();

        var lines = [
            "Hello, I would like to request a quote.",
            "Name: " + name.value.trim(),
            "Mobile: " + mobileValue,
            business ? "Business Name: " + business : null,
            city ? "City: " + city : null,
            "Product: " + product.value,
            quantity ? "Quantity: " + quantity : null,
            requirements ? "Requirements/Customization: " + requirements : null,
            message ? "Message: " + message : null
        ].filter(Boolean);

        var whatsappUrl = buildWhatsAppLink(lines.join("\n"));

        /* This is a frontend-only site: there is no backend to receive
           the form, so we show a success message and open a
           pre-filled WhatsApp chat with the enquiry details instead. */
        if (successBox) {
            successBox.hidden = false;
            successBox.innerHTML =
                "<strong>Thank you, " + name.value.trim() + ".</strong> Your enquiry has been prepared. " +
                'Please tap the button below to send it to us on WhatsApp, and our team will get back to you shortly. ' +
                '<a class="btn btn-primary btn-sm" href="' + whatsappUrl + '" target="_blank" rel="noopener">Send via WhatsApp</a>';
            successBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        window.open(whatsappUrl, "_blank");
        form.reset();
    });
}

function showError(field, message) {
    field.setAttribute("aria-invalid", "true");
    var errorEl = document.getElementById(field.id + "-error");
    if (errorEl) errorEl.textContent = message;
}

function clearErrors(form) {
    form.querySelectorAll("[aria-invalid]").forEach(function (f) { f.removeAttribute("aria-invalid"); });
    form.querySelectorAll(".field-error").forEach(function (el) { el.textContent = ""; });
    var successBox = document.getElementById("formSuccess");
    if (successBox) successBox.hidden = true;
}

/* ============================================================
   GALLERY + LIGHTBOX
   ============================================================ */
function initGallery() {
    var grid = document.getElementById("galleryGrid");
    if (!grid) return;

    var filterButtons = document.querySelectorAll(".gallery-filter-btn");
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxCaption = document.getElementById("lightboxCaption");

    function openLightbox(src, label) {
        if (!lightbox) return;
        lightbox.hidden = false;
        lightboxImg.src = src;
        lightboxImg.alt = label;
        lightboxCaption.textContent = label;
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.hidden = true;
        document.body.style.overflow = "";
    }

    grid.addEventListener("click", function (e) {
        var item = e.target.closest(".gallery-item");
        if (!item) return;
        var img = item.querySelector("img");
        openLightbox(img.src, img.alt);
    });

    if (lightbox) {
        lightbox.addEventListener("click", function (e) {
            if (e.target === lightbox || e.target.closest(".lightbox-close")) closeLightbox();
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeLightbox();
        });
    }

    filterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
            btn.classList.add("is-active");
            var cat = btn.dataset.galleryCategory;
            grid.querySelectorAll(".gallery-item").forEach(function (item) {
                var show = cat === "all" || item.dataset.galleryCategory === cat;
                item.style.display = show ? "" : "none";
            });
        });
    });
}

/* ============================================================
   FOOTER YEAR + INIT
   ============================================================ */
function initFooterYear() {
    var el = document.getElementById("footerYear");
    if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   PROJECTS, TESTIMONIALS, CATALOGUES, PROCESS, FAQ (data: js/content.js)
   ============================================================ */
function badge(item) { return item.placeholder ? '<span class="sample-badge">Sample</span>' : ""; }

function projectCard(p) {
    return '<article class="card">' + badge(p) + '<div class="card-media"><img src="' + p.image + '" alt="' + p.title + '" loading="lazy" onerror="imgFallback(this, \'' + p.title + '\')"></div>' +
        '<div class="card-body"><span class="product-card-category">' + p.category + '</span><h3>' + p.title + '</h3>' +
        '<p><strong>' + p.client + '</strong>, ' + p.location + '</p><p>' + p.description + '</p></div></article>';
}

function initContentSections() {
    var g = document.getElementById("projectGrid");
    if (g) g.innerHTML = PROJECTS.map(projectCard).join("");
    var hp = document.getElementById("homeProjects");
    if (hp) hp.innerHTML = PROJECTS.slice(0, 3).map(projectCard).join("");

    ["testimonialGrid", "homeTestimonials"].forEach(function (id) {
        var t = document.getElementById(id);
        if (!t) return;
        t.innerHTML = TESTIMONIALS.map(function (x) {
        return '<blockquote class="card quote-card">' + badge(x) + '<p>&ldquo;' + x.text + '&rdquo;</p><footer><strong>' + x.name + '</strong><br>' + x.business + '</footer></blockquote>';
        }).join("");
    });

    var c = document.getElementById("catalogueGrid");
    if (c) c.innerHTML = CATALOGUES.map(function (x) {
        return '<article class="card"><div class="card-body pdf-card"><div class="pdf-icon">PDF</div><h3>' + x.title + '</h3><p>' + x.description + '</p>' +
            '<div class="product-card-actions"><a class="btn btn-primary btn-sm" href="' + x.file + '" target="_blank" rel="noopener">View</a>' +
            '<a class="btn btn-outline btn-sm" href="' + x.file + '" download>Download</a></div></div></article>';
    }).join("");

    var pr = document.getElementById("processGrid");
    if (pr) pr.innerHTML = PROCESS.map(function (x, i) {
        return '<div class="process-step"><span class="step-no">' + (i + 1) + '</span><h3>' + x.title + '</h3><p>' + x.text + '</p></div>';
    }).join("");

    var f = document.getElementById("faqList");
    if (f) f.innerHTML = FAQS.map(function (x) {
        return '<details class="faq"><summary>' + x.q + '</summary><p>' + x.a + '</p></details>';
    }).join("");
}

/* ============================================================
   HOME HERO: crossfading slideshow + transparent header that turns solid on scroll
   ============================================================ */
function initHero() {
    var slides = document.querySelectorAll(".hero-slide");
    var dotsBox = document.getElementById("heroDots");
    if (slides.length && dotsBox) {
        var current = 0, timer = null;
        var show = function (i) {
            slides[current].classList.remove("is-active");
            dotsBox.children[current].classList.remove("is-active");
            current = (i + slides.length) % slides.length;
            slides[current].classList.add("is-active");
            dotsBox.children[current].classList.add("is-active");
        };
        var start = function () {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            clearInterval(timer);
            timer = setInterval(function () { show(current + 1); }, 5500);
        };
        slides.forEach(function (_, i) {
            var d = document.createElement("button");
            d.type = "button";
            d.setAttribute("aria-label", "Show slide " + (i + 1));
            if (i === 0) d.className = "is-active";
            d.onclick = function () { show(i); start(); };
            dotsBox.appendChild(d);
        });
        start();
    }
    if (document.body.classList.contains("home")) {
        var onScroll = function () { document.body.classList.toggle("scrolled", window.scrollY > 40); };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initHero();
    initContentSections();
    initMobileNav();
    initNavDropdown();
    initSmoothScroll();
    renderCategoryCards();
    initProductsPage();
    initProductDetailsPage();
    populateProductSelect();
    initQuoteForm();
    initGallery();
    initQuickView();
    initFooterYear();
});
