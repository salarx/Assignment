const init = () => {
    // Do not remove
    generateQuestionId();
    document.getElementById('loader-view').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';

};

// Do not modify the code mentioned below
const generateQuestionId = () => {
    const id = randomIntInRange(0, 6);
    document.getElementById('current-question-id').value = id.toString();
};

const randomIntInRange = (min, max, notIn) => {
    const value = Math.floor(Math.random() * (max - min + 1) + min);
    if (notIn && notIn.includes(value)) {
        return randomIntInRange(min, max, notIn);
    } else {
        return value;
    }
};
// Do not modify

init();

const ID = document.getElementById('current-question-id').value;
document.getElementById('get-started-button').onclick = function() {fetchData()};
var a = null;

function fetchData() {
    document.getElementById('pre-quiz').style.display = 'none';
    document.getElementById('loader-view').style.display = 'block';
    fetch(`https://jsonmock.hackerrank.com/api/questions/${ID}`)
    .then(result => {
        // console.log(result);
        return result.json();
    })
    .then(data => {
        // console.log(data);
        const q = data.data.question.replace(/</g, "&lt;").replace(/>/g, "&gt;");;
        const o = data.data.options;
        a = data.data.answer;
        // console.log(p);
        document.getElementById('question').innerHTML = q;
        for (opt in o) {
            // console.log(o[opt]);
            document.getElementById('options-container').innerHTML += '<label class="option"><input type="radio" name="options" id="' + opt + '" onchange="userAns(id)" value="' + o[opt] + '">' + o[opt] + '</label>';
        }
        document.getElementById('loader-view').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        // console.log(q);
    })
    .catch(error => {
        console.log(error);
    });
}

var prev = null;
var cur = null;

function userAns(id) {
    if (prev!=null) {
        prev.parentElement.classList.remove("user-answer");
    }
    document.getElementById("submit-button").classList.remove("disabled");
    cur = document.getElementById(id);
    // console.log(cur.id);
    cur.parentElement.classList.add("user-answer");
    prev = cur;
}

document.getElementById('submit-button').onclick = function() {validateData()};

function validateData() {
    // const oid = document.getElementsByClassName("user-answer");
    if (a == cur.id) {
        // console.log('correct');
        cur.parentElement.classList.add("correct-answer");
    }
    else {
        // console.log('wrong');
        cur.parentElement.classList.add("wrong-answer");
        document.getElementById(a).parentElement.classList.add("correct-answer");
    }
    for (var i = 0; i < 4; i++) {
        document.getElementById(i).disabled = true;
    }
    document.getElementById('submit-button').style.display = 'none';

}


