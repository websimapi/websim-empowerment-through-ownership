document.addEventListener('DOMContentLoaded', function() {
    // Store all section details for toggling
    const allSections = document.querySelectorAll('section');
    const allDeepDetails = [];

    // Add interactive elements
    allSections.forEach(section => {
        // Add toggle button to each section
        const header = section.querySelector('h2');
        const details = section.querySelector('.concept-details');

        if (header && details) {
            const toggleButton = document.createElement('button');
            toggleButton.className = 'toggle-btn';
            toggleButton.innerHTML = '<i class="fas fa-chevron-down"></i> Expand';

            // Add the button after the header
            header.appendChild(toggleButton);

            // Initially hide longer details
            const deepDetails = details.querySelectorAll('ul, ol, p:not(:first-child)');
            deepDetails.forEach(el => {
                el.style.display = 'none';
                allDeepDetails.push(el);
            });

            // Toggle functionality
            toggleButton.addEventListener('click', function() {
                deepDetails.forEach(el => {
                    if (el.style.display === 'none') {
                        el.style.display = 'block';
                        toggleButton.innerHTML = '<i class="fas fa-chevron-up"></i> Collapse';
                    } else {
                        el.style.display = 'none';
                        toggleButton.innerHTML = '<i class="fas fa-chevron-down"></i> Expand';
                    }
                });
            });
        }
    });

    // Handle Expand All button
    const expandAllBtn = document.getElementById('expand-all-btn');
    if (expandAllBtn) {
        let expanded = false;

        expandAllBtn.addEventListener('click', function() {
            expanded = !expanded;

            allDeepDetails.forEach(el => {
                el.style.display = expanded ? 'block' : 'none';
            });

            // Update all toggle buttons
            document.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.innerHTML = expanded ? 
                    '<i class="fas fa-chevron-up"></i> Collapse' : 
                    '<i class="fas fa-chevron-down"></i> Expand';
            });

            // Update the expand all button text
            expandAllBtn.innerHTML = expanded ? 
                '<i class="fas fa-compress-alt"></i> Collapse All' : 
                '<i class="fas fa-expand-alt"></i> Expand All';
        });
    }

    // Create a new idea input form
    const main = document.querySelector('main');
    const ideaSection = document.createElement('section');
    ideaSection.id = 'new-ideas';

    ideaSection.innerHTML = `
        <h2>Add Your Ideas</h2>
        <div class="concept-details">
            <form id="idea-form">
                <div class="form-group">
                    <label for="idea-category">Category:</label>
                    <select id="idea-category" required>
                        <option value="home-license">Home Ownership Licensing</option>
                        <option value="aidd-programs">Programs for A/I/DD Individuals</option>
                        <option value="implementation">Implementation Models</option>
                        <option value="career-pathways">Career Pathways</option>
                        <option value="benefits">Additional Benefits</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="idea-title">Idea Title:</label>
                    <input type="text" id="idea-title" required placeholder="Enter a concise title">
                </div>
                <div class="form-group">
                    <label for="idea-description">Description:</label>
                    <textarea id="idea-description" rows="4" required placeholder="Describe your idea..."></textarea>
                </div>
                <button type="submit"><i class="fas fa-plus-circle"></i> Add Idea</button>
            </form>

            <div id="ideas-container">
                <h3>New Ideas:</h3>
                <div class="ideas-list-empty" id="ideas-empty">No ideas added yet. Be the first to contribute!</div>
                <ul id="ideas-list"></ul>
            </div>
        </div>
    ";

    main.appendChild(ideaSection);

    // Style the form
    const form = document.getElementById('idea-form');
    if (form) {
        // Styling is now handled by CSS

        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const category = document.getElementById('idea-category').value;
            const title = document.getElementById('idea-title').value;
            const description = document.getElementById('idea-description').value;

            // Hide empty message
            document.getElementById('ideas-empty').style.display = 'none';

            // Create a new list item
            const newIdea = document.createElement('li');
            newIdea.className = 'user-idea';
            newIdea.innerHTML = `
                <div class="idea-header">
                    <strong>${title}</strong>
                    <span class="idea-category">${document.getElementById('idea-category').options[document.getElementById('idea-category').selectedIndex].text}</span>
                </div>
                <p>${description}</p>
            `;

            // Add to ideas list
            document.getElementById('ideas-list').appendChild(newIdea);

            // Clear form
            form.reset();
        });
    }

    // Add smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
});