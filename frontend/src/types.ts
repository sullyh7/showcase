export interface ProjectsResponse {
    projects: Project[]
}

export interface Project {
    id: number,
    title: string,
    description: string,
    difficulty: number,
    funded: boolean,
    url: string,
    createdAt?: Date
    technologies: ProjectTechnology[]
}


export interface TechnologiesResponse {
    technologies: Technology[]
}

export interface Technology {
    id: number | null,
    name: string
    description: string
}


export interface ProjectTechnology {
    id: number | null,
    name: string,
    how: string,
}

