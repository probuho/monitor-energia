import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/DashboardNew";
import ConsumoPage from "./pages/ConsumoPage";
import AnalisisPage from "./pages/AnalisisPage";
import InformacionPage from "./pages/InformacionPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { routerConfig } from "./config/router-config";


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router {...routerConfig}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <RegisterForm />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/consumo" 
              element={
                <ProtectedRoute>
                  <ConsumoPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analisis" 
              element={
                <ProtectedRoute>
                  <AnalisisPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/informacion" 
              element={
                <ProtectedRoute>
                  <InformacionPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
