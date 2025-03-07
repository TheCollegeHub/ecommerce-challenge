import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Button, List, ListItem, ListItemText, Divider, Box, Avatar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo-store.png';

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Fetch the order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderId = location.pathname.split('/').pop(); // Extract order ID from URL
    const foundOrder = orders.find(o => o.id === orderId);
    setOrder(foundOrder);
  }, [location]);

  if (!order) {
    return (
      <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Order not found.
        </Typography>
      </Container>
    );
  }

  // Calculate total order value
  const totalAmount = order.items.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Order Details
          </Typography>
          <Typography variant="h6">
            <span style={{ fontWeight: 'bold' }}>Order Number: </span>{order.id}
          </Typography>
          <Typography variant="h6">
            <span style={{ fontWeight: 'bold' }}>Date: </span>{order.date}
          </Typography>

          <Typography variant="h6" gutterBottom style={{ marginTop: "1rem", fontWeight: 'bold' }}>
            Products:
          </Typography>

          <List>
            {order.items.map((product) => (
              <React.Fragment key={product.id}>
                <ListItem style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <Avatar src={product.image} alt={product.name} style={{ width: 50, height: 50 }} />
                  <ListItemText 
                    primary={product.name} 
                    secondary={`$${(product.price * product.quantity).toFixed(2)} | Quantity: ${product.quantity}`} 
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Box mt={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              <span style={{ fontWeight: 'bold' }}>Total: </span>${totalAmount}
            </Typography>
          </Box>

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

export default OrderDetail;
