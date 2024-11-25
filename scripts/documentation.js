function setDocumentationButton(documentationButtonId) {
    const documentationButton = document.getElementById(documentationButtonId);
    documentationButton.onclick = () => {
        window.location.href = 'https://github.com/feloopy/documentation/blob/main/feloopy-documentation.pdf'; // Link to the documentation website
    };
}

document.addEventListener('DOMContentLoaded', () => {
    setDocumentationButton('documentation-button');
});
