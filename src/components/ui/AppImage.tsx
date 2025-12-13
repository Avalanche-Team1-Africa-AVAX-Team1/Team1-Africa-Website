import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '../../lib/utils'; // Assuming utils exists, if not I'll standard clsx

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    srcWebp?: string; // Optional WebP source
    priority?: boolean; // If true, eager load (no lazy)
    placeholderColor?: string; // Color to show while loading
    aspectRatio?: string; // e.g., "16/9", "4/3"
}

const AppImage: React.FC<AppImageProps> = ({
    src,
    alt,
    className,
    srcWebp,
    priority = false,
    placeholderColor = '#f0f0f0',
    style,
    width,
    height,
    aspectRatio,
    ...props
}) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        skip: priority, // Don't use observer if priority is true
    });

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // If priority is true, we always consider it "in view"
    const shouldLoad = priority || inView;

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        console.error(`Failed to load image: ${src}`);
    };

    // Calculate dynamic styles
    const containerStyle: React.CSSProperties = {
        backgroundColor: isLoaded ? 'transparent' : placeholderColor,
        ...style,
    };

    // If aspectRatio is not explicitly provided, but width/height are, try to calculate it
    if (!aspectRatio && width && height && typeof width === 'number' && typeof height === 'number') {
        containerStyle.aspectRatio = `${width} / ${height}`;
    } else if (aspectRatio) {
        containerStyle.aspectRatio = aspectRatio;
    }

    return (
        <div
            ref={ref}
            className={cn("relative overflow-hidden transition-colors duration-300", className)}
            style={containerStyle}
        >
            {shouldLoad && (
                <picture>
                    {srcWebp && <source srcSet={srcWebp} type="image/webp" />}
                    <img
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        loading={priority ? 'eager' : 'lazy'}
                        decoding={priority ? 'sync' : 'async'}
                        onLoad={handleLoad}
                        onError={handleError}
                        className={cn(
                            "w-full h-full object-cover transition-opacity duration-500",
                            isLoaded ? "opacity-100" : "opacity-0",
                            // If explicit aspect ratio not set on container, rely on img
                            // But we handled container style above.
                        )}
                        {...props}
                    />
                </picture>
            )}

            {/* Fallback Error State */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                    Failed to load
                </div>
            )}
        </div>
    );
};

export default AppImage;
