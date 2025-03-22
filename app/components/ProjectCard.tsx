import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
    tags: string[];
    appUrl: string | null;
}

export default function ProjectCard({ title, description, imageUrl, projectUrl, tags, appUrl }: ProjectCardProps) {
    return (
        <div className="flex flex-col justify-between bg-white rounded-lg shadow-blue-50 shadow-2xl transition-all duration-300 hover:scale-110 group hover:z-40 hover:shadow-2xl z-10 h-full w-full max-w-[320px]">
            <span className="absolute opacity-0 bg-white p-2 rounded-lg max-w-[320px] w-full shadow-blue-50 shadow-lg font-semibold self-center group-hover:-translate-y-12 group-hover:z-50 group-hover:opacity-100 transition-all duration-300 ease-in-out">Cliquez sur l'image pour ouvrir le projet</span>
            <div className="overflow-hidden rounded-lg">
                <div className="relative h-fit w-full text-center border-b border-blue-50 shadow-blue-50 shadow-lg aspect-[16/9]">
                    <Image
                        src={imageUrl}
                        alt={title}
                        height={1600}
                        width={900}
                        className={`${appUrl ? "cursor-pointer" : ""} object-cover rounded-b-lg aspect-[16/9] hover:scale-110 transition-transform duration-300`}
                        onClick={() => {
                            if (appUrl) {
                                window.open(appUrl, "_blank");
                            }
                        }}
                        title={appUrl ? "Ouvrir le projet" : ""}
                    />
                </div>
                <div className="pt-6 px-6 select-none">
                    <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
                    <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: description }} />

                </div>
            </div>
            <div className="p-6 pt-0 flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:scale-105 shadow-lg shadow-blue-50 transition-transform duration-300 cursor-pointer"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                {projectUrl.includes("https") ?

                    <Link href={projectUrl} target="_blank" className="flex items-center text-blue-500 hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-1" viewBox="0 0 24 24">
                            <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.289 9.394 7.86 10.914.575.107.785-.25.785-.557 0-.274-.01-1.006-.015-1.973-3.196.694-3.87-1.54-3.87-1.54-.522-1.326-1.275-1.679-1.275-1.679-1.042-.712.08-.697.08-.697 1.15.081 1.754 1.182 1.754 1.182 1.024 1.755 2.687 1.247 3.343.953.104-.74.401-1.247.729-1.534-2.55-.29-5.227-1.275-5.227-5.675 0-1.254.445-2.279 1.175-3.085-.118-.29-.51-1.456.112-3.037 0 0 .958-.307 3.137 1.174a10.98 10.98 0 012.856-.386c.97.005 1.949.131 2.856.386 2.178-1.48 3.134-1.174 3.134-1.174.625 1.582.233 2.747.115 3.037.73.806 1.175 1.831 1.175 3.085 0 4.41-2.682 5.38-5.24 5.667.413.354.78 1.058.78 2.135 0 1.543-.014 2.787-.014 3.164 0 .31.206.67.79.556C20.715 21.393 24 17.087 24 12 24 5.648 18.352.5 12 .5z" />
                        </svg>
                        <span className="text-sm sm:text-base">Voir le projet sur GitHub</span>
                    </Link>
                    :
                    <span className="flex items-center text-blue-500 hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-1" viewBox="0 0 24 24">
                            <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.289 9.394 7.86 10.914.575.107.785-.25.785-.557 0-.274-.01-1.006-.015-1.973-3.196.694-3.87-1.54-3.87-1.54-.522-1.326-1.275-1.679-1.275-1.679-1.042-.712.08-.697.08-.697 1.15.081 1.754 1.182 1.754 1.182 1.024 1.755 2.687 1.247 3.343.953.104-.74.401-1.247.729-1.534-2.55-.29-5.227-1.275-5.227-5.675 0-1.254.445-2.279 1.175-3.085-.118-.29-.51-1.456.112-3.037 0 0 .958-.307 3.137 1.174a10.98 10.98 0 012.856-.386c.97.005 1.949.131 2.856.386 2.178-1.48 3.134-1.174 3.134-1.174.625 1.582.233 2.747.115 3.037.73.806 1.175 1.831 1.175 3.085 0 4.41-2.682 5.38-5.24 5.667.413.354.78 1.058.78 2.135 0 1.543-.014 2.787-.014 3.164 0 .31.206.67.79.556C20.715 21.393 24 17.087 24 12 24 5.648 18.352.5 12 .5z" />
                        </svg>
                        <span className="text-sm sm:text-base">Ce projet n'est pas open source</span>
                    </span>
                }
            </div>
        </div>
    );
}
