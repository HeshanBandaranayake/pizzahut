import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pizza, Save, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Menu', href: '/products' },
    { title: 'New Pizza', href: '/products/create' },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        category: 'Pizza',
        is_available: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/products');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Pizza" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href="/products">
                            <ArrowLeft className="size-5" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">ADD NEW PIZZA</h2>
                        <p className="text-sm text-muted-foreground font-medium italic uppercase tracking-tighter">Expand the Restaurant Offerings</p>
                    </div>
                </div>

                <form onSubmit={submit} className="grid gap-6">
                    <Card className="border-sidebar-border/70 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-black italic uppercase tracking-widest text-muted-foreground">Product Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="font-bold uppercase text-[10px] tracking-widest">Pizza Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Pepperoni Feast"
                                    className="h-11 font-bold border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                />
                                {errors.name && <p className="text-xs text-red-500 font-bold italic">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price" className="font-bold uppercase text-[10px] tracking-widest">Price ($)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="12.99"
                                        className="h-11 font-bold border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                    />
                                    {errors.price && <p className="text-xs text-red-500 font-bold italic">{errors.price}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category" className="font-bold uppercase text-[10px] tracking-widest">Category</Label>
                                    <Select defaultValue={data.category} onValueChange={(value) => setData('category', value)}>
                                        <SelectTrigger className="h-11 font-bold border-muted-foreground/20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pizza" className="font-bold">Pizza</SelectItem>
                                            <SelectItem value="Sides" className="font-bold">Sides</SelectItem>
                                            <SelectItem value="Drinks" className="font-bold">Drinks</SelectItem>
                                            <SelectItem value="Desserts" className="font-bold">Desserts</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description" className="font-bold uppercase text-[10px] tracking-widest">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Tell us about this pizza..."
                                    className="min-h-[100px] font-medium border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                />
                                {errors.description && <p className="text-xs text-red-500 font-bold italic">{errors.description}</p>}
                            </div>

                            <div className="grid gap-2 pt-2">
                                <Label className="font-bold uppercase text-[10px] tracking-widest">Availability Status</Label>
                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant={data.is_available ? 'default' : 'outline'}
                                        onClick={() => setData('is_available', true)}
                                        className={cn(
                                            "flex-1 h-12 font-black italic uppercase tracking-widest transition-all",
                                            data.is_available ? "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100" : "border-muted-foreground/20"
                                        )}
                                    >
                                        <CheckCircle2 className="mr-2 size-5" /> Available
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={!data.is_available ? 'default' : 'outline'}
                                        onClick={() => setData('is_available', false)}
                                        className={cn(
                                            "flex-1 h-12 font-black italic uppercase tracking-widest transition-all",
                                            !data.is_available ? "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-100" : "border-muted-foreground/20"
                                        )}
                                    >
                                        <XCircle className="mr-2 size-5" /> Sold Out
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button
                        disabled={processing}
                        className="h-14 bg-[#EE1922] hover:bg-[#d1171d] text-white font-black italic uppercase tracking-tight text-lg shadow-lg shadow-red-200"
                    >
                        <Save className="mr-3 size-6" /> Save Product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
