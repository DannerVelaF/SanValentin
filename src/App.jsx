import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart, MapPin, CarFront, Sparkles, UtensilsCrossed,
    Music, MailOpen, Camera, ArrowRight, Check, X, CalendarHeart
} from "lucide-react";

const Confetti = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden w-full h-full">
            {[...Array(70)].map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-3 h-3 md:w-4 md:h-4 rounded-full ${['bg-red-500', 'bg-pink-400', 'bg-gold-400', 'bg-white', 'bg-rose-600'].sort(() => 0.5 - Math.random())[0]}`}
                    style={{ left: `${Math.random() * 100}%`, top: -20 }}
                    initial={{ opacity: 1, scale: Math.random() * 0.5 + 0.5 }}
                    animate={{ top: "110vh", rotate: Math.random() * 720, x: Math.random() * 100 - 50 }}
                    transition={{ duration: Math.random() * 3 + 3, ease: "linear", repeat: Infinity, delay: Math.random() * 5 }}
                />
            ))}
        </div>
    );
};

// RUTAS CORREGIDAS SEGÚN TU PROYECTO (image_1.jpeg, etc.)
const MEMORIES = [
    { id: 1, text: "Nuestra primera cita", rotate: -2, src: "images/image_1.jpeg" },
    { id: 2, text: "Ese viaje inolvidable", rotate: 3, src: "images/image_2.jpeg" },
    { id: 3, text: "Tu sonrisa favorita", rotate: -4, src: "images/image_3.jpeg" },
    { id: 4, text: "Un detalle hermoso", rotate: 2, src: "images/image_4.jpeg" },
    { id: 5, text: "Atardecer juntos", rotate: -3, src: "images/image_5.jpeg" },
    { id: 6, text: "Siempre nosotros", rotate: 4, src: "images/image_6.jpeg" },
];

const Envelope = ({ onOpen }) => (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1a100c] text-[#f3e6d5] p-4" exit={{ opacity: 0, y: -50 }}>
        <p className="mb-8 font-['Cinzel'] tracking-[0.3em] uppercase text-xs opacity-60 animate-pulse text-center text-[#4a3b32]">Alejandro te ha enviado algo...</p>
        <motion.div whileHover={{ scale: 1.05 }} onClick={onOpen} className="cursor-pointer relative w-full max-w-[320px]">
            <div className="w-full aspect-[1.6/1] bg-[#e6d2b5] rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden border border-[#ccbfa3]">
                <div className="absolute top-0 left-0 w-full h-full border-l-[160px] border-r-[160px] border-t-[120px] border-l-transparent border-r-transparent border-t-[#d4b483] z-10 origin-top transition-transform duration-700 group-hover:rotate-x-180"></div>
                <div className="z-20 w-16 h-16 bg-[#8b0000] rounded-full flex items-center justify-center shadow-lg border-4 border-[#6d0000]"><Heart className="text-[#e6d2b5] fill-[#e6d2b5]" size={24} /></div>
            </div>
        </motion.div>
        <p className="mt-10 font-['Playfair_Display'] italic text-[#4a3b32]/60 text-sm">(Toca el sello)</p>
    </motion.div>
);

const PhotoDeck = () => {
    const [index, setIndex] = useState(0);
    const nextPhoto = () => setIndex((prev) => (prev + 1) % MEMORIES.length);
    return (
        <div className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center" onClick={nextPhoto}>
            <AnimatePresence mode="popLayout">
                {MEMORIES.map((photo, i) => i === index && (
                    <motion.div key={photo.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1, rotate: photo.rotate }} exit={{ x: 200, opacity: 0 }} className="absolute w-60 md:w-72 aspect-[3/4] p-3 bg-white shadow-2xl border border-gray-100 rounded-sm cursor-pointer" style={{ zIndex: 10 }}>
                        <div className="w-full h-[85%] bg-gray-100 overflow-hidden relative">
                            <img src={photo.src} className="w-full h-full object-cover" />
                        </div>
                        <div className="h-[15%] flex items-end justify-center pb-1 font-['Great_Vibes'] text-xl">{photo.text}</div>
                    </motion.div>
                ))}
            </AnimatePresence>
            <div className="absolute bottom-0 right-4 md:right-20 animate-bounce text-[#8b5a2b] flex items-center gap-2 text-xs font-['Cinzel']">Siguiente <ArrowRight size={14}/></div>
        </div>
    );
};

function App() {
    const targetDate = new Date("2026-02-14T18:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = targetDate - now;
            if (diff > 0) setTimeLeft({ dias: Math.floor(diff / 86400000), horas: Math.floor((diff / 3600000) % 24), minutos: Math.floor((diff / 60000) % 60), segundos: Math.floor((diff / 1000) % 60) });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const patternSVG = `data:image/svg+xml,%3Csvg width='300' height='300' viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.text%7Bfill:%238b5a2b;font-family:'Times New Roman',serif;font-style:italic;font-size:20px;opacity:0.1;%7D.heart%7Bfill:%238b0000;opacity:0.05;%7D%3C/style%3E%3Cg transform='rotate(-20 150 150)'%3E%3Ctext x='30' y='50' class='text'%3EYannel%3C/text%3E%3Ctext x='150' y='120' class='text'%3EAlejandro%3C/text%3E%3Cpath d='M100,80 C100,100 120,100 120,80 C120,60 100,60 100,80' class='heart' transform='scale(0.5)'/%3E%3C/g%3E%3C/svg%3E`;

    return (
        <div className="min-h-screen relative text-[#4a3b32] font-serif overflow-x-hidden bg-[#f5e6d3]">
            {isAccepted && <Confetti />}
            <AnimatePresence>{!isEnvelopeOpen && <Envelope onOpen={() => setIsEnvelopeOpen(true)} />}</AnimatePresence>

            {isEnvelopeOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <div className="fixed inset-0 z-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[#f4e4bc]"></div>
                        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('imagen.jpg')" }}></div>
                        <div className="absolute inset-0" style={{ backgroundImage: `url("${patternSVG}")`, backgroundSize: '300px 300px' }}></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(80,50,20,0.3)_100%)]"></div>
                    </div>

                    <main className="max-w-6xl mx-auto px-4 py-12 relative z-10">
                        <header className="text-center mb-16">
                            <h1 className="text-5xl md:text-8xl font-['Great_Vibes'] text-[#5c3a21] mb-6">¿Serías mi San Valentín?</h1>
                            <p className="text-lg md:text-2xl italic">Alejandro ❧ Yannel</p>
                            <div className="mt-8 flex items-center justify-center gap-2 text-[#8b0000] font-['Cinzel'] font-bold text-xl">
                                <CalendarHeart /> 14 de Febrero, 2026
                            </div>
                        </header>

                        <div className="flex justify-center gap-4 md:gap-8 mb-24">
                            {Object.entries(timeLeft).map(([unit, val]) => (
                                <div key={unit} className="text-center">
                                    <span className="block text-3xl md:text-5xl font-['Cinzel'] font-bold">{String(val).padStart(2, '0')}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-[#8b5a2b]">{unit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
                            <section>
                                <h2 className="text-3xl md:text-4xl font-['Great_Vibes'] text-[#8b0000] mb-10">Nuestro Plan Mágico</h2>
                                <div className="space-y-10 pl-4 border-l border-[#8b5a2b]/20">
                                    {[{ time: "7:00 PM", title: "Paso por ti", icon: <CarFront /> }, { time: "7:30 PM", title: "Destino Sorpresa", icon: <MapPin /> }, { time: "9:00 PM", title: "Cena Romántica", icon: <UtensilsCrossed /> }].map((item, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="bg-[#fffbf2] p-3 rounded-full shadow-sm text-[#8b5a2b]">{item.icon}</div>
                                            <div><span className="text-xs font-bold font-['Cinzel']">{item.time}</span><h3 className="text-lg font-bold">{item.title}</h3></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-12 h-48 relative overflow-hidden rounded-sm border border-white shadow-sm group bg-white/60 backdrop-blur-sm cursor-help">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:opacity-0 transition-opacity">
                                        <MapPin className="text-[#8b0000] mb-2" /><p className="font-['Cinzel'] text-xs">Ubicación Secreta</p>
                                    </div>
                                    <div className="absolute inset-0 bg-[#fdf6e3] translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center justify-center p-4">
                                        <img src="images/yanloca.jpeg" className="w-20 h-20 rounded-full object-cover border-4 border-[#8b0000] mb-2" />
                                        <p className="text-[#8b0000] font-bold text-center">¡Ya pues enana cabezona, deja de ser chismosa!</p>
                                    </div>
                                </div>
                            </section>

                            <section className="flex flex-col items-center"><PhotoDeck /></section>
                        </div>

                        <div className="text-center mb-24">
                            {!isAccepted ? (
                                <>
                                    <h2 className="text-4xl md:text-6xl font-['Great_Vibes'] mb-8">¿Aceptas esta invitación?</h2>
                                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center h-40 relative">
                                        <button onClick={handleAccept} className="bg-[#8b0000] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl flex items-center gap-3 z-20"><Check /> ¡SÍ, ACEPTO!</button>
                                        <motion.button animate={{ x: noBtnPosition.x, y: noBtnPosition.y }} onHoverStart={() => setNoBtnPosition({ x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 })} className="bg-[#e6d2b5] text-[#8b5a2b] px-8 py-4 rounded-xl font-bold text-lg shadow-sm md:relative"><X /> No</motion.button>
                                    </div>
                                </>
                            ) : (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-10 bg-[#fffbf2] border border-[#d4b483] rounded-lg shadow-xl">
                                    <p className="text-4xl font-['Great_Vibes'] text-[#8b0000]">¡Sabía que dirías que sí! ❤️</p>
                                </motion.div>
                            )}
                        </div>

                        <section id="final-letter" className="max-w-2xl mx-auto mt-20 relative">
                            <div className="bg-[#fffdf9] p-10 shadow-2xl border border-gray-100 rounded-sm">
                                <div className="flex justify-center mb-8">
                                    <div className="bg-white p-2 shadow-md border border-gray-200 w-40 transform rotate-3">
                                        <img src="images/image_4.jpeg" className="w-full aspect-[3/4] object-cover sepia-[20%]" />
                                    </div>
                                </div>
                                <h3 className="text-3xl text-[#8b0000] text-center font-['Great_Vibes'] mb-6">Para ti...</h3>
                                <p className="text-lg italic text-center leading-relaxed">"No necesito una fecha especial para recordarte lo mucho que te amo... eres mi todo, Yannel Valiente Ñañez."</p>
                                <div className="mt-8 text-center text-[#8b0000] animate-pulse"><Heart size={40} className="inline fill-[#8b0000]" /></div>
                            </div>
                        </section>
                    </main>
                </motion.div>
            )}
        </div>
    );
}

export default App;