import { motion } from "framer-motion";
import { useState } from "react";

// Puedes reemplazar estas URLs con fotos reales de ustedes
const momentos = [
    { id: 1, title: "Nuestro primer paseo 🌹", rotate: -3 },
    { id: 2, title: "Esa sonrisa que amo 💕", rotate: 2 },
    { id: 3, title: "Juntos siempre 💌", rotate: -2 },
    { id: 4, title: "Recuerdos inolvidables ✨", rotate: 4 },
];

export default function Momentos() {
    const [active, setActive] = useState(null);

    return (
        <section className="py-10 text-center relative">
            <h2 className="text-5xl md:text-6xl font-['Great_Vibes'] mb-16 text-[#8b0000] drop-shadow-sm">
                Nuestros Momentos 📸
            </h2>

            <div className="flex flex-wrap justify-center gap-12 px-4">
                {momentos.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, type: "spring", stiffness: 50 }}
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                        onClick={() => setActive(active === item.id ? null : item.id)}
                        className="relative cursor-pointer group"
                        style={{ rotate: item.rotate }}
                    >
                        {/* Efecto de cinta adhesiva arriba */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#fdfbf7]/40 shadow-sm transform -rotate-2 z-20 backdrop-blur-[1px] border border-white/20"></div>

                        {/* La Polaroid */}
                        <div className="bg-white p-3 pb-12 shadow-[0_4px_15px_rgba(0,0,0,0.15)] w-64 transition-all duration-300 group-hover:shadow-[0_20px_25px_rgba(0,0,0,0.2)]">
                            {/* Marco de la foto con un color sepia suave de fondo si no hay foto */}
                            <div className="aspect-[4/5] bg-[#ece6da] overflow-hidden flex items-center justify-center relative">
                                {/* Aquí iría la etiqueta <img> real */}
                                <span className="text-[#8b5a2b]/40 font-['Cinzel'] text-sm">Foto {index + 1}</span>

                                {/* Efecto de brillo en la foto */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none"></div>
                            </div>

                            <div className="mt-4 font-['Great_Vibes'] text-2xl text-[#2c1810]">
                                {item.title}
                            </div>
                        </div>

                        {/* Mensaje oculto al hacer clic (Efecto de escribir detrás de la foto) */}
                        {active === item.id && (
                            <motion.div
                                layoutId="expand"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-[#fffdf5] flex items-center justify-center p-6 shadow-xl border border-[#d4b483] text-[#5c3a21] font-['Playfair_Display'] italic text-center z-30"
                            >
                                <p>"{item.title}"<br/><span className="text-sm not-italic mt-2 block text-[#8b5a2b]">14 de Febrero, 2026</span></p>
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}