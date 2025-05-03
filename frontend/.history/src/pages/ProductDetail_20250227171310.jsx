import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { products, addToCart } = useContext(ShopContext);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const selectedProduct = products.find(item => item._id === id);
        setProduct(selectedProduct);

        if (selectedProduct) {
            const related = products.filter(p => p.category === selectedProduct.category && p._id !== id);
            setRelatedProducts(related);
        }
    }, [id, products]);

    if (!product) return <p className="text-center">Sản phẩm không tồn tại</p>;

    return (
        <div className="container mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ảnh sản phẩm */}
                <div>
                    <img src={`http://localhost:3001${product.image}`} alt={product.name} className="w-full rounded-lg" />
                </div>

                {/* Chi tiết sản phẩm */}
                <div>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-red-500 text-lg font-semibold">{product.price}đ</p>

                    {/* Chọn kích cỡ */}
                    <div className="mt-4">
                        <p className="font-medium">Chọn kích cỡ:</p>
                        <div className="flex gap-2 mt-2">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <button key={size} className={`border px-4 py-2 rounded-md ${selectedSize === size ? 'bg-gray-300' : 'hover:bg-gray-200'}`} onClick={() => setSelectedSize(size)}>{size}</button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex gap-4">
                        <button className="bg-black text-white px-4 py-2 rounded-md" onClick={() => addToCart(product._id, selectedSize)}>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>

            {/* Section: Mô tả sản phẩm */}
            <div className="mt-12 p-6 bg-gray-100 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2>
                <ul className="list-disc list-inside space-y-2">
                    {product.description.split('\n').map((desc, index) => (
                        <li key={index}>{desc}</li>
                    ))}
                </ul>
            </div>

            {/* Section: Sản phẩm liên quan */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold">Sản phẩm liên quan</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                    {relatedProducts.map((item) => (
                        <Link to={`/product/${item._id}`} key={item._id} className="border p-4 rounded-lg shadow hover:shadow-lg">
                            <img src={`http://localhost:3001${item.image}`} alt={item.name} className="w-full rounded-md" />
                            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                            <p className="text-red-500 font-semibold">{item.price}đ</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
