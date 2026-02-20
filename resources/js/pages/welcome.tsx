import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-[#EE1922] text-white shadow-lg">
                                <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                                    <path d="M2 30 C 5 20, 35 20, 38 30 L 32 30 C 30 25, 10 25, 8 30 Z" fill="white" />
                                    <path d="M5 24 L 20 5 L 35 24 L 32 24 L 20 10 L 8 24 Z" fill="white" />
                                </svg>
                            </div>
                            <span className="text-xl font-black text-[#EE1922] tracking-tighter italic">PIZZAHUT SOFTWARE</span>
                        </div>
                        <div className="flex gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Register
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse overflow-hidden rounded-lg shadow-2xl lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 bg-white p-6 pb-12 text-[13px] leading-[20px] lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC]">
                            <h1 className="mb-4 text-2xl font-black tracking-tight italic text-[#EE1922]">
                                WELCOME TO THE FAMILY
                            </h1>
                            <p className="mb-6 text-base text-[#706f6c] dark:text-[#A1A09A]">
                                PizzaHut Software powering the world's favorite pizza experience.
                                Manage your ecosystem with our premium enterprise tools.
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="rounded-lg border border-[#F8B803]/20 bg-[#F8B803]/5 p-4">
                                    <h3 className="font-bold text-[#b48602]">Enterprise Documentation</h3>
                                    <p className="text-xs text-[#706f6c] dark:text-[#A1A09A] mb-2">Detailed guides for managing your restaurant network.</p>
                                    <a href="https://laravel.com/docs" target="_blank" className="text-xs font-bold text-[#EE1922] hover:underline">LEARN MORE →</a>
                                </div>
                                <div className="rounded-lg border border-[#EE1922]/20 bg-[#EE1922]/5 p-4">
                                    <h3 className="font-bold text-[#EE1922]">Kitchen Logistics</h3>
                                    <p className="text-xs text-[#706f6c] dark:text-[#A1A09A] mb-2">Real-time tracking and delivery management systems.</p>
                                    <a href="https://laracasts.com" target="_blank" className="text-xs font-bold text-[#EE1922] hover:underline">VIEW TUTORIALS →</a>
                                </div>
                            </div>
                        </div>

                        <div className="relative aspect-[335/376] w-full shrink-0 overflow-hidden bg-[#EE1922] lg:aspect-auto lg:w-[438px] dark:bg-[#1D0002]">
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                <svg width="400" height="400" viewBox="0 0 40 40" fill="none">
                                    <path d="M2 30 C 5 20, 35 20, 38 30 L 32 30 C 30 25, 10 25, 8 30 Z" fill="white" />
                                    <path d="M5 24 L 20 5 L 35 24 L 32 24 L 20 10 L 8 24 Z" fill="white" />
                                </svg>
                            </div>
                            <div className="relative z-10 h-full p-12 flex flex-col justify-end text-white bg-gradient-to-t from-black/60 to-transparent">
                                <h2 className="text-4xl font-black mb-4 tracking-tighter italic leading-none">DELIVERING EXCELLENCE</h2>
                                <p className="text-white/80 font-medium">Powering the next generation of pizza logistics with PizzaHut Software.</p>
                            </div>
                        </div>
                    </main>
                </div>

                <footer className="mt-8 text-center text-xs text-[#706f6c] dark:text-[#A1A09A]">
                    © {new Date().getFullYear()} PizzaHut Software. All rights reserved.
                </footer>
            </div>
        </>
    );
}
