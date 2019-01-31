
var telecomando = null;
var indice = 1;

var loadChannels = function( data ) {  

    telecomando = data;

    // in questa parte del programnma i dati sono caricati
    
    $('.number').addClass('dentro'); // aggiunge lo sfondo blu su i canali attivi
    $('.number').off('click'); //rimuove l'alert dopo il caricamento dei canali
    $('.number').on("click", onClickChannel); //attiva i canali
    // $('.numbers').text(indice);

    var listaDom = $('.number');
    // var lista2Dom = $('span.popuptext')

    for ( var i = 0; i < listaDom.length; i++) {
      if (telecomando[String(i+1)] == undefined || !telecomando[String(i+1)].hasOwnProperty("url")) {
        $(listaDom[i]).removeClass('dentro') ;
        $(listaDom[i]).off('click');
        // $(listaDom[i]).on('mouseenter', function() {
        //   $(this).parent().find('.popuptext').css('visibility', 'visible');
        // });
      } else {
        $(listaDom[i]).addClass('dentro');
        
      }
    }
  };


  var onClickFunction = function() {
    
    var url = $("#optionSelect").val();
    $.getJSON( url, loadChannels);

  }    
  
  var onClickChannel = function(mouseEventClick){
      indice = Number($(mouseEventClick.currentTarget).text());
      setChannel();
  };

  var onClickPlus = function(mouseEventClick){
    if (indice < 99) {
      indice++;
      setChannel();
    }
  };
  
  var onClickMinus = function(mouseEventClick){
    if (indice > 1) {
      indice--;
      setChannel();
    }
  };
 

  function setChannel() {
    
    $.ajax({
      url: "changeChannel.php",
      type: "get", //send it through get method
      data: { 
        cmd: "setChannel",
        url: telecomando[indice].url
      },
      success: function(response) {
        $('.numbers').html(response);  
      },
      error: function(xhr) {
        $('.numbers').text("errore");
      }
    });
  }

  function shutDown() {
    $.ajax({
      url: "changeChannel.php",
      type: "get", //send it through get method
      data: { 
        cmd: "shutDown"
      },
      success: function(response) {
        $('.numbers').text("Shutting down");  
      },
      error: function(xhr) {
        $('.numbers').text("errore");
      }
    });
  }




 $(document).ready(function() {

    $('.number').on('click', () => {
        alert("upload the channels list first");
    })

    $("#shutdown").on("click", shutDown);

    $("#loadConf").on("click", onClickFunction);

    $(".prova").on('click',() => {
      $(".nascondi").toggle(400);
      $(".nascondi").addClass("margine");
    })

    //tasti + and - 
    $('.plus').on('click', onClickPlus);
    $('.min').on('click', onClickMinus);
   
});