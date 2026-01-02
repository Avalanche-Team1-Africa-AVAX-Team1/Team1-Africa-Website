import React from 'react';

interface LogoMaskProps {
    className?: string;
}

/**
 * LogoMask Component
 * 
 * Creates a mask for the video to show through the logo outline.
 * Uses the T1 logo SVG paths as an inline SVG with stroke-only rendering.
 * The logo is displayed as an outline only (no fill) so video plays inside.
 */
// Increased responsive sizes for better visibility
export const LogoMask: React.FC<LogoMaskProps> = ({
    className = "w-[85vw] h-[60vh] md:w-[70vw] md:h-[60vh] lg:w-[60vw] lg:h-[70vh] xl:w-[50vw] xl:h-[75vh] 2xl:w-[45vw] 2xl:h-[80vh] max-w-[900px] max-h-[900px]"
}) => {
    // We combine all logo paths and a large rectangle to create a "cutout" effect (hole punch).
    // The huge rectangle covers the screen, and the logo paths cut holes in it.
    const boundingBox = "M-10000,-10000 L10000,-10000 L10000,10000 L-10000,10000 Z";

    // Concatenated paths from the original logo
    const p1 = "M86.1461 876.876C64.7627 876.876 43.4102 877.031 22.0268 876.845C2.4975 876.66 -5.135 863.478 4.62966 846.366C77.7411 718.263 150.945 590.222 224.242 462.242C233.512 446.059 248.746 445.874 258.078 461.964C280.08 499.807 301.772 537.867 323.31 575.988C331.035 589.634 330.819 603.682 322.97 617.421C277.577 696.882 232.153 776.343 186.697 855.773C178.663 869.79 166.55 876.969 150.234 876.907C128.851 876.814 107.499 876.907 86.1152 876.907L86.1461 876.876Z";
    const p2 = "M391.076 876.938C365.459 876.938 339.811 877.062 314.194 876.907C293.274 876.783 285.92 863.726 296.519 845.469C321.641 802.242 346.856 759.046 372.195 715.912C383.319 697.006 398.708 696.975 409.771 715.819C435.078 758.953 460.293 802.118 485.447 845.376C496.231 863.911 488.63 876.845 466.968 876.938C441.66 877.031 416.352 876.938 391.076 876.938Z";
    const p3 = "M859.844 19.4035V415.565C859.844 424.189 852.855 431.188 844.242 431.188H713.189C704.577 431.188 697.588 424.189 697.588 415.565V178.099C697.588 169.476 690.598 162.477 681.986 162.477H591.497C582.885 162.477 575.896 155.478 575.896 146.854V15.6228C575.896 6.999 582.885 0 591.497 0H840.467C851.17 0 859.844 8.68626 859.844 19.4035Z";
    const p4 = "M860 729.646V860.877C860 869.501 853.011 876.5 844.398 876.5H674.185C566.566 876.5 479.322 789.138 479.322 681.372V464.059C479.322 455.435 472.332 448.436 463.72 448.436H374.386C365.773 448.436 358.784 441.437 358.784 432.814V301.582C358.784 292.959 365.773 285.96 374.386 285.96H463.72C472.332 285.96 479.322 278.961 479.322 270.337V235.967C479.322 227.343 486.311 220.344 494.923 220.344H625.976C634.589 220.344 641.578 227.343 641.578 235.967V676.341C641.578 697.151 658.428 714.023 679.209 714.023H844.398C853.011 714.023 860 721.022 860 729.646Z";

    return (
        <div
            className={className}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                // Transparent background so we can see what we're doing, 
                // but effectively the SVG fills the space.
            }}
        >
            <svg
                viewBox="0 0 860 877"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    height: '90%',
                    overflow: 'visible' // Allow the bounding box to go outside
                }}
            >
                {/* 
                  Cutout Path:
                  Fill Rule 'evenodd' means:
                   - Bounding Box filled
                   - Overlapping Logo Paths (inside box) -> Holes (Transparent)
                */}
                <path
                    d={`${boundingBox} ${p1} ${p2} ${p3} ${p4}`}
                    fill="#F8FAFC"
                    stroke="none"
                    fillRule="evenodd"
                />
            </svg>
        </div>
    );
};

/**
 * LogoOutline Component
 * 
 * Creates the outline stroke layer on top using inline SVG with stroke only.
 */
export const LogoOutline: React.FC<LogoMaskProps> = ({
    className = "w-[85vw] h-[60vh] md:w-[70vw] md:h-[60vh] lg:w-[60vw] lg:h-[70vh] xl:w-[50vw] xl:h-[75vh] 2xl:w-[45vw] 2xl:h-[80vh] max-w-[900px] max-h-[900px]"
}) => {
    return (
        <div
            className={className}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
            }}
        >
            {/* Red outline stroke using inline SVG */}
            <svg
                viewBox="0 0 860 877"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    height: '90%',
                }}
            >
                {/* T1 Logo paths - stroke only, no fill for outline effect */}
                <path
                    d="M86.1461 876.876C64.7627 876.876 43.4102 877.031 22.0268 876.845C2.4975 876.66 -5.135 863.478 4.62966 846.366C77.7411 718.263 150.945 590.222 224.242 462.242C233.512 446.059 248.746 445.874 258.078 461.964C280.08 499.807 301.772 537.867 323.31 575.988C331.035 589.634 330.819 603.682 322.97 617.421C277.577 696.882 232.153 776.343 186.697 855.773C178.663 869.79 166.55 876.969 150.234 876.907C128.851 876.814 107.499 876.907 86.1152 876.907L86.1461 876.876Z"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                />
                <path
                    d="M391.076 876.938C365.459 876.938 339.811 877.062 314.194 876.907C293.274 876.783 285.92 863.726 296.519 845.469C321.641 802.242 346.856 759.046 372.195 715.912C383.319 697.006 398.708 696.975 409.771 715.819C435.078 758.953 460.293 802.118 485.447 845.376C496.231 863.911 488.63 876.845 466.968 876.938C441.66 877.031 416.352 876.938 391.076 876.938Z"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                />
                <path
                    d="M859.844 19.4035V415.565C859.844 424.189 852.855 431.188 844.242 431.188H713.189C704.577 431.188 697.588 424.189 697.588 415.565V178.099C697.588 169.476 690.598 162.477 681.986 162.477H591.497C582.885 162.477 575.896 155.478 575.896 146.854V15.6228C575.896 6.999 582.885 0 591.497 0H840.467C851.17 0 859.844 8.68626 859.844 19.4035Z"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                />
                <path
                    d="M860 729.646V860.877C860 869.501 853.011 876.5 844.398 876.5H674.185C566.566 876.5 479.322 789.138 479.322 681.372V464.059C479.322 455.435 472.332 448.436 463.72 448.436H374.386C365.773 448.436 358.784 441.437 358.784 432.814V301.582C358.784 292.959 365.773 285.96 374.386 285.96H463.72C472.332 285.96 479.322 278.961 479.322 270.337V235.967C479.322 227.343 486.311 220.344 494.923 220.344H625.976C634.589 220.344 641.578 227.343 641.578 235.967V676.341C641.578 697.151 658.428 714.023 679.209 714.023H844.398C853.011 714.023 860 721.022 860 729.646Z"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                />
            </svg>
        </div>
    );
};
