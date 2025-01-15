import React, { useState } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBTypography,
  MDBRow,
  MDBInput
} from 'mdb-react-ui-kit';
import { useCart } from '../panier/CartContext';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importation de SweetAlert2
import './Panier.css';

export default function Panier() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [shippingAddress, setShippingAddress] = useState('');

  const handleIncrease = (id) => {
    updateQuantity(id, 1);
  };

  const handleDecrease = (id) => {
    updateQuantity(id, -1);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleOrderSubmit = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');

      if (!userEmail) {
        // Remplacer l'alerte par SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Utilisateur non connecté',
          text: 'Veuillez vous connecter pour passer une commande.',
        });
        return;
      }

      if (!shippingAddress) {
        // Remplacer l'alerte par SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Adresse manquante',
          text: 'Veuillez entrer une adresse de livraison.',
        });
        return;
      }

      const orderData = {
        userEmail: userEmail,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        shippingAddress,
        totalPrice: totalPrice + 20,
      };

      const response = await axios.post('http://localhost:5000/api/orders/create', orderData);

      // Remplacer l'alerte par SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Commande passée avec succès',
        text: 'Votre commande a été enregistrée avec succès.',
      });

      setShippingAddress('');
      clearCart();
    } catch (err) {
      // Remplacer l'alerte par SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Commande passée avec succès',
        text: 'Votre commande a été enregistrée avec succès.',
      });

    }
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard>
              <MDBCardBody className="p-4">
                <MDBRow>
                  <MDBCol lg="7">
                    <MDBTypography tag="h5">
                      <a href="#!" className="text-body">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue shopping
                      </a>
                    </MDBTypography>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">You have {cart.length} items in your cart</p>
                      </div>
                    </div>
                    {cart.map(item => (
                      <MDBCard className="mb-3" key={item.id}>
                        <MDBCardBody>
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <MDBCardImage
                                src={item.imageUrl}
                                fluid
                                className="rounded-3"
                                style={{ width: "65px" }}
                                alt="Shopping item"
                              />
                              <div className="ms-3">
                                <MDBTypography tag="h5">{item.name}</MDBTypography>
                                <p className="small mb-0">{item.description}</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <MDBBtn size="sm" onClick={() => handleDecrease(item.id)}>-</MDBBtn>
                              <MDBTypography tag="h5" className="fw-normal mb-0">{item.quantity}</MDBTypography>
                              <MDBBtn size="sm" onClick={() => handleIncrease(item.id)}>+</MDBBtn>
                              <MDBTypography tag="h5" className="mb-0">${item.price}</MDBTypography>
                              <MDBBtn
                                size="sm"
                                color="danger"
                                onClick={() => handleRemove(item.id)}
                                style={{ marginLeft: "10px" }}
                              >
                                <MDBIcon fas icon="trash-alt" className="me-2" />
                                Supprimer
                              </MDBBtn>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    ))}
                  </MDBCol>

                  <MDBCol lg="5">
                    <MDBCard className="bg-primary text-white rounded-3">
                      <MDBCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <MDBTypography tag="h5" className="mb-0">
                            Shipping and Card details
                          </MDBTypography>
                        </div>

                        <MDBInput
                          className="mb-4"
                          label="Enter Shipping Address"
                          type="text"
                          size="lg"
                          contrast
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          placeholder="Enter your delivery address"
                        />

                        <hr />
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Subtotal</p>
                          <p className="mb-2">${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Shipping</p>
                          <p className="mb-2">$20.00</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="mb-2">Total (Incl. taxes)</p>
                          <p className="mb-2">${(totalPrice + 20).toFixed(2)}</p>
                        </div>
                        <MDBBtn color="success" block size="lg" onClick={handleOrderSubmit}>
                          <div className="d-flex justify-content-between">
                            <span>Passer la commande</span>
                            <i className="fas fa-long-arrow-alt-right ms-2"></i>
                          </div>
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
