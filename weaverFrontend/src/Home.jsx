import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/dresses")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero">
                <h1>WeaveConnect</h1>
                <p>Connecting Customers with Traditional Weavers</p>
                <div className="hero-buttons">
                    <Link to="/signup">
                        <button className="btn primary">Join as Customer</button>
                    </Link>
                    <Link to="/customer/customDress">
                        <button className="btn secondary">Customize Now</button>
                    </Link>
                </div>
            </header>

            {/* Products */}
            <section className="products">
                <h2>Our Products</h2>
                <div className="product-grid">
                    {products.map(product => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <div className="product-info">
                                <h4>{product.name}</h4>
                                <p>{product.description}</p>
                                <p className="price">₹{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Customize */}
            <section className="customize">
                <h2>Customize Your Dress</h2>
                <p>Create your own unique design by choosing fabric, colors, and patterns.</p>
                <Link to="/customer/customDress">
                    <button className="btn primary">Customize Now</button>
                </Link>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>Empowering Weavers | Celebrating Tradition </p>
                <Link to="/login">Already have an account? <b>Login here</b></Link>
            </footer>
        </div>
    );
}

export default Home;
