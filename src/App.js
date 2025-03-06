import React, { useState } from "react";
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, TextField, IconButton, Avatar } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import logo from './assets/logo-store.png'

const initialProducts = [
  { id: 1, name: "MacBook Pro 16\"", price: 2499.99, quantity: 1, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=3126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Samsung Galaxy S23 Ultra", price: 1199.99, quantity: 2, image: "https://images.unsplash.com/photo-1709744722656-9b850470293f?q=80&w=2252&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, name: "Logitech MX Master 3S", price: 99.99, quantity: 1, image: "https://images.unsplash.com/photo-1739742473235-34a7bd9b8f87?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 4, name: "Apple AirPods Pro (2nd Gen)", price: 249.99, quantity: 3, image: "https://images.unsplash.com/photo-1585565804112-f201f68c48b4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

const Cart = () => {
  const [products, setProducts] = useState(initialProducts);

  const updateQuantity = (id, change) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: Math.max(1, product.quantity + change) } : product
    ));
  };

  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", position: 'relative' }}>
      {/* Logo - Ajustado para o canto superior esquerdo */}
      <img 
        src= {logo}
        alt="Logo" 
        style={{
          position: 'fixed',
          top: 10,
          left: 10,
          width: 100,
          height: 'auto',
          zIndex: 9999,  // Garantir que o logo fique sobre outros elementos
        }} 
      />
      
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Shopping Cart
          </Typography>
          <List id="cart">
            {products.map((product, index) => (
              <React.Fragment key={product.id}>
                <ListItem name="product-card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <Avatar src={product.image} alt={product.name} style={{ width: 50, height: 50 }} />
                  <ListItemText 
                    name="product-name"
                    primary={product.name} 
                    secondary={`$${(product.price * product.quantity).toFixed(2)}`} 
                  />
                  <IconButton data-locator="remove-button" onClick={() => updateQuantity(product.id, -1)}>
                    <Remove />
                  </IconButton>
                  <TextField 
                    name="qtd-input"
                    value={product.quantity} 
                    size="small" 
                    variant="outlined" 
                    style={{ width: "50px", textAlign: "center" }}
                    slotProps={{ style: { textAlign: "center" }, readOnly: true }}
                  />
                  <IconButton data-locator="add-button" onClick={() => updateQuantity(product.id, 1)}>
                    <Add />
                  </IconButton>
                  <IconButton data-locator="delete-button" onClick={() => removeProduct(product.id)} color="error">
                    <Delete />
                  </IconButton>
                </ListItem>
                {index < products.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
          <Divider style={{ margin: "1rem 0" }} />
          <Typography variant="h6">Total: ${total}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Cart;
