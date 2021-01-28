import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Navigation from "../components/Navigation";
import Slides from "../components/Slides";
import Header from "../components/Header";
import Jumbotron from '../components/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import "./style.css";
import { SET_CURRENT_USER } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import axios from "axios";



function Home() {
  const [state, dispatch] = useStoreContext();
  const [user, setUser] = useState();

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "/api/user/validate",
        null,
        { headers: { "x-auth-token": token } }
      );
      console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await axios.get(
          "/api/user",
          { headers: { "x-auth-token": token } }
        );
        dispatch({
          type: SET_CURRENT_USER,
          user: userRes.data
        });
        setUser({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div>
      <Header />
      <Navigation />
      <br></br>
      <Row>
        <div>
          <Jumbotron>
            <h2 style={{backgroundColor: "rgb(241, 165, 66)"}}>About Us</h2>
            <p>
              We are a local non-profit organization helping the feral cat community in Pooler, GA. Our
              members
              are kind hearted, caring, generous cat loving humans! Our mission is to trap, neuter and return
              feral cats in our area. We also re home cats/kittens that demonstrate friendly or non feral
              behavior. This includes feeding, trapping, fostering and transporting to and from vet offices
              for
              medical needs or sterilization. There are roughly 50 feral cats in our area (and counting). We
              have
              9 members in our group. These individuals provide their time and money to care for these
              animals.
          </p>
          </Jumbotron>
          <Slides />
          <Jumbotron>
            <h3 style={{ color: "white" }}>How can you help?</h3>
            <p>
              We are so happy you’re interested in getting involved with our work here at Pooler Paws Inc..
              There are so many ways for you to help, and we truly appreciate each and every effort. By lending your
              support, you’ll become a valuable part of our Nonprofit Organization and help to strengthen our
              operations. Please contact us for information on ways you can help.
            </p>
            <p>
              <Link to="/Contact">
                <Button style={{ color: "white" }} className="send-form" variant="outline-secondary">Contact Us</Button>
              </Link>
            </p>
          </Jumbotron>
        </div>
      </Row>
    </div>
  )
}

export default Home;