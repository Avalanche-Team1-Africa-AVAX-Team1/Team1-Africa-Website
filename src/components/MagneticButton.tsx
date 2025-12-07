import { useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Magnetic Button Component
 * 
 * Button that follows the cursor within a magnetic radius.
 * Creates a premium, interactive feel.
 */

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    magneticRadius?: number;
    magneticStrength?: number;
    disabled?: boolean;
}

const MagneticButton = ({
    children,
    className = '',
    onClick,
    magneticRadius = 100,
    magneticStrength = 0.3,
    disabled = false
}: MagneticButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;

        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < magneticRadius) {
            setPosition({
                x: deltaX * magneticStrength,
                y: deltaY * magneticStrength
            });
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={buttonRef}
            className={className}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 0.1
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
};

export default MagneticButton;
