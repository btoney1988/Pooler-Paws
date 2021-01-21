import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_CATS, LOADING } from "../utils/actions";
import API from "../utils/API";
import "./style.css";

function PetList() {
  const [state, dispatch] = useStoreContext();

  const getCats = () => {
    dispatch({ type: LOADING });
    API.getCats()
      .then(results => {
        console.log(results);
        dispatch({
          type: UPDATE_CATS,
          cats: results.data
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getCats();
  }, []);

  return (
    <div>
      <Header/>
      <Navigation />
      <h2>Looking for a home</h2>
      <Container>
        <Row>
          <Col size="md-12">
            {state.cats.map(cat => (
              <Card key={cat._id} style={{ width: "100%" }}>
                <Card.Img className="cardStyle" variant="top" src={"./assets/" + cat.picture} />
                <Card.Body>
                  <Card.Title>{cat.name}</Card.Title>
                  <Card.Text size="md" >{cat.age}</Card.Text>
                  <Card.Text>
                    {cat.details}
                </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Status: {cat.adopted = true ? "Available for Adoption" : "Not Available for Adoption"}</Card.Subtitle>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PetList;