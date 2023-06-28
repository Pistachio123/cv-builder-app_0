/** @format */

import { Fragment } from "react";
import { BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";
import { GiGraduateCap } from "react-icons/gi";
import "../../CSS/ResumeArt.css";
import {
  HiOfficeBuilding,
  HiOutlineMail,
  HiPhone,
} from "react-icons/hi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { saveAs } from "file-saver";

import { useSelector } from "react-redux";

function ResumeSport() {
  const profile = useSelector((state) => state.profile);
  const name = profile.name.split(" ");
  const file = useSelector((state) => state.file);
  const about = useSelector((state) => state.about);
  const experienceList = useSelector((state) => state.experienceList);
  const educationList = useSelector((state) => state.educationList);
  const skills = useSelector((state) => state.skills);

  const createAndDownloadPdf = () => {
    const data = {
      profile: profile,
      name: name,
      file: file,
      about: about,
      experienceList: experienceList,
      educationList: educationList,
      skills: skills,
    };
    axios
      .post("http://localhost:5000/create-pdf", data)
      .then(() =>
        axios.get("http://localhost:5000/fetch-pdf", { responseType: "blob" })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "newPdf.pdf");
      });
  };

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", false);
      pdf.addImage(imgData, "PNG", 0, 0, 600, 0, undefined, false);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };

  const GetIcon = (icon) => {
    switch (icon.icon) {
      case "HiOutlineMail":
        return <HiOutlineMail size={30} />;
      case "HiPhone":
        return <HiPhone size={30} />;
      case "BsLinkedin":
        return <BsLinkedin size={30} />;
      case "BsGithub":
        return <BsGithub size={30} />;
      case "BsGlobe":
        return <BsGlobe size={30} />;
      default:
        return "●";
    }
  };
  const GetLinks = () => {
    const list = [];
    if (profile.email) {
      list.push({
        icon: "HiOutlineMail",
        link: profile.email,
      });
    }
    if (profile.contact) {
      list.push({
        icon: "HiPhone",
        link: profile.contact,
      });
    }
    if (profile.linkedin) {
      list.push({
        icon: "BsLinkedin",
        link: profile.linkedin,
      });
    }
    if (profile.github) {
      list.push({
        icon: "BsGithub",
        link: profile.github,
      });
    }
    if (profile.website) {
      list.push({
        icon: "BsGlobe",
        link: profile.website,
      });
    }

    return list.map((item, id) => {
      return (
        <div
          className={
            id % 2 === 0 ? "d-flex  text-white p-3" : "d-flex   text-white p-3 "
          }
          style={{ justifyContent: "end" }}
          key={id}>
          <p className='m-0'>
            <GetIcon icon={item.icon} />
          </p>
          <span className='mx-2'></span>
          <p className='m-0'>{item.link}</p>
        </div>
      );
    });
  };

  return (
    <Fragment>
      <div className='d-grid col-2 mx-auto mt-4'>
        <button
          className='nav-link align-middle bg-dark text-white p-2 rounded'
          onClick={printDocument}>
          Download
        </button>
      </div>
      <section className='resume ' id='divToPrint'>
        <div className='resume_top'>
          <div className='rtop_left'>
            <p className='name'>{name}</p>
            <p className='role'>{profile.position}</p>
          </div>
          <div className='rtop_right'>
            <GetLinks />
          </div>
          <div className='r_profile_pic'>
            <img
              style={{
                height: "160px",
                width: "160px",
                borderRadius: "9999px",
              }}
              src={file}
              alt='profile_pic'
            />
          </div>
        </div>
        <div className='resume_center'>
          <h2>About ME</h2>
          <p>{about}</p>
        </div>
        <div className='resume_bottom'>
          <div className='rbottom_left'>
            <div className='rb_skills'>
              <h2>Skills</h2>
              <div className='d-flex flex-wrap' style={{ display: "flex" }}>
                {skills.map((items, id) => {
                  return (
                    <p className='technology rounded' style={{}} key={id}>
                      {items}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className='rb_hobbies'>
              <h2>Hobbies</h2>
              <ul>
                <li>
                  <p>
                    <i className='fas fa-football'></i>
                  </p>
                  <p>Football</p>
                </li>
                <li>
                  <p>
                    <i className='fas fa-plant-wilt'></i>
                  </p>
                  <p>Planting</p>
                </li>
                <li>
                  <p>
                    <i className='fas fa-book'></i>
                  </p>
                  <p>Reading</p>
                </li>
                <li>
                  <p>
                    <i className='fas fa-bicycle'></i>
                  </p>
                  <p>Driving</p>
                </li>
                <li>
                  <p>
                    <i className='fas fa-chess'></i>
                  </p>
                  <p>Playing Chess</p>
                </li>
              </ul>
            </div>
          </div>
          <div className='rbottom_right'>
            <div className='px-4'>
              <h2 style={{ color: "white" }} className='title'>
                Education
              </h2>
              {educationList.map((item, id) => {
                return (
                  <div className='d-flex justify-content-start py-1' key={id}>
                    <GiGraduateCap size={40} />
                    <div className='px-3'>
                      <h4 style={{ color: "white" }}>{item.institute}</h4>
                      <p style={{ color: "white" }} className='m-0'>
                        {item.degree} • {item.fieldOfStudy}
                      </p>
                      <p style={{ color: "white" }}>
                        {item.startYear} - {item.endYear} • Grade: {item.grade}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='r_jobs'>
              <div className='px-4'>
                <h2 style={{ color: "white" }} className='title'>
                  Experience
                </h2>
                {experienceList.map((item, id) => {
                  return (
                    <div className='d-flex justify-content-start py-1' key={id}>
                      <HiOfficeBuilding size={30} />
                      <div className='px-3'>
                        <h4 style={{ color: "white" }}>{item.title}</h4>
                        <p className='m-0' style={{ color: "white" }}>
                          {item.company} • {item.startMonth} {item.startYear}{" "}
                          {`${
                            item.isWorking
                              ? " - Present"
                              : " - " + item.endMonth + " " + item.endYear
                          }`}
                        </p>
                        <p style={{ color: "white" }} className='m-0'>
                          {item.location}
                        </p>
                        <p style={{ color: "white" }}>{item.description}</p>
                      </div>
                    </div>
                  );
                })}

                <hr></hr>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default ResumeSport;
