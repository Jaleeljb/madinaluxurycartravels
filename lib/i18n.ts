export type Language = "en" | "hi" | "te";

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "te", label: "తెలుగు" },
];

export const DEFAULT_LANGUAGE: Language = "en";

const translations = {
  en: {
    "nav.fleet": "Cars",
    "nav.howItWorks": "How it works",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.reserveNow": "Reserve now",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "nav.language": "Language",

    "hero.headline": "Every road tells a story. Let us drive yours.",
    "hero.quote": "We show up. Every time.",
    "hero.reserveOnWhatsApp": "Reserve on WhatsApp",
    "hero.callUs": "Call us",
    "hero.scrollToFleet": "Scroll to cars",

    "fleet.eyebrow": "The cars",
    "fleet.headingPrefix": "Vehicles for every party",
    "fleet.headingEmphasis": "size",
    "fleet.description":
      "Every car arrives cleaned, fuelled and with a driver briefed on your itinerary. Prices shown are daily rates in Indian Rupees.",
    "fleet.categoryAll": "All",
    "fleet.noVehicles": "No vehicles in this category yet.",

    "car.seats": "seats",
    "car.bags": "bags",
    "car.perDay": "Per day",
    "car.book": "Book",
    "car.available": "Available",
    "car.unavailable": "Unavailable",

    "calendar.selectDates": "Select dates",
    "calendar.change": "Change",
    "calendar.legendAvailable": "Available",
    "calendar.legendBooked": "Already booked",
    "calendar.clear": "Clear",
    "calendar.confirm": "Use these dates",
    "calendar.rangeBlocked": "Some of these dates are already booked. Please choose different dates.",
    "calendar.hint": "Tap a start date, then an end date",
    "calendar.close": "Close",

    "how.eyebrow": "Process",
    "how.heading": "Three steps, no counters, no queues.",
    "how.step1Title": "Choose your car",
    "how.step1Body": "Browse the cars and pick the vehicle that fits your group, luggage and route.",
    "how.step2Title": "Confirm on WhatsApp",
    "how.step2Body": "Tap Book — your car, dates and route are pre-filled in a WhatsApp message to our team.",
    "how.step3Title": "We arrive on time",
    "how.step3Body": "Your driver meets you at the agreed point, on schedule, every time.",

    "about.eyebrow": "About us",
    "about.heading": "Built on local roads. Driven by trust.",
    "about.paragraph1":
      "10+ years moving families and travellers across Andhra Pradesh — clean cars, punctual drivers, and a price you agree to upfront.",
    "about.ownerRole": "Founder, Madina Travels",
    "about.ownerQuote": "Every trip, like it's our own family's.",
    "about.badgeYears": "Years",
    "about.stat1Label": "Years serving Andhra Pradesh",
    "about.stat2Label": "Trips completed",
    "about.stat3Label": "WhatsApp support",
    "about.stat4Label": "Average rating",

    "footer.tagline":
      "Cars for local trips, outstation travel and airport transfers across Andhra Pradesh — booked instantly over WhatsApp.",
    "footer.messageWhatsApp": "Message us on WhatsApp",
    "footer.navigate": "Navigate",
    "footer.admin": "Admin",
    "footer.contact": "Contact",
    "footer.rightsReserved": "All rights reserved.",
    "footer.tagline2": "Designed and developed by Shaik Jaleel Basha.",

    "whatsapp.chatAria": "Chat with us on WhatsApp",
  },
  hi: {
    "nav.fleet": "गाड़ियाँ",
    "nav.howItWorks": "यह कैसे काम करता है",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क करें",
    "nav.reserveNow": "अभी बुक करें",
    "nav.openMenu": "मेनू खोलें",
    "nav.closeMenu": "मेनू बंद करें",
    "nav.language": "भाषा",

    "hero.headline": "हर रास्ता एक कहानी कहता है। इस बार, आपकी।",
    "hero.quote": "हम हर बार, समय पर पहुँचते हैं।",
    "hero.reserveOnWhatsApp": "व्हाट्सएप पर बुक करें",
    "hero.callUs": "कॉल करें",
    "hero.scrollToFleet": "गाड़ियों तक स्क्रॉल करें",

    "fleet.eyebrow": "हमारी गाड़ियाँ",
    "fleet.headingPrefix": "हर ग्रुप के लिए सही",
    "fleet.headingEmphasis": "वाहन",
    "fleet.description":
      "हर गाड़ी साफ़-सुथरी, फ्यूल भरी हुई और आपके रूट की जानकारी रखने वाले ड्राइवर के साथ आती है। दिखाई गई कीमतें भारतीय रुपये में प्रतिदिन की दरें हैं।",
    "fleet.categoryAll": "सभी",
    "fleet.noVehicles": "इस श्रेणी में अभी कोई गाड़ी नहीं है।",

    "car.seats": "सीटें",
    "car.bags": "बैग",
    "car.perDay": "प्रति दिन",
    "car.book": "बुक करें",
    "car.available": "उपलब्ध",
    "car.unavailable": "अनुपलब्ध",

    "calendar.selectDates": "तारीखें चुनें",
    "calendar.change": "बदलें",
    "calendar.legendAvailable": "उपलब्ध",
    "calendar.legendBooked": "पहले से बुक",
    "calendar.clear": "साफ़ करें",
    "calendar.confirm": "ये तारीखें इस्तेमाल करें",
    "calendar.rangeBlocked": "इनमें से कुछ तारीखें पहले से बुक हैं। कृपया दूसरी तारीखें चुनें।",
    "calendar.hint": "पहले शुरुआत की तारीख, फिर आखिरी तारीख चुनें",
    "calendar.close": "बंद करें",

    "how.eyebrow": "प्रक्रिया",
    "how.heading": "तीन आसान चरण, न कोई काउंटर, न कोई लाइन।",
    "how.step1Title": "अपनी गाड़ी चुनें",
    "how.step1Body": "गाड़ियाँ देखें और अपने ग्रुप, सामान और रूट के हिसाब से सही गाड़ी चुनें।",
    "how.step2Title": "व्हाट्सएप पर पुष्टि करें",
    "how.step2Body":
      "'बुक करें' पर टैप करें — आपकी गाड़ी, तारीखें और रूट पहले से भरे हुए व्हाट्सएप मैसेज में हमारी टीम को भेजे जाते हैं।",
    "how.step3Title": "हम समय पर पहुँचते हैं",
    "how.step3Body": "आपका ड्राइवर तय जगह पर, हर बार समय पर आपसे मिलता है।",

    "about.eyebrow": "हमारे बारे में",
    "about.heading": "स्थानीय सड़कों से बना भरोसा।",
    "about.paragraph1":
      "10+ सालों से हम आंध्र प्रदेश भर में परिवारों और यात्रियों को पहुंचा रहे हैं — साफ़ गाड़ियाँ, समय के पाबंद ड्राइवर, और पहले से तय कीमत।",
    "about.ownerRole": "संस्थापक, मदीना ट्रैवल्स",
    "about.ownerQuote": "हर सफ़र, अपने परिवार जैसा।",
    "about.badgeYears": "साल",
    "about.stat1Label": "आंध्र प्रदेश की सेवा में वर्ष",
    "about.stat2Label": "पूरी की गई यात्राएं",
    "about.stat3Label": "व्हाट्सएप सहायता",
    "about.stat4Label": "औसत रेटिंग",

    "footer.tagline":
      "आंध्र प्रदेश भर में लोकल ट्रिप्स, आउटस्टेशन यात्रा और एयरपोर्ट ट्रांसफर के लिए गाड़ियाँ — व्हाट्सएप पर तुरंत बुक करें।",
    "footer.messageWhatsApp": "व्हाट्सएप पर मैसेज करें",
    "footer.navigate": "नेविगेट करें",
    "footer.admin": "एडमिन",
    "footer.contact": "संपर्क",
    "footer.rightsReserved": "सर्वाधिकार सुरक्षित।",
    "footer.tagline2": "इसे Shaik Jaleel Basha द्वारा डिज़ाइन और विकसित किया गया है।",

    "whatsapp.chatAria": "व्हाट्सएप पर हमसे चैट करें",
  },
  te: {
    "nav.fleet": "వాహనాలు",
    "nav.howItWorks": "ఇది ఎలా పనిచేస్తుంది",
    "nav.about": "మా గురించి",
    "nav.contact": "సంప్రదించండి",
    "nav.reserveNow": "ఇప్పుడే బుక్ చేయండి",
    "nav.openMenu": "మెనూ తెరవండి",
    "nav.closeMenu": "మెనూ మూసివేయండి",
    "nav.language": "భాష",

    "hero.headline": "ప్రతి దారి ఒక కథ చెబుతుంది. ఈసారి, మీది.",
    "hero.quote": "మేము ప్రతిసారీ, సమయానికి వస్తాము.",
    "hero.reserveOnWhatsApp": "వాట్సాప్‌లో బుక్ చేయండి",
    "hero.callUs": "కాల్ చేయండి",
    "hero.scrollToFleet": "వాహనాలకు స్క్రోల్ చేయండి",

    "fleet.eyebrow": "మా వాహనాలు",
    "fleet.headingPrefix": "ప్రతి గ్రూప్‌కు సరైన",
    "fleet.headingEmphasis": "వాహనం",
    "fleet.description":
      "ప్రతి కారు శుభ్రంగా, ఇంధనం నింపి, మీ ప్రయాణ మార్గం తెలిసిన డ్రైవర్‌తో వస్తుంది. చూపిన ధరలు భారతీయ రూపాయల్లో రోజువారీ రేట్లు.",
    "fleet.categoryAll": "అన్నీ",
    "fleet.noVehicles": "ఈ కేటగిరీలో ఇంకా వాహనాలు లేవు.",

    "car.seats": "సీట్లు",
    "car.bags": "బ్యాగులు",
    "car.perDay": "రోజుకు",
    "car.book": "బుక్ చేయండి",
    "car.available": "అందుబాటులో ఉంది",
    "car.unavailable": "అందుబాటులో లేదు",

    "calendar.selectDates": "తేదీలను ఎంచుకోండి",
    "calendar.change": "మార్చండి",
    "calendar.legendAvailable": "అందుబాటులో ఉంది",
    "calendar.legendBooked": "ఇప్పటికే బుక్ అయింది",
    "calendar.clear": "క్లియర్ చేయండి",
    "calendar.confirm": "ఈ తేదీలను వాడండి",
    "calendar.rangeBlocked": "ఎంచుకున్న కొన్ని తేదీలు ఇప్పటికే బుక్ అయ్యాయి. వేరే తేదీలను ఎంచుకోండి.",
    "calendar.hint": "మొదట ప్రారంభ తేదీ, తర్వాత చివరి తేదీని ఎంచుకోండి",
    "calendar.close": "మూసివేయండి",

    "how.eyebrow": "ప్రక్రియ",
    "how.heading": "మూడు సులభమైన దశలు, కౌంటర్లు లేవు, క్యూలు లేవు.",
    "how.step1Title": "మీ కారును ఎంచుకోండి",
    "how.step1Body": "వాహనాలను చూసి మీ గ్రూప్, లగేజీ మరియు మార్గానికి సరిపోయే వాహనాన్ని ఎంచుకోండి.",
    "how.step2Title": "వాట్సాప్‌లో నిర్ధారించండి",
    "how.step2Body":
      "'బుక్ చేయండి' నొక్కండి — మీ కారు, తేదీలు మరియు మార్గం ముందుగా నింపిన వాట్సాప్ మెసేజ్‌లో మా టీమ్‌కు వెళ్తాయి.",
    "how.step3Title": "మేము సమయానికి వస్తాము",
    "how.step3Body": "మీ డ్రైవర్ ఒప్పుకున్న ప్రదేశంలో, ప్రతిసారీ సమయానికి మిమ్మల్ని కలుస్తారు.",

    "about.eyebrow": "మా గురించి",
    "about.heading": "స్థానిక రోడ్లపై నిర్మించిన నమ్మకం.",
    "about.paragraph1":
      "10+ సంవత్సరాలుగా ఆంధ్రప్రదేశ్ అంతటా కుటుంబాలను, ప్రయాణికులను చేరవేస్తున్నాం — శుభ్రమైన కార్లు, సమయపాలన పాటించే డ్రైవర్లు, ముందుగా నిర్ణయించిన ధర.",
    "about.ownerRole": "వ్యవస్థాపకుడు, మదీనా ట్రావెల్స్",
    "about.ownerQuote": "ప్రతి ప్రయాణం, మా కుటుంబం లానే.",
    "about.badgeYears": "సంవత్సరాలు",
    "about.stat1Label": "ఆంధ్రప్రదేశ్‌కు సేవ చేస్తున్న సంవత్సరాలు",
    "about.stat2Label": "పూర్తయిన ప్రయాణాలు",
    "about.stat3Label": "వాట్సాప్ సపోర్ట్",
    "about.stat4Label": "సగటు రేటింగ్",

    "footer.tagline":
      "ఆంధ్రప్రదేశ్ అంతటా లోకల్ ట్రిప్‌లు, అవుట్‌స్టేషన్ ప్రయాణం మరియు ఎయిర్‌పోర్ట్ ట్రాన్స్‌ఫర్‌ల కోసం కార్లు — వాట్సాప్‌లో వెంటనే బుక్ చేసుకోండి.",
    "footer.messageWhatsApp": "వాట్సాప్‌లో మెసేజ్ చేయండి",
    "footer.navigate": "నావిగేట్ చేయండి",
    "footer.admin": "అడ్మిన్",
    "footer.contact": "సంప్రదింపు",
    "footer.rightsReserved": "అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
    "footer.tagline2": "దీన్ని Shaik Jaleel Basha రూపొందించారు మరియు అభివృద్ధి చేశారు.",

    "whatsapp.chatAria": "వాట్సాప్‌లో మాతో చాట్ చేయండి",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function translate(language: Language, key: TranslationKey): string {
  return translations[language]?.[key] ?? translations.en[key] ?? key;
}
