import React from "react";
import './assets/css/service.css';
import uncool from '../assets/images/entertianment/Front-cover-art.jpg';

const ServicePage: React.FC = () => {
    return (
        <div className="container-fluid justify-content-center text-center">

            <div className="row justify-content-center my-3">
                <div className="col shadow-container mx-3">
                    <div className="design-process">
                        <div className="mb-1">
                            <h3>Services</h3>
                        </div>
                        <div>
                            <div className="album-cards-row d-flex flex-row flex-wrap justify-content-center">
                                <div className="album-card-container mx-2 mb-4" >
                                    <div
                                        className="card shadow-container album-card flex-column cursor-pointer"
                                    >
                                        <img
                                            src={uncool}
                                            alt="{album.Title}"
                                            className="card-img-top music-cover"
                                        />
                                        <div className="card-body music-card-body d-flex flex-column justify-content-between">
                                            <h5 className="card-title mt-1">Web dev</h5>
                                            <p className="card-text">text about the service</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="album-card-container mx-2 mb-4" >
                                    <div
                                        className="card shadow-container album-card flex-column cursor-pointer"
                                    >
                                        <img
                                            src={uncool}
                                            alt="{album.Title}"
                                            className="card-img-top music-cover"
                                        />
                                        <div className="card-body music-card-body d-flex flex-column justify-content-between">
                                            <h5 className="card-title mt-1">Graphic Design</h5>
                                            <p className="card-text">text about the service</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="service-detail-container">
                            <div className="service-toggler-container justify-content-center">
                                <h3>Service:</h3>
                                <button className="btn">Current service</button>
                                <button className="btn">other service</button>
                                <button className="btn">all</button>
                            </div>
                            <div className="service-detail-row my-2">
                                <div className="service-card-container mx-2 mb-4" >
                                    <div
                                        className="card shadow-container album-card flex-column cursor-pointer"
                                    >
                                        <img
                                            src={uncool}
                                            alt="{album.Title}"
                                            className="card-img-top music-cover"
                                        />
                                        <div className="card-body music-card-body d-flex flex-column justify-content-between">
                                            <h5 className="card-title mt-1">Graphic Design</h5>
                                            <p className="card-text">text about the service</p>
                                        </div>
                                    </div>
                                    <div className="service-toggler-container justify-content-center mt-3">
                                        <button className="btn">Process</button>
                                        <button className="btn">Portfolio</button>
                                        <button className="btn">Enquire</button>
                                    </div>
                                </div>
                                <div className="service-details-container-one" >
                                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                                        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                                        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                                        qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                                        incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
                                        ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui
                                        in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                                    </p>
                                </div>
                            </div>
                            <div className="portfolio-detail-row my-2">
                                <div className="service-toggler-container justify-content-center">
                                    <h3>Portfolio:</h3>
                                </div>
                                <div className="album-card-container service-card mx-2 mb-4" >
                                    <div
                                        className="card shadow-container album-card flex-column cursor-pointer"
                                    >
                                        <img
                                            src={uncool}
                                            alt="{album.Title}"
                                            className="card-img-top music-cover"
                                        />
                                        <div className="card-body music-card-body d-flex flex-column justify-content-between">
                                            <h5 className="card-title mt-1">Graphic Design</h5>
                                            <p className="card-text">text about the service</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
