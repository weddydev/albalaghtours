// Single source of truth for all copy, contact details and placeholders.
// Anything marked `TODO: confirm with client` is a placeholder and must be
// verified by Al Balagh Tours & Travels before going live.

export const brand = {
  name: 'Al Balagh Tours & Travels',
  short: 'Al Balagh',
  tagline: 'Tours & Travels',
}

export const contact = {
  person: 'Mohammed Shafi',
  phones: [
    { label: '+91 90302 29940', href: 'tel:+919030229940' },
    { label: '+91 90305 86777', href: 'tel:+919030586777' },
  ],
  whatsappNumber: '919030229940',
  address: {
    lines: [
      'S.No. F12, Mawin Zam Zam Plaza,',
      'Opposite Old Prince Hotel, Mehdipatnam,',
      'Hyderabad – 500 028, Telangana',
    ],
    full: 'S.No. F12, Mawin Zam Zam Plaza, Opposite Old Prince Hotel, Mehdipatnam, Hyderabad – 500 028, Telangana',
  },
  role: 'Travel consultant', // TODO: confirm with client — Mohammed Shafi's title
  photo: '/images/team-shafi.jpg',
  // second office — no street address or extra numbers until the client provides them
  branch: { city: 'Vijayawada', area: 'Panja Center', note: 'Also at our Vijayawada office (Panja Center)' },
  since: 'Serving travellers since 2016', // TODO: confirm with client (applies to Hyderabad office too?)
}

export const waLink = (text = 'Hello, I would like to enquire about your services.') =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`

// Prefilled WhatsApp text for the two pilgrimage programmes (client wording).
export const enquiry = {
  hajj: 'Hello Al Balagh Tours. Please share the Hajj 2027 package details, total price, dates and hotel arrangements.',
  umrah:
    'Hello. Please share details of your Ziyarath Special Umrah group, including departure dates, duration, price, availability and Riyazul Jannah arrangements.',
}

/** Programme enquiry text; the hero search choices are appended only when the visitor gave them. */
export const enquiryText = (type, { month, travellers } = {}) =>
  [enquiry[type], month && `Preferred departure month: ${month}.`, travellers && `Travellers: ${travellers}.`].filter(Boolean).join(' ')

/* Hero trip planner: the kinds of trip a visitor can ask about. */
export const tripTypes = [
  { id: 'holiday', label: 'Holiday package', icon: 'palm' },
  { id: 'flights', label: 'Flights only', icon: 'plane' },
  { id: 'visa', label: 'Visa assistance', icon: 'stamp' },
  { id: 'hotel', label: 'Hotel stay', icon: 'bed' },
  { id: 'business', label: 'Business trip', icon: 'briefcase' },
  { id: 'umrah', label: 'Umrah / Hajj', icon: 'globe' },
]

/** WhatsApp text from the hero trip planner; only the details the visitor gave are mentioned. */
export const tripEnquiry = ({ destination, type, month, travellers } = {}) => {
  const kind = tripTypes.find((t) => t.id === type)?.label.toLowerCase() ?? 'trip'
  const where = destination?.trim()
  return [
    `Hello Al Balagh Tours. I would like help planning a ${kind}${where ? ` to ${where}` : ''}.`,
    month && `Preferred departure: ${month}.`,
    travellers && `Travellers: ${travellers}.`,
  ]
    .filter(Boolean)
    .join(' ')
}
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Mawin Zam Zam Plaza, Opposite Old Prince Hotel, Mehdipatnam, Hyderabad, Telangana 500028',
)}`

// `to` is a route; Services opens the mega-menu (and falls back to the home section).
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/#services', mega: true },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Packages', to: '/packages' },
  { label: 'Guest Experiences', short: 'Reviews', to: '/#reviews' }, // `short` is used where the bar is narrow
  { label: 'Contact', to: '/contact' },
]

/* ------------------------------------------------------------------------------------------
 * SERVICES — one object per service; drives the home Services grid AND /services/:slug pages.
 * `title` uses the client's business-card wording. Copy is deliberately generic: no fees,
 * processing times, success rates or approvals are promised anywhere.
 * `heading.lines` + `heading.accent` (index of the gold accent line) build the detail-page title.
 * Display order is set by SERVICE_ORDER below the list.
 * `motif` picks the floating SVG on the detail page; `tone` tints the image fallback.
 * ---------------------------------------------------------------------------------------- */
const SERVICE_LIST = [
  {
    slug: 'haj-umrah',
    title: 'Haj & Umrah Packages',
    short: 'Hajj 2027 and the Ziyarath Special Umrah group — thoughtful dining, laundry, Ziyarath and private Hajj transfers.',
    subs: ['Hajj 2027 programme', 'Ziyarath Special Umrah group', 'Private bus during the days of Hajj', 'Direct Umrah flights from Hyderabad'],
    icon: 'kaaba',
    motif: 'kaaba',
    tone: 'night',
    image: '/images/services/haj-umrah.webp',
    kicker: 'Hajj 2027 · Ziyarath Special Umrah',
    heading: { lines: ['Haj &', 'Umrah'], accent: 1 },
    intro:
      'Two programmes, planned with care: Hajj 2027 with private transfers during the days of Hajj, and a Ziyarath Special Umrah group with direct flights.',
    long: [
      'Prepare for your Hajj with thoughtful dining, laundry, Ziyarath and private bus arrangements during the days of Hajj.',
      'Or join Al Balagh Tours for a special Umrah group with direct flights, Makkah and Madinah stays, and an extended Ziyarath programme.',
    ],
    offer: [
      { icon: 'utensils', title: 'Thoughtful dining', text: 'A platinum Indian set menu on Hajj; Hyderabadi buffet meals with tea three times on the Umrah group.' },
      { icon: 'shirt', title: 'Laundry', text: 'Unlimited laundry on Hajj; laundry services in Makkah and Madinah on the Umrah group.' },
      { icon: 'luggage', title: 'Hajj & baggage kits', text: 'A premium Hajj kit for your pilgrimage, and a baggage kit for the Umrah group.' },
      { icon: 'mosque', title: 'Riyazul Jannah', text: 'Separate permit arrangements for men and women on Hajj, subject to availability.' },
      { icon: 'mapPin', title: 'Ziyarath', text: 'Makkah, Madinah and Taif on Hajj, and an extra Madinah Ziyarath on the Umrah group.' },
      { icon: 'bus', title: 'Transfers & flights', text: 'Private buses during the 5 days of Hajj; direct Hyderabad–Jeddah and Madinah–Hyderabad Umrah flights.' },
    ],
    steps: [
      { title: 'Choose your journey', text: 'Hajj 2027 or the Ziyarath Special Umrah group — tell us which one you are planning.' },
      { title: 'Get the details', text: 'The office confirms the total price, dates, hotel arrangements and final booking terms.' },
      { title: 'Submit documents', text: 'For Hajj: original passport, PAN card, Aadhaar card and a passport-size photograph.' },
      { title: 'Prepare to travel', text: 'For Hajj, the day-by-day itinerary and dos and don’ts are shared two weeks before departure.' },
    ],
    documentsTitle: 'Documents for Hajj 2027',
    documentsNote: 'Contact the office for submission instructions and document checks.',
    documents: ['Original passport', 'PAN card', 'Aadhaar card', 'Passport-size photograph'],
    faqs: [
      { q: 'When does the Umrah group depart?', a: 'Contact the office for upcoming departure dates, duration and availability.' },
      { q: 'Which flight routes are included?', a: 'Direct Hyderabad–Jeddah and Madinah–Hyderabad flights. Ask the team for airline, timing and baggage allowance.' },
      { q: 'What is the package price?', a: 'Contact the office for the current total price, room-sharing options and complete inclusions and exclusions.' },
      { q: 'How do I book Hajj 2027?', a: 'Contact the office for the total package price, travel dates, hotel arrangements and final booking terms.' },
      {
        q: 'How can I enquire?',
        a: 'Call +91 90302 29940 or +91 90305 86777, or use the WhatsApp button. Offices: Hyderabad (Mehdipatnam) and Vijayawada (Panja Center).',
      },
    ],
    related: ['air-ticketing', 'visa-services', 'hotel-bookings'],
    whatsapp: 'Hello Al Balagh Tours. Please share details of your Hajj 2027 and Ziyarath Special Umrah programmes.',
  },
  {
    // Has its own page (`path`) — the rest of the page copy lives in the `albania` block below.
    // TODO: client to provide Albania content
    slug: 'albania-work-visa',
    path: '/albania-work-visa',
    isNew: true,
    title: 'Albania Work Permit & Job Visa',
    short: 'Guidance for people exploring work in Albania. Details coming soon — contact our team.',
    subs: ['Work permit guidance', 'Job visa enquiries', 'Document checklist', 'Travel from Hyderabad'],
    icon: 'briefcase',
    motif: 'globe',
    tone: 'emerald',
    image: '/images/albania/tirana.webp',
    kicker: 'Albania · Work permit & job visa',
    heading: { lines: ['Albania', 'Work Visa'], accent: 1 },
    intro: 'Details coming soon — contact our team.',
    related: ['visa-services', 'attestation-of-certificates', 'air-ticketing'],
    whatsapp: 'Hello Al Balagh Tours. I would like to enquire about the Albania work permit & job visa.',
  },
  {
    slug: 'air-ticketing',
    // TODO: confirm with client — service scope and wording (generic copy; no fees, timelines or approvals promised)
    title: 'Domestic & International Air Ticketing',
    short: 'Domestic and international flights, booked with the right fares and routes for you.',
    subs: ['Domestic & international fares', 'Group & family bookings', 'Date changes & re-issues', 'Student & business travel'],
    icon: 'plane',
    motif: 'plane',
    tone: 'sky',
    image: '/images/services/air.webp',
    kicker: 'Domestic & International',
    heading: { lines: ['Air', 'Ticketing'], accent: 1 },
    intro: 'One call for the right flight — compared, booked and supported by people who know travel from Hyderabad.',
    long: [
      'We book domestic and international flights for business, family visits, studies and pilgrimage. Tell us where and when you need to fly, and we compare routes and fares across airlines to find an option that suits your schedule and budget.',
      'After booking we stay with you for changes, re-issues and travel questions, so you are never on your own with an airline call centre.',
    ],
    offer: [
      { icon: 'plane', title: 'Domestic flights', text: 'Quick bookings across Indian cities, including last-minute travel.' },
      { icon: 'globe', title: 'International flights', text: 'Routes to the Gulf, Europe, the Americas, Asia and beyond.' },
      { icon: 'users', title: 'Group bookings', text: 'Families, weddings, tour groups and corporate travel.' },
      { icon: 'calendar', title: 'Changes & re-issues', text: 'Help with date changes, cancellations and re-issues as per fare rules.' },
      { icon: 'search', title: 'Fare comparison', text: 'Options across airlines explained clearly, so you can choose.' },
      { icon: 'headset', title: 'Travel support', text: 'Reach us on WhatsApp or phone before and during your trip.' },
    ],
    steps: [
      { title: 'Share your trip', text: 'Destination, dates, number of travellers and any preferences.' },
      { title: 'Compare options', text: 'We send suitable routes and fares with the fare rules explained.' },
      { title: 'Confirm & pay', text: 'Choose an option and we issue your e-ticket.' },
      { title: 'Fly with support', text: 'We help with check-in questions, changes and re-issues.' },
    ],
    documents: [
      'Full name exactly as in the passport / government ID',
      'Passport details for international travel',
      'Valid visa for the destination where required',
      'Contact number and email for ticket delivery',
    ],
    faqs: [
      { q: 'Can you find cheaper fares than the airline websites?', a: 'We compare options across airlines and explain the fare rules, so you can choose the best value for your trip. Fares depend on availability at the time of booking.' },
      { q: 'Do you book group tickets?', a: 'Yes — families, wedding parties, tour and pilgrimage groups, and corporate teams. Share the group size and dates and we will look at options.' },
      { q: 'Can you help if I need to change my date?', a: 'Yes. Changes depend on the airline’s fare rules; we check what is possible and handle the re-issue for you.' },
    ],
    related: ['visa-services', 'travel-insurance', 'hotel-bookings'],
    whatsapp: 'Hello, I would like to book a flight. Please help me with fares.',
  },
  {
    slug: 'holiday-packages',
    // TODO: confirm with client — service scope and wording (generic copy; no fees, timelines or approvals promised)
    title: 'Holiday Package',
    // TODO: confirm with client — destination examples
    short: 'Tailor-made holidays worldwide — Dubai, Türkiye, Southeast Asia, the Maldives and beyond — planned end to end.',
    subs: ['Domestic & international trips', 'Family & honeymoon holidays', 'Hotels, transfers & sightseeing', 'Visas & insurance in one plan'],
    icon: 'palm',
    motif: 'palm',
    tone: 'dusk',
    image: '/images/services/holiday.webp',
    kicker: 'Tailor-made · Worldwide',
    heading: { lines: ['Holiday', 'Packages'], accent: 0 },
    intro: 'Holidays shaped around you — the places, the pace and the food you are comfortable with.',
    long: [
      'Whether it is a family break, a honeymoon or a trip with friends, we put together holidays with flights, hotels, transfers and sightseeing in one plan. We listen to how you like to travel and build the itinerary around it.',
      'We keep food preferences, family needs and the pace you enjoy in mind while planning, and adjust the plan until it feels right.',
    ],
    offer: [
      { icon: 'palm', title: 'Curated itineraries', text: 'Day-by-day plans for popular domestic and international destinations.' },
      { icon: 'bed', title: 'Hotels & stays', text: 'Family-friendly hotels selected for location and comfort.' },
      { icon: 'bus', title: 'Transfers & sightseeing', text: 'Airport transfers and guided or private sightseeing.' },
      { icon: 'heart', title: 'Honeymoon trips', text: 'Thoughtful plans for couples, at a relaxed pace.' },
      { icon: 'utensils', title: 'Food preferences', text: 'Halal, vegetarian and other food needs considered while planning.' },
      { icon: 'headset', title: 'On-trip support', text: 'A team to call if anything changes while you travel.' },
    ],
    steps: [
      { title: 'Share your idea', text: 'Where you would like to go, when, and who is travelling.' },
      { title: 'Get a plan', text: 'We suggest an itinerary with stays, transfers and activities.' },
      { title: 'Fine-tune', text: 'Adjust days, hotels and experiences until it fits.' },
      { title: 'Enjoy the trip', text: 'Travel with documents ready and support a message away.' },
    ],
    documents: [
      'Passport (for international holidays)',
      'Visa, where the destination requires one',
      'Government photo ID (for domestic travel)',
      'Traveller details for all guests',
    ],
    faqs: [
      { q: 'Can you customise a package?', a: 'Yes. Every plan can be adjusted — dates, hotels, activities and pace.' },
      { q: 'Do you arrange visas for holidays?', a: 'We can guide you through the visa process for your destination as part of the plan.' },
      { q: 'Which destinations do you cover?', a: 'Popular domestic and international destinations. Tell us your idea and we will suggest options.' }, // TODO: confirm with client — destination list
    ],
    related: ['air-ticketing', 'hotel-bookings', 'travel-insurance'],
    whatsapp: 'Hello, I am interested in a holiday package. Please share some options.',
  },
  {
    slug: 'visa-services',
    // TODO: confirm with client — service scope and wording (generic copy; no fees, timelines or approvals promised)
    title: 'All Visa Services',
    short: 'Guidance and application support for tourist, visit, business and other visas.',
    subs: ['Tourist & visit visas', 'Business & work visa guidance', 'Form filling & document checks', 'Appointment assistance'],
    icon: 'stamp',
    motif: 'stamp',
    tone: 'emerald',
    image: '/images/services/visa.webp',
    kicker: 'All Visa Services',
    heading: { lines: ['Visa', 'Services'], accent: 0 },
    intro: 'Clear guidance on what your visa needs, careful paperwork, and help at every step of the application.',
    long: [
      'We help travellers prepare visa applications for many countries — tourist, family visit, business and other categories. We explain the requirements, check your documents, help with forms and assist with appointments where the process needs one.',
      'Visa decisions always rest with the embassy or consulate. Our role is to help you submit a complete, well-prepared application.',
    ],
    offer: [
      { icon: 'stamp', title: 'Tourist & visit visas', text: 'Support for holiday and family-visit applications.' },
      { icon: 'globe', title: 'Business visas', text: 'Guidance for business trips, meetings and events.' },
      { icon: 'certificate', title: 'Document checks', text: 'We review your documents against the published checklist.' },
      { icon: 'passport', title: 'Form filling', text: 'Help completing online and paper application forms.' },
      { icon: 'calendar', title: 'Appointments', text: 'Assistance booking submission and biometric appointments.' },
      { icon: 'headset', title: 'Status updates', text: 'Help tracking your application where tracking is available.' },
    ],
    steps: [
      { title: 'Tell us the trip', text: 'Country, purpose of travel and your travel dates.' },
      { title: 'Get the checklist', text: 'We share the documents typically needed for that visa type.' },
      { title: 'Prepare & apply', text: 'We help with forms, photos and appointment booking.' },
      { title: 'Track & collect', text: 'We help you follow up until your passport is returned.' },
    ],
    documents: [
      'Passport with sufficient validity and blank pages',
      'Recent photographs as per the country’s specifications',
      'Bank statements or proof of funds',
      'Travel itinerary, ticket and hotel details',
      'Invitation or employment letters where applicable',
    ],
    faqs: [
      { q: 'Can you guarantee my visa?', a: 'No one can guarantee a visa — the decision belongs to the embassy or consulate. We help you prepare a complete and accurate application.' },
      { q: 'How long does a visa take?', a: 'It depends on the country, visa type and season. We will tell you the currently published timelines when you enquire.' },
      { q: 'Which countries do you handle?', a: 'Many popular destinations. Message us the country and purpose of travel and we will confirm how we can help.' }, // TODO: confirm with client — country list
    ],
    related: ['vfs-appointments', 'passport-services', 'travel-insurance'],
    whatsapp: 'Hello, I need help with a visa application.',
  },
  {
    slug: 'immigration-services',
    // TODO: confirm with client — service scope and wording (generic copy; no fees, timelines or approvals promised)
    title: 'Immigration Services',
    short: 'Guidance on documents and processes for moving abroad for work, study or family.',
    subs: ['Work, study & family pathways', 'Document preparation', 'Application guidance', 'Pre-departure support'],
    icon: 'globe',
    motif: 'globe',
    tone: 'sky',
    image: '/images/services/immigration.webp',
    kicker: 'Work · Study · Family',
    heading: { lines: ['Immigration', 'Services'], accent: 0 },
    intro: 'Moving abroad is a big step. We help you understand the process and prepare your paperwork properly.',
    long: [
      'We guide individuals and families who are planning to move abroad for work, study or to join family. We help you understand the general process, organise your documents and prepare applications carefully.',
      'Immigration rules change and decisions rest with the relevant authorities. For legal advice on complex cases, we recommend consulting a licensed immigration professional.', // TODO: confirm with client — scope of immigration services
    ],
    offer: [
      { icon: 'globe', title: 'Pathway guidance', text: 'An overview of common routes for work, study and family moves.' },
      { icon: 'certificate', title: 'Document preparation', text: 'Organising certificates, translations and attestations.' },
      { icon: 'passport', title: 'Application support', text: 'Help completing forms and preparing submissions.' },
      { icon: 'calendar', title: 'Appointments', text: 'Assistance with biometrics and submission appointments.' },
      { icon: 'plane', title: 'Pre-departure help', text: 'Flights, insurance and travel planning for your move.' },
      { icon: 'headset', title: 'Ongoing support', text: 'Answers to your questions as your application progresses.' },
    ],
    steps: [
      { title: 'Discuss your goal', text: 'Where you want to go and why — work, study or family.' },
      { title: 'Plan the paperwork', text: 'We outline the documents usually involved for your route.' },
      { title: 'Prepare & submit', text: 'We help you assemble and submit a complete application.' },
      { title: 'Get ready to fly', text: 'Flights, insurance and pre-departure planning.' },
    ],
    documents: [
      'Valid passport',
      'Educational certificates and transcripts',
      'Experience and employment letters',
      'Attested / translated documents where required',
      'Proof of funds and supporting financial documents',
    ],
    faqs: [
      { q: 'Do you provide legal immigration advice?', a: 'We provide document and process guidance. For legal advice on complex cases we recommend a licensed immigration professional.' }, // TODO: confirm with client
      { q: 'Can you help with document attestation too?', a: 'Yes — we also offer attestation of certificates, which many immigration processes require.' },
      { q: 'Which countries can you help with?', a: 'Message us your destination and goal, and we will confirm how we can help.' },
    ],
    related: ['attestation-of-certificates', 'visa-services', 'vfs-appointments'],
    whatsapp: 'Hello, I would like guidance on immigration services.',
  },
  {
    slug: 'passport-services',
    // TODO: confirm with client — service scope and wording (generic copy; no fees, timelines or approvals promised)
    title: 'Passport Services',
    short: 'Help with new passports, renewals and corrections — forms, documents and appointments.',
    subs: ['New passport applications', 'Renewals & re-issues', 'Corrections & updates', 'Appointment assistance'],
    icon: 'passport',
    motif: 'passport',
    tone: 'emerald',
    image: '/images/services/passport.webp',
    kicker: 'New · Renewal · Re-issue',
    heading: { lines: ['Passport', 'Services'], accent: 0 },
    intro: 'Getting or renewing a passport is easier with someone who checks every field and document with you.',
    long: [
      'We assist with fresh passport applications, renewals and re-issues, as well as corrections to personal details. We help you fill the online form correctly, prepare the right documents and book an appointment.',
      'Passports are issued by the government passport authority; we help you prepare a complete application.',
    ],
    offer: [
      { icon: 'passport', title: 'New passports', text: 'Guidance for first-time applicants, adults and minors.' },
      { icon: 'calendar', title: 'Renewals & re-issue', text: 'Help renewing expiring or full passports.' },
      { icon: 'certificate', title: 'Corrections', text: 'Support for name, address and other detail updates.' },
      { icon: 'search', title: 'Form checks', text: 'We review your online form before submission.' },
      { icon: 'calendar', title: 'Appointment help', text: 'Assistance booking your passport office appointment.' },
      { icon: 'headset', title: 'Status follow-up', text: 'Help checking your application status.' },
    ],
    steps: [
      { title: 'Tell us what you need', text: 'New passport, renewal or correction.' },
      { title: 'Gather documents', text: 'We share a checklist for your application type.' },
      { title: 'Apply & book', text: 'We help fill the form and book the appointment.' },
      { title: 'Visit & track', text: 'Attend your appointment; we help you track the status.' },
    ],
    documents: [
      'Proof of address',
      'Proof of date of birth',
      'Government photo ID (e.g. Aadhaar, PAN)',
      'Old passport (for renewal / re-issue)',
      'Supporting documents for any changes requested',
    ],
    faqs: [
      { q: 'How long does it take to get a passport?', a: 'Timelines are set by the passport authority and can vary. We will share the current guidance when you apply.' },
      { q: 'Can you help with a minor’s passport?', a: 'Yes. Minors need some additional documents from parents — we will give you the checklist.' },
      { q: 'Do I need to visit the passport office?', a: 'Most applicants attend an appointment in person. We help you book it and prepare.' },
    ],
    related: ['visa-services', 'vfs-appointments', 'attestation-of-certificates'],
    whatsapp: 'Hello, I need help with a passport application.',
  },
  {
    slug: 'travel-insurance',
    // TODO: confirm with client — service scope and wording (generic copy; no fees, timelines or approvals promised)
    title: 'Travel Insurance',
    short: 'Travel cover options for holidays, pilgrimage, study and business trips.',
    subs: ['Single-trip cover', 'Family & senior options', 'Student & business travel', 'Help choosing a plan'],
    icon: 'shield',
    motif: 'shield',
    tone: 'emerald',
    image: '/images/services/insurance.webp',
    kicker: 'Travel with peace of mind',
    heading: { lines: ['Travel', 'Insurance'], accent: 1 },
    intro: 'Travel cover arranged alongside your trip, with the policy terms explained in plain language.',
    long: [
      'We help you choose travel insurance from insurance providers for holidays, pilgrimage, study and business travel. We explain the main features of each plan so you can pick cover that fits your trip and the destination’s requirements.',
      'Policies are issued by the insurer, and claims are governed by the policy terms. Always read the policy wording before you travel.',
    ],
    offer: [
      { icon: 'shield', title: 'Single-trip plans', text: 'Cover for one journey, matched to your dates.' },
      { icon: 'users', title: 'Family & seniors', text: 'Options for families and older travellers.' }, // TODO: confirm with client — insurer partners
      { icon: 'globe', title: 'Student & business', text: 'Plans for study abroad and work trips.' },
      { icon: 'search', title: 'Plan comparison', text: 'Key benefits and exclusions explained clearly.' },
      { icon: 'stamp', title: 'Visa requirements', text: 'Help choosing cover that meets visa conditions.' },
      { icon: 'headset', title: 'Claim guidance', text: 'Help understanding the insurer’s claim process.' },
    ],
    steps: [
      { title: 'Share trip details', text: 'Destination, dates, ages of travellers and purpose.' },
      { title: 'Compare plans', text: 'We explain suitable plans and their main terms.' },
      { title: 'Buy your policy', text: 'The insurer issues your policy document.' },
      { title: 'Travel covered', text: 'Keep your policy handy and call us with questions.' },
    ],
    documents: ['Passport details', 'Travel dates and destination', 'Date of birth of each traveller', 'Any details the insurer requests'],
    faqs: [
      { q: 'Is travel insurance required for my visa?', a: 'Some countries require it. We help you pick cover that meets the published requirement for your visa.' },
      { q: 'Who handles claims?', a: 'Claims are handled by the insurer under the policy terms. We can guide you on the process.' },
      { q: 'Can seniors get travel insurance?', a: 'Many insurers offer plans for older travellers. We will show you suitable options.' },
    ],
    related: ['air-ticketing', 'visa-services', 'holiday-packages'],
    whatsapp: 'Hello, I would like a travel insurance quote.',
  },
  {
    slug: 'hotel-bookings',
    title: 'Hotel Bookings',
    // TODO: confirm with client — hotel booking scope; copy kept deliberately generic
    short: 'Hotels and resorts worldwide — city breaks, beach stays, family trips and pilgrimage — booked around your plans.',
    subs: ['Hotels & resorts worldwide', 'City & beach stays', 'Family & group stays', 'Makkah & Madinah hotels'],
    icon: 'bed',
    motif: 'hotel',
    tone: 'dusk',
    image: '/images/services/hotel.webp',
    kicker: 'Worldwide · Resorts · City stays',
    heading: { lines: ['Hotel', 'Bookings'], accent: 0 },
    intro: 'Tell us where you are going and what you need — we help you find and book a suitable stay.',
    long: [
      'We help holidaymakers, families, business travellers and pilgrims book hotel stays around the world. We look at location, room type and your budget with you.',
      'We share your booking details with you and remain available for any changes.',
    ],
    offer: [
      { icon: 'globe', title: 'Hotels worldwide', text: 'City hotels and resorts for holidays, family visits and business trips.' },
      { icon: 'bed', title: 'Family rooms', text: 'Room types for families, subject to the hotel’s availability.' },
      { icon: 'mapPin', title: 'Makkah & Madinah stays', text: 'Hotel bookings for pilgrims travelling to Makkah and Madinah.' },
      { icon: 'users', title: 'Group bookings', text: 'Rooms for groups travelling together.' },
      { icon: 'utensils', title: 'Meal options', text: 'Meal options as offered by each hotel.' },
      { icon: 'headset', title: 'Changes & support', text: 'Help with amendments and special requests.' },
    ],
    steps: [
      { title: 'Share your stay', text: 'City, dates, number of rooms and guests.' },
      { title: 'Pick a hotel', text: 'We send options with location and room details.' },
      { title: 'Confirm', text: 'We book and send your confirmation.' },
      { title: 'Check in', text: 'Arrive with your voucher — we are a message away.' },
    ],
    documents: ['Guest names as in the passport / ID', 'Passport copy for international stays', 'Contact details', 'Special requests (accessibility, beds, meals)'],
    faqs: [
      { q: 'Can you book only a hotel, without a package?', a: 'Yes, we book hotels on their own as well as within packages.' },
      { q: 'How close are the Makkah hotels to the Haram?', a: 'It depends on the hotel. Each option we share mentions its approximate distance so you can compare.' },
      { q: 'Can I request a specific room type?', a: 'Yes. Requests are subject to the hotel’s availability, and we will confirm what is possible.' },
    ],
    related: ['holiday-packages', 'air-ticketing', 'haj-umrah'],
    whatsapp: 'Hello, I would like to book a hotel.',
  },
  {
    // Listed on the client's other site as "Private Transfers — Jeddah · Makkah · Madinah".
    // TODO: confirm with client — no fleet size, brands, seats, Wi-Fi, ratings or prices are claimed
    slug: 'private-transfers',
    title: 'Private Transfers',
    short: 'Luxury, fully air-conditioned coaches with comfortable seating — Jeddah · Makkah · Madinah.',
    subs: ['Jeddah · Makkah · Madinah', 'Luxury coaches', 'Fully air-conditioned', 'Comfortable seating'],
    icon: 'bus',
    motif: 'bus',
    tone: 'sand',
    image: '/images/transport/bus-1.webp',
    kicker: 'Jeddah · Makkah · Madinah',
    heading: { lines: ['Private', 'Transfers'], accent: 1 },
    intro: 'Luxury, fully air-conditioned coaches with comfortable seating, for transfers between Jeddah, Makkah and Madinah.',
    long: [
      'Travel between Jeddah, Makkah and Madinah in luxury coaches that are fully air-conditioned, with comfortable seating.',
      'On our Hajj 2027 programme, private buses take pilgrims through the 5 days of Hajj — see the transfer timeline on the Haj & Umrah page.',
    ],
    features: [
      { icon: 'bus', label: 'Luxury coaches' },
      { icon: 'sparkle', label: 'Fully air-conditioned' },
      { icon: 'users', label: 'Comfortable seating' },
    ],
    routes: ['Jeddah', 'Makkah', 'Madinah'],
    // Gallery — representative photos of luxury AC coaches (TODO: client to supply licensed / own photos)
    coaches: [1, 2].map((n) => ({ src: `/images/transport/bus-${n}.webp`, alt: `Luxury air-conditioned coach — photo ${n}`, caption: 'Luxury AC coach' })),
    offer: [
      { icon: 'bus', title: 'Luxury coaches', text: 'Coaches for transfers between Jeddah, Makkah and Madinah.' },
      { icon: 'sparkle', title: 'Fully air-conditioned', text: 'Every coach is fully air-conditioned.' },
      { icon: 'users', title: 'Comfortable seating', text: 'Comfortable seating for the journey between the cities.' },
      { icon: 'mapPin', title: 'Jeddah · Makkah · Madinah', text: 'Transfers on the routes between the three cities.' },
      { icon: 'kaaba', title: 'Hajj private bus', text: 'Private bus transfers during the 5 days of Hajj on our Hajj 2027 programme.' },
      { icon: 'headset', title: 'Booking help', text: 'Share your dates and route — the office confirms the details.' },
    ],
    steps: [
      { title: 'Share your trip', text: 'Your route, date, preferred time and number of passengers.' },
      { title: 'Get the details', text: 'The office confirms availability and the price for your transfer.' },
      { title: 'Confirm', text: 'Your transfer is booked and the details are shared with you.' },
      { title: 'Travel', text: 'Meet your coach at the agreed pickup point.' },
    ],
    documentsTitle: 'Details we will ask for',
    documentsNote: 'Share these on WhatsApp and the office will confirm your transfer.',
    documents: ['Route and travel date', 'Preferred pickup time', 'Pickup and drop-off points', 'Number of passengers and bags'],
    faqs: [
      { q: 'Which routes do you cover?', a: 'Jeddah, Makkah and Madinah. Ask the team about your exact pickup and drop-off points.' },
      { q: 'Are the coaches air-conditioned?', a: 'Yes — the coaches are fully air-conditioned, with comfortable seating.' },
      { q: 'What does a transfer cost?', a: 'Contact the office for the current price for your route, date and group size.' },
      { q: 'Are transfers part of your Hajj programme?', a: 'Yes. Hajj 2027 includes private bus transfers during the 5 days of Hajj — see the transfer timeline on the Haj & Umrah page.' },
    ],
    related: ['haj-umrah', 'hotel-bookings', 'air-ticketing'],
    whatsapp: 'Hello Al Balagh Tours. I would like details of your private transfers (Jeddah · Makkah · Madinah).',
  },
  {
    slug: 'attestation-of-certificates',
    // TODO: confirm with client — service scope and wording (generic copy; no fees, timelines or approvals promised)
    title: 'Attestation of Certificates',
    short: 'Help with attestation of educational, personal and commercial documents for use abroad.',
    subs: ['Educational certificates', 'Personal documents', 'Commercial documents', 'Embassy attestation guidance'],
    icon: 'certificate',
    motif: 'certificate',
    tone: 'sand',
    image: '/images/services/attestation.webp',
    kicker: 'Educational · Personal · Commercial',
    heading: { lines: ['Attestation', 'of Certificates'], accent: 0 },
    intro: 'Documents for use abroad often need attestation. We help you understand the steps and get them done.',
    long: [
      'Many countries require Indian documents to be attested before they are accepted for work, study, residence or business. We help with educational certificates, personal documents such as birth and marriage certificates, and commercial documents.',
      'The exact attestation route depends on the document and the destination country. We explain the route for your case and keep you updated as it progresses.', // TODO: confirm with client — attestation scope
    ],
    offer: [
      { icon: 'certificate', title: 'Educational certificates', text: 'Degrees, diplomas and mark sheets.' },
      { icon: 'users', title: 'Personal documents', text: 'Birth, marriage and other personal certificates.' },
      { icon: 'stamp', title: 'Commercial documents', text: 'Company and trade documents for business use.' },
      { icon: 'globe', title: 'Embassy attestation', text: 'Guidance on embassy attestation for your destination.' },
      { icon: 'search', title: 'Document review', text: 'We check your documents before they are submitted.' },
      { icon: 'headset', title: 'Status updates', text: 'We keep you informed at each stage.' },
    ],
    steps: [
      { title: 'Share your documents', text: 'Tell us the documents and the destination country.' },
      { title: 'Know the route', text: 'We explain which attestations your case needs.' },
      { title: 'Submit', text: 'We help you submit the documents for each stage.' },
      { title: 'Collect', text: 'Receive your attested documents back.' },
    ],
    documents: ['Original certificates', 'Passport copy', 'Supporting documents such as mark sheets', 'Authorisation letter where required'],
    faqs: [
      { q: 'Which documents can be attested?', a: 'Educational, personal and commercial documents are commonly attested. Tell us your document and we will confirm.' },
      { q: 'How long does attestation take?', a: 'It depends on the document type and the stages involved. We will explain the expected steps when you enquire.' },
      { q: 'Do you need my original certificates?', a: 'Attestation is usually done on original documents. We will tell you exactly what is needed for your case.' },
    ],
    related: ['immigration-services', 'visa-services', 'passport-services'],
    whatsapp: 'Hello, I need my certificates attested.',
  },
  {
    slug: 'vfs-appointments',
    // TODO: confirm with client — service scope and wording (generic copy; no fees, timelines or approvals promised)
    title: 'VFS Appointments',
    short: 'Help booking visa application centre appointments and preparing for the visit.',
    subs: ['Appointment booking help', 'Document checklist', 'Form & photo checks', 'Pre-visit guidance'],
    icon: 'calendar',
    motif: 'calendar',
    tone: 'night',
    image: '/images/services/vfs.webp',
    kicker: 'Visa application centres',
    heading: { lines: ['VFS', 'Appointments'], accent: 0 },
    intro: 'Book your visa application centre appointment with help, and arrive with everything in order.',
    long: [
      'Many embassies accept visa applications through visa application centres such as VFS Global. We help you book an appointment, prepare your forms and documents, and understand what to expect on the day.',
      'Appointment availability is set by the centre. We are an independent travel agency and not part of VFS Global or any embassy.', // TODO: confirm with client
    ],
    offer: [
      { icon: 'calendar', title: 'Appointment booking', text: 'Help finding and booking an available slot.' },
      { icon: 'certificate', title: 'Document checklist', text: 'A checklist matched to your visa type.' },
      { icon: 'passport', title: 'Form & photo checks', text: 'We review forms and photo specifications.' },
      { icon: 'search', title: 'Pre-visit briefing', text: 'What to carry and what happens at the centre.' },
      { icon: 'stamp', title: 'Visa support', text: 'Pair with our visa services for full application help.' },
      { icon: 'headset', title: 'Follow-up', text: 'Help tracking your application after submission.' },
    ],
    steps: [
      { title: 'Tell us your visa', text: 'Country, visa type and your preferred dates.' },
      { title: 'Prepare documents', text: 'We share the checklist and review your file.' },
      { title: 'Book the slot', text: 'We help book an available appointment.' },
      { title: 'Attend & track', text: 'Visit the centre prepared and track your application.' },
    ],
    documents: ['Passport', 'Completed application form', 'Photographs as per specifications', 'Supporting documents for your visa type', 'Appointment confirmation'],
    faqs: [
      { q: 'Are you VFS Global?', a: 'No. We are an independent travel agency that helps you book and prepare for appointments.' },
      { q: 'Can you get an earlier appointment?', a: 'Slots are released by the centre. We help you find and book what is available.' },
      { q: 'What should I carry to the centre?', a: 'Your passport, appointment confirmation, forms, photos and supporting documents. We will share a full checklist.' },
    ],
    related: ['visa-services', 'passport-services', 'travel-insurance'],
    whatsapp: 'Hello, I need help booking a VFS appointment.',
  },
]

// Display order: international travel first; Haj & Umrah remains one of the core services.
const SERVICE_ORDER = [
  'holiday-packages',
  'air-ticketing',
  'visa-services',
  'hotel-bookings',
  'haj-umrah',
  'immigration-services',
  'passport-services',
  'travel-insurance',
  'albania-work-visa',
  'private-transfers',
  'attestation-of-certificates',
  'vfs-appointments',
]
export const services = SERVICE_ORDER.map((slug) => SERVICE_LIST.find((s) => s.slug === slug)).filter(Boolean)

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]))
/** Link to a service: its own page when it has one (Albania), else /services/:slug. */
export const servicePath = (s) => s.path ?? `/services/${s.slug}`

/* ------------------------------------------------------------------------------------------
 * PHOTO CREDITS — all from Unsplash (Unsplash License: free for commercial use, no attribution
 * required). Each file has a "-640" variant. Unsplash photo IDs of the images in use, for reference:
 *   packages/hajj-premium 1780265861345 (Hajj 2027) · umrah-standard 1646424857576 (Umrah group)
 *   hotel-3 1631049307264 (Makkah stay) · hotel-6 1621293954908 (Madinah stay) — representative only
 *   madinah 1591604129939 · makkah-clocktower 1643134974035
 *   services/air 1762486979891 · haj-umrah 1605553378313 · holiday 1530789253388 · visa 1655722725332
 *   services/immigration 1786852448829 · passport 1454496406107 · insurance 1763618769707
 *   services/hotel 1785910723802 · attestation 1619418602850 · vfs 1633526543814
 * TODO: confirm with client — swap in the agency's own photos of the actual hotels when available.
 * ---------------------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------------------------
 * PILGRIMAGE PROGRAMMES — the client's own Hajj 2027 and Umrah programme (the Hyderabad and
 * Vijayawada offices run the same services). Facts are kept exactly as the client gave them;
 * anything they did not list (price, dates, duration, airline, Hajj hotels) reads "contact the
 * office". Drives Featured Journeys, the package modal, "at a glance", the Hotels page and
 * /services/haj-umrah.
 * ---------------------------------------------------------------------------------------- */
const HAJJ = {
  id: 'hajj-2027',
  type: 'hajj',
  season: 'Hajj programme',
  name: 'Hajj 2027',
  badge: 'Hajj 2027',
  tagline: 'A sacred calling. A journey of a lifetime.',
  intro: 'Prepare for your Hajj with thoughtful dining, laundry, Ziyarath and private bus arrangements during the days of Hajj.',
  image: '/images/packages/hajj-premium.webp',
  price: 'Contact the office for price', // TODO: confirm with client
  dates: 'Contact the office for dates', // TODO: confirm with client
  // short labels for cards and chips
  highlights: [
    { icon: 'utensils', label: 'Platinum Indian dining' },
    { icon: 'shirt', label: 'Unlimited laundry' },
    { icon: 'luggage', label: 'Premium Hajj kit' },
    { icon: 'mosque', label: 'Riyazul Jannah permits' },
    { icon: 'mapPin', label: 'Ziyarath in Makkah, Madinah & Taif' },
    { icon: 'bus', label: 'Private bus during Hajj' },
  ],
  inclusions: [
    { icon: 'utensils', title: 'Platinum Indian dining', text: 'A lavish Indian set menu with snacks, fruits, bakery items and juices.' },
    { icon: 'shirt', title: 'Premium laundry', text: 'Unlimited laundry services included in the package.' },
    { icon: 'luggage', title: 'Premium Hajj kit', text: 'A dedicated Hajj kit for your pilgrimage.' },
    { icon: 'mosque', title: 'Riyazul Jannah', text: 'Separate permit arrangements for men and women, subject to availability.' },
    { icon: 'mapPin', title: 'Ziyarath visits', text: 'Ziyarath in Makkah, Madinah and Taif.' },
  ],
  cta: { title: 'Travel with a clear plan', text: 'Speak to our team about your Hajj arrangements and the details you need before booking.' },
  hotels: [],
  hotelsNote: 'Makkah & Madinah hotel details shared by the office at booking', // TODO: confirm with client
  programme: {
    eyebrow: 'Special services',
    title: 'Private bus transfers during the 5 days of Hajj',
    steps: [
      { from: 'Makkah hotel', to: 'Mina camp', text: 'Beginning the Hajj journey' },
      { from: 'Mina', to: 'Arafat' },
      { from: 'Arafat', to: 'Muzdalifah' },
      { from: 'Muzdalifah', to: 'Jamarat' },
      { from: 'Jamarat', to: 'Makkah hotel', text: 'Return to the hotel' },
      { from: 'Tawaf-e-Ziyarath', to: 'Mina camp', text: 'Return transfer to Mina' },
      { from: 'Mina', to: 'Makkah hotel', text: 'Last-day transfer' },
    ],
    note: 'Your detailed day-wise itinerary will be shared before departure. Please plan for walking as well, particularly during the final two days of stoning at Jamarat.',
  },
  booking: 'Contact the office for the total package price, travel dates, hotel arrangements and final booking terms.',
  documents: ['Original passport', 'PAN card', 'Aadhaar card', 'Passport-size photograph'],
  documentsNote: 'Contact the office for submission instructions and document checks.',
  notes: [
    {
      title: 'Before departure & your Umrah',
      points: [
        'A day-by-day itinerary and dos and don’ts are provided two weeks before departure.',
        'One Umrah is included before Hajj, after reaching Aziziya on 5 Dhul Hijjah, per the programme.',
        'Walking is expected, especially during the final two days of stoning at Jamarat, despite the transport arrangements.',
      ],
    },
    {
      title: 'Passport handling & Nusuk card',
      points: [
        'Passports are collected after arrival at the hotels in Makkah and Madinah, per the programme. Confirm the custody, receipt and return procedure with the office.',
        'Confirm the current Nusuk card and ID requirements with the office — do not assume the card replaces a passport for every purpose.',
      ],
    },
    {
      title: 'Early return to India',
      points: ['Hajis who choose to return early for any reason must arrange their own return tickets at their own expense.'],
    },
    {
      title: 'Luggage collection & hotel delivery',
      points: [
        'Checked luggage is transferred to the hotel in Makkah or Madinah using company stickers and hanging tags.',
        'Confirm the arrival and baggage procedure for your flight with the office.',
      ],
    },
    {
      title: 'Packing, tags & tracking',
      points: [
        'Attach the company sticker and hanging tag to each bag and follow the office’s wrapping instructions.',
        'Take clear photos of your packed luggage and labels at check-in.',
        'A luggage tracker is recommended — confirm the device and airline rules.',
        'Check the airline’s baggage and prohibited-item rules. The office’s note flags power banks, cash, gold and coconut; ask the team for item-by-item guidance.',
      ],
    },
    {
      title: 'Luggage responsibility & expenses',
      points: [
        'Responsibility for luggage is the traveller’s. The company can guide you if a bag is missing, and expenses incurred in locating and collecting luggage are borne by the traveller.',
        'Confirm the final written terms before booking.',
      ],
    },
  ],
  whatsapp: enquiry.hajj,
}

const UMRAH = {
  id: 'umrah-ziyarath-special',
  type: 'umrah',
  season: 'Umrah group',
  name: 'Ziyarath Special Umrah',
  badge: 'Ziyarath Special',
  tagline: 'A journey of faith. Memories to treasure.',
  intro: 'Join Al Balagh Tours for a special Umrah group with direct flights, Makkah and Madinah stays, and an extended Ziyarath programme.',
  image: '/images/packages/umrah-standard.webp',
  price: 'Contact the office for price', // TODO: confirm with client
  dates: 'Contact the office for dates', // TODO: confirm with client
  route: {
    label: 'Hyderabad → Jeddah · Madinah → Hyderabad',
    note: 'Both direct flights',
    legs: [
      { from: 'Hyderabad', to: 'Jeddah', label: 'Outbound direct flight' },
      { from: 'Madinah', to: 'Hyderabad', label: 'Return direct flight' },
    ],
  },
  groupNote: 'Please confirm the departure dates, total duration, airline, current availability and complete package price with the office.',
  highlights: [
    { icon: 'utensils', label: 'Hyderabadi buffet meals' },
    { icon: 'bus', label: 'Round-trip transportation' },
    { icon: 'shirt', label: 'Laundry in Makkah & Madinah' },
    { icon: 'luggage', label: 'Baggage kit' },
    { icon: 'kaaba', label: 'Four Umrah arrangements' },
    { icon: 'mapPin', label: 'Extra Madinah Ziyarath' },
  ],
  inclusions: [
    { icon: 'utensils', title: 'Hyderabadi buffet meals', text: 'Buffet meals with tea three times.' },
    { icon: 'bus', title: 'Round-trip transportation', text: 'Included in the programme.' },
    { icon: 'shirt', title: 'Laundry services', text: 'In Makkah and Madinah.' },
    { icon: 'luggage', title: 'Baggage kit', text: 'Included.' },
    { icon: 'kaaba', title: 'Four Umrah arrangements', text: 'Including guidance with a Muallim.' },
    { icon: 'mapPin', title: 'Extra Madinah Ziyarath', text: 'Twelve places in and around Madinah — see the list below.' },
  ],
  // TODO: confirm with client — photos are representative stock images, not the actual hotels
  hotels: [
    { id: 'akaber-al-hijra', city: 'makkah', cityName: 'Makkah', name: 'Akaber Al Hijra', stars: 3, distance: 300, from: 'the Haram', image: '/images/hotel-3.webp' },
    { id: 'diwan-al-madinah', city: 'madinah', cityName: 'Madinah', name: 'Diwan Al Madinah', stars: 3, distance: 150, from: 'Masjid an-Nabawi', image: '/images/hotel-6.webp' },
  ],
  programme: {
    eyebrow: 'Group programme · Ziyarath Special',
    title: 'Four Umrah arrangements',
    steps: [
      { title: 'From India', text: 'With Muallim' },
      { title: 'Joarana', text: 'Umrah arrangement' },
      { title: 'Taif: Meeqat Umrah', text: 'Umrah arrangement' },
      { title: 'Sulh Hudaybiyyah', text: 'Umrah arrangement' },
    ],
    note: 'The office will explain the sequence, guidance and final schedule before departure.',
  },
  ziyarath: {
    title: 'Extra Ziyarath in Madinah',
    places: [
      'Quran Factory',
      'Wadi-e-Aqeeq',
      'Wadi-e-But’haan',
      'Wadi-e-Ranoona',
      'Beer-e-Gars',
      'Beer-e-Yaseera',
      'Beer-e-Osman',
      'Garden Salman Farsi R.A.',
      'Turkey Railway Station',
      'Badr ka Maidan',
      'Jabl-e-Malaika',
      'Wadi-e-Jinn',
    ],
    note: 'Confirm the final itinerary, access and any additional visits with the office.',
  },
  riyazulJannah:
    'Contact the team to confirm the permit and slot arrangements applicable to your booking. Entry remains subject to the applicable permissions and availability.',
  whatsapp: enquiry.umrah,
}

export const packages = { hajj: HAJJ, umrah: UMRAH }
export const programmes = [HAJJ, UMRAH]

/* "Hajj & Umrah at a glance" (Packages page). Only the client's facts; unknowns read "Contact office". */
export const atAGlance = {
  columns: [HAJJ, UMRAH],
  rows: [
    { icon: 'utensils', label: 'Dining', values: ['Platinum Indian set menu', 'Hyderabadi buffet, tea three times'] },
    { icon: 'shirt', label: 'Laundry', values: ['Unlimited laundry', 'In Makkah & Madinah'] },
    { icon: 'luggage', label: 'Kit', values: ['Premium Hajj kit', 'Baggage kit'] },
    { icon: 'mosque', label: 'Riyazul Jannah', values: ['Separate permits for men & women, subject to availability', null] },
    { icon: 'mapPin', label: 'Ziyarath', values: ['Makkah, Madinah & Taif', 'Extra Madinah Ziyarath (12 places)'] },
    { icon: 'bus', label: 'Transport', values: ['Private bus, 5 days of Hajj', 'Round-trip transportation · direct flights'] },
    { icon: 'bed', label: 'Hotels', values: [null, 'Akaber Al Hijra (300\u00a0m) · Diwan Al Madinah (150\u00a0m)'] }, // TODO: confirm with client — Hajj hotels
    { icon: 'certificate', label: 'Documents', values: ['Original passport, PAN, Aadhaar & photo', null] },
  ],
}

export const hero = {
  // Headline words; `accent` is rendered in the gold gradient.
  headline: [
    { text: 'Your' },
    { text: 'Next' },
    { text: 'Journey', accent: true },
    { text: 'Begins' },
    { text: 'Here' },
  ],
  // revealed by the lantern light
  secretLine: 'The world is waiting',
  quote: '“The world is a book, and those who do not travel read only one page.” — attributed to St. Augustine',
  subline: 'Holidays, flights, visas, hotels and Hajj & Umrah — every journey planned with care from Hyderabad.',
  finalEyebrow: 'Holidays · Flights · Visas · Hajj & Umrah',
  finalTitle: ['Your journey,', 'perfectly planned'],
  route: ['Hyderabad', 'In the air', 'The world'],
}

// Hero media in /public/images. Missing files fall back to gradients (see components/ui/Photo.jsx).
export const heroMedia = {
  window: '/images/services/air.webp', // the view through the aircraft window (sunset over the wing)
  finale: '/images/services/air.webp', // above the clouds, behind the search bar
}

// Hero footer strip. Only verifiable strengths — no accreditation or traveller-count claims
// until the client confirms them.
export const trustBadges = [
  { top: 'Serving travellers', bottom: 'since 2016' }, // TODO: confirm with client (applies to Hyderabad office too?)
  { top: 'Flights, visas', bottom: '& holidays worldwide' },
  { top: 'Hyderabad', bottom: '& Vijayawada' },
]

/* ------------------------------------------------------------------------------------------
 * HOTELS — the only hotel data the client has given: the Ziyarath Special Umrah group's stays.
 * Hajj hotels are shared by the office at booking.
 * ---------------------------------------------------------------------------------------- */
const HOTEL_AMENITIES = ['Hyderabadi buffet meals', 'Laundry service']
export const hotels = {
  makkah: UMRAH.hotels.filter((h) => h.city === 'makkah').map((h) => ({ ...h, amenities: HOTEL_AMENITIES })),
  madinah: UMRAH.hotels.filter((h) => h.city === 'madinah').map((h) => ({ ...h, amenities: HOTEL_AMENITIES })),
}
export const hotelsNote = 'Hajj hotel details are shared by the office at booking.' // TODO: confirm with client

export const hotelAmenities = [
  { icon: 'utensils', title: 'Hyderabadi buffet meals', text: 'Buffet meals with tea three times on the Umrah group.' },
  { icon: 'shirt', title: 'Laundry service', text: 'Laundry services in Makkah and Madinah on the Umrah group.' },
]

/* ------------------------------------------------------------------------------------------
 * DESTINATIONS — popular trips we plan from Hyderabad (flights, visas, hotels, sightseeing),
 * plus Makkah & Madinah for our Hajj and Umrah programmes.
 * Copy is deliberately generic: no prices, dates, durations or inclusions are promised.
 * `map` = position on the route map (0–100 × 0–62 viewBox units, Hyderabad at `hyderabadOnMap`).
 * `image`: drop a photo at that path (plus a "-640" sibling) — until then the `tone` gradient shows.
 * TODO: confirm with client — destination list; supply photos for each destination.
 * ---------------------------------------------------------------------------------------- */
const tripText = (name) => `Hello Al Balagh Tours. I would like to plan a trip to ${name}. Please share some options.`

export const destinations = [
  {
    slug: 'dubai',
    name: 'Dubai',
    full: 'Dubai, United Arab Emirates',
    region: 'United Arab Emirates',
    tagline: 'Skylines, desert and sea',
    image: '/images/destinations/dubai.webp',
    tone: 'sand',
    icon: 'palm',
    map: [40, 25],
    text: 'Towering skylines, desert safaris, souks and beaches — an easy short-haul favourite for families, shoppers and first-time travellers abroad.',
    highlights: ['Downtown & the Burj Khalifa', 'Desert safari evenings', 'Dubai Marina & beaches'],
    bestFor: ['Family holiday', 'Shopping', 'Short break'],
    whatsapp: tripText('Dubai'),
  },
  {
    slug: 'turkiye',
    rays: true, // photo with baked-in light rays
    name: 'Türkiye',
    full: 'Istanbul & Cappadocia',
    region: 'Türkiye',
    tagline: 'Where two continents meet',
    image: '/images/services/holiday.webp',
    tone: 'dusk',
    icon: 'globe',
    map: [14, 11],
    text: 'Istanbul’s bazaars and Bosphorus views, then sunrise balloons over the fairy chimneys of Cappadocia — history, food and landscapes in one trip.',
    highlights: ['Bosphorus cruise', 'Grand Bazaar & old Istanbul', 'Cappadocia hot-air balloons'],
    bestFor: ['Culture', 'Honeymoon', 'Family holiday'],
    whatsapp: tripText('Türkiye'),
  },
  {
    slug: 'maldives',
    rays: true, // photo with baked-in light rays
    name: 'Maldives',
    full: 'The Maldives',
    region: 'Indian Ocean',
    tagline: 'Island resorts & turquoise water',
    image: '/images/destinations/maldives.webp',
    tone: 'sky',
    icon: 'palm',
    map: [57, 57],
    text: 'Overwater villas, reefs and white-sand islands a short flight from India — made for honeymoons and slow, quiet holidays.',
    highlights: ['Overwater villas', 'Snorkelling & reefs', 'Island-hopping'],
    bestFor: ['Honeymoon', 'Beach', 'Relaxation'],
    whatsapp: tripText('the Maldives'),
  },
  {
    slug: 'thailand',
    rays: true, // photo with baked-in light rays
    name: 'Thailand',
    full: 'Bangkok, Phuket & Krabi',
    region: 'Southeast Asia',
    tagline: 'City lights & island days',
    image: '/images/destinations/thailand.webp',
    tone: 'emerald',
    icon: 'palm',
    map: [80, 33],
    text: 'Bangkok’s temples and markets, then the islands of Phuket and Krabi — great value, great food and something for every age.',
    highlights: ['Bangkok city tours', 'Phuket & Phi Phi islands', 'Krabi beaches'],
    bestFor: ['Friends', 'Family holiday', 'Beach'],
    whatsapp: tripText('Thailand'),
  },
  {
    slug: 'malaysia-singapore',
    name: 'Malaysia & Singapore',
    full: 'Kuala Lumpur, Langkawi & Singapore',
    region: 'Southeast Asia',
    tagline: 'Two countries, one easy trip',
    image: '/images/destinations/singapore.webp',
    tone: 'night',
    icon: 'globe',
    map: [86, 51],
    text: 'Kuala Lumpur’s towers, the islands of Langkawi and Singapore’s gardens and waterfront — a popular combination, especially for families.',
    highlights: ['Petronas Twin Towers', 'Langkawi islands', 'Gardens by the Bay & Sentosa'],
    bestFor: ['Family holiday', 'City break', 'First trip abroad'],
    whatsapp: tripText('Malaysia & Singapore'),
  },
  {
    slug: 'azerbaijan',
    name: 'Azerbaijan',
    full: 'Baku & Gabala',
    region: 'Caucasus',
    tagline: 'The land of fire',
    image: '/images/destinations/baku.webp',
    tone: 'dusk',
    icon: 'mapPin',
    map: [28, 8],
    text: 'Baku’s walled Old City and Flame Towers on the Caspian, then the mountains of Gabala — a fresh, increasingly popular choice from India.',
    highlights: ['Baku Old City', 'Flame Towers & the boulevard', 'Gabala mountains'],
    bestFor: ['Couples', 'Culture', 'Short break'],
    whatsapp: tripText('Azerbaijan'),
  },
  {
    slug: 'europe',
    rays: true, // photo with baked-in light rays
    name: 'Europe',
    full: 'Paris, Switzerland & beyond',
    region: 'Europe',
    tagline: 'Classic tours, planned your way',
    image: '/images/destinations/europe.webp',
    tone: 'night',
    icon: 'plane',
    map: [4, 4],
    text: 'From Paris and the Swiss Alps to Italy and beyond — itineraries, Schengen visa guidance, flights and hotels arranged together.',
    highlights: ['Paris & the Swiss Alps', 'Schengen visa guidance', 'Flights, hotels & rail in one plan'],
    bestFor: ['Honeymoon', 'Family holiday', 'Culture'],
    whatsapp: tripText('Europe'),
  },
  {
    slug: 'makkah-madinah',
    name: 'Makkah & Madinah',
    full: 'Hajj & Umrah',
    region: 'Saudi Arabia',
    tagline: 'Hajj 2027 & the Ziyarath Special Umrah',
    image: '/images/makkah-clocktower.webp',
    tone: 'sand',
    icon: 'mapPin',
    map: [30, 31],
    text: 'Our pilgrimage programmes: Hajj 2027 with private transfers during the days of Hajj, and the Ziyarath Special Umrah group with direct flights from Hyderabad.',
    highlights: ['Hajj 2027 programme', 'Ziyarath Special Umrah group', 'Hotels near the Haram & Masjid an-Nabawi'],
    bestFor: ['Hajj', 'Umrah'],
    link: '/services/haj-umrah',
    whatsapp: 'Hello Al Balagh Tours. I would like to know more about your Hajj and Umrah programmes.',
  },
]
export const hyderabadOnMap = [66, 42]

/* ------------------------------------------------------------------------------------------
 * ALBANIA WORK PERMIT & JOB VISA — /albania-work-visa
 * TODO: client to provide Albania content — every text below is a neutral PLACEHOLDER.
 * Swapping in the client's wording needs edits here only.
 * STRICT RULES: no guaranteed visas or jobs, approval rates, salaries, fees, processing times,
 * specific employers, laws, quotas or eligibility rules unless the client supplies them in writing.
 * TODO: confirm client's licence/registration for overseas recruitment
 * Photos: local files only in /public/images/albania (missing files fall back to gradients).
 * ---------------------------------------------------------------------------------------- */
const ALBANIA_PLACEHOLDER = 'Details coming soon — contact our team.' // TODO: client to provide Albania content
const albaniaPhoto = (file, alt, caption) => ({ src: `/images/albania/${file}`, alt, caption })

export const albania = {
  meta: {
    title: 'Albania Work Permit & Job Visa — Al Balagh Tours & Travels',
    description: 'Albania work permit and job visa enquiries with Al Balagh Tours & Travels, Mehdipatnam, Hyderabad.',
  },
  // TODO: client to provide Albania content
  hero: {
    kicker: 'Albania · Work permit & job visa',
    lines: ['Your job in Europe', 'starts here.'],
    intro: `Thinking about working in Albania? ${ALBANIA_PLACEHOLDER}`,
    photos: [
      albaniaPhoto('tirana.webp', 'Tirana, the capital of Albania', 'Tirana'),
      albaniaPhoto('riviera.webp', 'The Albanian Riviera', 'Albanian Riviera'),
      albaniaPhoto('flag.webp', 'The flag of Albania', 'Albania'),
    ],
  },
  // TODO: confirm exact wording with client
  notice: 'Visa approval and employment are subject to the policies of the Albanian authorities and the employer. We do not guarantee approval.',
  // TODO: client to provide Albania content
  why: {
    eyebrow: 'Why Albania',
    title: ['Why ', { accent: 'Albania' }],
    lead: ALBANIA_PLACEHOLDER,
    cards: [
      { icon: 'globe', title: 'A European destination', text: ALBANIA_PLACEHOLDER },
      { icon: 'mapPin', title: 'Life in Tirana', text: ALBANIA_PLACEHOLDER },
      { icon: 'palm', title: 'The Albanian Riviera', text: ALBANIA_PLACEHOLDER },
      { icon: 'headset', title: 'Guidance from Hyderabad', text: ALBANIA_PLACEHOLDER },
    ],
  },
  // TODO: client to provide Albania content — confirm which of these the client actually offers
  help: {
    heading: { lines: ['your Albania plans'] },
    long: [ALBANIA_PLACEHOLDER],
    offer: [
      { icon: 'search', title: 'Understanding the process', text: ALBANIA_PLACEHOLDER },
      { icon: 'certificate', title: 'Document preparation', text: ALBANIA_PLACEHOLDER },
      { icon: 'passport', title: 'Application guidance', text: ALBANIA_PLACEHOLDER },
      { icon: 'plane', title: 'Flights to Albania', text: ALBANIA_PLACEHOLDER },
      { icon: 'shield', title: 'Travel insurance', text: ALBANIA_PLACEHOLDER },
      { icon: 'headset', title: 'Questions answered', text: ALBANIA_PLACEHOLDER },
    ],
  },
  // TODO: client to provide Albania content
  steps: {
    eyebrow: 'How it works',
    title: ['Five clear ', { accent: 'steps' }],
    items: [
      { title: 'Get in touch', text: ALBANIA_PLACEHOLDER },
      { title: 'Initial discussion', text: ALBANIA_PLACEHOLDER },
      { title: 'Prepare documents', text: ALBANIA_PLACEHOLDER },
      { title: 'Next steps', text: ALBANIA_PLACEHOLDER },
      { title: 'Travel planning', text: ALBANIA_PLACEHOLDER },
    ],
  },
  // TODO: client to provide Albania content — placeholder list, not eligibility rules
  documents: {
    title: 'Albania Work Permit & Job Visa',
    documentsTitle: 'Documents you may need',
    documentsNote: 'Placeholder list — our team will confirm the exact requirements.',
    documents: ['Valid passport', 'Passport-size photographs', 'Educational and experience certificates', 'Other documents — details coming soon'],
  },
  // TODO: client to provide Albania content — Unsplash / Pexels / Wikimedia Commons, downloaded locally
  gallery: [
    albaniaPhoto('tirana.webp', 'Tirana, the capital of Albania', 'Tirana'),
    albaniaPhoto('skanderbeg-square.webp', 'Skanderbeg Square, Tirana', 'Skanderbeg Square'),
    albaniaPhoto('riviera.webp', 'The Albanian Riviera', 'Albanian Riviera'),
    albaniaPhoto('mountains.webp', 'Mountains of Albania', 'Albanian mountains'),
    albaniaPhoto('flag.webp', 'The flag of Albania', 'Flag of Albania'),
    albaniaPhoto('delivery-rider.jpg', 'A delivery rider on a scooter', 'On the road'),
  ],
  // TODO: client to provide Albania content
  faqs: [
    {
      q: 'Do you guarantee a visa or a job?',
      a: 'No. Visa approval and employment are subject to the policies of the Albanian authorities and the employer. We do not guarantee approval.',
    },
    { q: 'Which jobs can I apply for?', a: ALBANIA_PLACEHOLDER },
    { q: 'What are the costs and timelines?', a: `${ALBANIA_PLACEHOLDER} We will share current information when you enquire.` },
    { q: 'How do I start?', a: 'Call +91 90302 29940 or +91 90305 86777, message us on WhatsApp, or use the enquiry form on this page.' },
  ],
  form: {
    title: ['Tell us about ', { accent: 'yourself' }],
    lead: 'Share a few details and we will continue the conversation on WhatsApp. Nothing is stored on this website.',
    intro: 'Hello Al Balagh Tours. I would like to enquire about the Albania work permit & job visa.',
  },
  cta: {
    prefix: 'Ready to talk about',
    accent: 'Albania',
    lead: `Have questions about working in Albania? ${ALBANIA_PLACEHOLDER}`,
  },
  whatsapp: 'Hello Al Balagh Tours. I would like to enquire about the Albania work permit & job visa.',
}

/* ------------------------------------------------------------------------------------------
 * GUEST EXPERIENCES — reviews on the home page (#reviews).
 * Fields: type ('video' | 'photo' | 'text'), name, city, src, poster, quote.
 * Every entry flagged `sample: true` is a Sample placeholder, not a real review.
 * TODO: replace with real customer reviews (with each guest's permission).
 * Videos: compress every file to H.264 MP4, 720p, under ~8 MB; they never autoplay
 * (preload="none", played only when the visitor presses play).
 * ---------------------------------------------------------------------------------------- */
// Switch to false at launch to hide every sample entry below.
export const SHOW_SAMPLE_REVIEWS = true

const SAMPLE_QUOTE = 'Sample review — a guest’s own words about their journey will appear here.'
const REVIEWS = [
  // Sample — TODO: replace with real customer reviews
  { type: 'video', name: 'Sample guest', city: 'Hyderabad', src: '/videos/reviews/review-1.mp4', poster: '/images/reviews/poster-1.jpg', quote: '', sample: true },
  { type: 'video', name: 'Sample guest', city: 'Hyderabad', src: '/videos/reviews/review-2.mp4', poster: '/images/reviews/poster-2.jpg', quote: '', sample: true },
  { type: 'video', name: 'Sample guest', city: 'Vijayawada', src: '/videos/reviews/review-3.mp4', poster: '/images/reviews/poster-3.jpg', quote: '', sample: true },
  // Sample — TODO: replace with real customer reviews
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    type: 'photo',
    name: 'Sample guest',
    city: n % 2 ? 'Hyderabad' : 'Vijayawada',
    src: `/images/reviews/photo-${n}.jpg`,
    poster: '',
    quote: '',
    sample: true,
  })),
  // Sample — TODO: replace with real customer reviews
  { type: 'text', name: 'Sample guest', city: 'Hyderabad', src: '', poster: '', quote: SAMPLE_QUOTE, sample: true },
  { type: 'text', name: 'Sample guest', city: 'Vijayawada', src: '', poster: '', quote: SAMPLE_QUOTE, sample: true },
  { type: 'text', name: 'Sample guest', city: 'Hyderabad', src: '', poster: '', quote: SAMPLE_QUOTE, sample: true },
]
export const reviews = REVIEWS.filter((r) => SHOW_SAMPLE_REVIEWS || !r.sample)

/* OFFICE PHOTOS — "Visit our office" on the contact page. TODO: client to supply photos. */
export const officePhotos = [
  { src: '/images/office/office-1.jpg', alt: 'Al Balagh Tours & Travels office, Mawin Zam Zam Plaza, Mehdipatnam' },
  { src: '/images/office/office-2.jpg', alt: 'Inside the Al Balagh Tours & Travels office' },
]

/* ------------------------------------------------------------------------------------------
 * CLIENT FLYERS — the agency's own poster artwork (text inside the image), shown whole and
 * never cropped; tap to read full screen. Each file has a "-640" WebP sibling for cards.
 * `w` / `h` are the artwork's pixel size (keeps the card's aspect and reserves layout space).
 * ---------------------------------------------------------------------------------------- */
export const flyers = {
  umrah: [
    {
      src: '/images/umrah/umrah-flyer-1.webp',
      w: 719,
      h: 1599,
      caption: 'Deluxe Umrah Package',
      alt: 'Al Balaagh Travels Deluxe Umrah Package flyer: Makkah and Madinah, flight journey, Makkah and Madinah hotels, package inclusions, four Umrahs and additional Ziyarat, with contact details.',
    },
    {
      src: '/images/umrah/umrah-flyer-2.webp',
      w: 1055,
      h: 1491,
      caption: 'Deluxe Umrah Package',
      alt: 'Al Balaagh Travels Deluxe Umrah Package flyer: departure date, Makkah and Madinah hotels, package facilities, with contact details.',
    },
  ],
  albania: [
    {
      src: '/images/albania/albania-flyer.webp',
      w: 1024,
      h: 1536,
      caption: 'Albania food delivery job (bike rider)',
      alt: 'Al Balaagh Travels flyer: Albania food delivery job (bike rider) — job details, documents required and contact details.',
    },
  ],
}

/* ------------------------------------------------------------------------------------------
 * PHOTO CREDITS — downloaded from Wikimedia Commons, converted to WebP (1400px + 640px) and shown
 * with a warm colour grade. CC BY / CC BY-SA licences require this attribution (listed in the
 * footer under "Photo credits"); CC0 needs none but is listed for completeness.
 * ---------------------------------------------------------------------------------------- */
export const photoCredits = [
  { file: '/images/destinations/dubai.webp', title: "Dubai skyline unsplash", author: "Robert Bock", license: 'CC0', licenseUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en', source: 'https://commons.wikimedia.org/wiki/File:Dubai_skyline_unsplash.jpg' },
  { file: '/images/destinations/maldives.webp', title: "Thatched-roof villa in the Maldive Islands", author: "Godot13", license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Thatched-roof_villa_in_the_Maldive_Islands.jpg' },
  { file: '/images/destinations/thailand.webp', title: "Isla Phi Phi Lay, Tailandia, 2013-08-19, DD 04", author: "Diego Delso", license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', source: 'https://commons.wikimedia.org/wiki/File:Isla_Phi_Phi_Lay,_Tailandia,_2013-08-19,_DD_04.JPG' },
  { file: '/images/destinations/singapore.webp', title: "Skyline of the Central Business District of Singapore with Esplanade Bridge in the evening", author: "Basile Morin", license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Skyline_of_the_Central_Business_District_of_Singapore_with_Esplanade_Bridge_in_the_evening.jpg' },
  { file: '/images/destinations/baku.webp', title: "A view of the Baku bay, Azerbaijan", author: "AlixSaz", license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:A_view_of_the_Baku_bay,_Azerbaijan.jpg' },
  { file: '/images/destinations/europe.webp', title: "Glarus Kloentalersee", author: "Ikiwaner", license: 'CC BY-SA 3.0', licenseUrl: 'http://creativecommons.org/licenses/by-sa/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Glarus_Kloentalersee.jpg' },
  { file: '/images/albania/tirana.webp', title: "Palacio de Cultura, Tirana, Albania, 2014-04-17, DD 11", author: "Diego Delso", license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0', source: 'https://commons.wikimedia.org/wiki/File:Palacio_de_Cultura,_Tirana,_Albania,_2014-04-17,_DD_11.JPG' },
  { file: '/images/albania/skanderbeg-square.webp', title: "Tirana - Skanderbeg Square (Sheshi Skënderbej) - by Pudelek", author: "Pudelek", license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Tirana_-_Skanderbeg_Square_(Sheshi_Sk%C3%ABnderbej)_-_by_Pudelek.jpg' },
  { file: '/images/albania/riviera.webp', title: "Ksamil, Albania (by Pudelek)", author: "Pudelek", license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Ksamil,_Albania_(by_Pudelek).JPG' },
  { file: '/images/albania/mountains.webp', title: "Ndërlysaj, Theth - 2018 05", author: "Liridon", license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0', source: 'https://commons.wikimedia.org/wiki/File:Nd%C3%ABrlysaj,_Theth_-_2018_05.jpg' },
  { file: '/images/albania/flag.webp', title: "Albanian Flag in the wave", author: "Aldo Vukaj", license: 'CC0', licenseUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en', source: 'https://commons.wikimedia.org/wiki/File:Albanian_Flag_in_the_wave.jpg' },
  { file: '/images/transport/bus-1.webp', title: "Mercedes-Benz O 350 Tourismo 01", author: "Huhu Uet alias Frank Schwichtenberg", license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0', source: 'https://commons.wikimedia.org/wiki/File:Mercedes-Benz_O_350_Tourismo_01.jpg' },
  { file: '/images/transport/bus-2.webp', title: "Setra S416GT-HD bus from Slovakia", author: "High Contrast", license: 'CC BY 3.0 de', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/de/deed.en', source: 'https://commons.wikimedia.org/wiki/File:Setra_S416GT-HD_bus_from_Slovakia.JPG' },
]
