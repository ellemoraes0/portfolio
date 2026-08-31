"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { motion } from "motion/react";
import imgBackground from "../../imagens/background.jpg";
import imgBackground2 from "../../imagens/background-2.png";
import imgHeroCards from "../../imagens/hero-cards.png";
import imgPolaroid from "../../imagens/polaroid.png";

const fallbackProjects = [
    {
        id: 1,
        title: "Sutki Vorta",
        category: "Youtube",
        cover: imgBackground,
        images: [
            imgBackground,
            imgBackground2,
            imgHeroCards,
            imgPolaroid,
            imgBackground2,
            imgHeroCards,
        ],
    },
    {
        id: 2,
        title: "Murir Moya",
        category: "Soundcloud",
        cover: imgBackground2,
        images: [imgBackground2, imgHeroCards, imgPolaroid],
    },
    {
        id: 3,
        title: "Projeto 03",
        category: "Instagram",
        cover: imgHeroCards,
        images: [
            imgHeroCards,
            imgPolaroid,
            imgBackground,
            imgBackground2,
        ],
    },
];

const easeOut = "ease-[cubic-bezier(0.25,1,0.5,1)]";

export default function Carrossel({ portfolio }) {

    const projects =
        portfolio?.projects?.length > 0
            ? portfolio.projects
            : fallbackProjects;

    const [index, setIndex] = useState(0);
    const [perView, setPerView] = useState(2);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [originRect, setOriginRect] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const closeTimer = useRef(null);
    const [flipProject, setFlipProject] = useState(null);
    const [flipDirection, setFlipDirection] = useState("forward");
    const [flipPhase, setFlipPhase] = useState("idle");
    const flipTimer = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");

        const update = () => {
            const nextPerView = mq.matches ? 1 : 2;

            setPerView(nextPerView);

            setIndex((i) =>
                Math.min(
                    i,
                    Math.max(
                        0,
                        projects.length - nextPerView
                    )
                )
            );
        };

        update();

        mq.addEventListener("change", update);

        return () =>
            mq.removeEventListener("change", update);
    }, []);

    useEffect(() => {

        if (!selectedProject) return undefined;

        let raf2;

        const raf1 = requestAnimationFrame(() => {

            raf2 = requestAnimationFrame(() =>
                setIsExpanded(true)
            );

        });

        return () => {

            cancelAnimationFrame(raf1);

            if (raf2) {
                cancelAnimationFrame(raf2);
            }

        };

    }, [selectedProject]);

    useEffect(() => {

        if (!selectedProject) return undefined;

        const scrollbarWidth =
            window.innerWidth -
            document.documentElement.clientWidth;

        const previousOverflow =
            document.body.style.overflow;

        const previousPadding =
            document.body.style.paddingRight;

        document.body.style.overflow = "hidden";

        if (scrollbarWidth > 0) {

            document.body.style.paddingRight =
                `${scrollbarWidth}px`;

        }

        return () => {

            document.body.style.overflow =
                previousOverflow;

            document.body.style.paddingRight =
                previousPadding;

        };

    }, [selectedProject]);

    const maxIndex = Math.max(
        0,
        projects.length - perView
    );

    const handlePrev = () =>
        setIndex((i) =>
            i <= 0
                ? maxIndex
                : i - 1
        );

    const handleNext = () =>
        setIndex((i) =>
            i >= maxIndex
                ? 0
                : i + 1
        );

    const openProject = (
        project,
        event
    ) => {

        clearTimeout(
            closeTimer.current
        );

        const rect =
            event.currentTarget.getBoundingClientRect();

        setOriginRect({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        });

        setIsClosing(false);

        setShowAll(false);

        setIsExpanded(false);

        setSelectedProject(project);

    };

    const flipToProject = (project, direction) => {
        if (flipPhase !== "idle") return;
        const nextIdx = projects.indexOf(project);
        const currentIdx = projects.indexOf(selectedProject);
        if (nextIdx === currentIdx) return;
        const dir = direction || (nextIdx > currentIdx ? "forward" : "backward");
        setFlipDirection(dir);
        setFlipProject(project);
        setFlipPhase("flipping-out");
        clearTimeout(flipTimer.current);
        flipTimer.current = setTimeout(() => {
            setSelectedProject(project);
            setFlipPhase("flipping-in");
            flipTimer.current = setTimeout(() => {
                setFlipPhase("idle");
                setFlipProject(null);
            }, 500);
        }, 200);
    };

    const flipNext = () => {
        if (flipPhase !== "idle" || !selectedProject) return;
        const i = projects.indexOf(selectedProject);
        const next = (i + 1) % projects.length;
        flipToProject(projects[next], "forward");
    };

    const flipPrev = () => {
        if (flipPhase !== "idle" || !selectedProject) return;
        const i = projects.indexOf(selectedProject);
        const prev = (i - 1 + projects.length) % projects.length;
        flipToProject(projects[prev], "backward");
    };

    const closeProject = () => {

        setIsClosing(true);

        setIsExpanded(false);

        setFlipPhase("idle");

        setFlipProject(null);

        clearTimeout(flipTimer.current);

        closeTimer.current =
            setTimeout(() => {

                setSelectedProject(null);

                setIsClosing(false);

            }, 600);

    };

    useEffect(() => {

        if (!selectedProject) return undefined;

        const onKeyDown = (event) => {

            if (event.key === "Escape") {
                if (showAll) {
                    setShowAll(false);
                } else {
                    setIsClosing(true);
                    setIsExpanded(false);
                    setFlipPhase("idle");
                    setFlipProject(null);
                    clearTimeout(flipTimer.current);
                    closeTimer.current =
                        setTimeout(() => {
                            setSelectedProject(null);
                            setIsClosing(false);
                        }, 600);
                }
                return;
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();
                flipNext();
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                flipPrev();
            }

        };

        window.addEventListener(
            "keydown",
            onKeyDown
        );

        return () =>
            window.removeEventListener(
                "keydown",
                onKeyDown
            );

    }, [selectedProject, showAll, flipPhase]);

    useEffect(
        () => () =>
            clearTimeout(closeTimer.current),
        []
    );

    const previewStyle =
        !originRect
            ? undefined
            : isExpanded
                ? {
                    top: "50%",
                    left: "50%",
                    width: "min(94vw, 1300px)",
                    height: "min(84vh, 860px)",
                    transform:
                        "translate(-50%, -50%)",
                }
                : {
                    top: originRect.top,
                    left: originRect.left,
                    width: originRect.width,
                    height: originRect.height,
                    transform: "none",
                };

    return (

        <section
            id="portfolio"
            className="w-full overflow-hidden bg-black py-16 max-md:py-12"
        >

            <div className="mx-auto max-w-[1200px] px-6 max-md:px-5">

                <div className="mb-10 max-md:mb-8">

                    <motion.h2
                        initial={{
                            opacity: 0,
                            x: 100,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                            delay: 0.2,
                        }}
                        className="text-3xl font-bold text-[#e4e746] md:text-4xl"
                    >
                        {portfolio?.title || "Portfólio"}
                    </motion.h2>

                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 100,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 10,
                            delay: 0.2,
                        }}
                        className="mt-2 text-sm text-[#e4e746]/55"
                    >
                        {portfolio?.subtitle || "Projetos e trabalhos"}
                    </motion.p>

                </div>

                <motion.div
                    initial={{
                        scale: 0,
                        x: 100,
                    }}
                    whileInView={{
                        scale: 1,
                        x: 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 10,
                        delay: 0.2,
                    }}
                    className="relative"
                >

                    <div className="overflow-hidden">

                        <div
                            className={`flex gap-[var(--gap)] [--per-view:2] [--gap:32px] transition-transform duration-[550ms] ${easeOut} will-change-transform max-lg:[--gap:20px] max-md:[--per-view:1] max-md:[--gap:16px]`}
                            style={{
                                transform: `translateX(calc(${index} * ((-100% / var(--per-view)) - (var(--gap) / var(--per-view)))))`,
                            }}
                        >

                            {projects.map((project, projectIndex) => (
                                <article
                                    key={project.id || project._key || projectIndex}
                                    className="min-w-0 shrink-0 grow-0 basis-[calc((100%-(var(--per-view)-1)*var(--gap))/var(--per-view))]"
                                >

                                    <button
                                        type="button"
                                        className="group block w-full cursor-pointer rounded-[6px] border-0 bg-transparent p-0 focus-visible:[outline:1px_solid_#e4e746] focus-visible:[outline-offset:4px]"
                                        onClick={(event) =>
                                            openProject(
                                                project,
                                                event
                                            )
                                        }
                                        aria-label={`Abrir projeto ${project.title}`}
                                    >

                                        <span className="block relative aspect-square overflow-hidden rounded-[6px] bg-[#111]">

                                            <Image
                                                src={project.cover}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className={`object-cover transition-transform duration-[600ms] ${easeOut} group-hover:scale-[1.04] group-focus-visible:scale-[1.04]`}
                                            />

                                        </span>

                                    </button>

                                    <h3 className="mt-3.5 text-xl font-bold leading-[1.2] text-[#e4e746] max-md:text-lg">
                                        {project.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-[#e4e746]/55">
                                        {project.category}
                                    </p>

                                </article>

                            ))}

                        </div>

                    </div>

                    <button
                        type="button"
                        className="absolute top-1/2 z-[2] flex h-[46px] w-[46px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition-[background-color,border-color] duration-[250ms] hover:border-white hover:bg-black/85 focus-visible:border-white focus-visible:bg-black/85 focus-visible:[outline:1px_solid_#e4e746] focus-visible:[outline-offset:2px] -left-[22px] max-md:-left-4"
                        onClick={handlePrev}
                        aria-label="Projeto anterior"
                    >

                        <FiChevronLeft size={22} />

                    </button>

                    <button
                        type="button"
                        className="absolute top-1/2 z-[2] flex h-[46px] w-[46px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition-[background-color,border-color] duration-[250ms] hover:border-white hover:bg-black/85 focus-visible:border-white focus-visible:bg-black/85 focus-visible:[outline:1px_solid_#e4e746] focus-visible:[outline-offset:2px] -right-[22px] max-md:-right-4"
                        onClick={handleNext}
                        aria-label="Próximo projeto"
                    >

                        <FiChevronRight size={22} />

                    </button>

                </motion.div>

            </div>

            {selectedProject && (

                <div
                    className={`fixed inset-0 z-[1000] animate-[overlayIn_0.35s_ease_backwards] bg-black/[0.94] ${isClosing
                            ? "pointer-events-none opacity-0 [transition:opacity_0.45s_ease]"
                            : ""
                        }`}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Projeto ${selectedProject.title}`}
                >

                    {selectedProject && !showAll && (

                        <>

                            <div
                                className={`fixed overflow-hidden rounded-[6px] bg-[#111] transition-[top,left,width,height,transform] duration-[550ms] ${easeOut} will-change-[top,left,width,height,transform]`}
                                style={previewStyle}
                            >

                                {flipPhase === "idle" ? (
                                    <Image
                                        src={selectedProject.cover}
                                        alt={selectedProject.title}
                                        fill
                                        sizes="100vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0" style={{ perspective: "1200px" }}>
                                        <div
                                            className="absolute inset-0 overflow-hidden rounded-[6px]"
                                            style={{
                                                transformOrigin: "left center",
                                                backfaceVisibility: "hidden",
                                                animation: "flipOut 0.5s ease-in forwards",
                                            }}
                                        >
                                            <Image
                                                src={selectedProject.cover}
                                                alt={selectedProject.title}
                                                fill
                                                sizes="100vw"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div
                                            className="absolute inset-0 rounded-[6px]"
                                            style={{
                                                background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 40%, transparent 70%)",
                                                animation: "flipShadow 0.5s ease-in-out",
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0 overflow-hidden rounded-[6px]"
                                            style={{
                                                animation: "flipReveal 0.4s ease-out 0.1s both",
                                            }}
                                        >
                                            <Image
                                                src={flipProject.cover}
                                                alt={flipProject.title}
                                                fill
                                                sizes="100vw"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={`pointer-events-none absolute bottom-[18px] left-5 flex flex-col gap-0.5 opacity-0 [text-shadow:0_1px_10px_rgba(0,0,0,0.9)] [transition:opacity_0.4s_ease_0.4s] ${isExpanded
                                            ? "opacity-100"
                                            : ""
                                        }`}
                                >

                                    <strong className="text-xl font-bold leading-[1.2] text-[#e4e746] max-md:text-lg">

                                        {flipProject?.title || selectedProject.title}

                                    </strong>

                                    <span className="text-sm text-[#e4e746]/60">

                                        {flipProject?.category || selectedProject.category}

                                    </span>

                                </div>

                                {projects.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            className="absolute left-3 top-1/2 z-[3] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition-[background-color,border-color] duration-200 hover:border-white hover:bg-black/85"
                                            onClick={flipPrev}
                                            aria-label="Projeto anterior"
                                        >
                                            <FiChevronLeft size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 z-[3] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition-[background-color,border-color] duration-200 hover:border-white hover:bg-black/85"
                                            onClick={flipNext}
                                            aria-label="Próximo projeto"
                                        >
                                            <FiChevronRight size={20} />
                                        </button>
                                    </>
                                )}

                            </div>

                            <button
                                type="button"
                                className={`fixed bottom-8 left-1/2 z-[2] -translate-x-1/2 cursor-pointer rounded-full border border-[#e4e746] bg-black/60 px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#e4e746] opacity-0 [transition:opacity_0.4s_ease_0.35s,background-color_0.25s_ease,color_0.25s_ease] hover:bg-[#e4e746] hover:text-black ${isExpanded
                                        ? "opacity-100"
                                        : ""
                                    }`}
                                onClick={() =>
                                    setShowAll(true)
                                }
                            >

                                Ver todos

                            </button>

                        </>

                    )}

                    {selectedProject && showAll && (

                        <div className="fixed inset-0 overflow-y-auto overscroll-contain">

                            <header className="fixed inset-x-0 top-0 z-[2] flex items-center gap-6 bg-linear-to-b from-black/[0.92] to-transparent py-[22px] pr-[88px] pl-6 max-md:gap-4 max-md:py-[18px] max-md:pr-[76px] max-md:pl-5">

                                <button
                                    type="button"
                                    className="flex shrink-0 cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-[0.95rem] text-white transition-colors duration-[250ms] hover:text-[#e4e746]"
                                    onClick={() =>
                                        setShowAll(false)
                                    }
                                >

                                    <FiChevronLeft size={18} />

                                    Voltar

                                </button>

                                <div className="flex min-w-0 items-baseline gap-3">

                                    <h2 className="m-0 truncate text-lg font-bold whitespace-nowrap text-[#e4e746]">

                                        {selectedProject.title}

                                    </h2>

                                    <span className="text-sm whitespace-nowrap text-[#e4e746]/55">

                                        {selectedProject.category}

                                    </span>

                                </div>

                            </header>

                            <div className="mx-auto max-w-[1200px] px-6 pt-24 pb-16 max-md:px-5 max-md:pt-[84px] max-md:pb-12">

                                <div className="grid grid-cols-3 items-start gap-1.5 max-lg:grid-cols-2 max-md:grid-cols-1">

                                    {selectedProject.images
                                        ?.filter((image) => image?.src)
                                        .map((image, i) => (
                                            <div
                                                key={image._key || `${selectedProject.id}-${i}`}
                                                className="animate-[galleryRise_0.5s_cubic-bezier(0.25,1,0.5,1)_both]"
                                                style={{ animationDelay: `${i * 60}ms` }}
                                            >
                                                <Image
                                                    src={image.src}
                                                    width={image.width}
                                                    height={image.height}
                                                    alt={`${selectedProject.title} — imagem ${i + 1}`}
                                                    className="block h-auto w-full rounded-[6px]"
                                                />
                                            </div>
                                        ))}
                                </div>

                            </div>

                        </div>

                    )}

                    <button
                        type="button"
                        className="fixed top-6 right-6 z-[3] flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/50 text-white transition-[background-color,border-color] duration-[250ms] hover:border-white hover:bg-black/85 focus-visible:border-white focus-visible:bg-black/85 focus-visible:[outline:1px_solid_#e4e746] focus-visible:[outline-offset:2px] max-md:top-4 max-md:right-4"
                        onClick={closeProject}
                        aria-label="Fechar e voltar ao carrossel"
                    >

                        <FiX size={20} />

                    </button>

                </div>

            )}

        </section>

    );
}