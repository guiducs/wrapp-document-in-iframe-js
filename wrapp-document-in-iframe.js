if(window.parent == window) { // Fora do iframe
	document.onreadystatechange = function () { 
		if (this.readyState == "interactive") { // Aguarde até que o documento esteja completo

			var docHtml = document.documentElement.innerHTML; // Pega todo o HTML do documento

			// Cria o iframe para a pagina
			var iframe    = document.createElement('iframe');
			iframe.src    = 'about:blank'; 
			iframe.id     = 'content';
			iframe.height = window.innerHeight;

			document.body.innerHTML = ""; // Esvazia o conteúdo do body
			document.body.appendChild(iframe); // Preenche o body com o iframe

			// Coloca o HTML da página dentro do iframe
			iframe.contentWindow.document.open('text/html', 'replace');
			iframe.contentWindow.document.write(docHtml);
			iframe.contentWindow.document.close();			

			// Atualiza a altura do iframe toda vez que a janela do navegar tiver seu tamanho modificado
			window.onresize = function() {
				iframe.height = this.innerHeight;
			}	

		}
	}

} else { // dentro do iframe
	
	// Acrescenta as folhas de estilo ao head do documento 
	// var styles = [
	// 	'/assets/css/normalize.css',
	// 	'/assets/css/form.css',
	// 	'/assets/css/grid.css',
	// 	'/assets/css/main.css',
	// 	'/assets/css/jquery.fancybox.css'
	// ];
	
	// for(var i = 0; i < styles.length; i++) {
	// 	var style  = document.createElement('link');
	// 	style.href = styles[i];
	// 	style.rel  = 'stylesheet';
	// 	document.head.appendChild(style);
	// }

	// Acrescenta os scripts ao head do documento
	// var scripts = ['/assets/js/app.min.js'];
	// for(var i = 0; i < scripts.length; i++) {
	// 	var script = document.createElement('script');
	// 	script.src = scripts[i];
	// 	document.head.appendChild(script);
	// }

	// Passa as informações do iframe para a janela principal
	window.parent.document.title = document.title; // titulo
	window.parent.history.replaceState({ href: window.location.href }, document.title, window.location.pathname); // url

}