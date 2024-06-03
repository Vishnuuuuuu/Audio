document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");
    const recordButton = document.getElementById("recordButton");
    const resumeButton = document.getElementById("resumeButton");
    const recordedFrequenciesBody = document.getElementById("recordedFrequenciesBody");
    const resultsDisplay = document.getElementById("resultsDisplay");
    const frequencyBox = document.getElementById("frequencyBox");

    let currentFrequency = 20;
    let audiometryInterval;
    let audioContext;
    let oscillator;

    startButton.addEventListener("click", startAudiometry);
    stopButton.addEventListener("click", stopAudiometry);
    recordButton.addEventListener("click", recordData);
    resumeButton.addEventListener("click", resumeAudiometry);

    function startAudiometry() {
        currentFrequency = 20;
        frequencyBox.innerText = currentFrequency + " Hz";
        startButton.disabled = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        recordButton.disabled = false;

        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        playSound(currentFrequency);

        audiometryInterval = setInterval(() => {
            currentFrequency += 100;
            if (currentFrequency <= 20000) {
                frequencyBox.innerText = currentFrequency + " Hz";
                playSound(currentFrequency);
            } else {
                stopAudiometry();
            }
        }, 1000);
    }

    function stopAudiometry() {
        clearInterval(audiometryInterval);
        startButton.disabled = false;
        stopButton.disabled = true;
        recordButton.disabled = true;
        resumeButton.disabled = false;
        if (audioContext) {
            audioContext.close();
        }
    }

    function resumeAudiometry() {
        startAudiometry();
        resumeButton.disabled = true;
    }

    function recordData() {
        const frequency = currentFrequency;
        const user = document.createElement("tr");
        user.innerHTML = `
            <td>User ${recordedFrequenciesBody.children.length + 1}</td>
            <td>${frequency} Hz</td>
            <td><button onclick="processRecordedData(${frequency})">Process</button></td>
        `;
        recordedFrequenciesBody.appendChild(user);
        stopAudiometry();
    }

    function processRecordedData(frequency) {
        const averageDisplayForUser = document.createElement("div");
        averageDisplayForUser.textContent = `Average Frequency for User ${recordedFrequenciesBody.children.length}: ${frequency.toFixed(2)} Hz`;
        resultsDisplay.appendChild(averageDisplayForUser);
    }

    function playSound(frequency) {
        if (audioContext) {
            oscillator = audioContext.createOscillator();
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.connect(audioContext.destination);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        }
    }

    function downloadPDF() {
        const pdf = new jsPDF();
        const reportContent = document.getElementById('resultsDisplay').innerHTML;
        pdf.text(reportContent, 10, 10);
        pdf.save('hearing_test_report.pdf');
    }
});