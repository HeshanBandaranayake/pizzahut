import { Head, Link, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Pizza, Plus, Edit, Trash2, Search, CheckCircle2, XCircle, Flame } from 'lucide-react';
import { useState } from 'react';
import { cn } from "@/lib/utils";

interface Topping {
    id: number;
    name: string;
    price: string;
    is_available: boolean;
}

interface Props {
    toppings: Topping[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Menu Management',
        href: '/products',
    },
    {
        title: 'Extra Toppings',
        href: '/toppings',
    },
];

export default function Index({ toppings = [] }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingTopping, setEditingTopping] = useState<Topping | null>(null);

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        name: '',
        price: '0.00',
        is_available: true,
    });

    const filteredToppings = toppings.filter((topping) =>
        topping.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTopping) {
            patch(`/toppings/${editingTopping.id}`, {
                onSuccess: () => {
                    setEditingTopping(null);
                    reset();
                },
            });
        } else {
            post('/toppings', {
                onSuccess: () => {
                    setIsCreateOpen(false);
                    reset();
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Toppings Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">ADD-ON TOPPINGS</h2>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-tighter">Manage extra ingredients and their corresponding costs.</p>
                    </div>

                    <Dialog open={isCreateOpen || !!editingTopping} onOpenChange={(open) => {
                        if (!open) {
                            setIsCreateOpen(false);
                            setEditingTopping(null);
                            reset();
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setIsCreateOpen(true)} className="bg-[#EE1922] hover:bg-[#d1171d] font-bold italic uppercase tracking-tighter shadow-md px-6">
                                <Plus className="mr-2 size-4" /> Add Premium Topping
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle className="font-black italic uppercase text-[#EE1922]">
                                        {editingTopping ? 'Refine Topping Detail' : 'Identify New Topping'}
                                    </DialogTitle>
                                    <DialogDescription className="font-bold uppercase text-[10px] tracking-widest text-muted-foreground">
                                        Define the ingredient name and the cost for extra portions.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className="font-black italic uppercase text-[10px]">Ingredient Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g. TRUFFLE OIL"
                                            className="font-bold uppercase italic tracking-tighter"
                                        />
                                        {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold italic">{errors.name}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="price" className="font-black italic uppercase text-[10px]">Unit Price (Rs.)</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className="font-bold uppercase italic tracking-tighter"
                                        />
                                        {errors.price && <p className="text-red-500 text-[10px] uppercase font-bold italic">{errors.price}</p>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="is_available"
                                            checked={data.is_available}
                                            onChange={(e) => setData('is_available', e.target.checked)}
                                            className="accent-[#EE1922]"
                                        />
                                        <Label htmlFor="is_available" className="font-black italic uppercase text-[10px]">Available for Selection</Label>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={processing} className="w-full bg-[#EE1922] font-black italic uppercase tracking-widest">
                                        {editingTopping ? 'Save Adjustments' : 'Enlist Ingredient'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="SEARCH TOPPINGS..."
                            className="pl-9 font-bold italic uppercase tracking-tighter text-xs h-10 border-muted-foreground/20 bg-muted/20 focus:bg-background transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredToppings.length > 0 ? (
                        filteredToppings.map((topping) => (
                            <Card key={topping.id} className="border-none shadow-lg hover:shadow-xl transition-all dark:bg-[#161615] overflow-hidden group">
                                <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 relative">
                                    <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Flame className="size-20 text-[#F8B803]" />
                                    </div>
                                    <div className="z-10">
                                        <CardTitle className="text-lg font-black italic uppercase tracking-widest group-hover:text-[#EE1922] transition-colors">{topping.name}</CardTitle>
                                        <Badge variant="outline" className={cn(
                                            "mt-1 font-black text-[9px] uppercase italic border-none px-0 flex items-center gap-1",
                                            topping.is_available ? "text-[#22c55e]" : "text-[#EE1922]"
                                        )}>
                                            {topping.is_available ? <CheckCircle2 className="size-3" /> : <XCircle className="size-3" />}
                                            {topping.is_available ? 'SUPPLY ACTIVE' : 'OUT OF STOCK'}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-2xl font-black text-[#F8B803] italic tracking-tighter">
                                            Rs. {parseFloat(topping.price).toFixed(2)}
                                        </span>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">PER UNIT</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 font-black text-[10px] uppercase italic border-[#EE1922]/20 hover:bg-[#EE1922]/5 hover:text-[#EE1922]"
                                            onClick={() => {
                                                setEditingTopping(topping);
                                                setData({
                                                    name: topping.name,
                                                    price: topping.price,
                                                    is_available: topping.is_available,
                                                });
                                            }}
                                        >
                                            <Edit className="mr-2 size-3" /> Edit
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50"
                                            onClick={() => {
                                                if (confirm('Permanently remove this topping from selection?')) {
                                                    router.delete(`/toppings/${topping.id}`);
                                                }
                                            }}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center border-2 border-dashed rounded-2xl border-[#EE1922]/20 bg-[#EE1922]/5">
                            <Flame className="mx-auto size-16 text-[#EE1922]/20 mb-4" />
                            <h3 className="font-black italic uppercase text-[#EE1922]">No toppings detected</h3>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
