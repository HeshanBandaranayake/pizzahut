import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pizza, Trash2, Plus, ShoppingCart, ArrowLeft, Utensils, Truck, ShoppingBag } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useState } from 'react';
import { Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    price: string;
}

interface Customer {
    id: number;
    name: string;
}

interface Props {
    products: Product[];
    customers: Customer[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/orders',
    },
    {
        title: 'Placement',
        href: '/orders/create',
    },
];

export default function Create({ products = [], customers = [] }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        customer_id: '',
        type: 'Delivery',
        pickup_time: '',
        table_number: '',
        items: [{ product_id: '', quantity: 1 }],
    });

    const addItem = () => {
        setData('items', [...data.items, { product_id: '', quantity: 1 }]);
    };

    const removeItem = (index: number) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData('items', newItems);
    };

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setData('items', newItems);
    };

    const calculateTotal = () => {
        return data.items.reduce((acc, item) => {
            const product = products.find(p => p.id.toString() === item.product_id);
            return acc + (product ? parseFloat(product.price) * item.quantity : 0);
        }, 0).toFixed(2);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/orders');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Order Placement" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href="/orders">
                            <ArrowLeft className="size-5" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">ORDER PLACEMENT</h2>
                        <p className="text-sm text-muted-foreground font-medium italic uppercase tracking-tighter">Kitchen Intake Terminal</p>
                    </div>
                </div>

                <form onSubmit={submit} className="grid gap-6">
                    {/* Customer Selection */}
                    <Card className="border-sidebar-border/70 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-black italic uppercase tracking-widest text-muted-foreground">Select Customer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="customer_id" className="font-bold uppercase text-[10px] tracking-widest">Select Registered Guest</Label>
                                <Select onValueChange={(value) => setData('customer_id', value)}>
                                    <SelectTrigger className="font-bold h-11 border-muted-foreground/20">
                                        <SelectValue placeholder="Search for a customer..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {customers.map((customer) => (
                                            <SelectItem key={customer.id} value={customer.id.toString()} className="font-bold">
                                                {customer.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.customer_id && <p className="text-xs text-red-500 font-bold italic uppercase leading-none mt-1">{errors.customer_id}</p>}
                            </div>

                            <div className="grid gap-2 pt-2">
                                <Label className="font-bold uppercase text-[10px] tracking-widest text-[#EE1922]">Fulfillment Type</Label>
                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant={data.type === 'Delivery' ? 'default' : 'outline'}
                                        onClick={() => setData('type', 'Delivery')}
                                        className={cn(
                                            "flex-1 h-12 font-black italic uppercase tracking-widest transition-all",
                                            data.type === 'Delivery' ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100" : "border-muted-foreground/20"
                                        )}
                                    >
                                        <Truck className="mr-2 size-5" /> Delivery
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={data.type === 'Dine-in' ? 'default' : 'outline'}
                                        onClick={() => setData('type', 'Dine-in')}
                                        className={cn(
                                            "flex-1 h-12 font-black italic uppercase tracking-widest transition-all",
                                            data.type === 'Dine-in' ? "bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-100" : "border-muted-foreground/20"
                                        )}
                                    >
                                        <Utensils className="mr-2 size-5" /> Dine-in
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={data.type === 'Takeaway' ? 'default' : 'outline'}
                                        onClick={() => setData('type', 'Takeaway')}
                                        className={cn(
                                            "flex-1 h-12 font-black italic uppercase tracking-widest transition-all",
                                            data.type === 'Takeaway' ? "bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-100" : "border-muted-foreground/20"
                                        )}
                                    >
                                        <ShoppingBag className="mr-2 size-5" /> Takeaway
                                    </Button>
                                </div>
                            </div>

                            {/* Conditional Fulfillment Details */}
                            {data.type === 'Takeaway' && (
                                <div className="grid gap-2 pt-2 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <Label htmlFor="pickup_time" className="font-bold uppercase text-[10px] tracking-widest text-orange-600">Estimated Pickup Time</Label>
                                    <Select
                                        value={data.pickup_time}
                                        onValueChange={(value) => setData('pickup_time', value)}
                                    >
                                        <SelectTrigger className="font-bold h-11 border-orange-200 bg-orange-50/30">
                                            <SelectValue placeholder="Select pickup window..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="As soon as possible" className="font-bold">As soon as possible (15-20 min)</SelectItem>
                                            <SelectItem value="In 30 minutes" className="font-bold">In 30 minutes</SelectItem>
                                            <SelectItem value="In 45 minutes" className="font-bold">In 45 minutes</SelectItem>
                                            <SelectItem value="In 1 hour" className="font-bold">In 1 hour</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.pickup_time && <p className="text-xs text-red-500 font-bold italic uppercase leading-none mt-1">{errors.pickup_time}</p>}
                                </div>
                            )}

                            {data.type === 'Dine-in' && (
                                <div className="grid gap-2 pt-2 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <Label htmlFor="table_number" className="font-bold uppercase text-[10px] tracking-widest text-purple-600">Table Assignment</Label>
                                    <Input
                                        id="table_number"
                                        placeholder="Enter table # (e.g. B12)"
                                        value={data.table_number}
                                        onChange={(e) => setData('table_number', e.target.value)}
                                        className="font-bold h-11 border-purple-200 bg-purple-50/30"
                                    />
                                    {errors.table_number && <p className="text-xs text-red-500 font-bold italic uppercase leading-none mt-1">{errors.table_number}</p>}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Items Section */}
                    <Card className="border-sidebar-border/70 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-sm font-black italic uppercase tracking-widest text-muted-foreground">Selected Items</CardTitle>
                            <Button type="button" variant="outline" size="sm" onClick={addItem} className="h-8 font-black italic uppercase text-[10px] tracking-widest border-muted-foreground/20">
                                <Plus className="mr-1 size-3" /> Add Pizza
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {data.items.map((item, index) => (
                                <div key={index} className="flex gap-4 items-end animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="grid flex-1 gap-2">
                                        <Label className="font-bold uppercase text-[10px] tracking-widest">Selection</Label>
                                        <Select onValueChange={(value) => updateItem(index, 'product_id', value)}>
                                            <SelectTrigger className="font-bold h-11 border-muted-foreground/20">
                                                <SelectValue placeholder="Choose a pizza..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {products.map((product) => (
                                                    <SelectItem key={product.id} value={product.id.toString()} className="font-bold">
                                                        {product.name} - ${product.price}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid w-24 gap-2">
                                        <Label className="font-bold uppercase text-[10px] tracking-widest text-center">Qty</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                                            className="h-11 text-center font-black border-muted-foreground/20"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-11 w-11 text-muted-foreground/50 hover:text-red-500 hover:bg-red-50"
                                        onClick={() => removeItem(index)}
                                        disabled={data.items.length === 1}
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Footer / Summary */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                        <div className="grid gap-0.5">
                            <span className="text-[10px] font-black italic uppercase tracking-widest text-muted-foreground">Estimate Total</span>
                            <span className="text-4xl font-black text-[#EE1922] italic tracking-tighter">${calculateTotal()}</span>
                        </div>
                        <Button
                            disabled={processing}
                            className="w-full sm:w-auto h-14 px-10 bg-[#EE1922] hover:bg-[#d1171d] text-white font-black italic uppercase tracking-tight text-lg shadow-lg shadow-red-200"
                        >
                            <ShoppingCart className="mr-3 size-6" /> Place Order
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
