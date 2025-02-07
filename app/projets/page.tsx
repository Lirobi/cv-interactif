'use client'

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectsContainer from "../components/ProjectsContainer";

export default function ProjectsPage() {
    return (
        <div className="min-h-screen w-screen flex flex-col justify-between">
            <Header />
            <main className="flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center bg-background max-md:w-5/6 rounded-xl z-50 h-fit p-4 shadow-lg">
                    <h1 className="text-6xl font-bold text-foreground">Projets</h1>
                </div>
                <ProjectsContainer />
            </main>
            <Footer />
        </div>
    );
}