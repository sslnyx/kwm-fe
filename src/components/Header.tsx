import { useState, useEffect, useCallback } from 'react';
import logoSrc from '../assets/KWM-Logo.svg';
import menuIconSrc from '../assets/menu.svg';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const openMenu = useCallback(() => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeMenu = useCallback((callback?: () => void) => {
        setIsOpen(false);
        document.body.style.overflow = '';
        if (callback) callback();
    }, []);

    // Listen to Astro page transitions - instantly close menu
    useEffect(() => {
        const handleBeforeSwap = () => {
            setIsOpen(false);
            document.body.style.overflow = '';
        };

        document.addEventListener('astro:before-swap', handleBeforeSwap);
        return () => {
            document.removeEventListener('astro:before-swap', handleBeforeSwap);
        };
    }, []);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, closeMenu]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!href) return;

        // Only special-case: same-page hash links need smooth scroll
        if (href.startsWith('#')) {
            const target = document.getElementById(href.substring(1));
            if (target) {
                e.preventDefault();
                closeMenu(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                    history.pushState(null, '', href);
                });
            }
            return;
        }

        // For all other navigation, let Astro handle it naturally
        // The astro:before-swap event will instantly close the menu
    };

    return (
        <>
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100">
                <div className="container h-20 flex items-center justify-between">
                    <a href="/" className="flex items-center">
                        <img
                            src={logoSrc.src}
                            alt="Kentwood Multiplex Logo"
                            className="h-[40px] w-auto p-2 box-content -mx-2"
                        />
                    </a>

                    <button
                        onClick={openMenu}
                        className="hover:opacity-80 transition-opacity p-2 cursor-pointer"
                        aria-label="Open Menu"
                    >
                        <img src={menuIconSrc.src} alt="Menu" className="w-10 h-10" />
                    </button>
                </div>
            </header>

            {/* Overlay */}
            <div
                className={`fixed hidden md:block inset-0 bg-secondary/60 backdrop-blur-md z-[60] ${isOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => closeMenu()}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col p-12 overflow-y-auto scrollbar-hide">
                    {/* Drawer Header */}
                    <div className="flex justify-between items-center mb-16">
                        <img src={logoSrc.src} alt="Kentwood Logo" className="h-8 w-auto" />
                        <button
                            onClick={() => closeMenu()}
                            className="text-secondary hover:text-primary transition-colors p-2"
                            aria-label="Close Menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Content */}
                    <nav className="flex-grow space-y-12">
                        {/* Project Categories */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-secondary/40 border-b border-gray-100 pb-2">
                                    Featured Projects
                                </h3>
                                <ul className="space-y-4">
                                    <li>
                                        <a
                                            href="/projects/mcgill"
                                            onClick={(e) => handleLinkClick(e, '/projects/mcgill')}
                                            className="text-2xl font-bold text-secondary hover:text-primary transition-colors block leading-tight"
                                        >
                                            McGill
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-secondary/40 border-b border-gray-100 pb-2">
                                    Upcoming Projects
                                </h3>
                                <ul className="space-y-4">
                                    <li>
                                        <a
                                            href="/projects/oakridge"
                                            onClick={(e) => handleLinkClick(e, '/projects/oakridge')}
                                            className="text-2xl font-bold text-secondary hover:text-primary transition-colors block leading-tight"
                                        >
                                            Oak
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/projects/skeena"
                                            onClick={(e) => handleLinkClick(e, '/projects/skeena')}
                                            className="text-2xl font-bold text-secondary hover:text-primary transition-colors block leading-tight"
                                        >
                                            Skeena
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Primary Links */}
                        <div className="space-y-6 pt-12 border-t border-gray-100">
                            <ul className="space-y-6">
                                <li>
                                    <a
                                        href="/about"
                                        onClick={(e) => handleLinkClick(e, '/about')}
                                        className="text-4xl font-black text-secondary hover:text-primary transition-colors uppercase tracking-tighter italic"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/faq"
                                        onClick={(e) => handleLinkClick(e, '/faq')}
                                        className="text-4xl font-black text-secondary hover:text-primary transition-colors uppercase tracking-tighter italic"
                                    >
                                        FAQs
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/contact"
                                        onClick={(e) => handleLinkClick(e, '/contact')}
                                        className="text-4xl font-black text-secondary hover:text-primary transition-colors uppercase tracking-tighter italic"
                                    >
                                        Get In Touch
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className="mt-auto pt-12">
                        <a
                            href="/register"
                            onClick={(e) => handleLinkClick(e, '/register')}
                            className="w-full bg-primary text-white py-6 rounded-full text-center font-black uppercase tracking-widest text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl block shadow-primary/20"
                        >
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
