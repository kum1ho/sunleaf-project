import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getProductBySlug, getAllProducts, getProductsByCategory } from '../../lib/products-data';
import { addToCart } from '../../lib/cart-storage';

type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  description: string;
  price: number;
  image: string;
  country: string;
  features: string[];
  specs: { label: string; value: string }[];
};

type Props = {
  product: Product;
  relatedProducts: Product[];
};

export default function ProductPage({ product, relatedProducts }: Props) {
  const [quantity, setQuantity] = useState(1);
  
  // Функція додавання до корзини
  function addToCart(item: any, quantity = 1) {
    if (typeof window === 'undefined') return;
    
    try {
      const cart = JSON.parse(localStorage.getItem('sunleaf_cart') || '[]');
      const existingIndex = cart.findIndex((i: any) => i.slug === item.slug);
      
      if (existingIndex >= 0) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push({ ...item, quantity });
      }
      
      localStorage.setItem('sunleaf_cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      console.log('[Cart] Added:', item.name, 'x', quantity);
    } catch (error) {
      console.error('[Cart] Error:', error);
    }
  }

  const totalPrice = product.price * quantity;
  const priceUnit = product.category === 'coffee' || product.category === 'tea' ? 'кг' : product.slug === 'capsules' ? 'уп' : 'л';

  const handleAddToCart = () => {
    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      unit: priceUnit,
    }, quantity);
    
    alert(`✅ Додано ${quantity} ${priceUnit} ${product.name} до корзини!`);
  };

  return (
    <>
      <Head>
        <title>{product.name} — Sunleaf | Купити оптом від {product.price} грн</title>
        <meta name="description" content={`${product.name} — ${product.description}. Ціна від ${product.price} грн/${priceUnit}. Мінімальне замовлення 5 ${priceUnit}. ☎️ +380 67 123-45-67`} />
        <meta property="og:title" content={`${product.name} — Sunleaf`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Head>

      <Header />
      
      <main style={{ minHeight: '100vh', background: '#f8f9fa', padding: 'clamp(40px, 8vw, 80px) 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Breadcrumbs */}
          <div style={{ marginBottom: 32, display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 14, color: '#666' }}>
            <a href="/" style={{ color: '#0057B7', textDecoration: 'none' }}>Головна</a>
            <span>/</span>
            <a href="/#catalog" style={{ color: '#0057B7', textDecoration: 'none' }}>Каталог</a>
            <span>/</span>
            <a href={`/#catalog`} style={{ color: '#0057B7', textDecoration: 'none' }}>{product.categoryName}</a>
            <span>/</span>
            <span>{product.name}</span>
          </div>

          <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))' }}>
            {/* Зображення */}
            <div className="fade-in" style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
              <div style={{ height: 500, backgroundImage: `url('${product.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 20, right: 20, background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#0057B7', padding: '10px 16px', borderRadius: 12, fontWeight: 800, fontSize: 16, boxShadow: '0 4px 12px rgba(255,165,0,0.4)' }}>
                  ⭐ Преміум
                </div>
              </div>
            </div>

            {/* Інформація */}
            <div className="slide-in-right">
              <div style={{ background: '#fff', padding: 40, borderRadius: 20, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', color: '#0057B7', padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
                    {product.categoryName}
                  </span>
                </div>

                <h1 style={{ color: '#0057B7', fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: 16, fontWeight: 900 }}>{product.name}</h1>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <div style={{ background: 'linear-gradient(135deg, #0057B7 0%, #FFD700 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 42, fontWeight: 900 }}>
                    {product.price} грн
                  </div>
                  <span style={{ color: '#666', fontSize: 16 }}>/ {priceUnit}</span>
                </div>

                <p style={{ color: '#555', fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>{product.description}</p>

                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 20 }}>🌍</span>
                    <strong style={{ color: '#0057B7' }}>Країна походження:</strong>
                    <span>{product.country}</span>
                  </div>
                </div>

                {/* Калькулятор */}
                <div style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%)', padding: 24, borderRadius: 16, marginBottom: 28 }}>
                  <label style={{ display: 'block', marginBottom: 12, color: '#0057B7', fontWeight: 700 }}>Кількість ({priceUnit}):</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: 44, height: 44, borderRadius: 10, border: '2px solid #0057B7', background: '#fff', color: '#0057B7', fontSize: 24, cursor: 'pointer', fontWeight: 700 }}>−</button>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} style={{ flex: 1, padding: 12, border: '2px solid #0057B7', borderRadius: 10, fontSize: 18, textAlign: 'center', fontWeight: 700 }} />
                    <button onClick={() => setQuantity(quantity + 1)} style={{ width: 44, height: 44, borderRadius: 10, border: '2px solid #0057B7', background: '#fff', color: '#0057B7', fontSize: 24, cursor: 'pointer', fontWeight: 700 }}>+</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: 'linear-gradient(135deg, #0057B7 0%, #FFD700 100%)', borderRadius: 12, color: '#fff' }}>
                    <strong style={{ fontSize: 18 }}>Всього:</strong>
                    <div style={{ fontSize: 32, fontWeight: 900 }}>{totalPrice.toLocaleString()} грн</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 12 }}>
                  <button onClick={handleAddToCart} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)', color: '#fff', padding: 16, borderRadius: 12, fontWeight: 800, fontSize: 18, textAlign: 'center', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <span>🛒</span> Додати в корзину ({quantity} {priceUnit})
                  </button>
                  <a href="/#pricing-form" className="btn btn-secondary" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#0057B7', padding: 14, borderRadius: 12, fontWeight: 700, fontSize: 16, textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <span>📋</span> Швидке замовлення
                  </a>
                  <a href="/#contacts" style={{ background: 'transparent', border: '2px solid #0057B7', color: '#0057B7', padding: 14, borderRadius: 12, fontWeight: 700, fontSize: 16, textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <span>💬</span> Консультація
                  </a>
                </div>
              </div>

              {/* Характеристики */}
              <div style={{ background: '#fff', padding: 32, borderRadius: 20, boxShadow: '0 10px 40px rgba(0,0,0,0.1)', marginTop: 24 }}>
                <h3 style={{ color: '#0057B7', marginBottom: 20, fontSize: 22, fontWeight: 800 }}>📋 Характеристики</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                  {product.specs.map((spec, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: '#f8f9fa', borderRadius: 10 }}>
                      <strong style={{ color: '#666' }}>{spec.label}:</strong>
                      <span style={{ color: '#0057B7', fontWeight: 600 }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Переваги */}
              <div style={{ background: '#fff', padding: 32, borderRadius: 20, boxShadow: '0 10px 40px rgba(0,0,0,0.1)', marginTop: 24 }}>
                <h3 style={{ color: '#0057B7', marginBottom: 20, fontSize: 22, fontWeight: 800 }}>✨ Переваги</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                  {product.features.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 20, marginTop: 2 }}>✅</span>
                      <span style={{ color: '#555', lineHeight: 1.6 }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Схожі товари */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: 60 }}>
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>Схожі товари</h2>
              <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}>
                {relatedProducts.map((p) => (
                  <a key={p.slug} href={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card-hover" style={{ borderRadius: 16, overflow: 'hidden', background: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                      <div style={{ height: 200, backgroundImage: `url('${p.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      <div style={{ padding: 20 }}>
                        <strong style={{ display: 'block', color: '#0057B7', fontSize: 18, marginBottom: 8 }}>{p.name}</strong>
                        <div style={{ fontWeight: 800, fontSize: 20, background: 'linear-gradient(135deg, #0057B7 0%, #FFD700 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          від {p.price} грн/{priceUnit}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Кнопки навігації */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
            <Link href="/" style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #0057B7 0%, #003d82 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              transition: 'transform 0.3s ease'
            }}>
              🏠 На головну
            </Link>

            <Link href="/product" style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#0057B7',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              transition: 'transform 0.3s ease'
            }}>
              ☕ Каталог
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// SSG: Генерація статичних шляхів
export const getStaticPaths: GetStaticPaths = async () => {
  const products = getAllProducts();
  const paths = products.map(p => ({ params: { id: p.slug } }));
  
  return {
    paths,
    fallback: false, // 404 для неіснуючих товарів
  };
};

// SSG: Отримання даних для кожної сторінки
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = getProductBySlug(params?.id as string);
  
  if (!product) {
    return { notFound: true };
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.slug !== params?.id)
    .slice(0, 3);

  return {
    props: {
      product,
      relatedProducts,
    },
    revalidate: 3600, // Revalidate кожну годину
  };
};
