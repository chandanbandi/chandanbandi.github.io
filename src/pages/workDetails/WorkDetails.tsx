import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import './WorkDetails.css';
import IExperience from "../../models/experience";
import { getAllExperiences } from "../../services";

export default function WorkDetails() {
    let { id } = useParams();
    const [experience, setExperience] = useState<IExperience[]>([])

    useEffect(() => {
        getAllExperiences().then((data: IExperience[]) => {
            setExperience(data);
        })
    }, []);
    return (
        <div className="room-wrapper h-100">
            <header className="room-heading">
                <h1>Case Study</h1>
            </header>
            <section className='side-section'>
                {experience.map((exp) => {
                    if (exp.id == Number(id)) {
                        return (
                            <div key={exp.id}>
                                <h2 className="card-heading mb-2">{exp.company}</h2>
                                <div className="mb-1 text-xl tracking-tight text-slate-200 dark:text-slate-100">{parse(exp.details)}</div>
                                {
                                    exp.screens.map((screen) => {
                                        return (
                                            exp.hasVideo ? <video className="mb-1 max-w-full w-100 rounded-lg border-2 border-yellow-500" key={screen.id} src={screen.src} controls autoPlay loop muted /> : <img className="mb-1 max-w-full w-100 rounded-lg border-2 border-yellow-500" key={screen.id} src={screen.src} alt={screen.alt} />
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                })}
            </section>
        </div>
    )
}