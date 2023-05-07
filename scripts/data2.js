/*************************Structuring Data********************* */
const bigSet = {
  years: new Set(),
  subjects: new Set(),
  scores: new Set(),
};
//function to group data by category
/*************************Drawing Axes and Configuring Scale********************* */

const width = 700;
// const width = 1100;
const height = 400;
const margin = 50;
const svg = d3.select("svg#s1");
// .style("border", "1px solid red");
// .style("transform", "translate(0px, 40px)");
const scaleX = d3
  .scaleLinear()
  .domain([0, 10])
  .range([margin, width - margin]);
const scaleY = d3
  .scaleLinear()
  .domain([0, height]) //range of values will be from 0 - 400
  .range([height, 0])
  .nice();
const axes = svg.append("g").attr("class", "axes").attr("transform", `translate(${margin},${margin})`);

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
/*************************Adding legends********************* */
svg.append("g").append("text").text("Number Of Students").attr("fill", "black").style("font-weight", "bold").attr("transform", "translate(10,170) rotate(90)").attr("class", "legend");
svg.append("g").append("text").text("Subjects").attr("fill", "black").style("font-weight", "bold").attr("transform", "translate(320,493)").attr("class", "legend");
svg.append("g").attr("class", "map");
svg.append("g").attr("class", "title");
//adding title
d3.select("g.title")
  .append("text")
  .text(`Top 10 Majors at Stanford University Enrollment Distribution`)
  .attr("fill", "black")
  .style("font-weight", "bold")
  .style("font-family", "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif")
  .attr("x", 170)
  .attr("y", 20);
d3.select("g.title")
  .append("text")
  .attr("class", "titletext")
  .text(` for The 2011-12 Academic Year`)
  .attr("fill", "black")
  .style("font-family", "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif")
  .style("font-weight", "bold")
  .attr("x", 280)
  .attr("y", 40);

/*************************Data Fetching********************* */

d3.csv("../StanfordTopTenMajors2010s.csv", (bunch) => {
  return {
    year: bunch.Year,
    subject: bunch.Subject,
    numberOfStudents: parseInt(bunch["Number of Students"], 10),
  };
}).then((d) => {
  bigSet.data = d;
  bigSet.data.forEach((element) => {
    bigSet.years.add(element.year);
    bigSet.subjects.add(element.subject);
    bigSet.scores.add(element.numberOfStudents);
  });

  //convert set of uniques years to array
  bigSet.years = [...bigSet.years];
  bigSet.subjects = [...bigSet.subjects];
  bigSet.scores = [...bigSet.scores];

  bigSet2.detailedSubjects = [...bigSet.subjects].map((subj) => Object.assign({}, { name: subj, abbrev: subj.slice(0, 3).toUpperCase() }));

  //displaying year options
  feedYears(bigSet.years);
  init();
  test("2011-12");
});

/*************************Drawing Axes********************* */
const init = () => {
  const datum = bigSet.data
    .filter((el) => el.year === "2011-12")
    .sort((a, b) => d3.ascending(a.numberOfStudents, b.numberOfStudents))
    .map((el) => el.subject);
  const detailedSubjects = [...datum].map((subj) => `${subj} (${subj.slice(0, 3).toUpperCase()})`);
  const fedSubjects = [...datum].map((subj) => Object.assign({}, { name: subj, abbrev: subj.slice(0, 3).toUpperCase() }));

  feedSubjects(fedSubjects);

  const subjectWithAbbreviation = bigSet.subjects.map((data) => `${data} (${data.slice(0, 3).toUpperCase()})`);
  const subjectAbbreviations = ["", ...bigSet.subjects.map((data) => `${data.slice(0, 3).toUpperCase()}`)];
  const xAxis = d3
    .axisBottom(scaleX)
    .tickPadding(5)
    .tickFormat((d, i) => subjectAbbreviations[i]);
  const yAxis = d3.axisLeft(scaleY).tickSize(5).tickSizeOuter(0);
  //appending axis to svg
  axes
    .append("g")
    .attr("class", "x-axis")
    .call(xAxis)
    .attr("transform", `translate(${[-10, height]})`);
  axes
    .append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .attr("transform", `translate(${[20, 0]})`);

  svg.append("g").attr("class", "draw");

  //Styling domains n ticks
  d3.selectAll(".domain").each(function () {
    d3.select(this).attr("opacity", 0);
  });
  const yAxisTicks = d3.selectAll(".y-axis .tick").each(function (d, i) {
    d3.select(this)
      .select("line")
      .attr("x1", `-10`)
      .style("stroke-width", `.25`)
      .attr("x2", width - 80);
    d3.select(this).select("text").attr("x", `-20`);
  });
  const xAxisTicks = d3.selectAll(".x-axis .tick").each(function (d, i) {
    d3.select(this).select("line").attr("opacity", 0);
    d3.select(this).select("text").attr("y", `10`).attr("x", `-50`);
  });

  // drawing chart legend
  //adding legend to labels
  // console.log(d3.select("#subject").selectAll("label"));
  d3.select("#subject")
    .datum(detailedSubjects)
    .selectAll("label")
    .data((d) => d)
    .each(function (datum, i) {
      d3.select(this).text((d) => d);
      d3.select(this).insert("span").attr("class", "legspan").style("background-color", colorScale(i));
      // console.log([...d3.select(this)._groups[0]][0].textContent);
      // console.log(datum);
    });
};

/*************************Drawing Functions********************* */
const test = (year) => {
  // const datum = bigSet.data.filter((el) => el.subject === 'Computer Science').sort((a, b) => d3.ascending(a.year, b.year));
  // const datum = bigSet.data.filter((el) => el.subject === 'Computer Science').sort((a, b) => d3.ascending(a.numberOfStudents, b.numberOfStudents));
  const datum = bigSet.data.filter((el) => el.year === year).sort((a, b) => d3.ascending(a.numberOfStudents, b.numberOfStudents));
  draw(datum, year);
  //removing previous svg
  d3.select(".graphboard").select("svg#s1").style("display", "block");
  d3.select(".graphboard").select("svg#s2").style("display", "none");
};

/*************************Drawing Functions********************* */
draw = (datum, abbrev) => {
  const scores = datum.map((x) => x.numberOfStudents);
  const subjectAbbreviations = ["", ...datum.map((x) => x.subject).map((data) => `${data.slice(0, 3).toUpperCase()}`)];
  const detailedSubjects = [...datum.map((x) => x.subject)].map((subj) => `${subj} (${subj.slice(0, 3).toUpperCase()})`);

  //sorting subjects axis
  const xAxis = d3
    .axisBottom(scaleX)
    .tickPadding(10)
    .tickFormat((d, i) => subjectAbbreviations[i]);
  axes.select("g.x-axis").transition().call(xAxis);

  // drawing bars
  const g = d3.select("g.draw");
  g.selectAll("rect")
    .data(scores)
    .join("rect")
    .transition()
    .attr("width", "50")
    .attr("height", (d) => scaleY(400 - d))
    .attr("transform", (_, i) => `translate(${[scaleX(i) + 25, scaleY(0) + margin]}) scale(1,-1)`)
    .attr("fill", (_, i) => colorScale(i));

  // addign text
  g.selectAll("text")
    .data(scores)
    .join("text")
    .text((d) => d)
    .transition()
    .duration(1000)
    .attr("y", (d) => scaleY(d) + 70)
    .attr("x", (_, i) => scaleX(i) + 40)
    .style("fill", "white");

  //adding title
  d3.select("text.titletext").text(` for The ${abbrev} Academic Year`);

  //updating subjects legend
  d3.select("#subject")
    .datum(detailedSubjects)
    .selectAll("label")
    .data((d) => d)
    .each(function (datum, i) {
      d3.select(this).text((d) => d);
      d3.select(this).insert("span").attr("class", "legspan").style("background-color", colorScale(i));
    });
};
