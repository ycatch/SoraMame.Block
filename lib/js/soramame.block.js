/** SoraMame block editor's javascript library
	Copyright 2014-2015 Yutaka Kachi released under MIT license.
 */
 
	(function() {
		var soramame = {};

		//soramame.foo = 'foo';
		
		/**
		<a class="trash" href="#" ondblclick="SORAMAME_BLOCK.clearTrash()"></a>
		<ol id="trash-can" class="trash-code block connect-area"></ol>
		 */
		soramame.clearTrash = function() {
			if(window.confirm("Clear trash?")) {
				$("#trash-can").empty();
			}
		};
		
		/** When click Code tab, Serialize Blocks and put it to code tab.
		*/
		soramame.setSerializeBlock  = function() {
			var data = $('.serialize').text();
			$("pre code").text(js_beautify(data));
			
			$('pre code').each(function(i, block) {
				hljs.highlightBlock(block);
			});
		};
		
		var getCodeBlock = function() {
			return $("pre code").text();
		};

		soramame.execCodeBlock = function() {
			//alert("hello execCodeBlock");
			soramame.setSerializeBlock();
			var codeText = $("pre code").text();
			soramame.exec = new Function(codeText);
			soramame.exec();
		};
		
		// add Single Global var.
		window.SORAMAME_BLOCK = soramame;
	})()
	
	SORAMAME_BLOCK.test = {msg: "Hello SoraMame Block"
	
	};