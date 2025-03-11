import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full py-4 bg-background flex flex-col items-center justify-center">
            <p className="text-sm text-center flex flex-wrap justify-center gap-2 max-sm:gap-4 px-4">
                <Link className="underline-animation" href="/contact">Contactez-moi</Link>
                <Link className="underline-animation" href="https://github.com/Lirobi">Github</Link>
                <Link className="underline-animation" href="https://www.linkedin.com/in/lilianbischung">Linkedin</Link>
            </p>
            <p className="mt-1">© 2025 Lilian Bischung</p>
            <p className="text-sm text-center mt-1">
                Fait avec Next.js
            </p>
        </footer>
    );
} 