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
		</>
	);
}
