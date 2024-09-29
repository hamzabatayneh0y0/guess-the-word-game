let check = document.querySelector(".check");
let hint = document.querySelector(".hint");
let tries = document.querySelector(".tries");
let info = document.querySelector(".info");
let numberOfHint = document.querySelector(".numberHints");
let arrayOfWords = ["hamza", "accident", "decrease", "outlook", "comedy"];
let theWord = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
let lengthOfTheWord = theWord.length;
const len = lengthOfTheWord;
let triesCounter = 1;
let inputesCounter = 0;
let win = 0;
//add tries
while (lengthOfTheWord--) {
  generateTries(lengthOfTheWord);
}
// blur not-active trries
not();
//game logic{
// inputs field
let inputes = Array.from(
  document.querySelectorAll(`.tries div[class="${triesCounter}"] input`)
);

move();
// check
check.onclick = () => {
  let string = "";
  inputes.forEach((input, index) => {
    string += input.value;
    if (input.value === "") {
      input.style.backgroundColor = "grey";
    } else {
      if (input.value.toLowerCase() === theWord[index].toLowerCase()) {
        input.style.backgroundColor = "#ffb700";
        win++;
      } else {
        if (theWord.includes(input.value)) {
          input.style.backgroundColor = "#1ae49b";
        } else {
          input.style.backgroundColor = "grey";
        }
      }
    }
  });
  inputes.forEach((inp, index) => {
    if (inp.style.backgroundColor === `rgb(26, 228, 155)`) {
      let c = 0;
      let cl = theWord.split("").reduce((count, val) => {
        return val === inp.value ? count + 1 : count;
      }, 0);

      inputes.forEach((el, i) => {
        if (
          (el.style.backgroundColor === `rgb(26, 228, 155)` ||
            el.style.backgroundColor === `rgb(255, 183, 0)`) &&
          inp.value === el.value
        ) {
          c++;
        }
      });

      if (c > cl) inp.style.backgroundColor = "grey";
    }
  });
  // win
  if (win === len) {
    document.querySelectorAll(".tries div").forEach((el) => {
      el.style.display = "none";
    });
    tries.innerHTML = "win";
    tries.style.fontSize = "100px";
    tries.style.color = "#269bb9";
    tries.style.fontWeight = "#269bb9";
    let span = document.createElement("span");
    span.classList.add("reload");
    span.innerHTML = "try again";
    tries.appendChild(span);

    check.onclick = (ev) => {
      ev.preventDefault();
    };
    info.style.display = "none";
    check.style.display = "none";
    hint.style.display = "none";
  } else {
    // lose
    triesCounter++;
    if (triesCounter > len) {
      document.querySelectorAll(".tries div").forEach((el) => {
        el.style.display = "none";
      });
      tries.innerHTML = "game over";
      tries.style.fontSize = "100px";
      tries.style.color = "#269bb9";
      tries.style.fontWeight = "#269bb9";
      let span = document.createElement("span");
      span.classList.add("reload");
      span.innerHTML = "try again";
      tries.appendChild(span);

      check.onclick = (ev) => {
        ev.preventDefault();
      };
      info.style.display = "none";
      check.style.display = "none";
      hint.style.display = "none";
    } else {
      // new try
      win = 0;
      document.querySelectorAll(".tries div").forEach((div) => {
        let ch = Array.from(div.children);
        if (+div.classList[0] !== triesCounter) {
          div.classList.add("not-active");
          div.classList.remove("active");
          ch.forEach((el) => {
            el.classList.add("not-active");
            el.classList.remove("active");
          });
        } else {
          div.classList.remove("not-active");
          div.classList.add("active");
          ch.forEach((el) => {
            el.classList.remove("not-active");
            el.classList.add("active");
          });
        }
      });
      inputes = Array.from(document.querySelectorAll(`.tries .active input`));
      not();
      move();
    }
  }
};
// try again
document.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("reload")) location.reload();
});
// hint
hint.onclick = (ev) => {
  if (numberOfHint.innerHTML === "0") {
    ev.preventDefault();
  } else {
    let randomhint = Math.floor(Math.random() * len);
    console.log(randomhint);
    inputes[randomhint].value = theWord[randomhint];

    numberOfHint.innerHTML--;
  }
};
// game logic }
//functions
function generateTries(num) {
  let div = document.createElement("div");
  div.classList.add(len - num);
  let text = document.createElement("span");
  if (len - num === 1) text.classList.add("active");
  else text.classList.add("not-active");
  text.appendChild(document.createTextNode(`Try ${len - num}`));
  div.appendChild(text);
  tries.appendChild(div);
  for (let i = 0; i < len; i++) {
    let input = document.createElement("input");
    input.setAttribute("maxlength", "1");
    input.classList.add(`${i + 1}`);
    if (len - num === 1) input.classList.add("active");
    else input.classList.add("not-active");
    div.appendChild(input);
  }
}
function not() {
  document.querySelectorAll(".not-active").forEach((el) => {
    el.onfocus = (e) => {
      el.blur();
    };
  });
  document.querySelectorAll(".active").forEach((el) => {
    el.onfocus = (e) => {};
  });
}
function move() {
  inputes.forEach((input, index) => {
    input.oninput = (ev) => {
      if (input.value.length >= 1) {
        if (index !== inputes.length - 1) {
          inputes[index + 1].focus();
        } else {
          inputes[index].focus();
        }
      }
    };

    input.onkeyup = (ev) => {
      if (ev.key === "Backspace") {
        if (index !== 0) {
          input.value = "";
          inputes[index - 1].focus();
        } else {
          inputes[index].focus();
        }
      }
    };
  });
}
