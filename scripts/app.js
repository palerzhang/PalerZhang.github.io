window.onload = function () {
    var days = document.getElementById('days');
    var today = new Date();
    var i, li;
    for (i = 1; i < 32; i++) {
        li = document.createElement('li');
        li.innerHTML = i;
        if(i === 8){
            li.setAttribute('class', 'active');
        }
        days.appendChild(li);
    }
};