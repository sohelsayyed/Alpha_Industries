/* ============================================================
   SITE CONFIGURATION
   Change business contact details here — used across the site.
   ============================================================ */
const SITE_CONFIG = {
    businessName: "Alpha Industries",
    // Include country code, digits only, no spaces or symbols e.g. "919999999999"
    BUSINESS_WHATSAPP: "919623898185",
    phone: "+91 9623898185",
    email: "sayyedsohel15@gmail.com",
  //  Factory: "Near Moshi Market Yard Chowk, Beside Waghjai Petrol Pump, Pune-Nashik Highway, Moshi, Pune -412105",
//	Factory Outlet: "Sadguru Nagar, Pune-Nashik Highway, Bhosari, Pimpri-Chinchwad, Pune -411039,
	
    hours: "Monday – Saturday, 9:00 AM – 7:00 PM",
 //   mapLink: "https://maps.app.goo.gl/2ohM4Saey9JujbNW6" // paste a Google Maps share link here when available
};

/* ============================================================
   CATEGORY DATA
   Add or edit categories here. "slug" is used for filtering
   and must match the "category" field used in PRODUCTS below.
   ============================================================ */
const CATEGORIES = [
    {
        slug: "display-counters",
        name: "Display Counters",
        description: "Bakery, sweet and curved glass display counters built to present your products attractively while keeping them fresh.",
        icon: "counter"
    },
    {
        slug: "kitchen-equipment",
        name: "Commercial Kitchen Equipment",
        description: "Gas stoves, stainless steel work counters and wash basins for busy commercial kitchens.",
        icon: "kitchen"
    },
    {
        slug: "food-stalls",
        name: "Food Stalls & Counters",
        description: "Pav bhaji and golgappa/pani puri counters designed for street food and quick-service setups.",
        icon: "stall"
    }
];

/* ============================================================
   PRODUCT DATA
   This is the single source of truth for the catalogue.
   To add a new product, copy an object below and edit its
   fields. "image" and "images" can point to real photos once
   available — until then the site shows a placeholder.
   ============================================================ */
const PRODUCTS = [
    {
        id: 1,
        name: "Bakery Display Counter",
        category: "display-counters",
        categoryName: "Display Counters",
        shortDescription: "A display counter designed to showcase bakery items such as cakes, pastries and breads.",
        description: "Our Bakery Display Counter is designed to present cakes, pastries, breads and other bakery items clearly to customers while helping keep them fresh. Suitable for bakeries, cafes and confectionery counters.",
        features: [
            "Clear glass display for full product visibility",
            "Designed for everyday bakery counter use",
            "Suitable for cakes, pastries, breads and confectionery"
        ],
        specifications: "",
        customization: "Available in different sizes on request.",
        applications: ["Bakeries", "Cafes", "Confectionery shops"],
        image: "images/products/bakery-display-counter.jpg",
        /* Extra angles/views shown as thumbnails on the details page and in Quick View.
           Add as many as you like — leave the array empty ([]) if you only have one photo. */
        images: [
            "images/products/bakery-display-counter-2.jpg",
            "images/products/bakery-display-counter-3.jpg"
        ]
    },
    {
        id: 2,
        name: "Curved Glass Display Counter",
        category: "display-counters",
        categoryName: "Display Counters",
        shortDescription: "A curved-glass counter for an elegant, open display of food and confectionery items.",
        description: "The Curved Glass Display Counter offers an elegant curved-glass front that gives customers a clear, attractive view of the items on display, while giving your counter a premium look.",
        features: [
            "Curved glass front for an open, elegant display",
            "Improves visibility of displayed items",
            "Adds a premium look to the shop counter"
        ],
        specifications: "",
        customization: "Contact us for available sizes and configurations.",
        applications: ["Bakeries", "Sweet shops", "Restaurants", "Retail counters"],
        image: "images/products/curved-glass-display-counter.jpg",
        images: [  
		    "images/products/curved-glass-display-counter-2.jpg",
            "images/products/curved-glass-display-counter-3.jpg"]
    },
    {
        id: 3,
        name: "Sweet Display Counter",
        category: "display-counters",
        categoryName: "Display Counters",
        shortDescription: "A display counter built for sweet shops to present mithai and confectionery items.",
        description: "Our Sweet Display Counter is built to present mithai and other sweet items to customers in an organised and hygienic manner, suited to the daily needs of a sweet shop counter.",
        features: [
            "Organised layout for sweet/mithai display",
            "Designed for daily sweet-shop counter use",
            "Easy to keep clean"
        ],
        specifications: "",
        customization: "Contact us for available sizes and configurations.",
        applications: ["Sweet shops", "Mithai counters", "Restaurants"],
        image: "images/products/sweet-display-counter.jpg",
        images: ["images/products/sweet-display-counter-2.jpg",
		         "images/products/sweet-display-counter-3.jpg"]
    },
    {
        id: 4,
        name: "Commercial Gas Stove",
        category: "kitchen-equipment",
        categoryName: "Commercial Kitchen Equipment",
        shortDescription: "A commercial-grade gas stove built for continuous use in busy kitchens.",
        description: "Our Commercial Gas Stove is built for continuous, everyday use in restaurant and commercial kitchens where reliable cooking equipment is essential.",
        features: [
            "Built for continuous commercial kitchen use",
            "Suited to high-volume cooking",
            "Straightforward to operate and maintain"
        ],
        specifications: "",
        customization: "Available in different burner configurations on request.",
        applications: ["Restaurants", "Hotels", "Catering kitchens", "Canteens"],
        image: "images/products/commercial-gas-stove.jpg",
        images: ["images/products/commercial-gas-stove-2.jpg",
		         "images/products/commercial-gas-stove-3.jpg"]
    },
    {
        id: 5,
        name: "Stainless Steel Counter",
        category: "kitchen-equipment",
        categoryName: "Commercial Kitchen Equipment",
        shortDescription: "A stainless steel work counter for food preparation in commercial kitchens.",
        description: "The Stainless Steel Counter provides a durable, easy-to-clean work surface for food preparation in commercial kitchens, suited to daily heavy-duty use.",
        features: [
            "Stainless steel work surface",
            "Easy to clean and maintain",
            "Suited to daily commercial kitchen use"
        ],
        specifications: "",
        customization: "Available in different sizes and configurations on request.",
        applications: ["Restaurants", "Hotel kitchens", "Catering units"],
        image: "images/products/stainless-steel-counter.jpg",
        images: ["images/products/stainless-steel-counter-2.jpg",
		         "images/products/stainless-steel-counter-3.jpg"]
    },
    {
        id: 6,
        name: "Stainless Steel Wash Basin",
        category: "kitchen-equipment",
        categoryName: "Commercial Kitchen Equipment",
        shortDescription: "A stainless steel wash basin built for commercial kitchen washing stations.",
        description: "Our Stainless Steel Wash Basin is designed for commercial kitchen washing stations, offering a durable and hygienic solution for daily use.",
        features: [
            "Stainless steel construction",
            "Designed for commercial washing stations",
            "Easy to clean"
        ],
        specifications: "",
        customization: "Available in single and double bowl configurations on request.",
        applications: ["Restaurant kitchens", "Hotel kitchens", "Canteens"],
        image: "images/products/stainless-steel-wash-basin.jpg",
        images: ["images/products/stainless-steel-wash-basin-2.jpg",
		 "images/products/stainless-steel-wash-basin-3.jpg"]
    },
    {
        id: 7,
        name: "Pav Bhaji Counter",
        category: "food-stalls",
        categoryName: "Food Stalls & Counters",
        shortDescription: "A counter built specifically for preparing and serving pav bhaji.",
        description: "The Pav Bhaji Counter is designed for the specific workflow of preparing and serving pav bhaji, helping vendors and restaurants serve customers efficiently.",
        features: [
            "Laid out for pav bhaji preparation and service",
            "Built for regular street-food/quick-service use",
            "Compact footprint for stalls and counters"
        ],
        specifications: "",
        customization: "Contact us for available sizes and configurations.",
        applications: ["Street food stalls", "Quick-service restaurants", "Food courts"],
        image: "images/products/pav-bhaji-counter.jpg",
        images: ["images/products/pav-bhaji-counter-2.jpg",
		"images/products/pav-bhaji-counter-3.jpg"]
    },
    {
        id: 8,
        name: "Golgappa / Pani Puri Counter",
        category: "food-stalls",
        categoryName: "Food Stalls & Counters",
        shortDescription: "A counter designed for serving golgappa/pani puri quickly and cleanly.",
        description: "The Golgappa / Pani Puri Counter is built to help vendors serve pani puri quickly and cleanly, with a layout suited to the item's typical service style.",
        features: [
            "Laid out for golgappa/pani puri service",
            "Built for regular street-food/quick-service use",
            "Compact footprint for stalls and counters"
        ],
        specifications: "",
        customization: "Contact us for available sizes and configurations.",
        applications: ["Street food stalls", "Food courts", "Quick-service counters"],
        image: "images/products/golgappa-counter.jpg",
		images: ["images/products/golgappa-counter-2.jpg",
		"images/products/golgappa-counter-3.jpg"]
    }
];

/* Helper: find a product by its id (used on the product details page) */
function getProductById(id) {
    return PRODUCTS.find(function (p) { return p.id === Number(id); });
}

/* Helper: find a category by its slug */
function getCategoryBySlug(slug) {
    return CATEGORIES.find(function (c) { return c.slug === slug; });
}
