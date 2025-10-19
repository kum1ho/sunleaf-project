export interface ErrorLog {
	message: string;
	stack?: string;
	timestamp: string;
	url: string;
	userAgent: string;
	additionalInfo?: any;
}

class ErrorLogger {
	private static instance: ErrorLogger;
	private errors: ErrorLog[] = [];

	private constructor() {
		this.initializeLogger();
	}

	public static getInstance(): ErrorLogger {
		if (!ErrorLogger.instance) {
			ErrorLogger.instance = new ErrorLogger();
		}
		return ErrorLogger.instance;
	}

	private initializeLogger() {
		if (typeof window !== 'undefined') {
			// Load saved errors from localStorage
			try {
				const savedErrors = localStorage.getItem('errorLogs');
				if (savedErrors) {
					this.errors = JSON.parse(savedErrors);
				}
			} catch (e) {
				console.error('Failed to load error logs:', e);
			}
		}
	}

	public logError(error: Error | string, additionalInfo?: any): void {
		const errorLog: ErrorLog = {
			message: typeof error === 'string' ? error : error.message,
			stack: typeof error === 'object' ? error.stack : undefined,
			timestamp: new Date().toISOString(),
			url: typeof window !== 'undefined' ? window.location.href : '',
			userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
			additionalInfo
		};

		this.errors.push(errorLog);

		// Keep only last 50 errors
		if (this.errors.length > 50) {
			this.errors = this.errors.slice(-50);
		}

		// Save to localStorage
		try {
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem('errorLogs', JSON.stringify(this.errors));
			}
		} catch (e) {
			console.error('Failed to save error log:', e);
		}

		// Log to console in development
		if (process.env.NODE_ENV === 'development') {
			console.error('Error logged:', errorLog);
		}

		// В продакшені тут можна відправити на сервер
		// this.sendToServer(errorLog);
	}

	public getErrors(): ErrorLog[] {
		return [...this.errors];
	}

	public clearErrors(): void {
		this.errors = [];
		try {
			if (typeof localStorage !== 'undefined') {
				localStorage.removeItem('errorLogs');
			}
		} catch (e) {
			console.error('Failed to clear error logs:', e);
		}
	}

	private async sendToServer(errorLog: ErrorLog): Promise<void> {
		// Тут можна реалізувати відправку на сервер
		// try {
		//   await fetch('/api/log-error', {
		//     method: 'POST',
		//     headers: { 'Content-Type': 'application/json' },
		//     body: JSON.stringify(errorLog)
		//   });
		// } catch (e) {
		//   console.error('Failed to send error to server:', e);
		// }
	}
}

export const errorLogger = ErrorLogger.getInstance();

// Зручні функції для використання
export const logError = (error: Error | string, additionalInfo?: any) => {
	errorLogger.logError(error, additionalInfo);
};

export const getErrorLogs = () => errorLogger.getErrors();
export const clearErrorLogs = () => errorLogger.clearErrors();
