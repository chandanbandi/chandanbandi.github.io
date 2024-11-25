
import './Contact.css';

function Contact() {
  return (
    <div className="room-wrapper fade-in-left h-100">
      <header className="room-heading">
        <h1>Contact Me</h1>
      </header>
      <section className='main-section'>
        <p className='mb-1'>Please send me your message and I will get back to you as soon as possible.</p> 
        <p className='mb-1'><span className='font-bold'>Email:</span> <a href="mailto:bchandu2988@gmail.com">bchandu2988@gmail.com</a></p>
        <p className='mb-1'><span className='font-bold'>Phone:</span> <a href="tel:+1 224-410-9571">+1 224-410-9571</a></p>
        <p><span className='font-bold'>Address:</span> <a href="https://maps.app.goo.gl/gU4bypYnCG8H2wKLA">2921 Aslynn Circle, Aubrey, TX 76227</a></p>
      </section>
    </div>
  )
}

export default Contact