'use strict';

var table = document.getElementById('table');

function Students(stdName, course) {

    this.stdName = stdName;
    this.stdGrade = generateRandomGrade();
    this.course = course;

    Students.prototype.allStd.push(this);
}

Students.prototype.allStd = [];

function generateRandomGrade() {

    return Math.floor(Math.random() * (100 - 0 + 1) + 0);
}

Students.prototype.render = function () {

    var dataRow = document.createElement('tr');
    table.appendChild(dataRow);

    var stdNameData = document.createElement('td');
    dataRow.appendChild(stdNameData);
    stdNameData.textContent = this.stdName;

    var stdGradeData = document.createElement('td');
    dataRow.appendChild(stdGradeData);
    stdGradeData.textContent = this.stdGrade;

    var stdCourseData = document.createElement('td');
    dataRow.appendChild(stdCourseData);
    stdCourseData.textContent = this.course;

}

var form = document.getElementById('form');
form.addEventListener('submit', addNewStudent);


function addNewStudent(event) {
    event.preventDefault();

    var stdName = event.target.stdName.value;
    var course = event.target.course.value;

    var newStd = new Students(stdName, course);

    localStorage.setItem('stdObjects', JSON.stringify(Students.prototype.allStd));

    createTable();

}


function createTable() {
    table.innerHTML = '';
    createHeader();

    for (var i = 0; i < Students.prototype.allStd.length; i++) {
        Students.prototype.allStd[i].render();
    }
}

function createHeader() {

    var headerRow = document.createElement('tr');
    table.appendChild(headerRow);

    var stdNameHeader = document.createElement('th');
    headerRow.appendChild(stdNameHeader);
    stdNameHeader.textContent = 'Student Name';


    var stdGradeHeader = document.createElement('th');
    headerRow.appendChild(stdGradeHeader);
    stdGradeHeader.textContent = 'Student Grade';

    var courseHeader = document.createElement('th');
    headerRow.appendChild(courseHeader);
    courseHeader.textContent = 'Course';

}
createHeader();


if (localStorage.getItem('stdObjects')) {
    var lsArray = JSON.parse(localStorage.getItem('stdObjects'));

    for (var i = 0; i < lsArray.length; i++) {
           
        new Students (lsArray[i].stdName  , lsArray[i].course) ; 
    }

    createTable();
}