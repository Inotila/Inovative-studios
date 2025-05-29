import React, { useEffect, useState } from "react";
import './assets/css/service.css';
import '../assets/css/cardStyling.css';
import { fetchServices } from "../../services/contentfulService";
import { fetchProjects } from '../../services/contentfulService';


interface Service {
    id: string;
    Title: string;
    TypeOfService: string | null;
    SummaryDescription: string;
    GeneralDescription: string;
    DesignProcess: string;
    ThumbnailCover: string;
    IsAvailable: boolean;
    RelatedProjects: string[];
}

const ServicePage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const [activeSection, setActiveSection] = useState<'general' | 'process' | 'enquire'>('general');

    const [projects, setProjects] = useState<any[]>([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const [servicesData, projectsData] = await Promise.all([
                    fetchServices(),
                    fetchProjects()
                ]);
                console.log("Services fetched:", servicesData)
                console.log("Projects fetched:", projectsData);
                setServices(servicesData);
                setProjects(projectsData);
            } catch (error) {
                console.error("Failed to load services or projects:", error);
            }
        };
        loadData();
    }, []);

    const handleServiceClick = (service: Service) => {
        setSelectedService(service);
        setActiveSection('general');
    };

    return (
        <div className="container-fluid justify-content-center text-center">
            <div className="row justify-content-center m-3">
                <div className="default-container shadow-container mx-3 w-100"  >
                    <div className="main-service-container w-100">
                        {!selectedService && (
                            <div className="service-default-state-container">
                                <div className="mb-2">
                                    <h3>Services</h3>
                                    <p>We offer creative solutions,
                                        <br />
                                        collaborating with our clients to bring to life a product that is innovative!
                                    </p>
                                </div>

                                <div className="service-cards-row d-flex flex-row flex-wrap justify-content-center">
                                    {services.map((service) => (
                                        <div
                                            className="service-card-container mx-2 "
                                            key={service.id}
                                            onClick={() => handleServiceClick(service)}
                                        >
                                            <div className="card shadow-container project-and-service-card flex-column cursor-pointer">
                                                <div className="card-img-cover-container">
                                                    <img
                                                        src={
                                                            service.ThumbnailCover?.startsWith("//")
                                                                ? `https:${service.ThumbnailCover}`
                                                                : service.ThumbnailCover
                                                        }
                                                        alt={service.Title}
                                                        className="card-img-top card-cover-img"
                                                    />
                                                </div>
                                                <div className="card-body  d-flex flex-column justify-content-between">
                                                    <h5 className="card-title mt-1">{service.Title}</h5>
                                                    <p className="card-text">{service.SummaryDescription}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Toggle section only shown if a service is selected */}
                        {selectedService && (
                            <div className="service-detail-container">
                                <div className="service-toggler-container justify-content-center d-block d-md-none">
                                    <h3>Service: {selectedService.Title}</h3>
                                    <div id="default-service-togglers" className="justify-content-center my-3">

                                        {services
                                            .filter(service => service.id !== selectedService.id) // Exclude the current one
                                            .map(service => (
                                                <button
                                                    key={service.id}
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => handleServiceClick(service)}
                                                >
                                                    {service.Title}
                                                </button>
                                            ))
                                        }
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => setSelectedService(null)}
                                        >
                                            Show All Services
                                        </button>
                                    </div>
                                </div>
                                <div className="service-detail-row">
                                    <div className="service-card-container ">
                                        <div className="card shadow-container project-and-service-card flex-column cursor-pointer">
                                            <div className="card-img-cover-container">
                                                <img
                                                    src={selectedService.ThumbnailCover?.startsWith("//") ? `https:${selectedService.ThumbnailCover}` : selectedService.ThumbnailCover}
                                                    alt={selectedService.Title}
                                                    className="card-img-top card-cover-img"
                                                />
                                            </div>
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <h5 className="card-title mt-1">{selectedService.Title}</h5>
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
                                            <h3 className="mb-2">Service: {selectedService.Title}</h3>
                                            <div id="default-service-togglers" className="justify-content-center">
                                                {services
                                                    .filter(service => service.id !== selectedService.id)
                                                    .map(service => (
                                                        <button
                                                            key={service.id}
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => handleServiceClick(service)}
                                                        >
                                                            {service.Title}
                                                        </button>
                                                    ))
                                                }
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() => setSelectedService(null)}
                                                >
                                                    Show All Services
                                                </button>
                                            </div>
                                        </div>
                                        <div className="service-primary-container shadow-container justify-content-center ">
                                            {activeSection === 'general' && (
                                                <div id="general-description" className="service-primary-option">
                                                    <h5 className="mb-1 ">About</h5>
                                                    <p>{selectedService.GeneralDescription}</p>
                                                </div>
                                            )}

                                            {activeSection === 'process' && (
                                                <div id="design-process" className="service-primary-option justify-content-center">
                                                    <h5 className="mb-1 ">Design Process</h5>
                                                    <p>{selectedService.DesignProcess}</p>
                                                </div>
                                            )}

                                            {activeSection === 'enquire' && (
                                                <div id="enquire-form" className="service-primary-option justify-content-center">
                                                    <h5 className="mb-1">Enquire</h5>
                                                    <p>Form will go here.</p>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                                {/* Only show similar projects if there are any */}
                                {selectedService?.RelatedProjects?.length > 0 && (
                                    <div className="similar-projects-detail-row mt-2">
                                        <div className="justify-content-center mb-2">
                                            <h4>Similar Projects:</h4>
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-center">
                                            {projects.filter(project => selectedService.RelatedProjects.includes(project.Title))
                                                .map(project => (
                                                    <div key={project.id} className="service-card-container service-card mx-2 ">
                                                        <a href={project.Link} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
                                                            <div className="card shadow-container similar-projects-card flex-column cursor-pointer">
                                                                <img
                                                                    src={project.ThumbnailCover}
                                                                    alt={project.Title}
                                                                    className="card-img-top similar-projects-card-img"
                                                                />
                                                            </div>
                                                            <div className="card-body d-flex flex-column justify-content-between">
                                                                <h5 className="card-title mt-1">{project.Title}</h5>
                                                                <p className="card-text">{project.SummaryDescription}</p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
