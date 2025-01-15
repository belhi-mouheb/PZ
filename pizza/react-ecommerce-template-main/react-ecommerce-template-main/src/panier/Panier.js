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
import { useCart } from '../panier/CartContext'; // Assurez-vous d'importer votre contexte
import './Panier.css';

export default function Panier() {
  const { cart, removeFromCart, updateQuantity } = useCart(); // Ajoutez les fonctions pour supprimer et mettre à jour la quantité
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calculer le prix total

  // État pour gérer l'adresse de livraison
  const [shippingAddress, setShippingAddress] = useState('');
  
  // Fonction pour augmenter la quantité
  const handleIncrease = (id) => {
    updateQuantity(id, 1);
  };

  // Fonction pour diminuer la quantité
  const handleDecrease = (id) => {
    updateQuantity(id, -1);
  };

  // Fonction pour supprimer un produit du panier
  const handleRemove = (id) => {
    removeFromCart(id);
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
          <MDBCardImage src={item.imageUrl} fluid className="rounded-3" style={{ width: "65px" }} alt="Shopping item" />
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
          
          {/* Bouton pour supprimer le produit */}
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

                        {/* Champ pour l'adresse de livraison */}
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

                        {/* Informations de carte bancaire */}
                        <p className="small">Card type</p>
                        <a href="#!" className="text-white">
                          <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                        </a>
                        <a href="#!" className="text-white">
                          <MDBIcon fab icon="cc-visa fa-2x me-2" />
                        </a>
                        <a href="#!" className="text-white">
                          <MDBIcon fab icon="cc-amex fa-2x me-2" />
                        </a>
                        <a href="#!" className="text-white">
                          <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                        </a>

                        <form className="mt-4">
                          <MDBInput className="mb-4" label="Cardholder's Name" type="text" size="lg" placeholder="Cardholder's Name" contrast />
                          <MDBInput className="mb-4" label="Card Number" type="text" size="lg" placeholder="1234 5678 9012 3457" contrast />
                          <MDBRow className="mb-4">
                            <MDBCol md="6">
                              <MDBInput className="mb-4" label="Expiration" type="text" size="lg" placeholder="MM/YYYY" contrast />
                            </MDBCol>
                            <MDBCol md="6">
                              <MDBInput className="mb-4" label="Cvv" type="text" size="lg" placeholder="&#9679;&#9679;&#9679;" contrast />
                            </MDBCol>
                          </MDBRow>
                        </form>

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
                          <p className="mb-2">Total(Incl. taxes)</p>
                          <p className="mb-2">${(totalPrice + 20).toFixed(2)}</p>
                        </div>
                        <MDBBtn color="info" block size="lg">
                          <div className="d-flex justify-content-between">
                            <span>${(totalPrice + 20).toFixed(2)}</span>
                            <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
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
