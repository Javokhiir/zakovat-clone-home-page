
export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "O'zbekistonning poytaxti qaysi shahar?",
    options: ["Samarqand", "Toshkent", "Buxoro", "Andijon"],
    correct: 1,
    explanation: "Toshkent O'zbekistonning poytaxti va eng yirik shahri hisoblanadi."
  },
  {
    id: 2,
    question: "2 + 2 × 3 nechaga teng?",
    options: ["12", "8", "10", "6"],
    correct: 1,
    explanation: "Matematik amallar tartibiga ko'ra avval ko'paytirish: 2 + (2 × 3) = 2 + 6 = 8"
  },
  {
    id: 3,
    question: "Quyoshdan Yerga yorug'lik necha daqiqada yetadi?",
    options: ["8 daqiqa", "4 daqiqa", "12 daqiqa", "1 daqiqa"],
    correct: 0,
    explanation: "Yorug'lik tezligi 300,000 km/s, Quyosh-Yer masofasi ~150 million km."
  },
  {
    id: 4,
    question: "Alisher Navoiy qaysi asrlarda yashagan?",
    options: ["XIV-XV asr", "XV-XVI asr", "XIII-XIV asr", "XVI-XVII asr"],
    correct: 1,
    explanation: "Alisher Navoiy 1441-1501 yillarda yashagan, bu XV-XVI asrga to'g'ri keladi."
  },
  {
    id: 5,
    question: "Eng katta okean qaysi?",
    options: ["Atlantika", "Hind", "Tinch", "Shimoliy muz"],
    correct: 2,
    explanation: "Tinch okeani Yer yuzasining 1/3 qismini egallaydi."
  },
  {
    id: 6,
    question: "1 kilometrda necha metr bor?",
    options: ["100", "1000", "10000", "500"],
    correct: 1,
    explanation: "Kilo- prefiksi mingni bildiradi, shuning uchun 1 km = 1000 m"
  },
  {
    id: 7,
    question: "Kompyuterning 'miysi' nima deyiladi?",
    options: ["RAM", "Hard disk", "Protsessor", "Monitor"],
    correct: 2,
    explanation: "Protsessor barcha hisob-kitoblarni bajaradi va kompyuterning asosiy qismi hisoblanadi."
  },
  {
    id: 8,
    question: "Birinchi Jahon urushi qachon boshlangan?",
    options: ["1914", "1918", "1912", "1916"],
    correct: 0,
    explanation: "Birinchi Jahon urushi 1914 yil 28 iyulda boshlangan."
  },
  {
    id: 9,
    question: "Suvning qaynash harorati necha gradus?",
    options: ["90°C", "100°C", "110°C", "95°C"],
    correct: 1,
    explanation: "Standart atmosfera bosimida suv 100°C da qaynaydi."
  },
  {
    id: 10,
    question: "Eng kichik sayyora qaysi?",
    options: ["Merkuriy", "Mars", "Venera", "Pluto"],
    correct: 0,
    explanation: "Merkuriy Quyosh sistemasidagi eng kichik sayyora hisoblanadi."
  },
  {
    id: 11,
    question: "HTML nimani bildiradi?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
    correct: 0,
    explanation: "HTML - HyperText Markup Language, veb-sahifalar yaratish uchun ishlatiladi."
  },
  {
    id: 12,
    question: "Fibonacci ketma-ketligida 8 dan keyingi son nima?",
    options: ["11", "13", "15", "12"],
    correct: 1,
    explanation: "Fibonacci: 1,1,2,3,5,8,13... Har bir son oldingi ikkitasining yig'indisi."
  },
  {
    id: 13,
    question: "O'zbekiston nechta viloyatdan iborat?",
    options: ["12", "14", "13", "15"],
    correct: 1,
    explanation: "O'zbekiston 12 ta viloyat, 1 ta avtonomiya va Toshkent shahridan iborat."
  },
  {
    id: 14,
    question: "Eng yuqori tog' cho'qqisi qaysi?",
    options: ["K2", "Everest", "Kangchenjunga", "Annapurna"],
    correct: 1,
    explanation: "Everest tog'i 8848 metr balandlikda joylashgan."
  },
  {
    id: 15,
    question: "Atom yadrosi nimalardan iborat?",
    options: ["Proton va elektron", "Proton va neytron", "Neytron va elektron", "Faqat proton"],
    correct: 1,
    explanation: "Atom yadrosi proton va neytronlardan iborat, elektronlar esa yadroni aylanib yuradi."
  },
  {
    id: 16,
    question: "Ingliz alifbosida nechta harf bor?",
    options: ["24", "26", "28", "25"],
    correct: 1,
    explanation: "Ingliz alifbosida A dan Z gacha 26 ta harf mavjud."
  },
  {
    id: 17,
    question: "Qaysi vitamin quyosh nuridan olinadi?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    correct: 3,
    explanation: "Vitamin D teri quyosh nurini yutganda sintez qilinadi."
  },
  {
    id: 18,
    question: "Eng tez hayvon qaysi?",
    options: ["Gepard", "Sherquyruq", "Yo'lbars", "Burgut"],
    correct: 0,
    explanation: "Gepard 120 km/soat tezlikka yeta oladi."
  },
  {
    id: 19,
    question: "Internet qachon yaratilgan?",
    options: ["1969", "1975", "1981", "1965"],
    correct: 0,
    explanation: "Internet 1969 yilda ARPANET loyihasi sifatida boshlangan."
  },
  {
    id: 20,
    question: "O'zbekiston mustaqillik kunini qachon nishonlaydi?",
    options: ["1-yanvar", "31-avgust", "1-sentabr", "8-dekabr"],
    correct: 2,
    explanation: "O'zbekiston mustaqilligi 1991 yil 1 sentyabrda e'lon qilingan."
  },
  {
    id: 21,
    question: "Eng katta mammal qaysi?",
    options: ["Fil", "Kit shark", "Koko kit", "Jirafa"],
    correct: 2,
    explanation: "Koko kit uzunligi 30 metrgacha yeta oladigan eng katta mammal."
  },
  {
    id: 22,
    question: "Beethoven nechta simfoniya yozgan?",
    options: ["7", "9", "11", "5"],
    correct: 1,
    explanation: "Ludwig van Beethoven jami 9 ta simfoniya yozgan."
  },
  {
    id: 23,
    question: "Qaysi element kimyoviy jadvalda birinchi o'rinda turadi?",
    options: ["Geliy", "Vodorod", "Litiy", "Uglerod"],
    correct: 1,
    explanation: "Vodorod eng oddiy element bo'lib, atom raqami 1."
  },
  {
    id: 24,
    question: "Shakespearning mashhur asari qaysi?",
    options: ["Otello", "Hamlet", "Romeo va Juletta", "Hammasi"],
    correct: 3,
    explanation: "Barcha ko'rsatilgan asarlar Shakespeare tomonidan yozilgan."
  },
  {
    id: 25,
    question: "Yer atrofida nechta tabiiy yo'ldosh bor?",
    options: ["1", "2", "3", "0"],
    correct: 0,
    explanation: "Oy - Yerning yagona tabiiy yo'ldoshi."
  },
  {
    id: 26,
    question: "Qaysi davlat eng ko'p aholi soniga ega?",
    options: ["Hindiston", "Xitoy", "AQSh", "Indoneziya"],
    correct: 1,
    explanation: "Xitoy 1.4 milliard aholisi bilan dunyodagi eng ko'p aholili davlat."
  },
  {
    id: 27,
    question: "Fotosintez jarayonida nimalar ishtirok etadi?",
    options: ["Suv va karbonat angidrid", "Suv va kislorod", "Kislorod va azot", "Suv va azot"],
    correct: 0,
    explanation: "Fotosintezda suv va karbonat angidrid yorug'lik yordamida glyukoza va kislorodga aylanadi."
  },
  {
    id: 28,
    question: "Eng qadimgi sivilizatsiya qaysi?",
    options: ["Misr", "Mesopotamiya", "Hindiston", "Xitoy"],
    correct: 1,
    explanation: "Mesopotamiya sivilizatsiyasi miloddan avvalgi 3500-yillarda paydo bo'lgan."
  },
  {
    id: 29,
    question: "Qaysi sayyora 'Qizil sayyora' deb ataladi?",
    options: ["Venera", "Mars", "Yupiter", "Saturn"],
    correct: 1,
    explanation: "Mars temir oksidi tufayli qizil rangga ega va 'Qizil sayyora' deb ataladi."
  },
  {
    id: 30,
    question: "Dunyodagi eng uzun daryo qaysi?",
    options: ["Amazon", "Nil", "Missisipi", "Yangtsze"],
    correct: 1,
    explanation: "Nil daryosi 6650 km uzunlik bilan dunyodagi eng uzun daryo."
  },
  {
    id: 31,
    question: "Qaysi gaz atmosferada eng ko'p?",
    options: ["Kislorod", "Azot", "Karbonat angidrid", "Argon"],
    correct: 1,
    explanation: "Atmosferada azot 78%, kislorod 21% ni tashkil qiladi."
  },
  {
    id: 32,
    question: "Birinchi kosmosga uchgan odam kim?",
    options: ["Neil Armstrong", "Yuriy Gagarin", "Alan Shepard", "John Glenn"],
    correct: 1,
    explanation: "Yuriy Gagarin 1961 yil 12 aprelda birinchi kosmosga uchgan."
  },
  {
    id: 33,
    question: "DNA nima uchun muhim?",
    options: ["Energiya saqlash", "Genetik ma'lumot saqlash", "Ovqat hazm qilish", "Nafas olish"],
    correct: 1,
    explanation: "DNA barcha tirik mavjudotlarda genetik ma'lumotni saqlaydi."
  },
  {
    id: 34,
    question: "Qaysi davlat eng katta maydonli?",
    options: ["Kanada", "Xitoy", "Rossiya", "AQSh"],
    correct: 2,
    explanation: "Rossiya 17.1 million km² maydon bilan dunyodagi eng katta davlat."
  },
  {
    id: 35,
    question: "Insonning normal tana harorati necha?",
    options: ["36.6°C", "37°C", "36°C", "37.5°C"],
    correct: 0,
    explanation: "Insonning normal tana harorati 36.6°C hisoblanadi."
  },
  {
    id: 36,
    question: "Qaysi asrda Amerika kashf etilgan?",
    options: ["XIV asr", "XV asr", "XVI asr", "XIII asr"],
    correct: 1,
    explanation: "Kolumb 1492 yilda, XV asrda Amerikani kashf etgan."
  },
  {
    id: 37,
    question: "Eng kichik mammal qaysi?",
    options: ["Sichqon", "Ko'rshapalak", "Etruscha mushuk sichqoni", "Lemur"],
    correct: 2,
    explanation: "Etruscha mushuk sichqoni 3-4 sm uzunlikda va 2 gram og'irlikda."
  },
  {
    id: 38,
    question: "Qaysi metal xona haroratida suyuq?",
    options: ["Simob", "Temir", "Mis", "Oltin"],
    correct: 0,
    explanation: "Simob xona haroratida suyuq holda bo'luvchi yagona metal."
  },
  {
    id: 39,
    question: "Dunyodagi eng baland bino qaysi?",
    options: ["Empire State Building", "Burj Khalifa", "CN Tower", "Taipei 101"],
    correct: 1,
    explanation: "Burj Khalifa Dubayda joylashgan va 828 metr balandlikda."
  },
  {
    id: 40,
    question: "Qaysi yilda Birinchi Jahon urushi tugagan?",
    options: ["1917", "1918", "1919", "1920"],
    correct: 1,
    explanation: "Birinchi Jahon urushi 1918 yil 11 noyabrda tugagan."
  },
  {
    id: 41,
    question: "Eng ko'p tarqalgan qon guruhi qaysi?",
    options: ["A", "B", "AB", "O"],
    correct: 3,
    explanation: "O qon guruhi dunyo aholisining taxminan 45% ida uchraydi."
  },
  {
    id: 42,
    question: "Qaysi vitamin C vitaminiga boy?",
    options: ["Sabzi", "Limon", "Go'sht", "Non"],
    correct: 1,
    explanation: "Sitrus mevalar, ayniqsa limon C vitamini bilan boy."
  },
  {
    id: 43,
    question: "Eng tez o'sadigan o'simlik qaysi?",
    options: ["Bambuk", "Qarag'ay", "Eman", "Tol"],
    correct: 0,
    explanation: "Ba'zi bambuk turlari kuniga 1 metrgacha o'sa oladi."
  },
  {
    id: 44,
    question: "Qaysi davlat eng ko'p til bor?",
    options: ["Hindiston", "Papua Yangi Gvineya", "Indoneziya", "Nigeriya"],
    correct: 1,
    explanation: "Papua Yangi Gvineyada 800 dan ortiq til mavjud."
  },
  {
    id: 45,
    question: "Eng qadimgi universitet qaysi?",
    options: ["Oxford", "Al-Azhar", "Bologna", "Paris"],
    correct: 1,
    explanation: "Al-Azhar universiteti 970 yilda Qohirada tashkil etilgan."
  },
  {
    id: 46,
    question: "Qaysi sayyora eng issiq?",
    options: ["Merkuriy", "Venera", "Mars", "Yer"],
    correct: 1,
    explanation: "Venera atmosferasidagi karbonat angidrid tufayli 460°C gacha qiziydi."
  },
  {
    id: 47,
    question: "Eng katta cho'l qaysi?",
    options: ["Sahara", "Gobi", "Kalahari", "Antarktida"],
    correct: 3,
    explanation: "Antarktida dunyodagi eng katta cho'l hisoblanadi (14 million km²)."
  },
  {
    id: 48,
    question: "Qaysi element eng yengil?",
    options: ["Geliy", "Vodorod", "Litiy", "Neon"],
    correct: 1,
    explanation: "Vodorod eng yengil element bo'lib, atom og'irligi 1."
  },
  {
    id: 49,
    question: "Eng katta yirtqich hayvon qaysi?",
    options: ["Oq ayiq", "Qo'ng'ir ayiq", "Yo'lbars", "Sher"],
    correct: 0,
    explanation: "Oq ayiq erkagi 800 kg gacha og'irlikka yeta oladi."
  },
  {
    id: 50,
    question: "Qaysi okean eng chuqur?",
    options: ["Atlantika", "Hind", "Tinch", "Shimoliy muz"],
    correct: 2,
    explanation: "Tinch okeanidagi Mariana chuqurligi 11,000 metr chuqurlikda."
  }
];
