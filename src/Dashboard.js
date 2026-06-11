import React, { useState } from "react";
import "./App.css";
import toast from "react-hot-toast";

function Dashboard() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");

  const [time, setTime] = useState("");
  const [mode, setMode] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [interviewer, setInterviewer] = useState("");

  const [interviews, setInterviews] = useState([]);
  const [show, setShow] = useState(false);

  const role = localStorage.getItem("role");

  // ADD INTERVIEW

  const addInterview = async () => {

    if (
      !name ||
      !email ||
      !position ||
      !status ||
      !time ||
      !mode ||
      !meetingLink ||
      !interviewer
    ) {

      toast("Please fill all fields ⚠️");
      return;

    }

    const interview = {

      candidateName: name,
      candidateEmail: email,
      interviewerName: interviewer,
      interviewerEmail: "hr@gmail.com",
      position: position,
      date: "2026-03-20",
      status: status,
      time: time,
      mode: mode,
      meetingLink: meetingLink

    };

    try {

      const response = await fetch(
        "http://localhost:8081/api/interviews/add",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(interview)
        }
      );

      if (response.ok) {

        setInterviews([
          ...interviews,
          {
            name,
            email,
            position,
            status,
            time,
            mode,
            meetingLink,
            interviewer
          }
        ]);

        // CLEAR

        setName("");
        setEmail("");
        setPosition("");
        setStatus("");
        setTime("");
        setMode("");
        setMeetingLink("");
        setInterviewer("");

        toast.success("Interview Scheduled ✅");

      } else {

        toast.error("Backend Error ❌");

      }

    } catch (error) {

      toast.error("Server Error ❌");

    }

  };

  // DELETE

  const deleteInterview = (index) => {

    if(role !== "ADMIN") {

      toast.error("Only ADMIN can delete ❌");
      return;

    }

    const updatedList = interviews.filter((_, i) => i !== index);

    setInterviews(updatedList);

    toast.success("Deleted Successfully 🗑️");

  };

  // CSV

  const downloadCSV = () => {

    if(interviews.length === 0){

      toast("No Data ⚠️");
      return;

    }

    let csv =
      "Name,Email,Position,Status,Time,Mode,Interviewer\n";

    interviews.forEach(i => {

      csv +=
        `${i.name},${i.email},${i.position},${i.status},${i.time},${i.mode},${i.interviewer}\n`;

    });

    const blob = new Blob([csv], {
      type:"text/csv"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "interviews.csv";

    link.click();

    toast.success("CSV Downloaded ✅");

  };

  // PDF

  const downloadPDF = () => {

    if(interviews.length === 0){

      toast("No Data ⚠️");
      return;

    }

    import("jspdf").then(jsPDF => {

      import("jspdf-autotable").then((autoTable)=>{

        const doc = new jsPDF.default();

        const tableColumn = [
          "Name",
          "Email",
          "Position",
          "Status",
          "Time",
          "Mode",
          "Interviewer"
        ];

        const tableRows = [];

        interviews.forEach(i => {

          tableRows.push([
            i.name,
            i.email,
            i.position,
            i.status,
            i.time,
            i.mode,
            i.interviewer
          ]);

        });

        autoTable.default(doc, {

          head:[tableColumn],

          body:tableRows

        });

        doc.save("interviews.pdf");

        toast.success("PDF Downloaded ✅");

      });

    });

  };

  return (

    <div className="App">

      <div
        className="App-header"
        style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          width:"100%",
          padding:"20px"
        }}
      >

        <h1 className="title">

          📅 Interview Scheduling

        </h1>

        {/* ANALYTICS */}

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(2,1fr)",
            gap:"20px",
            marginBottom:"30px",
            width:"100%",
            maxWidth:"700px"
          }}
        >

          <div style={cardStyle}>
            <h2>{interviews.length}</h2>
            <p>Total Interviews</p>
          </div>

          <div style={cardStyle}>
            <h2>
              {
                interviews.filter(
                  i => i.status === "Selected"
                ).length
              }
            </h2>
            <p>Selected</p>
          </div>

          <div style={cardStyle}>
            <h2>
              {
                interviews.filter(
                  i => i.status === "Rejected"
                ).length
              }
            </h2>
            <p>Rejected</p>
          </div>

          <div style={cardStyle}>
            <h2>
              {
                interviews.filter(
                  i => i.status === "Pending"
                ).length
              }
            </h2>
            <p>Pending</p>
          </div>

        </div>

        <button

          onClick={()=>
            window.location.href="/feedback"
          }

          className="btn"

          style={{
            marginBottom:"20px"
          }}

        >

          Go To Feedback

        </button>

        {/* FORM */}

        <div className="card">

          <h3>Schedule Interview</h3>

          <input
            placeholder="Candidate Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <br/><br/>

          <input
            placeholder="Candidate Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <br/><br/>

          <input
            placeholder="Position"
            value={position}
            onChange={(e)=>setPosition(e.target.value)}
          />

          <br/><br/>

          {/* STATUS */}

          <select

            value={status}

            onChange={(e)=>setStatus(e.target.value)}

            style={{

              width:"100%",
              padding:"12px",
              borderRadius:"10px"

            }}

          >

            <option value="">Select Status</option>

            <option value="Pending">Pending</option>

            <option value="Selected">Selected</option>

            <option value="Rejected">Rejected</option>

          </select>

          <br/><br/>

          <input
            placeholder="Interview Time"
            value={time}
            onChange={(e)=>setTime(e.target.value)}
          />

          <br/><br/>

          <input
            placeholder="Interview Mode"
            value={mode}
            onChange={(e)=>setMode(e.target.value)}
          />

          <br/><br/>

          <input
            placeholder="Meeting Link"
            value={meetingLink}
            onChange={(e)=>setMeetingLink(e.target.value)}
          />

          <br/><br/>

          <input
            placeholder="Interviewer Name"
            value={interviewer}
            onChange={(e)=>setInterviewer(e.target.value)}
          />

          <br/><br/>

          <button
            className="btn"
            onClick={addInterview}
          >

            Schedule Interview

          </button>

        </div>

        {/* LIST */}

        <div className="card">

          <h3>Interview List</h3>

          <button
            className="btn"
            onClick={()=>setShow(true)}
          >
            View
          </button>

          <button
            className="btn"
            onClick={downloadCSV}
          >
            CSV
          </button>

          <button
            className="btn"
            onClick={downloadPDF}
          >
            PDF
          </button>

          {

            show && (

              <ul>

                {

                  interviews.map((item,index)=>(

                    <li key={index}>

                      <b>{item.name}</b>

                      <br/>

                      📧 {item.email}

                      <br/>

                      💼 {item.position}

                      <br/>

                      📌 {item.status}

                      <br/>

                      ⏰ {item.time}

                      <br/>

                      🌐 {item.mode}

                      <br/>

                      👨‍💼 {item.interviewer}

                      <br/><br/>

                      <button

                        className="btn"

                        style={{
                          background:"red"
                        }}

                        onClick={()=>
                          deleteInterview(index)
                        }

                      >

                        Delete

                      </button>

                      <hr/>

                    </li>

                  ))

                }

              </ul>

            )

          }

        </div>

      </div>

    </div>

  );
}

// CARD STYLE

const cardStyle = {

  background:"rgba(255,255,255,0.15)",
  color:"white",
  padding:"30px",
  borderRadius:"20px",
  textAlign:"center",
  boxShadow:"0 0 15px rgba(0,0,0,0.3)",
  backdropFilter:"blur(10px)"

};

export default Dashboard;