
const input = document.querySelector(".input__field");
const inputIcon = document.querySelector(".input__icon");

inputIcon.addEventListener("click", (e) => {
    e.preventDefault();

    inputIcon.setAttribute(
        'src', 
        input.getAttribute('type') === 'password' ?
        'images/eye-off.svg'
          :
        'images/eye.svg'
    );

    input.setAttribute(
        'type', 
        input.getAttribute('type') === 'password' ? 
        'text'
          :
        'password'
    );
});