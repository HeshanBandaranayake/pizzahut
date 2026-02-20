import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Pizza, Timer, ShoppingBag, ArrowUpRight, TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { cn } from "@/lib/utils";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Props {
    stats: {
        totalRevenue: number;
        activeOrders: number;
        avgPrepTime: string;
        staffCount: number;
    };
    staffRoles: Record<string, number>;
    recentOrders: Array<{
        id: number;
        customer: {
            name: string;
        };
        total_amount: string;
        status: string;
        created_at: string;
        order_items: Array<{
            quantity: number;
            product: {
                name: string;
            };
        }>;
    }>;
}

export default function Dashboard({ stats, staffRoles = {}, recentOrders = [] }: Props) {
    const { auth } = usePage().props as any;
    const userRole = (auth.user?.role || 'Staff').toLowerCase();

    const isAuthorized = (roles: string[]) => roles.map(r => r.toLowerCase()).includes(userRole);

    const metrics = [
        {
            title: 'Total Revenue',
            value: `$${(stats?.totalRevenue ?? 0).toLocaleString()}`,
            icon: DollarSign,
            trend: '+5.2%',
            color: 'text-green-600',
        },
        {
            title: 'Active Orders',
            value: stats?.activeOrders?.toString() ?? '0',
            icon: Pizza,
            trend: 'Live',
            color: 'text-[#EE1922]',
        },
        {
            title: 'Avg. Prep Time',
            value: stats?.avgPrepTime ?? '14 min',
            icon: Timer,
            trend: '-1m',
            color: 'text-blue-600',
        },
        {
            title: 'Active Team',
            value: stats?.staffCount?.toString() ?? '0',
            icon: Users,
            trend: 'Direct',
            color: 'text-purple-600',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">RESTAURANT OVERVIEW</h2>
                        <p className="text-sm text-muted-foreground font-medium">Monitoring PizzaHut enterprise logistics in real-time.</p>
                    </div>
                    <Badge variant="outline" className="px-3 py-1 border-[#F8B803] text-[#b48602] font-bold">
                        STORE #1240 - OPEN
                    </Badge>
                </div>

                {/* Metrics Grid */}
                <div className="grid gap-4 md:grid-cols-4">
                    {metrics.map((metric) => (
                        <Card key={metric.title} className="border-sidebar-border/70 shadow-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <metric.icon className="size-12" />
                            </div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                    {metric.title}
                                </CardTitle>
                                <metric.icon className={cn("size-4", metric.color)} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-black">{metric.value}</div>
                                <p className="text-xs font-bold text-muted-foreground mt-1 flex items-center">
                                    <TrendingUp className="mr-1 size-3 text-green-500" />
                                    <span className="text-green-500 mr-1">{metric.trend}</span>
                                    vs last 24h
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Link href="/orders/create" className="group">
                        <Card className="border-sidebar-border/70 shadow-sm hover:border-[#EE1922] transition-colors overflow-hidden relative h-full">
                            <CardContent className="p-4 flex items-center gap-3">
                                <div className="p-2 bg-red-50 text-[#EE1922] rounded-lg group-hover:bg-[#EE1922] group-hover:text-white transition-colors">
                                    <ShoppingBag className="size-5" />
                                </div>
                                <div className="overflow-hidden">
                                    <div className="text-sm font-black uppercase italic tracking-tight truncate">New Order</div>
                                    <div className="text-[10px] text-muted-foreground font-medium uppercase truncate">Initiate Fulfillment</div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>

                    {isAuthorized(['Admin', 'Manager', 'Chef']) && (
                        <Link href="/products/create" className="group">
                            <Card className="border-sidebar-border/70 shadow-sm hover:border-[#F8B803] transition-colors overflow-hidden relative h-full">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <div className="p-2 bg-yellow-50 text-[#F8B803] rounded-lg group-hover:bg-[#F8B803] group-hover:text-white transition-colors">
                                        <Pizza className="size-5" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="text-sm font-black uppercase italic tracking-tight truncate">Add Pizza</div>
                                        <div className="text-[10px] text-muted-foreground font-medium uppercase truncate">Update Menu</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )}

                    {isAuthorized(['Admin', 'Manager', 'Receptionist']) && (
                        <Link href="/customers/create" className="group">
                            <Card className="border-sidebar-border/70 shadow-sm hover:border-blue-500 transition-colors overflow-hidden relative h-full">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-500 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <Users className="size-5" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="text-sm font-black uppercase italic tracking-tight truncate">Register Guest</div>
                                        <div className="text-[10px] text-muted-foreground font-medium uppercase truncate">Loyalty Base</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )}

                    {isAuthorized(['Admin']) && (
                        <Link href="/staff/create" className="group">
                            <Card className="border-sidebar-border/70 shadow-sm hover:border-purple-500 transition-colors overflow-hidden relative h-full">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 text-purple-500 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                        <ShieldCheck className="size-5" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="text-sm font-black uppercase italic tracking-tight truncate">Add Member</div>
                                        <div className="text-[10px] text-muted-foreground font-medium uppercase truncate">Provision Access</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )}
                </div>

                {/* Recent Orders Section */}
                <Card className="border-sidebar-border/70 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div className="grid gap-1">
                            <CardTitle className="text-lg font-black italic text-[#EE1922]">RECENT ORDERS</CardTitle>
                            <CardDescription className="font-medium text-xs">Live tracking of the latest orders in your district.</CardDescription>
                        </div>
                        <Badge className="bg-[#EE1922] font-bold uppercase tracking-tighter">LIVE FEED</Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-y bg-muted/50 text-left font-bold uppercase transition-colors hover:bg-muted/50">
                                        <th className="px-6 py-3 tracking-wider">Order ID</th>
                                        <th className="px-6 py-3 tracking-wider">Customer</th>
                                        <th className="px-6 py-3 tracking-wider">Items</th>
                                        <th className="px-6 py-3 tracking-wider text-center">Status</th>
                                        <th className="px-6 py-3 tracking-wider text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => {
                                        const itemSummary = order.order_items
                                            ?.map(item => `${item.quantity}x ${item.product?.name}`)
                                            .join(', ') || 'Standard Prep Intake';

                                        return (
                                            <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="px-6 py-4 font-black">#PH-{order.id.toString().padStart(4, '0')}</td>
                                                <td className="px-6 py-4 font-bold uppercase italic">{order.customer?.name || 'Guest'}</td>
                                                <td className="px-6 py-4 text-muted-foreground font-medium uppercase text-[10px] tracking-tighter truncate max-w-[200px]" title={itemSummary}>
                                                    {itemSummary}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <Badge
                                                        variant={order.status === 'Completed' ? 'default' : 'secondary'}
                                                        className={cn(
                                                            "font-bold uppercase text-[10px]",
                                                            order.status === 'Pending' && "bg-[#F8B803]/20 text-[#b48602] border-[#F8B803]/30",
                                                            order.status === 'Delivering' && "bg-blue-100 text-blue-700 border-blue-200",
                                                            order.status === 'Completed' && "bg-green-100 text-green-700 border-green-200"
                                                        )}
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right font-black text-[#EE1922]">${order.total_amount}</td>
                                            </tr>
                                        );
                                    })}
                                    {recentOrders.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center text-muted-foreground italic font-medium">
                                                No recent orders found. Systems are standing by.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Team Composition Section */}
                {isAuthorized(['Admin']) && (
                    <Card className="border-sidebar-border/70 shadow-sm col-span-full">
                        <CardHeader>
                            <CardTitle className="text-lg font-black italic text-[#EE1922]">TEAM COMPOSITION</CardTitle>
                            <CardDescription className="text-xs font-medium uppercase">Resource allocation across restaurant sectors.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {['Admin', 'Manager', 'Chef', 'Receptionist', 'Staff'].map(role => (
                                    <div key={role} className="flex flex-col items-center p-4 border border-muted/20 rounded-xl bg-muted/5">
                                        <div className={cn(
                                            "p-3 rounded-full mb-3",
                                            role === 'Chef' ? "bg-orange-100 text-orange-600" :
                                                role === 'Manager' ? "bg-blue-100 text-blue-600" :
                                                    role === 'Receptionist' ? "bg-purple-100 text-purple-600" :
                                                        role === 'Admin' ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-700"
                                        )}>
                                            {role === 'Chef' ? <Pizza className="size-5" /> :
                                                role === 'Admin' ? <ShieldCheck className="size-5" /> :
                                                    role === 'Manager' ? <ShieldCheck className="size-5" /> : <Users className="size-5" />}
                                        </div>
                                        <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">{role}s</div>
                                        <div className="text-2xl font-black">{staffRoles[role] || 0}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
