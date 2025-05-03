import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { products, addToCart } = useContext(ShopContext);
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const selectedProduct = products.find(item => item._id === id);
        setProduct(selectedProduct);
    }, [id, products]);

    if (!product) return <p className="text-center">Sản phẩm không tồn tại</p>;

    return (
        <div className="container mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hình ảnh */}
                <div>
                    <img src={`http://localhost:3001${product.image}`} alt={product.name} className="w-full rounded-lg" />
                </div>

                {/* Thông tin sản phẩm */}
                <div>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-red-500 text-lg font-semibold">{product.price}đ</p>
                    <p className="text-gray-600">{product.shortDescription}</p>

                    {/* Chọn kích cỡ */}
                    <div className="mt-4">
                        <p className="font-medium">Chọn kích cỡ:</p>
                        <div className="flex gap-2 mt-2">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <button
                                    key={size}
                                    className={`border px-4 py-2 rounded-md ${selectedSize === size ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Nút mua hàng */}
                    <div className="mt-6 flex gap-4">
                        <button
                            className="bg-black text-white px-4 py-2 rounded-md"
                            onClick={() => addToCart(product)}
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button className="border border-black px-4 py-2 rounded-md">Mua ngay</button>
                    </div>
                </div>
            </div>

            {/* Mô tả chi tiết */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold">Chi tiết sản phẩm</h2>
                <div className="mt-4">
                    <p><strong>Chất liệu:</strong> {product.material}</p>
                    <p><strong>Thiết kế:</strong> {product.design}</p>
                    <p><strong>Túi áo:</strong> {product.pockets}</p>
                    <p><strong>Cổ áo:</strong> {product.collar}</p>
                    <p><strong>Màu sắc:</strong> {product.colors}</p>
                </div>
            </div>

            {/* Sản phẩm liên quan */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold">Sản phẩm liên quan</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {products.slice(0, 4).map(item => (
                        <Link key={item._id} to={`/product/${item._id}`} className="border p-3 rounded-lg block">
                            <img src={`http://localhost:3001${item.image}`} alt={item.name} className="w-full rounded-md" />
                            <p className="text-sm mt-2">{item.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
