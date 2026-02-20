import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, NavItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Pizza, Plus, MoreVertical, Edit, Trash2, Search, Tag, Flame, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    is_available: boolean;
}

interface Props {
    products: Product[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory Catalog',
        href: '/products',
    },
];

type CategoryFilter = 'All' | 'Pizza' | 'Signature' | 'Delight' | 'Beverages';

const CATEGORY_FILTERS: { key: CategoryFilter; label: string; emoji: string }[] = [
    { key: 'All', label: 'All', emoji: '🍽️' },
    { key: 'Pizza', label: 'Classic', emoji: '🍕' },
    { key: 'Signature', label: 'Signature', emoji: '⭐' },
    { key: 'Delight', label: 'Delight', emoji: '✨' },
    { key: 'Beverages', label: 'Beverages', emoji: '🥤' },
];

export default function Index({ products = [] }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
    const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'unavailable'>('all');

    const filteredProducts = products.filter((product: Product) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            product.name.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower) ||
            (product.description || '').toLowerCase().includes(searchLower);
        const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
        const matchesAvailability =
            availabilityFilter === 'all' ||
            (availabilityFilter === 'available' && product.is_available) ||
            (availabilityFilter === 'unavailable' && !product.is_available);
        return matchesSearch && matchesCategory && matchesAvailability;
    });

    const hasFilters = categoryFilter !== 'All' || availabilityFilter !== 'all' || searchQuery !== '';
    const clearFilters = () => { setCategoryFilter('All'); setAvailabilityFilter('all'); setSearchQuery(''); };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pizza Menu" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">RESTAURANT SELECTION</h2>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-tighter">Inventory control and recipe management center.</p>
                    </div>
                    <Button asChild className="bg-[#EE1922] hover:bg-[#d1171d] font-bold italic uppercase tracking-tighter shadow-md px-6">
                        <Link href="/products/create">
                            <Plus className="mr-2 size-4" /> Add New Recipe
                        </Link>
                    </Button>
                </div>

                {/* Search & Availability row */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="SEARCH BY PRODUCT OR CATEGORY..."
                            className="pl-9 font-bold italic uppercase tracking-tighter text-xs h-10 border-muted-foreground/20 bg-muted/20 focus:bg-background transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Availability toggle */}
                    <div className="flex h-10 rounded-md border border-muted-foreground/20 overflow-hidden flex-shrink-0">
                        {(['all', 'available', 'unavailable'] as const).map((val) => (
                            <button
                                key={val}
                                onClick={() => setAvailabilityFilter(val)}
                                className={cn(
                                    "px-3 text-[10px] font-black uppercase italic tracking-widest transition-all",
                                    availabilityFilter === val
                                        ? val === 'available' ? "bg-green-600 text-white"
                                            : val === 'unavailable' ? "bg-[#EE1922] text-white"
                                                : "bg-[#EE1922] text-white"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                {val === 'all' ? 'All' : val === 'available' ? '✅ In Stock' : '❌ Out'}
                            </button>
                        ))}
                    </div>

                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1.5 text-[10px] font-black uppercase italic tracking-widest text-muted-foreground hover:text-[#EE1922] transition-colors flex-shrink-0"
                        >
                            <X className="size-3" /> Clear
                        </button>
                    )}
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2">
                    {CATEGORY_FILTERS.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setCategoryFilter(cat.key)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-xs font-black italic uppercase tracking-widest border transition-all",
                                categoryFilter === cat.key
                                    ? "bg-[#EE1922] text-white border-[#EE1922] shadow-lg shadow-red-100 dark:shadow-red-900/30 scale-105"
                                    : "border-muted-foreground/20 text-muted-foreground hover:border-[#EE1922]/40 hover:text-[#EE1922] hover:bg-[#EE1922]/5"
                            )}
                        >
                            <span className="mr-1">{cat.emoji}</span> {cat.label}
                            <span className="ml-1.5 text-[9px] opacity-60">
                                ({products.filter(p => cat.key === 'All' ? true : p.category === cat.key).length})
                            </span>
                        </button>
                    ))}
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product: Product) => (
                            <Card key={product.id} className="overflow-hidden border-none shadow-xl group hover:shadow-2xl transition-all duration-300 dark:bg-[#161615]">
                                <div className="aspect-video bg-muted/20 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0" />
                                    <Pizza className="size-16 text-[#EE1922]/10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 z-10" />
                                    <Badge className={cn(
                                        "absolute top-3 left-3 font-black uppercase text-[9px] tracking-widest px-2 py-0.5 z-20",
                                        product.is_available ? "bg-[#22c55e] text-white" : "bg-[#EE1922] text-white"
                                    )}>
                                        {product.is_available ? 'IN STOCK' : 'OUT OF STOCK'}
                                    </Badge>
                                    <div className="absolute top-3 right-3 z-20">
                                        <Badge className="bg-[#F8B803] text-black font-black text-[10px] italic">{product.category || 'CLASSIC'}</Badge>
                                    </div>
                                </div>
                                <CardHeader className="p-5 pb-2">
                                    <div className="flex justify-between items-start mb-1">
                                        <CardTitle className="text-lg font-black italic tracking-widest uppercase leading-tight group-hover:text-[#EE1922] transition-colors">{product.name}</CardTitle>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xl font-black text-[#EE1922] tracking-tighter italic">Rs. {parseFloat(product.price).toFixed(2)}</span>
                                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">MSRP INCL. TAX</span>
                                    </div>
                                    <CardDescription className="line-clamp-2 text-[11px] font-medium leading-relaxed uppercase tracking-tight h-8 mb-2">
                                        {product.description || 'CHEF\'S SPECIAL CURATED RECIPE. CALL STORE FOR DETAIL.'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-5 pt-0 flex gap-2">
                                    <Button asChild variant="outline" size="sm" className="flex-1 font-black text-[10px] uppercase italic border-[#EE1922]/20 hover:bg-[#EE1922]/5 hover:text-[#EE1922] transition-all">
                                        <Link href={`/products/${product.id}/edit`}>
                                            <Edit className="mr-2 size-3" /> MODIFY
                                        </Link>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground group-hover:text-[#EE1922] transition-colors">
                                                <MoreVertical className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 font-bold italic uppercase tracking-tighter">
                                            <DropdownMenuLabel className="text-[10px] text-muted-foreground">Selection Control</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                variant="destructive"
                                                onClick={() => {
                                                    if (confirm('Permanently remove this recipe from selection?')) {
                                                        router.delete(`/products/${product.id}`);
                                                    }
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <Trash2 className="mr-2 size-4" /> Terminate Recipe
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center border-2 border-dashed rounded-2xl border-[#EE1922]/20 bg-[#EE1922]/5">
                            <Pizza className="mx-auto size-20 text-[#EE1922]/20 mb-6 animate-pulse" />
                            <h3 className="text-2xl font-black italic uppercase text-[#EE1922] mb-2 tracking-widest">Selection Empty</h3>
                            <p className="text-muted-foreground text-xs font-black uppercase tracking-widest">Standing by for menu intake. No recipes found in current sector.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
