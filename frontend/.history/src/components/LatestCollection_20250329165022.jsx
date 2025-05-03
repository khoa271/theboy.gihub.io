import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        // Sắp xếp sản phẩm theo `createdAt` giảm dần để lấy sản phẩm mới nhất
        const latest = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        setLatestProducts(latest);
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BỘ SƯU TẬP'} text2={'MỚI NHẤT'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Những sản phẩm mới nhất vừa cập nhật
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProducts.map((item, index) => (
                    <ProductItem 
                        key={index} 
                        id={item._id} 
                        name={item.name} 
                        image={`http://localhost:3001${item.image}`} 
                        price={item.price} 
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;
