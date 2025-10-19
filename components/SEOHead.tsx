import Head from 'next/head';

interface SEOHeadProps {
	title?: string;
	description?: string;
	keywords?: string;
	image?: string;
	url?: string;
}

export default function SEOHead({
	title = 'Sunleaf — Оптові поставки преміум кави, чаю та солодощів',
	description = 'Оптові поставки преміум кави, чаю та солодощів для B2B. Арабіка від 320 грн/кг. Безкоштовна доставка від 2000 грн.',
	keywords = 'оптова кава, купити чай оптом, кава для кав\'ярні, арабіка оптом, постачальник кави',
	image = '/images/og-image.jpg',
	url = 'https://sunleaf.ua'
}: SEOHeadProps) {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
			<meta name="theme-color" content="#667eea" />
			<link rel="icon" href="/favicon.ico" />
			<link rel="manifest" href="/manifest.json" />
			<link rel="canonical" href={url} />

			{/* Open Graph */}
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta property="og:url" content={url} />
			<meta property="og:site_name" content="Sunleaf" />

			{/* Twitter Card */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />

			{/* Schema.org */}
			<script type="application/ld+json">
				{JSON.stringify({
					"@context": "https://schema.org",
					"@type": "LocalBusiness",
					"name": "Sunleaf",
					"description": description,
					"image": image,
					"url": url,
					"telephone": "+380671234567",
					"email": "info@sunleaf.ua",
					"address": {
						"@type": "PostalAddress",
						"streetAddress": "вул. Київська, 75",
						"addressLocality": "Житомир",
						"addressCountry": "UA"
					},
					"priceRange": "$$",
					"openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-15:00"
				})}
			</script>
		</Head>
	);
}
