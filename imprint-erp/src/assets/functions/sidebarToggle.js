
$(window).ready(function(){

    $('#sideBarToggler').on('click', ()=>{

        $('#sidebar').toggleClass('active');
        $('#main').toggleClass('expand');

    })

})