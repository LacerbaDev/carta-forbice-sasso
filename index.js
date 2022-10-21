const sceltaCPU = document.querySelector(".scelta-cpu");
const scelteUtente = document.querySelectorAll(".scelta");
const messaggio = document.querySelector(".messaggio");
const pulsanteGiocaDiNuovo = document.querySelector(".gioca-di-nuovo");

scelteUtente.forEach(scelta => {
	scelta.addEventListener("click", giocataCPU);
});

pulsanteGiocaDiNuovo.addEventListener("click", resetGioco);

window.addEventListener("keydown", giocataCPU);

function giocataCPU(evento) {

	const sceltaUtente = (evento.key) ? giocataUtente(evento.key) : evento.target.dataset.scelta; // carta, forbice o sasso
	if (!sceltaUtente) return;

	const sceltePossibili = ["carta", "forbice", "sasso"];
	const mossaCPU = sceltePossibili[generaNumeroRandomico(0, sceltePossibili.length - 1)];

	switch (mossaCPU) {
		case "carta":
			sceltaCPU.innerText = "🤚";
			break;
		case "forbice":
			sceltaCPU.innerText = "✌️";
			break;
		case "sasso":
			sceltaCPU.innerText = "✊";
			break;
	}

	determinaVittoria(sceltaUtente, mossaCPU);
	pulsanteGiocaDiNuovo.style.display = "block";
	scelteUtente.forEach(scelta => {
		scelta.disabled = "disabled";
	});

}

function generaNumeroRandomico(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function determinaVittoria(mossaUtente, mossaCPU) {
	if ((mossaUtente === "carta" && mossaCPU === "sasso") || (mossaUtente === "forbice" && mossaCPU === "carta") || (mossaUtente === "sasso" && mossaCPU === "forbice")) {
		messaggio.innerText = "Hai vinto! 🥳";
	} else if ((mossaUtente === "sasso" && mossaCPU === "carta") || (mossaUtente === "carta" && mossaCPU === "forbice") || (mossaUtente === "forbice" && mossaCPU === "sasso")) {
		messaggio.innerText = "La CPU ha vinto";
	} else {
		messaggio.innerText = "Pareggio";
	}
}

function resetGioco(event) {
	messaggio.innerText = "";
	sceltaCPU.innerText = "";
	pulsanteGiocaDiNuovo.style.display = "none";
	// event.target.style.display = "none";
	scelteUtente.forEach(scelta => {
		scelta.removeAttribute("disabled");
	});
}

function giocataUtente(key) {
	switch(key) {
		case "a":
			return "carta";
		case "s":
			return "forbice";
		case "d":
			return "sasso"
		case "r":
			resetGioco();
			return false;
		default:
			return false;
	}
}
