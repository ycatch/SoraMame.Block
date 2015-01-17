/** Mame-Koma javascript library
	Copyright 2014 Yutaka Kachi released under MIT license.
 */
 

	(function() {
		var mk = {}

		//mk.foo = 'foo';
		
		/**
		<a class="trash" href="#" ondblclick="mameKoma.clearTrash()"></a>
		<ol id="trash-can" class="trash-code block connect-area"></ol>
		 */
		mk.clearTrash = function() {
			if(window.confirm("Clear trash?")) {
				$("#trash-can").empty();
			}
		};
		
		/** When click Code tab, Serialize Blocks and put it to code tab.
		*/
		mk.serialBlock  = function() {
			var data = $('.serialize').text();
			$("pre code").text(js_beautify(data));
			
			$('pre code').each(function(i, block) {
				hljs.highlightBlock(block);
			});
		};
		
		// add Single Global var.
		window.mameKoma = mk;
	})()
	
	mameKoma.test = {msg: "hello world"
	
	};