/* City of White Plains — department directory data
   Original, concise summaries (not copied from any source); grounded in real
   White Plains specifics. Drives departments.html (directory) and department.html (detail).
   Each service link is either a real internal page (h) or a stubbed demo (demo:true). */
window.WP_DEPTS = [
  {
    slug: "assessor", name: "Assessor", group: "Finance & property",
    tagline: "Property values, exemptions, and the assessment roll.",
    overview: "The Assessor determines the assessed value of every property in the City, maintains the assessment roll, and administers exemptions that lower what eligible owners pay in property tax.",
    services: [
      { t: "Look up a property assessment", demo: true },
      { t: "Apply for a STAR, senior, or veteran exemption", demo: true },
      { t: "File a grievance with the Board of Assessment Review", demo: true },
      { t: "View the annual assessment roll", demo: true }
    ],
    faqs: [
      { q: "When is the assessment roll published?", a: "A tentative roll is filed in the spring, with a final roll later in the year. Grievance Day follows the tentative roll." },
      { q: "How do exemptions work?", a: "Exemptions reduce your taxable assessed value. Most must be filed once by the City's exemption deadline; some renew automatically." }
    ],
    contact: { office: "City Hall, 1st Floor", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Pay property taxes", h: "pay.html" }, { t: "Finance Department", h: "department.html?d=finance" }]
  },
  {
    slug: "budget", name: "Budget", group: "Finance & property",
    tagline: "The City's adopted budget and capital plan.",
    overview: "The Budget office prepares the City's annual operating budget and capital improvement plan, monitors spending through the year, and publishes financial documents for public review.",
    services: [
      { t: "Read the adopted City budget", h: "government.html#budget" },
      { t: "Review the proposed budget", h: "minutes.html" },
      { t: "See the capital improvement plan", demo: true },
      { t: "View quarterly financial reports", demo: true }
    ],
    faqs: [
      { q: "When is the budget adopted?", a: "The proposed budget is released in the spring and adopted by the Common Council after public hearings, ahead of the new fiscal year." }
    ],
    contact: { office: "City Hall, 1st Floor", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Government & Transparency", h: "government.html" }, { t: "Agendas & Minutes", h: "minutes.html" }]
  },
  {
    slug: "building", name: "Building", group: "Development & property",
    tagline: "Construction permits, inspections, and code enforcement.",
    overview: "The Building Department reviews construction plans, issues building permits, performs inspections, enforces the property maintenance and building codes, and issues certificates of occupancy.",
    services: [
      { t: "Apply for a building permit", h: "pay.html" },
      { t: "Schedule an inspection", demo: true },
      { t: "Report a code violation", h: "pay.html#report" },
      { t: "Request a certificate of occupancy", demo: true }
    ],
    faqs: [
      { q: "Do I need a permit for that project?", a: "Most structural, electrical, plumbing, and mechanical work needs a permit, as do decks, fences over a set height, and many renovations. Check before you start." }
    ],
    contact: { office: "City Hall, 1st Floor", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Apply & pay", h: "pay.html" }, { t: "Planning Department", h: "department.html?d=planning" }]
  },
  {
    slug: "cable-tv", name: "Cable Television", group: "Communications",
    tagline: "The municipal channel and meeting broadcasts.",
    overview: "Cable Television produces and airs City programming on the municipal access channel, including live and recorded broadcasts of Common Council and board meetings.",
    services: [
      { t: "Watch City meetings", h: "minutes.html" },
      { t: "See the programming schedule", demo: true },
      { t: "Browse City multimedia", demo: true }
    ],
    faqs: [
      { q: "Can I watch meetings online?", a: "Yes — meetings are streamed and archived. This concept also publishes the written record as searchable web text." }
    ],
    contact: { office: "City Hall", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Agendas & Minutes", h: "minutes.html" }, { t: "Government", h: "government.html" }]
  },
  {
    slug: "city-clerk", name: "City Clerk", group: "Government records",
    tagline: "Records, FOIL requests, licenses, and public notices.",
    overview: "The City Clerk is the City's record-keeper: maintaining official records and Common Council legislation, processing Freedom of Information (FOIL) requests, issuing marriage and other licenses, and posting public notices.",
    services: [
      { t: "File a FOIL records request", demo: true },
      { t: "Apply for a marriage license", demo: true },
      { t: "View public notices", h: "news.html" },
      { t: "Request a vital record", demo: true }
    ],
    faqs: [
      { q: "How do I request public records?", a: "Submit a FOIL request to the City Clerk describing the records you want. The City responds within the timeframes set by state law." }
    ],
    contact: { office: "City Hall, 1st Floor", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Public notices", h: "news.html" }, { t: "Government", h: "government.html" }]
  },
  {
    slug: "finance", name: "Finance", group: "Finance & property",
    tagline: "Tax collection, utility billing, and City receivables.",
    overview: "The Finance Department collects property taxes and water and sewer charges, manages City receivables, and processes payments and receipts.",
    services: [
      { t: "Pay property taxes", h: "pay.html" },
      { t: "Pay a water & sewer bill", h: "pay.html" },
      { t: "Pay or contest a parking ticket", h: "pay.html" },
      { t: "Set up a payment plan", demo: true }
    ],
    faqs: [
      { q: "What payment methods are accepted?", a: "Bank transfer (ACH) at no fee, major credit and debit cards (small processing fee), in person at City Hall, or by mail." }
    ],
    contact: { office: "City Hall, 1st Floor", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Pay & Apply", h: "pay.html" }, { t: "Assessor", h: "department.html?d=assessor" }]
  },
  {
    slug: "it", name: "Information Technology", group: "Communications",
    tagline: "City technology, GIS, and digital services.",
    overview: "Information Technology supports the City's systems and staff, maintains mapping and GIS data, and runs the City's digital services and website.",
    services: [
      { t: "Explore City maps & GIS", demo: true },
      { t: "Browse open data", demo: true },
      { t: "Get help with this website", h: "index.html#contact" }
    ],
    faqs: [
      { q: "Is City data available to the public?", a: "Maps, parcels, and many datasets are published for residents and businesses to use." }
    ],
    contact: { office: "City Hall", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Contact the City", h: "index.html#contact" }]
  },
  {
    slug: "law", name: "Law / Corporation Counsel", group: "Government records",
    tagline: "Legal counsel to the City.",
    overview: "The Corporation Counsel provides legal advice to the Mayor, Common Council, and City departments, represents the City in legal matters, and handles claims against the City.",
    services: [
      { t: "File a claim against the City", demo: true },
      { t: "Read the Municipal Code", h: "government.html#code" },
      { t: "View legal notices", h: "news.html" }
    ],
    faqs: [
      { q: "Where is the City Charter and Code?", a: "The Municipal Code and City Charter are published online in a searchable code library, linked from the Government section." }
    ],
    contact: { office: "City Hall", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Municipal Code", h: "government.html#code" }, { t: "City Clerk", h: "department.html?d=city-clerk" }]
  },
  {
    slug: "library", name: "Library", group: "Community", external: "https://whiteplainslibrary.org/",
    tagline: "The White Plains Public Library.",
    overview: "The White Plains Public Library is operated independently and serves the community with a catalog, programs, meeting space, and digital resources. Its full site is hosted separately.",
    services: [
      { t: "Visit the Library website", h: "https://whiteplainslibrary.org/" },
      { t: "Search the catalog", h: "https://whiteplainslibrary.org/" },
      { t: "See programs & hours", h: "https://whiteplainslibrary.org/" }
    ],
    faqs: [],
    contact: { office: "100 Martine Avenue, White Plains, NY 10601", phone: "914-422-1400", hours: "See library website" },
    related: [{ t: "Our Community", h: "community.html" }, { t: "Youth Bureau", h: "department.html?d=youth-bureau" }]
  },
  {
    slug: "parking-traffic", name: "Parking & Traffic", group: "Transportation",
    tagline: "Garages, permits, citations, and traffic.",
    overview: "Parking & Traffic manages the City's parking garages and meters, issues residential and overnight permits, processes citations, and oversees traffic and curb regulations downtown.",
    services: [
      { t: "Pay or contest a parking ticket", h: "pay.html" },
      { t: "Apply for a residential parking permit", h: "pay.html" },
      { t: "Find a City garage", demo: true },
      { t: "Bee-Line & OMNY transit info", h: "community.html#transit" }
    ],
    faqs: [
      { q: "Where can residents park downtown?", a: "City garages including the Hamilton-Main Garage offer hourly and permit parking; residential permits cover certain neighborhood streets." }
    ],
    contact: { office: "City Hall", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Pay a ticket", h: "pay.html" }, { t: "Transit", h: "community.html#transit" }]
  },
  {
    slug: "personnel", name: "Personnel", group: "Government records",
    tagline: "City jobs, civil service, and human resources.",
    overview: "The Personnel Department manages hiring and human resources for the City, administers civil service examinations, and posts current job openings.",
    services: [
      { t: "See current City job openings", demo: true },
      { t: "Civil service exam schedule", demo: true },
      { t: "Employee resources", demo: true }
    ],
    faqs: [
      { q: "How do I apply for a City job?", a: "Open positions are posted with how to apply. Many positions are filled through the civil service process." }
    ],
    contact: { office: "City Hall", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "How Do I…?", h: "how-do-i.html" }]
  },
  {
    slug: "planning", name: "Planning", group: "Development & property",
    tagline: "Zoning, land use, and development review.",
    overview: "The Planning Department guides land use and development in the City, administers the zoning code, and supports the Planning Board and related boards through the development review process.",
    services: [
      { t: "Look up zoning for a property", demo: true },
      { t: "Planning Board agendas & minutes", h: "minutes.html" },
      { t: "Start a site plan review", demo: true },
      { t: "Comprehensive plan & studies", demo: true }
    ],
    faqs: [
      { q: "How do I find a property's zoning?", a: "Zoning is set by district in the zoning code and shown on the City's zoning map; staff can confirm a specific parcel." }
    ],
    contact: { office: "City Hall, 4th Floor", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Doing Business", h: "business.html" }, { t: "Building Department", h: "department.html?d=building" }]
  },
  {
    slug: "public-safety", name: "Public Safety — Police & Fire", group: "Public safety", external: "https://whiteplainspublicsafety.com",
    tagline: "Police and Fire. For emergencies, call 911.",
    overview: "The Department of Public Safety includes the City's Police and Fire services. For any emergency, always call 911. Non-emergency services and information are published on the department's own site.",
    services: [
      { t: "Public Safety website", h: "https://whiteplainspublicsafety.com" },
      { t: "Non-emergency police line", demo: true },
      { t: "File a police report", demo: true },
      { t: "Fire prevention & permits", demo: true }
    ],
    faqs: [
      { q: "When should I call 911?", a: "Call 911 for any emergency — a crime in progress, fire, or medical emergency. Use the non-emergency line for everything else." }
    ],
    contact: { office: "Public Safety Headquarters", phone: "911 (emergency)", hours: "Police & Fire: 24 hours" },
    related: [{ t: "Report a non-emergency issue", h: "pay.html#report" }]
  },
  {
    slug: "public-works", name: "Public Works", group: "Public works & environment",
    tagline: "Streets, sanitation, water, and sewer.",
    overview: "The Department of Public Works maintains City streets and sidewalks, collects trash and recycling, runs the water and sewer systems, and handles snow and storm response.",
    services: [
      { t: "Trash & recycling schedule", demo: true },
      { t: "Schedule a bulk pickup", h: "pay.html" },
      { t: "Report a pothole or streetlight", h: "pay.html#report" },
      { t: "Water & sewer billing", h: "pay.html" }
    ],
    faqs: [
      { q: "When is my collection day?", a: "Collection days are set by neighborhood. Recycling is collected on a published schedule alongside refuse." }
    ],
    contact: { office: "City Hall, Ground Floor", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Report a problem", h: "pay.html#report" }, { t: "Pay water & sewer", h: "pay.html" }]
  },
  {
    slug: "purchasing", name: "Purchasing", group: "Doing business",
    tagline: "Procurement, bids, and vendor registration.",
    overview: "The Purchasing Department buys goods and services for the City through a competitive process, posts bids and requests for proposals, and registers vendors who want to do business with the City.",
    services: [
      { t: "View open bids & RFPs", demo: true },
      { t: "Register as a City vendor", demo: true },
      { t: "Surplus property auctions", demo: true }
    ],
    faqs: [
      { q: "How do I sell to the City?", a: "Register as a vendor and watch for open bids and RFPs that match what you offer; awards follow the City's procurement rules." }
    ],
    contact: { office: "City Hall", phone: "914-422-1200", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Doing Business", h: "business.html" }]
  },
  {
    slug: "recreation", name: "Recreation & Parks", group: "Community",
    tagline: "Pools, camps, programs, and parks.",
    overview: "Recreation & Parks runs the City's pools, summer camps, sports leagues, and year-round programs, and maintains parks and green space across White Plains.",
    services: [
      { t: "Pool hours & locations", h: "recreation.html#hours" },
      { t: "Register for a program", h: "pay.html" },
      { t: "Programs & camps", h: "recreation.html" },
      { t: "Parks & facilities", h: "recreation.html" }
    ],
    faqs: [
      { q: "How do I register for programs?", a: "Register online or in person at the Recreation office in City Hall; resident season pool passes are available online." }
    ],
    contact: { office: "City Hall, 2nd Floor", phone: "914-422-1336", hours: "Mon–Fri, 9 a.m.–5 p.m." },
    related: [{ t: "Recreation & Parks page", h: "recreation.html" }, { t: "Register & pay", h: "pay.html" }]
  },
  {
    slug: "youth-bureau", name: "Youth Bureau", group: "Community", external: "https://whiteplainsyouthbureau.org/",
    tagline: "Youth programs, scholarships, and partnerships.",
    overview: "The White Plains Youth Bureau supports young people with programs, scholarships, and community partnerships. It maintains its own website with current offerings.",
    services: [
      { t: "Visit the Youth Bureau website", h: "https://whiteplainsyouthbureau.org/" },
      { t: "Youth programs & activities", h: "https://whiteplainsyouthbureau.org/" },
      { t: "Scholarships", h: "https://whiteplainsyouthbureau.org/" }
    ],
    faqs: [],
    contact: { office: "White Plains Youth Bureau", phone: "914-422-1378", hours: "See Youth Bureau website" },
    related: [{ t: "Our Community", h: "community.html" }, { t: "Recreation & Parks", h: "department.html?d=recreation" }]
  }
];
