import {Card, ListGroup, Container} from 'react-bootstrap';
import "./Frame.css"


const Frame = () => {
    return(
        <Container className="container-frame">
            <Card border="primary" className="card-frame">
                <Card.Header className="header-frame">Featured</Card.Header>
                <Card.Body>
                    <Card.Text>
                    Как се решава проблем?
                    1. Трябва да знаеш как да го репродуцираш.
                    2. Трябва да си измислиш хипотеза какъв е проблема и да можеш да я провериш.
                    </Card.Text>
                </Card.Body>
            </Card>

            <div className="div-f
            rame">
                <header className="header-frame">Featured </header>
                <div className="body-frame">
                    <p>
                    Как се решава проблем?
                    1. Трябва да знаеш как да го репродуцираш.
                    2. Трябва да си измислиш хипотеза какъв е проблема и да можеш да я провериш.
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default Frame