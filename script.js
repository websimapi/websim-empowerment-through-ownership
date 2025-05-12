document.addEventListener('DOMContentLoaded', function() {
    // Add interactive elements
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Add toggle button to each section
        const header = section.querySelector('h2');
        const details = section.querySelector('.concept-details');
        
        if (header && details) {
            const toggleButton = document.createElement('button');
            toggleButton.className = 'toggle-btn';
            toggleButton.innerHTML = 'Expand Ideas';
            toggleButton.style.marginLeft = '10px';
            toggleButton.style.padding = '5px 10px';
            toggleButton.style.background = '#3498db';
            toggleButton.style.color = 'white';
            toggleButton.style.border = 'none';
            toggleButton.style.borderRadius = '4px';
            toggleButton.style.cursor = 'pointer';
            
            // Add the button after the header
            header.appendChild(toggleButton);
            
            // Initially hide longer details
            const deepDetails = details.querySelectorAll('ul, p:not(:first-child)');
            deepDetails.forEach(el => {
                el.style.display = 'none';
            });
            
            // Toggle functionality
            toggleButton.addEventListener('click', function() {
                deepDetails.forEach(el => {
                    if (el.style.display === 'none') {
                        el.style.display = 'block';
                        toggleButton.innerHTML = 'Collapse Ideas';
                    } else {
                        el.style.display = 'none';
                        toggleButton.innerHTML = 'Expand Ideas';
                    }
                });
            });
        }
    });
    
    // Create a new idea input form
    const main = document.querySelector('main');
    const ideaSection = document.createElement('section');
    ideaSection.id = 'new-ideas';
    
    ideaSection.innerHTML = `
        <h2>Add Your Ideas</h2>
        <div class="concept-details">
            <form id="idea-form">
                <div>
                    <label for="idea-category">Category:</label>
                    <select id="idea-category" required>
                        <option value="home-license">Home Ownership Licensing</option>
                        <option value="aidd-programs">Programs for A/I/DD Individuals</option>
                        <option value="implementation">Implementation Models</option>
                        <option value="benefits">Additional Benefits</option>
                    </select>
                </div>
                <div>
                    <label for="idea-title">Idea Title:</label>
                    <input type="text" id="idea-title" required>
                </div>
                <div>
                    <label for="idea-description">Description:</label>
                    <textarea id="idea-description" rows="4" required></textarea>
                </div>
                <button type="submit">Add Idea</button>
            </form>
            
            <div id="ideas-container">
                <h3>New Ideas:</h3>
                <ul id="ideas-list"></ul>
            </div>
        </div>
    `;
    
    main.appendChild(ideaSection);
    
    // Style the form
    const form = document.getElementById('idea-form');
    if (form) {
        form.style.display = 'grid';
        form.style.gap = '15px';
        form.style.marginBottom = '20px';
        
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.width = '100%';
            input.style.padding = '8px';
            input.style.borderRadius = '4px';
            input.style.border = '1px solid #ddd';
        });
        
        const labels = form.querySelectorAll('label');
        labels.forEach(label => {
            label.style.fontWeight = 'bold';
            label.style.marginBottom = '5px';
            label.style.display = 'block';
        });
        
        const button = form.querySelector('button');
        if (button) {
            button.style.backgroundColor = '#3498db';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.padding = '10px';
            button.style.borderRadius = '4px';
            button.style.cursor = 'pointer';
            button.style.fontWeight = 'bold';
        }
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const category = document.getElementById('idea-category').value;
        const title = document.getElementById('idea-title').value;
        const description = document.getElementById('idea-description').value;
        
        // Create a new list item
        const newIdea = document.createElement('li');
        newIdea.innerHTML = `<strong>${title}</strong>: ${description}`;
        
        // Add to ideas list
        document.getElementById('ideas-list').appendChild(newIdea);
        
        // Clear form
        form.reset();
    });
});