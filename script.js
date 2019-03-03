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

function getMainContainerContent(name, cuisine, rating, reviews) {
	var content = "";
	content += "<div class='col-sm-4 restaurant_item'>";
	content += "	<div class='card'>";
	content += "		<div class='img_container'>";
	content += "			<img class='restuarant_img' src='Images/download.jpeg' alt='" + name + "_image' >";
	content += "			<div class='img_overlay'>";
	content += "				<h4 id='restaurant_name'><b>" + name + "</b></h4>";
	content += "			</div>";
	content += "		</div>";
	content += "		<div class='card_container'>";
	content += "			<div class='row'>";
	content += "				<div class='col-sm-9'>";
	content += "					<p><b>Cuisine: </b>" + cuisine + "</p>";
	content += "					<p><b>Reviews: </b>" + reviews + "</p>";
	content += "				</div>";
	content += "				<div class='col-sm-3'>";
	content += "					<span class='rating'><i class='fa fa-star' style='color:yellow;'></i>&nbsp;&nbsp;" + rating + "</span>";
	content += "				</div>";
	content += "			</div>";
	content += "		</div>";
	content += "	</div>";
	content += "</div>";

	return content;
}

function listOfRestaurants(data){
    $("#main_content").html("");
    for (var i = 0; i < data.length; i++) {
        var name    =   data[i][0];
        var city    =   data[i][1];
        var cuisine =   data[i][2].replace(/\[|\]|'/g,"");
        var ranl    =   data[i][3];
        var rating  =   data[i][4];
        var reviews =   data[i][5];

		var mainContainerContent = getMainContainerContent(name, cuisine, rating, reviews);

        $('#main_content').append(mainContainerContent);
    }
    $('#search_param').quicksearch('.restaurant_item');
}

function sortByRating(a, b) {
	return b[4] - a[4];
}

function sortByReviews(a, b) {
    return b[5] - a[5];
}

function sortByRanking(a, b) {
    return a[3] - b[3];
}

function pre_processing(data, sort_type) {
    csv_data = csvToArray(data);
    csv_data.shift();
    if (sort_type == "rating") {
        csv_data.sort(sortByRating);
    } else if(sort_type == "reviews") {
        csv_data.sort(sortByReviews);
    }}

function ajax_call(sort_type) {
    $.ajax({
        async: false,
        url:"euro_restrobeee02c.csv",
        dataType: "text",
        type: "GET",
        success:function(data){
            pre_processing(data, sort_type);
		}
    });

    $("#pagination_div").pagination({
        dataSource:csv_data,
        pageSize: 45,
        showGoInput: true,
        showGoButton: true,
        callback: function(csv_data, pagination) {
            listOfRestaurants(csv_data)
        }
    });
}

var csv_data = null;

$(document).ready(function(){
    ajax_call("");
});
