// const express =  require('express');
// const app = express();
// const port = 5000;


// app.listen(port,()=>{
//     console.log("serevr on : ",port);
// });

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".login form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        let username = document.querySelector(".signup input[name='username']").value;
        let password = document.querySelector(".signup input[name='password']").value;
        // let confirmPassword = document.querySelector(".signup input[name='confirmPassword']").value;

        // // Send data to the backend API
        // fetch("http://localhost:5000/signup", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ username, password, confirmpassword: confirmPassword }),
        // })
        // .then(response => response.json())
        // .then(data => console.log("Response from server:", data))
        // .catch(error => console.error("Error:", error));
        console.log(username,password )
    });
});
