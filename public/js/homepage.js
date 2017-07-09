jQuery("#request").click(function (e) {
   var url = $("#url").val();
    var urltext = $("#urltext").val();


    var data = {};
    data.url = url;
    data.urltext = urltext;

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'https://arcane-wildwood-85920.herokuapp.com/',
        success: function(data) {
            var json = JSON.parse(data);
            if(json.success == 1){
                alert("Successfully saved");

            }
        }
    });



});

jQuery("#fetch").click(function (e) {
    var urltext = $("#urltext").val();


    var data = {};

    data.urltext = urltext;

    $.ajax({
        type: 'GET',
        data: data,
        url: 'https://arcane-wildwood-85920.herokuapp.com/api/get',
        success: function(data) {
            var json = JSON.parse(data);
            if(json.success == 1){
                var scrapdata = json.data;
                var html;
                for(var i=0;i<scrapdata.length;i++){
                    html = `
                        <div class="row" data-id="${scrapdata[i].id}">
                        
                        
                        
                        
                                <div class="col-sm-4"><a href="${scrapdata[i].href}" class=""><img src="${scrapdata[i].image}" class="img-responsive" alt="${scrapdata[i].alt}"></a>
                                </div>
                                <div class="col-sm-8">
                                    <h3 class="title">${scrapdata[i].title}</h3>
                                    
                                    <p>
                                    
                                    ${scrapdata[i].desc}
                        </p>
                                    <p class="text-muted">Created at ${scrapdata[i].date}</p>
                        
                                </div>
                            </div>
                            <hr>

`;
                    $("#maincontent").append(html);
                }



            }
           // console.log(json);

        }
    });



});