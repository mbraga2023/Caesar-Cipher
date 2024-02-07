// Function to update code-container
function updateCodeContainer() {
    var mensagemInput = document.getElementById("mensagem").value;
    var counterInput = parseInt(document.getElementById("counter").value);
    var errorMessage = document.getElementById("error-message");
    var codigoContainer = document.getElementById("codigo");

    // Validate the counterInput value
    if (isNaN(counterInput) || counterInput < -26 || counterInput > 26 || /[^\d]/.test(counterInput)) {
        errorMessage.textContent = "Por favor, digite um número válido entre 1 e 26.";
        errorMessage.style.color = "red";
        return;
    } else {
        errorMessage.textContent = "";
    }

    // Perform the Caesar cipher based on the operation and update the code-container
    var operation = document.activeElement.id; // Get the ID of the clicked button
    if (operation === "criptografar") {
        codigoContainer.textContent = caesarCipher(mensagemInput, counterInput);
    } else if (operation === "descriptografar") {
        codigoContainer.textContent = caesarDecipher(mensagemInput, counterInput);
    }
}

// Caesar cipher function
function caesarCipher(message, counter) {
    return processOperation(message, counter, 'criptografar');
}

// Caesar decipher function (backward operation)
function caesarDecipher(message, counter) {
    return processOperation(message, counter, 'descriptografar');
}

// Process the Caesar cipher or decipher operation
function processOperation(message, counter, operation) {
    return message.split('').map(function(char) {
        if (char.match(/[a-z]/i)) {
            var isUpperCase = char === char.toUpperCase();
            var charCode = char.charCodeAt(0);
            var base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            
            // Adjust the Caesar cipher logic based on the operation
            if (operation === 'criptografar') {
                charCode = (charCode - base + counter + 26) % 26 + base;
            } else if (operation === 'descriptografar') {
                charCode = (charCode - base - counter + 26) % 26 + base;
            }

            return String.fromCharCode(charCode);
        } else {
            return char;
        }
    }).join('');
}

// Event listeners for Criptografar and Descriptografar buttons
document.getElementById("criptografar").addEventListener("click", updateCodeContainer);
document.getElementById("descriptografar").addEventListener("click", updateCodeContainer);


function copyText() {
    var codeContainer = document.getElementById("codigo");
    var range = document.createRange();
    range.selectNode(codeContainer);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    // Show snackbar message
    var snackbar = document.getElementById("snackbar");
    snackbar.textContent = "Seu código foi copiado para área de transferência";
    snackbar.classList.add("show");
    setTimeout(function () {
        snackbar.classList.remove("show");
    }, 4000);
}

function limpar() {
    document.getElementById("mensagem").value = ""; // Clears the input field
  }

