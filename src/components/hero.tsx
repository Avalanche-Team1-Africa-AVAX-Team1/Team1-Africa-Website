import React from 'react';

/**
 * Hero Component
 * 
 * Full-screen hero section for the main page.
 * Height is calculated to fill the viewport (100vh).
 * The navbar is fixed and overlays this section, so no need to subtract its height.
 */
const Hero: React.FC = () => {
    return (
        <section className="relative w-full h-screen flex items-center justify-center bg-b">
            {/* Placeholder content - ready for your hero design */}
            <div className="text-center text-white">
                {/* Your hero content will go here */}
            </div>
        </section>
    );
};

export default Hero;
