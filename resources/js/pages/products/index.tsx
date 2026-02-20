import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, NavItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Pizza, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { cn } from "@/lib/utils";

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
        title: 'Menu Management',
        href: '/products',
    },
];

export default function Index({ products = [] }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">PIZZA MENU</h2>
                        <p className="text-sm text-muted-foreground font-medium">Manage your restaurant offerings and pricing.</p>
                    </div>
                    <Button asChild className="bg-[#EE1922] hover:bg-[#d1171d] font-bold italic uppercase tracking-tighter shadow-md">
                        <Link href="/products/create">
                            <Plus className="mr-2 size-4" /> Add New Pizza
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Card key={product.id} className="overflow-hidden border-sidebar-border/70 shadow-sm group hover:shadow-md transition-shadow">
                                <div className="aspect-video bg-muted flex items-center justify-center relative">
                                    <Pizza className="size-12 text-[#EE1922]/20 group-hover:scale-110 transition-transform duration-300" />
                                    <Badge className={cn(
                                        "absolute top-3 right-3 font-bold uppercase text-[10px]",
                                        product.is_available ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
                                    )}>
                                        {product.is_available ? 'Available' : 'Sold Out'}
                                    </Badge>
                                </div>
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg font-black italic leading-tight">{product.name}</CardTitle>
                                        <span className="text-lg font-black text-[#EE1922]">${product.price}</span>
                                    </div>
                                    <CardDescription className="line-clamp-2 text-xs font-medium mt-1">
                                        {product.description || 'No description provided.'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 flex gap-2 mt-2">
                                    <Button asChild variant="outline" size="sm" className="flex-1 font-bold text-xs uppercase italic border-muted-foreground/20">
                                        <Link href={`/products/${product.id}/edit`}>
                                            <Edit className="mr-1 size-3" /> Edit
                                        </Link>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                                <MoreVertical className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 font-bold italic uppercase tracking-tighter">
                                            <DropdownMenuLabel className="text-[10px] text-muted-foreground">Product Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                variant="destructive"
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to remove this pizza?')) {
                                                        router.delete(`/products/${product.id}`);
                                                    }
                                                }}
                                                className="cursor-pointer"
                                            >
                                                <Trash2 className="mr-2 size-4" /> Delete Pizza
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl border-muted-foreground/20">
                            <Pizza className="mx-auto size-12 text-muted-foreground/30 mb-4" />
                            <h3 className="text-lg font-bold italic">No Pizzas Found</h3>
                            <p className="text-muted-foreground text-sm font-medium">Get started by adding your first signature pizza to the menu.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
