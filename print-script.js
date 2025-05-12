document.addEventListener('DOMContentLoaded', function() {
    // Initialize page numbers
    updatePageNumbers();
    
    // Handle back button
    document.getElementById('back-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Handle print all button
    document.getElementById('print-all-btn').addEventListener('click', function() {
        preparePrint('regular');
    });
    
    // Handle print as pamphlet button
    document.getElementById('print-pamphlet-btn').addEventListener('click', function() {
        preparePrint('pamphlet');
    });
    
    // Section checkboxes
    const sectionCheckboxes = document.querySelectorAll('.section-checkbox');
    sectionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            toggleSectionVisibility(this.value, this.checked);
            updatePageNumbers();
        });
    });
    
    // Print mode radio buttons
    const printModeRadios = document.querySelectorAll('input[name="print-mode"]');
    printModeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updatePrintLayout(this.value);
            updatePageNumbers();
        });
    });
});

/**
 * Toggle visibility of a section
 */
function toggleSectionVisibility(sectionId, isVisible) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = isVisible ? 'block' : 'none';
    }
}

/**
 * Update the print layout based on selected mode
 */
function updatePrintLayout(mode) {
    const printContent = document.getElementById('print-content');
    
    // Remove any existing layout classes
    printContent.classList.remove('regular-mode', 'duplex-mode', 'pamphlet-mode');
    
    // Add the appropriate class
    printContent.classList.add(`${mode}-mode`);
    
    // Special handling for pamphlet mode
    if (mode === 'pamphlet') {
        // Make sure sections are ordered correctly for pamphlet printing
        // This may involve reordering sections for proper booklet layout
        reorderForPamphlet();
    }
}

/**
 * Reorder sections for pamphlet printing
 * This arranges pages in the correct order for folded booklet printing
 */
function reorderForPamphlet() {
    const printContent = document.getElementById('print-content');
    const sections = Array.from(printContent.querySelectorAll('.print-section:not([style*="display: none"])'));
    
    // If we don't have enough sections, add blank pages
    while (sections.length % 4 !== 0) {
        const blankPage = document.createElement('section');
        blankPage.className = 'print-section blank-page';
        blankPage.innerHTML = '<div class="section-content"><p>This page intentionally left blank</p></div>';
        sections.push(blankPage);
        printContent.appendChild(blankPage);
    }
    
    // Now reorder for pamphlet printing
    const pageCount = sections.length;
    const pamphletOrder = [];
    
    // Calculate the pamphlet order
    for (let i = 0; i < pageCount / 2; i++) {
        if (i % 2 === 0) {
            // Back side of sheet
            pamphletOrder.push(pageCount - 1 - i);
            pamphletOrder.push(i);
        } else {
            // Front side of sheet
            pamphletOrder.push(i);
            pamphletOrder.push(pageCount - 1 - i);
        }
    }
    
    // Remove all sections and re-add in pamphlet order
    sections.forEach(section => printContent.removeChild(section));
    pamphletOrder.forEach(index => printContent.appendChild(sections[index]));
}

/**
 * Update page numbers for all visible sections
 */
function updatePageNumbers() {
    const visibleSections = document.querySelectorAll('.print-section:not([style*="display: none"])');
    visibleSections.forEach((section, index) => {
        const pageNumber = section.querySelector('.print-page-number');
        if (pageNumber) {
            pageNumber.textContent = `Page ${index + 1} of ${visibleSections.length}`;
        }
    });
}

/**
 * Prepare the page for printing
 */
function preparePrint(mode) {
    // First update layout if needed
    if (mode) {
        document.querySelector(`input[name="print-mode"][value="${mode}"]`).checked = true;
        updatePrintLayout(mode);
        updatePageNumbers();
    }
    
    // Small delay to ensure styles are applied
    setTimeout(() => {
        window.print();
    }, 300);
}