'use client'

import { useState } from 'react';

interface MainPageRubrique {
    id: number;
    name: string;
    content: string;
    order: number;
    visible: boolean;
}

interface ContentsManagerProps {
    initialContents: MainPageRubrique[];
}

export default function ContentsManager({ initialContents }: ContentsManagerProps) {
    const [contents, setContents] = useState<MainPageRubrique[]>(initialContents);
    const [editingContent, setEditingContent] = useState<MainPageRubrique | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        content: '',
        order: 0,
        visible: true
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleCreateContent = () => {
        setEditingContent(null);
        setFormData({
            name: '',
            content: '',
            order: contents.length,
            visible: true
        });
        openModal();
    };

    const handleEdit = (content: MainPageRubrique) => {
        setEditingContent(content);
        setFormData({
            name: content.name,
            content: content.content,
            order: content.order,
            visible: content.visible
        });
        openModal();
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this content?')) return;

        try {
            const response = await fetch(`/api/pagecontent/homepage/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            if (!response.ok) throw new Error('Failed to delete content');

            setContents(contents.filter(content => content.id !== id));
        } catch (error) {
            console.error('Error deleting content:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const endpoint = '/api/pagecontent/homepage';
        const method = editingContent ? 'PUT' : 'POST';
        const body = editingContent
            ? { ...formData, id: editingContent.id }
            : formData;

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error('Failed to save content');

            const savedContent = await response.json();

            setContents(prev => {
                if (editingContent) {
                    return prev.map(content =>
                        content.id === editingContent.id ? savedContent : content
                    );
                }
                return [...prev, savedContent];
            });

            closeModal();
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="w-full max-w-4xl p-6 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Content Management</h2>
                    <button
                        onClick={handleCreateContent}
                        className="w-16 h-16 rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center"
                    >
                        +
                    </button>
                </div>

                <div className="space-y-4">
                    {contents.map((content) => (
                        <div key={content.id} className="border p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">{content.name}</h3>
                                <p className="text-sm text-gray-600">Order: {content.order}</p>
                                <p className="text-sm text-gray-600">
                                    Visible: {content.visible ? 'Yes' : 'No'}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(content)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(content.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4">
                                {editingContent ? 'Edit Content' : 'Add Content'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Content</label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-md h-32"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Order</label>
                                    <input
                                        type="number"
                                        name="order"
                                        value={formData.order}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="visible"
                                        checked={formData.visible}
                                        onChange={handleInputChange}
                                        className="rounded"
                                    />
                                    <label className="text-sm font-medium">Visible</label>
                                </div>
                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-200 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 