import { Head, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/use-cart';
import { ArrowLeft, ShoppingBag, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Checkout() {
    const { items, total, clearCart } = useCart();
    const { auth } = usePage().props as any;

    const { data, setData, post, processing, errors } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        phone: '',
        address: '',
        city: '',
        type: 'Delivery',
        items: items.map(item => ({
            product_id: item.id,
            quantity: item.quantity
        }))
    });

    useEffect(() => {
        if (items.length === 0) {
            // Redirect if cart is empty
            window.location.href = '/';
        }
    }, [items]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout', {
            onSuccess: () => {
                clearCart();
            }
        });
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <Head title="Checkout | PizzaHut" />
            <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
                <div className="mb-8 items-center gap-4 flex">
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href="/">
                            <ArrowLeft className="size-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-black italic tracking-tighter text-[#EE1922]">FINAL DEPLOYMENT</h1>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Logistics Verification Protocol</p>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-5">
                    <div className="lg:col-span-3 space-y-6">
                        <form id="checkout-form" onSubmit={submit}>
                            <Card className="border-sidebar-border shadow-md overflow-hidden">
                                <div className="h-1.5 bg-[#EE1922]" />
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl font-black italic text-[#EE1922]">
                                        <Truck className="size-5" />
                                        DELIVERY INTELLIGENCE
                                    </CardTitle>
                                    <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Target Destination Data</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest">Operative Name</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="h-12 font-bold"
                                                placeholder="Legal name for fulfillment"
                                            />
                                            {errors.name && <p className="text-xs text-red-500 font-bold italic uppercase">{errors.name}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest">Comm Link (Phone)</Label>
                                            <Input
                                                id="phone"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                className="h-12 font-bold"
                                                placeholder="+1-XXX-XXX-XXXX"
                                            />
                                            {errors.phone && <p className="text-xs text-red-500 font-bold italic uppercase">{errors.phone}</p>}
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="address" className="text-[10px] font-black uppercase tracking-widest">Target Address</Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={e => setData('address', e.target.value)}
                                            className="h-12 font-bold"
                                            placeholder="Street, Suite, Apt"
                                        />
                                        {errors.address && <p className="text-xs text-red-500 font-bold italic uppercase">{errors.address}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="city" className="text-[10px] font-black uppercase tracking-widest">Sector (City)</Label>
                                        <Input
                                            id="city"
                                            value={data.city}
                                            onChange={e => setData('city', e.target.value)}
                                            className="h-12 font-bold"
                                            placeholder="Metropolis Area"
                                        />
                                        {errors.city && <p className="text-xs text-red-500 font-bold italic uppercase">{errors.city}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </form>

                        <Card className="border-sidebar-border shadow-md overflow-hidden">
                            <div className="h-1.5 bg-[#f8b803]" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl font-black italic text-[#f8b803]">
                                    <CreditCard className="size-5" />
                                    PAYMENT TACTICS
                                </CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Transaction Security Verified</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="p-4 bg-muted/50 rounded-xl border border-dashed border-muted-foreground/20 text-center">
                                    <p className="text-xs font-black italic uppercase text-muted-foreground">Cash on Delivery (Standard)</p>
                                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter mt-1">Payment to be settled at fulfillment target</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-sidebar-border shadow-lg overflow-hidden sticky top-8">
                            <CardHeader className="bg-[#EE1922]/5">
                                <CardTitle className="text-xs font-black italic uppercase tracking-[0.2em] text-[#EE1922]">DEPLOYMENT SUMMARY</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-4">
                                    {items.map(item => (
                                        <div key={item.id} className="flex justify-between items-center group">
                                            <div className="flex gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-[#EE1922]/5 border border-sidebar-border/50 flex items-center justify-center font-black italic text-[#EE1922] text-xs">
                                                    {item.quantity}x
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black italic uppercase text-sidebar-foreground">{item.name}</p>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Hand-Tossed Classic</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-black italic text-[#EE1922]">${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-6 border-t border-muted-foreground/10 space-y-2">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <span>Subtotal Assets</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[#EE1922]">
                                        <span>Logistics Fee</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="pt-4 flex justify-between items-center">
                                        <span className="text-lg font-black italic text-[#EE1922]">FINAL SUM</span>
                                        <span className="text-3xl font-black italic text-[#EE1922] tracking-tighter">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button
                                    form="checkout-form"
                                    disabled={processing || items.length === 0}
                                    className="w-full h-16 mt-6 bg-[#EE1922] hover:bg-[#D0161D] text-white font-black italic uppercase tracking-widest text-lg shadow-xl shadow-red-200 transition-all active:scale-[0.98]"
                                >
                                    <ShieldCheck className="mr-2 size-6" />
                                    CONFIRM DEPLOYMENT
                                </Button>
                                <p className="text-[10px] text-center font-bold text-muted-foreground uppercase opacity-40 mt-4 leading-relaxed">
                                    By deploying, you agree to our standard fulfillment protocols and logistics terms.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
