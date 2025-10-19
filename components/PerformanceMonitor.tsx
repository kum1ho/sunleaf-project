import { useEffect } from 'react';

export default function PerformanceMonitor() {
	useEffect(() => {
		if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
			return;
		}

		// Web Vitals monitoring
		if ('PerformanceObserver' in window) {
			// Largest Contentful Paint (LCP)
			const lcpObserver = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					console.log('🎨 LCP:', Math.round(entry.startTime), 'ms');
				}
			});
			lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

			// First Input Delay (FID)
			const fidObserver = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					const fidEntry = entry as any;
					const fid = fidEntry.processingStart - fidEntry.startTime;
					console.log('⚡ FID:', Math.round(fid), 'ms');
				}
			});
			fidObserver.observe({ entryTypes: ['first-input'] });

			// Cumulative Layout Shift (CLS)
			let clsScore = 0;
			const clsObserver = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					const clsEntry = entry as any;
					if (!clsEntry.hadRecentInput) {
						clsScore += clsEntry.value;
						console.log('📐 CLS:', clsScore.toFixed(3));
					}
				}
			});
			clsObserver.observe({ entryTypes: ['layout-shift'] });

			return () => {
				lcpObserver.disconnect();
				fidObserver.disconnect();
				clsObserver.disconnect();
			};
		}
	}, []);

	return null;
}
