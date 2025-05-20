import React, { useEffect, useState } from "react";
// import './assets/css/projects.css';
import { fetchProjects } from '../../services/contentfulService';


interface Projects {
    id: string;
    Title: string;
    TypeOfService: string | null;
    SummaryDescription: string;
    GeneralDescription: string;
    DesignProcess: string;
    ThumbnailCover: string;
    Link: string,
    ProjectOwner: string,
    FundingGoals: string,
    ReleaseDate: string,
    ProjectReleaseStatus: string,
    Version: string
}

const ProjectsPage: React.FC = () => {

    const [selectedProject, setSelectedProject] = useState<Projects | null>(null);

    const [activeSection, setActiveSection] = useState<'general' | 'process' | 'enquire'>('general');

    const [projects, setProjects] = useState<any[]>([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const [projectsData] = await Promise.all([
                    fetchProjects()
                ]);
                console.log("Projects fetched:", projectsData);
                setProjects(projectsData);
            } catch (error) {
                console.error("Failed to load projects:", error);
            }
        };
        loadData();
    }, []);


    const handleServiceClick = (project: Projects) => {
        setSelectedProject(project);
        setActiveSection('general');
    };

    return (
        <div className="container-fluid justify-content-center text-center">
            <div className="row justify-content-center m-3">
                <div className="default-container shadow-container mx-3 w-100"  >
                    <div className="main-service-container w-100">
                        {!selectedProject && (
                            <div className="service-default-state-container">
                                <div className="mb-1">
                                    <h3>Projects</h3>
                                </div>

                                <div className="service-cards-row d-flex flex-row flex-wrap justify-content-center">
                                    {projects.map((project) => (
                                        <div
                                            className="service-card-container mx-2 mb-4"
                                            key={project.id}
                                            onClick={() => handleServiceClick(project)}
                                        >
                                            <div className="card shadow-container service-card flex-column cursor-pointer">
                                                <img
                                                    src={
                                                        project.ThumbnailCover?.startsWith("//")
                                                            ? `https:${project.ThumbnailCover}`
                                                            : project.ThumbnailCover
                                                    }
                                                    alt={project.Title}
                                                    className="card-img-top music-cover"
                                                />
                                                <div className="card-body music-card-body d-flex flex-column justify-content-between">
                                                    <h5 className="card-title mt-1">{project.Title}</h5>
                                                    <p className="card-text">{project.SummaryDescription}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Toggle section only shown if a service is selected */}
                        {selectedProject && (
                            <div className="service-detail-container">
                                <div className="service-toggler-container justify-content-center d-block d-md-none">
                                    <h3>Project: {selectedProject.Title}</h3>
                                    <div id="default-service-togglers" className="justify-content-center my-3">

                                        {projects
                                            .filter(project => project.id !== selectedProject.id) // Exclude the current one
                                            .map(project => (
                                                <button
                                                    key={project.id}
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => handleServiceClick(project)}
                                                >
                                                    {project.Title}
                                                </button>
                                            ))
                                        }
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => setSelectedProject(null)}
                                        >
                                            Show All Projects
                                        </button>
                                    </div>
                                </div>
                                <div className="service-detail-row d-flex">
                                    <div className="service-card-container mx-2">
                                        <div className="card shadow-container service-card flex-column cursor-pointer">
                                            <img
                                                src={selectedProject.ThumbnailCover?.startsWith("//") ? `https:${selectedProject.ThumbnailCover}` : selectedProject.ThumbnailCover}
                                                alt={selectedProject.Title}
                                                className="card-img-top music-cover"
                                            />
                                            <div className="card-body music-card-body d-flex flex-column justify-content-between">
                                                <h5 className="card-title mt-1">{selectedProject.Title}</h5>
                                                <p className="card-text">{selectedProject.SummaryDescription}</p>
                                            </div>
                                        </div>

                                        <div className="service-toggler-detail-container mt-3">
                                            <button
                                                className={`btn ${activeSection === 'general' ? 'btn-primary selected-toggler-btn' : 'btn-outline-primary'} service-toggler-detail-btn`}
                                                onClick={() => setActiveSection('general')}
                                            >
                                                About
                                            </button>
                                            <button
                                                className={`btn ${activeSection === 'process' ? 'btn-primary selected-toggler-btn' : 'btn-outline-primary'} service-toggler-detail-btn`}
                                                onClick={() => setActiveSection('process')}
                                            >
                                                Process
                                            </button>
                                            <button
                                                className={`btn ${activeSection === 'enquire' ? 'btn-primary selected-toggler-btn' : 'btn-outline-primary'}  service-toggler-detail-btn`}
                                                onClick={() => setActiveSection('enquire')}
                                            >
                                                Enquire
                                            </button>
                                        </div>
                                    </div>

                                    <div className="service-details-container-one">
                                        <div className="service-toggler-container justify-content-center mb-3 d-none d-lg-block d-md-block">
                                            <h3>Project: {selectedProject.Title}</h3>
                                            <div id="default-service-togglers" className="justify-content-center">
                                                {projects
                                                    .filter(project => project.id !== selectedProject.id)
                                                    .map(project => (
                                                        <button
                                                            key={project.id}
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => handleServiceClick(project)}
                                                        >
                                                            {project.Title}
                                                        </button>
                                                    ))
                                                }
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() => setSelectedProject(null)}
                                                >
                                                    Show All projects
                                                </button>
                                            </div>
                                        </div>
                                        <div className="service-primary-container shadow-container p-3 justify-content-center ">
                                            {activeSection === 'general' && (
                                                <div id="general-description" className="service-primary-option">
                                                    <h5 className="my-2 ">About</h5>
                                                    <p>{selectedProject.GeneralDescription}</p>
                                                </div>
                                            )}

                                            {activeSection === 'process' && (
                                                <div id="design-process" className="service-primary-option justify-content-center">
                                                    <h5 className="my-2 ">Design Process</h5>
                                                    <p>{selectedProject.DesignProcess}</p>
                                                </div>
                                            )}

                                            {activeSection === 'enquire' && (
                                                <div id="enquire-form" className="service-primary-option justify-content-center">
                                                    <h5 className="my-2">Enquire</h5>
                                                    <p>Form will go here.</p>
                                                    {/* You can later replace this with an actual form component */}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                                {/* Only show similar projects if there are any */}
                                {/* {selectedProject?.RelatedProjects?.length > 0 && (
                                    <div className="similar-projects-detail-row my-4">
                                        <div className="justify-content-center mb-2">
                                            <h4>Similar Projects:</h4>
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-center">
                                            {projects.filter(project => selectedProject.RelatedProjects.includes(project.Title))
                                                .map(project => (
                                                    <div key={project.id} className="service-card-container service-card mx-2 mb-4">
                                                        <a href={project.Link} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
                                                            <div className="card shadow-container project-card flex-column cursor-pointer">
                                                                <img
                                                                    src={project.ThumbnailCover}
                                                                    alt={project.Title}
                                                                    className="card-img-top music-cover"
                                                                />
                                                                <div className="card-body music-card-body d-flex flex-column justify-content-between">
                                                                    <h5 className="card-title mt-1">{project.Title}</h5>
                                                                    <p className="card-text">{project.SummaryDescription}</p>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProjectsPage;
