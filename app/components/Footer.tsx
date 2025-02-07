import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full h-10 bg-background bottom-10 absolute left-0 flex flex-col items-center justify-center">
            <p className="text-sm text-center flex gap-2">
                <Link href="/contact">Contactez-moi</Link>
                <Link href="https://github.com/Lirobi">Github</Link>
                <Link href="https://www.linkedin.com/in/lilianbischung">Linkedin</Link>
            </p>
            <p>© 2025 Lilian Bischung</p>
            <p className="text-sm text-center">
                Fait avec ❤️ par Lilian Bischung avec Next.js et Tailwind CSS
            </p>
        </footer>
    );
} 