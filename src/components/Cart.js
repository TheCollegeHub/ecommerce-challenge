import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, TextField, IconButton, Avatar, Button, Snackbar, Box } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo-store.png';

const Cart = () => {
  // Function to get products from localStorage
  const getProductsFromLocalStorage = () => {
    const storedProducts = localStorage.getItem('cart');
    return storedProducts ? JSON.parse(storedProducts) : []; // Ensure it's an empty array if no data exists
  };

  const [products, setProducts] = useState(getProductsFromLocalStorage);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar control
  const navigate = useNavigate(); // Hook for navigation

  // Function to update localStorage whenever the products change
  const updateLocalStorage = (updatedProducts) => {
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
  };

  useEffect(() => {
    updateLocalStorage(products);
  }, [products]);

  const updateQuantity = (id, change) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: Math.max(1, product.quantity + change) } : product
    ));
  };

  const removeProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  };

  const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);

  // Function to finalize the purchase
  const finalizePurchase = () => {
    const orderId = `order-${Date.now()}`;
    const orderDate = new Date().toLocaleString('en-US', { hour12: false });
    const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2); // Calculate the total of the purchase
  
    const order = {
      id: orderId,
      date: orderDate,
      items: products,
      totalAmount: totalAmount
    };
  
    // Save the order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  
    // Show success message
    setOpenSnackbar(true);
  
    // Clear the cart after purchase
    localStorage.setItem('cart', JSON.stringify([]));
    setProducts([]); // Clear the product list in state
  
    // Redirect to the order details page
    navigate(`/orders/${orderId}`);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem", position: 'relative' }}>
      
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Shopping Cart
          </Typography>
          <List id="cart">
            {products.map((product, index) => (
              <React.Fragment key={product.id}>
                <ListItem style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <Avatar src={product.image} alt={product.name} style={{ width: 50, height: 50 }} />
                  <ListItemText 
                    primary={product.name} 
                    secondary={`$${(product.price * product.quantity).toFixed(2)}`} 
                  />
                  <IconButton onClick={() => updateQuantity(product.id, -1)}>
                    <Remove />
                  </IconButton>
                  <TextField 
                    value={product.quantity} 
                    size="small" 
                    variant="outlined" 
                    style={{ width: "50px", textAlign: "center" }}
                    readOnly
                  />
                  <IconButton onClick={() => updateQuantity(product.id, 1)}>
                    <Add />
                  </IconButton>
                  <IconButton onClick={() => removeProduct(product.id)} color="error">
                    <Delete />
                  </IconButton>
                </ListItem>
                {index < products.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
          <Divider style={{ margin: "1rem 0" }} />
          <Typography variant="h6">Total: ${total}</Typography>
          <Button 
            fullWidth 
            variant="contained" 
            color="secondary" 
            style={{ marginTop: "1rem" }}
            onClick={finalizePurchase}
          >
            Finalize Purchase
          </Button>
          
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/" 
            style={{ marginTop: "1rem" }}
          >
            Continue Shopping
          </Button>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message="Purchase completed successfully!"
        autoHideDuration={3000}
      />

       {/* Footer with Logo */}
       <Box component="footer" style={{ textAlign: "center", padding: "10px 0", marginTop: "2rem" }}>
        <img 
          src={logo}
          alt="Logo"
          style={{
            width: 100,
            height: 'auto',
          }} 
        />
        <Typography variant="body2" color="textSecondary">Your online store</Typography>
      </Box>
    </Container>
  );
};

export default Cart;
