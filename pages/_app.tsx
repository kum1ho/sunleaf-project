import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import PerformanceMonitor from '../components/PerformanceMonitor';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		// Initialize cart
		if (typeof window !== 'undefined') {
			try {
				const cart = localStorage.getItem('cart');
				if (!cart) {
					localStorage.setItem('cart', '[]');
				}
			} catch (e) {
				console.error('Error initializing cart:', e);
			}
		}

		// Global error handler
		const handleError = (event: ErrorEvent) => {
			console.error('Global error:', event.error);
		};

		const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
			console.error('Unhandled promise rejection:', event.reason);
		};

		window.addEventListener('error', handleError);
		window.addEventListener('unhandledrejection', handleUnhandledRejection);

		return () => {
			window.removeEventListener('error', handleError);
			window.removeEventListener('unhandledrejection', handleUnhandledRejection);
		};
	}, []);

	return (
		<ErrorBoundary>
			<PerformanceMonitor />
			<Component {...pageProps} />
		</ErrorBoundary>
	);
}