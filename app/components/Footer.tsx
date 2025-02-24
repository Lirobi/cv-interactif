import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full h-10 bg-background flex flex-col items-center justify-center">
            <p className="text-sm text-center flex gap-2">
                <Link className="underline-animation" href="/contact">Contactez-moi</Link>
                <Link className="underline-animation" href="https://github.com/Lirobi">Github</Link>
                <Link className="underline-animation" href="https://www.linkedin.com/in/lilianbischung">Linkedin</Link>
            </p>
            <p>© 2025 Lilian Bischung</p>
            <p className="text-sm text-center">
                Fait avec Next.js
            </p>
        </footer>
    );
} 