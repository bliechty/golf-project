const coursesPromise = getCourses();

$(function() {
    coursesPromise.then(function(allCourses) {
        let myCourses = allCourses.courses;
        for (let i = 0; i < myCourses.length; i++) {
            getCourse(allCourses.courses[i].id).then(function (myCourse) {
                $('.course-selection').append(
                    `<div class='course'>
                        <div class='course-top'>
                            <div class='name'>${myCourses[i].name}</div>
                            <div class='course-image'>
                                <img width='150' src='${myCourses[i].image}' alt='${myCourses[i].name}'>
                            </div>
                        </div>
                        <div class='course-bottom'>
                            <select id='selectid${i}'>
                                <option value='1'>1 Player</option>
                                <option value='2'>2 Players</option>
                                <option value='3'>3 Players</option>
                                <option value='4'>4 Players</option>
                            </select>
                            <button onclick='displayHoles(${myCourse.data.holes.length});
                                displayScoreInputs(${myCourse.data.holes.length}, $("#selectid${i}").val())'>Select</button>
                        </div>
                    </div>`);
            });
        }
    });
});

function displayHoles (numberOfHoles) {
    $('.holes').html('');
    for (let i = 1; i <= numberOfHoles; i++) {
        $('.holes').append(`<div id='col${i}' class='col'>Hole ${i}</div>`);
    }
}

function displayScoreInputs (numberOfHoles, numberOfPlayers) {
    console.log(numberOfHoles, numberOfPlayers);
}

function getCourses() {
    return new Promise(function(resolve, reject) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                const courses = JSON.parse(this.responseText);
                resolve(courses);
            }
        };
        xhttp.open('GET','https://golf-courses-api.herokuapp.com/courses');
        xhttp.send();
    });
}

function getCourse(id) {
    return new Promise(function(resolve, reject) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                const course = JSON.parse(this.responseText);
                resolve(course);
            }
        };
        xhttp.open('GET', `https://golf-courses-api.herokuapp.com/courses/${id}`);
        xhttp.send();
    });
}