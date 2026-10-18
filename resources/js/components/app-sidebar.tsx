import { Link } from '@inertiajs/react';
import { Book, BookCheck, BookOpen, Building, FolderGit2, LayoutGrid, Tags, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import categories, { index } from '@/routes/categories';
import author from '@/routes/authors'
import publisher, {} from '@/routes/publishers'
import books from '@/routes/books';
import students from '@/routes/students';
import borrowings from '@/routes/borrowings';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Categories',
        href: categories.index(),
        icon: Tags
    },
    {
        title: 'Authors',
        href: author.index(),
        icon: Users
    },
    {
        title: 'Publishers',
        href: publisher.index(),
        icon: Building
    },
    {
        title: 'Books',
        href: books.index(),
        icon: Book
    },
    {
        title: 'Students',
        href: students.index(),
        icon: Users
    },
    {
        title: 'Borrowings',
        'href': borrowings.index(),
        icon: BookCheck
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
