import React, { useEffect, useState } from "react";
import './assets/css/service.css';
import { fetchServices } from "../../services/contentfulService";

interface Service {
    id: string;
    Title: string;
    TypeOfService: string | null;
    SummaryDescription: string;
    GeneralDescription: string;
    DesignProcess: string;
    ThumbnailCover: string;
    IsAvailable: boolean;
    RelatedProjects: string | null;
}

const ServicePage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const [activeSection, setActiveSection] = useState<'general' | 'process' | 'enquire'>('general');


    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
            } catch (error) {
                console.error("Failed to load services:", error);
            }
        };
        loadServices();
    }, []);

    const handleServiceClick = (service: Service) => {
        setSelectedService(service);
        setActiveSection('general');
    };

    return (
        <div className="container-fluid justify-content-center text-center">
            <div className="row justify-content-center my-3">
                <div className="col shadow-container mx-3 w-100"  >
                    <div className="design-process w-100">
                        {!selectedService && (
                            <div className="service-default-state-container mt-4">
                                <div className="mb-1">
                                    <h3>Services</h3>
                                </div>

                                <div className="service-cards-row d-flex flex-row flex-wrap justify-content-center">
                                    {services.map((service) => (
                                        <div
                                            className="service-card-container mx-2 mb-4"
                                            key={service.id}
                                            onClick={() => handleServiceClick(service)}
                                        >
                                            <div className="card shadow-container album-card flex-column cursor-pointer">
                                                <img
                                                    src={
                                                        service.ThumbnailCover?.startsWith("//")
                                                            ? `https:${service.ThumbnailCover}`
                                                            : service.ThumbnailCover
                                                    }
                                                    alt={service.Title}
                                                    className="card-img-top music-cover"
                                                />
                                                <div className="card-body music-card-body d-flex flex-column justify-content-between">
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
                            <div className="service-detail-container mt-4">
                                <div className="service-toggler-container justify-content-center">
                                    <h3>Service: {selectedService.Title}</h3>
                                    <div id="default-service-togglers">
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

                                <div className="service-detail-row my-2 d-flex">
                                    <div className="service-card-container mx-2 mb-4">
                                        <div className="card shadow-container album-card flex-column cursor-pointer">
                                            <img
                                                src={selectedService.ThumbnailCover?.startsWith("//") ? `https:${selectedService.ThumbnailCover}` : selectedService.ThumbnailCover}
                                                alt={selectedService.Title}
                                                className="card-img-top music-cover"
                                            />
                                            <div className="card-body music-card-body d-flex flex-column justify-content-between">
                                                <h5 className="card-title mt-1">{selectedService.Title}</h5>
                                                <p className="card-text">{selectedService.SummaryDescription}</p>
                                            </div>
                                        </div>

                                        <div className="service-toggler-container justify-content-center mt-3">
                                            <button
                                                className={`btn ${activeSection === 'process' ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                                                onClick={() => setActiveSection('process')}
                                            >
                                                Process
                                            </button>
                                            <button
                                                className={`btn ${activeSection === 'general' ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                                                onClick={() => setActiveSection('general')}
                                            >
                                                About
                                            </button>
                                            <button
                                                className={`btn ${activeSection === 'enquire' ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                                                onClick={() => setActiveSection('enquire')}
                                            >
                                                Enquire
                                            </button>
                                        </div>
                                    </div>

                                    <div className="service-details-container-one">
                                        <div className="service-primary-container shadow-container p-3 justify-content-center ">
                                            {activeSection === 'general' && (
                                                <div id="general-description" className="service-primary-option">
                                                    <h5 className="my-2 ">About</h5>
                                                    <p>{selectedService.GeneralDescription}</p>
                                                </div>
                                            )}

                                            {activeSection === 'process' && (
                                                <div id="design-process" className="service-primary-option justify-content-center">
                                                    <h5 className="my-2 ">Design Process</h5>
                                                    <p>{selectedService.DesignProcess}</p>
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

                                {/* Optional Portfolio Row */}
                                <div className="portfolio-detail-row my-4">
                                    <div className="service-toggler-container justify-content-center mb-2">
                                        <h4>Portfolio (Coming soon):</h4>
                                    </div>
                                    <div className="album-card-container service-card mx-2 mb-4">
                                        <div className="card shadow-container album-card flex-column cursor-pointer">
                                            <img
                                                src={selectedService.ThumbnailCover}
                                                alt={selectedService.Title}
                                                className="card-img-top music-cover"
                                            />
                                            <div className="card-body music-card-body d-flex flex-column justify-content-between">
                                                <h5 className="card-title mt-1">{selectedService.Title}</h5>
                                                <p className="card-text">Related work or description</p>
                                            </div>
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

export default ServicePage;
