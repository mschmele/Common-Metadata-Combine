urs = {
  submit: function() {
    let response = $.post({url: "https://urs.earthdata.nasa.gov/login",
                           crossDomain: true,
                           data: {username: $('#urs-username').val(),
                                  password: $('#urs-password').val()}});

    console.log(response);
  }
}
