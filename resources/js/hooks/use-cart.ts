import { useState, useEffect, useCallback } from 'react';

export interface CartItem {
    id: number;
    name: string;
    price: string;
    quantity: number;
    image_path?: string | null;
}

export const useCart = () => {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('pizza-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    const saveCart = useCallback((newItems: CartItem[]) => {
        setItems(newItems);
        localStorage.setItem('pizza-cart', JSON.stringify(newItems));
    }, []);

    const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            let next;
            if (existing) {
                next = prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            } else {
                next = [...prev, { ...item, quantity: 1 }];
            }
            localStorage.setItem('pizza-cart', JSON.stringify(next));
            return next;
        });
    }, []);

    const removeItem = useCallback((id: number) => {
        setItems(prev => {
            const next = prev.filter(i => i.id !== id);
            localStorage.setItem('pizza-cart', JSON.stringify(next));
            return next;
        });
    }, []);

    const updateQuantity = useCallback((id: number, quantity: number) => {
        setItems(prev => {
            const next = prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i).filter(i => i.quantity > 0);
            localStorage.setItem('pizza-cart', JSON.stringify(next));
            return next;
        });
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
        localStorage.removeItem('pizza-cart');
    }, []);

    const total = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

    return {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total
    };
};
