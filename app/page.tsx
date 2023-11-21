import React, { useState, useEffect } from 'react';
import styles from './styles/index.module.scss';
import ClassicGame from './components/ClassicGame.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';

function IndexPage() {
  return (
    <>
      <Nav/>
      <ClassicGame />
      <Footer/>
    </>
  )
}

export const metadata = {
  title: 'Redux Toolkit',
}


export default IndexPage
