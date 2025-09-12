//#region Q1- working with object properties
var vAllowdProps = ["name", "Duration", "CourseOwner"];

function validateObject(obj, allowedProps) {
  const objProps = Object.keys(obj);

  const hasAllRequiredProps = allowedProps.every((prop) =>
    objProps.includes(prop)
  );
  const hasNoExtraProps = objProps.every((prop) => allowedProps.includes(prop));

  return hasAllRequiredProps && hasNoExtraProps;
}

function displayCourse(course) {
  var cartona = `
    <div class="col-12">
     <div class="card">
        <div class="card-body">
            <h5 class="card-title">Course Name: ${course.name}</h5>
            <p class="card-text">Duration: ${course.Duration} months</p>
            <p class="card-text">Course Owner: ${course.CourseOwner}</p>
        </div>
    </div>
    </div>
    `;
  document.getElementById("output").innerHTML = cartona;
}
function displayError(msg) {
  var cartona = `
    <div class="col-12">
        <div class="alert alert-warning" role="alert">
            ${msg}
        </div>
    </div>
    `;
  document.getElementById("output").innerHTML = cartona;
}
var course = {
  name: "JavaScript",
  Duration: 6,
  CourseOwner: "John Doe",
};
document.getElementById("btn1").onclick = function () {
  try {
    course = {
      name: document.getElementById("name1").value,
      Duration: document.getElementById("duration1").value,
      CourseOwner: document.getElementById("owner1").value,
    };
    if (
      validateObject(course, vAllowdProps) &&
      course.name != "" &&
      course.Duration != "" &&
      course.CourseOwner != ""
    ) {
      displayCourse(course);
    } else {
      throw new Error("add all properties value!");
    }
  } catch (ex) {
    displayError(ex.message);
  }
};
document.getElementById("btn2").onclick = function () {
  try {
    var course = {
      name: document.getElementById("name2").value,
      Duration: document.getElementById("duration2").value,
      // Missing CourseOwner
    };
    if (validateObject(course, vAllowdProps)) {
      displayCourse(course);
    } else {
      throw new Error("Invalid object properties!");
    }
  } catch (ex) {
    displayError(ex.message);
  }
};
document.getElementById("btn3").onclick = function () {
  try {
    var course = {
      name: document.getElementById("name3").value,
      Duration: document.getElementById("duration3").value,
      CourseOwner: document.getElementById("owner3").value,
      extraprop: document.getElementById("extra3").value,
    };
    if (validateObject(course, vAllowdProps)) {
      displayCourse(course);
    } else {
      throw new Error("Invalid object properties!");
    }
  } catch (ex) {
    displayError(ex.message);
  }
};

//#endregion

//#region Q2- fabonacci
function* fibbonacci(iterator) {
  let a = 0,
    b = 1;
  for (let i = 0; i < iterator; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* fibbonacciMax(maxValue) {
  let a = 0,
    b = 1;
  while (a <= maxValue) {
    yield a;
    [a, b] = [b, a + b];
  }
}

var result = [];
function displayFibonacci() {
  var cartona = `<p>${result.join(", ")}</p>`;
  document.getElementById("outputFibonacci").innerHTML = cartona;
}

var fibonacciCount;
var mask = 0;
function generateFibbo() {
  if (mask === 0) {
    result = [];

    let count = document.getElementById("fibonacciInput").value;
    fibonacciCount = fibbonacci(count);
    mask = 1;
  }
  result.push(fibonacciCount.next().value);
  displayFibonacci();
}

var mask1 = 0;
var fibonacciMax;
function generateFibboMax() {
  if (mask1 === 0) {
    result = [];
    let count = document.getElementById("fibonacciMaxInput").value;
    fibonacciMax = fibbonacciMax(count);
    mask1 = 1;
  }
  result.push(fibonacciMax.next().value);
  displayFibonacci();
}
//#endregion



// get value while change the textbox
document.getElementById("replaceInput").addEventListener("input", fillInput);

var input ="";
function fillInput(){
    input = document.getElementById("replaceInput").value;
    console.log(input);
    
}

var obj = {};
function performReplace() {
  obj = {
    str: input,
    [Symbol.iterator]: function () {
      let i = 0;
      return {
        next: () => {
          if (i < this.str.length) {
            if (i > 15) {
                i++;
              return { value: ".", done: false };
            }
            return { value: this.str[i++], done: false };
          } else {
            return { value: undefined, done: true };
          }
        },
      };
    },
  };
  dis();
}

function dis(){
        let result = "";
    for (let char of obj) {
        result += char;
    }
    displayReplace(result);
}

function displayReplace(output) {
    var cartona = `<p>${output}</p>`;
    document.getElementById("replaceOutput").innerHTML = cartona;
}

//#region Q4- Iterable Object Methods

const courseObject = {
    name: "JavaScript Advanced",
    duration: 3,
    instructor: "Anas",
    topics: ["ES6+", "TypeScript"],
    
    [Symbol.iterator]() {
        const entries = Object.entries(this);
        let index = 0;
        
        return {
            next() {
                if (index < entries.length) {
                    const [key, value] = entries[index++];
                    return { value: `${key}: ${value}`, done: false };
                }
                return { done: true };
            }
        };
    }
};

function* objectIterator(obj) {
    for (let [key, value] of Object.entries(obj)) {
        yield `${key}: ${value}`;
    }
}

function displayFinale(result) {
    var cartona = `<div class="bg-light rounded p-3">${result.join('<br>')}</div>`;
    document.getElementById("iterableOutput").innerHTML = cartona;
}

function displayResult() {
    const method1Results = [...courseObject];
    
    const method2Results = [...objectIterator(courseObject)];
    
    const allResults = [
        "<strong>Method 1 (Symbol.iterator):</strong>",
        ...method1Results,
        "<br><br> <strong>Method 2 (Generator Function):</strong>",
        ...method2Results
    ];
    
    displayFinale(allResults);
}

//#endregion
