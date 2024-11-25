function setDocumentationButton(documentationButtonId) {
    const documentationButton = document.getElementById(documentationButtonId);
    documentationButton.onclick = () => {
        window.location.href = 'https://raw.githubusercontent.com/feloopy/documentation/main/feloopy-documentation.pdf';
    };
}

document.addEventListener('DOMContentLoaded', () => {
    setDocumentationButton('documentation-button');
});
