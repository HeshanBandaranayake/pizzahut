import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Phone, Mail, MapPin, MoreHorizontal, UserPlus, Edit, Trash2 } from 'lucide-react';
import { useInitials } from '@/hooks/use-initials';

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer Directory" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">CUSTOMER CRM</h2>
                        <p className="text-sm text-muted-foreground font-medium">Manage your district's loyal pizza enthusiasts.</p>
                    </div>
                    <Button asChild className="bg-[#EE1922] hover:bg-[#d1171d] font-bold italic uppercase tracking-tighter shadow-md">
                        <Link href="/customers/create">
                            <UserPlus className="mr-2 size-4" /> Register Guest
                        </Link>
                    </Button>
                </div>

                <Card className="border-sidebar-border/70 shadow-sm overflow-hidden">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/30 text-left font-bold uppercase transition-colors hover:bg-muted/30">
                                        <th className="px-6 py-4 tracking-wider">Customer</th>
                                        <th className="px-6 py-4 tracking-wider">Contact Info</th>
                                        <th className="px-6 py-4 tracking-wider">Location</th>
                                        <th className="px-6 py-4 tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.length > 0 ? (
                                        customers.map((customer) => (
                                            <tr key={customer.id} className="border-b transition-colors hover:bg-muted/50 group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="size-9 rounded-full border-2 border-primary/10">
                                                            <AvatarFallback className="bg-neutral-100 text-neutral-800 font-bold text-xs">
                                                                {getInitials(customer.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="grid gap-0.5">
                                                            <span className="font-black text-sm uppercase italic">{customer.name}</span>
                                                            <span className="text-[10px] text-[#EE1922] font-bold">VIP LOYALTY MEMBER</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2 text-muted-foreground font-medium">
                                                            <Mail className="size-3 text-[#EE1922]" />
                                                            {customer.email}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-muted-foreground font-medium">
                                                            <Phone className="size-3 text-[#EE1922]" />
                                                            {customer.phone || 'N/A'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2 font-bold text-xs uppercase text-muted-foreground">
                                                        <MapPin className="size-3 text-[#F8B803]" />
                                                        {customer.address ? `${customer.address}, ${customer.city || 'NY'}` : 'Remote Pickup'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreHorizontal className="size-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-48 font-bold italic uppercase tracking-tighter">
                                                            <DropdownMenuLabel className="text-[10px] text-muted-foreground">Guest Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem asChild className="cursor-pointer">
                                                                <Link href={`/customers/${customer.id}/edit`}>
                                                                    <Edit className="mr-2 size-4" /> Edit Profile
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                variant="destructive"
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    if (confirm('Are you sure you want to remove this guest profile?')) {
                                                                        router.delete(`/customers/${customer.id}`);
                                                                    }
                                                                }}
                                                            >
                                                                <Trash2 className="mr-2 size-4" /> Remove Guest
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="py-20 text-center">
                                                <Users className="mx-auto size-12 text-muted-foreground/30 mb-4" />
                                                <h3 className="text-lg font-bold italic">No Customers Registered</h3>
                                                <p className="text-muted-foreground text-sm font-medium italic">Start building your database by registering a new user.</p>
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
