import styles from '../styles/quotes.module.scss';
import ClassicGame from '../components/ClassicGame.jsx';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

function QuotesPage() {
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
  description: 'Daily guess a Honkai: Star Rail character with in-game quotes as clues ...'
}


export default QuotesPage
