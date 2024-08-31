const DownloadTextFile = ({ transcription }) => {
  const downloadTextAsFile = () => {
    const text = document.getElementById("text-content").innerText;

    const blob = new Blob([text], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    link.download = "transcript.txt";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div>
      <p id='text-content' style={{ display: "none" }}>
        {transcription}
      </p>

      {transcription && (
        <button
          onClick={downloadTextAsFile}
          className='font-bold text-lg text-center items-center'
        >
          Download as File
        </button>
      )}
    </div>
  );
};

export default DownloadTextFile;
