import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBTypography, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatarUrl: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    avatarUrl: '',
  });

  const email = localStorage.getItem('userEmail'); // Récupérer l'email de l'utilisateur depuis le localStorage

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(`http://localhost:5000/api/auth/profile?email=${email}`);
      const data = await response.json();
      setUser(data);
      setNewData(data);
    };

    if (email) {
      fetchUserProfile();
    }
  }, [email]);

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const response = await fetch('http://localhost:5000/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    const data = await response.json();
    if (data.email) {
      setUser(data);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewData(user);
    setIsEditing(false);
  };

  return (
    <MDBContainer className="py-5" style={{ marginTop: '80px' }}>
      <MDBRow className="justify-content-center">
        <MDBCol lg="6">
          <MDBCard className="shadow-lg" style={{ borderRadius: '.5rem' }}>
            <MDBRow className="g-0">
              <MDBCol
                md="4"
                className="text-center text-white"
                style={{
                  backgroundColor: '#4e73df',
                  borderTopLeftRadius: '.5rem',
                  borderBottomLeftRadius: '.5rem',
                }}
              >
                <MDBCardImage
                  src={
                    user.avatarUrl ||
                    'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
                  }
                  alt="Avatar"
                  className="my-5"
                  style={{ width: '100px', borderRadius: '50%' }}
                  fluid
                />
                <MDBTypography tag="h5">
                  {user.firstName} {user.lastName}
                </MDBTypography>
                <MDBTypography tag="h6">{user.email}</MDBTypography>
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h5" className="mb-4">
                    Informations de l'utilisateur
                  </MDBTypography>
                  <hr />
                  <MDBRow>
                    <MDBCol size="6" className="mb-3">
                      <MDBInput
                        label="Prénom"
                        value={newData.firstName}
                        onChange={handleChange}
                        name="firstName"
                        disabled={!isEditing}
                      />
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBInput
                        label="Nom"
                        value={newData.lastName}
                        onChange={handleChange}
                        name="lastName"
                        disabled={!isEditing}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol size="6" className="mb-3">
                      <MDBInput
                        label="Email"
                        value={newData.email}
                        onChange={handleChange}
                        name="email"
                        disabled={!isEditing}
                      />
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBInput
                        label="Téléphone"
                        value={newData.phone}
                        onChange={handleChange}
                        name="phone"
                        disabled={!isEditing}
                      />
                    </MDBCol>
                  </MDBRow>
                  {isEditing && (
                    <>
                      <MDBRow className="mt-4">
                        <MDBCol size="6" className="mb-3">
                          <MDBInput
                            label="URL de l'Avatar"
                            value={newData.avatarUrl}
                            onChange={handleChange}
                            name="avatarUrl"
                          />
                        </MDBCol>
                      </MDBRow>
                      <div className="mt-4">
                        <MDBBtn color="primary" onClick={handleSave}>
                          Sauvegarder
                        </MDBBtn>
                        <MDBBtn color="danger" className="ms-2" onClick={handleCancel}>
                          Annuler
                        </MDBBtn>
                      </div>
                    </>
                  )}
                  {!isEditing && (
                    <MDBBtn
                      color="secondary"
                      className="mt-4"
                      onClick={() => setIsEditing(true)}
                    >
                      Modifier
                    </MDBBtn>
                  )}
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Profile;
