
    

            /*

            ekran ładowania
            okazał się niepotrzebny gdyrz animacje się zacinają podczas przeszukiwania plików z hasłami

            var hideloading;
            function loadingin(){
                $("#loading").stop();
                var tmpAnimation = 0;
                var element = $("#loading");
                $({degrees: tmpAnimation - 900}).animate({degrees: tmpAnimation}, {
                    duration: 1000,
                    step: function(now) {
                        element.css({
                            transform: 'rotate(' + now + 'deg)'
                        });
                    }
                });
                tmpAnimation = tmpAnimation + 90;
                $("#loading").css("z-index", 1007).animate({
                    height: "300px",
                    
                },1000);
            }
            function loadingoff(){
                $("#loading").stop();
                var tmpAnimation = 180;
                var element = $("#loading");
                $({degrees: tmpAnimation - 900}).animate({degrees: tmpAnimation}, {
                    duration: 1000,
                    step: function(now) {
                        element.css({
                            transform: 'rotate(' + now + 'deg)'
                        });
                    }
                });
                tmpAnimation = tmpAnimation + 90;
                $("#loading").css("z-index", 1007).animate({
                    height: "0",
                    width: "0"
                    
                },1000);
            }
            */
           var jsonPasswords='jsonPasswords.json';//wczytanie pliku json z hasłami
            var txtPasswords='morePasswords.txt';//wczytanie pliku txt z hasłami

            function sprawdzanieHasla(){
                var password=document.getElementById("pass").value;
                var trudnosc=0;
                console.log("hasło wczytane");
                if(/[a-z]/.test(password)==true){
                    console.log("hasło ma małą literę");
                    trudnosc++;
                }
                if(/[A-Z]/.test(password)==true){
                    console.log("hasło ma dużą literę");
                    trudnosc++;        
                }
                if(/\d/.test(password)==true){
                    console.log("hasło ma liczbę");
                    trudnosc++;      
                }
                if(/[^a-zA-Z0-9]/.test(password)==true){
                    console.log("hasło ma znak specjalny");
                    trudnosc++;
                }
                if(password.length>=8){
                    console.log("hasło ma przynajmniej 8 znaków");
                    trudnosc++;
                }
                if(trudnosc==5){
                    return 1;
                }
                else{
                    return 0;
                }  
            }
            //sprawdzanie trudności hasła, zwraca 1 jeśli spełnia wszystkie warunki

            function ulepsz(){
                var charactersLower = "abcdefghijklmnopqrstuvwxyz";
                var charactersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var charactersLength = charactersLower.length;
                var characters="";
                characters += charactersUpper.charAt(Math.floor(Math.random() * charactersLength));
                characters += charactersLower.charAt(Math.floor(Math.random() * charactersLength));
                characters += charactersLower.charAt(Math.floor(Math.random() * charactersLength));
                var pass=document.getElementById("pass").value;;
                var liczby = Math.round((Math.random() * (999 - 100) + 100));
                document.getElementById("result3").innerHTML=("Twoje nowe hasło to: "+pass+"#"+liczby+"$"+characters);
            }
            //ulepszanie hasła z podanej frazy na hasło trudne

            function sprawdzanie(){
                var password=document.getElementById("pass").value;
                $("#result").css("color", "black");
                document.getElementById("result1").innerHTML=("Oto wyniki trudności twojego hasła:");
                if(password!=""){//sprawdzanie czy wpisano hasło
                    if(sprawdzanieHasla()==1){
                        $("#result").stop();
                        $("#result").animate({
                            height: "30%",
                            width: "80%",
                            padding: "20px",
                            fontSize: "100%",
                            borderWidth: "2px"
                        },1000);
                        document.getElementById("result1").innerHTML=("Gratulacje!<br/>Twoje hasło spełnia wszystkie warunki trudnego hasła!");
                        document.getElementById("result2").innerHTML=("<br.>Nie znaczy to jednak, że nie jest ono znanym hasłem!");
                        document.getElementById("result3").innerHTML=("Dla większej pewności sprawdź czy nie znajduje się ono w naszych bazach danych");
                    }
                    else{
                        $("#result").stop();
                        $("#result").animate({
                            height: "50%",
                            width: "80%",
                            padding: "20px",
                            fontSize: "100%",
                            borderWidth: "2px"
                        },1000);
                        document.getElementById("result1").innerHTML=("Niestety!<br/>twoje hasło nie spełnia wszystkich warunków trudnego hasła,<br/>ale możemy ci pomóc ulepszyć podaną frazę na trudne hasło!");
                        document.getElementById("result2").innerHTML=("Kliknij <button class='mb-5 mt-2' type='button' name='button' onclick='ulepsz()'>tutaj</button> aby je wygenerować : D");
                        document.getElementById("result3").innerHTML=("");
                    }
                }
                else{
                    document.getElementById("result1").innerHTML=("Nie wspisano hasła");
                    document.getElementById("result2").innerHTML=("");
                    document.getElementById("result3").innerHTML=("");
                    $("#result").stop();
                    $("#result").css("color", "red");
                    $("#result").css("border", "solid black");
                    $("#result").animate({
                        height: "10%",
                        width: "50%",
                        padding: "20px",
                        fontSize: "100%",
                        borderWidth: "2px"
                    },1000);
                }
            }

            function sprawdz1(){
                var password=document.getElementById("pass").value;
                $("#result").css("color", "black");
                //var czyznalazlo;
                //console.log(czyznalazlo);
                console.log(password);
                if(password!=""){
                    //loadingin();
                    document.getElementById("result1").innerHTML=("Pomyślnie wczytano hasło lokalnie<br/>Przeszukujemy bazę danych");
                    document.getElementById("result2").innerHTML=("");
                    document.getElementById("result3").innerHTML=("");
                    $.ajax({//wczytanie pliku json i sprawdzanie go słowo po słowie w poszukiwaniu wpisanego hasła
                        type: "GET",
                        url: "jsonPasswords.json",
                        dataType: "json",
                        success: function(json) {
                            var j=$(json).length;
                            //loadingin();
                            for(i=0 ; i<j ; i++){
                                var check=json[i];
                                if(password!=check){
                                    czyznalazlo="nie";
                                }
                                else{
                                    console.log("znaleziono");
                                    document.getElementById("result2").innerHTML=("Twoje hasło jest dość znane");
                                    //hideloading="tak";
                                    console.log(check);
                                    czyznalazlo="tak";
                                    i=j;
                                }
                            }
                            console.log(czyznalazlo);
                            if(czyznalazlo=="nie"){
                                console.log("nie znaleziono");
                                document.getElementById("result2").innerHTML=("Twoje hasło nie znajduje się na liście znanych haseł");
                                document.getElementById("result3").innerHTML=("Nie znaczy to jednak, że jest ono hasłem trudnem!");
                            };
                        } 
                    });
                    $("#result").stop();
                    $("#result").animate({
                        height: "40%",
                        width: "80%",
                        padding: "20px",
                        fontSize: "100%",
                        borderWidth: "2px"
                    },1000);
                }
                else{
                    document.getElementById("result1").innerHTML=("Nie wspisano hasła");
                    document.getElementById("result2").innerHTML=("");
                    $("#result").stop();
                    $("#result").css("color", "red");
                    $("#result").css("border", "solid black");
                    $("#result").animate({
                        height: "10%",
                        width: "50%",
                        padding: "20px",
                        fontSize: "100%",
                        borderWidth: "2px"
                    },1000);
                }
                
                
            }

            function sprawdz2(){
                $("#result").css("color", "black");
                document.getElementById("result1").innerHTML=("Czy na pewno chcesz kontynuować?<br/>Program przeszuka przez 100tysięcy haseł<br/>Sprawdzenie może zająć nawet 5minut na wolniejszym urządzeniu");
                document.getElementById("result2").innerHTML=("<button class='mb-5 mt-2' type='button' name='button' onclick='sprawdz2confirmed()'>Tak</button>");
                document.getElementById("result3").innerHTML=("");
                $("#result").stop();
                    $("#result").animate({
                        height: "30%",
                        width: "80%",
                        padding: "20px",
                        fontSize: "100%",
                        borderWidth: "2px"
                    },1000);
            }

            function sprawdz2confirmed(){
                $("#result").css("color", "black");
                var password=document.getElementById("pass").value;
                console.log(password);
                if(password!=""){
                    //loadingin();
                    document.getElementById("result1").innerHTML=("Pomyślnie wczytano hasło lokalnie<br/>Przeszukujemy bazę danych");
                    document.getElementById("result2").innerHTML=("");
                    document.getElementById("result3").innerHTML=("");
                    $.get(txtPasswords,function(txt){
                    //wczytanie zmiennej przechowywującej plik txt i przemienianie jej w text 
                    //przemienienie go w tabelę gdzie każdy element jest wyznaczony przez nową linijkę
                    //po czym szukanie hasła w pliku
                    var lines=txt.split("\n");
                    var j=lines.length;
                        for(i=0 ; i<j ; i++){
                            var check=lines[i];
                            if(password!=check){
                                console.log(check);
                                czyznalazlo="nie";
                            }
                            else{
                                console.log("znaleziono");
                                console.log(check);
                                document.getElementById("result2").innerHTML=("Twoje hasło jest dość znane");
                                document.getElementById("result3").innerHTML=("");
                                i=j
                                czyznalazlo="tak";
                            }
                            //loadingoff();
                        }
                        console.log(czyznalazlo);
                            if(czyznalazlo=="nie"){
                                console.log("nie znaleziono");
                                document.getElementById("result2").innerHTML=("Twoje hasło nie znajduje się na liście znanych haseł");
                                document.getElementById("result3").innerHTML=("Nie znaczy to jednak, że jest ono hasłem trudnem!");
                        };
                    });

                    $("#result").stop();
                    $("#result").animate({
                        height: "40%",
                        width: "80%",
                        padding: "20px",
                        fontSize: "100%",
                        borderWidth: "2px"
                    },1000);
                }
                else{
                    document.getElementById("result1").innerHTML=("Nie wspisano hasła");
                    document.getElementById("result2").innerHTML=("");
                    document.getElementById("result3").innerHTML=("");
                    $("#result").stop();
                    $("#result").css("color", "red");
                    $("#result").css("border", "solid black");
                    $("#result").animate({
                        height: "10%",
                        width: "50%",
                        padding: "20px",
                        fontSize: "100%",
                        borderWidth: "2px"
                    },1000);
                }
                
                
            }

            var faqhtml;

            $(function(){
                $("#faqButton").hover(function(){
                $(this).css("background-color", "rgb(110,200,110)");
                }, function(){
                $(this).css("background-color", "rgb(30, 160, 40)");
                });

                $("#hide").change(function() {
                    var ischecked= $(this).is(':checked');
                    if(!ischecked)
                        $("#pass").attr('type', 'text');
                    if(ischecked)
                        $("#pass").attr('type', 'password');
                }); 
                /*
                if(hideloading=="tak"){
                    loadingoff();
                }
                */
            });

            function faq(){
                $.get("faq.html", function (result) {
                    faqhtml = result;
                    $("#faq").append(faqhtml);

                    $("#faqbg").stop();
                    $("#faqmain").stop();
                    $("#faqtext1").stop();
                    $("#faqtext2").stop();
                    $("#faqtext3").stop();

                    $("#faqbg").css("z-index", 1000).animate({
                    height: "100vh",
                    width: "100vw",
                    },1000);

                    $("#faqmain").css("z-index", 1001).animate({
                    height: "50vh",
                    width: "70vw",
                    marginLeft: "15vw",
                    marginBottom: "25vh",
                    fontSize: "100%",
                    padding: "30px"
                    },1000);

                    $("#faqtext1").animate({fontSize: '4vw'},1000);
                    $("#faqtext2").animate({fontSize: '2vw'},1000);
                    $("#faqtext3").animate({fontSize: '2vw'},1000);
                    $(".faqtext").animate({fontSize: '1,5vw'},1000);
                    
                    setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.1)");
                    }, 100);
                    setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.2)");
                    }, 200);
                    setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.3)");
                    }, 300);
                    setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.4)");
                    }, 400);
                    setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.5)");
                    }, 500);
                    setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.6)");
                    }, 600);
                    setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.7)");
                    }, 700);
                    setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.8)");
                    }, 800);
                    setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.9)");
                        $('#faqmain').css('min-height', '500px');
                    }, 900);
                });
            };

            function faqpowrot(){

                $("#faqbg").stop();
                $("#faqmain").stop();
                $("#faqtext1").stop();
                $("#faqtext2").stop();
                $("#faqtext3").stop();

                $("#faqbg").css("z-index", 1000).animate({
                    height: "0",
                    width: "0",
                },1000);

                $("#faqmain").css("z-index", 1001).animate({
                    height: "0",
                    width: "0",
                    marginLeft: "0",
                    marginBottom: "0",
                    fontSize: "0",
                    padding: "0"
                },1000);

                $("#faqtext1").animate({fontSize: '0'},1000);
                $("#faqtext2").animate({fontSize: '0'},1000);
                $("#faqtext3").animate({fontSize: '0'},1000);

                setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.8)");
                        $('#faqmain').css('min-height', '0');
                }, 100);
                setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.7)");
                }, 200);
                setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.6)");
                }, 300);
                setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.5)");
                }, 400);
                setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.4)");
                }, 500);
                setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.3)");
                }, 600);
                setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.2)");
                }, 700);
                setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.1)");
                }, 800);
                setTimeout(
                    function() {
                        $("#faqbg").css("background-color", "rgba(0, 0, 0, 0.0)");
                }, 900);

            };