import React, { useState, useEffect } from "react";
import { Container, Button, Typography, Card, CardContent, Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo-store.png';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const sortedOrders = storedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setOrders(sortedOrders);
  }, []);

  const handleViewOrderDetails = (orderNumber) => {
    if (orderNumber) {
      navigate(`/orders/${orderNumber}`);
    } else {
      console.error("Order Number is undefined or invalid!");
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h5" gutterBottom>Order List</Typography>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        orders.map(order => (
          <Card key={order.id} style={{ marginBottom: "1rem" }}>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Typography>
                <span style={{ fontWeight: 'bold' }}>Order Number: </span>{order.id}
                </Typography>
                <Typography>
                <span style={{ fontWeight: 'bold' }}>Date: </span>{new Date(order.date).toLocaleString('en-US', { hour12: false })}
                </Typography>
                <Typography>
                <span style={{ fontWeight: 'bold' }}>Total: </span>${order.totalAmount}
                </Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewOrderDetails(order.id)}
                sx={{
                  borderRadius: '20px', // Makes the button rounded
                  marginLeft: 'auto'  // Pushes the button to the right
                }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))
      )}

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

export default OrderList;
