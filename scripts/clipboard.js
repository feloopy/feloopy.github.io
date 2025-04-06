function copyCommandToClipboard() {
    var command = document.getElementById("installCommand");
    command.select();
    command.setSelectionRange(0, 99999); 
    document.execCommand("copy");
    alert("You may execute the copied command inside a Python VM or terminal.");
}

function copyPythonCode() {
    var pythonCode = document.getElementById("pythonCode").innerText;
    navigator.clipboard.writeText(pythonCode).then(function() {
    }).catch(function(err) {
        console.error('Failed to copy text: ', err);
    });
}