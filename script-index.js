// Fullscreen Webcam
// Cross-browser compatible webcam access

document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.webcam');
    const startButton = document.querySelector('.start-webcam');
    const errorMessage = document.querySelector('.webcam-error');
    const iframe = document.querySelector('iframe')

    // Check if getUserMedia is supported
    function hasGetUserMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    // Start webcam
    async function startWebcam() {
        if (!hasGetUserMedia()) {
            showError('Dein Browser unterstützt keine Webcam-Funktion.');
            return;
        }

        try {
            // Request webcam access with video constraints
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    facingMode: 'user' // Front camera on mobile devices
                },
                audio: false
            });

            // Set video source to webcam stream
            video.srcObject = stream;
            video.play();

            // Hide start button and error message
            if (startButton) startButton.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'none';

            // Show iframe
            iframe.style.display = 'block'

            // Show video
            video.style.display = 'block';

        } catch (error) {
            handleError(error);
        }
    }

    // Handle different error types
    function handleError(error) {
        let message = 'Ein Fehler ist aufgetreten.';

        switch (error.name) {
            case 'NotAllowedError':
            case 'PermissionDeniedError':
                message = 'Kamera-Zugriff wurde verweigert. Bitte erlaube den Zugriff in deinen Browser-Einstellungen.';
                break;
            case 'NotFoundError':
            case 'DevicesNotFoundError':
                message = 'Keine Kamera gefunden. Bitte schließe eine Webcam an.';
                break;
            case 'NotReadableError':
            case 'TrackStartError':
                message = 'Die Kamera wird bereits von einer anderen Anwendung verwendet.';
                break;
            case 'OverconstrainedError':
            case 'ConstraintNotSatisfiedError':
                message = 'Die Kamera unterstützt die angeforderte Auflösung nicht.';
                break;
            case 'NotSupportedError':
                message = 'Dein Browser unterstützt keine Webcam-Funktion.';
                break;
            case 'TypeError':
                message = 'Keine Mediengeräte verfügbar.';
                break;
            default:
                message = `Kamera-Fehler: ${error.message}`;
        }

        showError(message);
        console.error('Webcam Error:', error);
    }

    // Show error message
    function showError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
    }

    // Add click event to start button
    if (startButton) {
        startButton.addEventListener('click', startWebcam);
    }

    // Optional: Auto-start webcam 
    // startWebcam();
});
