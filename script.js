document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("loginModal");
    var btn = document.getElementById("loginBtn");
    var span = document.querySelector(".close");
    var voiceBtn = document.getElementById("voiceBtn");
    var usernameInput = document.getElementById("username");

    // Function to play audio prompt
    function playAudioMessage(message) {
        var speech = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(speech);
    }

    btn.onclick = function() {
        modal.style.display = "flex";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    voiceBtn.onclick = function() {
        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        playAudioMessage("Please say your username after the beep.");

        recognition.onresult = function(event) {
            var voiceInput = event.results[0][0].transcript;
            usernameInput.value = voiceInput;
            playAudioMessage("You said: " + voiceInput + ". If this is correct, please press proceed.");
        }

        recognition.onerror = function(event) {
            alert('Error occurred in recognition: ' + event.error);
        }
    }

    // Form submission handling
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        var username = usernameInput.value;
        localStorage.setItem('username', username); // Store the username in local storage
        modal.style.display = "none"; // Hide the modal
        // Perform any additional actions here, such as updating UI with username
    });
});

