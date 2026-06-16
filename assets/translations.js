// translations.js — Supported languages (24 EU official + world languages)
// Each key maps to a locale code. Add/edit strings here.
// Article content (titles, excerpts) is editorial — not translated here.

// `cc` = ISO 3166-1 country code used to fetch the flag image (flagcdn.com).
const EU_LANGUAGES = [
  { code: "bg", name: "Български",    cc: "bg" },
  { code: "cs", name: "Čeština",      cc: "cz" },
  { code: "da", name: "Dansk",        cc: "dk" },
  { code: "de", name: "Deutsch",      cc: "de" },
  { code: "el", name: "Ελληνικά",     cc: "gr" },
  { code: "en", name: "English",      cc: "gb" },
  { code: "es", name: "Español",      cc: "es" },
  { code: "et", name: "Eesti",        cc: "ee" },
  { code: "fi", name: "Suomi",        cc: "fi" },
  { code: "fr", name: "Français",     cc: "fr" },
  { code: "ga", name: "Gaeilge",      cc: "ie" },
  { code: "hr", name: "Hrvatski",     cc: "hr" },
  { code: "hu", name: "Magyar",       cc: "hu" },
  { code: "it", name: "Italiano",     cc: "it" },
  { code: "lt", name: "Lietuvių",     cc: "lt" },
  { code: "lv", name: "Latviešu",     cc: "lv" },
  { code: "mt", name: "Malti",        cc: "mt" },
  { code: "nl", name: "Nederlands",   cc: "nl" },
  { code: "pl", name: "Polski",       cc: "pl" },
  { code: "pt", name: "Português",    cc: "pt" },
  { code: "ro", name: "Română",       cc: "ro" },
  { code: "sk", name: "Slovenčina",   cc: "sk" },
  { code: "sl", name: "Slovenščina",  cc: "si" },
  { code: "sv", name: "Svenska",      cc: "se" },
  // ── Additional world languages ──
  { code: "ru", name: "Русский",      cc: "ru" },
  { code: "uk", name: "Українська",   cc: "ua" },
  { code: "tr", name: "Türkçe",       cc: "tr" },
  { code: "zh", name: "中文",          cc: "cn" },
  { code: "ar", name: "العربية",        cc: "sa", rtl: true },
];

const translations = {
  en: {
    tagtitle: "Shadows within the cave",
    tagline: "Thoughts about the Past of the Future Us",
    issueFrequency: "Four essays guaranteed per year · One essay per quarter",
    featuredTag: "Featured",
    sidebarRecentHeading: "Recent essays",
    sidebarAboutHeading: "About this journal",
    readMore: "Read essay",
    showAll: (n) => `Show all ${n} essays`,
    showLess: "Show fewer",
    footerText: "Shadows within the Cave",
    issueLabel: (n, season, year) => `Issue ${n} · ${season} ${year}`,
    about: `<strong>Shadows within the Cave</strong> is a shared essay journal, published four times a year.<br><br>
<strong>Topics range freely</strong> — from ancient philosophy and cognitive science to the imagined futures of science fiction.<br><br>
<strong>First writer</strong><br>
- Studied Philosophy<br>
- 11+ years as Software Developer<br>
- 3+ years as University Teacher<br>
<strong>Core principle:</strong><br>
No algorithms or AI generated essay!<br>
Only passion for wisdom.<br><br>
<strong>New essays</strong> arrive every:<br>
- Spring — March 21<br>
- Summer — June 20<br>
- Autumn — September 22<br>
- Winter — December 21<br><br>
There is no <strong>Subscribe</strong> for notifications — means:<br>
- No Spam.<br>
- No Advertising.<br>
- No "Who cares?" content.<br>
- No message service subscription.<br>
- Just your brain cells' curiosity.<br>
- And a passion to read, of course.<br><br>
We believe that <strong>truth is free</strong>. And as such — should be searched by <strong>free will</strong> as well.`,
    seasons: ["Winter", "Spring", "Summer", "Autumn"],
  },

  bg: {
    tagtitle: "Сенки в пещерата",
    tagline: "Мисли за миналото на бъдещото ни аз",
    issueFrequency: "Четири есета гарантирано годишно · Едно есе на тримесечие",
    featuredTag: "Препоръчано",
    sidebarRecentHeading: "Последни есета",
    sidebarAboutHeading: "За това списание",
    readMore: "Прочети есето",
    showAll: (n) => `Покажи всички ${n} есета`,
    showLess: "Покажи по-малко",
    footerText: "Сенки в пещерата",
    issueLabel: (n, season, year) => `Брой ${n} · ${season} ${year}`,
    about: `<strong>Сенки в пещерата</strong> е споделено списание с есета, публикувано четири пъти в годината.<br><br>
<strong>Темите варират свободно</strong> — от древна философия и когнитивна наука до въображаемото бъдеще на научната фантастика.<br><br>
<strong>Първи автор</strong><br>
- Завършил философия<br>
- 11+ години като разработчик на софтуер<br>
- 3+ години като университетски преподавател<br><br>
<strong>Основен принцип:</strong><br>
Без алгоритми или съдържание, генерирано от ИИ!<br>
Само страст към мъдростта.<br><br>
<strong>Нови есета</strong> пристигат всяко:<br>
- Пролет — 21 март<br>
- Лято — 20 юни<br>
- Есен — 22 септември<br>
- Зима — 21 декември<br><br>
Няма <strong>абонамент</strong> за известия — което означава:<br>
- Без спам.<br>
- Без реклами.<br>
- Без безинтересно съдържание.<br>
- Само любопитството на мозъчните ти клетки.<br>
- И страст към четенето, разбира се.<br><br>
Вярваме, че <strong>истината е свободна</strong>. И като такава — трябва да се търси със <strong>свободна воля</strong>.`,
    seasons: ["Зима", "Пролет", "Лято", "Есен"],
  },

  cs: {
    tagline: "Myšlenky o minulosti naší budoucnosti",
    issueFrequency: "Čtyři eseje ročně · Jedno eseje za čtvrtletí",
    featuredTag: "Doporučeno",
    sidebarRecentHeading: "Nedávná eseje",
    sidebarAboutHeading: "O tomto časopise",
    readMore: "Číst esej",
    footerText: "Stíny v jeskyni",
    issueLabel: (n, season, year) => `Číslo ${n} · ${season} ${year}`,
    about: `<strong>Stíny v jeskyni</strong> je sdílený esejistický časopis, vycházející čtyřikrát ročně.<br><br>Témata sahají od starověké filozofie po vědeckou fantastiku.`,
    seasons: ["Zima", "Jaro", "Léto", "Podzim"],
  },

  da: {
    tagline: "Tanker om fortiden i vores fremtids jeg",
    issueFrequency: "Fire essays garanteret om året · Ét essay pr. kvartal",
    featuredTag: "Fremhævet",
    sidebarRecentHeading: "Seneste essays",
    sidebarAboutHeading: "Om dette tidsskrift",
    readMore: "Læs essay",
    footerText: "Skygger i hulen",
    issueLabel: (n, season, year) => `Udgave ${n} · ${season} ${year}`,
    about: `<strong>Skygger i hulen</strong> er et delt essaytidsskrift, der udgives fire gange om året.`,
    seasons: ["Vinter", "Forår", "Sommer", "Efterår"],
  },

  de: {
    tagline: "Gedanken über die Vergangenheit unseres zukünftigen Ichs",
    issueFrequency: "Vier Essays pro Jahr garantiert · Ein Essay pro Quartal",
    featuredTag: "Empfohlen",
    sidebarRecentHeading: "Aktuelle Essays",
    sidebarAboutHeading: "Über diese Zeitschrift",
    readMore: "Essay lesen",
    footerText: "Schatten in der Höhle",
    issueLabel: (n, season, year) => `Ausgabe ${n} · ${season} ${year}`,
    about: `<strong>Schatten in der Höhle</strong> ist ein gemeinsames Essay-Journal, das viermal im Jahr erscheint.`,
    seasons: ["Winter", "Frühling", "Sommer", "Herbst"],
  },

  el: {
    tagline: "Σκέψεις για το παρελθόν του μελλοντικού μας εαυτού",
    issueFrequency: "Τέσσερα δοκίμια εγγυημένα ετησίως · Ένα δοκίμιο ανά τρίμηνο",
    featuredTag: "Προτεινόμενο",
    sidebarRecentHeading: "Πρόσφατα δοκίμια",
    sidebarAboutHeading: "Σχετικά με αυτό το περιοδικό",
    readMore: "Διαβάστε δοκίμιο",
    footerText: "Σκιές μέσα στο Σπήλαιο",
    issueLabel: (n, season, year) => `Τεύχος ${n} · ${season} ${year}`,
    about: `<strong>Σκιές μέσα στο Σπήλαιο</strong> είναι ένα κοινό περιοδικό δοκιμίων που εκδίδεται τέσσερις φορές το χρόνο.`,
    seasons: ["Χειμώνας", "Άνοιξη", "Καλοκαίρι", "Φθινόπωρο"],
  },

  es: {
    tagline: "Pensamientos sobre el pasado de nuestro yo futuro",
    issueFrequency: "Cuatro ensayos garantizados al año · Un ensayo por trimestre",
    featuredTag: "Destacado",
    sidebarRecentHeading: "Ensayos recientes",
    sidebarAboutHeading: "Sobre esta revista",
    readMore: "Leer ensayo",
    footerText: "Sombras en la Cueva",
    issueLabel: (n, season, year) => `Número ${n} · ${season} ${year}`,
    about: `<strong>Sombras en la Cueva</strong> es una revista de ensayos compartida, publicada cuatro veces al año.`,
    seasons: ["Invierno", "Primavera", "Verano", "Otoño"],
  },

  et: {
    tagline: "Mõtted meie tuleviku minevikust",
    issueFrequency: "Neli esseed aastas garanteeritud · Üks essee kvartalis",
    featuredTag: "Esiletõstetud",
    sidebarRecentHeading: "Viimased esseed",
    sidebarAboutHeading: "Sellest ajakirjast",
    readMore: "Loe esseed",
    footerText: "Varjud koopas",
    issueLabel: (n, season, year) => `Number ${n} · ${season} ${year}`,
    about: `<strong>Varjud koopas</strong> on ühine esseede ajakiri, mis ilmub neli korda aastas.`,
    seasons: ["Talv", "Kevad", "Suvi", "Sügis"],
  },

  fi: {
    tagline: "Ajatuksia tulevaisuuden minämme menneisyydestä",
    issueFrequency: "Neljä esseetä vuodessa taattu · Yksi essee per vuosineljännes",
    featuredTag: "Suositeltu",
    sidebarRecentHeading: "Viimeisimmät esseet",
    sidebarAboutHeading: "Tästä lehdestä",
    readMore: "Lue essee",
    footerText: "Varjoja luolassa",
    issueLabel: (n, season, year) => `Numero ${n} · ${season} ${year}`,
    about: `<strong>Varjoja luolassa</strong> on yhteinen esseeaikakauslehti, joka ilmestyy neljä kertaa vuodessa.`,
    seasons: ["Talvi", "Kevät", "Kesä", "Syksy"],
  },

  fr: {
    tagline: "Réflexions sur le passé de notre moi futur",
    issueFrequency: "Quatre essais garantis par an · Un essai par trimestre",
    featuredTag: "À la une",
    sidebarRecentHeading: "Essais récents",
    sidebarAboutHeading: "À propos de cette revue",
    readMore: "Lire l'essai",
    footerText: "Ombres dans la Caverne",
    issueLabel: (n, season, year) => `Numéro ${n} · ${season} ${year}`,
    about: `<strong>Ombres dans la Caverne</strong> est une revue d'essais partagée, publiée quatre fois par an.`,
    seasons: ["Hiver", "Printemps", "Été", "Automne"],
  },

  ga: {
    tagline: "Smaointe faoi am caite ár féin amach anseo",
    issueFrequency: "Ceithre aiste in aghaidh na bliana · Aiste amháin in aghaidh an ráithe",
    featuredTag: "Roghnaithe",
    sidebarRecentHeading: "Aistí is déanaí",
    sidebarAboutHeading: "Faoin iris seo",
    readMore: "Léigh an aiste",
    footerText: "Scáthanna sa Uaimh",
    issueLabel: (n, season, year) => `Eagrán ${n} · ${season} ${year}`,
    about: `<strong>Scáthanna sa Uaimh</strong> is iris aistí roinnte í, a fhoilsítear ceithre huaire sa bhliain.`,
    seasons: ["Geimhreadh", "Earrach", "Samhradh", "Fómhar"],
  },

  hr: {
    tagline: "Misli o prošlosti našeg budućeg ja",
    issueFrequency: "Četiri eseja zajamčena godišnje · Jedan esej po kvartalu",
    featuredTag: "Istaknuto",
    sidebarRecentHeading: "Nedavni eseji",
    sidebarAboutHeading: "O ovom časopisu",
    readMore: "Pročitaj esej",
    footerText: "Sjene u špilji",
    issueLabel: (n, season, year) => `Broj ${n} · ${season} ${year}`,
    about: `<strong>Sjene u špilji</strong> je zajednički esejistički časopis koji izlazi četiri puta godišnje.`,
    seasons: ["Zima", "Proljeće", "Ljeto", "Jesen"],
  },

  hu: {
    tagline: "Gondolatok jövőbeli énünk múltjáról",
    issueFrequency: "Évente négy esszé garantálva · Negyedévenként egy esszé",
    featuredTag: "Kiemelt",
    sidebarRecentHeading: "Legutóbbi esszék",
    sidebarAboutHeading: "E folyóiratról",
    readMore: "Esszé olvasása",
    footerText: "Árnyak a barlangban",
    issueLabel: (n, season, year) => `${n}. szám · ${season} ${year}`,
    about: `<strong>Árnyak a barlangban</strong> egy közös esszéfolyóirat, amely évente négyszer jelenik meg.`,
    seasons: ["Tél", "Tavasz", "Nyár", "Ősz"],
  },

  it: {
    tagline: "Riflessioni sul passato del nostro sé futuro",
    issueFrequency: "Quattro saggi garantiti all'anno · Un saggio per trimestre",
    featuredTag: "In evidenza",
    sidebarRecentHeading: "Saggi recenti",
    sidebarAboutHeading: "Informazioni su questa rivista",
    readMore: "Leggi il saggio",
    footerText: "Ombre nella Caverna",
    issueLabel: (n, season, year) => `Numero ${n} · ${season} ${year}`,
    about: `<strong>Ombre nella Caverna</strong> è una rivista di saggi condivisa, pubblicata quattro volte l'anno.`,
    seasons: ["Inverno", "Primavera", "Estate", "Autunno"],
  },

  lt: {
    tagline: "Mintys apie mūsų ateities praeities \u201Eaš\u201C",
    issueFrequency: "Keturi esė garantuoti per metus · Vienas esė per ketvirtį",
    featuredTag: "Rekomenduojama",
    sidebarRecentHeading: "Naujausi esė",
    sidebarAboutHeading: "Apie šį žurnalą",
    readMore: "Skaityti esė",
    footerText: "Šešėliai oloje",
    issueLabel: (n, season, year) => `Numeris ${n} · ${season} ${year}`,
    about: `<strong>Šešėliai oloje</strong> yra bendras esė žurnalas, leidžiamas keturis kartus per metus.`,
    seasons: ["Žiema", "Pavasaris", "Vasara", "Ruduo"],
  },

  lv: {
    tagline: "Domas par mūsu nākotnes es pagātni",
    issueFrequency: "Četri eseji gadā garantēti · Viens esejs ceturksnī",
    featuredTag: "Izceltais",
    sidebarRecentHeading: "Jaunākie eseji",
    sidebarAboutHeading: "Par šo žurnālu",
    readMore: "Lasīt eseju",
    footerText: "Ēnas alā",
    issueLabel: (n, season, year) => `Numurs ${n} · ${season} ${year}`,
    about: `<strong>Ēnas alā</strong> ir kopīgs eseju žurnāls, kas tiek publicēts četras reizes gadā.`,
    seasons: ["Ziema", "Pavasaris", "Vasara", "Rudens"],
  },

  mt: {
    tagline: "Ħsibijiet dwar il-passat tal-futur tagħna",
    issueFrequency: "Erba' essays garantiti fis-sena · Essay wieħed kull trimestru",
    featuredTag: "Evidenzjat",
    sidebarRecentHeading: "Essays riċenti",
    sidebarAboutHeading: "Dwar din il-gazzetta",
    readMore: "Aqra l-essay",
    footerText: "Dellijiet fil-Għar",
    issueLabel: (n, season, year) => `Edizzjoni ${n} · ${season} ${year}`,
    about: `<strong>Dellijiet fil-Għar</strong> hija rivista ta' essays kondiviża, ippubblikata erba' darbiet fis-sena.`,
    seasons: ["Xitwa", "Rebbiegħa", "Sajf", "Ħarifa"],
  },

  nl: {
    tagline: "Gedachten over het verleden van ons toekomstige zelf",
    issueFrequency: "Vier essays per jaar gegarandeerd · Één essay per kwartaal",
    featuredTag: "Uitgelicht",
    sidebarRecentHeading: "Recente essays",
    sidebarAboutHeading: "Over dit tijdschrift",
    readMore: "Essay lezen",
    footerText: "Schaduwen in de Grot",
    issueLabel: (n, season, year) => `Nummer ${n} · ${season} ${year}`,
    about: `<strong>Schaduwen in de Grot</strong> is een gedeeld essaytijdschrift, vier keer per jaar gepubliceerd.`,
    seasons: ["Winter", "Lente", "Zomer", "Herfst"],
  },

  pl: {
    tagline: "Myśli o przeszłości naszego przyszłego ja",
    issueFrequency: "Cztery eseje gwarantowane rocznie · Jeden esej na kwartał",
    featuredTag: "Wyróżnione",
    sidebarRecentHeading: "Najnowsze eseje",
    sidebarAboutHeading: "O tym piśmie",
    readMore: "Czytaj esej",
    footerText: "Cienie w jaskini",
    issueLabel: (n, season, year) => `Numer ${n} · ${season} ${year}`,
    about: `<strong>Cienie w jaskini</strong> to wspólny dziennik esejów, publikowany cztery razy w roku.`,
    seasons: ["Zima", "Wiosna", "Lato", "Jesień"],
  },

  pt: {
    tagline: "Pensamentos sobre o passado do nosso eu futuro",
    issueFrequency: "Quatro ensaios garantidos por ano · Um ensaio por trimestre",
    featuredTag: "Destaque",
    sidebarRecentHeading: "Ensaios recentes",
    sidebarAboutHeading: "Sobre esta revista",
    readMore: "Ler ensaio",
    footerText: "Sombras na Caverna",
    issueLabel: (n, season, year) => `Número ${n} · ${season} ${year}`,
    about: `<strong>Sombras na Caverna</strong> é uma revista de ensaios partilhada, publicada quatro vezes por ano.`,
    seasons: ["Inverno", "Primavera", "Verão", "Outono"],
  },

  ro: {
    tagline: "Gânduri despre trecutul eului nostru viitor",
    issueFrequency: "Patru eseuri garantate pe an · Un eseu pe trimestru",
    featuredTag: "Recomandat",
    sidebarRecentHeading: "Eseuri recente",
    sidebarAboutHeading: "Despre această revistă",
    readMore: "Citește eseul",
    footerText: "Umbre în Peșteră",
    issueLabel: (n, season, year) => `Numărul ${n} · ${season} ${year}`,
    about: `<strong>Umbre în Peșteră</strong> este o revistă de eseuri partajată, publicată de patru ori pe an.`,
    seasons: ["Iarnă", "Primăvară", "Vară", "Toamnă"],
  },

  sk: {
    tagline: "Myšlienky o minulosti nášho budúceho ja",
    issueFrequency: "Štyri eseje ročne garantované · Jedna esej za štvrťrok",
    featuredTag: "Odporúčané",
    sidebarRecentHeading: "Nedávne eseje",
    sidebarAboutHeading: "O tomto časopise",
    readMore: "Čítať esej",
    footerText: "Tiene v jaskyni",
    issueLabel: (n, season, year) => `Číslo ${n} · ${season} ${year}`,
    about: `<strong>Tiene v jaskyni</strong> je zdieľaný esejistický časopis vychádzajúci štyrikrát ročne.`,
    seasons: ["Zima", "Jar", "Leto", "Jeseň"],
  },

  sl: {
    tagline: "Misli o preteklosti našega prihodnjega jaza",
    issueFrequency: "Štiri eseji na leto zajamčeni · En esej na četrtletje",
    featuredTag: "Izpostavljeno",
    sidebarRecentHeading: "Nedavni eseji",
    sidebarAboutHeading: "O tej reviji",
    readMore: "Preberi esej",
    footerText: "Sence v jami",
    issueLabel: (n, season, year) => `Številka ${n} · ${season} ${year}`,
    about: `<strong>Sence v jami</strong> je skupna esejistična revija, ki izhaja štirikrat na leto.`,
    seasons: ["Zima", "Pomlad", "Poletje", "Jesen"],
  },

  sv: {
    tagline: "Tankar om det förflutna hos vårt framtida jag",
    issueFrequency: "Fyra essäer garanterade per år · En essä per kvartal",
    featuredTag: "Utvald",
    sidebarRecentHeading: "Senaste essäer",
    sidebarAboutHeading: "Om denna tidskrift",
    readMore: "Läs essän",
    footerText: "Skuggor i grottan",
    issueLabel: (n, season, year) => `Nummer ${n} · ${season} ${year}`,
    about: `<strong>Skuggor i grottan</strong> är en delad essätidskrift som publiceras fyra gånger om året.`,
    seasons: ["Vinter", "Vår", "Sommar", "Höst"],
  },

  ru: {
    tagline: "Мысли о прошлом нашего будущего «я»",
    issueFrequency: "Четыре эссе в год гарантированно · Одно эссе в квартал",
    featuredTag: "Избранное",
    sidebarRecentHeading: "Последние эссе",
    sidebarAboutHeading: "Об этом журнале",
    readMore: "Читать эссе",
    footerText: "Тени в пещере",
    issueLabel: (n, season, year) => `Выпуск ${n} · ${season} ${year}`,
    about: `<strong>Тени в пещере</strong> — это совместный журнал эссе, выходящий четыре раза в год.`,
    seasons: ["Зима", "Весна", "Лето", "Осень"],
  },

  uk: {
    tagline: "Думки про минуле нашого майбутнього «я»",
    issueFrequency: "Чотири есе на рік гарантовано · Одне есе на квартал",
    featuredTag: "Вибране",
    sidebarRecentHeading: "Останні есе",
    sidebarAboutHeading: "Про цей журнал",
    readMore: "Читати есе",
    footerText: "Тіні в печері",
    issueLabel: (n, season, year) => `Випуск ${n} · ${season} ${year}`,
    about: `<strong>Тіні в печері</strong> — це спільний журнал есе, що виходить чотири рази на рік.`,
    seasons: ["Зима", "Весна", "Літо", "Осінь"],
  },

  tr: {
    tagline: "Gelecekteki benliğimizin geçmişi üzerine düşünceler",
    issueFrequency: "Yılda dört makale garantili · Üç ayda bir makale",
    featuredTag: "Öne çıkan",
    sidebarRecentHeading: "Son makaleler",
    sidebarAboutHeading: "Bu dergi hakkında",
    readMore: "Makaleyi oku",
    footerText: "Mağaradaki Gölgeler",
    issueLabel: (n, season, year) => `Sayı ${n} · ${season} ${year}`,
    about: `<strong>Mağaradaki Gölgeler</strong>, yılda dört kez yayımlanan ortak bir deneme dergisidir.`,
    seasons: ["Kış", "İlkbahar", "Yaz", "Sonbahar"],
  },

  zh: {
    tagline: "对我们未来自我之过去的思考",
    issueFrequency: "每年保证四篇文章 · 每季度一篇",
    featuredTag: "精选",
    sidebarRecentHeading: "近期文章",
    sidebarAboutHeading: "关于本刊",
    readMore: "阅读文章",
    footerText: "洞穴中的影子",
    issueLabel: (n, season, year) => `第${n}期 · ${year}年${season}`,
    about: `<strong>洞穴中的影子</strong>是一本共享的随笔期刊，每年出版四次。`,
    seasons: ["冬", "春", "夏", "秋"],
  },

  ar: {
    tagline: "أفكار حول ماضي ذواتنا المستقبلية",
    issueFrequency: "أربع مقالات مضمونة سنويًا · مقالة واحدة كل ربع سنة",
    featuredTag: "مميز",
    sidebarRecentHeading: "أحدث المقالات",
    sidebarAboutHeading: "عن هذه المجلة",
    readMore: "اقرأ المقالة",
    footerText: "ظلال داخل الكهف",
    issueLabel: (n, season, year) => `العدد ${n} · ${season} ${year}`,
    about: `<strong>ظلال داخل الكهف</strong> هي مجلة مقالات مشتركة، تصدر أربع مرات في السنة.`,
    seasons: ["الشتاء", "الربيع", "الصيف", "الخريف"],
  },
};

// Fallback to English for any missing key
function t(key, ...args) {
  const lang = window.__activeLang || "en";
  const dict = translations[lang] || translations["en"];
  const val = dict[key] !== undefined ? dict[key] : translations["en"][key];
  if (typeof val === "function") return val(...args);
  return val ?? key;
}