import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Animated Text Component
 * 
 * Wraps text with animation effects like fade-in, slide-up, stagger.
 * Supports different animation variants for headings and paragraphs.
 */

export type AnimationVariant = 'fadeIn' | 'slideUp' | 'slideRight' | 'slideLeft' | 'scale';

interface AnimatedTextProps {
    children: ReactNode;
    variant?: AnimationVariant;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

const AnimatedText = ({
    children,
    variant = 'fadeIn',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true
}: AnimatedTextProps) => {
    // Animation variants
    const variants = {
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        slideUp: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
        },
        slideRight: {
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0 }
        },
        slideLeft: {
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0 }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-100px' }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }}
            variants={variants[variant]}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedText;
