
var numeroRecuadros;
var cuadroInactivo;
var cuadroActivo;
var tamanoCuadro;
var tamanoContenedor;
var array;
var contadorPosicion; 
var empezar;
var curvatura;
var num;
var contadorRamdom = 0;
var numeroIteraciones;
var i = 0;
var nI;

// Cargar volores iniciales

var cargarValoresConfiguracion = function()
{
	numeroRecuadros = prompt ("Ingrese tamaño de la cuadricula", '');
	
	numeroIteraciones = prompt ("Ingrese el número de iteraciones", '');
	numeroIteraciones = numeroIteraciones + 1;
	
	cuadroInactivo = "#000000";
	cuadroActivo = "#ffffff";
	tamanoCuadro = parseInt($('#tamanoRecuadro').val());
	tamanoContenedor = numeroRecuadros * tamanoCuadro;
	array = [];
	contadorPosicion = 0; 
	empezar = false;
	curvatura = $('#curvatura').val() + '%';
}


// inicio
$(document).ready(function(){
	cargarValoresConfiguracion();
	crearTablero();	
	cargarColores();
	
	$('.recuadro').on('click',function() {
		$(this).addClass('vivo');
	
	});
	$('.empezar p#empezar').on('click',function() {
		
		if ($(this).text() == "Empezar") {
			
			empezar = true;
			$(this).text('Pausar');
		}else
		{
			empezar = false;
			$(this).text('Empezar');
		}
	});
	$('.ramdom p#ramdom').on('click',function() {
		if ($(this).text() == "Regar virus") {
			ramdom = true;
			$(this).text('Virus regado');
		}else
		{
			ramdom = false;
			$(this).text('Regar virus');
		}
	});
	$('.capa').on('click',function() {
		$('.capa').fadeOut();
		$('.configuracion').animate({
			right: '-100%'
		});
	});
	$('.empezar p#configuracion').on('click',function() {
		$('.capa').fadeIn();
		$('.configuracion').animate({
			right: '0%'
		});
	});

	$('#guardar').on('click',function() {
		location.reload();

	});
	$('.ramdom p#ramdom').on('click',function() {
		cargarVirus();
		empezarSimulacion();
	
	});


	
// Cargar colores iniciales
	
});

var cargarColores = function()
{
	$('.contenedor').css({'background': 'rgba(51,97,255,1)'});
	$('.titulo').css({
		'color': cuadroActivo,
		'background': 'rgba(0,0,0,0.255)'
	});
	$('.contenedorRecuadros').css({
		'width': tamanoContenedor + "px",
		'height': tamanoContenedor + "px"
	});
	$('.recuadro').css({
		'width': tamanoCuadro + "px",
		'height': tamanoCuadro + "px",
		'background': cuadroInactivo,
		'border': 'solid 2px rgba(255,255,255,0.2)',
		'float': 'left',
		'border-radius': curvatura
	});
	$('.empezar').css({'background': 'rgba(238,46,15,1)' });
}

var iniciar = function()
	{
	
		empezarSimulacion();
		cargarColores();
		$('.recuadro').css({'background': cuadroInactivo, 'border':'solid 1px rgba(255,255,255,0.2)'});
		$('.vivo').css({'background': cuadroActivo, 'border':'solid 1px rgba(0,0,0,0.2)'});
		
		
}

// empezar simulacion
var empezarSimulacion = function()
{	
	
	if ( i < numeroIteraciones){
		if (empezar) {			
			
			for(var x = 0; x < numeroRecuadros; x++)
			{
				for(var j = 0; j < numeroRecuadros - 1; j++)
			{
			evaluarEstado(x, j);			
			}
			}
		}	
		$('div').removeClass('vivo');
		cargaValoresNuevos();
		
	}
	
};



var simulacion = setInterval('iniciar()',100);


// evaluar cuadros vivos y muertos

var evaluarEstado = function(x, j)
{
	
	if (contadorRamdom == 0){
		var contadorVivos = Math.floor(Math.random()*(10-1)+1);
		
	}else{
		var contadorVivos = 0;
	}

	
	if ($('#' + (x + 1) + '-' + j).hasClass('vivo')) {contadorVivos++;}
	if ($('#' + (x + 1) + '-' + (j - 1)).hasClass('vivo')) {contadorVivos++;}
	if ($('#' + x + '-' + (j - 1)).hasClass('vivo')) {contadorVivos++;}
	if ($('#' + (x - 1) + '-' + (j - 1)).hasClass('vivo')) {contadorVivos++;}
	if ($('#' + (x - 1) + '-' + j).hasClass('vivo')) {contadorVivos++;}
	if ($('#' + (x - 1) + '-' + (j + 1)).hasClass('vivo')) {contadorVivos++;}
	if ($('#' + x + '-' + (j + 1)).hasClass('vivo')) {contadorVivos++;}
	if ($('#' + (x + 1) + '-' + (j + 1)).hasClass('vivo')) {contadorVivos++;}
	if (contadorVivos == 3) {
		array[contadorPosicion] = '#' + x + '-' + j;
		contadorPosicion++;
		
	};
	if (contadorVivos == 2 && $('#' + x + '-' + j).hasClass('vivo')){
		array[contadorPosicion] = '#' + x + '-' + j;
		contadorPosicion++;
		
	};
		
};
// cargar nuevos valores
var cargaValoresNuevos = function()
{
	
	for(var y = 0; y < contadorPosicion; y++)
	{		
			
			$(array[y]).addClass('vivo');
			contadorRamdom++;
			i++;
			
	}
	contadorPosicion = 0;
	
	
}
//crear tablero
var crearTablero = function()
{
	$('.contenedorRecuadros').empty();
	for(var x = 0; x < numeroRecuadros; x++)
	{
		for(var j = 0; j < numeroRecuadros - 1; j++)
		{
			$('.contenedorRecuadros').append('<div id="' + x + '-' + j + '" class="recuadro"></div>');
			
		}
		$('.contenedorRecuadros').append('<div id="' + x + '-' + j + '" class="' + x + '-' + j + ' recuadro"></div>');
	}
	
};


