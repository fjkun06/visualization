/*************************Handling inputs********************* */
const yearHeading = document.querySelector("#yearh");
const subjectHeading = document.querySelector("#subjecth");
const main = document.querySelector("#body main section ul");
const mainYearContainer = document.querySelector(".year ul");
const mainSubjectContainer = document.querySelector(".subject ul");
const yearFilter = document.querySelector("#year");
const subjectFilter = document.querySelector("#subject");
const mainHeading = document.querySelector("#body main section h3");



//display a list of years to use as filter
const feedYears = (data = []) => {
  const jahr = data.map((item, index) =>
    index === 0
      ? `<span class="jahr" >
        <input type="radio"  class="yearfilter" id="choice${index}" name="year" value=${item} checked />
        <label for="choice${index}">${item}</label>
        </span>`
      : `<span class="jahr">
        <input type="radio" class="yearfilter"  id="choice${index}" name="year" value=${item} />
        <label for="choice${index}">${item}</label>
        </span>`
  );

  yearFilter.innerHTML += jahr.join("");
};

//display a list of years to use as filter
const feedSubjects = (data = []) => {
  const jahr = data.map((item, index) =>
    index === 0
      ? `<span class="jahr">
        <input type="radio" id="choice${index}n" class="subjectfilter" name="subject" value=${item.abbrev} checked />
        <label for="choice${index}n">${item.name}  (${item.abbrev ?? " __"})</label>
        </span>`
      : `<span class="jahr" >
        <input type="radio" id="choice${index}n" class="subjectfilter" name="subject" value=${item.abbrev} />
        <label for="choice${index}n">${item.name}  (${item.abbrev ?? " __"})</label>
        </span>`
  );

  subjectFilter.innerHTML += jahr.join("");
};

/*************************Handling inputs********************* */

const handleInputs = () => {
  const inputsYear = Array.from(document.querySelectorAll(".yearfilter"));
  const yearh = document.querySelector("#yeah");
  const inputsSubject = Array.from(document.querySelectorAll(".subjectfilter"));
  const subjecth = document.querySelector("#subj");
  //handling changes for the years
  inputsYear.forEach((input, i) => {
    if (input.checked) {
      test(input.value);
      yearh.textContent = `Filter by Year: __`;
    }
    input.addEventListener("change", (e) => {
      //calling function to update data
      test(e.target.value);
      yearh.textContent = `Filter by Year: ${e.target.value}`;
    });
  });

  //handling changes for the subjects
  inputsSubject.forEach((input, i) => {
    if (input.checked) {
      subjecth.innerHTML = `Filter by Subject:  __`;
    }
    input.addEventListener("change", (e) => {
      test2({ id: e.target.nextElementSibling.textContent.slice(0, -6).trim(), type: "subject" });
      subjecth.innerHTML = `Filter by Subject:  ${e.target.nextElementSibling.textContent.slice(-4, -1).trim()}`;
    });
  });

  const yearSvg = document.querySelector("#close");
  const subjectSvg = document.querySelector("#closer");
  const g1 = document.querySelector("#g1");
  const cp1 = document.querySelector("#cp1");
  const cp2 = document.querySelector("#cp2");
  const g2 = document.querySelector("#g2");
  const cpc1 = document.querySelector("#cpc1");
  const cpc2 = document.querySelector("#cpc2");

  // setting default state to closed
  setTimeout(function () {
    yearSvg.click();
  }, 200);
  setTimeout(function () {
    subjectSvg.click();
  }, 200);

  /*************************Handling year dropdowns********************* */
  yearSvg.addEventListener("click", (e) => {
    const years = d3.select("#year").selectAll("span.jahr")._groups[0];
    const subjects = d3.select("#subject").selectAll("span.jahr")._groups[0];
    const yearContainer = document.querySelector("#year");
    const subjectContainer = d3.select("#subject");
    const data = Array.from(years);

    //displaying or hiding list elements using classes
    data.forEach((el, i) => el.classList.toggle("yeartoggle"));

    if (data.every((el) => el.classList.contains("yeartoggle"))) {
      yearContainer.style.height = "50px";
      g1.setAttribute("transform", "scale(0.75) translate(3,4)");
      cp1.setAttribute("d", "M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z");
      cp2.setAttribute("d", "M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z");
    }

    if (data.every((el) => !el.classList.contains("yeartoggle"))) {
      yearContainer.style.height = "400px";
      g1.setAttribute("transform", "scale(0.75) translate(3,2)");
      cp1.setAttribute("d", "M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z");
      cp2.setAttribute("d", "M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z");
    }
  });

  /*************************Handling subject dropdowns********************* */
  subjectSvg.addEventListener("click", (e) => {
    const subjects = d3.select("#subject").selectAll("span.jahr")._groups[0];
    const years = d3.select("#year").selectAll("span.jahr")._groups[0];
    const subjectContainer = document.querySelector("#subject");
    const yearContainer = d3.select("#year");
    const data = Array.from(subjects);
    const dataOff = Array.from(years);
    //displaying or hiding list elements using classes
    data.forEach((el, i) => el.classList.toggle("yeartoggle"));

    if (data.every((el) => el.classList.contains("yeartoggle"))) {
      subjectContainer.style.height = "50px";
      g2.setAttribute("transform", "scale(0.75) translate(3,4)");
      cpc1.setAttribute("d", "M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z");
      cpc2.setAttribute("d", "M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z");
    }

    if (data.every((el) => !el.classList.contains("yeartoggle"))) {
      dataOff.forEach((el, i) => el.classList.add("yeartoggle"));
      subjectContainer.style.height = "400px";
      yearContainer.style("height", "50px");
      g2.setAttribute("transform", "scale(0.75) translate(3,2)");
      cpc1.setAttribute("d", "M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z");
      cpc2.setAttribute("d", "M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z");
    }
  });
};

//loading default data
window.onload = () => {
  setTimeout(() => {
    handleInputs();
  }, 1000);
};
