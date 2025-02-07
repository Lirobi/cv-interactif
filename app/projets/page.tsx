'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";

interface Project {
    id: string;
    name: string;
    desc: string;
    coverImg: string;
    githubUrl: string;
    TagOnProject: {
        tag: {
            name: string;
        };
    }[];
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="min-h-screen w-screen flex flex-col justify-between">
            <Header />
            <main className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center bg-background max-md:w-5/6 rounded-xl z-50 h-fit p-4 shadow-lg">
                    <h1 className="text-6xl font-bold text-foreground">Projets</h1>
                </div>
                <div className="projects-container flex flex-wrap justify-center gap-4 z-50">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        projects.map((project) => (
                            <ProjectCard
                                key={(project as Project).id}
                                title={(project as Project).name || "Untitled Project"}
                                description={(project as Project).desc || "No description"}
                                imageUrl={(project as Project).coverImg || "/default.png"}
                                projectUrl={(project as Project).githubUrl || "#"}
                                technologies={(project as Project).TagOnProject?.map((t: { tag: { name: string } }) => t.tag.name) || []}
                            />
                        ))
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}