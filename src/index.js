const recognitionSvc = window?.SpeechRecognition || window?.webkitSpeechRecognition;
let recognition;

try {
  recognition = new recognitionSvc();
} catch(error) {
  document.getElementById('transcription').innerHTML = `This browser does not support speech recognition API. Please, use another one (Google Chrome recommended)`;
}

document.querySelector('#start').addEventListener('click', ()=>{
    const startBtn = document.querySelector('#start');
    recognition.lang = document.querySelector('#lang').value || 'fa-IR';
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const accumulatedResult = [];
      for (const result of event.results) accumulatedResult.push(`${result[0].transcript}`);
      let currentText = document.querySelector('#transcription').value;
      currentText += accumulatedResult.join(' ');
      document.querySelector('#transcription').value = currentText;
    };

    if(startBtn.classList.contains('listening')) recognition.stop();
    else recognition.start();

    startBtn.classList.toggle('listening');
});
document.querySelector('.copy').addEventListener('click', () => {
    const transcriptionText = document.querySelector('#transcription').value;
    navigator.clipboard.writeText(transcriptionText).then(() => {
        document.querySelector('#transcription').title = "Copied to clipboard!";
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});
