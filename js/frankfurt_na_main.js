// in params:
	// language
	// 
var lang = sessionStorage.getItem("lang");

var t_ssoboi = sessionStorage.getItem("dance");
var g_ssoboi = sessionStorage.getItem("gost");

var zagadki;
var yakub_name;
var igrok_name;

if (lang === "rus") {
	igrok_name = "Дмитрий";
	yakub_name = "Якубович";
	yakub_dialog = {
			perehod_hoda: "Ход переходит к следующему игроку!",
			o4kov_nabare: " очков на барабане, буква?",
			net_takoi: "Нет такой буквы в этом слове!",
			otkroi_bukvu: "Откройте букву!",
			amozhno: "Леонид Аркадьевич, а можно...",
			stan: "Станцевать",
			gost: "Гостинцы в студию",
			priv: "Передать привет",
			votvamgost: "Счастья вам, здоровья, радости, любви, успехов в личной жизни!",
			priveti: ["Хочу передать приветы...", "...любимому супругу...", "...семье...", "...близким и друзьям."],
			na4_igri: "Добро пожаловать! С вами капитал-шоу \"Лужок Счастья\".",
			perv_zag: "И первая загадка:"
		};
	zagadki = [
	           {
	           	z: "Что всему голова?",
	           	o: "ХЛЕБ"
	           },
	           {
	           	z: "Одно из возможных выступлений на капитал-шоу.",
	           	o: "ТАНЕЦ"
	           }
	       ];
} else if (lang === "ukr") {
	igrok_name = "Микита";
	yakub_name = "Їакубовiч";
	yakub_dialog = {
		perehod_hoda: "Хiд переходить до наступного гравця!",
		o4kov_nabare: " очок на барабані, буква?",
		net_takoi: "Немає такої букви в цьому слові!",
		otkroi_bukvu: "Відкрийте букву!",
		amozhno: "Леонід Аркадійович, а можна...",
		stan: "Станцювати",
		gost: "Гостинці в студію",
		priv: "Передати привіт",
		votvamgost: "Щастя вам, здоров'я, радості, любові, успіхів в особистому житті!",
		priveti: ["Хочу передати привіти...", "...коханому чоловікові...", "...сім'ї...", "...близьким і друзям."],
		na4_igri: "Ласкаво просимо! З вами капітал-шоу \"Лужок Щастя\".",
		perv_zag: "І перша загадка:"
	};
	zagadki = [
	           {
		           	z: "Як називається брат матері?",
		           	o: "ДЯДЬКО" // KAPSOM!!!
		           },
		           {
		           	z: "Згідно соціологічних наук, що є осередком суспільства?",
		           	o: "РОДИНА"
		           },
		           {
		            z: "Яке слово пропущене в цьому рядку державного гімну: \"Запануєм i ми, браття, у [  ?  ] сторонці.\"",
		            o: "своїй"
		           }
		       ];
}

var igrok_inventar = {
		tanec: true,
		gstnc: true,
		privet: true
};

var ai = [
    {
    	name: "Борис",
    	bio: "ai0_bio",
    	vistup: "tanec"
    },
    {
    	name: "Добрый молодец",
    	bio: "ai1_bio",
    	vistup: "gostinec"
    },
    {
    	name: "Джигит",
    	bio: "ai2_bio",
    	vistup: "privet"
    },
    {
    	name: "Комиссар",
    	bio: "ai3_bio",
    	vistup: "privet"
    }
    
];

var o4ki_igrok = 0;
var o4ki_ai1 = 0;
var o4ki_ai2 = 0;

//0 - initial (vibor gostincev)
// 1 - intro 
// 2 - baraban
// 3 - show
// 4 - bukva
// 5 - slovo otgadano
var game_stage = 0;

// true - didn't
// false - did
var neotgadal_ili_da = true;

var never_built_keyboard = true;
var skip = 0;

// sluchaino vibiraetsa,
// 0 - igrok
// 1 - ai1
// 2 - ai2
var ochered = random_between(0, 2);
var ai1_i = random_between(0, ai.length - 1);
var ai2_i = random_between(0, ai.length - 1);
if (ai1_i === ai2_i) {
	if (ai2_i === ai.length - 1) {
		ai2_i = 0;
	} else {
		ai2_i++;
	}
}

var index_zagnaround = random_between(0, zagadki.length - 1);
var z_zagnaround = zagadki[index_zagnaround].z;
var o_zagnaround = zagadki[index_zagnaround].o.toUpperCase();
var slovo_2b_otg = [];
var slotov_ostalos = 0;
for (var i = 0; i < o_zagnaround.length; i++) {
	slovo_2b_otg.push(false);
	slotov_ostalos++;
}

var last_char;

// uzhe vibrannie bukvi
var once_guessed = [];
for (var i = 0; i < keyboard(lang).length; i++) {
	once_guessed.push(false);
}


( function () {
    window.addEventListener( 'tizenhwkey', function( ev ) {
        if( ev.keyName === "back" ) {
            var activePopup = document.querySelector( '.ui-popup-active' ),
                page = document.getElementsByClassName( 'ui-page-active' )[0],
                pageid = page ? page.id : "";

            if( pageid === "main" && !activePopup ) {
                try {
                    tizen.application.getCurrentApplication().exit();
                } catch (ignore) {
                }
            } else {
                window.history.back();
            }
        }
    } );
    
    $("#kb_popup_no").click(function(){ // dont delete pls
		$("#kb_popup").hide();
	});
    
    

    // [1] - intro
    // set background
    // yakub predstavlyaet igrokov
    // govorit krutit pervomu
    
    // [2] - baraban
    // krutitsa
    
    // [3] - show
    // vistuplenia (tanec, pesnya, sin-vnuk rasskazivaet stix)
    // gostinci (ogurci, salo, lapti, pryaniki, whatnot)
    // esli est ZH - cveti v studiyu po pervomu M
    // istoria o sebe
    // peredat privet
    
    // [4] - bukva
    // baraban ostanovilsa, ukazatel na sektor
    // yakub prosit nazvat bukvu
    	// verno -> [2]
    		// esli konec slova -> [5]
    	// neverno -> hod perehodit k drugomu igroku (prosto dialog) -> [2]
	draw_dialog(yakub_name, [yakub_dialog.na4_igri, yakub_dialog.perv_zag,
		                      z_zagnaround], function() {
		pass_move();
	});
} () );

function pass_move() {
	draw_dialog(yakub_name, [yakub_dialog.perehod_hoda], function() {
		if (ochered === 0 ) {
			next_stage(game_stage);
		} else {
			game_stage = 2;
			ai_xodit(ochered);
		}
	});
}

function ai_xodit(ai_no) {
	var curr_o4ki = 100 * random_between(0, 10);
	var cai; //for "current ai index"
	if (ai_no === 1) {
		cai = ai1_i;
	} else if (ai_no === 2) {
		cai = ai2_i;
	}
	
	while (true) {
		var bukva = random_between(0, 32);
		console.log(bukva);
		console.log(last_char);
		if (bukva === last_char) {
			bukva += 1;
			last_char = bukva;
		} else {
			last_char = bukva;
		}
		console.log(once_guessed[last_char]);
		if (once_guessed[last_char]) {
			continue;
		} else {
			once_guessed[last_char] = true;
			break;
		}
	}
	
	
	
	draw_dialog(yakub_name, [curr_o4ki + yakub_dialog.o4kov_nabare], function() {
		ch_guess(function () {
			var kb = keyboard(lang);
			draw_dialog(ai[cai].name, ["Буква " + kb[last_char]], function() {
				if (neotgadal_ili_da) {
					draw_dialog(yakub_name, [yakub_dialog.net_takoi], function() {
						if (ochered === 2) {
							ochered = 0;
							pass_move();
						} else if (ochered === 1) {
							ochered = 2;
							pass_move();
						} else if (ochered === 0) {
							ochered = 1;
							pass_move();
						}
					});
				} else {
					draw_dialog(yakub_name, [yakub_dialog.otkroi_bukvu], function() {
						var kb = keyboard(lang);
						var slovo_buffer = "Слово: ";
						for (var i = 0; i < slovo_2b_otg.length; i++) {
							if (slovo_2b_otg[i]) {
								slovo_buffer += "[" + o_zagnaround[i] + "] ";
							} else {
								slovo_buffer += "[ ] ";
							}
						}
						$("#bukva_text").text(slovo_buffer);
						if (slotov_ostalos <= 0) {
							window.location.href = "gameover.html";
						} else {
							ai_xodit(ai_no);
						}
					});
				}
			});
		});
	});
}

function next_stage(st) {
	if (st === 0) { // initial
		// draw bg
		game_stage = 1;
		next_stage(game_stage);
	} else if (st === 1) { // set intro
		game_stage = 2;
		next_stage(game_stage);
	} else if (st === 2) { // set baraban
		var kb = keyboard(lang);
		var slovo_buffer = "Слово: ";
		for (var i = 0; i < slovo_2b_otg.length; i++) {
			if (slovo_2b_otg[i]) {
				slovo_buffer += "[" + o_zagnaround[i] + "] ";
			} else {
				slovo_buffer += "[ ] ";
			}
		}
		$("#bukva_text").text(slovo_buffer);
		draw_baraban(function() {
			setTimeout(function(){ 
				next_stage(game_stage); 
				$("#baraban_img").removeClass("spinleft");
			}, 2000);
			$("#baraban_img").off("click");
		});
		game_stage = 3;
	} else if (st === 3) { // set show
		$("#baraban").hide();
		console.log(igrok_inventar);
		if (igrok_inventar.tanec || igrok_inventar.gstnc || igrok_inventar.privet) {
			draw_dialog(igrok_name, [yakub_dialog.amozhno], function() {
				$("#spinner").empty();
				if (igrok_inventar.tanec) {
					$("#spinner").append("<button id='spin_t' onclick='draw_tanec()'>" + yakub_dialog.stan + "</button>");
				} else {
					$("#spinner").append("<button disabled id='spin_t' onclick='draw_tanec()'>" + yakub_dialog.stan + "</button>");
				}
				if (igrok_inventar.gstnc) {
					$("#spinner").append("<button id='spin_g' onclick='draw_gstnc()'>" + yakub_dialog.gost + "</button>");
				} else {
					$("#spinner").append("<button disabled id='spin_g' onclick='draw_gstnc()'>" + yakub_dialog.gost + "</button>");
				}
				if (igrok_inventar.privet) {
					$("#spinner").append("<button id='spin_g' onclick='draw_priv()'>" + yakub_dialog.priv + "</button>");
				} else {
					$("#spinner").append("<button disabled id='spin_g' onclick='draw_priv()'>" + yakub_dialog.priv + "</button>");
				}	
				$("#spinner").show();
			});
			game_stage = 4;
		} else {
			game_stage = 4;
			next_stage(game_stage);
		}
	} else if (st === 4) { // bukva (slozhno)
		var curr_o4ki = 100 * random_between(1, 10);
		o4ki_igrok += curr_o4ki;
		draw_dialog(yakub_name, [curr_o4ki + yakub_dialog.o4kov_nabare], function() {
			draw_keyboard(lang, function() {
				if (neotgadal_ili_da) {
					draw_dialog(yakub_name, [yakub_dialog.net_takoi], function() {
						if (ochered === 2) {
							ochered = 0;
							pass_move();
						} else if (ochered === 1) {
							ochered = 2;
							pass_move();
						} else if (ochered === 0) {
							ochered = 1;
							pass_move();
						}
					});
				} else {
					draw_dialog(yakub_name, [yakub_dialog.otkroi_bukvu], function() {
						var kb = keyboard(lang);
						var slovo_buffer = "Слово: ";
						for (var i = 0; i < slovo_2b_otg.length; i++) {
							if (slovo_2b_otg[i]) {
								slovo_buffer += "[" + o_zagnaround[i] + "] ";
							} else {
								slovo_buffer += "[ ] ";
							}
						}
						$("#bukva_text").text(slovo_buffer);
						if (slotov_ostalos <= 0) {
							game_stage = 5;
							next_stage(game_stage);
						} else {
							// REFRESH WORD
							game_stage = 2;
							next_stage(game_stage);	
						}
					});
				}
			});
		});
	} else if (st === 5) {
		sessionStorage.setItem("o4ki", o4ki_igrok);
		window.location.href = 'chose_prize.html';
	}
}


function draw_baraban(cb) {
	$("#baraban").show();
	$("#baraban_img").on("click", function() {
		$(this).addClass("spinleft");
		cb();
	});
}


function draw_dialog(name, lines, xape) {
	$("#dialog").show();
	$("#dialog_name").text(function(){
		return name;
	});
	dialog_text_draw(lines, 0, 0, xape);
}

function dialog_text_draw(text, i, j, xape) {
	document.getElementById("dialog_blinker").innerHTML = " ";
	if (skip === 1) {
		skip = 0;
		document.getElementById("dialog_text").innerHTML = text[j];
		j++;
		if (j === text.length) {
			$("#dialog").off("click");
			$("#dialog").click(function() {
				$(this).hide();
				xape();
			});
			return;
		} else {
			$("#dialog").off("click");
			$("#dialog").click(function() {
				dialog_text_draw(text, 0, j, xape);
			});
		}
		document.getElementById("dialog_blinker").innerHTML = " &#128898";
		return;
	}
	if (skip === 0) {
		$("#dialog").off("click");
	    $("#dialog").on("click", function() {
	    	skip = 1;
		});
	 }
	i++;
	document.getElementById("dialog_text").innerHTML = text[j].slice(0, i);
	if (i === text[j].length) {
		document.getElementById("dialog_blinker").innerHTML = " &#128898";
		j++;
		if (j === text.length) {
			$("#dialog").off("click");
			$("#dialog").click(function() {
				$(this).hide();
				xape();
			});
			return;
		} else {
			$("#dialog").off("click");
			$("#dialog").click(function() {
				dialog_text_draw(text, 0, j, xape);
			});
		}
		return;
	} else {
		var t = setTimeout(function(){ dialog_text_draw(text, i, j, xape); }, 100);
	}
}

function draw_tanec() {
	igrok_inventar.tanec = false;
	$("#spin_t_draw").append("<img style='width: 100%;' src='" + t_ssoboi + "'></img>");
	$("#spinner").hide();
	$("#spin_t_draw").show();
	setTimeout(function(){ 
		$("#spin_t_draw").hide();
//		setTimeout(function(){
			next_stage(game_stage);
//		}, 150);
	}, 2000);
}
function draw_gstnc() {
	igrok_inventar.gstnc = false;
	$("#spin_g_draw").append("<img style='width: 100%;' src='" + g_ssoboi + "'></img>");
	$("#spinner").hide();
	$("#spin_g_draw").show();
	draw_dialog(igrok_name, [yakub_dialog.votvamgost], function() {
		$("#spin_g_draw").hide();
		next_stage(game_stage);
	});
}
function draw_priv() {
	igrok_inventar.privet = false;
	$("#spinner").hide();
	draw_dialog(igrok_name, yakub_dialog.priveti, function() {
		next_stage(game_stage);
	});
}

function keyboard(lang) {
	if (lang === "rus") {
		return ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", 
		        "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц",
		        "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"];
	}
	if (lang === "ukr") {
		return ['А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И', 'І', 'Ї', 'Й',
		        'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч',
		        'Ш', 'Щ', 'Ь', 'Ю', 'Я'];
	}
}

function draw_keyboard(lang, cb) {
	var kb = keyboard(lang);
	for (var i = 0; i < kb.length; i++) {
		if (once_guessed[i]) {
			$("#keyboard").append("<button disabled class='kb_btn' id='key" + i + "'>" + kb[i] + "</button>");
		} else {
			$("#keyboard").append("<button onclick='kb_btn_click(" +
					i + ", " + cb + ")' class='kb_btn' id='key" + i + "'>" + kb[i] + "</button>");
		}
	}
}

function kb_btn_click(index, x) {
	never_built_keyboard = false;
	$("#kb_popup_text").text("Буква? " + keyboard(lang)[index] + "?");
	last_char = index;
	$("#kb_popup_yes").on("click", function () {
		ch_guess(x);
		$("#kb_popup").hide();
		$("#kb_popup_yes").off("click");
	});
	document.getElementById("kb_popup").style.display = "block";
}

function match_chi_ag_word(ch_i, word) {
	var kb = keyboard(lang);
	var ch = kb[ch_i];
	var indecies = [];
	for (var k = 0; k < word.length; k++) {
		if (word[k] === ch) {
			indecies.push(k);
		}
	} 
	return indecies;
}

function ch_guess(x) {
	var match_res = match_chi_ag_word(last_char, o_zagnaround);
	if (match_res.length === 0) {
		once_guessed[last_char] = true;
		neotgadal_ili_da = true;
		$("#keyboard").empty();
		x();
		return;
	} else {
		var kb = keyboard(lang);
		for (var i = 0; i < kb.length; i++) {
			for (var j = 0; j < match_res.length; j++) {
				if (kb[i] === o_zagnaround[match_res[j]]) {
					once_guessed[i] = true;
				}
			}
		}
		for (var i = 0; i < match_res.length; i++) {
			slotov_ostalos--;
			slovo_2b_otg[match_res[i]] = true;
		}
		neotgadal_ili_da = false;
		$("#keyboard").empty();
		x();
		return;
	}
}

function random_between(min, max) { // both inclusive!
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
