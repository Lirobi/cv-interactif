import Link from "next/link";
import DeveloppableSection from "./components/DeveloppableSection";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Header />
      <main className="w-full flex-grow pt-10">
        <div className="flex flex-col items-center gap-10 py-10 w-full">
          <DeveloppableSection title="A propos de moi" justify="text-justify" content={`

            <p class="tracking-wider">Etudiant en BUT informatique avec comme parcours "<i>Réalisation d'applications: conception, développement, validation</i>" à l'IUT Robert Schuman (<u>Illkirch-Graffenstaden</u>) je suis également un passioné de création de sites web et de développement de logiciel ce que vous pouvez bien-sûr observer dans la rubrique <a href="/projets" class="underline-animation font-bold">projets</a>. Actuellement, je suis à la recherche d'un stage qui me permettrait d'acquérir une certaine expérience dans le domaine professionnel mais aussi de valider ma deuxième année, je suis donc intéressé par une alternance pour l'année scolaire 2025-2026 (je possède par ailleurs le permis B).</p>
          
        `} />
          <DeveloppableSection title="Formation" content={`
        <div class="flex flex-col gap-4">
            <h2 class="text-2xl font-bold tracking-wider">BUT Informatique - Parcours Réalisation d'applications : conception, développement, validation</h2>
            
            <p class="text-lg tracking-wider">
                IUT Robert Schuman d'Illkirch-Graffenstaden
            </p>
            
            <p class="text-xl tracking-wider">
                <strong>Semestre 3 - Automne 2024</strong>
            </p>

            <div class="flex flex-col gap-2">
                <strong class="tracking-wider">Thèmes abordés :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span class="tracking-wider">Programmation système et réseaux (C)</span>
                            <span class="text-sm tracking-wider">(Fork, Thread, Execv, Signaux, Serveurs TCP, UDP, HTTP, Sockets...)</span>
                        </div>
                    </li>
                    
                    <li>
                        <div class="flex flex-col">
                            <span class="tracking-wider">Conception logicielle (Java)</span>
                            <span class="text-sm tracking-wider">(Patrons de conception : MVC, Observer...)</span>
                        </div>
                    </li>
                    
                    <li class="tracking-wider">Développement Web (PHP, Laravel)</li>
                </ul>

                <strong class="mt-4">Projets :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span class="tracking-wider">Projet T3 - Développement d'un jeu vidéo (C#)</span>
                            <span class="text-sm tracking-wider">(Unity 3D, 14 semaines, équipe de 4)</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-col">
                            <span class="tracking-wider">Projet Labyrinthe - Jeu de plateau (Java)</span>
                            <span class="text-sm tracking-wider">(Java Swing, MVC, équipe de 2)</span>
                        </div>
                    </li>
                </ul>
            </div>
            <p class="text-xl tracking-wider">
                <strong class="tracking-wider">Semestre 2 - Printemps 2024</strong>
            </p>

            <div class="flex flex-col gap-2">
                <strong class="tracking-wider">Thèmes abordés :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span class="tracking-wider">Programmation orientée Objet (Java)</span>
                            <span class="text-sm tracking-wider">(PlantUML, concepts POO)</span>
                        </div>
                    </li>
                    
                    <li>
                        <div class="flex flex-col">
                            <span class="tracking-wider">Développement d'applications Windows (C#, SQL)</span>
                            <span class="text-sm tracking-wider">(Utilisation de .NET, Windows Forms et SQLite...)</span>
                        </div>
                    </li>
                </ul>

                <strong class="mt-4">Projets :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span class="tracking-wider">Jeu Pokemon - Jeu de cartes (Java)</span>
                            <span class="text-sm tracking-wider">(Java, équipe de 2)</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-col">
                            <span class="tracking-wider">Application Windows - Développement d'un logiciel de gestion (C#, .NET)</span>
                        </div>
                    </li>
                </ul>
            </div>

            <p class="text-xl tracking-wider">
                <strong class="tracking-wider">Semestre 1 - Automne 2023</strong>
            </p>
            <div class="flex flex-col gap-2">
                <strong class="tracking-wider">Thèmes abordés :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span class="tracking-wider">Initiation à la programmation (C#)</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-col">
                            <span class="tracking-wider">Initiation au développement web (HTML, CSS)</span>
                        </div>
                    </li>
                </ul>

                <strong class="mt-4">Projets :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span class="tracking-wider">Jeu snake en Assembleur</span>
                            <span class="text-sm tracking-wider">(Equipe de 2)</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        `} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
