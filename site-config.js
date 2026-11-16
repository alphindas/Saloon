/*
  SITE CONFIG: everything that changes from one client to the next lives in this file.
  To make a site for a new client: edit this file, swap the photos in /assets, and deploy.
  Set demo:false before sending the site to a real client (removes the "sample content" notes).
*/
window.SITE = {
  demo: true,
  theme: "pale-gold",            // "pale-gold" or "ice-plum" (more themes: see css/styles.css)
  url: "https://example.com",

  name: "Lumiere Beauty Studio",
  tagline: "Bridal, hair and skin care in Kochi.",
  since: 2014,

  phone: "+91 98XXX XXXXX",      // shown on the page
  phoneLink: "+919800000000",    // used for the Call button
  whatsapp: "919800000000",      // country code + number, no plus sign or spaces
  address: "2nd floor, Example Arcade, Kochi 682036",
  street: "2nd floor, Example Arcade",
  city: "Kochi",
  postcode: "682036",
  directionsUrl: "https://maps.google.com/",
  mapEmbed: "",                  // paste the Google Maps "embed" link here to show a live map

  images: {
    hero: "assets/hero.jpg"      // hero and facial photo
  },

  hero: {
    line1: "Bridal looks, hair",
    line2: "and skin care",
    line3: "in Kochi.",   // shown in italics
    lead: "Walk in or book on WhatsApp. Every price is written on this page, so there are no surprises at the counter.",
    cta: "Book on WhatsApp",
    secondary: "See prices"
  },
  facts: [
    { title: "4.8 on Google", text: "from 312 reviews" },
    { title: "Open daily", text: "9:30 am to 8:00 pm" },
    { title: "Since 2014", text: "Bridal, hair and skin" }
  ],
  slots: ["4:30 pm", "6:00 pm", "7:15 pm"],   // "Free slots today", set to [] to hide the card
  slotsText: "Tap a time and WhatsApp opens with your booking already typed out.",

  band: ["Bridal makeup", "Hair spa", "Glow facials", "Keratin smoothing", "Nail art", "Pre-wedding care"],

  statement: "We keep the menu short, the prices written down and the appointments on time. You pick a service, send one message, and we hold your slot.",

  servicesIntro: "Prices are in rupees. “Onwards” means the final price depends on hair length.",
  services: {
    skin: { label: "Skin", image: "assets/images/facial.jpg", blurb: "Facials and treatments for calm, bright skin", items: [
      { name: "Lumiere glow facial", price: "₹ 2,800", note: "Deep cleanse, steam, massage and a brightening mask. 60 minutes." },
      { name: "Hydrating facial", price: "₹ 1,800", note: "For dry or tired skin. 45 minutes." },
      { name: "Clean-up", price: "₹ 900", note: "Cleanse, scrub and light massage. 30 minutes." },
      { name: "De-tan treatment", price: "₹ 1,200", note: "Face and neck, or hands and feet." },
      { name: "Threading, eyebrows", price: "₹ 60" }
    ]},
    hair: { label: "Hair", image: "assets/images/hair.jpg", blurb: "Cuts, colour and care for healthy hair", items: [
      { name: "Haircut, women", price: "₹ 450", note: "Wash, cut and blow dry." },
      { name: "Haircut, men", price: "₹ 250", note: "Cut and style." },
      { name: "Hair spa", price: "₹ 1,200", note: "Deep conditioning with scalp massage. 45 minutes." },
      { name: "Global colour", price: "₹ 2,500", unit: "onwards", note: "Ammonia-free, includes toner." },
      { name: "Keratin smoothing", price: "₹ 4,500", unit: "onwards", note: "Lasts about four months." },
      { name: "Blow dry and set", price: "₹ 600", note: "For parties and functions." }
    ]},
    bridal: { label: "Bridal", image: "assets/images/bridal.jpg", blurb: "Looks for the big day, trial included", items: [
      { name: "Bridal trial look", price: "₹ 1,500", note: "Included free in every bridal package." },
      { name: "Reception look", price: "₹ 9,500", note: "Makeup, hairstyle and saree draping." },
      { name: "Wedding day", price: "₹ 16,000", note: "Muhurtham makeup, hairstyle, draping and a touch-up kit." },
      { name: "Pre-wedding care", price: "₹ 6,500", note: "Facial, hair spa, manicure and pedicure in one visit." }
    ]},
    nails: { label: "Nails", image: "assets/images/nails.jpg", blurb: "Clean, neat nails that last", items: [
      { name: "Manicure", price: "₹ 500" },
      { name: "Pedicure", price: "₹ 700" },
      { name: "Gel polish", price: "₹ 800", note: "Lasts two to three weeks." },
      { name: "Nail art", price: "₹ 150", unit: "per nail" }
    ]}
  },

  signature: {
    image: "assets/images/glow.jpg",
    title: "The Lumiere glow facial,",
    titleItalic: "our most booked treatment.",
    text: "One hour that leaves skin calm, clean and bright. Good before a function, or any week you want a reset.",
    steps: [
      { name: "Deep cleanse and steam", time: "10 min" },
      { name: "Face and neck massage", time: "20 min" },
      { name: "Brightening glow mask", time: "20 min" },
      { name: "Finish and sun protection", time: "10 min" }
    ],
    price: "₹ 2,800",
    duration: "for 60 minutes",
    cta: "Book this facial",
    waText: "Hi, I'd like to book the Lumiere glow facial."
  },

  bridal: {
    title: "Bridal packages with a trial look first.",
    text: "Send us your wedding date and we will hold it for you. A trial look is included in every package, so you see the makeup before the day.",
    packages: [
      { name: "Reception look", price: "₹ 9,500", text: "Makeup, hairstyle and saree draping for one event." },
      { name: "Wedding day", price: "₹ 16,000", text: "Muhurtham makeup, hairstyle, draping and a touch-up kit for the day." },
      { name: "Bride and family", price: "₹ 28,000", unit: "for 5 people", text: "Full look for the bride and four family members, with two stylists on site." }
    ],
    checkTitle: "Check if your date is free"
  },

  stats: [
    { value: 4.8, decimals: 1, suffix: "", label: "average rating on Google" },
    { value: 312, decimals: 0, suffix: "", label: "client reviews" },
    { value: 1200, decimals: 0, suffix: "+", label: "brides and families styled" }
  ],

  gallery: {
    title: "Recent work",
    text: "Photos from our own clients, shared with their permission.",
    // Six photos. Use your client's own pictures (about 1200 px wide looks sharpest).
    items: [
      { caption: "Glow and care",    image: "assets/images/glow.jpg",     position: "50% 30%" },
      { caption: "Facials",          image: "assets/images/facial.jpg",   position: "55% 40%" },
      { caption: "Bridal looks",     image: "assets/images/bridal.jpg",   position: "60% 25%" },
      { caption: "Nail care",        image: "assets/images/nails.jpg",    position: "40% 50%" },
      { caption: "Hair and styling", image: "assets/images/hair.jpg",     position: "70% 30%" },
      { caption: "Our products",     image: "assets/images/products.jpg", position: "50% 55%" }
    ],
    button: "See more on Instagram"
  },

  rating: { score: 4.8, count: 312 },
  reviews: [
    { text: "Booked my wedding date over WhatsApp in two minutes. The trial look took away all my worry.", name: "Anjali, bride" },
    { text: "Prices were exactly what the website said. My hair spa was worth every rupee.", name: "Meera" },
    { text: "Quiet, clean and on time. I come every month for threading and a facial.", name: "Sruthi" }
  ],

  hours: [
    { day: "Monday to Saturday", time: "9:30 am to 8:00 pm" },
    { day: "Sunday", time: "10:00 am to 6:00 pm" },
    { day: "Bridal bookings", time: "By appointment" }
  ],

  social: [
    { label: "Instagram", url: "#" },
    { label: "Facebook", url: "#" },
    { label: "YouTube", url: "#" }
  ]
};
