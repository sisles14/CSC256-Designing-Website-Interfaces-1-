window.onload = function() {
    let student = {
        name: "Staneisha Isles",
        major: "Advancing Computer Science",
        email: "sisles85700@uat.edu",
        graduation: "May 2028",
        photo: "images/darkfantasy.jpg"
    };

    document.getElementById("name").textContent = "Name: " + student.name;
    document.getElementById("major").textContent = "Major: " + student.major;
    document.getElementById("email").textContent = "UAT Email: " + student.email;
    document.getElementById("graduation").textContent = "Graduation Date: " + student.graduation;
    document.getElementById("profile").src = student.photo;
};