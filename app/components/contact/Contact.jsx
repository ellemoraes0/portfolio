"use client";
import Image from "next/image";
import { motion } from "motion/react";
import imgContact from "../../imagens/polaroid.png";

const contactInfo = {
    title: "Contato",
    subtitle: "Vamos trabalhar juntos",
    name: "Gabrielle Designer",
    email: "email@email.com",
    image: imgContact,
    socials: [
        { label: "Instagram", url: "https://instagram.com/" },
        { label: "Behance", url: "https://behance.net/" },
        { label: "LinkedIn", url: "https://linkedin.com/" },
    ],
};

const spring = { type: "spring", stiffness: 150, damping: 10 };

export default function Contact() {
    return (
        <section
            id="contato"
            className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#deddd9] px-6 py-24 text-[#201914]"
        >
            <div className="flex w-full max-w-[1200px] flex-col items-center text-center">

                <motion.header
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ ...spring, delay: 0.1 }}
                >
                    <motion.h2 initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                            delay: 0.2, // Added delay for the first element
                        }} className="font-penmanship text-6xl md:text-7xl">
                        {contactInfo.title}
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                            delay: 0.2, // Added delay for the first element
                        }} className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#201914]/60">
                        {contactInfo.subtitle}
                    </motion.p>
                </motion.header>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ ...spring, delay: 0.25 }}
                    className="mt-12 w-full max-w-[420px] md:mt-16"
                >
                    <Image
                        src={contactInfo.image}
                        alt={contactInfo.name}
                        className="h-auto w-full rounded-[6px]"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ ...spring, delay: 0.4 }}
                    className="mt-12 flex flex-col items-center md:mt-16"
                >
                    <motion.p initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                            delay: 0.2, // Added delay for the first element
                        }} className="text-lg font-bold">{contactInfo.name}</motion.p>

                    <motion.a initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                            delay: 0.2, // Added delay for the first element
                        }}
                        href={`mailto:${contactInfo.email}`}
                        className="link-anim mt-2 text-sm md:text-base"
                    >
                        {contactInfo.email}
                    </motion.a>

                    <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                        {contactInfo.socials.map((social) => (
                            <motion.a initial={{ scale: 0, y: 100 }}
                                whileInView={{ scale: 1, y: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 10,
                                    delay: 0.2, // Added delay for the first element
                                }}
                                key={social.label}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className="link-anim text-sm"
                            >
                                {social.label}
                            </motion.a>
                        ))}
                    </nav>
                </motion.div>

            </div>
        </section>
    );
}