import './Order.css';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderDetails() {
  const [orders, setOrders] = useState([]); // État pour stocker les commandes de l'utilisateur
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(""); // Gestion des erreurs

  const userEmail = localStorage.getItem('userEmail'); // Récupérer l'email de l'utilisateur

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:5000/api/orders/user/${userEmail}`)
        .then(response => {
          if (response.data && response.data.length > 0) {
            setOrders(response.data); // Enregistrer les commandes dans l'état
          } else {
            setError("Aucune commande trouvée.");
          }
          setLoading(false);
        })
        .catch(err => {
          setError("Erreur lors du chargement des commandes.");
          setLoading(false);
        });
    } else {
      setError("Utilisateur non connecté.");
      setLoading(false);
    }
  }, [userEmail]);

  if (loading) {
    return <p>Chargement des commandes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="h-100 gradient-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="10" xl="8">
            {orders.map((order, orderIndex) => (
              <MDBCard style={{ borderRadius: "10px" }} key={orderIndex}>
                <MDBCardHeader className="px-4 py-5">
                  <MDBTypography tag="h5" className="text-muted mb-0">
                    Merci pour votre commande, <span style={{ color: "#a8729a" }}>{userEmail}</span> !
                  </MDBTypography>
                </MDBCardHeader>
                <MDBCardBody className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>Receipt</p>
                  </div>

                  {order?.items.map((item, index) => (
                    <MDBCard className="shadow-0 border mb-4" key={index}>
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol md="2">
                            <MDBCardImage
                              src={item.imageUrl || "https://via.placeholder.com/150"}
                              fluid
                              alt={item.name}
                            />
                          </MDBCol>
                          <MDBCol md="2" className="text-center">
                            <p className="text-muted mb-0">{item.name}</p>
                          </MDBCol>
                          <MDBCol md="2" className="text-center">
                            <p className="text-muted mb-0">Qty: {item.quantity}</p>
                          </MDBCol>
                          <MDBCol md="2" className="text-center">
                            <p className="text-muted mb-0">${item.price}</p>
                          </MDBCol>
                        
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  ))}

                  <div className="d-flex justify-content-between pt-2">
                    <p className="fw-bold mb-0">Order Details</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4">Total</span> ${order?.totalPrice.toFixed(3)}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0">
                      Invoice Date : {order?.dateCreated ? new Date(order?.dateCreated).toLocaleDateString('fr-FR') : 'Date invalide'}
                    </p>
                  </div>
                </MDBCardBody>
                <MDBCardFooter
                  className="border-0 px-4 py-5"
                  style={{
                    backgroundColor: "#a8729a",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <MDBTypography
                    tag="h5"
                    className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
                  >
                    Total paid: <span className="h2 mb-0 ms-2">${order?.totalPrice.toFixed(3)}</span>
                  </MDBTypography>
                </MDBCardFooter>
              </MDBCard>
            ))}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
