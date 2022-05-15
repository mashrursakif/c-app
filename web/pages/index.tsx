import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const token =
      sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) {
      router.push('/home');
    }
  }, []);

  const [showLogin, setShowLogin] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setShowLogin(true);
  };

  return (
    <div>
      <h1>Next.js</h1>
      <a href="/login" onClick={handleClick}>
        Login
      </a>
      <LoginForm show={showLogin} hideForm={() => setShowLogin(false)} />
    </div>
  );
};

export default Index;
