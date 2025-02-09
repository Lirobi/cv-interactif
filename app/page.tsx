"use client";
import DeveloppableSection from "./components/DeveloppableSection";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function Home() {

    const [rubriques, setRubriques] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRubriques = async () => {
            try {
                const rubriques = await fetch("/api/pagecontent/homepage");
                const rubriquesData = await rubriques.json();
                setRubriques(rubriquesData);
            } catch (error) {
                console.error("Erreur lors de la récupération des rubriques :", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRubriques();
    }, []);

    return (
        <div className="min-h-screen w-screen flex flex-col">
            <Header />
            <main className="w-full flex-grow pt-10">
                <div className="flex flex-col items-center gap-10 py-10 w-full">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 max-md:border-foreground border-white "></div>
                        </div>
                    ) : (
                        rubriques.map((rubrique: any) => (
                            <DeveloppableSection key={rubrique.id} title={rubrique.name} justify="text-justify" defaultOpen={rubrique.visible} content={rubrique.content} />
                        ))
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
