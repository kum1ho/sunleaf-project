import Head from 'next/head';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import Benefits from '../components/Benefits/Benefits';
import Catalog from '../components/Catalog/Catalog';
import ForWhom from '../components/ForWhom/ForWhom';
import CooperationProcess from '../components/CooperationProcess/CooperationProcess';
import Reviews from '../components/Reviews/Reviews';
import SavingsCalculator from '../components/SavingsCalculator/SavingsCalculator';
import Contacts from '../components/Contacts/Contacts';
import ChatBot from '../components/ChatBot/ChatBot';
import OnlineConsultant from '../components/OnlineConsultant/OnlineConsultant';
import Cart from '../components/Cart/Cart';

export default function Home() {
	return (
		<>
			<Head>
				<title>Sunleaf — Оптові поставки преміум кави, чаю та солодощів | Житомир</title>
				<meta
					name="description"
					content="Sunleaf (Житомир) — оптові поставки преміум кави, чаю та солодощів для B2B: кав'ярні, ресторани, готелі, офіси. Арабіка від 320 грн/кг. Безкоштовна доставка від 2000 грн. ☎️ +380 67 123-45-67"
				/>
				<meta name="keywords" content="оптова кава Житомир, купити чай оптом, кава для кав'ярні, арабіка оптом, робуста ціна, чай оптом Україна, солодощі для ресторану, постачальник кави Житомир" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="robots" content="index, follow" />
				<meta name="author" content="Sunleaf Ukraine" />

				{/* Open Graph */}
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Sunleaf — Оптові поставки преміум кави та чаю | Житомир" />
				<meta property="og:description" content="Арабіка від 320 грн/кг, Робуста від 280 грн/кг. Безкоштовна доставка по Житомиру від 2000 грн. Мінімальне замовлення 5 кг." />
				<meta property="og:image" content="https://sunleaf-project.vercel.app/images/og-image.jpg" />
				<meta property="og:url" content="https://sunleaf-project.vercel.app" />
				<meta property="og:site_name" content="Sunleaf Ukraine" />

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Sunleaf — Оптові поставки преміум кави та чаю" />
				<meta name="twitter:description" content="Арабіка від 320 грн/кг, Робуста від 280 грн/кг. Безкоштовна доставка по Житомиру від 2000 грн." />
				<meta name="twitter:image" content="https://sunleaf-project.vercel.app/images/og-image.jpg" />

				{/* Schema.org для SEO */}
				<script type="application/ld+json">
					{JSON.stringify({
						"@context": "https://schema.org",
						"@type": "LocalBusiness",
						"name": "Sunleaf",
						"description": "Оптові поставки преміум кави, чаю та солодощів для B2B бізнесу",
						"address": {
							"@type": "PostalAddress",
							"streetAddress": "вул. Київська, 75",
							"addressLocality": "Житомир",
							"postalCode": "10000",
							"addressRegion": "Житомирська область",
							"addressCountry": "UA"
						},
						"telephone": "+380671234567",
						"email": "info@sunleaf.ua",
						"url": "https://sunleaf-project.vercel.app",
						"priceRange": "$$-$$$",
						"openingHours": ["Mo-Fr 09:00-18:00", "Sa 10:00-15:00"],
						"image": "https://sunleaf-project.vercel.app/images/logo.png",
						"sameAs": [
							"https://github.com/kum1ho/sunleaf-project"
						],
						"aggregateRating": {
							"@type": "AggregateRating",
							"ratingValue": "4.8",
							"reviewCount": "127"
						},
						"offers": [
							{
								"@type": "Offer",
								"name": "Арабіка преміум",
								"price": "320",
								"priceCurrency": "UAH",
								"availability": "https://schema.org/InStock"
							},
							{
								"@type": "Offer", 
								"name": "Робуста В'єтнам",
								"price": "280",
								"priceCurrency": "UAH",
								"availability": "https://schema.org/InStock"
							}
						]
					})}
				</script>

				{/* Додаткові мета-теги для кращого SEO */}
				<link rel="canonical" href="https://sunleaf-project.vercel.app" />
				<meta name="geo.region" content="UA-18" />
				<meta name="geo.placename" content="Житомир" />
				<meta name="geo.position" content="50.2547;28.6587" />
				<meta name="ICBM" content="50.2547, 28.6587" />
			</Head>

			<Header />
			<main>
				<Hero />
				<Benefits />
				<Catalog />
				<ForWhom />
				<CooperationProcess />
				<Reviews />
				<SavingsCalculator />
				<Contacts />
			</main>
			<Footer />
			
			{/* Floating elements */}
			<ChatBot />
			<OnlineConsultant />
			<Cart />
		</>
	);
}
