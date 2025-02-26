'use client'
import '../globals.css'
import React from 'react';
import Navbar from '../../components/Nav';
import Main from '../../components/Main';
import Footer from '../../components/Footer';

export default function App() {
    console.log("NOW RENDERING THE NEW ICLOUD APP")
  return (
    <>
      <Navbar/>
      <Main/>
      <Footer/>
    </>

    );
}