import { useState, useEffect } from 'react';

type Tab = 'dashboard' | 'orders' | 'products' | 'customers' | 'content' | 'import' | 'settings' | 'analytics';

export default function AdminPanel() {
	// Authentication state
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({ username: '', password: '' });
	const [activeTab, setActiveTab] = useState<Tab>('dashboard');

	// Stats state
	const [stats, setStats] = useState({
		orders: { today: 127, total: 2847, revenue: 487250 },
		customers: { total: 345, new: 45, active: 289 },
		products: { total: 156, outOfStock: 8, topSelling: 'Арабіка преміум' },
		traffic: { visitors: 1247, conversion: 18.5, sources: { organic: 45, direct: 30, social: 25 } }
	});

	// Orders state
	const [selectedStatus, setSelectedStatus] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [sortBy, setSortBy] = useState('date');

	// Products state
	const [productForm, setProductForm] = useState(false);
	const [editingProduct, setEditingProduct] = useState<any>(null);
	const [categories, setCategories] = useState(['Кава', 'Чай', 'Солодощі']);
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [stockFilter, setStockFilter] = useState('all');
	const [products, setProducts] = useState([
		{ id: 1, name: 'Арабіка преміум Ефіопія', category: 'Кава', price: 420, stock: 150, unit: 'кг', image: '☕', status: 'В наявності', sku: 'ARB-ETH-001', supplier: 'Ethiopian Coffee Co.', description: 'Елітна арабіка з високогір\'я Ефіопії', cost: 320 },
		{ id: 2, name: 'Робуста В\'єтнам', category: 'Кава', price: 290, stock: 89, unit: 'кг', image: '☕', status: 'В наявності', sku: 'ROB-VIE-001', supplier: 'Vietnam Coffee Export', description: 'Насичена робуста для еспресо', cost: 220 }
	]);

	// Customers state
	const [customerForm, setCustomerForm] = useState(false);
	const [editingCustomer, setEditingCustomer] = useState<any>(null);
	const [selectedType, setSelectedType] = useState('all');
	const [customerSortBy, setCustomerSortBy] = useState('orders');
	const [customers, setCustomers] = useState([
		{ id: 1, name: 'Кав\'ярня "Аромат"', contact: 'Іван Петренко', phone: '+380 67 123-45-67', email: 'aromat@example.com', type: 'Кав\'ярня', orders: 23, total: 145600, address: 'вул. Перемоги, 12, Житомир', lastOrder: '2025-01-14', notes: 'Постійний клієнт, завжди вчасно оплачує', discount: 5 },
		{ id: 2, name: 'Ресторан "Подолянь"', contact: 'Марія Іваненко', phone: '+380 63 987-65-43', email: 'podolyan@example.com', type: 'Ресторан', orders: 18, total: 89300, address: 'пр. Незалежності, 45, Житомир', lastOrder: '2025-01-13', notes: 'Великі замовлення раз на місяць', discount: 3 }
	]);

	// Content state
	const [editingSection, setEditingSection] = useState<string | null>(null);
	const [contentData, setContentData] = useState({
		hero: {
			title: 'Оптові поставки преміум кави та чаю',
			subtitle: 'Для кав\'ярень, ресторанів та готелів з доставкою по всій Україні',
			buttonText: 'Отримати прайс',
			image: '/images/hero-bg.jpg'
		},
		contacts: {
			phone1: '+380 67 123-45-67',
			phone2: '+380 63 765-43-21',
			email: 'info@sunleaf.ua',
			address: 'м. Житомир, вул. Київська, 75',
			workingHours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-15:00'
		}
	});

	// Analytics state
	const [dateRange, setDateRange] = useState('7days');
	const [analyticsData, setAnalyticsData] = useState({
		overview: {
			visitors: 1247,
			pageviews: 3456,
			bounceRate: 34.5,
			avgSession: '2:34'
		},
		traffic: {
			organic: 45,
			direct: 30,
			social: 15,
			referral: 10
		}
	});

	// Import state
	const [importData, setImportData] = useState('');
	const [importLoading, setImportLoading] = useState(false);
	const [importResult, setImportResult] = useState<any>(null);
	const [previewProducts, setPreviewProducts] = useState<any[]>([]);

	useEffect(() => {
		const token = localStorage.getItem('admin_token');
		if (token && token.startsWith('admin_authenticated_')) {
			setIsAuthenticated(true);
		}
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const response = await fetch('/api/admin/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			const data = await response.json();
			if (response.ok && data.success) {
				localStorage.setItem('admin_token', data.token);
				setIsAuthenticated(true);
			} else {
				setError(data.error || 'Помилка входу');
			}
		} catch (err) {
			setError('Помилка підключення');
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('admin_token');
		setIsAuthenticated(false);
		setFormData({ username: '', password: '' });
	};

	// Handlers
	const handleSaveProduct = (productData: any) => {
		if (editingProduct) {
			setProducts(products.map(p => p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p));
		} else {
			setProducts([...products, { ...productData, id: Date.now() }]);
		}
		setProductForm(false);
		setEditingProduct(null);
	};

	const handleImport = async () => {
		if (!importData.trim()) return;
		setImportLoading(true);
		
		try {
			const response = await fetch('/api/admin/import-1c', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ csvData: importData })
			});
			
			const data = await response.json();
			setImportResult(data);
			if (data.products) setPreviewProducts(data.products);
		} catch (error) {
			setImportResult({ error: 'Помилка імпорту' });
		} finally {
			setImportLoading(false);
		}
	};

	const handleSaveContent = async (section: string, updatedData: any) => {
		try {
			console.log('[Content] Saving:', section, updatedData);
			
			setContentData(prev => ({
				...prev,
				[section]: { ...prev[section], ...updatedData }
			}));

			setEditingSection(null);
			alert('✅ Контент успішно збережено!');
		} catch (error) {
			console.error('[Content] Save error:', error);
			alert('❌ Помилка збереження. Спробуйте ще раз.');
		}
	};

	if (!isAuthenticated) {
		return (
			<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
				<div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
					<div style={{ textAlign: 'center', marginBottom: '30px' }}>
						<div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '32px' }}>🍃</div>
						<h1 style={{ color: '#333', margin: 0, fontSize: '28px' }}>Sunleaf Admin</h1>
						<p style={{ color: '#666', margin: '8px 0 0', fontSize: '14px' }}>Панель адміністрування</p>
					</div>
					<form onSubmit={handleLogin}>
						<input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="admin" required style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box', marginBottom: '20px' }} />
						<input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="sasha24041984" required style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box', marginBottom: '24px' }} />
						<button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
							{loading ? 'Вхід...' : 'Увійти'}
						</button>
					</form>
					{error && <div style={{ marginTop: '20px', padding: '12px', background: '#fee', color: '#c33', borderRadius: '8px', border: '1px solid #fcc' }}>{error}</div>}
				</div>
			</div>
		);
	}

	// Render functions
	const renderDashboard = () => (
		<div style={{ display: 'grid', gap: '24px' }}>
			{/* Stats Cards */}
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
				<div style={{ background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)', color: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(76,175,80,0.3)' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
						<div>
							<h3 style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Замовлення сьогодні</h3>
							<p style={{ margin: '8px 0', fontSize: '36px', fontWeight: 'bold' }}>{stats.orders.today}</p>
						</div>
						<div style={{ fontSize: '32px', opacity: 0.7 }}>📦</div>
					</div>
					<div style={{ fontSize: '12px', opacity: 0.8 }}>+12% від вчора • Всього: {stats.orders.total}</div>
				</div>
				
				<div style={{ background: 'linear-gradient(135deg, #2196F3 0%, #42A5F5 100%)', color: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(33,150,243,0.3)' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
						<div>
							<h3 style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Дохід за місяць</h3>
							<p style={{ margin: '8px 0', fontSize: '36px', fontWeight: 'bold' }}>{(stats.orders.revenue / 1000).toFixed(0)}K</p>
						</div>
						<div style={{ fontSize: '32px', opacity: 0.7 }}>💰</div>
					</div>
					<div style={{ fontSize: '12px', opacity: 0.8 }}>+18% від минулого місяця</div>
				</div>

				<div style={{ background: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)', color: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(255,152,0,0.3)' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
						<div>
							<h3 style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Нові клієнти</h3>
							<p style={{ margin: '8px 0', fontSize: '36px', fontWeight: 'bold' }}>{stats.customers.new}</p>
						</div>
						<div style={{ fontSize: '32px', opacity: 0.7 }}>👥</div>
					</div>
					<div style={{ fontSize: '12px', opacity: 0.8 }}>Всього клієнтів: {stats.customers.total}</div>
				</div>

				<div style={{ background: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)', color: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(156,39,176,0.3)' }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
						<div>
							<h3 style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Конверсія</h3>
							<p style={{ margin: '8px 0', fontSize: '36px', fontWeight: 'bold' }}>{stats.traffic.conversion}%</p>
						</div>
						<div style={{ fontSize: '32px', opacity: 0.7 }}>📈</div>
					</div>
					<div style={{ fontSize: '12px', opacity: 0.8 }}>Відвідувачів сьогодні: {stats.traffic.visitors}</div>
				</div>
			</div>
		</div>
	);

	const renderOrders = () => {
		const orders = [
			{ id: '#2847', client: 'Кав\'ярня "Аромат"', amount: 4100, status: 'Нове', date: '15.01.2025' },
			{ id: '#2846', client: 'Ресторан "Подолянь"', amount: 4200, status: 'Обробка', date: '15.01.2025' },
			{ id: '#2845', client: 'Готель "Житомир"', amount: 9250, status: 'Відправлено', date: '14.01.2025' }
		];

		return (
			<div style={{ display: 'grid', gap: '24px' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>
						<h2 style={{ margin: 0, color: '#333' }}>Замовлення</h2>
						<p style={{ margin: '4px 0 0', color: '#666' }}>Управління замовленнями та їх статусами</p>
					</div>
					<button style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
						+ Нове замовлення
					</button>
				</div>

				<div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '20px' }}>
					<div style={{ display: 'grid', gap: '12px' }}>
						{orders.map((order, i) => (
							<div key={i} style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<div>
									<strong style={{ color: '#007bff' }}>{order.id}</strong>
									<div style={{ color: '#666', fontSize: '14px' }}>{order.client}</div>
								</div>
								<div style={{ textAlign: 'right' }}>
									<strong style={{ color: '#28a745' }}>{order.amount.toLocaleString()} грн</strong>
									<div style={{ fontSize: '12px', color: '#666' }}>{order.date}</div>
								</div>
								<span style={{ padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: '600', background: order.status === 'Нове' ? '#fff3cd' : order.status === 'Обробка' ? '#cce5ff' : '#d4edda', color: order.status === 'Нове' ? '#856404' : order.status === 'Обробка' ? '#004085' : '#155724' }}>
									{order.status}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	};

	const renderProducts = () => {
		const filteredProducts = products.filter(product => {
			const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
			return matchesCategory;
		});

		return (
			<div style={{ display: 'grid', gap: '24px' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>
						<h2 style={{ margin: 0, color: '#333' }}>Товари</h2>
						<p style={{ margin: '4px 0 0', color: '#666' }}>Управління каталогом товарів</p>
					</div>
					<button onClick={() => setProductForm(true)} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #007bff 0%, #6f42c1 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
						+ Додати товар
					</button>
				</div>

				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
					{filteredProducts.map((product) => (
						<div key={product.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
								<div style={{ fontSize: '32px' }}>{product.image}</div>
								<div style={{ flex: 1 }}>
									<h4 style={{ margin: 0, color: '#333' }}>{product.name}</h4>
									<p style={{ margin: '4px 0 0', color: '#666', fontSize: '12px' }}>{product.category}</p>
								</div>
							</div>
							<div style={{ marginBottom: '16px' }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
									<span style={{ color: '#666' }}>Ціна:</span>
									<strong style={{ color: '#28a745' }}>{product.price} грн/{product.unit}</strong>
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<span style={{ color: '#666' }}>Залишок:</span>
									<strong>{product.stock} {product.unit}</strong>
								</div>
							</div>
							<button onClick={() => { setEditingProduct(product); setProductForm(true); }} style={{ width: '100%', padding: '8px', background: 'none', border: '1px solid #dee2e6', borderRadius: '6px', cursor: 'pointer' }}>
								✏️ Редагувати
							</button>
						</div>
					))}

					{productForm && (
						<ProductFormModal 
							product={editingProduct}
							categories={categories}
							onSave={handleSaveProduct}
							onCancel={() => { setProductForm(false); setEditingProduct(null); }}
						/>
					)}
				</div>
			</div>
		);
	};

	const renderCustomers = () => {
		return (
			<div style={{ display: 'grid', gap: '24px' }}>
				<div>
					<h2 style={{ margin: 0, color: '#333' }}>Клієнти</h2>
					<p style={{ margin: '4px 0 0', color: '#666' }}>База клієнтів</p>
				</div>

				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
					{customers.map((customer) => (
						<div key={customer.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
							<h4 style={{ margin: '0 0 8px 0', color: '#333' }}>{customer.name}</h4>
							<p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>{customer.contact}</p>
							<p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>{customer.phone}</p>
							<div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
								<div style={{ textAlign: 'center' }}>
									<strong>{customer.orders}</strong>
									<div style={{ fontSize: '12px', color: '#666' }}>замовлень</div>
								</div>
								<div style={{ textAlign: 'center' }}>
									<strong style={{ color: '#28a745' }}>{customer.total.toLocaleString()}</strong>
									<div style={{ fontSize: '12px', color: '#666' }}>грн</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	const renderContent = () => (
		<div style={{ display: 'grid', gap: '24px' }}>
			<div>
				<h2 style={{ margin: 0, color: '#333' }}>Управління контентом</h2>
				<p style={{ margin: '4px 0 0', color: '#666' }}>Редагування тексту сайту</p>
			</div>

			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
				<div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
					<h3 style={{ margin: '0 0 16px 0', color: '#333' }}>🏠 Головна сторінка</h3>
					<div style={{ marginBottom: '16px', fontSize: '14px' }}>
						<div style={{ color: '#666', marginBottom: '8px' }}>Заголовок:</div>
						<div style={{ padding: '8px', background: '#f8f9fa', borderRadius: '6px', fontSize: '13px' }}>
							{contentData.hero.title}
						</div>
					</div>
					<button onClick={() => setEditingSection('hero')} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
						Редагувати
					</button>
				</div>

				<div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
					<h3 style={{ margin: '0 0 16px 0', color: '#333' }}>📞 Контакти</h3>
					<div style={{ marginBottom: '16px', fontSize: '14px' }}>
						<div style={{ marginBottom: '6px' }}>📞 {contentData.contacts.phone1}</div>
						<div style={{ marginBottom: '6px' }}>📧 {contentData.contacts.email}</div>
						<div style={{ color: '#666', fontSize: '12px' }}>{contentData.contacts.address}</div>
					</div>
					<button onClick={() => setEditingSection('contacts')} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
						Редагувати
					</button>
				</div>
			</div>

			{editingSection && (
				<ContentEditor 
					section={editingSection}
					data={contentData}
					onSave={handleSaveContent}
					onCancel={() => setEditingSection(null)}
				/>
			)}
		</div>
	);

	const renderImport1C = () => {
		const sampleData = `Назва;Категорія;Ціна;Опис
Арабіка Ефіопія Premium;Кава;420;Елітна арабіка з високогірʼя Ефіопії`;

		return (
			<div style={{ display: 'grid', gap: '24px' }}>
				<div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
					<h3 style={{ margin: '0 0 20px 0', color: '#333', fontSize: '24px' }}>📥 Імпорт товарів з 1C</h3>
					
					<div style={{ marginBottom: '20px' }}>
						<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>CSV дані з 1C:</label>
						<textarea
							value={importData}
							onChange={(e) => setImportData(e.target.value)}
							placeholder={`Вставте CSV дані або використайте приклад...\n\n${sampleData}`}
							rows={12}
							style={{ width: '100%', padding: '16px', border: '2px solid #e1e5e9', borderRadius: '12px', fontSize: '14px', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }}
						/>
					</div>

					<div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
						<button onClick={() => setImportData(sampleData)} style={{ padding: '12px 24px', background: '#f8f9fa', border: '2px solid #dee2e6', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
							📋 Вставити приклад
						</button>
						<button onClick={handleImport} disabled={importLoading || !importData.trim()} style={{ padding: '12px 24px', background: importLoading ? '#ccc' : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: importLoading ? 'not-allowed' : 'pointer', fontWeight: '600' }}>
							{importLoading ? '⏳ Обробка...' : '🚀 Обробити дані'}
						</button>
					</div>

					{importResult && (
						<div style={{ padding: '20px', background: importResult.error ? '#ffebee' : '#e8f5e9', borderRadius: '12px' }}>
							{importResult.error ? (
								<div style={{ color: '#c62828' }}>❌ {importResult.error}</div>
							) : (
								<div style={{ color: '#2e7d32' }}>✅ Успішно оброблено товарів!</div>
							)}
						</div>
					)}
				</div>
			</div>
		);
	};

	const renderAnalytics = () => (
		<div style={{ display: 'grid', gap: '24px' }}>
			<div>
				<h2 style={{ margin: 0, color: '#333' }}>Аналітика</h2>
				<p style={{ margin: '4px 0 0', color: '#666' }}>Статистика роботи сайту</p>
			</div>

			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
				<div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
					<div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>{analyticsData.overview.visitors.toLocaleString()}</div>
					<div style={{ fontSize: '14px', opacity: 0.9 }}>Відвідувачів</div>
				</div>
			</div>
		</div>
	);

	const renderSettings = () => (
		<div style={{ display: 'grid', gap: '24px' }}>
			<div>
				<h2 style={{ margin: 0, color: '#333' }}>Налаштування</h2>
				<p style={{ margin: '4px 0 0', color: '#666' }}>Конфігурація системи</p>
			</div>

			<div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
				<h3 style={{ margin: '0 0 20px 0', color: '#333' }}>🌐 Основні налаштування</h3>
				<div style={{ display: 'grid', gap: '16px' }}>
					<div>
						<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Назва сайту</label>
						<input type="text" defaultValue="Sunleaf" style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }} />
					</div>
				</div>
				<button style={{ marginTop: '20px', padding: '12px 24px', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
					💾 Зберегти
				</button>
			</div>
		</div>
	);

	return (
		<div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
			{/* Sidebar */}
			<div style={{ position: 'fixed', left: 0, top: 0, width: '280px', height: '100vh', background: 'linear-gradient(180deg, #0057B7 0%, #003d82 100%)', color: 'white', padding: '20px', boxSizing: 'border-box', overflowY: 'auto', zIndex: 1000 }}>
				<div style={{ marginBottom: '40px', textAlign: 'center' }}>
					<div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px' }}>🍃</div>
					<h2 style={{ margin: 0, fontSize: '20px' }}>Sunleaf Admin</h2>
					<p style={{ margin: '8px 0 0', fontSize: '14px', opacity: 0.8 }}>Панель керування</p>
				</div>

				<nav style={{ display: 'grid', gap: '8px' }}>
					{[
						{ id: 'dashboard', label: 'Dashboard', icon: '📊' },
						{ id: 'orders', label: 'Замовлення', icon: '📦' },
						{ id: 'products', label: 'Товари', icon: '☕' },
						{ id: 'customers', label: 'Клієнти', icon: '👥' },
						{ id: 'content', label: 'Контент', icon: '📝' },
						{ id: 'import', label: 'Імпорт 1C', icon: '📥' },
						{ id: 'analytics', label: 'Аналітика', icon: '📈' },
						{ id: 'settings', label: 'Налаштування', icon: '⚙️' }
					].map((item) => (
						<button
							key={item.id}
							onClick={() => setActiveTab(item.id as Tab)}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								padding: '14px 16px',
								background: activeTab === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
								border: 'none',
								borderRadius: '12px',
								color: 'white',
								fontSize: '16px',
								cursor: 'pointer',
								textAlign: 'left',
								width: '100%'
							}}
						>
							<span style={{ fontSize: '20px' }}>{item.icon}</span>
							{item.label}
						</button>
					))}
				</nav>

				<div style={{ marginTop: 'auto', paddingTop: '40px' }}>
					<button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '16px', cursor: 'pointer', width: '100%' }}>
						<span style={{ fontSize: '20px' }}>🚪</span>
						Вийти
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div style={{ marginLeft: '280px', padding: '24px' }}>
				<div style={{ maxWidth: '1400px', margin: '0 auto' }}>
					{/* Header */}
					<div style={{ marginBottom: '32px' }}>
						<h1 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '32px' }}>
							{activeTab === 'dashboard' && '📊 Dashboard'}
							{activeTab === 'orders' && '📦 Замовлення'}
							{activeTab === 'products' && '☕ Товари'}
							{activeTab === 'customers' && '👥 Клієнти'}
							{activeTab === 'content' && '📝 Контент'}
							{activeTab === 'import' && '📥 Імпорт 1C'}
							{activeTab === 'analytics' && '📈 Аналітика'}
							{activeTab === 'settings' && '⚙️ Налаштування'}
						</h1>
					</div>

					{/* Content */}
					{activeTab === 'dashboard' && renderDashboard()}
					{activeTab === 'orders' && renderOrders()}
					{activeTab === 'products' && renderProducts()}
					{activeTab === 'customers' && renderCustomers()}
					{activeTab === 'content' && renderContent()}
					{activeTab === 'import' && renderImport1C()}
					{activeTab === 'analytics' && renderAnalytics()}
					{activeTab === 'settings' && renderSettings()}
				</div>
			</div>
		</div>
	);
}

// Product Form Modal Component
function ProductFormModal({ product, categories, onSave, onCancel }: any) {
	const [formData, setFormData] = useState({
		name: product?.name || '',
		category: product?.category || 'Кава',
		price: product?.price || '',
		cost: product?.cost || '',
		stock: product?.stock || '',
		unit: product?.unit || 'кг',
		sku: product?.sku || '',
		supplier: product?.supplier || '',
		description: product?.description || ''
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave({
			...formData,
			price: parseFloat(formData.price as string),
			cost: parseFloat(formData.cost as string),
			stock: parseFloat(formData.stock as string),
			status: (formData.stock as number) > 20 ? 'В наявності' : (formData.stock as number) > 0 ? 'Мало' : 'Немає'
		});
	};

	return (
		<div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 1200, padding: '20px' }}>
			<div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
				<h3 style={{ margin: '0 0 24px 0', color: '#333' }}>
					{product ? 'Редагувати товар' : 'Додати новий товар'}
				</h3>
				<form onSubmit={handleSubmit}>
					<div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
						<div>
							<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Назва товару *</label>
							<input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }} />
						</div>
						<div>
							<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Категорія *</label>
							<select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }}>
								{categories.map((cat: string) => <option key={cat} value={cat}>{cat}</option>)}
							</select>
						</div>
						<div>
							<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Ціна *</label>
							<input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }} />
						</div>
					</div>
					<div style={{ display: 'flex', gap: '12px' }}>
						<button type="button" onClick={onCancel} style={{ flex: 1, padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', background: '#fff', cursor: 'pointer' }}>
							Скасувати
						</button>
						<button type="submit" style={{ flex: 2, padding: '12px', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
							{product ? 'Оновити товар' : 'Додати товар'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

// Content Editor Component
function ContentEditor({ section, data, onSave, onCancel }: any) {
	const [formData, setFormData] = useState<any>({});

	useEffect(() => {
		if (section === 'hero') {
			setFormData({
				title: data.hero?.title || '',
				subtitle: data.hero?.subtitle || '',
				buttonText: data.hero?.buttonText || ''
			});
		} else if (section === 'contacts') {
			setFormData({
				phone1: data.contacts?.phone1 || '',
				phone2: data.contacts?.phone2 || '',
				email: data.contacts?.email || '',
				address: data.contacts?.address || '',
				workingHours: data.contacts?.workingHours || ''
			});
		}
	}, [section, data]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(section, formData);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev: any) => ({
			...prev,
			[field]: value
		}));
	};

	return (
		<div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 1200, padding: '20px' }}>
			<div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
				<h3 style={{ margin: '0 0 24px 0', color: '#333' }}>
					Редагувати: {section === 'hero' ? 'Головна сторінка' : 'Контакти'}
				</h3>
				
				<form onSubmit={handleSubmit}>
					{section === 'hero' && (
						<div style={{ display: 'grid', gap: '16px' }}>
							<div>
								<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Заголовок</label>
								<input 
									type="text" 
									value={formData.title || ''} 
									onChange={(e) => handleInputChange('title', e.target.value)}
									style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }} 
								/>
							</div>
							<div>
								<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Підзаголовок</label>
								<textarea 
									value={formData.subtitle || ''} 
									onChange={(e) => handleInputChange('subtitle', e.target.value)}
									rows={3} 
									style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', resize: 'vertical', boxSizing: 'border-box' }} 
								/>
							</div>
							<div>
								<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Текст кнопки</label>
								<input 
									type="text" 
									value={formData.buttonText || ''} 
									onChange={(e) => handleInputChange('buttonText', e.target.value)}
									style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }} 
								/>
							</div>
						</div>
					)}

					{section === 'contacts' && (
						<div style={{ display: 'grid', gap: '16px' }}>
							<div>
								<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Основний телефон</label>
								<input 
									type="tel" 
									value={formData.phone1 || ''} 
									onChange={(e) => handleInputChange('phone1', e.target.value)}
									style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }} 
								/>
							</div>
							<div>
								<label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Email</label>
								<input 
									type="email" 
									value={formData.email || ''} 
									onChange={(e) => handleInputChange('email', e.target.value)}
									style={{ width: '100%', padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', boxSizing: 'border-box' }} 
								/>
							</div>
						</div>
					)}

					<div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
						<button 
							type="button" 
							onClick={onCancel} 
							style={{ flex: 1, padding: '12px', border: '2px solid #e1e5e9', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontWeight: '600' }}
						>
							Скасувати
						</button>
						<button 
							type="submit" 
							style={{ flex: 2, padding: '12px', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
						>
							💾 Зберегти зміни
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}