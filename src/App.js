import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, DollarSign } from "lucide-react";
import './App.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-white p-4 font-sans fixed top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold bg-green-600 text-white-400">STREET88</div>
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} className="text-green-400" /> : <Menu size={30} className="text-green-400" />}
          </button>
        </div>
        <ul className={`text-green-400 lg:flex gap-6 absolute lg:static top-16 left-0 w-full lg:w-auto lg:bg-transparent p-4 lg:p-0 transition-all ${isOpen ? "block" : "hidden"}`}>
          <li><a href="#" className="text-green hover:text-white-400 text-lg flex items-center"><Menu size={20} className="mr-2" />Меню</a></li>
          <li><a href="#" className="text-green hover:text-white-400 text-lg">О нас</a></li>
          <li><a href="#" className="text-green hover:text-white-400 text-lg">Контакты</a></li>
          <li><a href="#" className="text-green hover:text-white-400 text-lg flex items-center"><ShoppingCart size={20} className="mr-2"/> Корзина</a></li>
        </ul>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="header_bg bg-cover bg-center h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-6xl font-bold text-green-400">БОЛЬШОЙ ГАМБУРГЕР</h1>
      <h2 className="text-2xl mt-2 uppercase">Говядина</h2>
      <p className="max-w-2xl text-center mt-4">Свежая хрустящая булочка, листики салата, маринованный огурец с луком и небольшая котлета, сдобренная майонезом и кетчупом, - таков классический портрет гамбургера, наиболее распространенной «быстрой» еды в США, от отравления которой ежедневно на больничных койках оказываются десятки тысяч американцев</p>
      <button className="mt-6 bg-green-500 text-black py-3 flex items-center px-8 rounded text-lg font-bold shadow-lg"><DollarSign size={20} className="mr-2"/>14 500</button>
    </section>
  );
}

function ProductCard({ image, title, price }) {
  return (
    <div className="p-4 rounded-lg items-center text-white shadow-lg hover:scale-105 transition-transform bg-gray-800">
      <img src={image} alt={title} className="object-cover rounded h-40 w-full" />
      <p className="mt-2 font-bold text-lg">{title}</p>
      <p className="text-green-400 text-xl font-semibold">${price}</p>
      <button className="mt-3 bg-green-500 text-black py-2 px-5 rounded shadow-md">Добавить в корзину</button>
    </div>
  );
}

function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=20")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Ошибка загрузки данных:", error));
  }, []);

  return (
    <section className="bg-black text-white py-16 px-4">
      <h3 className="text-4xl font-bold text-green-400 text-center">Наши товары</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 container mx-auto">
        {products.map(product => (
          <ProductCard key={product.id} image={product.image} title={product.title} price={product.price} />
        ))}
      </div>
    </section>
  );
}

export default function BurgerShop() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProductSection />
    </div>
  );
}
