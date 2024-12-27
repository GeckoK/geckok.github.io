document.addEventListener('DOMContentLoaded', () => {
    // Toggle menu visibility
    document.querySelector('.menu-toggle').addEventListener('click', () => {
        const menuContent = document.querySelector('.menu-content');
        menuContent.style.display = menuContent.style.display === 'flex' ? 'none' : 'flex';
    });

    // Toggle monospace font
    document.getElementById('toggle-monospace').addEventListener('click', () => {
        const body = document.body;
        if (body.style.fontFamily === 'Arial, sans-serif') {
            body.style.fontFamily = 'monospace';
        } else {
            body.style.fontFamily = 'Arial, sans-serif';
        }
    });

    // Toggle Bionic Reading font
    document.getElementById('toggle-bionic').addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('bionic-reading')) {
            body.classList.remove('bionic-reading');
            body.style.fontFamily = 'Arial, sans-serif';
            revertBionicReading(body);
        } else {
            body.classList.add('bionic-reading');
            body.style.fontFamily = 'inherit';
            applyBionicReading(body);
        }
    });
});

function applyBionicReading(element) {
    element.querySelectorAll('*').forEach(child => {
        if (child.children.length === 0 && child.textContent.trim().length > 0) {
            const words = child.textContent.split(' ');
            const bionicText = words.map(word => {
                const half = Math.ceil(word.length / 2);
                return `<span style="font-weight: bold;">${word.slice(0, half)}</span>${word.slice(half)}`;
            }).join(' ');
            child.dataset.originalText = child.textContent;
            child.innerHTML = bionicText;
        }
    });
}

function revertBionicReading(element) {
    element.querySelectorAll('*').forEach(child => {
        if (child.dataset.originalText) {
            child.textContent = child.dataset.originalText;
            delete child.dataset.originalText;
        }
    });
}