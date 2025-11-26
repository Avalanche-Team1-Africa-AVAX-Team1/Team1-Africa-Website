import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [cursorText, setCursorText] = useState('');
    const [cursorVariant, setCursorVariant] = useState('default');
    const cursorRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for data-cursor attribute
            const cursorData = target.closest('[data-cursor]');
            const cursorType = target.closest('[data-cursor-type]');

            if (cursorData) {
                setCursorText(cursorData.getAttribute('data-cursor') || '');
                setCursorVariant('text');
            } else if (cursorType) {
                setCursorVariant(cursorType.getAttribute('data-cursor-type') || 'default');
                setCursorText('');
            } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setCursorVariant('hover');
                setCursorText('');
            } else {
                setCursorVariant('default');
                setCursorText('');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    const variants = {
        default: {
            height: 32,
            width: 32,
            backgroundColor: "rgba(239, 68, 68, 0.5)", // Red-500 with opacity
            border: "1px solid rgba(239, 68, 68, 0)",
            mixBlendMode: "difference" as const,
        },
        hover: {
            height: 64,
            width: 64,
            backgroundColor: "rgba(239, 68, 68, 0.8)",
            mixBlendMode: "difference" as const,
        },
        text: {
            height: 120,
            width: 120,
            backgroundColor: "#ef4444", // Solid red
            mixBlendMode: "normal" as const,
            color: "#fff",
        }
    };

    return (
        <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-center overflow-hidden backdrop-blur-sm"
            style={{
                x: cursorX,
                y: cursorY,
            }}
            variants={variants}
            animate={cursorVariant}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            <AnimatePresence mode='wait'>
                {cursorText && (
                    <motion.span
                        key={cursorText}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-white font-bold text-xs uppercase tracking-widest px-2"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CustomCursor;
