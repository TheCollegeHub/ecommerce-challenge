import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Box
} from "@mui/material";
import { ShoppingCart, Search, Assignment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo-store.png';

const initialProducts = [
  { id: 1, name: "MacBook Pro 16\"", category: "Laptops", price: 2499.99, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=3126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Samsung Galaxy S23 Ultra", category: "Smartphones", price: 1199.99, image: "https://images.unsplash.com/photo-1709744722656-9b850470293f?q=80&w=2252&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, name: "Logitech MX Master 3S", category: "Accessories", price: 99.99, image: "https://images.unsplash.com/photo-1739742473235-34a7bd9b8f87?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 4, name: "Apple AirPods Pro (2nd Gen)", category: "Accessories", price: 249.99, image: "https://images.unsplash.com/photo-1585565804112-f201f68c48b4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [cartCount, setCartCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemCount = storedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(cartItemCount);
  }, []);

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = storedCart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      storedCart[existingProductIndex].quantity += 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    setCartCount(prevCount => prevCount + 1);
    setSnackbarOpen(true);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    let sortedProducts = [...products];
    if (event.target.value === "name") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (event.target.value === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (event.target.value === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleOrdersClick = () => {
    navigate("/orders");
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem", position: "relative" }}>
      {/* Cart and Orders Icons */}
      <Box display="flex" justifyContent="flex-end" gap={2} marginBottom={2}>
        <IconButton color="inherit" onClick={handleOrdersClick}>
          <Assignment />
        </IconButton>
        <IconButton color="inherit" onClick={handleCartClick}>
          <Badge badgeContent={cartCount} color="primary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Box>

      {/* Search Field */}
      <TextField
        label="Search by name or category"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: "1rem" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          )
        }}
      />

      {/* Filters and Sorting */}
      <Box display="flex" gap={2} marginBottom={2} flexWrap="wrap">
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter by Category">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Laptops">Laptops</MenuItem>
            <MenuItem value="Smartphones">Smartphones</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Sort by</InputLabel>
          <Select value={sort} onChange={handleSortChange} label="Sort by">
            <MenuItem value="">None</MenuItem>
            <MenuItem value="name">Name (A-Z)</MenuItem>
            <MenuItem value="price-asc">Price (Low to High)</MenuItem>
            <MenuItem value="price-desc">Price (High to Low)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Product List */}
      <Box display="flex" flexWrap="wrap" gap={2} marginTop={2}>
        {products
          .filter((product) =>
            (!filter || product.category === filter) &&
            (product.name.toLowerCase().includes(search) || product.category.toLowerCase().includes(search))
          )
          .map((product) => (
            <Card key={product.id} style={{ width: "250px", display: "flex", flexDirection: "column", height: "350px" }}>
              <CardMedia component="img" height="140" image={product.image} alt={product.name} />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.category}
                </Typography>
                <Typography variant="h6" style={{ marginTop: "auto" }}>${product.price.toFixed(2)}</Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(product)}
                style={{ marginTop: "8px" }}
              >
                Add to Cart
              </Button>
            </Card>
          ))}
      </Box>

      {/* Snackbar for Cart Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Product added to cart!"
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

export default ProductList;
