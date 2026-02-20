import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Users, Mail, ShieldCheck, MoreHorizontal, UserPlus, Edit, Trash2, Shield, ChefHat, UserCircle } from 'lucide-react';
import { useInitials } from '@/hooks/use-initials';
import { cn } from "@/lib/utils";

interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    members: Member[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Staff Management', href: '/staff' },
];

export default function Index({ members = [] }: Props) {
    const getInitials = useInitials();

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staff Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">STAFF DIRECTORY</h2>
                        <p className="text-sm text-muted-foreground font-medium italic uppercase tracking-tighter">Manage your restaurant's elite team</p>
                    </div>
                    <Button asChild className="bg-[#EE1922] hover:bg-[#d1171d] font-bold italic uppercase tracking-tighter shadow-md">
                        <Link href="/staff/create">
                            <UserPlus className="mr-2 size-4" /> Add Team Member
                        </Link>
                    </Button>
                </div>

                <Card className="border-sidebar-border/70 shadow-sm overflow-hidden">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/30 text-left font-bold uppercase transition-colors hover:bg-muted/30">
                                        <th className="px-6 py-4 tracking-wider">Team Member</th>
                                        <th className="px-6 py-4 tracking-wider">Contact Email</th>
                                        <th className="px-6 py-4 tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {members.length > 0 ? (
                                        members.map((member) => (
                                            <tr key={member.id} className="border-b transition-colors hover:bg-muted/50 group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="size-9 rounded-full border-2 border-primary/10">
                                                            <AvatarFallback className="bg-neutral-100 text-neutral-800 font-bold text-xs">
                                                                {getInitials(member.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="grid gap-0.5">
                                                            <span className="font-black text-sm uppercase italic">{member.name}</span>
                                                            <Badge variant="outline" className={cn(
                                                                "w-fit font-bold uppercase text-[9px] py-0 px-1.5",
                                                                getRoleColor(member.role)
                                                            )}>
                                                                <span className="mr-1">{getRoleIcon(member.role)}</span>
                                                                {member.role}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-muted-foreground font-medium">
                                                        <Mail className="size-3 text-[#EE1922]" />
                                                        {member.email}
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
                                                            <DropdownMenuLabel className="text-[10px] text-muted-foreground">Staff Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem asChild className="cursor-pointer">
                                                                <Link href={`/staff/${member.id}/edit`}>
                                                                    <Edit className="mr-2 size-4" /> Edit Details
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                variant="destructive"
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    if (confirm('Are you sure you want to remove this staff member?')) {
                                                                        router.delete(`/staff/${member.id}`);
                                                                    }
                                                                }}
                                                            >
                                                                <Trash2 className="mr-2 size-4" /> Remove Access
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="py-20 text-center">
                                                <Users className="mx-auto size-12 text-muted-foreground/30 mb-4" />
                                                <h3 className="text-lg font-bold italic">No Staff Members Found</h3>
                                                <p className="text-muted-foreground text-sm font-medium italic">Your team will appear here once registered.</p>
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
