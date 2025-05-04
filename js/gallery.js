document.addEventListener('DOMContentLoaded', function() {
    // Gallery functionality for random images
    const randomGalleryImage = document.getElementById('random-gallery-image');
    const imageCaption = document.getElementById('image-caption');
    const newRandomImageBtn = document.getElementById('new-random-image');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Collection of car repair images and their captions
    const galleryImages = [
        {
            url: 'https://media.gettyimages.com/id/535654183/photo/car-mechanic-at-work-in-repair-garage.jpg?s=612x612&w=0&k=20&c=HYqKzrdbxG0RzO4RhkbstVuSRVTHwj-3bWN8pmIBkus=',
            caption: 'Mechanic replacing car battery on-site'
        },
        {
            url: 'https://media.istockphoto.com/id/522394158/photo/car-service-procedure.jpg?s=612x612&w=0&k=20&c=SXPyg7yMw0Uc4LuI59lchMouvjJ3z6r5oNKO7mdnHCc=',
            caption: 'Brake pad replacement service'
        },
        {
            url: 'https://plus.unsplash.com/premium_photo-1658527057580-f473648a16d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwb2lsJTIwY2hhbmdlfGVufDB8fDB8fHww',
            caption: 'Oil change being performed in driveway'
        },
        {
            url: 'https://media.istockphoto.com/id/1157103911/photo/mechanic-changes-a-tire-in-a-repair-shop-germany.jpg?s=612x612&w=0&k=20&c=X2dQb_fTZG3IZ3KdRKDprVJo4_hw5rATEIPw1yl4Ab0=',
            caption: 'Flat tire repair on the roadside'
        },
        {
            url: 'https://media.istockphoto.com/id/463462731/photo/computerized-wheel-alignment-machine-clamp.jpg?s=612x612&w=0&k=20&c=1TSPgkpZYY8ha69Fbp0Ny9oaAPtgGexcwmBbVXVB0_w=',
            caption: 'Wheel alignment and balancing'
        },
        {
            url: 'https://media.istockphoto.com/id/1350239751/photo/car-diagnostic-service-and-electronics-repair.jpg?s=612x612&w=0&k=20&c=6xSgzMp9KJJ8lN0hC1UcuqXuuZMLNFCgCkcju-Q0BTU=',
            caption: 'Engine diagnostics using laptop'
        },
        {
            url: 'https://t3.ftcdn.net/jpg/05/07/86/50/240_F_507865087_LRPoI52mi9fOy1XgPzuzrbifl1DP3iJW.jpg',
            caption: 'Alternator replacement service'
        },
        {
            url: 'https://media.istockphoto.com/id/1427644040/photo/employee-of-a-car-wash-or-a-car-detailing-studio-cleans-the-cockpit.jpg?s=612x612&w=0&k=20&c=pDYSGzli1CU1uE-ssSTifnZzmOjzSND4nM1VMmx_qWM=',
            caption: 'Professional car detailing'
        },
        {
            url: 'https://media.gettyimages.com/id/1190119032/photo/close-up-of-unrecognizable-mechanic-charging-ac-in-a-car.jpg?s=612x612&w=0&k=20&c=xgT056dJxsSIjZfPNatzAfZxfsqKW58Gh4az0RKUUpk=',
            caption: 'Air conditioning repair and recharge'
        },
        {
            url: 'https://media.istockphoto.com/id/1415705247/photo/a-mechanic-hand-holding-a-car-timing-belt.jpg?s=612x612&w=0&k=20&c=b1rbecT4Fu7tAP4MU2uBQ1OS5lYWRhFTZqC0lpzR8rs=',
            caption: 'Timing belt replacement service'
        },
        {
            url: 'https://media.istockphoto.com/id/511317032/photo/mechanic-technician-on-a-garage.jpg?s=612x612&w=0&k=20&c=-qcn7ekOcIOq1oSVCL9HJiDQbr7SjlfncK2cVxFDIV0=',
            caption: 'Mobile mechanic truck fully equipped'
        },
        {
            url: 'https://t4.ftcdn.net/jpg/13/68/04/27/240_F_1368042731_xfOHoM4RRJLTD1tZE6MDGPdV6FebBnAm.jpg',
            caption: 'Complete suspension check'
        }
    ];
    
    // Function to load a random image
    function loadRandomImage() {
        const randomIndex = Math.floor(Math.random() * galleryImages.length);
        const selectedImage = galleryImages[randomIndex];
        
        // Add a loading state
        randomGalleryImage.style.opacity = '0.5';
        imageCaption.textContent = 'Loading...';
        
        // Create a new image object to preload
        const img = new Image();
        img.onload = function() {
            // Once loaded, update the visible image
            randomGalleryImage.src = selectedImage.url;
            randomGalleryImage.alt = selectedImage.caption;
            imageCaption.textContent = selectedImage.caption;
            randomGalleryImage.style.opacity = '1';
            
            // Add a subtle animation
            randomGalleryImage.classList.add('loaded');
            setTimeout(() => {
                randomGalleryImage.classList.remove('loaded');
            }, 500);
        };
        img.onerror = function() {
            // Handle loading errors
            imageCaption.textContent = 'Image could not be loaded. Try another.';
            randomGalleryImage.style.opacity = '1';
        };
        img.src = selectedImage.url;
    }
    
    // Load a random image initially
    loadRandomImage();
    
    // Add click event to button for loading a new random image
    if (newRandomImageBtn) {
        newRandomImageBtn.addEventListener('click', loadRandomImage);
    }
    
    // Populate the gallery grid with all images
    function populateGalleryGrid() {
        galleryGrid.innerHTML = ''; // Clear any existing content
        
        galleryImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.caption;
            
            const caption = document.createElement('div');
            caption.className = 'gallery-item-caption';
            caption.textContent = image.caption;
            
            galleryItem.appendChild(img);
            galleryItem.appendChild(caption);
            
            // Add click event to show the image in the random image showcase
            galleryItem.addEventListener('click', function() {
                randomGalleryImage.src = image.url;
                randomGalleryImage.alt = image.caption;
                imageCaption.textContent = image.caption;
                
                // Scroll to the random image showcase if on mobile
                if (window.innerWidth < 768) {
                    const showcase = document.querySelector('.random-image-showcase');
                    showcase.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Initialize the gallery grid
    if (galleryGrid) {
        populateGalleryGrid();
    }
});