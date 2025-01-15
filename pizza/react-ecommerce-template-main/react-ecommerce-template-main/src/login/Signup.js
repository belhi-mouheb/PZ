import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';

function Signup() {
  // État local pour les champs du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Soumettre les données au backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      setMessage(response.data.message || 'Inscription réussie !');
    } catch (err) {
      console.error(err); // Ajout du log d'erreur pour plus de détails
      setMessage(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };
  

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput 
                    label='First Name' 
                    id='form1' 
                    type='text' 
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput 
                    label='Last Name' 
                    id='form2' 
                    type='text' 
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput 
                    label='Email' 
                    id='form3' 
                    type='email' 
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput 
                    label='Password' 
                    id='form4' 
                    type='password' 
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className='mb-4'>
                  <MDBCheckbox 
                    name='flexCheck' 
                    value='' 
                    id='flexCheckDefault' 
                    label='Subscribe to our newsletter' 
                  />
                </div>

                <MDBBtn type="submit" className='mb-4' size='lg'>Register</MDBBtn>
              </form>

              {message && <p>{message}</p>}
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage 
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' 
                fluid 
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;
