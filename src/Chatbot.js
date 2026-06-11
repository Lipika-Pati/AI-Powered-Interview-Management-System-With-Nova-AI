import React, { useState } from "react";

function Chatbot() {

    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([]);

    // 🎤 MICROPHONE FUNCTION

    function startListening(){

        const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

        if(!SpeechRecognition){

            alert("Speech Recognition not supported in this browser");

            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.interimResults = false;

        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = function(event){

            const transcript =
            event.results[0][0].transcript;

            console.log(transcript);

            // 🎤 INPUT BOX ME TEXT SHOW HOGA

            setMessage(transcript);

        };

        recognition.onerror = function(event){

            console.log(event.error);

            alert("Microphone Error: " + event.error);

        };
    }

    // 🤖 SEND MESSAGE

    async function sendMessage() {

        if(message.trim() === "") return;

        const userMsg = {
            sender:"user",
            text:message
        };

        setMessages(prev => [...prev, userMsg]);

        try{

            const response = await fetch("http://127.0.0.1:5000/chat", {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    message:message
                })

            });

            const data = await response.json();

            const botMsg = {
                sender:"bot",
                text:data.reply
            };

            setMessages(prev => [...prev, botMsg]);

        }catch(error){

            setMessages(prev => [...prev, {
                sender:"bot",
                text:"Server not connected"
            }]);

        }

        setMessage("");
    }

    return(

        <>

        {/* 🤖 ROBOT BUTTON */}

        <div

        onClick={() => setOpen(!open)}

        style={{

            position:"fixed",
            bottom:"20px",
            right:"20px",
            width:"70px",
            height:"70px",
            borderRadius:"50%",
            background:"linear-gradient(135deg,#2563eb,#7c3aed)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontSize:"35px",
            cursor:"pointer",
            boxShadow:"0 0 20px rgba(37,99,235,0.5)",
            zIndex:"999"

        }}

        >

            🤖

        </div>

        {/* CHAT WINDOW */}

        {

            open && (

                <div style={{

                    position:"fixed",
                    bottom:"100px",
                    right:"20px",
                    width:"380px",
                    height:"550px",
                    background:"#111827",
                    borderRadius:"20px",
                    padding:"20px",
                    color:"white",
                    boxShadow:"0 0 20px rgba(0,0,0,0.5)",
                    display:"flex",
                    flexDirection:"column",
                    zIndex:"999"

                }}>

                    <h2 style={{
                        marginTop:"0",
                        fontSize:"28px",
                        textAlign:"center"
                    }}>
                        🤖 Nova AI
                    </h2>

                    {/* CHAT AREA */}

                    <div style={{
                        flex:"1",
                        overflowY:"auto",
                        marginBottom:"15px"
                    }}>

                        {

                            messages.map((msg,index)=>(

                                <div

                                key={index}

                                style={{

                                    background:
                                    msg.sender==="user"
                                    ? "#2563eb"
                                    : "#374151",

                                    padding:"14px",
                                    margin:"10px 0",
                                    borderRadius:"15px",
                                    fontSize:"16px"

                                }}

                                >

                                    {msg.text}

                                </div>

                            ))
                        }

                    </div>

                    {/* INPUT AREA */}

                    <div style={{
                        display:"flex",
                        alignItems:"center"
                    }}>

                        <input

                        id="chat-input"

                        value={message}

                        onChange={(e)=>setMessage(e.target.value)}

                        placeholder="Ask anything..."

                        style={{

                            flex:"1",
                            padding:"14px",
                            borderRadius:"10px",
                            border:"none",
                            outline:"none",
                            fontSize:"16px"

                        }}

                        />

                        {/* 🎤 MIC BUTTON */}

                        <button

                        onClick={startListening}

                        style={{

                            marginLeft:"10px",
                            padding:"14px",
                            border:"none",
                            borderRadius:"10px",
                            background:"#7c3aed",
                            color:"white",
                            cursor:"pointer",
                            fontSize:"18px"

                        }}

                        >

                            🎤

                        </button>

                        {/* SEND BUTTON */}

                        <button

                        onClick={sendMessage}

                        style={{

                            marginLeft:"10px",
                            padding:"14px",
                            border:"none",
                            borderRadius:"10px",
                            background:"#2563eb",
                            color:"white",
                            cursor:"pointer",
                            fontSize:"16px"

                        }}

                        >

                            Send

                        </button>

                    </div>

                </div>

            )

        }

        </>

    );
}

export default Chatbot;