import { useState, useEffect } from 'react';

interface Notification {
	id: number;
	type: 'order' | 'message' | 'review';
	title: string;
	message: string;
	time: string;
	read: boolean;
}

interface Product {
	id: number;
	name: string;
	price: number;
	category: string;
	stock: boolean;
	description: string;
	image: string;
}

interface Order {
	id: number;
	customer: string;
	items: string;
	total: number;
	status: 'pending' | 'processing' | 'completed';
	date: string;
}

interface Customer {
	id: number;
	name: string;
	email: string;
	phone: string;
	orders: number;
	totalSpent: number;
}

interface Settings {
	siteName: string;
	siteDescription: string;
	contactEmail: string;
	contactPhone: string;
	address: string;
	freeShippingFrom: number;
	minOrder: number;
	workingHours: string;
}

export default function AdminDashboard() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [activeTab, setActiveTab] = useState('dashboard');
	const [showNotifications, setShowNotifications] = useState(false);
	
	const [notifications, setNotifications] = useState<Notification[]>([
		{ id: 1, type: 'order', title: 'Нове замовлення', message: 'Замовлення #1234 на суму 5200₴', time: '2 хв тому', read: false }
	]);

	const [products, setProducts] = useState<Product[]>([
		{ id: 1, name: 'Арабіка преміум Ефіопія', price: 420, category: 'Кава', stock: true, description: 'Елітна арабіка', image: '☕' }
	]);

	const [orders, setOrders] = useState<Order[]>([
		{ id: 1234, customer: 'Олександр К.', items: 'Арабіка 10кг', total: 4200, status: 'pending', date: '2024-01-15' }
	]);

	const [customers, setCustomers] = useState<Customer[]>([
		{ id: 1, name: 'Олександр К.', email: 'alex@example.com', phone: '+380671234567', orders: 15, totalSpent: 45000 }
	]);

	const [settings, setSettings] = useState<Settings>({
		siteName: 'Sunleaf',
		siteDescription: 'Оптові поставки преміум кави, чаю та солодощів',
		contactEmail: 'info@sunleaf.ua',
		contactPhone: '+380 67 123-45-67',
		address: 'вул. Київська, 75, Житомир',
		freeShippingFrom: 2000,
		minOrder: 5,
		workingHours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-15:00'
	});

	const stats = {
		totalProducts: products.length,
		totalOrders: orders.length,
		totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
		pendingOrders: orders.filter(o => o.status === 'pending').length,
		totalCustomers: customers.length
	};

	const unreadCount = notifications.filter(n => !n.read).length;

	useEffect(() => {
		const auth = localStorage.getItem('adminAuth');
		if (auth === 'true') {
			setIsAuthenticated(true);
		}
	}, []);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		if (password === 'admin123') {
			setIsAuthenticated(true);
			localStorage.setItem('adminAuth', 'true');
			setError('');
		} else {
			setError('Невірний пароль');
		}
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem('adminAuth');
	};

	const markAsRead = (id: number) => {
		setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
	};

	const markAllAsRead = () => {
		setNotifications(notifications.map(n => ({ ...n, read: true })));
	};

	const deleteNotification = (id: number) => {
		setNotifications(notifications.filter(n => n.id !== id));
	};

	if (!isAuthenticated) {
		return (
			<div style={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				padding: '20px'
			}}>
				<div style={{
					background: 'white',
					padding: 'clamp(40px, 8vw, 60px)',
					borderRadius: '32px',
					boxShadow: '0 30px 90px rgba(0,0,0,0.25)',
					maxWidth: '480px',
					width: '100%'
				}}>
					<h1 style={{
						textAlign: 'center',
						marginBottom: '32px',
						fontSize: 'clamp(28px, 6vw, 36px)',
						fontWeight: '900'
					}}>
						🔐 Admin Panel
					</h1>
					<form onSubmit={handleLogin} style={{ display: 'grid', gap: '24px' }}>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Введіть пароль"
							style={{
								width: '100%',
								padding: '18px',
								border: '2px solid #e0e0e0',
								borderRadius: '16px',
								fontSize: '16px'
							}}
						/>
						{error && <div style={{ color: '#dc3545', textAlign: 'center' }}>{error}</div>}
						<button type="submit" style={{
							width: '100%',
							padding: '18px',
							background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
							color: 'white',
							border: 'none',
							borderRadius: '16px',
							fontSize: '18px',
							fontWeight: '800',
							cursor: 'pointer'
						}}>
							🔓 Увійти
						</button>
					</form>
				</div>
			</div>
		);
	}

	return (
		<div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
			<header style={{
				background: 'white',
				padding: '20px 32px',
				boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}>
				<h1 style={{ fontSize: '24px', fontWeight: '900' }}>🍃 Sunleaf Admin</h1>
				<button onClick={handleLogout} style={{
					padding: '12px 24px',
					background: '#dc3545',
					color: 'white',
					border: 'none',
					borderRadius: '12px',
					cursor: 'pointer'
				}}>
					🚪 Вийти
				</button>
			</header>

			<div style={{ display: 'flex' }}>
				<aside style={{ width: '280px', background: 'white', padding: '32px 0' }}>
					{[
						{ id: 'dashboard', label: '📊 Дашборд' },
						{ id: 'orders', label: '📦 Замовлення' },
						{ id: 'products', label: '☕ Товари' },
						{ id: 'customers', label: '👥 Клієнти' },
						{ id: 'analytics', label: '📈 Аналітика' },
						{ id: 'settings', label: '⚙️ Налаштування' }
					].map(tab => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							style={{
								width: '100%',
								padding: '16px 32px',
								background: activeTab === tab.id ? '#f8f9fa' : 'transparent',
								border: 'none',
								textAlign: 'left',
								cursor: 'pointer',
								fontSize: '16px',
								fontWeight: activeTab === tab.id ? '800' : '600'
							}}
						>
							{tab.label}
						</button>
					))}
				</aside>

				<main style={{ flex: 1, padding: '48px' }}>
					<h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '32px' }}>
						{activeTab === 'dashboard' && '📊 Dashboard'}
						{activeTab === 'orders' && '📦 Замовлення'}
						{activeTab === 'products' && '☕ Товари'}
						{activeTab === 'customers' && '👥 Клієнти'}
						{activeTab === 'analytics' && '📈 Аналітика'}
						{activeTab === 'settings' && '⚙️ Налаштування'}
					</h2>
					<p style={{ color: '#666' }}>Тут буде контент для {activeTab}</p>
				</main>
			</div>
		</div>
	);
}								fontWeight: '900',
								color: '#1a1a1a'
							}}>
								⚙️ Налаштування сайту
							</h2>
							<div style={{
								background: 'white',
								borderRadius: '20px',
								padding: '40px',
								boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
								border: '1px solid #e0e0e0'
							}}>
								<form onSubmit={(e) => { e.preventDefault(); handleSaveSettings(); }} style={{ display: 'grid', gap: '28px' }}>
									<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
										<div>
											<label style={{
												display: 'block',
												marginBottom: '10px',
												fontSize: '15px',
												fontWeight: '700',
												color: '#1a1a1a'
											}}>
												Назва сайту
											</label>
											<input
												type="text"
												value={settings.siteName}
												onChange={(e) => setSettings({...settings, siteName: e.target.value})}
												style={{
													width: '100%',
													padding: '14px',
													border: '2px solid #e0e0e0',
													borderRadius: '12px',
													fontSize: '15px',
													outline: 'none',
													transition: 'all 0.3s ease'
												}}
												onFocus={(e) => {
													e.currentTarget.style.borderColor = '#667eea';
													e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
												}}
												onBlur={(e) => {
													e.currentTarget.style.borderColor = '#e0e0e0';
													e.currentTarget.style.boxShadow = 'none';
												}}
											/>
										</div>

										<div>
											<label style={{
												display: 'block',
												marginBottom: '10px',
												fontSize: '15px',
												fontWeight: '700',
												color: '#1a1a1a'
											}}>
												Email
											</label>
											<input
												type="email"
												value={settings.contactEmail}
												onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
												style={{
													width: '100%',
													padding: '14px',
													border: '2px solid #e0e0e0',
													borderRadius: '12px',
													fontSize: '15px',
													outline: 'none',
													transition: 'all 0.3s ease'
												}}
												onFocus={(e) => {
													e.currentTarget.style.borderColor = '#667eea';
													e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
												}}
												onBlur={(e) => {
													e.currentTarget.style.borderColor = '#e0e0e0';
													e.currentTarget.style.boxShadow = 'none';
												}}
											/>
										</div>

										<div>
											<label style={{
												display: 'block',
												marginBottom: '10px',
												fontSize: '15px',
												fontWeight: '700',
												color: '#1a1a1a'
											}}>
												Телефон
											</label>
											<input
												type="tel"
												value={settings.contactPhone}
												onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
												style={{
													width: '100%',
													padding: '14px',
													border: '2px solid #e0e0e0',
													borderRadius: '12px',
													fontSize: '15px',
													outline: 'none',
													transition: 'all 0.3s ease'
												}}
												onFocus={(e) => {
													e.currentTarget.style.borderColor = '#667eea';
													e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
												}}
												onBlur={(e) => {
													e.currentTarget.style.borderColor = '#e0e0e0';
													e.currentTarget.style.boxShadow = 'none';
												}}
											/>
										</div>

										<div>
											<label style={{
												display: 'block',
												marginBottom: '10px',
												fontSize: '15px',
												fontWeight: '700',
												color: '#1a1a1a'
											}}>
												Мінімальна сума безкоштовної доставки
											</label>
											<input
												type="number"
												value={settings.freeShippingFrom}
												onChange={(e) => setSettings({...settings, freeShippingFrom: Number(e.target.value)})}
												style={{
													width: '100%',
													padding: '14px',
													border: '2px solid #e0e0e0',
													borderRadius: '12px',
													fontSize: '15px',
													outline: 'none',
													transition: 'all 0.3s ease'
												}}
												onFocus={(e) => {
													e.currentTarget.style.borderColor = '#667eea';
													e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
												}}
												onBlur={(e) => {
													e.currentTarget.style.borderColor = '#e0e0e0';
													e.currentTarget.style.boxShadow = 'none';
												}}
											/>
										</div>
									</div>

									<div>
										<label style={{
											display: 'block',
											marginBottom: '10px',
											fontSize: '15px',
											fontWeight: '700',
											color: '#1a1a1a'
										}}>
											Опис сайту
										</label>
										<textarea
											value={settings.siteDescription}
											onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
											rows={4}
											style={{
												width: '100%',
												padding: '14px',
												border: '2px solid #e0e0e0',
												borderRadius: '12px',
												fontSize: '15px',
												outline: 'none',
												resize: 'vertical',
												fontFamily: 'inherit',
												transition: 'all 0.3s ease'
											}}
											onFocus={(e) => {
												e.currentTarget.style.borderColor = '#667eea';
												e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
											}}
											onBlur={(e) => {
												e.currentTarget.style.borderColor = '#e0e0e0';
												e.currentTarget.style.boxShadow = 'none';
											}}
										/>
									</div>

									<div>
										<label style={{
											display: 'block',
											marginBottom: '10px',
											fontSize: '15px',
											fontWeight: '700',
											color: '#1a1a1a'
										}}>
											Адреса
										</label>
										<input
											type="text"
											value={settings.address}
											onChange={(e) => setSettings({...settings, address: e.target.value})}
											style={{
												width: '100%',
												padding: '14px',
												border: '2px solid #e0e0e0',
												borderRadius: '12px',
												fontSize: '15px',
												outline: 'none',
												transition: 'all 0.3s ease'
											}}
											onFocus={(e) => {
												e.currentTarget.style.borderColor = '#667eea';
												e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
											}}
											onBlur={(e) => {
												e.currentTarget.style.borderColor = '#e0e0e0';
												e.currentTarget.style.boxShadow = 'none';
											}}
										/>
									</div>

									<div>
										<label style={{
											display: 'block',
											marginBottom: '10px',
											fontSize: '15px',
											fontWeight: '700',
											color: '#1a1a1a'
										}}>
											Графік роботи
										</label>
										<input
											type="text"
											value={settings.workingHours}
											onChange={(e) => setSettings({...settings, workingHours: e.target.value})}
											style={{
												width: '100%',
												padding: '14px',
												border: '2px solid #e0e0e0',
												borderRadius: '12px',
												fontSize: '15px',
												outline: 'none',
												transition: 'all 0.3s ease'
											}}
											onFocus={(e) => {
												e.currentTarget.style.borderColor = '#667eea';
												e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102,126,234,0.1)';
											}}
											onBlur={(e) => {
												e.currentTarget.style.borderColor = '#e0e0e0';
												e.currentTarget.style.boxShadow = 'none';
											}}
										/>
									</div>

									<button
										type="submit"
										style={{
											padding: '16px 32px',
											background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
											color: 'white',
											border: 'none',
											borderRadius: '14px',
											fontSize: '17px',
											fontWeight: '800',
											cursor: 'pointer',
											transition: 'all 0.3s ease',
											boxShadow: '0 6px 20px rgba(40,167,69,0.3)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: '12px',
											width: 'fit-content'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'translateY(-2px)';
											e.currentTarget.style.boxShadow = '0 10px 28px rgba(40,167,69,0.4)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'translateY(0)';
											e.currentTarget.style.boxShadow = '0 6px 20px rgba(40,167,69,0.3)';
										}}
									>
																				<span style={{ fontSize: '20px' }}>💾</span>
										Зберегти налаштування
									</button>
								</form>
							</div>
						</>
					)}
				</main>
			</div>

			<style jsx>{`
				@keyframes slideDown {
					from {
						opacity: 0;
						transform: translateY(-20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}