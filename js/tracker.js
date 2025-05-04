document.addEventListener('DOMContentLoaded', function() {
    // Elements in tracker section
    const statusText = document.getElementById('status-text');
    const technicianName = document.getElementById('technician-name');
    const serviceType = document.getElementById('service-type');
    const eta = document.getElementById('eta');
    const stageItems = document.querySelectorAll('.stage-item');
    
    // Mock data for the tracker
    const trackerStages = [
        'Booking Confirmed',
        'Technician Assigned',
        'En Route',
        'Service in Progress',
        'Service Complete'
    ];
    
    const technicians = [
        'David Chen',
        'Michael Rodriguez',
        'Sarah Johnson',
        'James Wilson',
        'Maria Garcia'
    ];
    
    const serviceTypes = [
        'Battery Replacement',
        'Oil Change',
        'Brake Service',
        'Tire Replacement',
        'Engine Diagnostic',
        'Electrical Repair'
    ];
    
    // Function to update the tracker status
    window.updateTrackerStatus = function() {
        // Current stage is "En Route" by default (index 2)
        let currentStage = 2;
        
        // Update selected technician and service
        const randomTech = technicians[Math.floor(Math.random() * technicians.length)];
        const randomService = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
        const randomEta = Math.floor(Math.random() * 20 + 5); // Random ETA between 5 and 25 minutes
        
        technicianName.textContent = randomTech;
        serviceType.textContent = randomService;
        eta.textContent = `${randomEta} minutes`;
        statusText.textContent = trackerStages[currentStage];
        
        // Update stage indicators
        stageItems.forEach((stageItem, index) => {
            stageItem.classList.remove('active', 'current');
            
            if (index < currentStage) {
                stageItem.classList.add('active');
            } else if (index === currentStage) {
                stageItem.classList.add('current');
            }
        });
        
        // Start the progress animation
        simulateProgress();
    };
    
    // Function to simulate service progress
    function simulateProgress() {
        // Booking flow simulation times (in seconds)
        const stageTimes = [0, 30, 60, 90, 120]; // Time in seconds when each stage should be reached
        let startTime = Date.now();
        
        function updateProgress() {
            const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
            
            // Determine current stage based on elapsed time
            let newStage = 2; // Default is "En Route" (index 2)
            
            for (let i = 0; i < stageTimes.length; i++) {
                if (elapsedSeconds >= stageTimes[i]) {
                    newStage = i;
                }
            }
            
            // Update display if stage changed
            if (newStage !== 2) { // If not still at "En Route"
                statusText.textContent = trackerStages[newStage];
                
                // Update ETA based on stage
                if (newStage < 4) { // If not complete
                    const remainingMinutes = Math.max(1, Math.floor((stageTimes[4] - elapsedSeconds) / 60));
                    eta.textContent = `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
                } else {
                    eta.textContent = 'Completed';
                }
                
                // Update stages
                stageItems.forEach((stageItem, index) => {
                    stageItem.classList.remove('active', 'current');
                    
                    if (index < newStage) {
                        stageItem.classList.add('active');
                    } else if (index === newStage) {
                        stageItem.classList.add('current');
                    }
                });
                
                // Show toast notifications for stage transitions
                showStageNotification(newStage);
            }
            
            // Continue updating until service is complete
            if (elapsedSeconds < stageTimes[4]) {
                setTimeout(updateProgress, 1000);
            }
        }
        
        // No actual progress tracking for demo
        // The complete simulation would happen if we start it
        // For now, we leave it in the initial state
    }
    
    // Function to show toast notification for stage transitions
    function showStageNotification(stage) {
        let title, message, type;
        
        switch(stage) {
            case 0:
                title = 'Booking Confirmed';
                message = 'Your service request has been received';
                type = 'info';
                break;
            case 1:
                title = 'Technician Assigned';
                message = `${technicianName.textContent} will handle your service`;
                type = 'info';
                break;
            case 2:
                title = 'Technician En Route';
                message = `Estimated arrival in ${eta.textContent}`;
                type = 'info';
                break;
            case 3:
                title = 'Service Started';
                message = `${serviceType.textContent} is now in progress`;
                type = 'info';
                break;
            case 4:
                title = 'Service Complete';
                message = 'Thank you for choosing QwikFix!';
                type = 'success';
                break;
        }
        
        if (title && message) {
            showToast({
                title: title,
                message: message,
                type: type
            });
        }
    }
});
