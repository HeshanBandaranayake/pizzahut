import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pizza, Trash2, Plus, ShoppingCart, ArrowLeft, Utensils, Truck, Save, ShoppingBag } from 'lucide-react';
import { cn } from "@/lib/utils";
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

interface OrderItem {
    product_id: number;
    quantity: number;
    product?: {
        name: string;
    };
}

interface Order {
    id: number;
    customer_id: number;
    type: string;
    status: string;
    pickup_time?: string;
    table_number?: string;
    order_items: OrderItem[];
}

interface Props {
    order: Order;
    products: Product[];
    customers: Customer[];
}

export default function Edit({ order, products = [], customers = [] }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Orders', href: '/orders' },
        { title: `Edit Order #PH-${order.id.toString().padStart(4, '0')}`, href: `/orders/${order.id}/edit` },
    ];

    const { data, setData, patch, processing, errors } = useForm({
        customer_id: order.customer_id.toString(),
        type: order.type,
        status: order.status,
        pickup_time: order.pickup_time || '',
        table_number: order.table_number || '',
        items: order.order_items.map(item => ({
            product_id: item.product_id.toString(),
            quantity: item.quantity
        })),
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
        patch(`/orders/${order.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Order #PH-${order.id}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href="/orders">
                            <ArrowLeft className="size-5" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">EDIT ORDER</h2>
                        <p className="text-sm text-muted-foreground font-medium italic uppercase tracking-tighter">Modify Order #PH-{order.id.toString().padStart(4, '0')}</p>
                    </div>
                </div>

                <form onSubmit={submit} className="grid gap-6">
                    {/* Customer & Type Selection */}
                    <Card className="border-sidebar-border/70 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-black italic uppercase tracking-widest text-muted-foreground">Order Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="customer_id" className="font-bold uppercase text-[10px] tracking-widest">Customer</Label>
                                <Select defaultValue={data.customer_id} onValueChange={(value) => setData('customer_id', value)}>
                                    <SelectTrigger className="font-bold h-11 border-muted-foreground/20">
                                        <SelectValue placeholder="Select customer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {customers.map((customer) => (
                                            <SelectItem key={customer.id} value={customer.id.toString()} className="font-bold">
                                                {customer.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
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
                                <div className="grid gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
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
                                <div className="grid gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
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

                            <div className="grid gap-2">
                                <Label htmlFor="status" className="font-bold uppercase text-[10px] tracking-widest text-[#EE1922]">Order Status Override</Label>
                                <Select defaultValue={data.status} onValueChange={(value) => setData('status', value)}>
                                    <SelectTrigger className="h-11 font-bold border-muted-foreground/20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pending" className="font-bold text-yellow-600">Pending</SelectItem>
                                        <SelectItem value="Delivering" className="font-bold text-blue-600">Delivering</SelectItem>
                                        <SelectItem value="Completed" className="font-bold text-green-600">Completed</SelectItem>
                                        <SelectItem value="Cancelled" className="font-bold text-red-600">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Items Section */}
                    <Card className="border-sidebar-border/70 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-sm font-black italic uppercase tracking-widest text-muted-foreground">Items</CardTitle>
                            <Button type="button" variant="outline" size="sm" onClick={addItem} className="h-8 font-black italic uppercase text-[10px] tracking-widest border-muted-foreground/20">
                                <Plus className="mr-1 size-3" /> Add Pizza
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {data.items.map((item, index) => (
                                <div key={index} className="flex gap-4 items-end">
                                    <div className="grid flex-1 gap-2">
                                        <Label className="font-bold uppercase text-[10px] tracking-widest">Pizza</Label>
                                        <Select defaultValue={item.product_id} onValueChange={(value) => updateItem(index, 'product_id', value)}>
                                            <SelectTrigger className="font-bold h-11 border-muted-foreground/20">
                                                <SelectValue placeholder="Select pizza" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {products.map((product) => (
                                                    <SelectItem key={product.id} value={product.id.toString()} className="font-bold">
                                                        {product.name} - Rs. {product.price}
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
                                        className="h-11 w-11 text-muted-foreground/50 hover:text-red-500"
                                        onClick={() => removeItem(index)}
                                        disabled={data.items.length === 1}
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                        <div className="grid gap-0.5">
                            <span className="text-[10px] font-black italic uppercase tracking-widest text-muted-foreground">New Total</span>
                            <span className="text-4xl font-black text-[#EE1922] italic tracking-tighter">Rs. {calculateTotal()}</span>
                        </div>
                        <Button
                            disabled={processing}
                            className="w-full sm:w-auto h-14 px-10 bg-green-600 hover:bg-green-700 text-white font-black italic uppercase tracking-tight text-lg shadow-lg shadow-green-100"
                        >
                            <Save className="mr-3 size-6" /> Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
