"use client";

import React, { useState } from "react";

interface Project {
    id: number;
    name: string;
    coverImg: string;
    desc: string;
    githubUrl: string;
    visible: boolean;
    tags?: string;
}

interface ProjectsManagerProps {
    initialProjects: Project[];
}

const defaultFormData: Project = {
    id: 0,
    name: "",
    coverImg: "",
    desc: "",
    githubUrl: "",
    visible: true,
    tags: "",
};

export default function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState<Project>(defaultFormData);

    // Open modal and initialize form with project data
    const openModal = (project: Project & { TagOnProject?: { tag: { id: number; name: string } }[] }) => {
        const tags = project.TagOnProject ? project.TagOnProject.map(t => t.tag.name).join(", ") : "";
        setEditingProject(project);
        setFormData({ ...project, tags });
    };

    const closeModal = () => {
        setEditingProject(null);
    };

    // Handle input and select changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "visible" ? value === "true" : value,
        }));
    };

    // Save changes via API call and update local state
    const handleSave = async () => {
        if (!editingProject) return;

        try {
            const res = await fetch(`${baseUrl}/api/projects/${editingProject.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                const updated = await res.json();
                setProjects(projects.map((p) => (p.id === editingProject.id ? updated : p)));
                closeModal();
            } else {
                alert("Error saving project");
            }
        } catch (error) {
            alert("Error saving project: " + error);
        }
    };

    // Create a new empty project
    const handleCreateProject = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/projects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}), // rely on defaults
            });
            if (res.ok) {
                const newProject = await res.json();
                setProjects([...projects, newProject]);
                // Open modal for the new project so that it can be edited immediately.
                openModal(newProject);
            } else {
                alert("Error creating project");
            }
        } catch (error) {
            alert("Error creating project: " + error);
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

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl p-8">
                <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow p-4 relative">
                            <div className="mb-2">
                                <h2 className="text-xl font-semibold">{project.name || "Untitled Project"}</h2>
                            </div>
                            <div className="mb-2">
                                <p className="text-gray-600">{project.desc || "No description"}</p>
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">Visibility</label>
                                <select
                                    name="visible"
                                    value={project.visible ? "true" : "false"}
                                    onChange={(e) => updateVisibility(project, e.target.value === "true")}
                                    className="w-full px-2 py-1 border rounded"
                                >
                                    <option value="true">Public</option>
                                    <option value="false">Private</option>
                                </select>
                            </div>
                            <button
                                className="absolute top-2 right-2 text-blue-500"
                                onClick={() => openModal(project)}
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
                                <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags || ""}
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