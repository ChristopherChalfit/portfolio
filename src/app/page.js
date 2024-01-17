"use client";
import Contact from '@/components/Contact/Contact';
import './Home.sass'
import Presentation from "@/components/Presentation/Presentation";
import Projects from '@/components/Projects/Projects';
import Skills from "@/components/Skills/Skills";
import { projects } from '@/redux/store';
import { useSelector } from 'react-redux';
export default function Home() {
  const project = useSelector(projects)
  const latestProjects = project.slice(-3);
   return (
    <div className='home'>
      <Presentation/>
      <Skills/>
      <Projects m_project={latestProjects}/>
      <Contact/>
    </div>
  )
}
