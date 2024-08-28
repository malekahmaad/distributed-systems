let count = 0;
let res = [];
let text = "";
$(document).ready(function() {
    $("#moreButton").hide(); 
    $("#searching").on("input",function(){
        $(".images").html("");
        text = $(this).val();
        res = [];
        count = 0;
        if(text.length >= 3){
            count+=1;
            $(".images").css("border", "5px");
            $(".images").css("border-style", "double");
            $(".images").css("border-radius", "5px");
            $(".images").css("border-color", "red");   
            giveSomeImages();
        }
        else{
            $(".images").css("border", "none");
            $(".images").css("border-style", "none");
            $(".images").css("border-radius", "0px");
            $(".images").css("border-color", "white");
            $("#moreButton").hide();
            $(".images").html("");    
        }
    });

    $("#moreButton").click(function(){
        count+=1;
        giveSomeImages();
    });

    $(".images").on("click",".unsplashImage",function(){
        $(".imageInfos").html("");
        let src = $(this).attr("src");
        for(let index = 0; index < res.length; index++){
            if(src == res[index].urls.thumb){
                $(".imageInfos").append("<img src='" + res[index].urls.small + "' class='smallImage'>");
                $(".imageInfos").append("<div class='alt_description'>"+res[index].alt_description+"</div>");
                if(res[index].description == null){
                    $(".imageInfos").append("<div class='discriptionHead'>-discription: </div><div class='description'> we have no description about this image</div>");
                }
                else{
                    $(".imageInfos").append("<div class='discriptionHead'>-discription: </div><div class='description'>" + res[index].description + "</div>");
                }
                $(".imageInfos").append("<div class='likes'>number of likes: "+res[index].likes+"</div>");
            }
        }
        $(".imageInfos").append("<button id = 'close_button'>close</button>");
        $(".imageInfos").show();
    });

    $(".imageInfos").on("click","#close_button",function(){
        $(".imageInfos").hide();
        $(".imageInfos").html("");
    });

    let giveSomeImages = function(){
        let link = "https://api.unsplash.com/search/photos?query="+text+
        "&client_id=LQvZJlUeCH5RGDr2zHDDvcXVA66gN_r5lVuUk5Ks1yM&per_page=20&page="+count;
        
        $.ajax(link,
            {   
                dataType: "json",
                success: function(data) {
                    if(data.total == 0){
                        $(".images").css("border", "none");
                        $(".images").css("border-style", "none");
                        $(".images").css("border-radius", "0px");
                        $(".images").css("border-color", "white");
                    }
                    for (let index = 0; index < data.results.length; index++) {
                        res.push(data.results[index]);
                        if(index%4 == 0 && index != 0){
                            $(".images").append("</div>");
                        }
                        if(index%4 == 0){
                            $(".images").append("<div class = 'imageRow'>");
                        }
                        $(".images").append("<img src='" + data.results[index].urls.thumb + "' class='unsplashImage'>");
                    }
                    $(".images").append("</div>");
                    if(count < data.total_pages){
                        $("#moreButton").show();
                    }
                    else{
                        $("#moreButton").hide();
                    }
                },
                error: function(){
                    $(".images").html("error while doing the ajax operation");
                }
            });
    };
});