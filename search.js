search = {
  sit: "http://cmr.sit.earthdata.nasa.gov/search/collections?downloadable=true&",
  uat: "http://cmr.uat.earthdata.nasa.gov/search/collections?downloadable=true&",
  prod: "http://cmr.earthdata.nasa.gov/search/collections?downloadable=true&",

  init: function() {

    $('#search-bar .btn').on('click', function(event) {
      search.forMyData(event.delegateTarget.previousElementSibling.value)
    })

    $('#big-red-button').on('click', function(event) {
      var reader = new FileReader()
      var selectedFile = document.getElementById('open-file').files[0]
      var files
      reader.onload = function(evt) {
        files = evt.target.result.split("\n")
        search.downloadItAll(files)
      };

      reader.readAsBinaryString(selectedFile)
    })
  },

  forMyData: function(params) {
    $.get({url: search[$('input[name=env-selector]:checked').val().toLowerCase()] + params,
           data: "Accept: application/json"},
          function(data) {
            debugger
            Mustache.parse(search.resultRowTemplate)
            var render = Mustache.render(search.resultRowTemplate, {collectionUrl: "Luke", content: ""})

            $('.eui-accordion__body tbody').html()
          })
  },

  downloadItAll: function(files) {
    files.forEach(function callback(currentValue, index, array) {
      search.downloadData(currentValue, currentValue.split("\/").pop())
    })
  },

  downloadData: function(uri, name) {
    var link = document.createElement("a")
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    delete link
  },
  resultRowTemplate: "<tr><td data-url='{{collectionUrl}}'>{{content}}</td></tr>"
}
