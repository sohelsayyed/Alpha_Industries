/* ============================================================
   CONTENT DATA — edit here to update Projects, Testimonials,
   PDF Catalogues, FAQs and the work process. No HTML changes needed.
   Entries marked placeholder:true show a "Sample" badge — replace them
   with real content and delete the placeholder flag.
   ============================================================ */

/* PDF CATALOGUES: put the PDF in /catalogues and add an entry. */
const CATALOGUES = [
    { title: "Company Product Catalogue-v1", description: "Our full range of display counters, kitchen equipment and food stall counters.", file: "catalogues/company-catalogue.pdf" },
	{ title: "Company Product Catalogue-v2", description: "Our full range of display counters, kitchen equipment and food stall counters.", file: "catalogues/company-catalogue-v2.pdf" }
];

/* PROJECTS: category is free text (e.g. "Bakery", "Restaurant"). */
const PROJECTS = [
    { id: 1, title: "Bakery Display Counter", client: "Hotel Bhagyashree", location: "Latur", category: "Bakery", image: "images/projects/project-1.jpg", description: "Design and Manufactured Beautiful Bakery Display Counter as per Client's Requirements", placeholder: true},
    { id: 2, title: "Sweet Counter", client: "Kanhaiyya sweets", location: "Beed", category: "Sweet Shop", image: "images/projects/project-2.jpg", description: "Attractive Curved Display Counter", placeholder: true },
    { id: 3, title: "Commerical Burners", client: "Hotel Jaydeep", location: "Parli", category: "Restaurant", image: "images/projects/project-3.jpg", description: "Burners For Commercial Kitchen as per Client's Requirements ", placeholder: true }
];

const TESTIMONIALS = [
    {
        name: "Rajesh Misal",
        business: "Shree Ganesh Sweets & Bakery, Wadwani",
        text: "The curved glass display counter and stainless steel work tables have completely transformed our front store. Temperature control is consistent, the finishing is spotless, and cleaning at the end of the day is completely hassle-free.",
        placeholder: false
    },
    {
        name: "Anand Kulkarni",
        business: "Kanhaiyya Fast Food & Chaat, Beed",
        text: "We ordered the custom Pani Puri counter and a heavy-duty Pav Bhaji tawa setup. The build quality of the stainless steel is top-grade with zero wobble, and the burners handle peak-hour evening rush without any flame drops.",
        placeholder: false
    },
    {
        name: "Vikram patil",
        business: "Patil Caterers & Cloud Kitchen, Latur",
        text: "Setting up a commercial kitchen requires equipment that can withstand rigorous daily abuse. From the 3-burner gas ranges to the deep washbasins, everything was delivered on schedule and built exactly to our space requirements.",
        placeholder: false
    }
];

/* PROCESS: how an enquiry becomes a delivered product (edit to match your real process). */
const PROCESS = [
    { title: "Enquiry", text: "Tell us what you need by form, call or WhatsApp." },
    { title: "Requirements & Quote", text: "We discuss sizes and customization, then share a quotation." },
    { title: "Manufacturing", text: "Your equipment is made to the agreed requirements." },
    { title: "Delivery", text: "Your order is delivered to your location." }
];

const FAQS = [
    { q: "How do I get a price?", a: "Prices are not listed online. Send an enquiry by form, WhatsApp or phone and we will share pricing and availability." },
    { q: "Can products be customized?", a: "Contact us with your requirements to discuss available sizes and customization." },
    { q: "Where can I see your products?", a: "Browse the Products, Projects and Gallery pages, or download our PDF catalogue." }
];
