// Importation des modules nécessaires
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Création des composants stylisés
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
  background-color: #ff5722;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e64a19;
  }
`;

// Composant principal
const Landing = () => {
  return (
    <Container>
      <Title>Bienvenue chez Pizza tabarkino !</Title>
      <Subtitle>La meilleure pizza en ville, juste pour vous.</Subtitle>
      <Link to="/login" >
      <Button >
        connecter et comander maintenant
      </Button>
      </Link>

    </Container>
  );
};

export default Landing;