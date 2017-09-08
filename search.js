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

    $('.eui-accordion__body table tbody').on('click', function(event) {
      search.downloadData(event.target.getAttribute('data-url'), $(event.target).val())
    })
  },

  forMyData: function(params) {
    $.get({url: search[$('input[name=env-selector]:checked').val().toLowerCase()] + params,
           beforeSend: function(xhr){xhr.setRequestHeader('Accept', 'application/vnd.nasa.cmr.umm_results+json');}},
          function(data) {
            var downloadLinks = data.items.map(function(item) {
              return item.umm.RelatedUrls.filter(function(url) { return url.Type == "GET DATA" })
            })
            var flatLinks = [].concat.apply([], downloadLinks)

            var renderdata = flatLinks.map(function(link) {
                                return {collectionUrl: link.URL, content: link.Description}
                              })
            Mustache.parse(search.resultRowTemplate)
            var render = Mustache.render(search.resultRowTemplate, {datarow: renderdata})

            $('.eui-accordion__body tbody').html(render)
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
  resultRowTemplate: "{{#datarow}}<tr class='data-download'><td data-url='{{collectionUrl}}'>{{content}}</td></tr>{{/datarow}}"
}
