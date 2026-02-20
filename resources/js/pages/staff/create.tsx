import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, ArrowLeft, Mail, ShieldCheck, KeyRound, UserPlus } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Staff', href: '/staff' },
    { title: 'Add Member', href: '/staff/create' },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'Staff',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/staff');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Team Member" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href="/staff">
                            <ArrowLeft className="size-5" />
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-[#EE1922]">ADD TEAM MEMBER</h2>
                        <p className="text-sm text-muted-foreground font-medium italic uppercase tracking-tighter">Expand your restaurant squad</p>
                    </div>
                </div>

                <form onSubmit={submit} className="grid gap-6">
                    <Card className="border-sidebar-border/70 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-black italic uppercase tracking-widest text-muted-foreground">Account Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="font-bold uppercase text-[10px] tracking-widest">Full Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Master Chef Tony"
                                    className="h-11 font-bold border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                />
                                {errors.name && <p className="text-xs text-red-500 font-bold italic">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="font-bold uppercase text-[10px] tracking-widest">Work Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="tony@pizzahut.com"
                                            className="h-11 pl-10 font-bold border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-red-500 font-bold italic">{errors.email}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="role" className="font-bold uppercase text-[10px] tracking-widest text-[#EE1922]">Assigned Role</Label>
                                    <Select defaultValue={data.role} onValueChange={(value) => setData('role', value)}>
                                        <SelectTrigger className="h-11 font-bold border-muted-foreground/20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Admin" className="font-bold text-red-600">Admin</SelectItem>
                                            <SelectItem value="Manager" className="font-bold text-blue-600">Manager</SelectItem>
                                            <SelectItem value="Chef" className="font-bold text-orange-600">Chef</SelectItem>
                                            <SelectItem value="Receptionist" className="font-bold text-purple-600">Receptionist</SelectItem>
                                            <SelectItem value="Staff" className="font-bold text-slate-600">General Staff</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.role && <p className="text-xs text-red-500 font-bold italic">{errors.role}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="font-bold uppercase text-[10px] tracking-widest">Initial Password</Label>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="h-11 pl-10 font-bold border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                        />
                                    </div>
                                    {errors.password && <p className="text-xs text-red-500 font-bold italic">{errors.password}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="font-bold uppercase text-[10px] tracking-widest">Confirm Password</Label>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/50" />
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="h-11 pl-10 font-bold border-muted-foreground/20 focus-visible:ring-[#EE1922]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button
                        disabled={processing}
                        className="h-14 bg-[#EE1922] hover:bg-[#d1171d] text-white font-black italic uppercase tracking-tight text-lg shadow-lg shadow-red-200"
                    >
                        <UserPlus className="mr-3 size-6" /> Add Team Member
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
