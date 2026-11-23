/*
 * Content for the five Hyderabad landing pages (routes and titles: ./seo.js → seoLinks).
 * Each page has the same shape as a service in content.js, so it reuses the service-page
 * components (hero, offer grid, steps, FAQ, related, CTA), plus a long-form `article`.
 * Facts come only from the client's programme details and the existing service copy — no prices,
 * guarantees, ratings or timelines are promised. Loaded only with the landing-page chunk.
 */
import { contact, enquiry } from './content.js'
import { seoLinkBySlug } from './seo.js'

const HUB = { label: 'Hyderabad', to: '/travel-agency-in-hyderabad' }
const ADDRESS = 'S.No. F12, Mawin Zam Zam Plaza, opposite Old Prince Hotel, Mehdipatnam, Hyderabad – 500 028'
const PHONES = contact.phones.map((p) => p.label).join(' or ')

const PAGES = [
  /* ---------------------------------------------------------------------------------------- */
  {
    slug: 'umrah-packages-from-hyderabad',
    crumbParent: HUB,
    title: 'Umrah Packages from Hyderabad',
    kicker: 'Ziyarath Special Umrah · Direct flights',
    heading: { lines: ['Umrah Packages', 'from Hyderabad'], accent: 1 },
    intro:
      'A guided Umrah group from Hyderabad — direct flights, hotels close to both Harams, four Umrahs with a Muallim and an extended Ziyarath programme in Madinah.',
    image: '/images/hajj-umrah/umrah-kaaba-night.webp',
    tone: 'night',
    icon: 'kaaba',
    motif: 'kaaba',
    whatsapp: enquiry.umrah,
    offerHeading: ['What your Umrah ', { accent: 'includes' }],
    long: [
      'Our Ziyarath Special Umrah group flies direct from Hyderabad to Jeddah and comes home direct from Madinah to Hyderabad — no long layovers at either end of the journey.',
      'Flights, hotels, meals, transport, laundry and Ziyarath are all arranged from our Mehdipatnam office, so you can keep your mind on the worship itself.',
    ],
    offer: [
      { icon: 'utensils', title: 'Hyderabadi buffet meals', text: 'Familiar Hyderabadi food on a buffet, with tea served three times.' },
      { icon: 'bed', title: 'Hotels near the Harams', text: 'Akaber Al Hijra, 300 m from the Haram, and Diwan Al Madinah, 150 m from Masjid an-Nabawi.' },
      { icon: 'kaaba', title: 'Four Umrahs', text: 'From India, Joarana, the Taif Meeqat and Hudaybiyyah — with a Muallim to guide you.' },
      { icon: 'mapPin', title: 'Extended Ziyarath', text: 'Twelve extra sites in and around Madinah, from Wadi-e-Aqeeq to Badr ka Maidan.' },
      { icon: 'bus', title: 'Transport both ways', text: 'Round-trip transportation is part of the programme.' },
      { icon: 'shirt', title: 'Laundry & baggage kit', text: 'Laundry in Makkah and Madinah, and a baggage kit for every pilgrim.' },
    ],
    article: {
      eyebrow: 'Umrah guide',
      title: ['Umrah from Hyderabad, ', { accent: 'step by step' }],
      lead: 'What the Ziyarath Special Umrah group includes, where you stay and how to book — before you even call us.',
      sections: [
        {
          id: 'direct-flights',
          heading: 'Direct flights from Hyderabad',
          body: [
            'The group flies direct from Hyderabad to Jeddah and returns direct from Madinah to Hyderabad. You begin in Makkah with your Umrah and end the journey at Masjid an-Nabawi, without travelling back to Jeddah for the flight home.',
            'The airline, flight timings and baggage allowance are confirmed by our team when you book.',
          ],
        },
        {
          id: 'hotels',
          heading: 'Hotels close to the Haram and Masjid an-Nabawi',
          body: ['Walking distance matters on Umrah, especially for elderly parents and families with children. The group stays at:'],
          list: ['Makkah — Akaber Al Hijra (3-star), about 300 m from the Haram', 'Madinah — Diwan Al Madinah (3-star), about 150 m from Masjid an-Nabawi'],
          link: { to: '/hotels', label: 'See the hotels and walking distances' },
        },
        {
          id: 'four-umrahs',
          heading: 'Four Umrahs, guided by a Muallim',
          body: ['The programme includes four Umrah arrangements, with a Muallim guiding the group so you know each step of the rites:'],
          list: ['From India — your first Umrah, with the Muallim', 'From Joarana', 'From the Taif Meeqat', 'From Hudaybiyyah (Sulh Hudaybiyyah)'],
        },
        {
          id: 'ziyarath',
          heading: 'Extended Ziyarath in Madinah',
          body: ['Beyond the usual visits, the group goes to twelve more places in and around Madinah:'],
          list: [
            'Quran Factory',
            'Wadi-e-Aqeeq',
            'Wadi-e-But’haan',
            'Wadi-e-Ranoona',
            'Beer-e-Gars',
            'Beer-e-Yaseera',
            'Beer-e-Osman',
            'Garden of Salman Farsi R.A.',
            'Turkey Railway Station',
            'Badr ka Maidan',
            'Jabl-e-Malaika',
            'Wadi-e-Jinn',
          ],
          note: 'The final itinerary and access to each site are confirmed by the office.',
        },
        {
          id: 'riyazul-jannah',
          heading: 'Riyazul Jannah',
          body: ['Entry to Riyazul Jannah depends on permits and available slots. Our team confirms the arrangements that apply to your booking before you travel.'],
        },
        {
          id: 'price-and-dates',
          heading: 'Price, dates and seats',
          body: [
            'Departure dates, total duration, airline and package price are set group by group, so we share them directly. Call or WhatsApp us for the current details, room-sharing options and the full list of inclusions.',
          ],
          link: { to: '/services/haj-umrah', label: 'See the full Haj & Umrah programme' },
        },
      ],
    },
    steps: [
      { title: 'Send an enquiry', text: 'Call, WhatsApp or visit our office in Mehdipatnam.' },
      { title: 'Get the details', text: 'Dates, duration, price and room-sharing options for the next group.' },
      { title: 'Book your seat', text: 'Confirm with the office and share the documents they ask for.' },
      { title: 'Travel with the group', text: 'Fly direct, stay close to the Harams and complete four Umrahs.' },
    ],
    faqs: [
      { q: 'Do you have Umrah packages from Hyderabad with direct flights?', a: 'Yes. Our Ziyarath Special Umrah group flies direct from Hyderabad to Jeddah and returns direct from Madinah to Hyderabad.' },
      { q: 'Which hotels do you use in Makkah and Madinah?', a: 'Akaber Al Hijra in Makkah, about 300 m from the Haram, and Diwan Al Madinah, about 150 m from Masjid an-Nabawi. Both are 3-star hotels.' },
      { q: 'How many Umrahs are included?', a: 'Four: from India with a Muallim, from Joarana, from the Taif Meeqat and from Hudaybiyyah.' },
      { q: 'Is Ziyarath included?', a: 'Yes, including an extended Madinah Ziyarath to twelve additional places such as Wadi-e-Aqeeq, Jabl-e-Malaika, Badr ka Maidan and the Garden of Salman Farsi R.A.' },
      { q: 'What is the price of the Umrah package?', a: 'It depends on the group and room sharing. Contact our office for the current total price, dates and inclusions.' },
      { q: 'Where is your office in Hyderabad?', a: `${ADDRESS}. You can also call ${PHONES}.` },
    ],
    related: ['haj-umrah', 'private-transfers', 'hotel-bookings'],
    cta: { accent: 'your Umrah', lead: `Ask for the next group’s dates and price — ${contact.person} or our team will reply on WhatsApp.` },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: 'hajj-packages-from-hyderabad',
    crumbParent: HUB,
    title: 'Hajj 2027 Packages from Hyderabad',
    kicker: 'Hajj 2027 · From Hyderabad',
    heading: { lines: ['Hajj 2027', 'from Hyderabad'], accent: 1 },
    intro:
      'Hajj 2027 with the care that makes the days easier — Indian meals, unlimited laundry, a premium Hajj kit, Ziyarath and private buses through the 5 days of Hajj.',
    image: '/images/packages/hajj-premium.webp',
    tone: 'sand',
    icon: 'mosque',
    motif: 'kaaba',
    whatsapp: enquiry.hajj,
    offerHeading: ['Your Hajj 2027 ', { accent: 'package' }],
    long: [
      'Hajj is the journey of a lifetime, and the days of Hajj are the most demanding. Our Hajj 2027 programme focuses on what makes them easier: good food, clean clothes, a private bus between the holy sites and a team to guide you.',
      'Plan everything with us in person at our Mehdipatnam office, or start the conversation on WhatsApp.',
    ],
    offer: [
      { icon: 'utensils', title: 'Platinum Indian dining', text: 'A rich Indian set menu with snacks, fresh fruit, bakery items and juices.' },
      { icon: 'shirt', title: 'Unlimited laundry', text: 'Laundry included in your package.' },
      { icon: 'luggage', title: 'Premium Hajj kit', text: 'Your own kit, prepared for the pilgrimage.' },
      { icon: 'mosque', title: 'Riyazul Jannah permits', text: 'Separate permits for men and women, as availability allows.' },
      { icon: 'mapPin', title: 'Ziyarath', text: 'Visits to the sacred sites of Makkah, Madinah and Taif.' },
      { icon: 'bus', title: 'Private buses for Hajj', text: 'Private transport between Mina, Arafat, Muzdalifah and Jamarat.' },
    ],
    article: {
      eyebrow: 'Hajj guide',
      title: ['Your Hajj 2027, ', { accent: 'planned with care' }],
      lead: 'What the programme includes, the documents you need, and what to know before you book.',
      sections: [
        {
          id: 'hajj-transport',
          heading: 'Private buses through the 5 days of Hajj',
          body: ['During the days of Hajj the group travels by private bus on each of these transfers:'],
          list: [
            'Makkah hotel → Mina camp',
            'Mina → Arafat',
            'Arafat → Muzdalifah',
            'Muzdalifah → Jamarat',
            'Jamarat → Makkah hotel',
            'Tawaf-e-Ziyarath → Mina camp',
            'Mina → Makkah hotel',
          ],
          note: 'Even with transport arranged, expect some walking — mostly on the last two days of stoning at Jamarat.',
        },
        {
          id: 'umrah-before-hajj',
          heading: 'One Umrah before Hajj',
          body: ['The programme includes one Umrah before Hajj, performed once the group reaches Aziziya on 5 Dhul Hijjah.'],
        },
        {
          id: 'itinerary',
          heading: 'Your itinerary, two weeks ahead',
          body: ['A day-by-day itinerary, with dos and don’ts, is shared two weeks before departure — so you know what each day holds before you leave Hyderabad.'],
        },
        {
          id: 'documents',
          heading: 'Documents for Hajj 2027',
          body: ['To register, the office needs:'],
          list: ['Original passport', 'PAN card', 'Aadhaar card', 'One passport-size photograph'],
          note: 'The office guides you on how to submit them and checks every document for you.',
        },
        {
          id: 'good-to-know',
          heading: 'Good to know before you book',
          list: [
            'Passports are collected on arrival at the hotels in Makkah and Madinah — ask the office how they are kept and returned.',
            'Check the latest Nusuk card and ID rules with the office; the card may not replace your passport in every situation.',
            'If you choose to return to India early, the return ticket is booked and paid for by you.',
            'Bags travel to your hotel with company stickers and hanging tags, and a luggage tracker is recommended.',
            'Each traveller is responsible for their own luggage.',
          ],
          link: { to: '/services/haj-umrah', label: 'Read the full Hajj notes' },
        },
        {
          id: 'hajj-price',
          heading: 'Price, dates and hotels',
          body: ['The total package price, travel dates, hotel arrangements and final booking terms are shared by the office. Call or WhatsApp us for the current details.'],
        },
      ],
    },
    steps: [
      { title: 'Send an enquiry', text: 'Call, WhatsApp or visit our office in Mehdipatnam.' },
      { title: 'Get the details', text: 'Total price, dates, hotels and final booking terms.' },
      { title: 'Submit documents', text: 'Original passport, PAN card, Aadhaar card and a photograph.' },
      { title: 'Prepare for Hajj', text: 'Your itinerary and dos and don’ts arrive two weeks before departure.' },
    ],
    faqs: [
      { q: 'Do you offer Hajj 2027 packages from Hyderabad?', a: 'Yes. Our Hajj 2027 programme is arranged from our office in Mehdipatnam, Hyderabad.' },
      { q: 'Is transport included during the days of Hajj?', a: 'Yes. Private buses take the group on each transfer through the 5 days of Hajj — Mina, Arafat, Muzdalifah, Jamarat and back to the Makkah hotel.' },
      { q: 'What food is provided on Hajj?', a: 'A platinum Indian set menu with snacks, fresh fruit, bakery items and juices.' },
      { q: 'Which documents do I need for Hajj 2027?', a: 'Your original passport, PAN card, Aadhaar card and a passport-size photograph.' },
      { q: 'Is an Umrah included before Hajj?', a: 'Yes — one Umrah, performed after the group reaches Aziziya on 5 Dhul Hijjah.' },
      { q: 'What is the Hajj 2027 package price?', a: 'Contact the office for the total package price, travel dates, hotel arrangements and booking terms.' },
    ],
    related: ['haj-umrah', 'private-transfers', 'travel-insurance'],
    cta: { accent: 'Hajj 2027', lead: `Ask for the Hajj 2027 price, dates and hotels — ${contact.person} or our team will guide you.` },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: 'travel-agency-in-hyderabad',
    crumbParent: null,
    title: 'Travel Agency in Hyderabad',
    kicker: 'Mehdipatnam · Hyderabad',
    heading: { lines: ['Travel Agency', 'in Hyderabad'], accent: 1 },
    intro:
      'Holidays, flights, visas, hotels, insurance, passports and Hajj & Umrah — planned by people you can meet, at our office in Mehdipatnam.',
    image: '/images/services/air.webp',
    tone: 'sky',
    icon: 'globe',
    motif: 'plane',
    whatsapp: 'Hello Al Balaagh Travels. I would like help planning a trip.',
    offerHeading: ['Every part of your trip, ', { accent: 'one desk' }],
    long: [
      'Al Balaagh Travels is a full-service travel agency in Mehdipatnam, Hyderabad. Instead of juggling an airline, a visa centre, a hotel website and an insurer, you speak to one team that puts the whole trip together.',
      'Walk in, call or message us on WhatsApp — whichever is easiest for you.',
    ],
    offer: [
      { icon: 'palm', title: 'Holiday packages', text: 'Tailor-made trips to Dubai, Türkiye, the Maldives, Thailand, Europe and more.' },
      { icon: 'plane', title: 'Air tickets', text: 'Domestic and international flights, compared and booked for you.' },
      { icon: 'stamp', title: 'Visa services', text: 'Guidance, document checks, forms and VFS appointments.' },
      { icon: 'bed', title: 'Hotel bookings', text: 'Hotels and resorts worldwide, booked around your plans.' },
      { icon: 'kaaba', title: 'Hajj & Umrah', text: 'Hajj 2027 and the Ziyarath Special Umrah group from Hyderabad.' },
      { icon: 'passport', title: 'Passports & documents', text: 'Passport services, certificate attestation and immigration guidance.' },
    ],
    article: {
      eyebrow: 'About us',
      title: ['A travel agency you can ', { accent: 'walk into' }],
      lead: 'A local office, a real team, and every part of the trip handled together.',
      sections: [
        {
          id: 'one-team',
          heading: 'One team for the whole trip',
          body: [
            'Most trips need several things to line up — a flight, a visa, a hotel, travel insurance, sometimes a passport renewal first. We handle them together, so dates match, documents are ready and you have one number to call if anything changes.',
          ],
        },
        {
          id: 'office',
          heading: 'Our office in Mehdipatnam',
          body: [
            'You will find us at Mawin Zam Zam Plaza, opposite Old Prince Hotel, Mehdipatnam — close to Masab Tank, Tolichowki, Attapur and Banjara Hills. Sit with us, go through the options and bring your documents for checking.',
          ],
          link: { to: '/contact', label: 'Directions and contact details' },
        },
        {
          id: 'services',
          heading: 'Services under one roof',
          list: [
            { label: 'Holiday packages', to: '/services/holiday-packages' },
            { label: 'Domestic & international air tickets', to: '/services/air-ticketing' },
            { label: 'All visa services', to: '/services/visa-services' },
            { label: 'VFS appointments', to: '/services/vfs-appointments' },
            { label: 'Hotel bookings', to: '/services/hotel-bookings' },
            { label: 'Travel insurance', to: '/services/travel-insurance' },
            { label: 'Passport services', to: '/services/passport-services' },
            { label: 'Immigration services', to: '/services/immigration-services' },
            { label: 'Attestation of certificates', to: '/services/attestation-of-certificates' },
            { label: 'Haj & Umrah packages', to: '/services/haj-umrah' },
            { label: 'Private transfers · Jeddah, Makkah, Madinah', to: '/services/private-transfers' },
            { label: 'Albania work permit & job visa', to: '/albania-work-visa' },
          ],
        },
        {
          id: 'honest-advice',
          heading: 'Clear, honest advice',
          body: [
            'We explain fare rules, visa requirements and exactly what a package does and does not include before you pay. Visa decisions rest with embassies and fares depend on availability — so we never promise what is not ours to promise.',
          ],
        },
        {
          id: 'support',
          heading: 'Support before and during your trip',
          body: ['Questions do not stop once you have booked. Reach us on WhatsApp or by phone before you leave and while you are travelling.'],
        },
      ],
    },
    steps: [
      { title: 'Tell us your plan', text: 'Where, when, who is travelling and what you need.' },
      { title: 'Get clear options', text: 'Flights, hotels, visas and packages explained side by side.' },
      { title: 'Confirm', text: 'Choose what suits you; we book and prepare the documents.' },
      { title: 'Travel with support', text: 'A team in Hyderabad a message away, before and during the trip.' },
    ],
    faqs: [
      { q: 'Where is Al Balaagh Travels located in Hyderabad?', a: `${ADDRESS}.` },
      {
        q: 'What services do you offer?',
        a: 'Holiday packages, domestic and international air tickets, visa services, VFS appointments, hotel bookings, travel insurance, passport services, immigration guidance, certificate attestation, private transfers in Saudi Arabia, and Hajj & Umrah packages.',
      },
      { q: 'Can I enquire on WhatsApp?', a: `Yes — tap any WhatsApp button on this site, or call ${PHONES}.` },
      { q: 'Do you only handle pilgrimage travel?', a: 'No. Alongside Hajj and Umrah, we plan international holidays, book flights and hotels, and help with visas and documents.' },
      { q: 'Do you have another office?', a: 'Yes, we also have an office at Panja Center, Vijayawada.' },
    ],
    related: ['holiday-packages', 'air-ticketing', 'visa-services'],
    cta: { accent: 'your next trip', lead: `Tell us what you are planning — ${contact.person} or our team will reply on WhatsApp.` },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: 'visa-services-in-hyderabad',
    crumbParent: HUB,
    title: 'Visa Services in Hyderabad',
    kicker: 'Visas · VFS · Passports · Attestation',
    heading: { lines: ['Visa Services', 'in Hyderabad'], accent: 1 },
    intro:
      'Careful help with visa paperwork, VFS appointments, passports and certificate attestation — so your application goes in complete.',
    image: '/images/services/visa.webp',
    tone: 'emerald',
    icon: 'stamp',
    motif: 'stamp',
    whatsapp: 'Hello Al Balaagh Travels. I need help with a visa application.',
    offerHeading: ['Visa help, ', { accent: 'done properly' }],
    long: [
      'A visa application is only as strong as its paperwork. We explain what your visa type needs, check your documents against the published checklist, help with forms and photos, and assist with appointments where the process requires one.',
      'Visa decisions always rest with the embassy or consulate. Our job is to help you submit a complete, well-prepared application.',
    ],
    offer: [
      { icon: 'stamp', title: 'Tourist & visit visas', text: 'Support for holiday and family-visit applications.' },
      { icon: 'briefcase', title: 'Business visas', text: 'Guidance for meetings, conferences and business trips.' },
      { icon: 'calendar', title: 'VFS appointments', text: 'Help finding and booking a slot, and preparing for the visit.' },
      { icon: 'certificate', title: 'Document checks', text: 'Your file reviewed against the checklist before submission.' },
      { icon: 'passport', title: 'Passport services', text: 'New passports, renewals and corrections — forms and appointments.' },
      { icon: 'globe', title: 'Attestation & immigration', text: 'Certificate attestation and guidance for work, study or family moves.' },
    ],
    article: {
      eyebrow: 'Visa guide',
      title: ['From checklist to ', { accent: 'submission' }],
      lead: 'How we help with your visa, VFS appointment, passport and attestation in Hyderabad.',
      sections: [
        {
          id: 'how-we-help',
          heading: 'How we help with your visa',
          list: [
            'Explain the requirements for your country and visa type',
            'Share a document checklist',
            'Review your documents before submission',
            'Help complete online and paper forms',
            'Assist with submission and biometric appointments',
            'Help you track the application where tracking is available',
          ],
        },
        {
          id: 'vfs',
          heading: 'VFS and visa application centre appointments',
          body: [
            'Many embassies accept applications through visa application centres such as VFS Global. We help you book an available slot, prepare the file and understand what happens on the day.',
            'We are an independent travel agency — not part of VFS Global or any embassy — and appointment slots are released by the centre.',
          ],
          link: { to: '/services/vfs-appointments', label: 'More on VFS appointments' },
        },
        {
          id: 'visa-documents',
          heading: 'Documents usually needed',
          list: [
            'Passport with enough validity and blank pages',
            'Recent photographs to the country’s specifications',
            'Bank statements or proof of funds',
            'Travel itinerary, ticket and hotel details',
            'Invitation or employment letters, where applicable',
          ],
          note: 'Exact requirements differ by country and visa type — we confirm them for your case.',
        },
        {
          id: 'passport',
          heading: 'Passport first?',
          body: [
            'If your passport is expiring, damaged or has an error, sort it out before you apply. We help with new passports, renewals and corrections — forms, documents and appointments.',
          ],
          link: { to: '/services/passport-services', label: 'Passport services' },
        },
        {
          id: 'attestation',
          heading: 'Attestation for work, study or residence abroad',
          body: [
            'Many countries ask for Indian educational, personal or commercial documents to be attested before they are accepted. We explain the route for your document and destination, and keep you updated as it progresses.',
          ],
          link: { to: '/services/attestation-of-certificates', label: 'Attestation of certificates' },
        },
        {
          id: 'no-false-promises',
          heading: 'No false promises',
          body: [
            'No agency can guarantee a visa or an earlier appointment. Processing times depend on the country, the visa type and the season, and we tell you the currently published timelines when you enquire.',
          ],
        },
      ],
    },
    steps: [
      { title: 'Tell us the trip', text: 'Country, purpose of travel and your travel dates.' },
      { title: 'Get the checklist', text: 'The documents typically needed for your visa type.' },
      { title: 'Prepare & apply', text: 'Forms, photos and appointment booking, done with you.' },
      { title: 'Track & collect', text: 'We help you follow up until your passport is returned.' },
    ],
    faqs: [
      { q: 'Can you guarantee my visa?', a: 'No one can — the decision belongs to the embassy or consulate. We help you submit a complete and accurate application.' },
      { q: 'Do you help with VFS appointments in Hyderabad?', a: 'Yes. We help you find and book an available appointment at the visa application centre and prepare your documents for it. Slots are released by the centre.' },
      { q: 'Are you VFS Global?', a: 'No. We are an independent travel agency in Mehdipatnam, Hyderabad.' },
      { q: 'How long does a visa take?', a: 'It depends on the country, visa type and season. We share the currently published timelines when you enquire.' },
      { q: 'Do you help with passport renewal?', a: 'Yes — new passports, renewals and corrections, including forms, documents and appointments.' },
      { q: 'Which countries do you handle?', a: 'Many popular destinations. Message us the country and the purpose of travel and we will confirm how we can help.' },
    ],
    related: ['visa-services', 'vfs-appointments', 'passport-services'],
    cta: { accent: 'your visa', lead: `Send us the country and your travel dates — ${contact.person} or our team will share the checklist.` },
  },

  /* ---------------------------------------------------------------------------------------- */
  {
    slug: 'holiday-packages-from-hyderabad',
    crumbParent: HUB,
    title: 'Holiday Packages from Hyderabad',
    kicker: 'Tailor-made · Worldwide',
    heading: { lines: ['Holiday Packages', 'from Hyderabad'], accent: 1 },
    intro:
      'Dubai, Türkiye, the Maldives, Thailand, Malaysia & Singapore, Azerbaijan and Europe — holidays from Hyderabad with flights, hotels, visas and sightseeing in one plan.',
    image: '/images/destinations/maldives.webp',
    tone: 'sky',
    icon: 'palm',
    motif: 'palm',
    whatsapp: 'Hello Al Balaagh Travels. I am interested in a holiday package from Hyderabad. Please share some options.',
    offerHeading: ['Your holiday, ', { accent: 'planned end to end' }],
    long: [
      'Tell us where you would like to go, when and who is travelling, and we build the holiday around you — flights from Hyderabad, hotels, transfers, sightseeing, visa guidance and travel insurance in one plan.',
      'We keep food preferences such as halal or vegetarian, family needs and the pace you enjoy in mind, and adjust the plan until it feels right.',
    ],
    offer: [
      { icon: 'palm', title: 'Curated itineraries', text: 'Day-by-day plans for popular international destinations.' },
      { icon: 'plane', title: 'Flights from Hyderabad', text: 'Routes and fares compared, then booked for the whole group.' },
      { icon: 'bed', title: 'Hotels & stays', text: 'Family-friendly hotels chosen for location and comfort.' },
      { icon: 'bus', title: 'Transfers & sightseeing', text: 'Airport transfers and guided or private sightseeing.' },
      { icon: 'stamp', title: 'Visas & insurance', text: 'Visa guidance and travel cover arranged with the trip.' },
      { icon: 'utensils', title: 'Food preferences', text: 'Halal, vegetarian and other food needs considered while planning.' },
    ],
    article: {
      eyebrow: 'Destinations',
      title: ['Where to go ', { accent: 'from Hyderabad' }],
      lead: 'Our most requested holidays, and what each one is best for.',
      sections: [
        {
          id: 'dubai',
          heading: 'Dubai — skylines, desert and sea',
          body: ['Towering skylines, desert safaris, souks and beaches — an easy short-haul favourite for families, shoppers and first-time travellers abroad.'],
          list: ['Downtown & the Burj Khalifa', 'Desert safari evenings', 'Dubai Marina & beaches'],
        },
        {
          id: 'turkiye',
          heading: 'Türkiye — where two continents meet',
          body: ['Istanbul’s bazaars and Bosphorus views, then sunrise balloons over the fairy chimneys of Cappadocia — history, food and landscapes in one trip.'],
          list: ['Bosphorus cruise', 'Grand Bazaar & old Istanbul', 'Cappadocia hot-air balloons'],
        },
        {
          id: 'maldives',
          heading: 'The Maldives — island resorts & turquoise water',
          body: ['Overwater villas, reefs and white-sand islands a short flight from India — made for honeymoons and slow, quiet holidays.'],
          list: ['Overwater villas', 'Snorkelling & reefs', 'Island-hopping'],
        },
        {
          id: 'thailand',
          heading: 'Thailand — city lights & island days',
          body: ['Bangkok’s temples and markets, then the islands of Phuket and Krabi — great value, great food and something for every age.'],
          list: ['Bangkok city tours', 'Phuket & Phi Phi islands', 'Krabi beaches'],
        },
        {
          id: 'malaysia-singapore',
          heading: 'Malaysia & Singapore — two countries, one easy trip',
          body: ['Kuala Lumpur’s towers, the islands of Langkawi and Singapore’s gardens and waterfront — a popular combination, especially for families.'],
          list: ['Petronas Twin Towers', 'Langkawi islands', 'Gardens by the Bay & Sentosa'],
        },
        {
          id: 'azerbaijan',
          heading: 'Azerbaijan — the land of fire',
          body: ['Baku’s walled Old City and Flame Towers on the Caspian, then the mountains of Gabala — a fresh, increasingly popular choice from India.'],
          list: ['Baku Old City', 'Flame Towers & the boulevard', 'Gabala mountains'],
        },
        {
          id: 'europe',
          heading: 'Europe — classic tours, planned your way',
          body: ['From Paris and the Swiss Alps to Italy and beyond — itineraries, Schengen visa guidance, flights and hotels arranged together.'],
          list: ['Paris & the Swiss Alps', 'Schengen visa guidance', 'Flights, hotels & rail in one plan'],
          link: { to: '/destinations', label: 'Explore all destinations' },
        },
      ],
    },
    steps: [
      { title: 'Share your idea', text: 'Where you would like to go, when, and who is travelling.' },
      { title: 'Get a plan', text: 'An itinerary with flights, stays, transfers and activities.' },
      { title: 'Fine-tune', text: 'Adjust days, hotels and experiences until it fits.' },
      { title: 'Enjoy the trip', text: 'Travel with documents ready and support a message away.' },
    ],
    faqs: [
      { q: 'Which holiday destinations do you offer from Hyderabad?', a: 'Dubai, Türkiye, the Maldives, Thailand, Malaysia & Singapore, Azerbaijan and Europe are our most requested — and we plan other destinations on request.' },
      { q: 'Can you customise a holiday package?', a: 'Yes. Every plan can be adjusted — dates, hotels, activities and pace.' },
      { q: 'Do you help with visas for holidays?', a: 'Yes. We guide you through the visa process for your destination — including Schengen visas for Europe — as part of the plan. Visa decisions rest with the embassy.' },
      { q: 'Can you arrange halal or vegetarian food?', a: 'We consider halal, vegetarian and other food needs while choosing hotels and planning meals.' },
      { q: 'Do you plan honeymoon trips?', a: 'Yes — thoughtful plans for couples, at a relaxed pace. The Maldives, Türkiye and Europe are popular honeymoon choices.' },
      { q: 'How much does a holiday package cost?', a: 'It depends on the destination, dates, hotels and number of travellers. Share your plan and we will send options.' },
    ],
    related: ['holiday-packages', 'air-ticketing', 'hotel-bookings'],
    cta: { accent: 'your holiday', lead: `Tell us where you would like to go — ${contact.person} or our team will send options on WhatsApp.` },
  },
]

export const seoPages = PAGES.map((p) => ({ ...seoLinkBySlug[p.slug], ...p }))
export const seoPageBySlug = Object.fromEntries(seoPages.map((p) => [p.slug, p]))
/** FAQ lists by slug, for the structured data written by scripts/seo-build.mjs. */
export const seoFaqs = Object.fromEntries(seoPages.map((p) => [p.slug, p.faqs]))
