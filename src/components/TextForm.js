import React,{useState} from "react";

export default function TextForm(props) {
    const ReadText= ()=>{
    let textArea = document.getElementById("mybox");
    let speakButton = document.getElementById("speakbutton");

// Add an event listener to the speak button
    speakButton.addEventListener("click", function() {
  // Get the text from the text area
     let text = textArea.value;

  // Create a new SpeechSynthesisUtterance object
      let utterance = new SpeechSynthesisUtterance();

  // Set the text and voice of the utterance
      utterance.text = text;
      utterance.voice = window.speechSynthesis.getVoices()[0];

  // Speak the utterance
      window.speechSynthesis.speak(utterance);
});

    }
    const Download=()=>{
        document.getElementById("download").onclick = function(){
            var l = document.createElement("a");
            l.href = "data:text/plain;charset=UTF-8," + document.getElementById("mybox").value;
            l.setAttribute("download", document.getElementById("dload-fn").value);
            l.click();
          }
    }
    const handleUpClick= ()=>{
        let newtext=text.toUpperCase();
        setText(newtext)
    }
    const handleCopy= ()=>{
        var text=document.getElementById("mybox")
        text.select()
        navigator.clipboard.writeText(text.value)
    }
    const HandleOnChange= (Event)=>{
        setText(Event.target.value)
    }
    const handleloClick= ()=>{
        let newtext=text.toLowerCase();
        setText(newtext);
    }
    const handleClearClick= ()=>{
        let newtext=" ";
        setText(newtext);
    }
    const handleExtraSpaces= ()=>{
        let newtext=text.split(/[ ]+/)
        setText(newtext.join(" "))
    }
    const [text, setText] = useState("");
  return (
    <>
    <div className="container">
        <h1>{props.heading}</h1>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={text}
          onChange={HandleOnChange}
          id="mybox"
          rows="7"
        ></textarea>
        <br />
      <input placeholder="Enter file name to download as" id="dload-fn"/>
      <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to UpperCase</button>
      <button className="btn btn-primary mx-2" onClick={handleloClick}>Convert to LowerCase</button>
      <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear Text</button>
      <button className="btn btn-primary mx-2" onClick={handleCopy}>Copy Text</button>
      <button className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces }>Remove Extra Spaces</button>
      <button id="download" className="btn btn-primary mx-2" onClick={Download}>Download</button>
      <button className="btn btn-primary mx-2" id="speakbutton" onClick={ReadText}>Read the Text Aloud</button>
    </div>
    </div>
    <div className="container">
        <h1>Text Summary</h1>
        <h6>Your Text has {text.split(' ').filter(String).length} words and {text.length} characters</h6>
        <h6>{parseFloat(0.008 * text.split(' ').filter(String).length).toFixed(2)} Minutes read</h6>
    </div>
    </>
  );
}
