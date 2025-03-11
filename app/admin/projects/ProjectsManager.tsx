"use client";

import React, { useState, useRef, useEffect } from "react";

interface Project {
    id: number;
    name: string;
    coverImg: string;
    desc: string;
    githubUrl: string;
    visible: boolean;
    tags: string[];
    appUrl: string | null;
    order: number;
}

interface ProjectWithTagsArray {
    id: number;
    name: string;
    coverImg: string;
    desc: string;
    githubUrl: string;
    visible: boolean;
    tags?: string[];
    appUrl: string | null;
    order: number;
}

interface ProjectsManagerProps {
    initialProjects: ProjectWithTagsArray[];
}

const defaultFormData: Project = {
    id: 0,
    name: "",
    coverImg: "",
    desc: "",
    githubUrl: "",
    visible: true,
    tags: [],
    appUrl: "",
    order: 0,
};

export default function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const [projects, setProjects] = useState<ProjectWithTagsArray[]>(() => {
        // Sort projects by order when initializing
        return [...initialProjects].sort((a, b) => a.order - b.order);
    });
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState<Project>(defaultFormData);
    const [draggedProject, setDraggedProject] = useState<ProjectWithTagsArray | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Open modal and initialize form with project data
    const openModal = (project: Project & { TagOnProject?: { tag: { id: number; name: string } }[] }) => {
        setEditingProject(project);
        setFormData({ ...project });
    };

    const closeModal = () => {
        setEditingProject(null);
    };

    // Handle input and select changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "tags") {
            const tagsArray = value ? value.split(',').map(tag => tag.trim()) : [];
            setFormData(prev => ({
                ...prev,
                tags: tagsArray
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === "visible" ? value === "true" : value,
            }));
        }
    };

    // Save changes via API call and update local state
    const handleSave = async () => {
        if (!editingProject) return;

        try {
            const response = await fetch(`${baseUrl}/api/projects/${editingProject.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                cache: 'no-store',
                next: { revalidate: 0 },
                signal: AbortSignal.timeout(5000),
            });

            if (!response.ok) {
                throw new Error('Failed to save project');
            }

            const updated = await response.json();
            setProjects(projects.map((p) => (p.id === editingProject.id ? updated : p)));
            closeModal();
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Error saving project");
        }
    };

    // Create a new empty project
    const handleCreateProject = async () => {
        try {
            // Get the highest order value and add 1
            const highestOrder = projects.length > 0
                ? Math.max(...projects.map(p => p.order))
                : -1;

            const response = await fetch(`${baseUrl}/api/projects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tags: [],
                    order: highestOrder + 1
                }),
                cache: 'no-store',
                next: { revalidate: 0 },
                signal: AbortSignal.timeout(5000),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }

            const newProject = await response.json();
            setProjects([...projects, newProject]);
            openModal(newProject);
        } catch (error) {
            console.error("Error creating project:", error);
            alert("Error creating project");
        }
    };

    // Update visibility immediately when dropdown is used in the card view
    const updateVisibility = async (project: Project, newVisible: boolean) => {
        try {
            const updatedProject = { ...project, visible: newVisible };
            const res = await fetch(`${baseUrl}/api/projects/${project.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProject),
            });
            if (res.ok) {
                const returnedProject = await res.json();
                setProjects(projects.map((p) => (p.id === project.id ? returnedProject : p)));
            } else {
                alert("Failed to update visibility");
            }
        } catch (error) {
            alert("Error updating visibility: " + error);
        }
    };

    // Update the order of projects in the database
    const updateProjectsOrder = async (reorderedProjects: ProjectWithTagsArray[]) => {
        try {
            const response = await fetch(`${baseUrl}/api/projects/reorder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projects: reorderedProjects }),
                cache: 'no-store',
                next: { revalidate: 0 },
            });

            if (!response.ok) {
                throw new Error('Failed to update project order');
            }

            return await response.json();
        } catch (error) {
            console.error("Error updating project order:", error);
            alert("Error updating project order");
            return null;
        }
    };

    // Drag and drop handlers
    const handleDragStart = (project: ProjectWithTagsArray) => {
        setDraggedProject(project);
        setIsDragging(true);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();

        if (!draggedProject) return;

        const draggedIndex = projects.findIndex(p => p.id === draggedProject.id);
        if (draggedIndex === targetIndex) return;

        // Create a copy of the projects array
        const newProjects = [...projects];

        // Remove the dragged project from its original position
        newProjects.splice(draggedIndex, 1);

        // Insert the dragged project at the new position
        newProjects.splice(targetIndex, 0, draggedProject);

        // Update the order property for each project
        const reorderedProjects = newProjects.map((project, index) => ({
            ...project,
            order: index
        }));

        // Update the state with the new order
        setProjects(reorderedProjects);

        // Update the order in the database
        await updateProjectsOrder(reorderedProjects);

        setIsDragging(false);
        setDraggedProject(null);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setDraggedProject(null);
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/projects`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
                next: { revalidate: 0 },
                signal: AbortSignal.timeout(5000),
            });
            // ... handle response
        } catch (error) {
            console.error('Error fetching projects:', error);
            // ... handle error
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center z-50">
            <div className="w-full max-w-4xl p-8">
                <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>
                <p className="mb-4 text-gray-600">Drag and drop projects to reorder them. The order will be reflected on the public projects page.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`bg-white rounded-lg shadow p-4 relative ${isDragging && draggedProject?.id === project.id ? 'opacity-50' : ''} cursor-move`}
                            draggable
                            onDragStart={() => handleDragStart(project)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                        >
                            <div className="mb-2">
                                <h2 className="text-xl font-semibold">{project.name || "Untitled Project"}</h2>
                                <span className="text-xs text-gray-500">Order: {project.order}</span>
                            </div>
                            <div className="mb-2">
                                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: project.desc || "No description" }} />
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Visibility</label>
                                <select
                                    name="visible"
                                    value={project.visible ? "true" : "false"}
                                    onChange={(e) => {
                                        // Create a copy with the correct type structure
                                        const projectWithCorrectTags: Project = {
                                            ...project,
                                            tags: project.tags || []
                                        };
                                        updateVisibility(projectWithCorrectTags, e.target.value === "true");
                                    }}
                                    className="w-full px-2 py-1 border rounded"
                                >
                                    <option value="true">Public</option>
                                    <option value="false">Private</option>
                                </select>
                            </div>
                            <div className="mb-2">
                                <div className="flex flex-wrap gap-1">
                                    {project.tags && project.tags.map((tag, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button
                                className="absolute top-2 right-2 text-blue-500"
                                onClick={() => {
                                    // Create a copy with the correct type structure
                                    const projectWithCorrectTags: Project = {
                                        ...project,
                                        tags: project.tags || []
                                    };
                                    openModal(projectWithCorrectTags);
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                    <div className="flex items-center justify-center">
                        <button
                            onClick={handleCreateProject}
                            className="w-16 h-16 rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {editingProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500">
                            X
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input
                                    type="text"
                                    name="coverImg"
                                    value={formData.coverImg}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                                <input
                                    type="url"
                                    name="githubUrl"
                                    value={formData.githubUrl}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">App URL</label>
                                <input
                                    type="url"
                                    name="appUrl"
                                    value={formData.appUrl || ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags ? formData.tags.join(', ') : ""}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Visibility</label>
                                <select
                                    name="visible"
                                    value={formData.visible ? "true" : "false"}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="true">Public</option>
                                    <option value="false">Private</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-md mr-2">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 