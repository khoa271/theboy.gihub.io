import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = 'VND';
    const delivery_fee = 0;
    const backendUrl = "http://localhost:3001";

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getLatestProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/latest`);
            if (response.data.success) {
                setLatestProducts(response.data.products);
            }
        } catch (error) {
            toast.error("Lỗi khi lấy sản phẩm mới nhất");
        }
    };

    const getBestSellerProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/best`);
            if (response.data.success) {
                setBestSellerProducts(response.data.products);
            }
        } catch (error) {
            toast.error("Lỗi khi lấy sản phẩm bán chạy nhất");
        }
    };

    const getUserCart = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Không tìm thấy token!");

            const response = await fetch(`${backendUrl}/api/cart/get`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Lỗi lấy giỏ hàng!");
            }

            const data = await response.json();
            setCartItems(data.cart);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductsData();
        getLatestProducts();
        getBestSellerProducts();
        getUserCart();
    }, [token]);

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Chọn kích thước sản phẩm!');
            return;
        }

        let cartData = structuredClone(cartItems);
        cartData[itemId] = cartData[itemId] || {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        setCartItems(cartData);
        localStorage.setItem('cartItems', JSON.stringify(cartData));
        toast.success('Đã thêm vào giỏ hàng!');

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Bạn chưa đăng nhập!");
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/cart/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ itemId, size, quantity: 1 }),
            });

            const data = await response.json();
            if (!data.success) throw new Error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        if (!token) return;
        if (quantity < 1) return removeItemFromCart(itemId, size);

        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/update`,
                { itemId, size, quantity },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            if (response.data.success) {
                setCartItems(response.data.cart);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const removeItemFromCart = async (itemId, size) => {
        if (!token) return;

        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/update`,
                { itemId, size, quantity: 0 },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            if (response.data.success) {
                setCartItems(response.data.cart);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const clearCart = async () => {
        if (!token) return;
        try {
            const response = await axios.delete(`${backendUrl}/api/cart/clear`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setCartItems({});
                toast.success("Giỏ hàng đã được làm trống!");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce(
            (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
            0
        );
    };

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
            const itemInfo = products.find((p) => p._id === itemId);
            return total + (itemInfo ? Object.values(sizes).reduce((sum, qty) => sum + itemInfo.price * qty, 0) : 0);
        }, 0);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
    };

    const value = {
        products, latestProducts, bestSellerProducts, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, updateQuantity, removeItemFromCart, clearCart,
        getCartCount, getCartAmount, token, setToken, logout,
        navigate, backendUrl
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
