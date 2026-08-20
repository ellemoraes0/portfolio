"use client";
import { useEffect, useRef, useState } from 'react';
import bgImage from '../../imagens/background.jpg';
import imgHero from '../../imagens/hero-cards.png';
import Menu from '../../components/Menu/Menu';
import { motion, AnimatePresence } from "motion/react"
import { FiMenu, FiX } from 'react-icons/fi';

export default function Hero() {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !bgRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const scrollProgress = -rect.top / window.innerHeight;

            if (scrollProgress >= 0 && scrollProgress <= 1) {
                bgRef.current.style.transform = `translateY(${scrollProgress * 50}%)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setMenuOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    const MenuItens = [
        { nome: 'Home', link: '#home' },
        { nome: 'Sobre mim', link: '#sobre' },
        { nome: 'Portfolio', link: '#portfolio' },
        { nome: 'Contato', link: '#contato' }
    ];

    return (
        <section ref={sectionRef} id="home" className="relative h-screen overflow-hidden">
            <motion.div initial={{ opacity: 0, }}
                whileInView={{ opacity: 1, }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 10,
                    delay: 0.2, // Added delay for the first element
                }}
                ref={bgRef}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{
                    backgroundImage: `url(${bgImage.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    willChange: 'transform'
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                {/* navbar */}
                <div className="flex justify-between px-2 md:px-10 md:py-5 w-full text-blue-300">
                    <motion.span initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.4, // Added delay for the first element
                            }}>Gabrielle Designer</motion.span>
                    <motion.ul
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                            delay: 0.4, // Added delay for the first element
                        }}
                        className="hidden gap-5 md:flex"
                    >
                        {MenuItens.map((item, index) => (
                            <Menu nome={item.nome} key={index} link={item.link} />
                        ))}
                    </motion.ul>
                    <motion.button
                        type="button"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={() => setMenuOpen(true)}
                        aria-label="Abrir menu"
                        className="flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition-colors duration-[250ms] hover:border-white hover:bg-black/85 focus-visible:border-white focus-visible:bg-black/85 md:hidden">
                        <FiMenu size={20} />
                    </motion.button>
                </div>

                {/* hero bottom bar */}
                <div className="bg-black mt-auto w-full h-1/4 md:grid md:grid-cols-3 p-4 text-stone-50 items-start">
                    <div>
                        <motion.img initial={{ opacity: 0, x: 500 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.5, // Added delay for the first element
                            }} src={imgHero.src} alt='cards hero'  className="absolute bottom-0 hidden md:block md:w-md" />
                    </div>
                    <div className="ml-auto pr-30">
                        <motion.h2 initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.4, // Added delay for the first element
                            }} className="text-2xl">Resumo profissional</motion.h2>
                    </div>
                    <div>
                        <motion.p initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.4, // Added delay for the first element
                            }} className="text-[12px] font-light">
                            <span className="font-bold">Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.</span> Praesentium deleniti alias sint facilis non cupiditate dolorem debitis officiis consequatur qui,
                            illum id ut dolorum quis voluptatibus necessitatibus atque sed assumenda? Praesentium deleniti alias sint facilis non cupiditate dolorem debitis officiis consequatur qui, illum id ut dolorum quis voluptatibus necessitatibus atque sed assumenda?
                        </motion.p>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            key="menu-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setMenuOpen(false)}
                            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
                        />

                        <motion.aside
                            key="menu-drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                            className="fixed right-0 top-0 z-[90] flex h-full w-[78%] max-w-sm flex-col border-l border-white/10 bg-black px-8 py-6 md:px-10"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu de navegação"
                        >
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(false)}
                                    aria-label="Fechar menu"
                                    className="flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition-colors duration-[250ms] hover:border-white hover:bg-black/85 focus-visible:border-white focus-visible:bg-black/85">
                                    <FiX size={20} />
                                </button>
                            </div>

                            <nav className="mt-12 flex flex-col gap-8">
                                {MenuItens.map((item, index) => (
                                    <motion.a
                                        key={item.nome}
                                        href={item.link}
                                        onClick={() => setMenuOpen(false)}
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 150,
                                            damping: 10,
                                            delay: 0.2 + index * 0.08,
                                        }}
                                        className="w-fit font-penmanship text-4xl text-[#e4e746] transition-colors hover:text-white"
                                    >
                                        {item.nome}
                                    </motion.a>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}