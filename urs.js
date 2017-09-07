urs = {
  init: function() {
    $('#urs-login').on('submit', function(event) {
      event.preventDefault();
      let response = $.post({url: "https://urs.earthdata.nasa.gov/login",
                             crossDomain: true,
                             data: {username: $('#urs-username').val(),
                                    password: $('#urs-password').val()}});

      console.log(response);
    });
  }
}
