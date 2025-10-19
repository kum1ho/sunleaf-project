import SEOHead from '../components/SEOHead';
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
			<SEOHead />
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
			<ChatBot />
			<OnlineConsultant />
			<Cart />

			<style jsx global>{`
				* {
					margin: 0;
					padding: 0;
					box-sizing: border-box;
				}
				
				html {
					scroll-behavior: smooth;
				}
				
				body {
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
					overflow-x: hidden;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}

				/* Responsive Typography */
				h1 { font-size: clamp(28px, 6vw, 56px); }
				h2 { font-size: clamp(24px, 5vw, 48px); }
				h3 { font-size: clamp(20px, 4vw, 32px); }
				p { font-size: clamp(14px, 2.5vw, 18px); }

				/* Animations */
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes scaleIn {
					from {
						opacity: 0;
						transform: scale(0.9);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}

				@keyframes float {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-20px); }
				}

				@keyframes shimmer {
					0% { background-position: -1000px 0; }
					100% { background-position: 1000px 0; }
				}

				@keyframes pulse {
					0%, 100% { transform: scale(1); opacity: 1; }
					50% { transform: scale(1.05); opacity: 0.9; }
				}

				@keyframes slideInRight {
					from {
						opacity: 0;
						transform: translateX(100px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				.animate-on-scroll {
					opacity: 0;
					animation: fadeInUp 0.8s ease forwards;
				}

				.card-hover {
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
				}

				.card-hover:hover {
					transform: translateY(-12px) scale(1.02);
					box-shadow: 0 25px 50px rgba(0,0,0,0.15);
				}

				.gradient-text {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					background-clip: text;
				}

				.shimmer {
					background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
					background-size: 200% 100%;
					animation: shimmer 2s infinite;
				}

				/* Mobile Optimization */
				@media (max-width: 768px) {
					body {
						font-size: 16px;
					}

					section {
						padding: 60px 16px !important;
					}

					.container {
						padding: 0 16px;
					}
				}

				@media (max-width: 480px) {
					section {
						padding: 40px 12px !important;
					}
				}

				/* Smooth Scrolling */
				::-webkit-scrollbar {
					width: 12px;
				}

				::-webkit-scrollbar-track {
					background: #f1f1f1;
				}

				::-webkit-scrollbar-thumb {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					border-radius: 6px;
				}

				::-webkit-scrollbar-thumb:hover {
					background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
				}

				/* Focus Styles for Accessibility */
				button:focus-visible,
				a:focus-visible {
					outline: 3px solid #667eea;
					outline-offset: 3px;
				}

				/* Prevent layout shift */
				img, video {
					max-width: 100%;
					height: auto;
				}

				/* Disable hover effects on touch devices */
				@media (hover: none) {
					.card-hover:hover {
						transform: none;
					}
				}
			`}</style>
		</>
	);
}
