import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, Minus, Pizza } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

interface PizzaCustomizerProps {
    pizza: {
        id: number;
        title: string;
        price: string;
        image: string;
        description: string;
    } | null;
    availableSizes?: any[];
    availableToppings?: any[];
    isOpen: boolean;
    onClose: () => void;
}

export function PizzaCustomizer({
    pizza,
    isOpen,
    onClose,
    availableSizes = [],
    availableToppings = []
}: PizzaCustomizerProps) {
    const { addItem } = useCart();

    // Default to first size if available, or a fallback
    const [selectedSize, setSelectedSize] = useState<any>(null);
    const [selectedToppings, setSelectedToppings] = useState<any[]>([]);

    useEffect(() => {
        if (availableSizes.length > 0 && !selectedSize) {
            setSelectedSize(availableSizes[0]);
        }
    }, [availableSizes]);

    if (!pizza) return null;

    const basePrice = parseFloat(pizza.price.replace('$', ''));
    const sizePriceMod = selectedSize ? parseFloat(selectedSize.price_modifier) : 0;
    const toppingsPrice = selectedToppings.reduce((acc, t) => acc + parseFloat(t.price), 0);
    const totalPrice = basePrice + sizePriceMod + toppingsPrice;

    const toggleTopping = (topping: any) => {
        setSelectedToppings(prev =>
            prev.find(t => t.id === topping.id)
                ? prev.filter(t => t.id !== topping.id)
                : [...prev, topping]
        );
    };

    const handleAddToCart = () => {
        addItem({
            id: pizza.id,
            name: pizza.title,
            price: totalPrice.toFixed(2),
            image_path: pizza.image,
            size: selectedSize?.name || 'Standard',
            toppings: selectedToppings.map(t => t.name),
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl">
                <div className="relative h-48 w-full overflow-hidden">
                    <img src={pizza.image} alt={pizza.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                        <DialogTitle className="text-3xl font-black italic text-white uppercase tracking-tighter">
                            {pizza.title}
                        </DialogTitle>
                    </div>
                </div>

                <div className="p-6 space-y-8 max-h-[60vh] overflow-y-auto">
                    {/* Size Selection */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#EE1922]">CHOOSE YOUR SIZE</h4>
                        <div className="grid grid-cols-3 gap-3">
                            {availableSizes.length > 0 ? availableSizes.map((size) => (
                                <button
                                    key={size.id}
                                    onClick={() => setSelectedSize(size)}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                                        selectedSize?.id === size.id
                                            ? "border-[#EE1922] bg-[#EE1922]/5 shadow-inner"
                                            : "border-muted hover:border-[#EE1922]/20"
                                    )}
                                >
                                    <Pizza className={cn(
                                        "mb-2 transition-transform",
                                        size.name.toLowerCase().includes('personal') ? 'h-6 w-6' : size.name.toLowerCase().includes('medium') ? 'h-8 w-8' : 'h-10 w-10',
                                        selectedSize?.id === size.id ? "text-[#EE1922] scale-110" : "text-muted-foreground"
                                    )} />
                                    <span className={cn("text-[10px] font-black uppercase italic", selectedSize?.id === size.id ? "text-[#EE1922]" : "text-muted-foreground")}>
                                        {size.name}
                                    </span>
                                </button>
                            )) : (
                                <p className="col-span-3 text-center text-[10px] font-bold uppercase text-muted-foreground italic">Standard size only available.</p>
                            )}
                        </div>
                    </div>

                    {/* Toppings Selection */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#EE1922]">ADD EXTRA FIRE (TOPPINGS)</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {availableToppings.length > 0 ? availableToppings.map((topping) => {
                                const isSelected = !!selectedToppings.find(t => t.id === topping.id);
                                return (
                                    <button
                                        key={topping.id}
                                        onClick={() => toggleTopping(topping)}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left",
                                            isSelected
                                                ? "border-[#F8B803] bg-[#F8B803]/5"
                                                : "border-muted hover:border-[#F8B803]/20"
                                        )}
                                    >
                                        <span className={cn("text-[10px] font-black uppercase italic", isSelected ? "text-black" : "text-muted-foreground")}>
                                            {topping.name}
                                        </span>
                                        <div className={cn(
                                            "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                                            isSelected ? "bg-[#F8B803] border-[#F8B803]" : "border-muted-foreground/30"
                                        )}>
                                            {isSelected && <Check className="h-3 w-3 text-black stroke-[4]" />}
                                        </div>
                                    </button>
                                );
                            }) : (
                                <p className="col-span-2 text-center text-[10px] font-bold uppercase text-muted-foreground italic">No extra toppings available.</p>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 bg-muted/50 border-t">
                    <div className="flex w-full items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Configuration</span>
                            <span className="text-2xl font-black italic text-[#EE1922]">${totalPrice.toFixed(2)}</span>
                        </div>
                        <Button
                            onClick={handleAddToCart}
                            className="h-14 px-8 bg-[#EE1922] hover:bg-[#D0161D] text-white font-black italic uppercase tracking-widest text-lg shadow-xl shadow-red-100"
                        >
                            ADD TO TRAY
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
