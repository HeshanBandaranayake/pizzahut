import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Pizza, Timer, ShoppingBag, ArrowUpRight, TrendingUp, Users, ShieldCheck, Activity, Target, ChefHat, Shield, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Command Center',
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
            title: 'Gross Revenue',
            value: `Rs. ${(stats?.totalRevenue ?? 0).toLocaleString()}`,
            icon: DollarSign,
            trend: '+8.4%',
            color: 'text-[#22c55e]',
            bg: 'bg-[#22c55e]/5'
        },
        {
            title: 'Active Intake',
            value: stats?.activeOrders?.toString() ?? '0',
            icon: ShoppingBag,
            trend: 'Live Feed',
            color: 'text-[#EE1922]',
            bg: 'bg-[#EE1922]/5'
        },
        {
            title: 'Fulfillment Velocity',
            value: stats?.avgPrepTime ?? '14m',
            icon: Timer,
            trend: '-2m Optimized',
            color: 'text-[#F8B803]',
            bg: 'bg-[#F8B803]/5'
        },
        {
            title: 'Deployed Assets',
            value: stats?.staffCount?.toString() ?? '0',
            icon: Activity,
            trend: 'On Duty',
            color: 'text-blue-600',
            bg: 'bg-blue-600/5'
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Command Center" />
            <div className="flex h-full flex-1 flex-col gap-8 p-6 lg:p-10 bg-neutral-50/50 dark:bg-transparent">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black italic tracking-tighter text-[#EE1922]">COMMAND CENTER</h2>
                        <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest mt-1">Real-time enterprise logistics monitoring & fulfillment tracking.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge className="px-4 py-1.5 bg-[#EE1922] text-white font-black italic uppercase tracking-widest shadow-lg border-none animate-pulse">
                            SYSTEM STATUS: OPERATIONAL
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1.5 border-[#F8B803] text-[#b48602] font-black uppercase tracking-tighter bg-[#F8B803]/5">
                            LOC #1240
                        </Badge>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid gap-6 md:grid-cols-4">
                    {metrics.map((metric) => (
                        <Card key={metric.title} className="border-none shadow-xl overflow-hidden relative group hover:-translate-y-1 transition-all duration-300 dark:bg-[#161615]">
                            <div className={cn("absolute top-0 left-0 w-1 h-full", metric.color.replace('text-', 'bg-'))} />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                    {metric.title}
                                </CardTitle>
                                <div className={cn("p-2 rounded-lg transition-colors group-hover:scale-110 duration-300", metric.bg, metric.color)}>
                                    <metric.icon className="size-4" />
                                </div>
                            </CardHeader>
                            <CardContent className="pt-2">
                                <div className="text-3xl font-black italic tracking-tighter leading-none mb-2">{metric.value}</div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest py-0 px-1.5 border-none", metric.bg, metric.color)}>
                                        {metric.trend}
                                    </Badge>
                                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">REAL-TIME DATA</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions & Main Feed */}
                <div className="grid gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-12">
                        <div className="grid gap-4 md:grid-cols-4">
                            <Link href="/orders/create" className="group">
                                <Card className="border-none shadow-lg hover:shadow-2xl hover:bg-[#EE1922] transition-all duration-300 overflow-hidden relative h-full dark:bg-[#1c1c1a]">
                                    <CardContent className="p-5 flex items-center gap-4">
                                        <div className="p-3 bg-[#EE1922]/10 text-[#EE1922] rounded-xl group-hover:bg-white group-hover:text-[#EE1922] transition-colors shadow-inner">
                                            <ShoppingBag className="size-6" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="text-sm font-black uppercase italic tracking-tighter truncate group-hover:text-white">New Intake</div>
                                            <div className="text-[9px] text-muted-foreground font-black uppercase tracking-widest truncate group-hover:text-white/80">Initiate Order</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            {isAuthorized(['Admin', 'Manager', 'Chef']) && (
                                <Link href="/products/create" className="group">
                                    <Card className="border-none shadow-lg hover:shadow-2xl hover:bg-[#F8B803] transition-all duration-300 overflow-hidden relative h-full dark:bg-[#1c1c1a]">
                                        <CardContent className="p-5 flex items-center gap-4">
                                            <div className="p-3 bg-[#F8B803]/10 text-[#F8B803] rounded-xl group-hover:bg-white group-hover:text-[#F8B803] transition-colors shadow-inner">
                                                <Pizza className="size-6" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <div className="text-sm font-black uppercase italic tracking-tighter truncate group-hover:text-black">Update Menu</div>
                                                <div className="text-[9px] text-muted-foreground font-black uppercase tracking-widest truncate group-hover:text-black/80">Add Variant</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )}

                            {isAuthorized(['Admin', 'Manager', 'Receptionist']) && (
                                <Link href="/customers/create" className="group">
                                    <Card className="border-none shadow-lg hover:shadow-2xl hover:bg-black transition-all duration-300 overflow-hidden relative h-full dark:bg-[#1c1c1a] dark:hover:bg-white">
                                        <CardContent className="p-5 flex items-center gap-4">
                                            <div className="p-3 bg-neutral-100 text-black rounded-xl group-hover:bg-white group-hover:text-black transition-colors shadow-inner dark:bg-neutral-800 dark:text-white">
                                                <Users className="size-6" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <div className="text-sm font-black uppercase italic tracking-tighter truncate group-hover:text-white dark:group-hover:text-black">Guest Entry</div>
                                                <div className="text-[9px] text-muted-foreground font-black uppercase tracking-widest truncate group-hover:text-white/80 dark:group-hover:text-black/60">Loyalty Sync</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )}

                            {isAuthorized(['Admin']) && (
                                <Link href="/staff/create" className="group">
                                    <Card className="border-none shadow-lg hover:shadow-2xl hover:bg-blue-600 transition-all duration-300 overflow-hidden relative h-full dark:bg-[#1c1c1a]">
                                        <CardContent className="p-5 flex items-center gap-4">
                                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-white group-hover:text-blue-600 transition-colors shadow-inner">
                                                <ShieldCheck className="size-6" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <div className="text-sm font-black uppercase italic tracking-tighter truncate group-hover:text-white">Recruit</div>
                                                <div className="text-[9px] text-muted-foreground font-black uppercase tracking-widest truncate group-hover:text-white/80">Provision User</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <Card className="border-none shadow-2xl overflow-hidden dark:bg-[#161615]">
                            <CardHeader className="bg-neutral-900 border-b border-white/5 py-4 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#EE1922] text-white rounded-lg">
                                        <Activity className="size-4" />
                                    </div>
                                    <CardTitle className="text-sm font-black italic uppercase tracking-widest text-white">Live Intake Feed</CardTitle>
                                </div>
                                <Badge className="bg-[#EE1922] font-black italic text-[9px] tracking-widest px-3 py-1 animate-pulse">SYNCING</Badge>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b bg-muted/30 text-left font-black uppercase text-[10px] tracking-widest text-muted-foreground">
                                                <th className="px-6 py-4">Fulfillment ID</th>
                                                <th className="px-6 py-4">Client Detail</th>
                                                <th className="px-6 py-4 text-center">Status</th>
                                                <th className="px-6 py-4 text-right">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentOrders.map((order) => {
                                                const itemSummary = order.order_items
                                                    ?.map(item => `${item.quantity}x ${item.product?.name}`)
                                                    .join(', ') || 'Standard Prep Intake';

                                                return (
                                                    <tr key={order.id} className="border-b transition-colors hover:bg-muted/10 last:border-0 group">
                                                        <td className="px-6 py-4 font-black text-[#EE1922]">#PH-{order.id.toString().padStart(4, '0')}</td>
                                                        <td className="px-6 py-4">
                                                            <div className="font-bold uppercase italic leading-none mb-1">{order.customer?.name || 'Guest User'}</div>
                                                            <div className="text-[9px] text-muted-foreground font-black uppercase tracking-tighter truncate max-w-[200px]" title={itemSummary}>
                                                                {itemSummary}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <Badge
                                                                variant={order.status === 'Completed' ? 'default' : 'secondary'}
                                                                className={cn(
                                                                    "font-black uppercase text-[9px] tracking-widest px-2 py-0 border-none",
                                                                    order.status === 'Pending' && "bg-[#F8B803]/10 text-[#b48602]",
                                                                    order.status === 'Delivering' && "bg-blue-100/10 text-blue-500",
                                                                    order.status === 'Completed' && "bg-green-500/10 text-green-500"
                                                                )}
                                                            >
                                                                {order.status}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4 text-right font-black text-[#EE1922] tracking-tighter">Rs. {parseFloat(order.total_amount).toFixed(2)}</td>
                                                    </tr>
                                                );
                                            })}
                                            {recentOrders.length === 0 && (
                                                <tr>
                                                    <td colSpan={4} className="py-20 text-center">
                                                        <Activity className="mx-auto size-12 text-muted-foreground/20 mb-4" />
                                                        <h3 className="text-lg font-black italic uppercase text-muted-foreground">No Active Signals</h3>
                                                        <p className="text-muted-foreground text-xs font-black uppercase tracking-widest mt-1">Systems clear. Monitoring secure channels.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-4">
                        {isAuthorized(['Admin']) && (
                            <Card className="border-none shadow-2xl overflow-hidden h-full dark:bg-[#161615]">
                                <CardHeader className="bg-neutral-900 border-b border-white/5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#F8B803] text-black rounded-lg">
                                            <Target className="size-4" />
                                        </div>
                                        <CardTitle className="text-sm font-black italic uppercase tracking-widest text-white">Asset Deployment</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {['Admin', 'Manager', 'Chef', 'Receptionist', 'Staff'].map(role => (
                                            <div key={role} className="flex items-center justify-between p-3 border border-muted/10 rounded-xl bg-muted/5 group hover:bg-[#EE1922]/5 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "p-2 rounded-full",
                                                        role === 'Chef' ? "bg-orange-100 text-orange-600" :
                                                            role === 'Manager' ? "bg-blue-100 text-blue-600" :
                                                                role === 'Receptionist' ? "bg-purple-100 text-purple-600" :
                                                                    role === 'Admin' ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-700"
                                                    )}>
                                                        {role === 'Chef' ? <ChefHat className="size-3" /> :
                                                            role === 'Admin' ? <ShieldCheck className="size-3" /> :
                                                                role === 'Manager' ? <Shield className="size-3" /> :
                                                                    role === 'Receptionist' ? <UserCircle className="size-3" /> : <Users className="size-3" />}
                                                    </div>
                                                    <span className="text-xs font-black uppercase tracking-widest italic">{role} Network</span>
                                                </div>
                                                <div className="text-xl font-black italic">{staffRoles[role] || 0}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <Button className="w-full mt-6 bg-[#EE1922] hover:bg-[#d1171d] font-black italic uppercase tracking-[0.2em] text-[10px] py-6 shadow-xl">
                                        OPTIMIZE ALLOCATION
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
