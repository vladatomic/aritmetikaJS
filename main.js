$(document).ready(function() {

    Uputstvo();

    function Uputstvo(){
        var message='<h2>Uputstvo:</h2>';
        message+='<p>Odgovor na polje sa znakom <strong>?</strong> dobija se tako što se klikne na broj za koji mislite da je odgovor i prevuče se na polje sa znakom <strong>?</strong></p>';
        bootbox.alert(message);
    };
    // Pravi tabelu sa brojevima koji mogu da se dragg-uju na polje koje je ?
    var brojevi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (var i = 0; i < brojevi.length; i++) {
        var broj = brojevi[i];
        var liElementKaoBroj = $("<li><h1>" + broj + "</h1></li>").addClass("drop col-md-1 btn btn-info numberStyle");
        liElementKaoBroj.draggable({
            helper: 'clone',
            zIndex: '100'
        });
        $("#listaBrojeva").append(liElementKaoBroj);
    }

    var listaZadataka = [{
            "zad": ["9", "-", "?", "=", "3"],
            "odgovor": "9-6=3"
        },
        {
            "zad": ["?", "-", "3", "=", "4"],
            "odgovor": "7-3=4"
        },
        {
            "zad": ["10", "-", "?", "=", "7"],
            "odgovor": "10-3=7"
        },
        {
            "zad": ["1", "+", "?", "=", "5"],
            "odgovor": "1+4=5"
        },
        {
            "zad": ["4", "+", "?", "=", "9"],
            "odgovor": "4+5=9"
        },
        {
            "zad": ["5", "+", "?", "=", "10"],
            "odgovor": "5+5=10"
        }
    ];



    for (var t = 0; t < listaZadataka.length; t++) {

        var objekatZadatka = listaZadataka[t];
        var postavkaZadatka = objekatZadatka.zad;
        var odgovorZadatka = objekatZadatka.odgovor;
        var redniBrojZadatka = t + 1;
        var nazivZadatka = "zad" + redniBrojZadatka;

        // Dinamički se generišu zadaci sa poljima koje treba upisati , izvor je JSON objekat listaZadataka
        var divZadatak = $('<div class="col-md-offset-1 col-md-11" id="' + nazivZadatka + '"> </div>');
        var divOdgovor_Reset = $('<div class="col-md-2"  id="Odgovor_reset_' + nazivZadatka + '"></div>');
        var initListePoljaZadatka = divZadatak.append($('<ul id="Zadatak_' + nazivZadatka + '"></ul>'));
        var resetButton = $('<button class="btn btn-danger sakriOdgovor" id="resetZadatak_' + nazivZadatka + '" name="ResetBtn_' + nazivZadatka + '">Pokušaj ponovo</button>')
            .css({
                'white-space': 'normal',
                'padding': '5px',
                'text-align':'center'
            });
        var odgovorElement = $('<div  id="odg_' + nazivZadatka + '">' + odgovorZadatka + '</div>').addClass("sakriOdgovor");
        $('#PanelZadaci').append(divZadatak);
        for (var v = 0; v < postavkaZadatka.length; v++) {
            var vrednostPoljaZadatka = postavkaZadatka[v];
            var zadatakElement = $("<li><h1>" + vrednostPoljaZadatka + "</h1></li>").addClass("col-md-1 btn btn-default numberStyle");
            if (vrednostPoljaZadatka === "?") {
                zadatakElement = CreateQuestion(zadatakElement, nazivZadatka);
            }
            $('#Zadatak_' + nazivZadatka).append(zadatakElement);
        }
        divOdgovor_Reset.append(odgovorElement);
        divOdgovor_Reset.append(resetButton);
        divZadatak.append(divOdgovor_Reset);
        CreateResetButtonClickEvent(nazivZadatka);
    }

    //Event Click Reset button-a vraća polje koje se traži na vrednost pre drop broja
    function CreateResetButtonClickEvent(naziv_zadatka) {
        var btnReset = $("#resetZadatak_" + naziv_zadatka).click(function() {
            var temp;
            var tempVrednost = CreateQuestion(temp, naziv_zadatka);
            $('.znakPitanja' + naziv_zadatka).replaceWith(tempVrednost);
            $('#resetZadatak_' + naziv_zadatka).addClass('sakriOdgovor');
            $('#infoNetacno_' + naziv_zadatka).remove();
            $('#Odgovor_reset_' + naziv_zadatka).removeClass('btn btn-danger');
        });

        return btnReset;

    }

    //Funkcija koja popunjava traženo polje na vrednost ? ili na onu koja se drop-uje sa brojem
    function CreateQuestion(zadatak_element, naziv_zadatka) {
        var znakPitanjaElement;
        if (zadatak_element === undefined) {
            znakPitanjaElement = $("<li><h1>?</h1></li>").addClass("col-md-1 btn btn-default numberStyle");

        } else {
            znakPitanjaElement = zadatak_element;
        }
        znakPitanjaElement.droppable({
            accept: '.drop',
            drop: function(event, ui) {
                $(this).replaceWith($(ui.draggable).clone().addClass("znakPitanja" + naziv_zadatka));
                var ProveraOdgovora = $('#Zadatak_' + naziv_zadatka).text() === $('#odg_' + naziv_zadatka).text();
                if (ProveraOdgovora) {
                    $('#odg_' + naziv_zadatka).removeClass('sakriOdgovor').addClass('btn btn-success');
                    $('#odg_' + naziv_zadatka).html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                } else {
                    $('#resetZadatak_' + naziv_zadatka).removeClass('sakriOdgovor');
                    var ikonica=$('<span class="glyphicon glyphicon-remove" aria-hidden="true" id="infoNetacno_' + naziv_zadatka + '"></span>').css('margin','5px');
                    //$('#Odgovor_reset_' + naziv_zadatka).prepend('<div class="btn btn-danger" id="infoNetacno_' + naziv_zadatka + '">Netačno</div>');
                    $('#resetZadatak_' + naziv_zadatka).prepend(ikonica);
                }
            }
        });
        return znakPitanjaElement;
    }
});
