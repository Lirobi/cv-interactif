export interface Project {
    id: string;
    name: string;
    desc: string;
    coverImg: string;
    githubUrl: string;
    appUrl: string | null;
    tags: string[];
    order: number;
} 