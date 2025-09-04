import { useState } from 'react';

const TestimonialSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            name: "Samuel Oliver",
            handle: "@oliesamuel",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            text: "I'm not even in Web3, but after attending one event, I'm thinking of switching careers.",
            time: "3:23 AM",
            date: "Aug 12",
            team: "Team1 Africa"
        },
        {
            name: "Amara Johnson",
            handle: "@amaratech",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            text: "The community here is incredible. I've learned more in 3 months than I did in 2 years of self-study.",
            time: "5:45 PM",
            date: "Aug 15",
            team: "Team1 Africa"
        },
        {
            name: "David Chen",
            handle: "@davidbuilds",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            text: "From zero to launching my first dApp. The mentorship program changed everything for me.",
            time: "11:20 AM",
            date: "Aug 18",
            team: "Team1 Africa"
        },
        {
            name: "Fatima Ali",
            handle: "@fatimadesigns",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            text: "As an artist, I never thought I'd understand blockchain. Now I'm minting my own NFTs!",
            time: "2:15 PM",
            date: "Aug 20",
            team: "Team1 Africa"
        }
    ];


    return (
        <div className="w-full overflow-hidden mt-16">


            {/* Background Design - WALL OF LOVE text behind card */}
            <div className="relative pt-40">
                <div className="flex items-center justify-center pointer-events-none leading-none">
                    <h1 className="text-[150px] tracking-[-1rem] text-black select-none whitespace-nowrap" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                        WALL OF <span className="text-red-500">LOVE</span>
                    </h1>
                </div>
                {/* Testimonies Badge */}
                <div className="flex justify-center items-center absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-red-500 px-4 py-2 rounded-lg text-sm font-bold transform -rotate-12">
                        Testimonies
                    </span>
                </div>
            </div>



            {/* Testimonial Cards Container */}
            <div className="relative w-full flex items-center justify-center py-2 translate-y-[-30%] transform rotate-[-5deg]">
                <div className="relative w-[35%] h-[20rem]">
                    {testimonials.map((testimonial, index) => {
                        const isActive = index === currentSlide;

                        return (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    }`}
                            >
                                {/* Card Stack Effect */}
                                <div className="absolute inset-0 bg-white rounded-2xl border-2 border-black transform rotate-1 translate-x-1 translate-y-1"></div>
                                <div className="absolute inset-0 bg-white rounded-2xl border-2 border-black transform -rotate-1 translate-x-0.5 translate-y-0.5"></div>

                                {/* Main Card */}
                                <div className="relative bg-white rounded-2xl border-2 border-black p-6 shadow-lg h-full flex flex-col justify-center">
                                    {/* Twitter X Icon */}
                                    <div className="absolute top-4 right-4">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </div>

                                    {/* User Info */}
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full mr-3"
                                        />
                                        <div>
                                            <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                            <p className="text-gray-500 text-sm">{testimonial.handle}</p>
                                        </div>
                                    </div>

                                    {/* Testimonial Text */}
                                    <p className="text-gray-900 text-lg mb-4 leading-relaxed">
                                        {testimonial.text}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center text-gray-400 text-sm">
                                        <span>{testimonial.time}</span>
                                        <span className="mx-2">•</span>
                                        <span>{testimonial.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>{testimonial.team}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                            ? 'bg-red-500 scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    />
                ))}
            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-4 right-8 text-gray-400 text-sm">
                Scroll to see more testimonials
            </div>
        </div>
    );
};

export default TestimonialSlider;