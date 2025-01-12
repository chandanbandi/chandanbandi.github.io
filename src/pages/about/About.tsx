import Rating from '../../components/rating/Rating'
import './About.css'
function About() {
  return (
    <div className="room-wrapper fade-in-left h-100">
      <header className="room-heading">
        <h1>About</h1>
      </header>
      <section className='main-section'>
        <p className='mb-1'>Hi, I'm Chandan Bandi, and I specialize in creating beautiful and professional websites. Through my first job, I discovered my passion for UX design and front-end development. When I'm not crafting elegant solutions, I enjoy sketching nature-inspired art and cooking.</p>
        <p>I design high-quality web and mobile solutions that are fully responsive and thoroughly tested across a wide range of devices. If you're a recruiter interested in my profile, please take a look at my portfolio.</p>
        <div className='mt-1'>
          <a href='doc/ChandanBandi_Resume.pdf' target='_blank' className="inline-flex cta-link items-center font-medium text-yellow-500 hover:underline">
            Download Resume
          </a>
        </div>
      </section>
      <section className="sub-section">
        <h2 className="card-heading">Skills</h2>
        <div className="grid card-grid">
          <Rating rating={5} total={5} title="HTML 5" />
          <Rating rating={5} total={5} title="CSS 3" />
          <Rating rating={4} total={5} title="JavaScript" />
          <Rating rating={5} total={5} title="jQuery" />
          <Rating rating={3} total={5} title="Angular" />
          <Rating rating={4} total={5} title="React" />
          <Rating rating={3} total={5} title="NextJS" />
          <Rating rating={3} total={5} title="MUI" />
          <Rating rating={5} total={5} title="LESS" />
          <Rating rating={5} total={5} title="SCSS" />
          <Rating rating={5} total={5} title="Bootstrap" />
          <Rating rating={5} total={5} title="Gulp" />
        </div>
      </section>
      <section className="sub-section">
        <h2 className="card-heading">Tools</h2>
        <div className="grid card-grid">
          <Rating rating={5} total={5} title="Photoshop" />
          <Rating rating={5} total={5} title="Visual Studio" />
          <Rating rating={5} total={5} title="Visual Studio Code" />
          <Rating rating={5} total={5} title="Dreamweaver" />
          <Rating rating={5} total={5} title="Github" />
          <Rating rating={4} total={5} title="Invision" />
          <Rating rating={5} total={5} title="Figma" />
        </div>
      </section>
    </div>
  )
}

export default About