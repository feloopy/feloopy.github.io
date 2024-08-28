function copycommandToClipboard() {
    const codeBox = document.getElementById('codeBox');
    codeBox.select(); 
    document.execCommand('copy');
    alert('Now paste the code into your virtual environment or terminal.');
}