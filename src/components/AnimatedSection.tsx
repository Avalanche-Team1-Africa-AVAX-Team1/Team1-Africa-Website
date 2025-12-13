import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Animated Section Component
 * 
 * Wraps entire sections with entrance animations.
 * Supports stagger animations for child elements.
 */

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    staggerChildren?: number;
    once?: boolean;
}

const AnimatedSection = ({
    children,
    className = '',
    delay = 0,
    staggerChildren = 0.1,
    once = true
}: AnimatedSectionProps) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: staggerChildren
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-100px' }}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Export item variants for use in child components
export const AnimatedItem = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94] as const
            }
        }
    };

    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
