var APIConnection = {

    search_options: {},
    fetch_options: {},

    resetSearchHTML: function() {
        //Show most recent/relevant element again
        $("#search_type").show();
        
        //Reset HTML elements
        $(".search_loader")[0].remove();
        $(".query_header").remove();
        $("#pageNext").remove();
        $("#pageNum").remove();
        $("#pagePrev").remove();
        $('#search_results').html("");
    },
    
    startSearch: function(newSearch, searchTermNeeded) {
        if (ajaxLock != 0)
            return;

        if (!searchTermNeeded)
            searchTermNeeded = true;

        ajaxLock = 1;

        if ($(".search_loader").length == 0){
        var obj = document.getElementById('search_bar');
        var text = obj.value; 
        if (searchTermNeeded && obj.value == "")
            return;
        
        var ret = "";
            
        //Set search variables
        if (newSearch)
        {
            retstart = 0;
            pageNum = 1;
            currentSearch = text;
        }
        else    
            text = currentSearch;
        if (debugCite)   
            console.log(text);
            
        for (var x=0; x<text.length;x++)
        {
            if (text[x] == ' ')
                ret += " AND ";
            else
                ret += text[x];
        }
        
        //Loader gif
        $("<img/>", {
            src: "../images/loader.gif"
        }).addClass("search_loader").appendTo($("#search_wrap")); 
            
        $("#search_type").hide();
        
        this.searchSequence(ret)
        //    .then(this.fetchResults)
        //    .then(this.parseResults)
        //    .then(this.displayResults);
        }
    },

    searchSequence: function(value) {
        
    },

    noResults: function(obj) {
        $('<p/>', {
            text: "Sorry, there were no matching results...",
            class: "query_header"
        }).appendTo($(obj));
    },

    initResultsNavigator: function(wrapper) {
        //Create page control buttons
        $('<p/>', {
            text: "NEXT"
        }).attr("id", "pageNext").click(function(){movePage(1)}).prependTo(wrapper);
        
        $('<p/>', {
            text: "PREVIOUS"
        }).attr("id", "pagePrev").click(function(){movePage(-1)}).prependTo(wrapper);
        
         $('<p/>', {
            text: "Page " + pageNum + " of " + numberWithCommas(Math.ceil(search_count/itemsPerPage))
        }).attr("id", "pageNum").prependTo(wrapper);
        
        $('<h1/>',{
            text: numberWithCommas(search_count) + " Results for " + '"' + currentSearch + '"...'
          }).addClass('query_header').prependTo(wrapper);
    }
};


