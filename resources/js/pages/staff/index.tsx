import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Users, Mail, ShieldCheck, MoreHorizontal, UserPlus, Edit, Trash2, Shield, ChefHat, UserCircle, Search, Activity } from 'lucide-react';
import { useInitials } from '@/hooks/use-initials';
import { cn } from "@/lib/utils";
import { useState } from 'react';

interface StaffMember {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    members: StaffMember[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Staff Operatives', href: '/staff' },
];

export default function Index({ members = [] }: Props) {
    const getInitials = useInitials();
    const [searchQuery, setSearchQuery] = useState('');

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'Admin': return <ShieldCheck className="size-3" />;
            case 'Manager': return <Shield className="size-3" />;
            case 'Chef': return <ChefHat className="size-3" />;
            case 'Receptionist': return <UserCircle className="size-3" />;
            default: return <Users className="size-3" />;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'Admin': return "bg-red-100 text-red-700 border-red-200";
            case 'Manager': return "bg-blue-100 text-blue-700 border-blue-200";
            case 'Chef': return "bg-orange-100 text-orange-700 border-orange-200";
            case 'Receptionist': return "bg-purple-100 text-purple-700 border-purple-200";
            default: return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    const filteredMembers = members.filter((member: StaffMember) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            member.name.toLowerCase().includes(searchLower) ||
            member.email.toLowerCase().includes(searchLower) ||
            member.role.toLowerCase().includes(searchLower)
        );
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staff Operatives" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">STAFF OPERATIVES</h2>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-tighter">Coordinate your kitchen and delivery frontliners.</p>
                    </div>
                    <Button asChild className="bg-[#EE1922] hover:bg-[#d1171d] font-bold italic uppercase tracking-tighter shadow-md px-6">
                        <Link href="/staff/create">
                            <UserPlus className="mr-2 size-4" /> Recruit New Operative
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                            placeholder="SEARCH OPERATIVES BY NAME OR ROLE..."
                            className="pl-9 font-bold italic uppercase tracking-tighter text-xs h-10 border-muted-foreground/20 bg-muted/20 focus:bg-background transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <Card className="border-none shadow-xl overflow-hidden dark:bg-[#161615]">
                    <CardHeader className="bg-[#EE1922]/5 border-b border-[#EE1922]/10 py-4 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-[#EE1922] text-white rounded-lg">
                                <Activity className="size-4" />
                            </div>
                            <CardTitle className="text-sm font-black italic uppercase tracking-widest text-[#EE1922]">Active Command</CardTitle>
                        </div>
                        <Badge className="bg-[#EE1922] text-white font-bold text-[10px]">{filteredMembers.length} ACTIVE</Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/30 text-left font-black uppercase text-[10px] tracking-widest text-muted-foreground">
                                        <th className="px-6 py-4">Field Operative</th>
                                        <th className="px-6 py-4">Secure Channel</th>
                                        <th className="px-6 py-4 text-center">Protocol Access</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMembers.length > 0 ? (
                                        filteredMembers.map((member: StaffMember) => (
                                            <tr key={member.id} className="border-b transition-colors hover:bg-muted/10 last:border-0 group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="size-10 rounded-full border-2 border-[#EE1922]/20">
                                                            <AvatarFallback className="bg-[#EE1922]/5 text-[#EE1922] font-black text-xs">
                                                                {getInitials(member.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="grid gap-0.5">
                                                            <div className="flex items-center gap-2 leading-none mb-1">
                                                                <span className="font-black text-sm uppercase italic">{member.name}</span>
                                                                <Badge variant="outline" className="font-black uppercase text-[8px] h-4 px-1.5 border-[#EE1922]/30 bg-[#EE1922]/5 text-[#EE1922]">
                                                                    {member.role}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-[9px] text-[#22c55e] font-black uppercase tracking-widest">
                                                                <ShieldCheck className="size-3" />
                                                                DUTY STATUS: ACTIVE
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs">
                                                        <Mail className="size-3 text-[#EE1922]" />
                                                        {member.email}
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
                                                            <DropdownMenuLabel className="text-[10px] text-muted-foreground">Operative Controls</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem asChild className="cursor-pointer">
                                                                <Link href={`/staff/${member.id}/edit`}>
                                                                    <Edit className="mr-2 size-4" /> Adjust Profile
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                variant="destructive"
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    if (confirm('Permanently dismiss this operative from service?')) {
                                                                        router.delete(`/staff/${member.id}`);
                                                                    }
                                                                }}
                                                            >
                                                                <Trash2 className="mr-2 size-4" /> Decommission Member
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="py-20 text-center">
                                                <Users className="mx-auto size-12 text-muted-foreground/20 mb-4" />
                                                <h3 className="text-lg font-black italic uppercase text-[#EE1922]">No Team Found</h3>
                                                <p className="text-muted-foreground text-xs font-medium uppercase tracking-tighter italic">Broaden your criteria or verify team deployment.</p>
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
