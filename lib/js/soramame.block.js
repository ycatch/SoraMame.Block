/** SoraMame block is block-type code editor mock-up for tiny script.
	Copyright 2014-2015 Yutaka Kachi released under MIT license.
 */
 
(function() {
	var soramame = {};
	var expDialog_hundle = {}; //for Express Line Editor
	
	/** clearTrash =============
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
		var data = $('.serialize .code-body').text().replace(/\t+\n/g, "");
		data = data.replace(/\t+-+/g, "\n");
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
		var codeText = getCodeBlock();
		soramame.exec = new Function(codeText);
		soramame.exec();
	};

	/** Express Line Editor for SoraMame.Block =============
		Using Modal.js of bootstrap
	 */
	var openExpDialog = function(expBody) {
		$('#expModalDialog').modal();
		var textArea = $('#expModalText');
		textArea.attr("size",(expBody.length < 10)? 10 : expBody.length * 2);
		textArea.val(expBody);
	};
	
	$('span.exp-body').click(function() {
		expDialog_hundle = $(this);
		openExpDialog(expDialog_hundle.text());
	})
	
	/** When open dialog, focus on textbox for bootstrap3 */
	$('#expModalDialog').on('shown.bs.modal', function () {  
		$('#expModalText').focus();  
	});  
	
	$('#btn_ok_expModalDialog').click(function() {
		var strTextBox = $('#expModalText').val();
		expDialog_hundle.text(strTextBox);
		var itemName = expDialog_hundle.attr('class').split(" ")[1];
		expDialog_hundle.parent().next().find('span.' + itemName).text(strTextBox)
		$('#expModalDialog').modal('hide');
	});

	/** add Single Global var. */
	if (typeof window.SORAMAME_BLOCK == "undefined") {
		window.SORAMAME_BLOCK = soramame;
	}

	/** connect for SoraMame.Block and jquery-sortable =============
	 */
	$('ol.pallet-code').sortable({
		group: 'connect-area',
		drop: false,
		onDragStart: function (item, container, _super) {
			// Duplicate items of the no drop area
			if(!container.options.drop) {
				item.clone(true).insertAfter(item)
			}
			_super(item);
		},
	});

	$('ol.block').sortable({
		group: 'connect-area',
	});

	$('ol.trash-code').sortable({
		group: 'connect-area',
	});
	
})()

SORAMAME_BLOCK.app = {
	msg: "Hello SoraMame Block"

};