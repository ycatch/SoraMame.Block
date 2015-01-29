/** SoraMame block editor's javascript library
	Copyright 2014-2015 Yutaka Kachi released under MIT license.
 */
 
	(function() {
		var soramame = {};
		soramame.expDialog_hundle = "";

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
		
		/** Serialize and transfer from blocks to code.  =============
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


		/** Express Line Editor for SoraMame.Block =============
			Using Modal.js of bootstrap
		 */
		
		$('.serialize').find('span.exp-body').dblclick(function() {
			soramame.expDialog_hundle = $(this);
			soramame.openExpDialog($(this).text());
		})
		
		soramame.openExpDialog = function(expBody) {
			$('#expModalDialog').modal();
			$('#expModalText').attr("size",expBody.length);
			$('#expModalText').val(expBody);
		};
		
		soramame.clodeExpDialog = function() {
			soramame.expDialog_hundle.text($('#expModalText').val());
			soramame.expDialog_hundle.next().find('span.code-exp').text($('#expModalText').val());
			$('#expModalDialog').modal('hide');
		}

		// add Single Global var.
		window.SORAMAME_BLOCK = soramame;



		/** connect for SoraMame.Block and jquery-sortable =============
		 */
		$('ol.pallet-code').sortable({
			group: 'connect-area',
			drop: false,
			onDragStart: function (item, container, _super) {
				// Duplicate items of the no drop area
				if(!container.options.drop) {
					item.clone().insertAfter(item)
				}
				_super(item);
			}
		});

		$('ol.block').sortable({
			group: 'connect-area',
		});

		$('ol.trash-code').sortable({
			group: 'connect-area',
		});
		
	})()
	
	SORAMAME_BLOCK.app = {msg: "Hello SoraMame Block"
	
	};