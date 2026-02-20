import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            tooltip={{ children: item.title }}
                            className={cn(
                                "transition-colors",
                                isCurrentUrl(item.href) && "bg-[#EE1922] text-white hover:bg-[#D0161D] hover:text-white dark:bg-[#EE1922] dark:text-white"
                            )}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon className={cn(isCurrentUrl(item.href) && "text-white")} />}
                                <span className={cn("font-bold italic uppercase tracking-tighter text-xs", isCurrentUrl(item.href) && "text-white")}>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
