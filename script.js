//alert("testData");
$(document).ready(function(){

$.ajax({
	//headers:{ 'Access-Control-Allow-Origin': 'file:///C:/Users/HP-PC/Documents/Dell_UIChallenge/euro_restrobeee02c.csv'},
 url:"test.csv",
 dataType: "text",
 type: "GET",
 success:function(data){


 	//var testData= data.split(/\r?\n|\r/);
 	//alert(testData);
  listOfRestaurants(data);

 } 

});




});

function listOfRestaurants(data){
	//alert(data);
	
	var appendText='';


	
	 var restaurantArray= csvToArray(data);
      for(var i=1;i<6;i++){
      	//console.log(data[i].split(",")[0]);

      
      	//console.log(parsed);
        
         
         var name= restaurantArray[i][0];
         var rating =restaurantArray[i][4];
         var cuisine = restaurantArray[i][2];
         var cuisine = cuisine.replace('[',"");
         var cuisine = cuisine.replace(']','');
         var city = restaurantArray[i][1];
         var reviews=restaurantArray[i][5];

         
           
         appendText += "<div class='list'><span class='name'>"+ name+"</span>";
    appendText += "<img class='hotelImg' src='Images/fancy-resort-hotel.png'>";
    appendText += "<span class='faIcon'><i class='fa fa-star' aria-hidden='true'></i>"+rating+"</span>";
    appendText +="<div class='cuisine'>"+ cuisine +"</div>";
     appendText +="<div class='city'>"+ city +"</div>";
     appendText +="<div class='reviews'>"+ reviews +"</div>";



         appendText +="</div>";


         $('.mainContainer').html(appendText);

      }


	//appendText +="<div class='list'>" +data[i].Name"</div>";


}

function csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
};


	