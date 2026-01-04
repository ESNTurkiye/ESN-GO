import { FAQ_CONFIG } from '@/components/sections/faq/constants';

export interface GuideProblem {
    id: string;
    problem: string;
    solution: string;
}

export interface GuideContent {
    title: string;
    description: string;
    problems: GuideProblem[];
}

export interface GuideData {
    id: string;
    image: string;
    color: string;
    en: GuideContent;
    tr: GuideContent;
}

export const GUIDES: Record<string, GuideData> = {
    'accommodation': {
        id: 'accommodation',
        image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5',
        color: FAQ_CONFIG.COLORS.DARK_BLUE,
        en: {
            title: 'Accommodation',
            description: 'Everything you need to know about finding a place to stay.',
            problems: [
                {
                    id: 'p1',
                    problem: 'Where should I look for housing?',
                    solution: 'Start with your university\'s international office. They often have lists of trusted landlords or dormitories. Facebook groups like "Erasmus [City Name]" are also very popular, but be wary of scams. Websites like "Sahibinden" are widely used for renting a flat in Turkey.'
                },
                {
                    id: 'p2',
                    problem: 'How do I avoid rental scams?',
                    solution: 'Never send money before seeing the apartment in person or having a trusted friend check it. Ask for a video call tour if you are not in the country. Verify the landlord\'s identity and ask for a formal contract.'
                },
                {
                    id: 'p3',
                    problem: 'What is a deposit and how much is it?',
                    solution: 'A deposit is a security payment usually equal to one or two months\' rent. It should be returned to you when you move out, provided there are no damages to the property. Make sure the deposit terms are clearly stated in your contract.'
                }
            ]
        },
        tr: {
            title: 'Konaklama',
            description: 'Kalacak yer bulma hakkında bilmeniz gereken her şey.',
            problems: [
                {
                    id: 'p1',
                    problem: 'Nerede ev aramalıyım?',
                    solution: 'Öncelikle üniversitenizin uluslararası ofisiyle görüşün. Genellikle güvenilir ev sahipleri veya yurt listeleri vardır. "Erasmus [Şehir Adı]" gibi Facebook grupları da popülerdir ancak dolandırıcılara dikkat edin. "Sahibinden" gibi siteler Türkiye\'de ev kiralamak için yaygın olarak kullanılır.'
                },
                {
                    id: 'p2',
                    problem: 'Kiralama dolandırıcılıklarından nasıl kaçınırım?',
                    solution: 'Daireyi şahsen görmeden veya güvendiğiniz bir arkadaşınıza kontrol ettirmeden asla para göndermeyin. Ülkede değilseniz görüntülü arama turu isteyin. Ev sahibinin kimliğini doğrulayın ve resmi bir sözleşme isteyin.'
                },
                {
                    id: 'p3',
                    problem: 'Depozito nedir ve ne kadardır?',
                    solution: 'Depozito, genellikle bir veya iki aylık kiraya eşit bir güvence ödemesidir. Mülke herhangi bir zarar verilmediği takdirde taşındığınızda size iade edilmelidir. Depozito şartlarının sözleşmenizde açıkça belirtildiğinden emin olun.'
                }
            ]
        }
    },
    'sim-cards': {
        id: 'sim-cards',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
        color: FAQ_CONFIG.COLORS.CYAN,
        en: {
            title: 'SIM Cards',
            description: 'Stay connected during your exchange.',
            problems: [
                {
                    id: 'p1',
                    problem: 'Which operator should I choose?',
                    solution: 'Turkcell, Vodafone, and Turk Telekom are the main operators. Turkcell generally has the best coverage but might be slightly more expensive. Vodafone has good youth packages.'
                },
                {
                    id: 'p2',
                    problem: 'What happens after 120 days?',
                    solution: 'If you use a foreign phone with a Turkish SIM card, it will be blocked after 120 days unless you pay a registration fee (which is quite high). For shorter stays, this isn\'t an issue. For longer stays, consider buying a cheap local phone.'
                }
            ]
        },
        tr: {
            title: 'SIM Kartlar',
            description: 'Değişim programınız boyunca bağlantıda kalın.',
            problems: [
                {
                    id: 'p1',
                    problem: 'Hangi operatörü seçmeliyim?',
                    solution: 'Turkcell, Vodafone ve Türk Telekom ana operatörlerdir. Turkcell genellikle en iyi kapsama alanına sahiptir ancak biraz daha pahalı olabilir. Vodafone\'un iyi gençlik paketleri vardır.'
                },
                {
                    id: 'p2',
                    problem: '120 gün sonra ne olur?',
                    solution: 'Yabancı bir telefonu Türk SIM kartıyla kullanırsanız, kayıt ücreti (oldukça yüksektir) ödemediğiniz takdirde 120 gün sonra engellenir. Kısa süreli konaklamalar için bu bir sorun değildir. Daha uzun süreli konaklamalar için ucuz bir yerel telefon almayı düşünün.'
                }
            ]
        }
    },
    'banking': {
        id: 'banking',
        image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc',
        color: FAQ_CONFIG.COLORS.MAGENTA,
        en: {
            title: 'Banking',
            description: 'Managing your finances abroad.',
            problems: [
                {
                    id: 'p1',
                    problem: 'How do I open a bank account?',
                    solution: 'You will need a Tax Number which you can get online, your passport, and sometimes proof of address (like a student certificate or dormitory document). Ziraat Bank and İş Bank are popular choices.'
                },
                {
                    id: 'p2',
                    problem: 'Can I use my home bank card?',
                    solution: 'Yes, but check your bank\'s foreign transaction fees. Using a card like Revolut or Wise can save you a lot of money on exchange rates and fees.'
                }
            ]
        },
        tr: {
            title: 'Bankacılık',
            description: 'Yurt dışında finansal işlemlerinizi yönetin.',
            problems: [
                {
                    id: 'p1',
                    problem: 'Banka hesabı nasıl açarım?',
                    solution: 'Online alabileceğiniz bir Vergi Numarasına, pasaportunuza ve bazen adres kanıtına (öğrenci belgesi veya yurt belgesi gibi) ihtiyacınız olacaktır. Ziraat Bankası ve İş Bankası popüler seçeneklerdir.'
                },
                {
                    id: 'p2',
                    problem: 'Kendi banka kartımı kullanabilir miyim?',
                    solution: 'Evet, ancak bankanızın yurt dışı işlem ücretlerini kontrol edin. Revolut veya Wise gibi kartlar kullanmak döviz kurları ve ücretlerde size çok para kazandırabilir.'
                }
            ]
        }
    },
    'esncard': {
        id: 'esncard',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
        color: FAQ_CONFIG.COLORS.GREEN,
        en: {
            title: 'ESNcard',
            description: 'Your membership card to the Erasmus generation.',
            problems: [
                {
                    id: 'p1',
                    problem: 'Where can I get an ESNcard?',
                    solution: 'You can get it from your local ESN section. Look for their office hours or events during the Welcome Week.'
                },
                {
                    id: 'p2',
                    problem: 'What discounts do I get?',
                    solution: '**will be filled in the future**'
                }
            ]
        },
        tr: {
            title: 'ESNcard',
            description: 'Erasmus nesline üyelik kartınız.',
            problems: [
                {
                    id: 'p1',
                    problem: 'ESNcard\'ı nereden alabilirim?',
                    solution: 'Yerel ESN şubenizden alabilirsiniz. Hoş geldin haftası boyunca ofis saatlerini veya etkinliklerini takip edin.'
                },
                {
                    id: 'p2',
                    problem: 'Hangi indirimleri alırım?',
                    solution: '**gelecekte doldurulacak**'
                }
            ]
        }
    }
};
