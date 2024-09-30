import React from 'react';
import { Container, Button, Row, Col} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import './HomepageCSS/Banner.css';
import airfilter from './Homepageimages/airfilters.svg'


const Banner = () => {
    return (
        <div className="banner">
        <Container>
            <Row>
                <Col md={6} className="text-center">
                    <h1>Get The Quality At Your Doorstep</h1>
                    <p>High-quality vehicle spare parts delivered to your door.</p>
                    <Button variant="primary">Shop Now</Button>
                </Col>
                <Col md={6}>
                    <Carousel interval={3000} indicators={false}>
                        {/* Add Carousel.Item for each image you want to display */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={airfilter}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={airfilter}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        {/* Add more Carousel.Item blocks as needed */}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    </div>
    );
};

export default Banner;