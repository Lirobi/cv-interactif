import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full h-full flex justify-center overflow-hidden">
            <svg id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" className="absolute transition duration-300 ease-in-out delay-150 w-full">
                <svg id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" className="absolute transition duration-300 ease-in-out delay-150 w-full"><path d="M 0,600 L 0,112 C 84.4114832535885,119.77033492822966 168.822966507177,127.54066985645932 261,154 C 353.177033492823,180.45933014354068 453.11961722488047,225.60765550239233 560,235 C 666.8803827751195,244.39234449760767 780.6985645933012,218.02870813397132 867,224 C 953.3014354066988,229.97129186602868 1012.086124401914,268.2775119617225 1103,305 C 1193.913875598086,341.7224880382775 1316.9569377990429,376.8612440191388 1440,412 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="#0000ff" fillOpacity="0.4" className="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 300)"></path><path d="M 0,600 L 0,262 C 83.37799043062202,271.74162679425837 166.75598086124404,281.48325358851673 263,291 C 359.24401913875596,300.51674641148327 468.3540669856459,309.8086124401914 572,319 C 675.6459330143541,328.1913875598086 773.8277511961724,337.2822966507177 856,371 C 938.1722488038276,404.7177033492823 1004.3349282296649,463.0622009569378 1099,499 C 1193.665071770335,534.9377990430622 1316.8325358851675,548.4688995215311 1440,562 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="#0000ff" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-1" transform="rotate(-180 720 300)"></path><path d="M 0,600 L 0,412 C 107.08133971291863,430.4306220095694 214.16267942583727,448.8612440191388 322,460 C 429.83732057416273,471.1387559808612 538.4306220095694,474.9856459330142 626,503 C 713.5693779904306,531.0143540669858 780.1148325358852,583.1961722488039 864,604 C 947.8851674641148,624.8038277511961 1049.11004784689,614.2296650717702 1148,627 C 1246.88995215311,639.7703349282298 1343.4449760765551,675.8851674641148 1440,712 L 1440,600 L 0,600 Z" stroke="none" strokeWidth="0" fill="#0000ff" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-2" transform="rotate(-180 720 300)"></path></svg>

            </svg>
            <div className="flex justify-between max-md:flex-col-reverse md:grid md:grid-cols-2 max-md:gap-10 gap-4 m-10 w-full h-full">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl max-sm:text-4xl tracking-wide text-foreground md:text-background font-bold z-50 cursor-default">Lilian Bischung</h1>
                    <p className="text-3xl max-sm:text-2xl text-foreground md:text-background font-medium z-50 cursor-default">Etudiant en développement</p>
                </div>

                <div className="flex items-center justify-center max-md:bg-background max-md:rounded-lg max-md:p-4 max-md:shadow-lg z-50 max-md:w-fit max-md:self-center">
                    <div className="flex flex-wrap justify-center max-sm:justify-around gap-7 max-sm:gap-4 items-end md:items-center">
                        <div className="">
                            <Link href="/" className="underline-animation text-foreground md:text-background max-md:text-xl max-sm:text-lg text-3xl font-medium">A propos</Link>
                        </div>
                        <div className="">
                            <Link href="/contact" className="underline-animation text-foreground md:text-background max-md:text-xl max-sm:text-lg text-3xl font-medium">Contact</Link>
                        </div>
                        <div className="">
                            <Link href="/projets" className="underline-animation text-foreground md:text-background max-md:text-xl max-sm:text-lg text-3xl font-medium">Projets</Link>
                        </div>
                        <div className="">
                            <Link href="https://github.com/Lirobi" target="_blank" className="underline-animation text-foreground md:text-background max-md:text-xl max-sm:text-lg text-3xl font-medium">Github</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
} 