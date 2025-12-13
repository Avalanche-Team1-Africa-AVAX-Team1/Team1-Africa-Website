import { useState } from 'react';
import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Ripple Effect Component
 * 
 * Creates a ripple animation on click.
 * Can be used as a wrapper or standalone.
 */

interface Ripple {
    id: number;
    x: number;
    y: number;
}

interface RippleEffectProps {
    children: React.ReactNode;
    className?: string;
    rippleColor?: string;
    duration?: number;
    onClick?: () => void;
}

const RippleEffect = ({
    children,
    className = '',
    rippleColor = 'rgba(239, 68, 68, 0.4)', // Red with opacity
    duration = 0.6,
    onClick
}: RippleEffectProps) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple: Ripple = {
            id: Date.now(),
            x,
            y
        };

        setRipples(prev => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, duration * 1000);

        // Call onClick if provided
        if (onClick) {
            onClick();
        }
    };

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onClick={handleClick}
        >
            {children}

            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.span
                        key={ripple.id}
                        initial={{
                            opacity: 1,
                            scale: 0,
                            x: ripple.x,
                            y: ripple.y
                        }}
                        animate={{
                            opacity: 0,
                            scale: 2.5
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            backgroundColor: rippleColor,
                            pointerEvents: 'none',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default RippleEffect;
