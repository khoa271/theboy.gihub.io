import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const { products } = useContext(ShopContext); // Lấy danh sách sản phẩm
    const [product, setProduct] = useState(null);

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
                    <img src={product.image} alt={product.name} className="w-full rounded-lg" />
                </div>

                {/* Thông tin sản phẩm */}
                <div>
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-red-500 text-lg font-semibold">{product.price}đ</p>
                    <p className="text-gray-600">{product.description}</p>

                    {/* Chọn kích cỡ */}
                    <div className="mt-4">
                        <p className="font-medium">Chọn kích cỡ:</p>
                        <div className="flex gap-2 mt-2">
                            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                <button key={size} className="border px-4 py-2 rounded-md hover:bg-gray-200">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Nút mua hàng */}
                    <div className="mt-6 flex gap-4">
                        <button className="bg-black text-white px-4 py-2 rounded-md">Thêm vào giỏ hàng</button>
                        <button className="border border-black px-4 py-2 rounded-md">Mua ngay</button>
                    </div>
                </div>
            </div>

            {/* Sản phẩm liên quan */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold">Sản phẩm liên quan</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {products.slice(0, 4).map(item => (
                        <div key={item._id} className="border p-3 rounded-lg">
                            <img src={item.image} alt={item.name} className="w-full rounded-md" />
                            <p className="text-sm mt-2">{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
