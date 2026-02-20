import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus, Save, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Customers', href: '/customers' },
    { title: 'Register Guest', href: '/customers/create' },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/customers');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Register New Guest" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href="/customers">
                            <ArrowLeft className="size-5" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">REGISTER GUEST</h2>
                        <p className="text-sm text-muted-foreground font-medium italic uppercase tracking-tighter">Expand your loyal database</p>
                    </div>
                </div>

                <form onSubmit={submit} className="grid gap-6">
                    <Card className="border-sidebar-border/70 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-black italic uppercase tracking-widest text-muted-foreground">Personal Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="font-bold uppercase text-[10px] tracking-widest">Full Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. John Doe"
                                    className="h-11 font-bold border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                />
                                {errors.name && <p className="text-xs text-red-500 font-bold italic">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="font-bold uppercase text-[10px] tracking-widest">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="john@example.com"
                                            className="h-11 pl-10 font-bold border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-red-500 font-bold italic">{errors.email}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone" className="font-bold uppercase text-[10px] tracking-widest">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                            className="h-11 pl-10 font-bold border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-xs text-red-500 font-bold italic">{errors.phone}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid col-span-2 gap-2">
                                    <Label htmlFor="address" className="font-bold uppercase text-[10px] tracking-widest">Street Address</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="123 Pizza St."
                                            className="h-11 pl-10 font-bold border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                        />
                                    </div>
                                    {errors.address && <p className="text-xs text-red-500 font-bold italic">{errors.address}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="city" className="font-bold uppercase text-[10px] tracking-widest">City</Label>
                                    <Input
                                        id="city"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        placeholder="New York"
                                        className="h-11 font-bold border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                    />
                                    {errors.city && <p className="text-xs text-red-500 font-bold italic">{errors.city}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button
                        disabled={processing}
                        className="h-14 bg-[#EE1922] hover:bg-[#d1171d] text-white font-black italic uppercase tracking-tight text-lg shadow-lg shadow-red-200"
                    >
                        <Save className="mr-3 size-6" /> Register Guest
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
