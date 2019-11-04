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
                            <button onclick='displayHoles(${myCourse.data.holeCount});
                                displayScoreCardInfo(${myCourse.data.holeCount}, $("#selectid${i}").val());
                                displayPar(${JSON.stringify((myCourse.data.holes))}, ${myCourse.data.holeCount});
                                populateTeeSelect(${JSON.stringify(myCourse.data.holes[0].teeBoxes)})'>Select</button>
                        </div>
                    </div>`);
            });
        }
    });
});

function displayHoles (numberOfHoles) {
    $('.score-card').css('display', 'block');
    $('.tee-selection').css('display', 'block');
    $('.holes').html('');
    $('.holes').append(`<div id='first-column'>
            <div class='firstColumn'>Hole</div>
        </div>`);

    for (let i = 1; i <= numberOfHoles / 2; i++) {
        $('.holes').append(`<div id='col${i}' class='col'>
                <div class='boxes'>${i}</div>
            </div>`);
    }

    $('.holes').append(`<div id='out-score' class='scores'>
            <div class='score-boxes'>Out</div>
        </div>`);

    for (let i = numberOfHoles / 2 + 1; i <= numberOfHoles; i++) {
        $('.holes').append(`<div id='col${i}' class='col'>
            <div class='boxes'>${i}</div>
        </div>`);
    }

    $('.holes').append(`<div id='in-score' class='scores'>
            <div class='score-boxes'>In</div>
        </div>`);
    $('.holes').append(`<div id='total-score' class='scores'>
            <div class='score-boxes'>Total</div>
        </div>`);
}

function displayScoreCardInfo (numberOfHoles, numberOfPlayers) {
    for (let i = 1; i <= numberOfPlayers; i++) {
        $('#first-column').append(`<div class='firstColumn'>Player ${i} (Click to edit)</div>`);

        for (let j = 1; j <= numberOfHoles / 2; j++) {
            $(`#col${j}`).append(`<div id='p${i}h${j}' class='boxes'></div>`);
        }

        $('#out-score').append(`<div id='outscore${i}' class='score-boxes'></div>`);

        for (let j = numberOfHoles / 2 + 1; j <= numberOfHoles; j++) {
            $(`#col${j}`).append(`<div id='p${i}h${j}' class='boxes'></div>`);
        }

        $('#in-score').append(`<div id='inscore${i}' class='score-boxes'></div>`);
        $('#total-score').append(`<div id='totalscore${i}' class='score-boxes'></div>`);
    }
}

function displayPar(holesArray, numberOfHoles) {
    let totalPar = 0;
    let outPar, inPar;
    $('#first-column').append(`<div class='firstColumn'>Par</div>`);

    for (let i = 1; i <= numberOfHoles / 2; i++) {
        totalPar += holesArray[i - 1].teeBoxes[0].par;
        $(`#col${i}`).append(`<div class='boxes'>${holesArray[i - 1].teeBoxes[0].par}</div>`);
    }

    outPar = totalPar;

    $('#out-score').append(`<div class='score-boxes'>${outPar}</div>`);

    for (let i = numberOfHoles / 2 + 1; i <= numberOfHoles; i++) {
        totalPar += holesArray[i - 1].teeBoxes[0].par;
        $(`#col${i}`).append(`<div class='boxes'>${holesArray[i - 1].teeBoxes[0].par}</div>`);
    }

    inPar = totalPar - outPar;

    $('#in-score').append(`<div class='score-boxes'>${inPar}</div>`);
    $('#total-score').append(`<div class='score-boxes'>${totalPar}</div>`);
}

function populateTeeSelect(currentCourse) {
    $('#tee-select').html(`<option value='-1'>Pick A Tee</option>`);
    for (let i = 0; i < currentCourse.length; i++) {
        if (currentCourse[i].teeType !== 'auto change location') {
            $('#tee-select').append(`<option value='${currentCourse[i].teeType}'>${currentCourse[i].teeType}</option>`);
        }
    }
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