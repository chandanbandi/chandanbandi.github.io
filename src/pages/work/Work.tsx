import './Work.css'
import { useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { getAllExperiences } from "../../services/index"
import IExperience from "../../models/experience"

function Work() {
  const [experiences, setExperiences] = useState<IExperience[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/work/0")
    getAllExperiences().then((data: IExperience[]) => {
      setExperiences(data);
    })
  }, []);

  const scrollToTop = () => {
    console.log(window);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <>
      <button onClick={scrollToTop} className="button-round button-fixed">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>
      <div className="grid h-100 work-grid">
        <aside aria-label="Sidebar">
          <div className="h-100 sidebar">
            <ul>
              {experiences.map((experience) => (
                <li key={experience.id}>
                  <NavLink to={`/work/${experience.id}`} className={({ isActive, isPending }) => isPending ? 'pending' : isActive ? 'active' : 'item'}>
                    <span className="ms-3">{experience.company}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <section className="fade-in-left">
          <Outlet />
        </section>
      </div>
    </>
  )
}

export default Work