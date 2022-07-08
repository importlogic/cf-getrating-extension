const github = document.querySelector(".ri-github-fill");
const linkedin = document.querySelector(".ri-linkedin-box-fill");
const mail = document.querySelector(".ri-mail-fill");

github.addEventListener("click", () => {
    window.open("https://github.com/importlogic/cf-getrating-extension", '_blank').focus();
})

linkedin.addEventListener("click", () => {
    window.open("https://www.linkedin.com/in/rawatmanas", '_blank').focus();
})

mail.addEventListener("click", () => {
    window.open("mailto:manasrawat.cse@gmail.com", '_blank').focus();
})