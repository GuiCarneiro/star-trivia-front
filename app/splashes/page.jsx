import styles from '../styles/splashes.module.scss';
import ClassicGame from '../components/ClassicGame.jsx';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

function SplashesPage() {
  return (    
    <>
      <Nav/>
      <ClassicGame/>
      <Footer/>
    </>
  )
}

export const metadata = {
  title: 'HSRdle',
  description: 'Daily guess a Honkai: Star Rail character with splash screen as clues ...'
}


export default SplashesPage
