import React, { createContext, useContext, useEffect, useState } from "react";
import appPages from "./app.module.scss";
import { useParams } from "react-router-dom";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { TaskDatabaseContext } from "./App";
import { ProjectSection } from "../../components/app-components/project-components/project-section/ProjectSection";
import { ProjectPageLayout } from "../../components/app-components/project-components/project-page-layout/ProjectPageLayout";
import { uid } from "uid";
import { AddSection } from "../../components/app-components/project-components/add-section/AddSection";
import { FirebaseContext } from "../../App";
import { collection, doc, updateDoc } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";

export const ProjectPageContext = createContext(null);

export const Project = () => {
  const { projectID } = useParams();
  const { setProjectLinks, projectLinks } = useContext(TaskDatabaseContext);
  const [project] = projectLinks.filter((link) => link.ID === projectID);
  const { auth, db } = useContext(FirebaseContext);

  async function addSection(e) {
    e.preventDefault();
    const target = e.target;
    const form = new FormData(target);
    const formEntry = Object.fromEntries(form.entries());
    console.log(formEntry);
    const sectionLength = project.sections.length - 1;
    const newSection = {
      ...formEntry,
      sectionIndex: sectionLength + 1,
    };
    const updateProject = {
      ...project,
      sections: [...project.sections, newSection],
    };
    const filterProjects = projectLinks.filter((proj) => proj.ID !== projectID);
    try {
      const projectDocRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        projectID
      );
      const updateProjectSection = await updateDoc(projectDocRef, {
        sections: [...project.sections, newSection],
      });
      setProjectLinks([updateProject, ...filterProjects]);
    } catch (err) {
      console.log("unable to add another section");
      throw err;
    }
  }

  async function deleteSection(e, sectionIndex) {
    e.preventDefault();
    console.log(sectionIndex);
    const filterProjectSections = project.sections.filter(
      (section) => section.sectionIndex !== sectionIndex
    );
    console.log(filterProjectSections);

    const filterProjectSectionTasks = project.sectionTasks.filter(
      (sectionTask) => sectionTask.sectionOwnerIndex !== sectionIndex
    );
    const updateCurrentProject = {
      ...project,
      sections: filterProjectSections,
      sectionTasks: filterProjectSectionTasks,
    };
    const updateProjectLinks = projectLinks.map((proj) => {
      if (proj.ID === projectID) {
        return updateCurrentProject;
      }
      return proj;
    });

    try {
      const projectDocRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        projectID
      );
      const updateProjectDoc = updateDoc(projectDocRef, updateCurrentProject);
      setProjectLinks(updateProjectLinks);
    } catch (err) {
      console.log("unable to remove section");
      throw err;
    }
  }

  async function editSection(e, sectionIndex) {
    e.preventDefault()
    const target = e.target;
    const form = new FormData(target)
    const formEntries = Object.fromEntries(form.entries())
    const [targetSection] = project.sections.filter(section => section.sectionIndex === sectionIndex)
    const updatedSection = { ...targetSection, sectionTitle: formEntries.sectionTitle }
    const updateProjectSections = project.sections.map(section => {
      if (section.sectionIndex === sectionIndex) {
        return { ...section, ...updatedSection }
      }
      return section
    })
    const updateProject = { ...project, sections: updateProjectSections }
    const updateProjectList = projectLinks.map(proj => {
      if (proj.ID === projectID) {
        return updateProject
      }
      return proj
    })
    console.log(updateProjectList)
    try {
      const projectDoc = doc(db, 'users', auth.currentUser.uid, 'projects', projectID)
      const updateProjectDoc = updateDoc(projectDoc, updateProject)
      setProjectLinks(updateProjectList)

    } catch (err) {
      console.log('unable to edit project section')
      throw err
    }


  }

  async function addSectionTask(e) {
    e.preventDefault();
    const target = e.target;
    const section = target.parentElement.parentElement;
    const sectionIndex = section.dataset.indexpos;
    const form = new FormData(target);
    const formEntry = Object.fromEntries(form.entries());
    const newTask = {
      ...formEntry,
      ID: uid(16),
      sectionOwnerIndex: Number(sectionIndex),
    };
    const updateProject = {
      ...project,
      sectionTasks: [...project.sectionTasks, newTask],
    };
    const filterProject = projectLinks.filter((proj) => proj.ID !== projectID);
    try {
      const tasksCollectionRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        projectID
      );
      const updateProjectSectionTasks = await updateDoc(tasksCollectionRef, {
        sectionTasks: [...project.sectionTasks, newTask],
      });
      setProjectLinks([updateProject, ...filterProject]);
    } catch (err) {
      console.log("unable to add task");
      throw err;
    }
  }

  async function deleteSectionTask(e, ID) {
    e.preventDefault()
    const filteredSectionTasks = project.sectionTasks.filter(sectionTask => sectionTask.ID !== ID)
    const updateProject = {
      ...project,
      sectionTasks: filteredSectionTasks
    }
    const mapProjects = projectLinks.map(proj => {
      if (proj.ID === projectID) {
        return updateProject
      }
      return proj
    })
    setProjectLinks(mapProjects)
    try{
     const projectDoc = doc(db,'users',auth.currentUser.uid,'projects',projectID) 
      const updatedSection = await updateDoc(projectDoc,updateProject)

    }catch(err){
      console.log('unable to delete section task')
      throw err
    }
  }
  async function editSectionTask(e) {
    e.preventDefault()
  }

  useEffect(() => {
    console.log(project);
  }, [project]);

  const appendProjectSections = project.sections.map((section) => {
    return (
      <ProjectSection
        key={section.sectionIndex + "-section-" + section.sectionTitle}
        sectionData={section}
        sectionTasks={project.sectionTasks}
        addTask={addSectionTask}
        deleteTask={deleteSectionTask}
      />
    );
  });

  return (
    <div key={project.ID} className={`${appPages.projectPage}`}>
      <HeaderComponent pageName={`${project.projectName}`} />
      <ProjectPageContext.Provider value={{ editSection, deleteSection, addSection }}>
        <ProjectPageLayout>
          <AnimatePresence mode="popLayout">
            {appendProjectSections}
          </AnimatePresence>
          <AddSection addSection={addSection} project={projectLinks} />
        </ProjectPageLayout>
      </ProjectPageContext.Provider>
    </div>
  );
};
