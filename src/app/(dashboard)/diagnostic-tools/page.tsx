"use client";

import React, { useState } from 'react';
import { Search, Filter, TrendingUp, ExternalLink, FileText, Power, Brain, Activity, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Model {
    id: string;
    title: string;
    description: string;
    version: string;
    status: 'Stable' | 'Beta' | 'Research';
    modality: 'Imaging' | 'Signal';
    tags: string[];
    icon: React.ReactNode;
    image: string;
    enabled: boolean;
}

const MedicalDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedModality, setSelectedModality] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const models: Model[] = [
        {
            id: '1',
            title: 'Brain Tumor Detection',
            description: 'MRI-based classifier for glioma, meningioma, pituitary and healthy controls.',
            version: 'v1.4',
            status: 'Stable',
            modality: 'Imaging',
            tags: ['MRI', 'Neuro', 'Classification'],
            icon: <Brain className="w-5 h-5" />,
            image: 'brain',
            enabled: false
        },
        {
            id: '2',
            title: 'Mammography – Lesion Detection',
            description: 'Detects and prioritizes suspicious calcifications and masses in screening mammo.',
            version: 'v0.9',
            status: 'Beta',
            modality: 'Imaging',
            tags: ['X-ray', 'Oncology', 'Detection'],
            icon: <Activity className="w-5 h-5" />,
            image: 'mammo',
            enabled: false
        },
        {
            id: '3',
            title: 'Chest X-ray – Pneumonia/TB',
            description: 'Binary/triage model to flag likely pneumonia or TB findings in CXR studies.',
            version: 'v1.2',
            status: 'Stable',
            modality: 'Imaging',
            tags: ['X-ray', 'Pulmonary', 'Triage'],
            icon: <Activity className="w-5 h-5" />,
            image: 'chest',
            enabled: false
        },
        {
            id: '4',
            title: 'ECG Arrhythmia Analysis',
            description: 'Real-time detection and classification of cardiac arrhythmias from ECG signals.',
            version: 'v0.8',
            status: 'Beta',
            modality: 'Signal',
            tags: ['ECG', 'Cardiology', 'Classification'],
            icon: <Heart className="w-5 h-5" />,
            image: 'ecg',
            enabled: false
        },
        {
            id: '5',
            title: 'Skin Lesion Classification',
            description: 'Dermoscopic image analysis for melanoma and other skin cancer detection.',
            version: 'v1.1',
            status: 'Stable',
            modality: 'Imaging',
            tags: ['Dermoscopy', 'Oncology', 'Classification'],
            icon: <Activity className="w-5 h-5" />,
            image: 'skin',
            enabled: false
        },
        {
            id: '6',
            title: 'Retinal Disease Screening',
            description: 'Automated detection of diabetic retinopathy and other retinal pathologies.',
            version: 'v0.7',
            status: 'Research',
            modality: 'Imaging',
            tags: ['Fundus', 'Ophthalmology', 'Detection'],
            icon: <Activity className="w-5 h-5" />,
            image: 'retinal',
            enabled: false
        }
    ];

    const [modelStates, setModelStates] = useState(models);

    const toggleModel = (id: string) => {
        setModelStates(prev =>
            prev.map(model =>
                model.id === id ? { ...model, enabled: !model.enabled } : model
            )
        );
    };

    const filteredModels = modelStates.filter(model => {
        const matchesSearch = model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesModality = !selectedModality || model.modality === selectedModality;
        const matchesStatus = !selectedStatus || model.status === selectedStatus;

        // Also include models when 'All' is selected
        if (selectedModality === '-') return matchesSearch && matchesStatus;
        if (selectedStatus === '-') return matchesSearch && matchesModality;

        return matchesSearch && matchesModality && matchesStatus;
    });

    const getImageGradient = (type: string) => {
        switch (type) {
            case 'brain':
                return 'bg-gradient-to-br from-cyan-500 to-blue-600';
            case 'mammo':
                return 'bg-gradient-to-br from-gray-400 to-gray-600';
            case 'chest':
                return 'bg-gradient-to-br from-gray-300 to-gray-500';
            case 'ecg':
                return 'bg-gradient-to-br from-amber-400 to-orange-500';
            case 'skin':
                return 'bg-gradient-to-br from-rose-400 to-pink-500';
            case 'retinal':
                return 'bg-gradient-to-br from-emerald-400 to-teal-500';
            default:
                return 'bg-gradient-to-br from-gray-400 to-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <Power className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Digital Labs</h1>
                            <p className="text-sm text-muted-foreground">AI-assisted diagnostics & decision support</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search and Filters */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end mb-8">
                    <div className="flex-1 w-full">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search models, modalities, tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-[79%]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <div className="flex-1">
                            <label className="text-sm font-medium mb-2 block">Modality</label>
                            <Select value={selectedModality} onValueChange={setSelectedModality}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="All modalities" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="-">All</SelectItem>
                                    <SelectItem value="Imaging">Imaging</SelectItem>
                                    <SelectItem value="Signal">Signal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-1">
                            <label className="text-sm font-medium mb-2 block">Status</label>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="All statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="-">All</SelectItem>
                                    <SelectItem value="Stable">Stable</SelectItem>
                                    <SelectItem value="Beta">Beta</SelectItem>
                                    <SelectItem value="Research">Research</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* <div className="flex gap-2 items-end">
                            <Button variant="outline" className="flex-1">
                                <Filter className="w-4 h-4 mr-2" />
                                Filters
                            </Button>
                            <Button className="flex-1">
                                Apply
                            </Button>
                        </div> */}
                    </div>
                </div>

                {/* Models Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredModels.map((model) => (
                        <Card key={model.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className={`h-48 ${getImageGradient(model.image)} relative flex items-center justify-center`}>
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <Badge
                                        variant="secondary"
                                        className={
                                            model.status === 'Stable'
                                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                                : model.status === 'Beta'
                                                    ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                                                    : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                                        }
                                    >
                                        {model.status}
                                    </Badge>
                                    <Badge variant="secondary">
                                        {model.modality}
                                    </Badge>
                                </div>
                                <div className="text-white/20 scale-150">
                                    {model.icon}
                                </div>
                            </div>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        {model.icon}
                                        <CardTitle className="text-lg">{model.title}</CardTitle>
                                    </div>
                                    <TrendingUp className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <CardDescription className="text-sm">
                                    {model.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {model.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="secondary">
                                            {model.version}
                                        </Badge>
                                        <Button size="sm">
                                            Open tool
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button size="sm" variant="ghost">
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost">
                                            <FileText className="w-4 h-4 mr-1" />
                                            Docs
                                        </Button>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={model.enabled}
                                                onChange={() => toggleModel(model.id)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Warning Alert */}
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[50%] flex items-center justify-between rounded-md border p-4 bg-background/60 backdrop-blur-md shadow-lg">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mr-2">
                        <span className="text-muted-foreground text-xs font-bold">i</span>
                    </div>
                    <AlertDescription className="flex items-center gap-2 rounded-md">
                        All Models should be used for preliminary support. Not a substitute for final clinical decisions. 
                    </AlertDescription>
                    <Button
                        size="sm"
                        variant="outline"
                        className="whitespace-nowrap ml-auto"
                    >
                        View audit logs
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default MedicalDashboard;
