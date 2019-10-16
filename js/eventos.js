function exercutar() {

	var rotacao = document.getElementById('txtRotacao').value;
	var temperatura = document.getElementById('txtTemperatura').value;
	var metragem = document.getElementById('txtMetragem').value;

	var r = fuzzyRotacao(rotacao);
	var t = fuzzyTemperatura(temperatura);
	var m = fuzzyMetragem(metragem);

	menorRegra1 = m[0];// retorna direto, pois só tém um.
	menorRegra2 = m[2];// retorna direto, pois só tém um.
	menorRegra3 = logicaAeBeC(r[2],m[0],t[0]);
	menorRegra4 = logicaAeBeC(r[0],m[2],t[0]);
	maiorRegra5 = logicaAeBouC(r[1],t[1],t[2]);

	somaAumentar = menorRegra2 + menorRegra4;
	somaReduzir = menorRegra1 + menorRegra3;

	desfuziRotacao = centroide(1800,2100, 2800,3600, somaReduzir, somaAumentar, 100);
	if (Number.isNaN(desfuziRotacao)) {// Erro de divisão por zero.
		desfuziRotacao = rotacao;//Mantenho o mesmo valor da entrada.
	}

	desfuziTemp = centroide(5,50, 65,100, maiorRegra5, 0, 5);
	if (Number.isNaN(desfuziTemp)) {//Erro de divisão por zero.
		desfuziTemp = temperatura;//Mantenho o mesmo valor da entrada.
	}

	var htmlRotacao = "<h5>Fuzificação</h5><div class='d-flex justify-content-around'>"+
	"<span><hr><strong>Rotação do Motor:</strong>"+
	"<p class='text-monospace'>&mu;B("+rotacao+") = <strong>"+r[0]+"</strong></p>"+
	"<p class='text-monospace'>&mu;M("+rotacao+") = <strong>"+r[1]+"</strong></p>"+
	"<p class='text-monospace'>&mu;A("+rotacao+") = <strong>"+r[2]+"</strong></p></span>";

	var htmlTemperatura = "<span><hr><strong>Temperatura do Motor:</strong>"+
	"<p class='text-monospace'>&mu;M("+temperatura+") = <strong>"+t[0]+"</strong></p>"+
	"<p class='text-monospace'>&mu;A("+temperatura+") = <strong>"+t[1]+"</strong></p>"+
	"<p class='text-monospace'>&mu;MA("+temperatura+") = <strong>"+t[2]+"</strong></p></span>";

	var htmlMetragem = "<span><hr><strong>Metragem dos Canos:</strong>"+
	"<p class='text-monospace'>&mu;P("+metragem+") = <strong>"+m[0]+"</strong></p>"+
	"<p class='text-monospace'>&mu;S("+metragem+") = <strong>"+m[1]+"</strong></p>"+
	"<p class='text-monospace'>&mu;M("+metragem+") = <strong>"+m[2]+"</strong></p></span></div>";
	document.getElementById('fuzificacao').innerHTML = htmlRotacao+htmlTemperatura+htmlMetragem;

	var htmlRegra1 = "<h5>Variáveis</h5><strong>Regra 1</strong>"+
			"<p>SE metragem for pouco ENTÃO <u>reduzir rotação</u>;</p>"+
			"<p class='text-success'>{"+m[0]+"} = "+m[0]+"</p>";

	var htmlRegra2 = "<strong>Regra 2</strong>"+
			"<p>SE metragem for muito ENTÃO <u>aumentar rotação</u>;</p>"+
			"<p class='text-success'>{"+m[2]+"} = "+m[2]+"</p>";

	var htmlRegra3 = "<strong>Regra 3</strong>"+
			"<p>SE rotação for alta E metragem for pouco E temperatura média ENTÃO <u>reduzir rotação</u>;</p>"+
			"<p class='text-success'>{"+r[2]+"},{"+m[0]+"},{"+t[0]+"} = "+menorRegra3+"</p>";

	var htmlRegra4 = "<strong>Regra 4</strong>"+
			"<p>SE rotação for baixa E metragem for muito E temperatura média ENTÃO <u>aumentar rotação</u>;</p>"+
			"<p class='text-success'>{"+r[0]+"},{"+m[2]+"},{"+t[0]+"} = "+menorRegra4+"</p>";

	var htmlRegra5 = "<strong>Regra 5</strong>"+
			"<p>SE rotação for média E temperatura for alta OU temperatura muito alta ENTÃO <u>reduzir a temperatura</u>;</p>"+
			"<p class='text-success'>{"+r[1]+"},{"+t[1]+"},{"+t[2]+"} = "+maiorRegra5+"</p>";

	var htmlAumentar = "<h5>Somatório</h5><p>Aumentar rotacao <strong>{"+menorRegra2+", "+
	menorRegra4+"}</strong> = "+somaAumentar+"</p>";

	var htmlReduzir = "<p>Reduzir rotacao <strong>{"+menorRegra1+", "+
	menorRegra3+"}</strong> = "+somaReduzir+"</p>";

	var htmlReduzirTemp = "<p>Reduzir temperatura <strong>{"+maiorRegra5+"}</strong> = "+maiorRegra5+"</p>";

	document.getElementById('raciocinio').innerHTML = htmlRegra1+htmlRegra2+htmlRegra3+htmlRegra4+htmlRegra5+htmlAumentar+htmlReduzir+htmlReduzirTemp;


	document.getElementById('desfuzificacao').innerHTML = ""+
	"<br><h5>Defuzzificação</h5><strong>Estabilizar rotação do motor para: </strong> <h1 class='text-white bg-info btn btn-lg'>"+desfuziRotacao+" rpm</h1>"+
	"<br><strong>Estabilizar temperatura do motor para: </strong> <h1 class='text-white bg-info btn btn-lg'>"+desfuziTemp+" ºC</h1>";
}

function rolagemRotacao() {
	var v = document.getElementById('txtRotacao').value;
	document.getElementById('valorRotacao').innerHTML = "Rotação do Motor (rpm): <strong class='text-white bg-dark'>"+v+"</strong>";
}

function rolagemTemperatura() {
	var v = document.getElementById('txtTemperatura').value;
	document.getElementById('valorTemperatura').innerHTML = "Temperatura do Motor (ºC): <strong class='text-white bg-dark'>"+v+"</strong>";
}

function rolagemMetragem() {
	var v = document.getElementById('txtMetragem').value;
	document.getElementById('valorMetragem').innerHTML = "Metragem dos Canos (M): <strong class='text-white bg-dark'>"+v+"</strong>";
}