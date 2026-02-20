import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListOrdered, Plus, Search, Filter, MoreHorizontal, Edit, CheckCircle, Truck, XCircle, Utensils, ShoppingBag } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from "@/lib/utils";
import { useState } from 'react';

interface Order {
    id: number;
    customer: {
        name: string;
    };
    status: string;
    type: string;
    total_amount: string;
    created_at: string;
    pickup_time?: string;
    table_number?: string;
    order_items: Array<{
        quantity: number;
        size?: string;
        toppings?: string[];
        product: {
            name: string;
        };
    }>;
}

interface Props {
    orders: Order[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Order Logistics',
        href: '/orders',
    },
];

export default function Index({ orders = [] }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOrders = orders.filter((order: Order) => {
        const searchLower = searchQuery.toLowerCase();
        const orderId = `#ph-${order.id.toString().padStart(4, '0')}`;

        return (
            orderId.includes(searchLower) ||
            (order.customer?.name || 'Guest').toLowerCase().includes(searchLower) ||
            order.type.toLowerCase().includes(searchLower) ||
            order.status.toLowerCase().includes(searchLower)
        );
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Order Logistics" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">ORDER TRACKING</h2>
                        <p className="text-sm text-muted-foreground font-medium">Monitor and manage real-time pizza logistics.</p>
                    </div>
                    <Button asChild className="bg-[#EE1922] hover:bg-[#d1171d] font-bold italic uppercase tracking-tighter shadow-md">
                        <Link href="/orders/create">
                            <Plus className="mr-2 size-4" /> Place Order
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="font-bold text-xs uppercase italic border-muted-foreground/20">
                            <Filter className="mr-2 size-3" /> All Status
                        </Button>
                        <Button variant="outline" size="sm" className="font-bold text-xs uppercase italic border-muted-foreground/20">
                            Today's Orders
                        </Button>
                    </div>

                    <div className="relative w-full sm:w-64 ml-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="SEARCH ORDERS..."
                            className="pl-9 font-bold italic uppercase tracking-tighter text-xs h-9 border-muted-foreground/20 bg-muted/20 focus:bg-background transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <Card className="border-sidebar-border/70 shadow-sm overflow-hidden">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/30 text-left font-bold uppercase transition-colors hover:bg-muted/30">
                                        <th className="px-6 py-4 tracking-wider">Order ID</th>
                                        <th className="px-6 py-4 tracking-wider">Customer</th>
                                        <th className="px-6 py-4 tracking-wider text-center">Type</th>
                                        <th className="px-6 py-4 tracking-wider">Items</th>
                                        <th className="px-6 py-4 tracking-wider">Status</th>
                                        <th className="px-6 py-4 tracking-wider">Created</th>
                                        <th className="px-6 py-4 tracking-wider text-right">Total</th>
                                        <th className="px-6 py-4 tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order: Order) => {
                                            const itemSummary = order.order_items
                                                ?.map((item: any) => {
                                                    let desc = `${item.quantity}x ${item.product?.name}`;
                                                    if (item.size) desc += ` (${item.size})`;
                                                    if (item.toppings && item.toppings.length > 0) {
                                                        desc += ` + ${item.toppings.join(', ')}`;
                                                    }
                                                    return desc;
                                                })
                                                .join(' | ') || 'Standard Prep';

                                            return (
                                                <tr key={order.id} className="border-b transition-colors hover:bg-muted/50 group">
                                                    <td className="px-6 py-4">
                                                        <span className="font-black text-sm">#PH-{order.id.toString().padStart(4, '0')}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="font-bold text-sm uppercase italic">{order.customer?.name || 'Guest'}</span>
                                                            {order.type === 'Takeaway' && order.pickup_time && (
                                                                <span className="text-[10px] font-black text-orange-600 uppercase tracking-tighter">Pickup: {order.pickup_time}</span>
                                                            )}
                                                            {order.type === 'Dine-in' && order.table_number && (
                                                                <span className="text-[10px] font-black text-purple-600 uppercase tracking-tighter">Table: {order.table_number}</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <Badge
                                                            variant="outline"
                                                            className={cn(
                                                                "font-bold uppercase text-[9px] border-muted-foreground/30",
                                                                order.type === 'Dine-in' ? "text-purple-600 bg-purple-50" :
                                                                    order.type === 'Takeaway' ? "text-orange-600 bg-orange-50" :
                                                                        "text-blue-600 bg-blue-50"
                                                            )}
                                                        >
                                                            {order.type === 'Dine-in' ? (
                                                                <Utensils className="mr-1 size-3" />
                                                            ) : order.type === 'Takeaway' ? (
                                                                <ShoppingBag className="mr-1 size-3" />
                                                            ) : (
                                                                <Truck className="mr-1 size-3" />
                                                            )}
                                                            {order.type}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="grid gap-0.5">
                                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter truncate max-w-[250px]" title={itemSummary}>
                                                                {itemSummary}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge
                                                            variant={order.status === 'Completed' ? 'default' : 'secondary'}
                                                            className={cn(
                                                                "font-bold uppercase text-[10px]",
                                                                order.status === 'Pending' && "bg-[#F8B803]/20 text-[#b48602] border-[#F8B803]/30",
                                                                order.status === 'Delivering' && "bg-blue-100 text-blue-700 border-blue-200",
                                                                order.status === 'Completed' && "bg-green-100 text-green-700 border-green-200",
                                                                order.status === 'Cancelled' && "bg-red-100 text-red-700 border-red-200"
                                                            )}
                                                        >
                                                            {order.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase">
                                                        {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-black text-[#EE1922] whitespace-nowrap">
                                                        ${order.total_amount}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                                                    <MoreHorizontal className="size-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-48 font-bold italic uppercase tracking-tighter">
                                                                <DropdownMenuLabel className="text-[10px] text-muted-foreground">Order Operations</DropdownMenuLabel>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/orders/${order.id}/edit`} className="cursor-pointer">
                                                                        <Edit className="mr-2 size-4" /> Edit Order
                                                                    </Link>
                                                                </DropdownMenuItem>

                                                                {order.status === 'Pending' && (
                                                                    <DropdownMenuItem onClick={() => router.patch(`/orders/${order.id}`, { status: 'Delivering' })} className="text-blue-600 cursor-pointer">
                                                                        <Truck className="mr-2 size-4" /> Dispatch Delivery
                                                                    </DropdownMenuItem>
                                                                )}

                                                                {(order.status === 'Pending' || order.status === 'Delivering') && (
                                                                    <DropdownMenuItem onClick={() => router.patch(`/orders/${order.id}`, { status: 'Completed' })} className="text-green-600 cursor-pointer">
                                                                        <CheckCircle className="mr-2 size-4" /> Mark Completed
                                                                    </DropdownMenuItem>
                                                                )}

                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    variant="destructive"
                                                                    onClick={() => router.patch(`/orders/${order.id}`, { status: 'Cancelled' })}
                                                                    className="cursor-pointer"
                                                                >
                                                                    <XCircle className="mr-2 size-4" /> Cancel Order
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="py-20 text-center">
                                                <ListOrdered className="mx-auto size-12 text-muted-foreground/30 mb-4" />
                                                <h3 className="text-lg font-bold italic">No Orders Match Search</h3>
                                                <p className="text-muted-foreground text-sm font-medium italic">Try adjusting your terms or browse the full database.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
