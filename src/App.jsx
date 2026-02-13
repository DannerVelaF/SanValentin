import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    MapPin,
    CarFront,
    Sparkles,
    UtensilsCrossed,
    Music,
    Clock,
    MailOpen,
    Camera,
    ArrowRight,
    CalendarHeart,
    Check,
    X
} from "lucide-react";

// --- COMPONENTE DE CONFETI ---
const Confetti = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden w-full h-full">
            {[...Array(70)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-3 h-3 md:w-4 md:h-4 rounded-full ${['bg-red-500', 'bg-pink-400', 'bg-gold-400', 'bg-white', 'bg-rose-600'].sort(() => 0.5 - Math.random())[0]}`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: -20
                    }}
                    initial={{ opacity: 1, scale: Math.random() * 0.5 + 0.5 }}
                    animate={{
                        top: "110vh",
                        rotate: Math.random() * 720,
                        x: Math.random() * 100 - 50
                    }}
                    transition={{
                        duration: Math.random() * 3 + 3,
                        ease: "linear",
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </div>
    );
};

// --- DATOS DE MEMORIAS ---
const MEMORIES = [
    { id: 1, text: "Nuestra primera cita", rotate: -2, src: "images/image_1.jpeg" },
    { id: 2, text: "Ese viaje inolvidable", rotate: 3, src: "images/image_2.jpeg" },
    { id: 3, text: "Tu sonrisa favorita", rotate: -4, src: "images/image_3.jpeg" },
    { id: 4, text: "Un detalle hermoso", rotate: 2, src: "images/image_4.jpeg" },
    { id: 5, text: "Atardecer juntos", rotate: -3, src: "images/image_5.jpeg" },
    { id: 6, text: "Siempre nosotros", rotate: 4, src: "images/image_6.jpeg" },
];

// --- COMPONENTE DEL SOBRE ---
const Envelope = ({ onOpen }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a100c] text-[#f3e6d5] p-4"
            exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <p className="mb-8 font-['Cinzel'] tracking-[0.3em] uppercase text-xs md:text-sm opacity-60 animate-pulse text-center text-[#e6d2b5]">
                Alejandro te ha enviado algo...
            </p>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpen}
                className="cursor-pointer relative group perspective-1000 w-full max-w-[320px]"
            >
                <div className="w-full aspect-[1.6/1] bg-[#e6d2b5] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center relative overflow-hidden border border-[#ccbfa3]">
                    <div className="absolute top-0 left-0 w-full h-full border-l-[160px] border-r-[160px] border-t-[120px] border-l-transparent border-r-transparent border-t-[#d4b483] z-10 origin-top transition-transform duration-700 group-hover:rotate-x-180"></div>
                    <div className="z-20 w-16 h-16 bg-[#8b0000] rounded-full flex items-center justify-center shadow-lg border-4 border-[#6d0000] group-hover:scale-110 transition-transform duration-300">
                        <Heart className="text-[#e6d2b5] fill-[#e6d2b5]" size={24} />
                    </div>
                    <div className="absolute inset-0 bg-black/10 z-0 group-hover:opacity-0 transition-opacity"></div>
                </div>
            </motion.div>

            <p className="mt-10 font-['Playfair_Display'] italic text-white/40 text-sm">
                (Toca el sello para descubrir)
            </p>
        </motion.div>
    );
};

// --- COMPONENTE DE GALERÍA ---
const PhotoDeck = () => {
    const [index, setIndex] = useState(0);
    const nextPhoto = () => setIndex((prev) => (prev + 1) % MEMORIES.length);

    return (
        <div className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center" onClick={nextPhoto}>
            <AnimatePresence mode="popLayout">
                {MEMORIES.map((photo, i) => {
                    if (i === index) {
                        return (
                            <motion.div
                                key={photo.id}
                                layoutId={photo.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1, rotate: photo.rotate, x: 0 }}
                                exit={{ x: 200, opacity: 0, rotate: 20, transition: { duration: 0.4 } }}
                                whileHover={{ scale: 1.02 }}
                                className={`absolute w-60 md:w-72 aspect-[3/4] p-3 bg-white shadow-2xl rounded-sm cursor-pointer border border-gray-100`}
                                style={{ zIndex: 10 }}
                            >
                                <div className="w-full h-[85%] bg-gray-100 overflow-hidden relative">
                                    <img src={photo.src} alt={photo.text} className="w-full h-full object-cover pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                </div>
                                <div className="h-[15%] flex items-end justify-center pb-1">
                                    <p className="font-['Great_Vibes'] text-xl text-[#4a3b32]">{photo.text}</p>
                                </div>
                            </motion.div>
                        );
                    }
                    return null;
                })}
            </AnimatePresence>

            <div className="absolute w-60 md:w-72 aspect-[3/4] bg-white shadow-lg rounded-sm transform rotate-6 scale-95 -z-10 border border-gray-200"></div>
            <div className="absolute w-60 md:w-72 aspect-[3/4] bg-white shadow-md rounded-sm transform -rotate-3 scale-90 -z-20 border border-gray-200"></div>

            <div className="absolute bottom-0 right-4 md:right-20 animate-bounce text-[#8b5a2b] flex items-center gap-2 text-xs md:text-sm font-['Cinzel']">
                <span>Click para siguiente</span> <ArrowRight size={14}/>
            </div>
        </div>
    );
};

// --- APP PRINCIPAL ---
function App() {
    const targetDate = new Date("2026-02-14T18:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;
            if (difference > 0) {
                setTimeLeft({
                    dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutos: Math.floor((difference / (1000 * 60)) % 60),
                    segundos: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const handleAccept = () => {
        setIsAccepted(true);
        setTimeout(() => {
            document.getElementById("final-letter")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    const moveNoButton = () => {
        setNoBtnPosition({
            x: Math.random() * 120 - 60,
            y: Math.random() * 120 - 60
        });
    };

    const patternSVG = `data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.text%7Bfill:%238b5a2b;font-family:'Times New Roman',serif;font-style:italic;font-size:20px;opacity:0.1;%7D.heart%7Bfill:%238b0000;opacity:0.05;%7D%3C/style%3E%3Cg transform='rotate(-20 150 150)'%3E%3Ctext x='30' y='50' class='text'%3EYannel%3C/text%3E%3Ctext x='150' y='120' class='text'%3EAlejandro%3C/text%3E%3Ctext x='50' y='200' class='text'%3EYannel%3C/text%3E%3Ctext x='180' y='260' class='text'%3EAlejandro%3C/text%3E%3Cpath d='M100,80 C100,100 120,100 120,80 C120,60 100,60 100,80' class='heart' transform='scale(0.5)'/%3E%3Cpath d='M250,180 C250,200 270,200 270,180 C270,160 250,160 250,180' class='heart' transform='scale(0.5)'/%3E%3C/g%3E%3C/svg%3E`;

    return (
        <div className="min-h-screen relative text-[#4a3b32] font-serif overflow-x-hidden bg-[#f5e6d3]">
            {isAccepted && <Confetti />}

            <AnimatePresence>
                {!isEnvelopeOpen && <Envelope onOpen={() => setIsEnvelopeOpen(true)} />}
            </AnimatePresence>

            {isEnvelopeOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                >
                    {/* --- FONDO --- */}
                    <div className="fixed inset-0 z-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[#f4e4bc]"></div>
                        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('imagen.jpg')" }}></div>
                        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(59,33,12,0.2)]" style={{ backgroundImage: `url("${patternSVG}")`, backgroundSize: '300px 300px', backgroundRepeat: 'repeat' }}></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(80,50,20,0.3)_100%)]"></div>
                    </div>

                    <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 relative z-10">
                        {/* HEADER */}
                        <header className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 border-b border-[#8b5a2b]/50 pb-2 mb-6">
                                <MailOpen size={16} className="text-[#8b0000]" />
                                <span className="font-['Cinzel'] tracking-[0.3em] text-[10px] md:text-xs font-bold uppercase text-[#8b5a2b]">Invitación Especial</span>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-['Great_Vibes'] text-[#5c3a21] mb-6 drop-shadow-sm leading-tight text-center">¿Serías mi San Valentín?</h1>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-lg md:text-2xl font-['Playfair_Display'] italic text-[#5c4a40]/80">
                                <span>Alejandro</span>
                                <span className="hidden md:block text-[#8b0000]">❧</span>
                                <span>Yannel</span>
                            </div>
                            <div className="mt-8 flex items-center justify-center gap-3">
                                <div className="h-[1px] w-8 md:w-12 bg-[#8b0000]/30"></div>
                                <div className="flex items-center gap-2 text-[#8b0000]">
                                    <CalendarHeart size={20} />
                                    <span className="font-['Cinzel'] text-lg md:text-2xl font-bold tracking-widest uppercase">14 de Febrero, 2026</span>
                                </div>
                                <div className="h-[1px] w-8 md:w-12 bg-[#8b0000]/30"></div>
                            </div>
                        </header>

                        {/* CUENTA REGRESIVA */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-24">
                            {Object.entries(timeLeft).map(([unit, value]) => (
                                <div key={unit} className="text-center group cursor-default">
                                    <div className="relative">
                                        <span className="block text-3xl md:text-5xl font-['Cinzel'] font-bold text-[#2c1810] group-hover:-translate-y-1 transition-transform duration-300">
                                            {String(value).padStart(2, '0')}
                                        </span>
                                        <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#8b0000] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    </div>
                                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#8b5a2b] mt-1 block">{unit}</span>
                                </div>
                            ))}
                        </div>

                        {/* GRID CONTENIDO */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start mb-32">
                            {/* PLAN */}
                            <section className="relative">
                                <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8b5a2b]/30 to-transparent hidden md:block"></div>
                                <div className="flex items-center gap-3 mb-10 justify-center md:justify-start">
                                    <Sparkles className="text-[#8b0000]" size={28} />
                                    <h2 className="text-3xl md:text-4xl font-['Great_Vibes'] text-[#8b0000]">Nuestro Plan Mágico</h2>
                                </div>
                                <div className="space-y-10 pl-2 md:pl-4 border-l border-[#8b5a2b]/20 md:border-none">
                                    {[
                                        { time: "7:00 PM", title: "Paso por ti", desc: "Solo preocupate por sentirte hermosa.", icon: <CarFront size={20} /> },
                                        { time: "7:30 PM", title: "Destino Sorpresa", desc: "Un lugar lindo donde podremos pasarla lindo.", icon: <MapPin size={20} /> },
                                        { time: "9:00 PM", title: "Cena Romántica", desc: "Haciendo lo que más nos gusta.", icon: <UtensilsCrossed size={20} /> },
                                        { time: "11:00 PM", title: "Solo Tú y Yo", desc: "No necesitamos más.", icon: <Music size={20} /> },
                                    ].map((item, idx) => (
                                        <div key={idx} className="group flex gap-4 md:gap-6 items-start">
                                            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#fffbf2] border border-[#e6d2b5] flex items-center justify-center text-[#8b5a2b] shadow-sm group-hover:scale-110 group-hover:border-[#8b0000] group-hover:text-[#8b0000] transition-all duration-300">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <span className="font-['Cinzel'] text-xs font-bold text-[#8b5a2b] tracking-wider block mb-1">{item.time}</span>
                                                <h3 className="text-lg md:text-xl font-['Playfair_Display'] font-bold text-[#2c1810] leading-none mb-2">{item.title}</h3>
                                                <p className="text-[#5c4a40] text-sm italic font-light leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* BROMA UBICACION */}
                                <div className="mt-12 h-48 relative overflow-hidden rounded-sm border border-[#fff] shadow-sm group bg-white/60 backdrop-blur-sm cursor-help select-none">
                                    <div className="absolute inset-0 flex flex-col justify-center p-6 z-10 transition-opacity duration-300 group-hover:opacity-50">
                                        <div className="absolute top-2 right-2 opacity-20"><MapPin size={24} /></div>
                                        <p className="font-['Cinzel'] text-xs uppercase tracking-widest text-[#8b5a2b] mb-2 font-bold text-center">Ubicación Secreta</p>
                                        <div className="bg-black/5 p-3 rounded mb-2 backdrop-blur-md">
                                            <p className="text-lg md:text-xl font-['Playfair_Display'] font-bold text-[#2c1810] blur-[3px] group-hover:blur-[2px] transition-all text-center">Calle del Amor 123</p>
                                        </div>
                                        <p className="text-[10px] text-[#8b5a2b] uppercase tracking-wider animate-pulse text-center">(Pasa el mouse / toca para ver)</p>
                                    </div>
                                    <div className="absolute inset-0 z-20 bg-[#fdf6e3] flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2">
                                            <div className="absolute inset-0 rounded-full border-4 border-[#8b0000] shadow-lg overflow-hidden ">
                                                <img src="images/yanloca.jpeg" className="w-full h-full object-cover" alt="Foto graciosa" />
                                            </div>
                                        </div>
                                        <p className="text-lg md:text-xl text-[#8b0000] text-center leading-none px-4 font-bold">¡Ya pues enana cabezona, deja de ser chismosa!</p>
                                    </div>
                                </div>
                            </section>

                            {/* FOTOS */}
                            <section className="flex flex-col items-center justify-center h-full">
                                <div className="mb-8 text-center md:text-left w-full">
                                    <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                                        <Camera className="text-[#8b0000]" size={28} />
                                        <h2 className="text-3xl md:text-4xl font-['Great_Vibes'] text-[#8b0000]">Momentos</h2>
                                    </div>
                                    <p className="text-sm font-['Cinzel'] text-[#8b5a2b] text-center md:text-left">Toca para ver más</p>
                                </div>
                                <PhotoDeck />
                            </section>
                        </div>

                        {/* PREGUNTA INTERACTIVA */}
                        <div className="text-center mb-24 max-w-lg mx-auto px-4">
                            {!isAccepted ? (
                                <>
                                    <h2 className="text-4xl md:text-6xl font-['Great_Vibes'] text-[#5c3a21] mb-8 leading-tight">¿Aceptas esta invitación?</h2>
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center relative h-40 md:h-32">
                                        <button onClick={handleAccept} className="bg-[#8b0000] text-white px-10 py-4 rounded-xl font-['Cinzel'] font-bold text-lg shadow-xl flex items-center justify-center gap-3 z-20 w-full md:w-auto"><Check size={24} /> ¡SÍ, ACEPTO!</button>
                                        <motion.button animate={{ x: noBtnPosition.x, y: noBtnPosition.y }} onHoverStart={moveNoButton} onClick={moveNoButton} className="bg-[#e6d2b5] text-[#8b5a2b] px-8 py-4 rounded-xl font-['Cinzel'] font-bold text-lg shadow-sm flex items-center justify-center gap-2 z-10 w-full md:w-auto md:relative"><X size={20} /> Mmm... No</motion.button>
                                    </div>
                                </>
                            ) : (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-6 bg-[#fffbf2] border border-[#d4b483] rounded-lg shadow-md mx-auto max-w-xs md:max-w-md">
                                    <p className="text-2xl md:text-3xl font-['Great_Vibes'] text-[#8b0000]">¡Sabía que dirías que sí! ❤️</p>
                                    <p className="text-sm font-['Cinzel'] text-[#5c3a21] mt-2 italic">Prepara tu mejor outfit.</p>
                                </motion.div>
                            )}
                        </div>

                        {/* CARTA FINAL */}
                        <section id="final-letter" className="max-w-2xl mx-auto mt-20 relative pb-10">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#fdf6e3]/80 rotate-1 backdrop-blur-md shadow-sm border border-white/50 z-20"></div>
                            <div className="bg-[#fffdf9] p-8 md:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rotate-1 border border-gray-100 relative rounded-sm">
                                <div className="flex justify-center mb-8 relative z-10">
                                    <div className="relative transform rotate-2">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#e6d2b5]/60 -rotate-2 backdrop-blur-sm shadow-sm z-20"></div>
                                        <div className="bg-white p-2 pb-8 shadow-md border border-gray-200 w-32 md:w-48">
                                            <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
                                                <img src="images/image_4.jpeg" alt="Carta" className="w-full h-full object-cover sepia-[20%]" />
                                                <div className="absolute inset-0 bg-gradient-to-tr from-orange-100/20 to-transparent pointer-events-none"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-['Great_Vibes'] text-3xl md:text-4xl text-[#8b0000] mb-6 text-center">Para ti...</h3>
                                <p className="font-['Playfair_Display'] text-base md:text-lg text-[#4a3b32] leading-relaxed text-center italic">
                                    "No necesito una fecha especial para recordarte lo mucho que te amo, se que tengo defectos pero intento ser mejor cada día por ti, por nosotros. Gracias por ser mi compañera de vida, mi confidente y mi mejor amiga. Eres el regalo más hermoso que la vida me ha dado, y cada momento a tu lado es un tesoro que guardo con cariño en mi corazón. Te amo más de lo que las palabras pueden expresar, y estoy emocionado por seguir construyendo nuestro futuro juntos.<br/><br/>
                                    Gracias por permitirme volverte a enamorar, y creeme que quiero seguir haciéndolo cada día de mi vida. Eres mi todo, Yannel Valiente Ñañez."
                                </p>
                                <div className="mt-8 text-center"><Heart className="inline-block fill-[#8b0000] text-[#8b0000] animate-pulse" size={20} /></div>
                            </div>
                        </section>

                        <footer className="text-center mt-10 text-[#8b5a2b]/40 text-[10px] md:text-xs font-['Cinzel'] tracking-widest uppercase">Para Yannel Valiente Ñañez, con todo mi amor.</footer>
                    </main>
                </motion.div>
            )}
        </div>
    );
}

export default App;