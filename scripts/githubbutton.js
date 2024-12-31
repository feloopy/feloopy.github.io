
const githubIcon = document.getElementById('github-icon');

document.getElementById('github-button1').addEventListener('mouseenter', function() {
    githubIcon.classList.remove('fab', 'fa-github');
    githubIcon.classList.add('fas', 'fa-star');
    document.querySelector('span').textContent = 'Star this repository!';
});

document.getElementById('github-button1').addEventListener('mouseleave', function() {
    githubIcon.classList.remove('fas', 'fa-star');
    githubIcon.classList.add('fab', 'fa-github');
    document.querySelector('span').textContent = 'GitHub';
});
