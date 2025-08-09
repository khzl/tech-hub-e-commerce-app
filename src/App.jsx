import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Users from './components/Users';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminProducts from './components/AdminProducts';
import AdminCategories from './components/AdminCategories';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ErrorBoundary from './components/ErrorBoundary';
import AdminRoute from './components/AdminRoute';

const AppContent = () => {
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1565C0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: darkMode ? '#CCDC28' : '#1976d2',
        contrastText: "#ffffff",
      },
      background: {
        default: darkMode ? '#121212' : '#F5F7FA',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
      text:{
        primary: darkMode ? "#EDEDED" : "#212121",
        secondary: darkMode ? "#B0BECS" : "#546E7A",
      },
    },
    typography: {
      fontFamily: "'Cairo' , 'Roboto' , sans-serif",
      h4:{
        fontWeight: 700,
        color: darkMode ? "#E3F2FD" : "#1565C0",
      },
      button:{
        fontWeight: 600,
        textTransform: "none",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: '#1565C0',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#0D47A1',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#1e1e1e' : '#1565C0',
            color: darkMode ? '#ffffff' : '#000000',
          },
        },
      },
      MuiCard:{
        styleOverrides:{
          root: {
            borderRadius: 12,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          },
        },
      },
    },
  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary fallbackMessage="We're trouble loading the application. please refresh the page.">
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <ErrorBoundary fallbackMessage="There was an issue loading the login page.">
                    <Login />
                  </ErrorBoundary>
                </PublicRoute>
              }
            />
            <Route
              path="/products"
              element={
                  <ErrorBoundary fallbackMessage="Unable to load products. Please try again.">
                    <Products />
                  </ErrorBoundary>
              }
            />
            <Route
              path="/products/:id"
              element={
                  <ErrorBoundary fallbackMessage="Unable to load product details. Please try again.">
                    <ProductDetails />
                  </ErrorBoundary>
              }
            />
            <Route
              path="/cart"
              element={
                  <ErrorBoundary fallbackMessage="Unable to load cart. Please try again.">
                    <Cart />
                  </ErrorBoundary>
              }
            />
            <Route
              path="/checkout"
              element={
                  <ErrorBoundary fallbackMessage="Unable to load checkout. Please try again.">
                    <Checkout />
                  </ErrorBoundary>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <ErrorBoundary fallbackMessage="Unable to load users. Please try again.">
                    <Users />
                  </ErrorBoundary>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ErrorBoundary fallbackMessage="Unable to load admin products. Please try again.">
                    <AdminProducts />
                  </ErrorBoundary>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <AdminRoute>
                  <ErrorBoundary fallbackMessage="Unable to load admin categories. Please try again.">
                    <AdminCategories />
                  </ErrorBoundary>
                </AdminRoute>
              }
            />
            <Route path="/" element={<Navigate to="/products" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </ErrorBoundary>
    </MUIThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
