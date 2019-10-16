/*
Rotação do Motor
B = {(1800, 1), (2500, 0)};
M = {(2200, 0), (2700, 1), (3200,0)};
A = {(2800, 0), (3600, 1)};
*/
function fuzzyRotacao(valor) {
	var rpm = parseInt(valor);
	var b = eqDec(rpm, 1800,2500);
	var m = trimf(rpm, 2200,2700,3200);
	var a = eqCre(rpm, 2600,3600);
	var lista = [b, m, a];
	return lista;
}

/*
Temperatura do Motor
M = {(5, 1), (50, 0)};
A = {(25, 0), (50, 1), (75,0)};
MA = {(65, 0), (100, 1)};
*/
function fuzzyTemperatura(valor) {
	var temp = parseInt(valor);
	var m = eqDec(temp, 5, 50);
	var a = trimf(temp, 25, 50, 75);
	var ma = eqCre(temp, 65, 100);
	var lista = [m, a, ma];
	return lista;
}

/*
Metragem do Instalação
P = {(100, 1), (200, 0)};
S = {(150, 0), (200, 1), (250,0)};
M = {(220, 0), (290, 1)};
*/
function fuzzyMetragem(valor) {
	var inst = parseInt(valor);
	var p = eqDec(inst, 100, 200);
	var s = trimf(inst, 150, 200, 250);
	var m = eqCre(inst, 220, 290);
	var lista = [p, s, m];
	return lista;
}

/*
Função Triangular:
y=(x-a/b-a)
z=(c-x/c-b)
trimf(x;a,b,c) = max(min(y,z),0)
*/
function trimf(x,a,b,c){
    var y = ((x-a)/(b-a));
    var z = ((c-x)/(c-b));
    var t = max(min(y,z),0);
    return t;
}

/*
Equação do 1º Grau:
Para função decrescente:
y = 1-(x / x2) ou y = (x2-x)/x2
para x > x2 retorna 0
*/
function eqDec(x,x1,x2){
    if (x > x2){
        return 0;
    }
    if (x <= x1){
        return 1;
    }
    return ((x2-x) / x2);
}
/*
Equação do 1º Grau:
Para função crescente:
y = (x-x1) / (x2-x1)
para x <= x1 retorna 0 e
para x >= x2 retorna 1
*/
function eqCre(x,x1,x2) {
	if (x <= x1){
		return 0;
	}
	if (x >= x2){
		return 1;
	}
	return ((x-x1)/(x2-x1));
}

//(A e B) e C
function logicaAeBeC(x, y, z) {
	valor = min(min(x,y), z);
	return valor;
}
//(A e B) ou C
function logicaAeBouC(x, y, z) {
	valor = max(min(x,y), z);
	return valor;
}

/* METODOS AUXILIARES */

/*
Função somatório
return vetor[quantidade_somatorio, soma_total]
O 'ate' vai ate o valor da pertinência do eixo x:
x = (x2 - x1).y + x1
de => x1, ate => x2
*/
function somatorio(de, ate, a_cada, y){
	x = ((ate - de)*y) + de;
	var i = 0;
	var soma = 0;
	while(de <= x){
		soma += de;
		de = de + a_cada;
		i += 1;
	}
	valores = [i, soma];
	return valores;
}
/*
Centroide para até dois níveis
Ex.: baixo e alto
 (a+x...n)*p-baixo + (b+y...n)*p-alto
-------------------------------------------- = ?
        (n*p-baixo) + (n*p-alto)

parametro a: Valor inicial da f1(x) até
parametro x: valor final da f1(x)
parametro b: Valor inicial da f2(x) até 
parametro y: valor final da f2(x)
parametro p1: Valor da pertinência de f1(x)
parametro p2: Valor da pertinência de f2(x)
parametro i: Valor do incremento para f1(x) e f2(x)
return valor final da centroide
*/
function centroide(a,x, b,y, p1,p2, i){
	try{
	    var f1 = somatorio(a,x,i,p1);
	    var f2 = somatorio(b,y,i,p2);
	    var parte1 = (f1[1]*p1) + (f2[1]*p2);
	    var parte2 = (f1[0]*p1) + (f2[0]*p2);
	    var saida = parte1 / parte2;
	    return saida;
	}catch(erro){
		return 0;
	}
}

function max(x, y) {
	if (x > y) {
		return x;
	}
	return y;
}

function min(x,y) {
	if (x < y) {
		return x;
	}
	return y;
}