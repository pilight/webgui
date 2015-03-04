/*
	Copyright (C) 2015 CurlyMo

	This file is part of pilight.

	pilight is free software: you can redistribute it and/or modify it under the
	terms of the GNU General Public License as published by the Free Software
	Foundation, either version 3 of the License, or (at your option) any later
	version.

	pilight is distributed in the hope that it will be useful, but WITHOUT ANY
	WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
	A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with pilight. If not, see	<http://www.gnu.org/licenses/>
*/

Elements.Toolbar=function() {
	this.sType = "toolbar";
}

Elements.Toolbar = Elements.Toolbar.extendsFrom(Elements);

Elements.Toolbar.prototype.setHeight=function(sHeight) {
	this.sHeight = sHeight;
	if(this.exists()) {
		$('#'+this.getId()).jqxToolBar({'height': sHeight});
	}
}

Elements.Toolbar.prototype.__parseTpl=function(sParent) {	
	this.setParent(sParent);
	$(sParent).html(Mustache.to_html(Meja.getTemplate('templates/elements/toolbar.tpl'), {'id':this.sId}));
}

Elements.Toolbar.prototype.insert=function(element) {
	$(this.getParent()+' .'+this.sId).jqxToolBar(
		"addTool", element.getType(), "last", "false", function(type, tool, menuToolIninitialization) {
		tool.on("click", function() {
			element.onclick();
		});
		tool.attr("id", element.getId());
		tool.text(element.getText());
	});
}

Elements.Toolbar.prototype.__parseElement=function() {
	var oThis = this;
	$(this.getParent()+' .'+this.getId()).jqxToolBar({
		'tools': 'custom',
		'initTools': function(type, index, tool, menuToolIninitialization) {
		}
	});
	$(this.getParent()+' .'+this.getId()).attr("id", this.getId());
}

Elements.Toolbar.prototype.create=function(sParent) {
	this.__parseTpl(sParent);
	this.__parseElement();
}