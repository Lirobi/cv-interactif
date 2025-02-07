import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
    return (
        <div className="min-h-screen w-screen flex flex-col">
            <Header />
            <div className="flex h-[50vh] items-center justify-center ">
                <div className="flex flex-col items-center justify-center bg-background max-md:w-5/6 rounded-xl z-50 h-fit p-10 shadow-lg">
                    <h1 className="text-6xl font-bold mb-8 text-foreground">Contact</h1>
                    <div className="space-y-4">
                        <p className="text-xl">
                            <Link
                                href="https://www.linkedin.com/in/lilianbischung" // Replace with your actual LinkedIn profile URL
                                target="_blank"
                                className="underline-animation text-foreground"
                            >
                                LinkedIn Profile
                            </Link>
                        </p>
                        <p className="text-xl">
                            Email:{" "}
                            <a
                                href="mailto:lilian.bischung@etu.unistra.fr" // Replace with your actual email address
                                className="underline-animation text-foreground"
                            >
                                lilian.bischung@etu.unistra.fr
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}
