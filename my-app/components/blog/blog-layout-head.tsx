"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, FolderOpen, Tag, Archive, User, MessageSquare, ExternalLink, Search, Menu, X, MoreHorizontal } from 'lucide-react';

import {signOut, useSession} from "next-auth/react"
import { useRouter } from "next/navigation"


export default function BlogLayoutHead() {
    const { data: session } = useSession()
    const [headerVisible, setHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter()

    const handleLogout = async () => {
        await signOut({ redirect: false })
        router.push('/' );
        router.refresh();
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 100) {
                setHeaderVisible(true);
            } else {
                if (currentScrollY > lastScrollY) {
                    setHeaderVisible(false);
                } else {
                    setHeaderVisible(true);
                }
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const navigationItems = [
        { href: '/', label: '首页', icon: Home },
        { href: '/categories', label: '分类', icon: FolderOpen },
        { href: '/tags', label: '标签', icon: Tag },
        { href: '/archives', label: '归档', icon: Archive },
        { href: '/about', label: '关于', icon: User },
        { href: '/guestbook', label: '留言', icon: MessageSquare },
        { href: '/links', label: '友链', icon: ExternalLink },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search:', searchQuery);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E9EE] transition-transform duration-300 ${
                headerVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center h-full space-x-8">
                        <Link href="/" className="flex items-center h-full group">
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 drop-shadow-sm">
                                MyX Ideal Blog
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <NavigationMenu className="hidden md:flex h-full">
                            <NavigationMenuList className="h-full">
                                {/* 始终显示的前3个导航项 */}
                                {navigationItems.slice(0, 3).map((item) => (
                                    <NavigationMenuItem key={item.href} className="h-full flex items-center">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={item.href}
                                                className={`group inline-flex items-center justify-center rounded-md bg-background px-4 py-2 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${
                                                    pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-[#34495e]'
                                                }`}
                                                style={{ fontSize: '0.7rem' }}
                                            >
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}

                                {/* 在大屏幕(lg)上显示第4-5个导航项 */}
                                <div className="hidden lg:contents">
                                    {navigationItems.slice(3, 5).map((item) => (
                                        <NavigationMenuItem key={item.href} className="h-full flex items-center">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={item.href}
                                                    className={`group inline-flex items-center justify-center rounded-md bg-background px-4 py-2 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${
                                                        pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-[#34495e]'
                                                    }`}
                                                    style={{ fontSize: '0.7rem' }}
                                                >
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                    {item.label}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </div>

                                {/* 在超大屏幕(xl)上显示第6-7个导航项 */}
                                <div className="hidden xl:contents">
                                    {navigationItems.slice(5, 7).map((item) => (
                                        <NavigationMenuItem key={item.href} className="h-full flex items-center">
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href={item.href}
                                                    className={`group inline-flex items-center justify-center rounded-md bg-background px-4 py-2 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${
                                                        pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-[#34495e]'
                                                    }`}
                                                    style={{ fontSize: '0.7rem' }}
                                                >
                                                    <item.icon className="mr-2 h-4 w-4" />
                                                    {item.label}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </div>

                                {/* 省略号菜单 - 在小屏幕显示第4-7项，中屏显示第6-7项 */}
                                <NavigationMenuItem className="h-full flex items-center xl:hidden">
                                    <DropdownMenu modal={false}>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-auto px-4 py-2">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="w-48">
                                            {/* 在 md-lg 屏幕显示第4-7项 */}
                                            <div className="lg:hidden">
                                                {navigationItems.slice(3, 7).map((item) => (
                                                    <DropdownMenuItem key={item.href} asChild>
                                                        <Link
                                                            href={item.href}
                                                            className={`flex items-center cursor-pointer ${
                                                                pathname === item.href ? 'bg-blue-50 text-blue-600' : ''
                                                            }`}
                                                        >
                                                            <item.icon className="mr-2 h-4 w-4" />
                                                            {item.label}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </div>

                                            {/* 在 lg-xl 屏幕只显示第6-7项 */}
                                            <div className="hidden lg:block xl:hidden">
                                                {navigationItems.slice(5, 7).map((item) => (
                                                    <DropdownMenuItem key={item.href} asChild>
                                                        <Link
                                                            href={item.href}
                                                            className={`flex items-center cursor-pointer ${
                                                                pathname === item.href ? 'bg-blue-50 text-blue-600' : ''
                                                            }`}
                                                        >
                                                            <item.icon className="mr-2 h-4 w-4" />
                                                            {item.label}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="hidden sm:flex">
                            <div className="relative">
                                <Input
                                    type="search"
                                    placeholder="搜索内容"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pr-10 w-64 rounded-full bg-gray-50 border-gray-200 placeholder:text-gray-400 focus:bg-white"
                                    style={{ paddingLeft: '1rem', paddingRight: '2.5rem' }}
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            </div>
                        </form>

                        {/* User Menu */}
                        {
                            session ? (
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                                            <Avatar className="h-8 w-8 cursor-pointer">
                                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=ModStart" alt="Avatar" />
                                                <AvatarFallback>MS</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 header-dropdown-menu" align="end" forceMount>
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            个人资料
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            设置
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout}>
                                            退出登录
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link href="/login" className="flex items-center h-full text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                                    登录
                                </Link>
                                /*<Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    登录
                                </Button>*/
                            )
                        }
                        {/* Mobile Menu */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <nav className="flex flex-col space-y-4 mt-8">
                                    {navigationItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center space-x-3 px-4 py-2 rounded-md transition-colors hover:bg-accent ${
                                                pathname === item.href ? 'bg-blue-50 text-blue-600' : ''
                                            }`}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}