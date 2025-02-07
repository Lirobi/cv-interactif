import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    technologies: string[];
}

export default function ProjectCard({ title, description, imageUrl, projectUrl, technologies }: ProjectCardProps) {
    return (
        <Link href={projectUrl} target="_blank" className="group">
            <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 m-4 w-80">
                <div className="relative h-48 w-full text-center">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="mt-4">
                        <Link href={projectUrl} target="_blank" className="flex items-center text-blue-500 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-1" viewBox="0 0 24 24">
                                <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.289 9.394 7.86 10.914.575.107.785-.25.785-.557 0-.274-.01-1.006-.015-1.973-3.196.694-3.87-1.54-3.87-1.54-.522-1.326-1.275-1.679-1.275-1.679-1.042-.712.08-.697.08-.697 1.15.081 1.754 1.182 1.754 1.182 1.024 1.755 2.687 1.247 3.343.953.104-.74.401-1.247.729-1.534-2.55-.29-5.227-1.275-5.227-5.675 0-1.254.445-2.279 1.175-3.085-.118-.29-.51-1.456.112-3.037 0 0 .958-.307 3.137 1.174a10.98 10.98 0 012.856-.386c.97.005 1.949.131 2.856.386 2.178-1.48 3.134-1.174 3.134-1.174.625 1.582.233 2.747.115 3.037.73.806 1.175 1.831 1.175 3.085 0 4.41-2.682 5.38-5.24 5.667.413.354.78 1.058.78 2.135 0 1.543-.014 2.787-.014 3.164 0 .31.206.67.79.556C20.715 21.393 24 17.087 24 12 24 5.648 18.352.5 12 .5z" />
                            </svg>
                            <span>Voir le projet sur GitHub</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Link>
    );
}
