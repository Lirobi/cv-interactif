"use client"
import React, { useState, useRef, useEffect } from "react";

interface DeveloppableSectionProps {
    title: string;
    content: string; // Pass your HTML string here
    defaultOpen?: boolean; // Optionally, you can set the section to open by default
    justify?: string;
}

/**
 * DeveloppableSection component
 *
 * This component renders an expandable section similar to the "À propos de moi" section.
 * It displays a clickable header with the provided title and toggles the visibility
 * of the HTML content (using dangerouslySetInnerHTML) for custom styling.
 */
const DeveloppableSection: React.FC<DeveloppableSectionProps> = ({
    title,
    content,
    defaultOpen = false,
    justify = "justify-start",
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef<HTMLDivElement>(null);

    // Toggle the section's visibility
    const toggleSection = () => setIsOpen((prev) => !prev);


    return (
        <section className="developpable-section max-md:w-[90vw] w-[66vw] bg-background rounded-2xl p-10 max-sm:p-6 shadow-2xl shadow-blue-50 z-50">
            <header
                className="developpable-section__header tracking-wide w-full md:w-2/3 font-bold text-3xl max-sm:text-2xl cursor-pointer m-2 text-wrap"
                onClick={toggleSection}
            >
                <h2 className="flex items-center">
                    <span className="mr-2">{title}</span>
                    <svg
                        className={`flex-shrink-0 w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </h2>
            </header>

            <div
                ref={contentRef}
                className={`developpable-section__content max-md:text-lg max-sm:text-base text-xl m-2 overflow-hidden transition-[max-height] ease-in-out ${justify} ${isOpen ? 'duration-1000 max-h-fit' : 'max-h-0 duration-1000'
                    }`}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </section>
    );
};

export default DeveloppableSection;
