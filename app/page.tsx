import DeveloppableSection from "./components/DeveloppableSection";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Header />
      <main className="absolute top-1/3 w-full">
        <div className="flex flex-col items-center gap-10 py-10 w-full">
          <DeveloppableSection title="A propos de moi" content="Je suis un étudiant au BUT Informatique parcours <i>Réalisation d'applications: conception, développement, validation </i> à <u><i>l'IUT Robert Schuman d'Illkirch-Graffenstaden</i></u>. Je suis passionné par la création de sites web et le développement logiciel. Je suis actuellement à la recherche d'un stage pour mon cursus. Permis B" />
          <DeveloppableSection title="Formation" content={`
        <div class="flex flex-col gap-4">
            <h2 class="text-2xl font-bold">BUT Informatique - Parcours Réalisation d'applications : conception, développement, validation</h2>
            
            <p class="text-lg">
                IUT Robert Schuman d'Illkirch-Graffenstaden
            </p>
            
            <p class="text-xl">
                <strong>Semestre 3 - Automne 2024</strong>
            </p>

            <div class="flex flex-col gap-2">
                <strong>Thèmes abordés :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span>Programmation système et réseaux (C)</span>
                            <span class="text-sm">(Fork, Thread, Execv, Signaux, Serveurs TCP, UDP, HTTP, Sockets...)</span>
                        </div>
                    </li>
                    
                    <li>
                        <div class="flex flex-col">
                            <span>Conception logicielle (Java)</span>
                            <span class="text-sm">(Patrons de conception : MVC, Observer...)</span>
                        </div>
                    </li>
                    
                    <li>Développement Web (PHP, Laravel)</li>
                </ul>

                <strong class="mt-4">Projets :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span>Projet T3 - Développement d'un jeu vidéo (C#)</span>
                            <span class="text-sm">(Unity 3D, 14 semaines, équipe de 4)</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-col">
                            <span>Projet Labyrinthe - Jeu de plateau (Java)</span>
                            <span class="text-sm">(Java Swing, MVC, équipe de 2)</span>
                        </div>
                    </li>
                </ul>
            </div>
            <p class="text-xl">
                <strong>Semestre 2 - Printemps 2024</strong>
            </p>

            <div class="flex flex-col gap-2">
                <strong>Thèmes abordés :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span>Programmation orientée Objet (Java)</span>
                            <span class="text-sm">(PlantUML, concepts POO)</span>
                        </div>
                    </li>
                    
                    <li>
                        <div class="flex flex-col">
                            <span>Développement d'applications Windows (C#, SQL)</span>
                            <span class="text-sm">(Utilisation de .NET, Windows Forms et SQLite...)</span>
                        </div>
                    </li>
                </ul>

                <strong class="mt-4">Projets :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span>Jeu Pokemon - Jeu de cartes (Java)</span>
                            <span class="text-sm">(Java, équipe de 2)</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-col">
                            <span>Application Windows - Développement d'un logiciel de gestion (C#, .NET)</span>
                        </div>
                    </li>
                </ul>
            </div>

            <p class="text-xl">
                <strong>Semestre 1 - Automne 2023</strong>
            </p>
            <div class="flex flex-col gap-2">
                <strong>Thèmes abordés :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span>Initiation à la programmation (C#)</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex flex-col">
                            <span>Initiation au développement web (HTML, CSS)</span>
                        </div>
                    </li>
                </ul>

                <strong class="mt-4">Projets :</strong>
                <ul class="flex flex-col gap-3 list-disc ml-6">
                    <li>
                        <div class="flex flex-col">
                            <span>Jeu snake en Assembleur</span>
                            <span class="text-sm">(Equipe de 2)</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        `} />
        </div>
      </main>
    </div>
  );
}
