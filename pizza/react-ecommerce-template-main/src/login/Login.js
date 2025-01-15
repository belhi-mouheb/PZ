import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './Login.css';
import { Link, useHistory } from 'react-router-dom'; // Utilisation de useHistory pour la v5
import { useAuth } from '../template/AuthContext'; // Importer le contexte d'authentification

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // Utilisation de useHistory pour la v5
  const { login } = useAuth(); // Récupérer la fonction login du contexte

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Réinitialiser les erreurs à chaque soumission

    try {
      // Envoi des données de connexion au backend
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password,
      });

      // Si la connexion réussit, appeler la fonction login du contexte
      console.log('Réponse de connexion:', response.data);
      login(email); // Met à jour le contexte pour définir isLoggedIn à true et stocker l'email

      // Enregistrer l'email dans le localStorage
      localStorage.setItem('userEmail', email);

      // Redirection vers la page des produits
      history.push('/products'); // Utilisation de history.push pour la v5
    } catch (err) {
      // Gérer les erreurs du backend ou les erreurs réseau
      if (err.response) {
        console.error('Erreur de connexion:', err.response.data);
        setError(err.response.data.message || 'Email ou mot de passe incorrect.');
      } else if (err.request) {
        console.error('Erreur réseau:', err.request);
        setError('Problème de connexion au serveur. Veuillez réessayer plus tard.');
      } else {
        console.error('Erreur inconnue:', err.message);
        setError('Une erreur inconnue est survenue.');
      }
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src="https://png.pngtree.com/png-clipart/20190613/original/pngtree-pizza-logo-png-image_3543851.jpg"
                style={{ width: '185px' }} alt="logo"
              />
              <h4 className="mt-1 mb-5 pb-1">Pizza Tabarkino </h4>
            </div>

            <p>Please login to your account</p>

            {/* Formulaire de connexion */}
            <MDBInput
              wrapperClass='mb-4'
              label='Email address'
              id='form1'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass='mb-4'
              label='Password'
              id='form2'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Message d'erreur */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={handleSubmit}>
                Sign in
              </MDBBtn>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <Link to="/signup">
                <MDBBtn outline className='mx-2' color='danger'>
                  Sign up
                </MDBBtn>
              </Link>
            </div>

          </div>
        </MDBCol>

        <MDBCol col='6' className="mb-5">
        <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
    <h4 className="mb-4">Bienvenue chez Pizza tabarkino</h4>
    <p className="small mb-0">
      Découvrez les meilleures pizzas artisanales préparées avec des ingrédients frais et un savoir-faire exceptionnel.
      Commandez dès maintenant et laissez-vous tenter par des saveurs uniques et authentiques qui raviront vos papilles.
    </p>
  </div>
</div>

        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
