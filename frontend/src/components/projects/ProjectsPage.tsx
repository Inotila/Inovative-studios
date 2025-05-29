import React, { useEffect, useState } from "react";
import './assests/css/projects.css';
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
                                <div className="mb-2">
                                    <h3 className="mb-2">Projects</h3>
                                    <p>We are fuse art and technology to make stuff,
                                        <br />
                                        sometimes useful, sometimes fun, sometimes both.
                                    </p>
                                </div>

                                <div className="service-cards-row d-flex flex-row flex-wrap justify-content-center">
                                    {projects.map((project) => (
                                        <div
                                            className="service-card-container mx-2"
                                            key={project.id}
                                            onClick={() => handleServiceClick(project)}
                                        >
                                            <div className="card shadow-container project-and-service-card flex-column cursor-pointer">
                                                <div className="card-img-cover-container d-flex align-items-center">
                                                    <img
                                                        src={
                                                            project.ThumbnailCover?.startsWith("//")
                                                                ? `https:${project.ThumbnailCover}`
                                                                : project.ThumbnailCover
                                                        }
                                                        alt={project.Title}
                                                        className="card-img-top music-cover"
                                                    />
                                                </div>
                                                <div className="card-body d-flex flex-column justify-content-between">
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
                                <div className="service-detail-row">
                                    <div className="service-card-container">
                                        <div className="card shadow-container service-card flex-column cursor-pointer">
                                            <img
                                                src={selectedProject.ThumbnailCover?.startsWith("//") ? `https:${selectedProject.ThumbnailCover}` : selectedProject.ThumbnailCover}
                                                alt={selectedProject.Title}
                                                className="card-img-top music-cover"
                                            />
                                            <div className="card-body music-card-body d-flex flex-column justify-content-between">
                                                <h5 className="card-title mt-1">{selectedProject.Title}</h5>
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
                                        <div className="mt-3">
                                            <ul className="project-summary-details-list">
                                                {selectedProject.Link && (
                                                    <li>
                                                        <span className="live-light"></span>
                                                        <a href={selectedProject.Link} target="_blank" rel="noreferrer" className="ms-2">
                                                            [click here to try it]
                                                        </a>
                                                    </li>
                                                )}
                                                <li>Status: {selectedProject.ProjectReleaseStatus} </li>
                                                <li>Version: {selectedProject.Version} </li>

                                            </ul>
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
                                                    <h5 className="mb-1 ">About</h5>
                                                    <p>{selectedProject.GeneralDescription}</p>
                                                </div>
                                            )}

                                            {activeSection === 'process' && (
                                                <div id="design-process" className="service-primary-option justify-content-center">
                                                    <h5 className="mb-1 ">Design Process</h5>
                                                    <p>{selectedProject.DesignProcess}</p>
                                                </div>
                                            )}

                                            {activeSection === 'enquire' && (
                                                <div id="enquire-form" className="service-primary-option justify-content-center">
                                                    <h5 className="mb-1">Enquire</h5>
                                                    <p>Updates on this project and how you can be a part of it will soon be avaible here! Come back soon!</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProjectsPage;
