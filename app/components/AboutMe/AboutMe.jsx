"use client";
import { useEffect, useRef, useState } from 'react';
import bgImage from '../../imagens/background-2.png';
import { motion } from "motion/react"
import { IoLogoFigma } from "react-icons/io5";
import { TbBrandAdobeIllustrator } from "react-icons/tb";
import { TbBrandAdobePhotoshop } from "react-icons/tb";
import { TbBrandAdobeIndesign } from "react-icons/tb";
import { TbBrandAdobePremiere } from "react-icons/tb";
import polaroid from '../../imagens/polaroid.png';

export default function AboutMe({ aboutMe }) {

    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

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

    return (
        <>
            {/* 1. Adicionado "relative" e "flex flex-col" aqui */}
            <div ref={sectionRef} id="sobre" className="relative flex min-h-screen w-full flex-col overflow-hidden">

                <div
                    ref={bgRef}
                    className="absolute inset-x-0 -top-[10%] h-[120%] w-full"
                    style={{
                        backgroundImage: `url(${bgImage.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        willChange: "transform"
                    }}
                />

                {/* 2. Removido h-full para não empurrar o resto para fora */}
                <div className="relative z-10 flex flex-col gap-3 p-6 md:flex-row md:justify-between md:p-9">
                    <motion.span className="tracking-tighter font-light text-3xl md:text-4xl" initial={isDesktop ? { opacity: 0, y: 100 } : { opacity: 0, y: 24 }}
                        whileInView={isDesktop ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                        viewport={isDesktop ? undefined : { once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                            delay: 0.2, // Added delay for the first element
                        }}>Bem-vindo(a) ao<br /> meu Portfólio</motion.span>
                    <motion.span className="tracking-tight font-light text-3xl md:text-4xl" initial={isDesktop ? { opacity: 0, y: 100 } : { opacity: 0, y: 24 }}
                        whileInView={isDesktop ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                        viewport={isDesktop ? undefined : { once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                            delay: 0.2, // Added delay for the first element
                        }} >Sobre mim</motion.span>
                </div>

                {/* 3. A div absoluta agora responde ao container principal */}
                <div className="relative z-10 grid grid-cols-1 gap-8 p-6 pt-10 text-sm md:absolute md:bottom-0 md:left-0 md:z-10 md:grid-cols-3 md:gap-10 md:p-9">
                    <div>
                        <motion.img initial={isDesktop ? { scale: 0, y: 100 } : { opacity: 0, scale: 0.9 }}
                            whileInView={isDesktop ? { scale: 1, y: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.6, // Added delay for the first element
                            }} src={polaroid.src} className="mb-4 block w-44 md:absolute md:mb-0 md:mt-[-250px] md:w-75" />
                        <motion.h3 className="font-reverie text-6xl index-10000 md:text-[100px]"
                            initial={isDesktop ? { opacity: 0, x: 100 } : { opacity: 0, y: 24 }}
                            whileInView={isDesktop ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.4, // Added delay for the first element
                            }}
                        >
                            Olá
                        </motion.h3>
                        <motion.p className="index-9999" initial={isDesktop ? { scale: 0, y: 100 } : { opacity: 0, scale: 0.9 }}
                            whileInView={isDesktop ? { scale: 1, y: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.6, // Added delay for the first element
                            }}>{aboutMe?.description}</motion.p>
                    </div>
                    <div>
                        <motion.h5 initial={isDesktop ? { opacity: 0, y: 100 } : { opacity: 0, y: 24 }}
                            whileInView={isDesktop ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.6, // Added delay for the first element
                            }} className="font-bold">Experiências</motion.h5>
                        <motion.p initial={isDesktop ? { opacity: 0, x: 100 } : { opacity: 0, y: 24 }}
                            whileInView={isDesktop ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.6, // Added delay for the first element
                            }}>{aboutMe?.experience}</motion.p>
                        <motion.h5 initial={isDesktop ? { opacity: 0, x: 100 } : { opacity: 0, y: 24 }}
                            whileInView={isDesktop ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.8, // Added delay for the first element
                            }} className="font-bold mt-4">Formação</motion.h5>
                        <motion.p initial={isDesktop ? { opacity: 0, y: 100 } : { opacity: 0, y: 24 }}
                            whileInView={isDesktop ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.5, // Added delay for the first element
                            }}>{aboutMe?.education}</motion.p>
                    </div>
                    <div>
                        <motion.h5 initial={isDesktop ? { opacity: 0, x: 100 } : { opacity: 0, y: 24 }}
                            whileInView={isDesktop ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.6, // Added delay for the first element
                            }} className="font-bold">Idioma</motion.h5>
                        <motion.p initial={isDesktop ? { opacity: 0, y: 100 } : { opacity: 0, y: 24 }}
                            whileInView={isDesktop ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.9, // Added delay for the first element
                            }}>{aboutMe?.languages}</motion.p>
                        <motion.h5 initial={isDesktop ? { scale: 0, y: 100 } : { opacity: 0, scale: 0.9 }}
                            whileInView={isDesktop ? { scale: 1, y: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.6, // Added delay for the first element
                            }} className="font-bold mt-4">Contato</motion.h5>
                        <motion.p initial={isDesktop ? { opacity: 0, y: 100 } : { opacity: 0, y: 24 }}
                            whileInView={isDesktop ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.6, // Added delay for the first element
                            }}>gabrielle@gmail.com</motion.p>
                        <motion.p initial={isDesktop ? { scale: 0, y: 100 } : { opacity: 0, scale: 0.9 }}
                            whileInView={isDesktop ? { scale: 1, y: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                            viewport={isDesktop ? undefined : { once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 10,
                                delay: 0.6, // Added delay for the first element
                            }}>(11) xxxxx-xxxx</motion.p>
                        <div className="flex flex-col mt-4">
                            <motion.h5 initial={isDesktop ? { scale: 0, x: 100 } : { opacity: 0, scale: 0.9 }}
                                whileInView={isDesktop ? { scale: 1, x: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                                viewport={isDesktop ? undefined : { once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 10,
                                    delay: 0.6, // Added delay for the first element
                                }} className="font-bold" >Habilidades</motion.h5>
                            <motion.div className="flex" initial={isDesktop ? { opacity: 0, x: 100 } : { opacity: 0, y: 24 }}
                                whileInView={isDesktop ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                                viewport={isDesktop ? undefined : { once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 10,
                                    delay: 0.6, // Added delay for the first element
                                }}>
                                <TbBrandAdobeIllustrator className="size-10" />
                                <TbBrandAdobePhotoshop className="size-10" />
                                <TbBrandAdobeIndesign className="size-10" />
                                <TbBrandAdobePremiere className="size-10" />
                                <IoLogoFigma className="size-8" />
                            </motion.div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}