window.onload = () => {
    var http = new XMLHttpRequest();
    http.open('POST', 'https://threemarysmiledentalclinicapi.onrender.com/checkingToken', true);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    http.send(JSON.stringify({ auth: localStorage.getItem('OOS_s') }))
    http.onload = async() => {
      let c = JSON.parse(http.response);
      if(c.response === 'success'){
        window.location.href = 'Homepage.html';
      }else{
        localStorage.clear();
      }
    }
}

function LoginBtn(){
    var name = document.getElementById("name");
    var pass = document.getElementById("pass");

    var http = new XMLHttpRequest();
    http.open('POST', 'https://threemarysmiledentalclinicapi.onrender.com/login', true);
    http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    http.send(JSON.stringify({ username: name.value, password: pass.value }))
    http.onload = async() => {
        let c = JSON.parse(http.response);
        if(c.response === 'success'){
          localStorage.setItem('OOS_s', c.token)
          alert("Successfully login.");
          window.location.href = 'Homepage.html';
        }else{
          alert('Username or Password is not completed or incorrect.');
        }

    }; 
}


