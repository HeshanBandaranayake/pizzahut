import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
    id: number;
    name: string;
    price: string;
    quantity: number;
    image_path?: string | null;
}

interface CartStore {
    items: CartItem[];
    setItems: (items: CartItem[]) => void;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            setItems: (items) => set({ items }),
            addItem: (item) => set((state) => {
                const existing = state.items.find((i) => i.id === item.id);
                if (existing) {
                    return {
                        items: state.items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    };
                }
                return { items: [...state.items, { ...item, quantity: 1 }] };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((i) => i.id !== id)
            })),
            updateQuantity: (id, quantity) => set((state) => ({
                items: state.items
                    .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i))
                    .filter((i) => i.quantity > 0),
            })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'pizza-cart',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const useCart = () => {
    const store = useCartStore();

    const total = store.items.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0
    );

    return {
        ...store,
        total
    };
};
