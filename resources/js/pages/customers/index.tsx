import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Phone, Mail, MapPin, MoreHorizontal, UserPlus, Edit, Trash2, Search, Heart } from 'lucide-react';
import { useInitials } from '@/hooks/use-initials';
import { cn } from "@/lib/utils";
import { useState } from 'react';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
}

interface Props {
    customers: Customer[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customer Directory',
        href: '/customers',
    },
];

export default function Index({ customers = [] }: Props) {
    const getInitials = useInitials();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCustomers = customers.filter((customer: Customer) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            customer.name.toLowerCase().includes(searchLower) ||
            customer.email.toLowerCase().includes(searchLower) ||
            (customer.phone || '').toLowerCase().includes(searchLower) ||
            (customer.city || '').toLowerCase().includes(searchLower)
        );
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Guest Directory" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">GUEST DIRECTORY</h2>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-tighter">Manage your district's loyal pizza enthusiasts.</p>
                    </div>
                    <Button asChild className="bg-[#EE1922] hover:bg-[#d1171d] font-bold italic uppercase tracking-tighter shadow-md">
                        <Link href="/customers/create">
                            <UserPlus className="mr-2 size-4" /> Register New Guest
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="SEARCH GUESTS BY NAME OR EMAIL..."
                            className="pl-9 font-bold italic uppercase tracking-tighter text-xs h-10 border-muted-foreground/20 bg-muted/20 focus:bg-background transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <Card className="border-none shadow-xl overflow-hidden dark:bg-[#161615]">
                    <CardHeader className="bg-[#F8B803]/10 border-b border-[#F8B803]/20 py-4 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-[#F8B803] text-black rounded-lg">
                                <Users className="size-4" />
                            </div>
                            <CardTitle className="text-sm font-black italic uppercase tracking-widest text-[#b48602]">Loyalty Base</CardTitle>
                        </div>
                        <Badge className="bg-[#F8B803] text-black font-bold text-[10px]">{filteredCustomers.length} MEMBERS</Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/30 text-left font-black uppercase text-[10px] tracking-widest text-muted-foreground">
                                        <th className="px-6 py-4">Familiar Name</th>
                                        <th className="px-6 py-4">Direct Contact</th>
                                        <th className="px-6 py-4">District / Area</th>
                                        <th className="px-6 py-4 text-center">Engagement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.length > 0 ? (
                                        filteredCustomers.map((customer: Customer) => (
                                            <tr key={customer.id} className="border-b transition-colors hover:bg-muted/10 last:border-0 group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="size-10 rounded-full border-2 border-[#EE1922]/20">
                                                            <AvatarFallback className="bg-[#EE1922]/5 text-[#EE1922] font-black text-xs">
                                                                {getInitials(customer.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="grid gap-0.5">
                                                            <span className="font-black text-sm uppercase italic leading-none">{customer.name}</span>
                                                            <span className="text-[9px] text-[#EE1922] font-black tracking-widest uppercase">VIP MEMBER</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs">
                                                            <Mail className="size-3 text-[#EE1922]" />
                                                            {customer.email}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs">
                                                            <Phone className="size-3 text-[#EE1922]" />
                                                            {customer.phone || 'NO SECURE LINE'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2 font-bold text-[10px] uppercase text-muted-foreground">
                                                        <MapPin className="size-3 text-[#F8B803]" />
                                                        {customer.address ? `${customer.address}, ${customer.city || 'NY'}` : 'PICKUP ONLY'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-[#EE1922] transition-colors">
                                                                <MoreHorizontal className="size-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-56 font-bold italic uppercase tracking-tighter">
                                                            <DropdownMenuLabel className="text-[10px] text-muted-foreground">Member Operations</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem asChild className="cursor-pointer">
                                                                <Link href={`/customers/${customer.id}/edit`}>
                                                                    <Edit className="mr-2 size-4" /> Adjust Profile
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                variant="destructive"
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    if (confirm('Permanently remove this loyalty profile?')) {
                                                                        router.delete(`/customers/${customer.id}`);
                                                                    }
                                                                }}
                                                            >
                                                                <Trash2 className="mr-2 size-4" /> Decommission Guest
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="py-20 text-center">
                                                <Users className="mx-auto size-12 text-muted-foreground/20 mb-4" />
                                                <h3 className="text-lg font-black italic uppercase text-[#EE1922]">Zero Guests Found</h3>
                                                <p className="text-muted-foreground text-xs font-medium uppercase tracking-tighter italic">Broaden your search terms or verify the database.</p>
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
