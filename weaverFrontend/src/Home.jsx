import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from backend
        axios.get("http://localhost:3001/api/dresses")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>🧵 WeaveConnect</h1>
                <p style={styles.subtitle}>Connecting Customers with Traditional Weavers</p>
            </header>

            {/* Customer / Weaver Sections */}
            <section style={styles.section}>
                <h2>For Customers</h2>
                <p>Order handloom products or request custom designs (color, pattern, size, etc.).</p>
                <Link to="/signup">
                    <button style={styles.button}>Join as Customer</button>
                </Link>
            </section>

            <section style={styles.section}>
                <h2>For Weavers</h2>
                <p>View and accept orders, upload your designs, and connect with customers.</p>
                <Link to="/signup">
                    <button style={styles.button}>Join as Weaver</button>
                </Link>
            </section>

            {/* Products Section */}
            <section style={styles.section}>
                <h2>Our Products</h2>
                <div style={styles.productGrid}>
                    {products.map(product => (
                        <div key={product._id} style={styles.productCard}>
                            <img src={product.image} alt={product.name} style={styles.productImage} />
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                            <p>Price: ₹{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h1>Custome Your Dress</h1>
                <Link to="/customer/customDress">
                    <button style={styles.button}>Customize Your Dress</button>
                </Link>

            </section>

            <footer style={styles.footer}>
                <Link to="/login">Already have an account? Login here</Link>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
    },
    header: {
        marginBottom: "2rem",
    },
    title: {
        fontSize: "2.5rem",
        color: "#2c3e50",
    },
    subtitle: {
        fontSize: "1.2rem",
        color: "#555",
    },
    section: {
        margin: "2rem 0",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
    },
    button: {
        marginTop: "1rem",
        padding: "0.7rem 1.5rem",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#2c3e50",
        color: "#fff",
        cursor: "pointer",
    },
    footer: {
        marginTop: "3rem",
    },
    productGrid: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem",
        marginTop: "1rem",
    },
    productCard: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        width: "200px",
        backgroundColor: "#fff",
    },
    productImage: {
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "5px",
    },
};

export default Home;
