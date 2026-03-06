import './App.css'
import RadioComponent from './RadioComponent';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

function App() {
  return (
    <>
      <div className='stupidcontainer'>
        <PageHeader text={"Internet Radio Player"} />
        <p>This is a simple internet radio player that streams audio from a URL. Get a link from an <a href="https://www.internet-radio.com/">[internet radio directory]</a> and paste it into the url box.<br></br>
        Sometimes directories won't expose the direct link to the stream so you can open inspect element and take the link out of the network tab. 
        </p>
        <RadioComponent />
        <PageFooter />
      </div>
    </>
  )
}

export default App
