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
		var getCodeBlock = function() {
			var data = $('.serialize .code-body').text();
			return js_beautify(data);
		};

		soramame.setSerializeBlock  = function() {
			var codeText = getCodeBlock();
			$("pre code").text(codeText);
			
			$('pre code').each(function(i, block) {
				hljs.highlightBlock(block);
			});
		};
		
		soramame.execCodeBlock = function() {
			soramame.setSerializeBlock();
			var codeText = getCodeBlock();
			soramame.exec = new Function(codeText);
			soramame.exec();
		};
		
		// add Single Global var.
		window.SORAMAME_BLOCK = soramame;
	})()
	
	SORAMAME_BLOCK.app = {msg: "Hello SoraMame Block"
	
	};