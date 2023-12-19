// EyeTrackingComponent.jsx
import React, { useEffect, useRef } from 'react';

const EyeTrackingComponent = () => {
    const gazeCloudApiRef = useRef(null);

    useEffect(() => {
        // Include GazeCloudAPI.js script
        const script = document.createElement('script');
        script.src = 'https://api.gazerecorder.com/GazeCloudAPI.js';
        script.async = true;

        document.head.appendChild(script);

        script.onload = () => {
            // Assign the GazeCloudAPI to the ref
            gazeCloudApiRef.current = window.GazeCloudAPI;

            // Start eye tracking once the script is loaded
            gazeCloudApiRef.current.StartEyeTracking();

            // Define results data callback
            gazeCloudApiRef.current.OnResult = function (GazeData) {
                // Gaze data handling logic
                console.log('GazeData:', GazeData);
            };

            // Optional callbacks
            gazeCloudApiRef.current.OnCalibrationComplete = function () {
                console.log('Gaze Calibration Complete');
            };

            gazeCloudApiRef.current.OnCamDenied = function () {
                console.log('Camera access denied');
            };

            gazeCloudApiRef.current.OnError = function (msg) {
                console.log('Error: ' + msg);
            };
        };

        return () => {
            // Stop eye tracking and clean up when the component is unmounted
            if (gazeCloudApiRef.current) {
                gazeCloudApiRef.current.StopEyeTracking();
            }
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div>
            {/* Render Eye-Tracking results or UI components */}
        </div>
    );
};

export default EyeTrackingComponent;
